import type { EvidenceItem, EvidenceSource, LedgerTrace, LedgerTraceNode } from "./v12-types";

export type PublicationState = "DRAFT" | "REVIEW" | "APPROVED" | "PUBLIC" | "WITHDRAWN";

export interface PublicationRecord {
  entityType: "REPORT_CLAIM" | "EVIDENCE_ITEM" | "SOURCE" | "METRIC" | "FORMULA" | "SCENARIO_NODE";
  entityId: string;
  state: PublicationState;
  publicSlug?: string;
  approvedBy?: string;
  approvedAt?: string;
}

/**
 * v12 itself has validation state but no public/private publication state.
 * Research therefore uses a separate publication registry rather than changing v12 semantics.
 */
const publicationRegistry: PublicationRecord[] = [
  { entityType: "REPORT_CLAIM", entityId: "claim-scm", state: "PUBLIC", publicSlug: "claim-scm", approvedBy: "TAMVER Research Demo", approvedAt: "2026-08-09" },
  { entityType: "EVIDENCE_ITEM", entityId: "ev-supplier-single-point", state: "PUBLIC" },
  { entityType: "EVIDENCE_ITEM", entityId: "ev-inventory-buffer", state: "PUBLIC" },
  { entityType: "EVIDENCE_ITEM", entityId: "ev-air-output", state: "PUBLIC" },
  { entityType: "SOURCE", entityId: "src-supplier-contract", state: "PUBLIC" },
  { entityType: "SOURCE", entityId: "src-operations-register", state: "PUBLIC" },
  { entityType: "SOURCE", entityId: "src-model", state: "PUBLIC" },
  { entityType: "METRIC", entityId: "metric-scm-5511", state: "PUBLIC" },
  { entityType: "FORMULA", entityId: "f-scm-demo", state: "PUBLIC" },
  { entityType: "SCENARIO_NODE", entityId: "sn-supplier", state: "PUBLIC" },
  { entityType: "SCENARIO_NODE", entityId: "sn-logistics", state: "PUBLIC" },
  { entityType: "SCENARIO_NODE", entityId: "sn-production", state: "PUBLIC" },
];

function kindToEntityType(kind: LedgerTraceNode["kind"]): PublicationRecord["entityType"] {
  return kind;
}

export function isPublic(entityType: PublicationRecord["entityType"], entityId: string) {
  return publicationRegistry.some(x => x.entityType === entityType && x.entityId === entityId && x.state === "PUBLIC");
}

export function sanitizeSource(source: EvidenceSource): EvidenceSource {
  // Internal URIs never leave the publication boundary.
  const safeUri = source.uri?.startsWith("http://") || source.uri?.startsWith("https://") ? source.uri : undefined;
  return { ...source, uri: safeUri };
}

export function sanitizeEvidence(item: EvidenceItem): EvidenceItem | null {
  if (item.status !== "VALIDATED" || !item.analystValidated) return null;
  if (!isPublic("EVIDENCE_ITEM", item.id)) return null;
  return item;
}

export function sanitizeTrace(trace: LedgerTrace): LedgerTrace {
  const nodes = trace.nodes
    .filter(node => isPublic(kindToEntityType(node.kind), node.id))
    .map(node => {
      if (node.kind !== "SOURCE") return node;
      const details = { ...(node.details ?? {}) };
      const uri = details.uri;
      if (typeof uri === "string" && !/^https?:\/\//i.test(uri)) delete details.uri;
      return { ...node, details };
    });

  const allowed = new Set(nodes.map(x => x.id));
  const edges = trace.edges.filter(edge => allowed.has(edge.source) && allowed.has(edge.target));
  return { ...trace, nodes, edges };
}

export function listPublicationRecords() {
  return publicationRegistry;
}
