# TAMVER Design System Sync — v0.6

## Source basis
Authorized observable source: `https://tamver.eu/` plus the supplied 3-page full-page screencapture dated 2026-08-09.

This package follows a website-design-cloner workflow: observable extraction → normalized tokens → implementation mapping → responsive notes → motion behavior. The exact named skill was not available in the runtime, so no proprietary/inaccessible CSS or assets were copied.

## Observable design DNA
- Large spaced TAMVER wordmark with a thin underline and tiny secondary label.
- Very restrained navigation; light text on dark photographic/olive surfaces.
- Alternation of near-black/olive image sections and pale off-white editorial sections.
- Thin geometric sans typography; uppercase display headings with generous whitespace.
- Hairline borders, no heavy card chrome, almost square geometry.
- Warm amber/ivory luminous motion on the globe; glow is a brand-level signal rather than generic blue neon.
- Off-white / charcoal / dark olive dominate; bright color is used sparingly.
- Editorial three-column cooperation blocks and thin location timeline/footer.

## v0.6 decisions for Research
1. Replace previous cool ice-blue Research palette with TAMVER warm ivory/amber + dark olive-black.
2. Keep Research-specific liquid black-silver `Knowledge\\Library` headline, but make it subordinate to the crystal.
3. Use the TAMVER-like logo lockup and hairline header/footer structure.
4. Use square/hairline Research panels rather than rounded SaaS cards.
5. Keep Evidence Crystal as the Research product signature, but its illumination now inherits the globe's warm-energy language.
6. Red is reserved for a short critical/active-node flash, not for persistent decoration.

## Accuracy boundary
The screenshots and rendered HTML do not expose every computed CSS token. Font family and some exact colors therefore use calibrated approximations. They are centralized in `src/styles/tamver-tokens.css` so verified values can replace them later without component rewrites.
