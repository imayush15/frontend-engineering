## Web Vitals

There are three core web vitals.

1. LCP (Largest Contentful Page)
2. INP (Interaction to Next Paint)
3. CLS (Cumulative Layout Shift)

# **INP (Interaction to Next Page)**:

It measures how responsive your page feels when the user interacts with it.

## 1. What INP measures

INP measures the delay between a user interaction and the next visible UI update.

Example:

```
User clicks “Add to Cart”
↓
Browser handles click event
↓
JavaScript runs
↓
State updates
↓
DOM updates
↓
Browser paints the next frame
```

INP measures the time from the interaction to the next paint.

- If the user clicks a button and the UI updates after 40ms, good.
- If the user clicks a button and nothing visibly changes for 700ms, bad INP.

---

## 2. What counts as an interaction?

INP mainly considers these interactions:

1.  Keyboard Input
2.  Touch Tap
3.  Mouse Click

_**Note:** Scrolling is generally not counted directly as INP, although scroll-related JS can still hurt responsiveness indirectly by blocking the main thread._

## 3. Good, needs improvement, poor INP

1. Good: ≤ 200ms
2. Needs improvement:200ms to 500ms
3. Poor: > 500ms

## 4. How INP is different from LCP

- LCP is about loading performance.
- INP is about runtime responsiveness.

## 5. How INP is different from FID

Older Core Web Vital:

> FID = First Input Delay

- FID only measured the delay before the browser could start handling the first interaction.

Newer metric:

> INP = Interaction to Next Paint

- INP is broader. It considers interactions across the page lifecycle and measures until the next visual paint.

## 6. The three parts of INP

An interaction delay has three major parts:

1. Input delay
2. Processing time
3. Presentation delay

### 1. Input delay

Time between user action and browser starting the event handler.

This gets bad when the main thread is busy.

### 2. Processing time

Time spent running the event handler.

```js
button.onClick = () => {
  expensiveCalculation();
  updateHugeState();
  renderLargeList();
};
```

### 3. Presentation delay

Time after JS work is done until browser paints the visual update.

## 7. Main reason INP becomes bad

The biggest villain is usually:

> Main thread blocking

---

# Summary

INP = responsiveness metric.

LCP = loading experience.
INP = interaction experience.

Good INP = under 200ms.

INP measures from user interaction to next visual paint.

Bad INP usually means the main thread is blocked.

Main causes:
heavy JS, slow event handlers, large re-renders, expensive layout, hydration, third-party scripts.

Best fixes:
light handlers, defer work, split long tasks, reduce re-renders, virtualize lists, use workers, show immediate feedback.
