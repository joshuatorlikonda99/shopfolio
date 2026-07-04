# DECISIONS.md

## The architectural decision I could have gone either way on: Context API vs. a store library

For global cart state I used React's Context API + `useReducer` rather than pulling in
Zustand or Redux Toolkit. The app has exactly two pieces of shared state — the cart
line items and whether the drawer is open — and both only change in response to a
user action (add/remove/change quantity, open/close). Context re-renders every
consumer on any state change, which is the usual argument against it at scale, but
here the consumer tree is small (Navbar badge, CartDrawer, and whichever page is
mounted) and updates are infrequent, so that cost is negligible in practice.

The case for Zustand was mainly future-proofing: if this app grew (wishlist,
filters, auth, multi-step checkout), a selector-based store would avoid re-render
sprawl and give cleaner devtools/middleware. I picked Context because the brief
scoped this as a mini app, and reaching for a store library for two pieces of state
would be solving a scaling problem that doesn't exist yet — I'd rather introduce
Zustand the day a second slice of state actually needs it than pre-optimize now.

## Gaps I had to fill in with judgment

The Fake Store API has no colour, size, stock, or brand fields at all — but the
spec requires colour swatches, sold-out/low-stock sizes, and a brand line. I filled
this by deterministically synthesizing variant data per product id (`variantGenerator.ts`),
seeded so the same product always gets the same colours/sizes/stock on every load —
this matters because the selected variant lives in the URL and has to be reproducible
from a shared link. I called this out explicitly in code comments rather than quietly
faking it, since it's the kind of gap a reviewer should be able to spot immediately.

I also chose query params (`?color=&size=`) over nested routes (`/product/:id/:color/:size`)
for variant state — query params read more naturally as "options on this product"
rather than distinct pages, and made the "reflect selection in URL, keep it optional"
requirement simpler to satisfy without extra routes.

## What I'd do differently with more time

- Real product images per variant — right now the gallery reuses the single Fake
  Store image three times since the API doesn't provide alternates.
- Route-level code splitting (`React.lazy`) once there's more than two routes;
  not worth it yet at a 250KB bundle.
- Broader test coverage — I only covered the variant selector and quantity cap per
  the bonus scope; cart reducer logic (merge-by-variant, quantity floor at 0) is
  the next thing I'd add tests for.
- A friendlier retry on the listing page error state instead of a full page reload.
- Optimistic UI on quick-add instead of the drawer just appearing — a small toast
  or card animation would make the action feel more confirmed.
