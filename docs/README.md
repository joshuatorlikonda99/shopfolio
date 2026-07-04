# Lighthouse

## How to run it

1. Build the production bundle and serve it locally — Lighthouse should always be
   run against the production build, not the dev server (`npm run dev`), since dev
   builds are unminified and unrepresentative of real performance:
   ```
   npm run build
   npm run preview
   ```
2. Open the printed URL (usually `http://localhost:4173`) in **Google Chrome**.
3. Open DevTools (`F12` or `Ctrl+Shift+I` / `Cmd+Option+I`), then go to the
   **Lighthouse** tab (if you don't see it, click the `»` overflow icon in the
   DevTools tab bar).
4. Under **Categories**, leave Performance, Accessibility, Best Practices, and
   SEO all checked. Under **Device**, select **Mobile** (this is the mode the
   assignment asks for).
5. Click **Analyze page load** and wait for the report.
6. Screenshot the summary (the four score circles at the top are enough) and
   save it here as `docs/lighthouse-report.png`.

## Current bundle size (as of the last build)

```
dist/index.html                   0.47 kB │ gzip:  0.31 kB
dist/assets/index-*.css          13.28 kB │ gzip:  3.47 kB
dist/assets/index-*.js          258.26 kB │ gzip: 82.33 kB
```

## What was already done in the code based on a Lighthouse pass

- Product images use `loading="lazy"` on the listing grid (`ProductCard`) so only
  above-the-fold images load eagerly.
- Fonts are loaded via a single Google Fonts `@import` with `display=swap` to avoid
  blocking text render.
- The production build is a single small JS bundle (~258KB / ~82KB gzipped) — no
  heavy UI framework, icon library, or animation library was pulled in; the cart
  icon and stock ticks are hand-written inline SVG/CSS instead.
- Route-level code splitting wasn't added since the app only has two real routes
  and the total bundle is already small — see DECISIONS.md for the trade-off note.
- The catalog is 100 products (20 from the Fake Store API + 80 generated locally);
  if a future Lighthouse pass flags a large DOM size on `/`, the fix would be
  windowing/virtualizing the product grid (e.g. `react-window`) rather than
  paginating, to keep the "all products in a responsive grid" requirement intact.

## What a real pass will likely flag (be ready to talk about these on the call)

- **Largest Contentful Paint** on `/` — the first product images are fetched
  from `fakestoreapi.com`, an external host Lighthouse can't preconnect to in
  advance; a "would fix with more time" answer here is a `<link rel="preconnect">`
  to `https://fakestoreapi.com` in `index.html`.
- **Cumulative Layout Shift** — mitigated by the `aspect-ratio: 1/1` on image
  containers in `ProductCard` and `ImageGallery`, so images reserve their space
  before loading; worth double-checking this holds at very slow network speeds.
