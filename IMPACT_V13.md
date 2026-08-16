# TAMVER Research v0.5 — Evidence Impact Crystal

## Source basis
This package uses the uploaded **TAMVER Decision Evidence Ledger v12** as the authoritative technical basis.

v12 natively implements backward provenance:

```text
Report Claim
→ Metric
→ Formula
→ Scenario Node
→ Evidence Item
→ Original Source
```

Its own README recommends a future v13 **Evidence Impact Explorer**:

```text
Evidence
→ affected AIR nodes
→ affected formulas
→ affected metrics
→ affected decision gates
→ affected report claims
```

## What v0.5 implements now

`src/lib/impact/project-impact.ts` derives a forward **public impact projection** by reversing only relationships already present in a sanitized v12 trace.

This is deliberately labelled:

`V12_TRACE_PROJECTION`

It does not claim that v12 already stores formula-input-level lineage.

## Current limitations inherited from v12

1. There is no native evidence → formula input relation.
2. `decisionGate` is a field on `ReportClaim`, not a standalone DB entity.
3. There is no v13 `/impact` endpoint in the supplied archive.

## Future v13 API contract

Research will automatically try:

```text
GET /api/tamver/evidence/impact?evidenceId=<id>
```

If available, the UI switches from `V12 TRACE PROJECTION` to `V13 LIVE FORWARD LINEAGE`.

## Security boundary

The existing v0.4 Publication Gateway remains mandatory. Internal URIs and non-public entities are not displayed by the Research layer.
