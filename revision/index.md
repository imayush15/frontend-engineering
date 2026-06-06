# DPP Migration / Performance Story

Your actual story should be framed as migration + maintainability + performance, not fake React-only optimization.

Good version:

```txt
DPP was an older Angular/monorepo module where the code had become hard to maintain and prone to regressions. Multiple people could change shared areas, UX consistency was weak, and the structure was not ideal for future extension.

I initiated/owned the migration into a cleaner React-based module/submodule structure. The focus was to improve maintainability, component boundaries, state management, HTML/CSS structure, and reduce unnecessary complexity.

Technically, we moved from Angular to React, created clearer folders/components, used React Context where appropriate, cleaned up state flow, and aligned the UI with newer architecture/design patterns.

The impact was better developer experience, safer ownership boundaries, easier future changes, and improved user experience/performance due to cleaner rendering and structure.

If I revisit it today, I would add stronger production-level monitoring around Web Vitals, route load time, and error tracking so performance regressions are caught earlier.
```

Do not overclaim image preloading unless asked. If asked conceptually:

- Preload image using `new Image().src = nextImageUrl`
- Or `<link rel="preload" as="image" href="..." />`
- For actual `<img>`, use `loading`, `srcset`, `sizes`, `fetchpriority`

---

# Mentorship Story

Frame it as process + ownership improvement.

```txt
One junior engineer was getting blocked mid-development because requirements were not clarified upfront. He started implementation with partial context, then repeatedly had to go back to product/design/QA.

I sat with him, understood the issue, and set a few non-negotiables: clarify requirements before development, identify edge cases early, ask for missing design/API states upfront, and communicate blockers early.

The impact was better delivery predictability, less mid-development rework, more confidence, and fewer repeated mistakes in similar ticket sizes.
```

Good phrasing:

```txt
I mentored through reviews, pairing, and helping engineers think through requirements, edge cases, and ownership before coding.
```

---

# JavaScript Utilities

## Debounce

Debounce waits until calls stop for a delay.

Use cases:

- Search input
- Auto-save
- Resize finish

