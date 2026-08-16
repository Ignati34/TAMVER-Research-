# TAMVER Research v0.6.2 — Interface Fix

Scope: correction pass on v0.6.1.

Implemented:
- DSS CORE is now interactive (hover/focus/click) and uses the same pulse engine as the other crystal nodes.
- Hero frame extended by 15% while the WebGL diamond is reduced so both crown and lower foundation remain visible.
- Knowledge/Library copy is shifted left by 50% of the shell gutter on desktop.
- Footer city cluster is offset left to avoid the center-bottom preview/browser toolbar zone; mobile resets the offset.
- Existing menu, office dialog and node-collision fixes are retained.

Acceptance checks:
1. Hover/click DSS CORE => visual response and link to DSS knowledge page.
2. Crystal top and base visible at 1440px and common laptop widths.
3. Madrid/Vienna/Andorra remain clickable.
4. Menu open/close does not disable the footer.
