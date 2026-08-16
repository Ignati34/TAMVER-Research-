# TAMVER Research v0.8.1 — Multilingual URL Hotfix

## Fixed
- Removed runtime `new URL(...)` construction from `BaseLayout.astro` hreflang generation.
- Canonical and alternate language URLs are now built as normalized absolute strings from `Astro.site.origin` with development fallback to `Astro.url.origin`.
- Preserved all v0.8 language routes, language selector, translations and Andorra Scenario Crystal unchanged.

## Why
Astro dev server reported repeated `Invalid URL` exceptions after successful page responses. The only `new URL()` usage in `src/` was the v0.8 hreflang/canonical block.

## Unrelated warning
The Vite `optimizeDeps.esbuildOptions` deprecation warning originates from the current tool/plugin dependency chain and is not the source of the runtime `Invalid URL` error.
