# Reconciliation

Interview definition:

> Reconciliation is React's process of comparing the previous virtual DOM tree with the new virtual DOM tree and determining the minimum changes needed in the real DOM.

### Example:

#### Before:

```jsx
<div>
  <h1>Hello</h1>
</div>
```

#### After:

```jsx
<div>
  <h1>Hello Ayush</h1>
</div>
```

React notices:

> div unchanged
> h1 unchanged
> text changed

Only text node updates.

---

## Post Reconciliation:

React knows what changed

Now React updates the DOM.

This is called: Commit Phase

#### Example:

> Render
> ↓
> Compare trees
> ↓
> Commit DOM updates

Only now user sees change.
