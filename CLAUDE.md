# TAMVER Research v0.4 — Claude Code Rules

## System of record
The TAMVER Decision Evidence Ledger v12 is the evidence/provenance system of record.
Do not create parallel evidence semantics in the Research frontend.

## Exact provenance model
Report Claim → Metric → Formula → Scenario Node → Evidence Item → Original Source.
Relations: SUPPORTED_BY, DERIVED_FROM, CALCULATED_WITH, PROPAGATED_THROUGH, EXTRACTED_FROM.

## Publication safety
- VALIDATED is not synonymous with PUBLIC.
- Publish only entities explicitly approved by the Research publication registry/gateway.
- Never render internal:// or tamver:// URIs publicly.
- Never expose rejected or superseded evidence as supporting evidence.
- Never invent source, metric, formula, reviewer, claim or validation metadata.

## Frontend
Keep the TAMVER design system: graphite black, cold silver, restrained ice glow, liquid-metal typography, crystalline graph language.
The central crystal should progressively become a semantic visualization of real LedgerTraceNode relationships.

## Integration
Use the exact v12 endpoints documented in INTEGRATION_V12.md.
Production must move publication filtering and redaction to a server-side public gateway.

## v0.5 Impact Lineage Rule
- Never describe Research-side forward projection as native v12 storage.
- Label derived forward lineage as `V12_TRACE_PROJECTION`.
- Use `V13_API` only when the forward-lineage endpoint actually responds.
- Do not infer formula-input-level evidence lineage unless the backend explicitly provides it.
