import type { LedgerTrace, LedgerTraceNode } from "../ledger/v12-types";
import type { EvidenceImpactProjection, ImpactEdge, ImpactNode } from "./types";

const byId = (trace: LedgerTrace) => new Map(trace.nodes.map(n => [n.id, n]));

function detailsNumber(node: LedgerTraceNode | undefined, key: string) {
  const value = node?.details?.[key];
  return typeof value === "number" ? value : undefined;
}

/**
 * v12 stores backward provenance from report claim to supporting evidence/source.
 * This function reverses only relationships already present in that trace to create
 * a public-facing impact projection. It does NOT claim formula-input-level lineage.
 */
export function projectEvidenceImpact(trace: LedgerTrace, evidenceId: string): EvidenceImpactProjection {
  const nodeMap = byId(trace);
  const evidence = nodeMap.get(evidenceId);
  if (!evidence || evidence.kind !== "EVIDENCE_ITEM") {
    return {
      rootEvidenceId: evidenceId,
      nodes: [],
      edges: [],
      basis: "V12_TRACE_PROJECTION",
      limitations: ["Evidence item is not present in the supplied v12 trace."],
    };
  }

  const claims = trace.edges
    .filter(e => e.relation === "SUPPORTED_BY" && e.target === evidenceId)
    .map(e => nodeMap.get(e.source))
    .filter((n): n is LedgerTraceNode => Boolean(n && n.kind === "REPORT_CLAIM"));

  const impactNodes: ImpactNode[] = [{
    id: evidence.id,
    stage: "EVIDENCE_ITEM",
    label: evidence.label,
    details: evidence.details,
    confidence: detailsNumber(evidence, "confidence"),
    qualityScore: detailsNumber(evidence, "qualityScore"),
    validated: evidence.details?.validated === true,
    sourceNode: evidence,
  }];
  const impactEdges: ImpactEdge[] = [];

  for (const claim of claims) {
    const metricEdges = trace.edges.filter(e => e.source === claim.id && e.relation === "DERIVED_FROM");
    const metrics = metricEdges.map(e => nodeMap.get(e.target)).filter((n): n is LedgerTraceNode => Boolean(n && n.kind === "METRIC"));

    for (const metric of metrics) {
      const scenarioNodes = trace.edges
        .filter(e => e.source === metric.id && e.relation === "PROPAGATED_THROUGH")
        .map(e => nodeMap.get(e.target))
        .filter((n): n is LedgerTraceNode => Boolean(n && n.kind === "SCENARIO_NODE"));

      const formulas = trace.edges
        .filter(e => e.source === metric.id && e.relation === "CALCULATED_WITH")
        .map(e => nodeMap.get(e.target))
        .filter((n): n is LedgerTraceNode => Boolean(n && n.kind === "FORMULA"));

      for (const scenario of scenarioNodes) {
        if (!impactNodes.some(n => n.id === scenario.id)) impactNodes.push({ id: scenario.id, stage: "SCENARIO_NODE", label: scenario.label, details: scenario.details, sourceNode: scenario });
        impactEdges.push({ source: evidence.id, target: scenario.id, relation: "AFFECTS", inferred: true });
      }

      for (const formula of formulas) {
        if (!impactNodes.some(n => n.id === formula.id)) impactNodes.push({ id: formula.id, stage: "FORMULA", label: formula.label, details: formula.details, sourceNode: formula });
        const parents = scenarioNodes.length ? scenarioNodes : [evidence];
        for (const parent of parents) impactEdges.push({ source: parent.id, target: formula.id, relation: "CONTRIBUTES_TO", inferred: true });
      }

      if (!impactNodes.some(n => n.id === metric.id)) impactNodes.push({ id: metric.id, stage: "METRIC", label: metric.label, details: metric.details, sourceNode: metric });
      for (const formula of formulas) impactEdges.push({ source: formula.id, target: metric.id, relation: "CALCULATED_WITH", inferred: true });
      if (!formulas.length) impactEdges.push({ source: evidence.id, target: metric.id, relation: "CONTRIBUTES_TO", inferred: true });

      const gate = claim.details?.decisionGate;
      if (typeof gate === "string" && gate) {
        const gateId = `gate:${claim.id}:${gate}`;
        impactNodes.push({ id: gateId, stage: "DECISION_GATE", label: gate, details: { decisionGate: gate } });
        impactEdges.push({ source: metric.id, target: gateId, relation: "GATES", inferred: true });
        impactEdges.push({ source: gateId, target: claim.id, relation: "GATES", inferred: true });
      } else {
        impactEdges.push({ source: metric.id, target: claim.id, relation: "DERIVED_FROM", inferred: true });
      }
    }

    if (!impactNodes.some(n => n.id === claim.id)) impactNodes.push({ id: claim.id, stage: "REPORT_CLAIM", label: claim.label, details: claim.details, sourceNode: claim });
  }

  return {
    rootEvidenceId: evidenceId,
    nodes: impactNodes,
    edges: impactEdges.filter((e, i, a) => a.findIndex(x => x.source === e.source && x.target === e.target && x.relation === e.relation) === i),
    basis: "V12_TRACE_PROJECTION",
    limitations: [
      "v12 does not store evidence-to-formula input-level lineage; formula impact is projected from the report-claim trace.",
      "v12 does not expose a native decision-gate entity; the gate node is derived from ReportClaim.decisionGate.",
      "Replace this projection with the planned v13 forward-lineage API when available.",
    ],
  };
}
