#### Rendering strategy answers one question:

`Where is the HTML created, and when does the user get useful UI?`

#### There are three important phases to remember:

```
Build time:
Before deployment. Usually happens in Jenkins, GitHub Actions, GitLab CI, etc.

Server runtime:
After deployment, on the deployed server/serverless runtime.

Browser runtime:
After the user receives HTML/JS, inside the user’s browser.
```

### Hydration

- Hydration is not exactly a rendering strategy, but it is very important.

- When SSR/SSG/ISR sends HTML to the browser, the page may be visible but not interactive yet.

- Hydration is the process where JavaScript loads and attaches event handlers to the already-rendered HTML.

### CSR: Client Side Rendering

In CSR, the browser builds the UI.

**Flow:**

```
User opens page
↓
Server/CDN sends mostly empty HTML
↓
Browser downloads JavaScript
↓
JavaScript runs
↓
App fetches API data
↓
UI is rendered in browser
```

**Example mental model:**

```js
<div id="root"></div>
<script src="/app.js"></script>
```

_React fills the page after JavaScript loads_.

**Best for:**

```
Logged-in apps
Dashboards
Admin panels
Highly interactive apps
User-specific pages
Post-login flows
```

**Pros:**

```
Simple static deployment
Good for app-like experiences
Fast navigation after initial load
Works well for personalized data
Lower server rendering cost
```

**Cons:**

```
Initial load can be slow
SEO is weaker
Heavy JS hurts low-end devices
Blank/loading screen possible before app renders
```

**Key line:**

_`CSR = UI/HTML is generated in the browser at browser runtime.`_

---

### SSR: Server-Side Rendering

In SSR, the server generates HTML for every request.

**Flow:**

```
User requests page
↓
Server receives request
↓
Server fetches required data
↓
Server generates HTML
↓
Browser receives meaningful HTML
↓
JavaScript loads and hydrates the page
```

**Best for:**

```
SEO-heavy pages
Fresh data pages
Public pages with dynamic content
Product detail pages
Search result pages
News/article pages
```

**Pros:**

```
Better SEO
Faster first meaningful content
Fresh data on every request
Good for public dynamic pages
```

**Cons:**

```
Higher server cost
Slower TTFB if APIs are slow
More infra complexity
Hydration cost still exists
```

**Important correction:**

```
SSR is not automatically faster than CSR.
If the server waits for many slow APIs, SSR can have poor TTFB.
```

**Key line:**

_`SSR = HTML is generated on the server at request time.`_

---

### SSG: Static Site Generation

In SSG, HTML is generated during the build phase.

`Build phase means your CI/CD build, such as Jenkins, GitHub Actions, or GitLab CI.`

**Flow:**

```
Developer pushes code
↓
Jenkins pipeline runs
↓
npm run build executes
↓
Framework generates static HTML/CSS/JS files
↓
Files are uploaded to S3 or static hosting
↓
CDN serves the files to users
```

**Example:**

```
/pages/about
/pages/blog/rendering-strategies
```

**can become:**

```
/out/about/index.html
/out/blog/rendering-strategies/index.html
```

**Best for:**

```
Marketing pages
Blogs
Documentation
Landing pages
Privacy policy
About page
Mostly static public pages
```

**Pros:**

```
Very fast
Cheap to host
Excellent SEO
Easy CDN caching
No server rendering per request
```

**Cons:**

```
Data can become stale
New build needed to update generated HTML
Not suitable for user-specific data
Build time can increase for huge sites
```

**Important point:**

```
S3 only stores and serves files.
Usually CloudFront/CDN sits in front of S3.
```

**Deployment model:**

`User → CloudFront/CDN → S3 static HTML files`

**Key line:**

`SSG = HTML is generated once during build time and reused for users until next build/deploy.`

---

### ISR: Incremental Static Regeneration

ISR is like SSG, but individual pages can be regenerated after deployment.

**Important:**

```
ISR does not rerun Jenkins.
ISR does not regenerate pages in the browser.
ISR regenerates stale pages on the deployed server/serverless runtime.
```

**Flow:**

```
Jenkins build runs
↓
Initial static pages are generated
↓
App is deployed
↓
User requests a page
↓
Cached HTML is served
↓
Revalidate time expires
↓
Next request triggers regeneration
↓
Server/runtime fetches fresh data
↓
New HTML is generated and cached
↓
Future users get fresh HTML
```

**Example:**

```js
export async function getStaticProps() {
  const course = await fetchCourse();

  return {
    props: { course },
    revalidate: 60,
  };
}
```

**Meaning:**

```
Serve cached page.
After 60 seconds, page becomes eligible for regeneration.
Next request after that can trigger regeneration.
Fresh HTML is cached for later users.
```

**Example timeline:**

```
10:00 AM:
Jenkins build generates course page with price ₹4999.

10:02 AM:
Price changes in CMS to ₹3999.

10:03 AM:
Revalidate window expires.

10:03:05 AM:
User visits page. Old page may still be served.


Background regeneration happens:
- deployed server calls CMS/API
- gets new price ₹3999
- generates fresh HTML
- updates cache

10:03:10 AM:
Next user sees ₹3999.
```

**Best for:**

```
Product pages
Course pages
Blog pages with updates
Public catalog pages
Pages where slight staleness is acceptable
```

**Pros:**

```
Fast like SSG
Better freshness than SSG
Lower server cost than SSR
Does not require full rebuild for every content update
```

**Cons:**

```
Data can still be stale temporarily
Requires runtime/server support
More complex than pure SSG
Not ideal for real-time or user-specific pages
```

**Deployment difference:**

```
Pure SSG:
Jenkins → static files → S3/CloudFront
```

**ISR:**

```
Jenkins → initial build → deployed runtime/serverless platform
Runtime regenerates stale pages after deployment
```

**Key line:**

`ISR = HTML is generated at build time initially, then stale individual pages are regenerated later by the deployed server/runtime, not Jenkins`

---
