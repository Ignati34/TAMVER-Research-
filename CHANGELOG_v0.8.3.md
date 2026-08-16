# TAMVER Research v0.8.3 — Methodology Translation Pass

## Scope
Full body translation for the five core methodology knowledge pages across the seven localized routes (Russian, Spanish, Catalan, French, German, Italian, Portuguese), while English remains the canonical source.

## Translated pages
- DSS — Decision Security System
- AIR — Adaptive Interdependency Risk
- SCM — System Coherence Model
- Evidence Registry
- Scenario Stress-Test

## Terminology control
Translations use the controlled terminology established in `src/i18n/terminology.ts`. Canonical TAMVER identifiers such as DSS, AIR, SCM, Decision Security, Decision Gate, Evidence Registry and Scenario Stress-Test remain stable where they function as methodology/product names.

## Architecture
- Added `src/i18n/methodology-content.ts` as the localized body-content layer.
- Localized knowledge routes render translated body sections for the five approved articles.
- Other knowledge articles retain the explicit English fallback notice.
- No changes to Andorra Scenario Crystal, simulation formulas, DSS/AIR/SCM engine logic, footer interaction, or Three.js motion.
