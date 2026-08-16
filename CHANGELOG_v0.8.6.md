# TAMVER Research v0.8.6 — Research Content Expansion

## Scope
Expands the three previously minimal canonical English Research/Knowledge articles into substantive, source-aligned knowledge assets while preserving the multilingual architecture.

## Expanded canonical articles
- Decision Security for Family Business
- Strategic Decision Audit
- Decision Security Research Program

## Knowledge index localization correction
- Localized the visible card category labels (`methodology`, `research`, `evidence`, `industry`, `product`) instead of rendering the English source values from Markdown.
- Localized visible card tags instead of rendering English source tags.
- Added localization coverage for `risk`, `coherence`, `stability` and `auditability` so future card-layout changes do not reintroduce English fallback labels.
- Improved localized display titles for `Strategic Decision Audit` and `Decision Security Research Program` while preserving their canonical TAMVER names.
- Removed the remaining English `governance` wording from the Russian Family Business description and corrected mixed-language terminology in the German and Italian Family Business content.
- Canonical English Markdown values remain unchanged as source metadata.

## v0.8.6.1 Translation Synchronization Pass
- Synchronized the expanded canonical depth of all three Research/Knowledge articles across Russian, Spanish, Catalan, French, German, Italian and Portuguese.
- Family Business localized versions now include high-stakes decision triggers, Decision Security perspective, six research dimensions, TAMVER method links and publication rule.
- Strategic Decision Audit localized versions now include purpose, six audit questions, analytical sequence, outputs, Decision Gate principle, independence boundary and publication rule.
- Decision Security Research Program localized versions now include purpose, five research domains, methodology architecture, research outputs, evidence/provenance rule, research discipline and development direction.
- No new quantitative market claims were introduced in translation.

## Content principles
- Uses existing TAMVER methodology, product architecture, family-business research and evidence-governance logic as the source basis.
- Adds no unsupported quantitative market claims.
- Keeps legal, tax, financial and transaction execution separate from independent Decision Security verification.
- Preserves the distinction between facts, assumptions, calculated outputs and expert interpretation.
- Keeps public quantitative claims subject to TAMVER evidence and publication controls.

## Explicitly unchanged
- Controlled terminology registry.
- DSS/AIR/SCM methodology translation layer.
- Language-switcher behavior and localized routes.
- Andorra Scenario Crystal, formulas and simulation engine.
- Evidence Ledger / provenance integration.

## Release gate
Before merge: run a production build, visually inspect the Knowledge index and the three expanded articles in all eight languages, confirm no English fallback text appears outside canonical TAMVER identifiers, then update PR #2 and merge.