```js
function debounce(fn, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

Key points:

- Closure stores `timeout`
- `clearTimeout` cancels previous scheduled call
- `fn.apply(this, args)` preserves `this`
- It is trailing debounce

---

## Throttle

Throttle runs at most once per interval.

Use cases:

- Scroll
- Resize
- Mousemove
- Analytics tracking

Leading throttle:

```js
function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
```

Leading throttle:

- Runs immediately
- Ignores calls during delay window

Trailing throttle:

- Waits until end of interval
- Runs latest call

```js
function trailingThrottle(fn, delay) {
  let timerId = null;
  let lastArgs;
  let lastThis;

  return function (...args) {
    lastArgs = args;
    lastThis = this;

    if (timerId) return;

    timerId = setTimeout(() => {
      fn.apply(lastThis, lastArgs);
      timerId = null;
      lastArgs = null;
      lastThis = null;
    }, delay);
  };
}
```

---

## Once

Runs a function only once and returns cached result.

```js
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}
```

Why `called = true` before `fn.apply`?

- Prevents re-entrant calls from executing the function multiple times.

---

## Promise.all Polyfill

Important rules:

- Static method: `Promise.myAll`, not `Promise.prototype.myAll`
- Preserve input order
- Resolve only after all complete
- Reject immediately on first rejection
- Handle non-promise values
- Handle empty array

```js
Promise.myAll = function (args) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;

    if (args.length === 0) {
      resolve(results);
      return;
    }

    for (let i = 0; i < args.length; i++) {
      Promise.resolve(args[i])
        .then((res) => {
          results[i] = res;
          count += 1;

          if (count === args.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
```

Why `results[i] = res` and not `push`?

- Promises may resolve out of order, but result must preserve input order.

---

# Event Loop

Execution order:

```txt
Synchronous code
↓
Microtasks
↓
Macrotasks
```

Microtasks:

- `Promise.then`
- `queueMicrotask`
- `Promise.catch/finally`

Macrotasks:

- `setTimeout`
- `setInterval`
- DOM events

Rule:

```txt
After every macrotask, drain all microtasks.
If a microtask creates another microtask, keep draining.
```

Important:

- `queueMicrotask` does not run before promise callbacks automatically.
- It joins the same microtask queue in insertion order.

Example:

```js
Promise.resolve().then(() => console.log("Promise"));
queueMicrotask(() => console.log("Microtask"));
```

Output:

```txt
Promise
Microtask
```

---

# Deep vs Shallow Copy

Shallow copy:

- Copies top-level object/array
- Nested objects still share references

```js
const copy = { ...user };
const arrCopy = [...arr];
```

Example:

```js
const user = {
  name: "Ayush",
  address: { city: "Raipur" },
};

const copy = { ...user };
copy.address.city = "Bangalore";

console.log(user.address.city); // Bangalore
```

Correct immutable nested update:

```js
const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: "Bangalore",
  },
};
```

Avoid deep cloning everything for React state unless needed.

JSON deep clone issues:

- Loses Date, Map, Set, undefined, functions, RegExp, Infinity

Modern deep clone:

```js
structuredClone(obj);
```

---

# React Rendering, Reconciliation, Virtual DOM

Rendering:

```txt
React calls component function and gets JSX output.
```

Render does not mean DOM update.

Re-render happens when:

- State changes
- Parent re-renders
- Context consumed by component changes

Reconciliation:

```txt
React compares old virtual tree with new virtual tree and calculates minimal DOM changes.
```

Commit phase:

```txt
React applies actual DOM updates.
```

Virtual DOM:

```txt
In-memory JS object representation of UI.
```

Important:

- React compares old VDOM vs new VDOM.
- It does not compare real DOM vs virtual DOM.
- Virtual DOM is not automatically “fast”; benefit is efficient reconciliation and fewer DOM mutations.

Keys:

```txt
Keys help React preserve identity in lists.
```

Bad key: index when list changes order  
Good key: stable id

State preservation depends on:

```txt
Component type + position in tree + key
```

---

# React Fiber

React Fiber is React’s reconciliation engine.

Good answer:

```txt
React Fiber breaks rendering work into smaller units so React can pause, resume, prioritize, or discard work. It enables concurrent rendering, transitions, and better scheduling.
```

Render phase:

- Can be interrupted
- Can be restarted

Commit phase:

- Cannot be interrupted
- Must complete

Do not say:

```txt
Fiber is the Virtual DOM.
```

Say:

```txt
Fiber is the engine that processes updates and reconciliation more flexibly.
```

---

# React Hooks

## useEffect

Use for synchronizing with external systems:

- API calls
- Event listeners
- Timers
- WebSockets
- LocalStorage
- Analytics

Runs after DOM commit.

Dependency behavior:

```js
useEffect(() => {}); // every render
useEffect(() => {}, []); // mount only, except StrictMode dev behavior
useEffect(() => {}, [count]); // when count changes
```

Cleanup:

- Runs before next effect execution
- Runs on unmount

Example output:

```txt
Effect 0
Cleanup 0
Effect 1
Cleanup 1
Effect 2
```

Avoid useEffect for derived state.

Bad:

```js
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(first + last);
}, [first, last]);
```

Good:

```js
const fullName = first + last;
```

Derived state:

```txt
A value that can be calculated from existing props/state.
```

Examples:

- `doubled = count * 2`
- `fullName = first + last`
- `activeUsers = users.filter(...)`

---

## useRef

Stores mutable value across renders without causing re-render.

Use for:

- DOM access
- Timer IDs
- Previous value tracking
- Latest value inside stable callback
- Avoiding stale closure

State vs Ref:

```txt
useState update → re-render
useRef.current update → no re-render
```

Do not use ref for values that should update UI.

---

## useReducer

Use when multiple related state values change together as part of one workflow.

Good for:

- Multi-step forms
- Test attempt state
- Complex UI state
- State-machine-like flows

Not because “many states”.
Use because “related transitions”.

Example:

```txt
Current Step
Form Data
Validation Errors
Loading
Success
```

Good useReducer candidate.

Independent states:

```txt
count
theme
sidebarOpen
```

Use separate `useState`.

---

## useMemo

Memoizes computed value.

Use when:

- Calculation is expensive
- Component re-renders often
- Stable object/array reference matters for memoized child

Do not blindly memoize cheap values.

---

## useCallback

Memoizes function reference.

Use when:

- Passing callback to `React.memo` child
- Function is dependency of another hook
- Stable reference matters

Important:

```txt
useCallback does not make function execution faster.
It keeps function reference stable.
```

---

## React.memo

Memoizes a component and skips re-render if props are shallowly equal.

Important:

```js
<Child config={{ theme: "dark" }} />
```

Still re-renders because object reference changes every render.

Fix:

```js
const config = useMemo(() => ({ theme: "dark" }), []);
```

---

# State Management

Decision tree:

```txt
Only one component needs it?
→ useState

