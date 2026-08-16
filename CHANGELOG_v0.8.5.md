# TAMVER Research v0.8.5 — Research & Knowledge Translation Pass

## Scope
Completes the first controlled translation pass for the remaining non-methodology knowledge articles across Russian, Spanish, Catalan, French, German, Italian and Portuguese. English remains the canonical source.

## Translated knowledge articles
- Decision Security for Family Business
- Strategic Decision Audit
- Decision Security Research Program

## Translation architecture
- Added `src/i18n/research-knowledge-content.ts` for localized article bodies.
- Extended `src/i18n/knowledge.ts` with localized titles and descriptions for the three remaining knowledge entries.
- Updated localized knowledge routes to resolve either methodology translations or research/knowledge translations before showing the English fallback.

## Terminology control
- DSS, AIR, SCM, Decision Security, Strategic Decision Audit and Decision Security Research Program remain stable where they function as canonical TAMVER identifiers.
- Translations preserve the meaning and level of detail of the English source articles and introduce no new claims.

## Unchanged
- Canonical English Markdown source articles.
- DSS/AIR/SCM methodology translation content from v0.8.3.
- Glossary and terminology registry.
- Language switcher behavior from v0.8.4.1.
- Andorra Scenario Crystal, formulas and scenario engine.
- Evidence Ledger / provenance integration.
