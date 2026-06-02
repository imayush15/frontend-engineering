## Web Vitals

There are three core web vitals.

1. LCP (Largest Contentful Page)
2. INP (Interaction to Next Paint)
3. CLS (Cumulative Layout Shift)

# **LCP (Largest Contentful Page)**:

LCP measures how long it takes for the largest important visible element to render. Usually it is calculated by any of the below mentioned items.

```
hero image
banner image
main heading
large text block
video poster
large card/image above the fold
```

_**Note**: A good LCP is 2.5 seconds or less. Anything above 4 seconds is bad._

### Cause of Poor LCP

Bad LCP usually comes from four areas:

```
slow server response
render-blocking CSS/JS
large unoptimized image
client-side rendering delay
```

For React/Next.js, the common causes are:

```
too much JS before content appears
heavy hydration
large initial bundle
API waterfall before rendering
unoptimized hero image
font blocking
third-party scripts
slow CDN/cache miss
```

### How to improve LCP - 3 steps

1. Identify the element that is being used to used to calculate the LCP using the `Performance` tab.If the element that you see is an image, try optimizing the image load either by
   - Setting its load priority

   ```javascript
   <Image
     src="/hero.webp"
     alt="Hero banner"
     width={1200}
     height={600}
     priority
   />
   ```

   - Using alternate versions of the image such as webp/avif

2. Look for JavaScript and CSS that blocks the rendering. LCP gets impacted when the browser is busy downloading and parsing and executing the JS/CSS files. We can fix this by:
   - Code split route-level bundles
   - Lazy-load below-the-fold _(part of the page that is not visible on the screen when the page first loads)_ components
   - Remove unused libraries
   - Avoid loading modals, drawers, charts, editors, carousels upfront
   - Inline or prioritize critical CSS _(make sure the CSS needed to render the first visible screen loads as early as possible.)_
   - Defer third-party scripts

3. Remove API waterfalls before rendering above-the-fold content

Bad flow:

```
Page loads
→ Fetch user
→ Then fetch batch
→ Then fetch content
→ Then render main UI
```

Better Flow:

```
Fetch critical data in parallel
Cache stable data
Server-render critical content
Render above-the-fold shell early
Defer below-the-fold widgets
Avoid blocking the LCP element on non-critical APIs
```

---

Reduce LCP by fixing:

1. The LCP asset
2. The blocking JS/CSS
3. The blocking data waterfall