Multiple related local states in one workflow?
→ useReducer

Sibling components need it?
→ lift state up

Distant components need low-frequency global value?
→ Context

Distant components need complex/frequent shared client state?
→ Redux Toolkit

Data comes from backend?
→ React Query

URL should represent it?
→ URL query params
```

## Client State vs Server State

Server state:

```txt
Data owned by backend.
Can become stale.
Needs caching/refetching.
Can fail.
Can be retried.
```

Examples:

- Test details
- User profile
- Campaign list
- Call history
- Analytics

This is not the same as Next.js server components.

Client state:

- Selected answers
- Current question
- Modal open
- Form state
- Timer state
- Active tab

## React Query

Use React Query for server state.

If 20 components call:

```js
useQuery({
  queryKey: ["test", testId],
  queryFn: fetchTest,
});
```

React Query creates one cache entry.  
20 components become observers.  
One network request is shared.

Important:

```txt
20 subscribers may re-render, but they do not make 20 API calls.
```

Stale means:

```txt
Data is old enough that React Query is allowed to refetch on triggers.
```

Triggers:

- mount
- window focus
- reconnect
- invalidateQueries
- manual refetch

## Redux Toolkit

Use for complex shared client state.

Redux Toolkit still usually has one store with slices.

```txt
store
├── authSlice
├── testSlice
├── timerSlice
```

Slices are not multiple stores.

---

# React Performance

Do not start with optimization. First identify bottleneck.

Possible bottlenecks:

- Too much JS loaded upfront
- Too many re-renders
- Expensive render calculations
- Large lists/tables
- Heavy charts/modals/editors
- Slow API waterfalls
- Poor image loading
- Layout shifts
- Heavy third-party scripts

Debugging flow:

```txt
Reproduce
↓
Network tab
↓
Performance tab
↓
React Profiler
↓
Lighthouse/Web Vitals
↓
Bundle analyzer/Coverage
↓
Fix targeted issue
↓
Measure before/after
```

## Code Splitting

Code splitting is not breaking a component into smaller files.

Code splitting means:

```txt
Split JS bundle and load non-critical code later.
```

Examples:

- Heavy charts
- Modals
- Rich text editor
- MathJax
- Joyride
- Payment SDKs
- Route-specific components

## Above the Fold / Below the Fold

Above the fold:

```txt
Visible in initial viewport without scrolling.
```

Do not lazy-load:

- Hero image
- Main heading
- Primary CTA
- LCP candidate

Lazy-load:

- Below-fold images
- Modals
- Charts behind tabs
- Footer
- Reviews/comments

## Shared Chunks Across Routes

Shared chunk:

```txt
Code used by multiple routes extracted into common bundle.
```

Goal is not maximum sharing.

Goal:

```txt
Right code, right chunk, right time.
```

Heavy libraries should not leak into shared chunks if not needed by initial route.

Investigate:

- MathJax
- Chart.js
- Joyride
- Firebase/analytics SDKs
- Large icon packages

Use bundle analyzer to verify.

## Virtualization

Pagination controls how much data is fetched.  
Virtualization controls how many DOM nodes are rendered.

Use when:

- Large lists
- Expensive rows
- Call history/logs/tables/chat
- 500+ rows or complex row UI

Basic idea:

```txt
scrollTop / rowHeight = startIndex
render visible rows + buffer
fake full height for scrollbar
translate visible block down
```

IntersectionObserver is better for:

- Infinite scroll
- Lazy loading
- Visibility tracking

Virtualization usually uses scroll position calculations.

## BFF

BFF = Backend For Frontend.

Not “move random frontend computation to backend”.

Better definition:

```txt
Frontend-specific backend layer that aggregates, transforms, secures, and simplifies data for a frontend experience.
```

Use when:

- Page needs multiple backend services
- API waterfall is slow
- Frontend needs simplified response shape
- Secrets/API keys must not be exposed
- Permission/auth logic needs centralized handling

Good BFF:

- Calls downstream APIs in parallel
- Handles partial failures
- Returns frontend-friendly shape
- Adds caching where useful

Bad BFF:

- Sequential calls
- Single point of failure
- Dumping ground for business logic

---

# Chrome Performance / Bundle / Metrics

## Performance Tab

Look at:

- Timings: FCP, LCP, DCL
- Network
- Main Thread
- Long Tasks
- JS Heap
- DOM Nodes
- Event Listeners
- Bottom-up / Call Tree

Yellow blocks:

```txt
JavaScript execution
```

Purple:

```txt
Style/Layout/Paint
```

Long task:

```txt
Main thread task > 50ms
```

If Main thread has huge yellow blocks:

```txt
Suspect heavy JS, large bundle, expensive render.
```

## Network Tab for Bundle

Use:

```txt
DevTools → Network → Disable Cache → Hard Reload → Filter JS
```

Check:

- Transfer Size
- Resource Size
- Largest chunks
- Initiator
- Third-party scripts

Transfer size = compressed downloaded size  
Resource size = uncompressed size browser parses/executes

## Bundle Analyzer

Use to find what is inside chunks:

- `@next/bundle-analyzer`
- `webpack-bundle-analyzer`
- source-map-explorer
- Chrome Coverage tab

Good rough initial JS:

```txt
<100KB compressed: very good
100-150KB: good
150-300KB: okay
300-600KB: concerning
>1MB: bad for initial route
```

Depends on route. Login/home should be small. Heavy admin dashboard can be larger.

## Metrics to Monitor

LCP:

- Where: Lighthouse, Performance tab, Web Vitals dashboard
- Good: <2.5s
- Look for LCP element
- Causes: large image, slow API, render-blocking CSS, font, big JS

INP:

- Good: <200ms
- Measures interaction responsiveness
- Causes: long JS tasks, heavy render, huge DOM

CLS:

- Good: <0.1
- Measures layout shift
- Causes: images without dimensions, late banners, font swap, skeleton mismatch

JS errors per route:

- Where: Sentry
- Look at affected users, route concentration, release

Route load time:

- Look at slow routes
- Causes: bundle, API waterfall, render cost

Initial JS size:

- Network tab, analyzer, Coverage

Chunk load failures:

- Sentry: `ChunkLoadError`, `Loading chunk failed`
- Causes: stale cache, CDN issue, remote MFE unavailable, deployment mismatch

API latency:

- Look at p50, p95, p99
- p50 high = generally slow
- p95/p99 high = tail users suffering

---

# Next.js

You have worked mostly with Pages Router. Be honest.

## File-based Routing

```txt
pages/index.js → /
pages/about.js → /about
pages/course/[id].js → /course/:id
```

## SSR: getServerSideProps

Runs on every request.

```js
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
```

Flow:

```txt
Request
↓
Server runs getServerSideProps
↓
Fetch data
↓
Generate HTML
↓
Send HTML
↓
Hydrate
```

Use when:

- Fresh data needed
- SEO important
- Request-specific data

Downside:

- Server cost on every request
- Higher TTFB possible

## SSG: getStaticProps

Runs at build time.

```js
export async function getStaticProps() {
  return {
    props: {},
  };
}
```

Use when:

- Data rarely changes
- SEO needed
- Performance important

Examples:

- Blogs
- Docs
- Marketing
- Course pages that rarely change

## ISR

ISR = SSG + periodic regeneration.

```js
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600,
  };
}
```

Flow:

```txt
Old static page served immediately
↓
After revalidate time, next request triggers background regeneration
↓
Later users get fresh page
```

Use for:

- Product/course/catalog/pricing pages
- Public SEO pages that change occasionally

Not for:

- Stock prices
- Live dashboard
- Chat
- Real-time order status

## Hydration

Hydration:

```txt
React attaches interactivity to server-rendered HTML on the client.
```

SSR/SSG page may be visible but not interactive until JS loads.

If button doesn't respond for 2s:

```txt
Hydration delayed due to large JS bundle / heavy JS / long main-thread tasks.
```

Hydration mismatch causes:

- `Date.now()`
- `Math.random()`
- `window/localStorage` during render
- timezone/locale differences

## Server Components / Client Components

Server Components:

- Run on server
- No JS shipped for component
- Good for static/data rendering
- Cannot use `useState`, `useEffect`, browser APIs, event handlers

Client Components:

- Run/hydrate in browser
- Use `"use client"`
- Can use state/effects/events
- Add JS bundle cost

Good answer:

```txt
Server Components are for data rendering/static UI. Client Components are for interactivity.
```

## Image Optimization

Next/Image provides:

- Automatic resizing
- WebP/AVIF
- Lazy loading
- Responsive images
- CLS prevention using width/height
- Priority loading for LCP image

Use `priority` only for:

- Hero image
- LCP candidate
- Above-the-fold critical image

Do not use priority for every image.

---

# Browser Rendering Pipeline

Pipeline:

```txt
HTML
↓
DOM
↓
CSSOM
↓
Render Tree
↓
Layout
↓
Paint
↓
Composite
```

DOM:

- HTML parsed into tree

CSSOM:

- CSS parsed into style tree

Render Tree:

- DOM + CSSOM, visible nodes only

Layout/Reflow:

- Calculate position/size

Paint:

- Draw pixels: text, colors, shadows, borders

Composite:

- Combine layers, often GPU accelerated

Performance implications:

```txt
width/height/top/left changes → layout + paint + composite
color/background → paint + composite
transform/opacity → usually composite only
```

Better animation:

```css
transform: translateX(100px);
```

instead of:

```css
left: 100px;
```

---

# Component Design

Good components are:

- Reusable
- Maintainable
- Scalable
- Performant
- Easy to understand

Principles:

- Single responsibility
- Composition over configuration
- Keep state close
- Presentational vs container separation
- Avoid prop drilling
- Good component API design
- Controlled vs uncontrolled where needed

## Composition / Compound Components

Configuration-heavy:

```jsx
<Modal title="Delete" body="Are you sure?" footer="..." />
```

Composable:

```jsx
<Modal>
  <Modal.Header>Delete</Modal.Header>
  <Modal.Body>Are you sure?</Modal.Body>
  <Modal.Footer>Actions</Modal.Footer>
