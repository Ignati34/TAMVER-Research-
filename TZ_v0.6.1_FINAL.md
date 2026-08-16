# TAMVER Research v0.6.1 — Final Technical Specification

Base: **TAMVER Research v0.6 — Website Design Cloner + Motion Crystal**

Scope: UX and interaction correction release. No further pixel-perfect synchronization with tamver.eu is required.

## P0
- Functional header menu button with click/touch/keyboard support.
- Menu panel must not leave a full-screen invisible pointer-capturing overlay when closed.
- Footer remains clickable after menu open/close.
- Madrid / Vienna / Andorra are real interactive controls and open office-contact dialog.
- Footer labels that look like links are real links.
- Crystal node labels / hitboxes must not overlap.
- Existing DSS node is interactive.

## P1
- Enlarge and raise the hero crystal.
- Keep crystal base visible.
- Add non-critical structural `DSS CORE / Foundation Layer` node at the crystal base.
- Shorten TAMVER underline to the lockup width.
- Center `research` under the TAMVER lockup.
- Correct node hitboxes and focus behavior.

## P2
- Refine motion propagation.
- Reduced-motion support.
- Desktop / laptop / tablet node positioning.
- Keyboard focus states.

## Motion rules
- Hover/focus: soft preview pulse only.
- Click/touch activation: brief red node flash (~1.7 s), then amber light propagation through crystal edges.
- `DSS CORE` is structural and does not emit the critical red flash.

## Node collision rules
- Anchor, circle, title, subtitle and hitbox are treated as one collision unit.
- Multi-node `SCENARIO_NODE` groups are distributed spatially instead of sharing a single row.
- A node must not trigger a neighboring node.

## Acceptance
- AIR, DSS, SCM, Scenario and Evidence respond independently.
- DSS Core remains calm / structural.
- Menu opens/closes and Escape/click outside closes it.
- Footer remains clickable after menu use.
- Cities open contact UI.
- No scenario-node text overlap on normal desktop/laptop widths.
