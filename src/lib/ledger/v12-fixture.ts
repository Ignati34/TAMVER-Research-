import type { EvidenceItem, LedgerTrace } from "./v12-types";

/** Exact demo content shipped in TAMVER Decision Evidence Ledger v12. */
export const v12EvidenceFixture: EvidenceItem[] = [
  {
    id: "ev-supplier-single-point", sourceId: "src-supplier-contract", title: "Single-source dependency",
    excerpt: "The production line depends on one critical supplier without an approved alternative source.",
    status: "VALIDATED", qualityScore: 92, confidence: 0.96, analystValidated: true,
    validatedBy: "Lead Analyst", tags: ["supplier", "dependency", "critical"], sourceLocator: { section: "Supply obligations" }
  },
  {
    id: "ev-inventory-buffer", sourceId: "src-operations-register", title: "Limited inventory buffer",
    excerpt: "Current buffer covers materially less than the modeled disruption horizon.",
    status: "VALIDATED", qualityScore: 84, confidence: 0.88, analystValidated: true,
    validatedBy: "Lead Analyst", tags: ["inventory", "resilience"], sourceLocator: { section: "Supply continuity" }
  },
  {
    id: "ev-air-output", sourceId: "src-model", title: "AIR propagation result",
    excerpt: "Supplier shock propagates to logistics, production and delivery commitments.",
    status: "VALIDATED", qualityScore: 78, confidence: 0.82, analystValidated: true,
    validatedBy: "Methodology Reviewer", tags: ["AIR", "propagation"]
  }
];

export const v12TraceFixture: LedgerTrace = {
  rootClaimId: "claim-scm",
  nodes: [
    { id:"claim-scm", kind:"REPORT_CLAIM", label:"System coherence is insufficient for direct acceptance and requires redesign / pilot controls.", details:{section:"Executive Summary",reportVersion:1,decisionGate:"PILOT_FIRST"}},
    { id:"metric-scm-5511", kind:"METRIC", label:"SCM = 55.11", details:{metricCode:"SCM",value:55.11}},
    { id:"f-scm-demo", kind:"FORMULA", label:"SCM stress recalculation", details:{formulaRegisterVersion:"1.0-demo",expression:"SCM_stress = SCM_baseline - f(weighted_shock, coverage, propagation_depth)"}},
    { id:"sn-supplier", kind:"SCENARIO_NODE", label:"Critical Supplier", details:{scenarioRunId:"run-70cc3110",nodeId:"supplier",nodeType:"DEPENDENCY"}},
    { id:"sn-logistics", kind:"SCENARIO_NODE", label:"Logistics", details:{scenarioRunId:"run-70cc3110",nodeId:"logistics",nodeType:"DEPENDENCY"}},
    { id:"sn-production", kind:"SCENARIO_NODE", label:"Production", details:{scenarioRunId:"run-70cc3110",nodeId:"production",nodeType:"SUBSECTOR"}},
    { id:"ev-supplier-single-point", kind:"EVIDENCE_ITEM", label:"Single-source dependency", details:{qualityScore:92,confidence:0.96,validated:true}},
    { id:"ev-inventory-buffer", kind:"EVIDENCE_ITEM", label:"Limited inventory buffer", details:{qualityScore:84,confidence:0.88,validated:true}},
    { id:"ev-air-output", kind:"EVIDENCE_ITEM", label:"AIR propagation result", details:{qualityScore:78,confidence:0.82,validated:true}},
    { id:"src-supplier-contract", kind:"SOURCE", label:"Critical Supplier Contract", details:{sourceType:"INTERNAL_PRIMARY",organization:"Illustrative Client",uri:"internal://contracts/supplier-001"}},
    { id:"src-operations-register", kind:"SOURCE", label:"Operations Risk Register", details:{sourceType:"INTERNAL_PRIMARY",organization:"Illustrative Client",uri:"internal://risk/operations-2026"}},
    { id:"src-model", kind:"SOURCE", label:"TAMVER AIR Scenario Run", details:{sourceType:"SYSTEM_GENERATED",organization:"TAMVER",uri:"tamver://scenario/run-70cc3110"}}
  ],
  edges: [
    {source:"claim-scm",target:"metric-scm-5511",relation:"DERIVED_FROM"},
    {source:"metric-scm-5511",target:"f-scm-demo",relation:"CALCULATED_WITH"},
    {source:"metric-scm-5511",target:"sn-supplier",relation:"PROPAGATED_THROUGH"},
    {source:"metric-scm-5511",target:"sn-logistics",relation:"PROPAGATED_THROUGH"},
    {source:"metric-scm-5511",target:"sn-production",relation:"PROPAGATED_THROUGH"},
    {source:"claim-scm",target:"ev-supplier-single-point",relation:"SUPPORTED_BY"},
    {source:"claim-scm",target:"ev-inventory-buffer",relation:"SUPPORTED_BY"},
    {source:"claim-scm",target:"ev-air-output",relation:"SUPPORTED_BY"},
    {source:"ev-supplier-single-point",target:"src-supplier-contract",relation:"EXTRACTED_FROM"},
    {source:"ev-inventory-buffer",target:"src-operations-register",relation:"EXTRACTED_FROM"},
    {source:"ev-air-output",target:"src-model",relation:"EXTRACTED_FROM"}
  ]
};
