# TAMVER Research v0.4 ↔ Decision Evidence Ledger v12

This version is aligned to the actual archive `TAMVER_Decision_Evidence_Ledger_v12.zip`.

## Exact v12 trace

```text
Report Claim
→ Metric
→ Formula
→ Scenario Node
→ Evidence Item
→ Original Source
```

## Exact v12 endpoints

```text
GET /api/tamver/evidence/items
GET /api/tamver/evidence/trace?claimId=claim-scm
```

## Exact v12 database tables

```text
tamver_evidence_source
tamver_evidence_item
tamver_formula_reference
tamver_scenario_node_reference
tamver_metric_reference
tamver_report_claim
tamver_report_claim_evidence
```

Research does not duplicate these tables.

## Publication Gateway

v12 has evidence validation states (`INGESTED`, `VALIDATED`, `REJECTED`, `SUPERSEDED`) but the provided schema has no public/private publication state. Research therefore introduces a separate publication registry.

The public website must never infer that `VALIDATED` automatically means `PUBLIC`.

Rules:

1. Evidence must be `VALIDATED`.
2. `analystValidated` must be true.
3. The entity must be explicitly present in the Research publication registry as `PUBLIC`.
4. `internal://` and `tamver://` URIs are stripped before public rendering.
5. Rejected and superseded evidence is excluded from public output.

## Runtime configuration

Copy `.env.example` to `.env` and set:

```text
PUBLIC_TAMVER_LEDGER_API_BASE=https://<ledger-api-host>
```

The current Hostinger-compatible static build uses a React island to fetch the Ledger API in the browser. This requires HTTPS and CORS to permit `https://research.tamver.eu`.

If no API base is configured, the site falls back to the exact illustrative v12 fixture (`claim-scm`).

## Recommended production API extension

Do not expose the existing internal endpoint directly to the public internet. Add a public-safe gateway endpoint such as:

```text
GET /api/public/research/evidence/trace?claimId=...
```

The gateway should apply publication-state checks and URI/metadata redaction on the server, not only in the browser.

## v13 path

The v12 README recommends Evidence Impact Explorer (forward lineage):

```text
Evidence
→ affected AIR nodes
→ affected formulas
→ affected metrics
→ affected decision gates
→ affected report claims
```

Research v0.4 keeps the data model compatible with that next direction.
