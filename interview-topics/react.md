## Tier 1 (Must Know)

### 1. React Rendering & Re-rendering

#### Topics

- Render vs Re-render
- Reconciliation
- Virtual DOM
- React Fibre
- Commit Phase
- Keys
- State Preservation
- React.memo
- useMemo
- useCallback
- Stale Closures

#### Common Questions

- What causes a component to re-render?
- Why is my child component re-rendering?
- Difference between render and DOM update?
- How does React.memo work?
- What are stale closures?

**Priority:** Very High

---

### 2. React Hooks

#### Topics

- useState
- useEffect
- useRef
- useMemo
- useCallback
- useReducer

#### Common Questions

- Difference between useState and useRef?
- When does useEffect run?
- Why is my effect running twice?
- What causes stale closures?
- When should you use useReducer?

**Priority:** Very High

---

### 3. State Management

#### Topics

- Redux vs Context
- Redux vs React Query
- Server State vs Client State
- State Colocation
- Context Performance Pitfalls

#### Common Questions

- When would you use Redux?
- When would you use React Query?
- Why not use Context for everything?
- What belongs in server state?

**Priority:** Very High

---

### 4. React Performance

#### Topics

- React.memo
- useMemo
- useCallback
- Code Splitting
- Lazy Loading
- Dynamic Imports
- Bundle Optimization
- Virtualization

#### Common Questions

- How do you debug performance issues?
- How do you identify unnecessary re-renders?
- How do you reduce bundle size?
- How do you improve LCP?

**Priority:** Very High

---

## Tier 2 (Very Relevant)

### 5. Next.js

#### Topics

- SSR
- CSR
- SSG
- ISR
- Hydration
- Server Components
- Client Components
- Dynamic Imports
- Image Optimization

#### Common Questions

- SSR vs CSR?
- When would you use ISR?
- What is hydration?
- Server Components vs Client Components?

**Priority:** High

---

### 6. Component Design

#### Topics

- Controlled vs Uncontrolled Components
- Reusable Components
- Compound Components
- Config-driven UI
- Table Design
- Modal Design
- Form Design

#### Common Questions

- How would you build a reusable table?
- How do you avoid prop drilling?
- How do you structure large forms?
- What makes a component reusable?

**Priority:** High

---

### 7. Production Engineering

#### Topics

- Sentry
- Feature Flags
- Rollbacks
- Monitoring
- Logging
- Release Strategy

#### Common Questions

- How do you debug production issues?
- How do you rollout risky features?
- What metrics do you monitor?
- How do you handle incidents?

**Priority:** High

---

## Tier 3 (Good to Revise)

### 8. JavaScript Core

#### Topics

- Closures
- Event Loop
- Promises
- Promise.all
- Debounce
- Throttle
- this Binding
- Prototype
- call, apply, bind

**Priority:** Medium

---

### 9. Browser & Web Fundamentals

#### Topics

- Critical Rendering Path
- LCP
- CLS
- INP
- Caching
- Cookies
- Local Storage
- Session Storage
- CDN

**Priority:** Medium

---

## What NOT To Spend Time On

- Advanced DSA
- Graphs
- Dynamic Programming
- Frontend System Design
- Low-Level Design
- React Fiber Internals
- Webpack Internals

---

## Expected Interview Distribution

| Area                                | Weight |
| ----------------------------------- | ------ |
| Resume Deep Dive                    | 40%    |
| React                               | 25%    |
| Next.js                             | 15%    |
| JavaScript                          | 10%    |
| Behavioral / Mentorship / Ownership | 10%    |

---

## Recommended Study Order

### Day 1

1. React Rendering & Reconciliation
2. useEffect
3. useRef
4. React Query vs Redux vs Context

### Day 2

5. React Performance
6. SSR vs CSR vs ISR
7. Component Design
8. Production Engineering

### Revision

9. JavaScript Core
10. Browser Performance Fundamentals

---

# High ROI Resume Stories To Prepare

1. DPP Migration & Performance Optimization
2. Post-login MFE Architecture
3. Sentry & Production Debugging
4. Mentorship & Code Reviews
5. BFF Layer & API Aggregation

For every story prepare:

## Problem

What was broken?

## Scale

How many users/modules/teams were affected?

## Ownership

What exactly did I do?

## Technical Decisions

Why did I choose this approach?

## Impact

- User Impact
- Engineering Impact
- Business Impact

## Tradeoffs

What would I improve today?

---

# Impact Buckets

## User Impact

- Reduced wait time
- Improved perceived performance
- Reduced UI jank
- Improved user experience

## Performance Impact

- Reduced bundle size
- Improved LCP/FCP
- Reduced re-renders
- Optimized asset loading

## Business Impact

- Supported revenue-generating flows
- Improved rollout speed
- Reduced friction in critical journeys
- Enabled scale

## Developer Experience Impact

- Reduced duplicate code
- Improved maintainability
- Increased reusability
- Reduced review cycles

## Team Impact

- Improved engineer productivity
- Reduced rework
- Improved planning
- Increased confidence and ownership

## Reliability Impact

- Safer releases
- Better monitoring
- Faster debugging
- Reduced regressions

## Architecture Impact

- Better module boundaries
- Easier scaling
- Reduced coupling
- Cleaner ownership

## Mentorship Impact

- Improved developer confidence
- Reduced implementation mistakes
- Improved code quality
- Increased feature ownership