</Modal>
```

This is called:

```txt
Compound Component Pattern
```

Implementation idea:

```tsx
type CardProps = {
  children: React.ReactNode;
};

type CardComponent = React.FC<CardProps> & {
  Header: React.FC<CardProps>;
  Body: React.FC<CardProps>;
  Footer: React.FC<CardProps>;
};

const Card: CardComponent = ({ children }) => {
  return <div>{children}</div>;
};

Card.Header = ({ children }) => <div>{children}</div>;
Card.Body = ({ children }) => <div>{children}</div>;
Card.Footer = ({ children }) => <div>{children}</div>;

export default Card;
```

## Config-driven UI

Use when structure repeats but behavior/fields vary.

Example:

```js
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role", render: (row) => <Badge>{row.role}</Badge> },
];
```

Good for:

- Forms
- Tables
- Dashboards
- Templates
- Admin panels

Avoid when:

- UI is highly custom
- Logic becomes code-inside-JSON
- Debugging/type safety becomes painful

## Table Design

Reusable table API:

```tsx
<Table columns={columns} data={data} />
```

Column config:

```ts
type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
};
```

Consider:

- Loading state
- Empty state
- Error state
- Sorting
- Filtering
- Pagination
- Row selection
- Expandable rows
- Virtualization

Server-side operations for large data:

```txt
GET /users?page=1&limit=20&search=ayush&sort=name
```

Reason:

- Smaller network payload
- Less memory
- Faster initial load
- Scales better

Client-side is okay for small datasets.

---

# Production Debugging

First ask:

```txt
Is this real regression, user-specific edge case, backend issue, or noise?
```

Check in Sentry:

- Error message
- Stack trace
- Affected users
- Events count
- Route
- Release version
- Browser/device
- First seen / last seen
- Breadcrumbs
- API status before crash
- Feature flag values

Interpretation:

```txt
High events, low users → few users stuck
High users → real production impact
```

Check in Grafana/backend logs:

- API latency
- 4xx vs 5xx
- Timeout rate
- Traffic spike
- Deployment timestamp
- Service dependency failure

Reproduce with:

- Same route
- Same user role
- Same query params
- Same browser/device
- Same feature flag
- Same API response if possible

Fix decision:

- Rollback
- Disable flag
- Hotfix
- Backend coordination

Good interview answer:

```txt
I first check scope and impact, then Sentry for stack/release/breadcrumbs, then Grafana/logs for API latency/errors. I reproduce under same conditions and decide rollback, flag disablement, or patch forward based on severity.
```

---

# Microfrontends / Module Federation / Rsbuild

Be honest:

```txt
I did not design the whole platform from scratch, but I worked inside an Rsbuild/Module Federation setup where I exposed and consumed remote components.
```

## Microfrontend

Architecture:

```txt
Shell
├── Study MFE
├── Practice MFE
├── Store MFE
└── Profile MFE
```

Shell handles:

- Routing
- Auth
- Layout
- Navigation
- Loading remotes

Remote handles:

- Business UI
- APIs
- Domain logic

## Module Federation

Runtime code sharing between independently deployed apps.

Remote exposes:

```ts
exposes: {
  "./StudyHeader": "./src/components/StudyHeader.tsx",
}
```

Host consumes:

```ts
remotes: {
  study: "study@http://localhost:3001/remoteEntry.js",
}
```

Usage:

```tsx
const StudyHeader = React.lazy(() => import("study/StudyHeader"));
```

Runtime:

```txt
Host loads
↓
import("study/StudyHeader")
↓
remoteEntry.js loads
↓
remote chunk loads
↓
component renders
```

## remoteEntry.js

Think of it as:

```txt
manifest/registry for exposed remote modules.
```

## Rsbuild vs Rspack vs Webpack

```txt
Webpack = bundler
Rspack = faster Rust-based webpack-compatible bundler
Rsbuild = higher-level build tool powered by Rspack
```

## Shared React

Configure React as singleton:

```ts
shared: {
  react: { singleton: true, requiredVersion: false },
  "react-dom": { singleton: true, requiredVersion: false },
}
```

Why:

```txt
Avoid multiple React copies and hook/runtime issues.
```

## Practical risks

- Remote unavailable
- ChunkLoadError
- Version mismatch
- Shared dependency mismatch
- CSS leakage
- Debugging across shell/remotes
- Monitoring ownership issues

Wrap remotes:

```tsx
<ErrorBoundary fallback={<div>Module failed</div>}>
  <Suspense fallback={<div>Loading...</div>}>
    <RemoteComponent />
  </Suspense>
