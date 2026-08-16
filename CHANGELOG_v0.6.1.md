# v0.6.1 change log

Implemented from the approved v0.6.1 technical specification:

- Increased and raised hero Motion Crystal.
- Added `DSS CORE / Foundation Layer` structural node at the base.
- Repaired DSS interaction so it uses the same hover/click signal engine as AIR/SCM/Scenario/Evidence.
- Changed active node behavior: hover = preview; click = red flash + full propagation.
- Added reduced-motion handling to both crystal engines.
- Reworked Impact Crystal node layout to prevent the three scenario nodes from stacking on top of each other.
- Added deterministic stage-specific node positioning for Evidence Impact Crystal.
- Replaced inactive hamburger mark with accessible button/menu panel.
- Menu panel has no full-screen click-capturing overlay; closed state uses `pointer-events:none`.
- Made footer city labels actual buttons and added office contact dialog.
- Made TAMVER Research and Decision Security Knowledge Graph footer labels actual links.
- Corrected TAMVER lockup underline/research alignment using intrinsic lockup width.
- Added explicit pointer-event / z-index rules for footer and navigation.

## Build verification note
`npm install` could not complete in the current execution environment because its internal npm registry does not contain `@astrojs/react@^5.0.0` (HTTP 404). No dependency/version change was made to work around that environment-specific registry limitation.
