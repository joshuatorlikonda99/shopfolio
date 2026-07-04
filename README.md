# Shopfolio — Mini E-commerce App

A small e-commerce front end built against the [Fake Store API](https://fakestoreapi.com),
built with React 18/19 + TypeScript + Vite + Sass modules.

**Live URL:** https://shopfolio-iota.vercel.app/
**Repo:** https://github.com/joshuatorlikonda99/shopfolio

## Setup

Requires Node 18+.

```bash
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-checks then builds to dist/
npm run preview    # serves the production build locally
npm run test        # runs the unit tests (Vitest)
```

### Running it in VS Code

1. Unzip the project and open the folder in VS Code (`File → Open Folder…`).
2. Open a terminal in VS Code (`` Ctrl+` ``) and run `npm install`.
3. Run `npm run dev`, then open the printed `http://localhost:5173` URL in your browser
   (or use VS Code's "Open in Browser" on the terminal link).
4. Recommended extensions: ESLint, and any Sass/SCSS syntax highlighter — no config
   needed beyond that, the project has no extra VS Code settings.

## What's implemented

- **Product Listing Page (`/`)** — responsive grid pulling live data from the Fake
  Store API, with a quick "Add to cart" on each card and a working loading/error state.
- **Product Detail Page (`/product/:id`)** — image gallery with clickable thumbnails,
  colour swatches, size buttons with in-stock/low-stock/sold-out states, a quantity
  picker capped to remaining stock, and an Add to Cart button that's disabled when
  the selected size is sold out. The selected colour + size is reflected in the URL
  (`?color=&size=`) so the exact variant is deep-linkable/shareable.
- **Navbar** — cart icon with a live item-count badge, opens the cart drawer.
- **Cart Drawer** — right-side slide-in panel; edit quantity or remove a line item
  directly; subtotal/total summary; persists to `localStorage` and survives a refresh.
- **Responsive layout** — single column with sideways-scrolling thumbnails on mobile
  (≤767px), two-column product detail and multi-column grid on desktop.
- **Global state** — Context API + `useReducer` for the cart (see `DECISIONS.md` for
  why, over Zustand/Redux).
- **Bonus: unit tests** — Vitest + Testing Library covering the size/variant selector
  (sold-out disabling, selection callback) and the quantity picker (min/max caps,
  fully-disabled state). Run with `npm run test`.
- **Bonus: mocked async Add to Cart** — the detail page's Add to Cart button calls a
  mock async function (`mockAddToCartRequest` in `src/api/fakeStoreApi.ts`) with an
  artificial delay and a ~12% simulated random failure, with a loading label and an
  inline retry on error.

## Known trade-off / important gap

**The Fake Store API has no colour, size, stock, brand, or sale-price fields.**
Since the spec requires all of those, variant data is synthesized deterministically
per product id (`src/utils/variantGenerator.ts`) — same product always gets the same
colours/sizes/stock across reloads, which is what makes the URL-based deep link
actually reproducible. This is flagged in code comments and discussed further in
`DECISIONS.md`.

## Project structure

```
src/
  api/            Fake Store API client + mock add-to-cart
  components/     Reusable UI (Navbar, CartDrawer, ProductCard, SizeButton, etc.)
  context/        CartContext (Context API + useReducer, localStorage-backed)
  hooks/          useProducts, useProduct
  pages/          ProductListingPage, ProductDetailPage
  router/         Route definitions
  styles/         Sass variables/mixins + global stylesheet
  types/          Shared TypeScript types
  utils/          Deterministic variant generator
tests/            Vitest unit tests
docs/             Lighthouse notes / screenshot
```

## Design notes

Visual direction is an "inventory ledger" look — hairline rules, a monospace type
for stock counts/variant labels, and a tick-mark stock gauge (`StockMeter`) instead
of a plain "3 left" text label, since stock state is the actual substance of this
assignment (sold out / low stock / in stock), not just decoration.
