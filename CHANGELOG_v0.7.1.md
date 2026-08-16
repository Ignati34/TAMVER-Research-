# TAMVER Research v0.7.1 — Main Crystal & Footer Contact Hotfix

Scope is intentionally narrow. The Andorra Scenario Demo Crystal is unchanged.

## Fix 1 — DSS CORE on the main page
- Removed the local `pointer-events:none` override in `CrystalHero.astro` that blocked the already-wired React handlers.
- `DSS CORE` is now pointer/focus interactive.
- Hover/focus launches the full node activation state, including the red flash and crystal pulse.
- Click behavior remains linked to the DSS knowledge page after the activation pulse.

## Fix 2 — Andorra office contact in the footer
- Kept the footer contact row shifted to the left on desktop/laptop.
- Added a compact narrow-screen layout so `MADRID`, `VIENNA`, and `ANDORRA` remain to the left of the floating bottom toolbar area.
- At <=560px the decorative separator dots are hidden to preserve click space and avoid overlap.

## Explicitly unchanged
- `/cases/andorra-2035/`
- `AndorraScenarioLab.tsx`
- Andorra crystal geometry, dependencies, coefficients, sliders, formulas, and scenario controls.