</ErrorBoundary>
```

---

# React Testing

You have not worked hands-on much. Be honest.

Good answer:

```txt
I haven’t had extensive hands-on ownership of frontend testing in recent projects. My focus has been feature delivery, performance, architecture, and production reliability. But I understand the testing pyramid and how I would test critical flows using React Testing Library and E2E tools.
```

Testing levels:

- Unit: pure functions, validators, reducers
- Component: UI behavior
- Integration: multiple pieces working together
- E2E: real browser critical flows

React Testing Library philosophy:

```txt
Test behavior, not implementation.
```

Prefer:

```js
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByText(/loading/i);
```

Avoid testing internal state.

What to test in OTE:

- Question rendering
- Option selection
- Palette update
- Timer display
- Submit flow
- Submit failure
- Template-specific rendering
- Loading/error states

What to test in Ringg:

- Campaign form validation
- Call history filters
- Pagination
- Empty/error/loading states
- Role-based action visibility

---

# Frontend Security

Thought process:

```txt
What can attacker control?
What can attacker gain?
```

Never trust client:

- Request body
- Query params
- Headers
- Cookies
- localStorage
- Redux state
- Hidden fields

Authentication:

```txt
Who are you?
```

Authorization:

```txt
What can you do?
```

Frontend authorization checks are UX only. Backend must enforce real permissions.

## XSS

Attacker runs JavaScript inside your app.

Dangerous:

```jsx
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

