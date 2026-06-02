# RADIO FRAMEWORK

## R - Requirements

Before designing any system, clarify about the requirements in as much detail as possible.

- What are the main user flows
- What is the scale?
- Is SEO important?
- Does it need offline support?
- Is it for mobile and tablet screens as well?

```
 Note: In system design, vague requirements create vague architecture.
```

## A - Architecture

This is where rendering, app structure, and component architecture come in.

- CSR vs SSR
- single app vs microfrontend
- routing structure
- module boundaries
- component hierarchy
- shared UI/design system
- shell vs feature modules

## D - Data and state

This is where React Query, Redux, Zustand, BFF, caching, pagination, polling, WebSockets, etc come in.

- What data is needed?
- When do we fetch it?
- What is server state?
- What is client state?
- What goes in URL?
- What should be cached?
- What should be invalidated?

## I - Interfaces & Interactions

This is where API contracts, props, event flows, permissions, access checks, and user actions come in.

- Frontend <-> backend APIs
- component interfaces
- events
- contracts between shell and microfrontends
- user interactions
- loading/error/empty states

## O - Optimizations & Operations

This is where production-readiness comes in.

Here we cover

- performance
- bundle size
- lazy loading
- virtualization
- error handling
- security
- accessibility
- observability
- testing
- deployment
- rollout
- rollback
