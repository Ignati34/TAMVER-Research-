# TAMVER Controlled Terminology v0.8.2

Status: terminology review baseline for multilingual TAMVER Research.

## Core rule

English canonical terms remain stable TAMVER identifiers across all locales. Localized terms are approved explanatory equivalents for UI, explanatory prose and translated research pages. Product names, methodology names, API fields and evidence-ledger entity identifiers should not be silently renamed.

## Canonical terms

1. Decision Security
2. Evidence
3. Interdependency
4. Scenario Stress-Test
5. Provenance
6. System Coherence
7. Decision Gate

## Translation policy

- First occurrence in long-form methodology content: localized equivalent + canonical English term in parentheses where helpful.
- UI labels may use the approved short localized form.
- DSS, AIR, SCM, DSI and DCI remain unchanged acronyms in all languages.
- “Decision Security” remains the brand/category canonical term even when the explanatory text is translated.
- “Decision Gate” remains the canonical control term; translated text explains its function.
- Provenance must communicate both origin and traceability; avoid translations that only mean “source”.
- Evidence must not be reduced to “data”: it includes sources, validated support, traceability and review context.
- Scenario Stress-Test describes testing under alternative conditions, not deterministic prediction.

## Source alignment

The terminology is aligned to existing TAMVER positioning and methodology materials: Decision Security is the verification layer for high-stakes decisions; DSS verifies the decision, AIR exposes interdependencies, SCM expresses structural coherence/resilience; scenario testing tests decisions under changing conditions; evidence and provenance provide a defensible trail.

## Implementation

Canonical registry: `src/i18n/terminology.ts`
Public glossary: `/glossary/` and localized variants.
This registry is the source to use for the next article-translation pass.