React safe by default:

```jsx
<div>{userInput}</div>
```

Prevent:

- Avoid raw HTML
- Sanitize with DOMPurify if needed
- Use CSP
- Avoid storing sensitive tokens in localStorage

## CSRF

Attacker tricks browser into making authenticated request using user cookies.

Relevant mostly for cookie-based auth.

Prevent:

- SameSite cookies
- CSRF tokens
- Origin/Referer validation
- Do not mutate data using GET

## CORS

Browser policy controlling whether one origin can read another origin’s response.

Important:

```txt
CORS does not stop request from reaching server.
It stops browser JS from reading response.
```

Not a replacement for auth/authorization.

## CSP

Content Security Policy restricts what scripts/styles/images/APIs/frames can load.

Useful to reduce XSS impact.

Common directives:

- `default-src`
- `script-src`
- `style-src`
- `img-src`
- `connect-src`
- `frame-ancestors`

## Token Storage

localStorage:

- Easy
- JS-readable
- XSS can steal tokens

HttpOnly Secure cookies:

- JS cannot read
- Safer against token theft
- Need CSRF protection

Good answer:

```txt
For sensitive auth tokens, I prefer HttpOnly Secure SameSite cookies over localStorage, while protecting cookie-based flows from CSRF.
```

## Other security practices

- Do not expose secrets in frontend env
- In Next.js, `NEXT_PUBLIC_*` is visible to browser
- Validate file uploads on backend
- Keep dependencies updated
- Use npm audit / Dependabot / Snyk
- Use clickjacking protection: `X-Frame-Options`, `frame-ancestors`

---

# Final Interview Positioning

Your strongest pitch:

```txt
I’m strongest in React/Next.js frontend engineering, performance, production reliability, and working in large frontend systems. I’ve worked on high-scale post-login journeys, microfrontend ecosystems, staged rollouts, Sentry monitoring, code reviews, and mentoring. I can contribute hands-on while also improving frontend quality, debugging, and maintainability.
```

For unknown areas:

```txt
I haven’t owned that deeply, but I understand the concept and have worked around it.
```

Never fake deep ownership.

Best closing signal:

```txt
I try to optimize based on evidence: measure first, identify whether the bottleneck is network, JS, rendering, API waterfall, or user flow, then apply the correct fix and monitor after release.
```
