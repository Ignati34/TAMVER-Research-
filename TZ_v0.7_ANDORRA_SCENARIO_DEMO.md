# TAMVER Research v0.7 — Andorra Scenario Demo Crystal

## Purpose
Turn the Andorra case from a static Research page into a controllable demonstration of the supplied TAMVER DSS / AIR / SCM / Scenario engines.

## Source-derived engines
The page reimplements the formulas from `tamver_dss_air_demo_app_v0_2.zip` and the values from `TAMVER_DEMO_CASSETTE_v0_1.zip`:
- DSS: weighted DSI and DCI.
- AIR: criticality, opportunity score, uncertainty load, evidence gap penalty, priority score/category.
- SCM: source instability coefficient bands and adjustment formula.
- Scenario: risk load and opportunity load.

## Interactive controls
- Scenario preset selector + Probability / Impact / Uncertainty / Preparedness / Opportunity sliders.
- AIR dependency selector + all six source inputs.
- SCM axis selector + score slider.
- DSS domain selector + score / confidence / risk controls.
- Custom scenario variants saved locally in the browser.

## Visual output
- Diamond / Decision Crystal.
- AIR sector dependency network.
- Live DSI, DCI, SCM, AIR Priority and Scenario Risk.
- Top seven AIR dependencies with calculated coefficients.
- Motion pulse on control changes and selected dependency.

## Boundary
All starting values are illustrative demo cassette values. No official Andorra rating is asserted. No hidden cross-engine formula is invented; engines remain separate exactly as in the supplied demo application.
