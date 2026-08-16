/** Exact public-facing TypeScript model aligned to TAMVER Decision Evidence Ledger v12. */
export type EvidenceSourceType =
  | "INTERNAL_PRIMARY"
  | "OFFICIAL_EXTERNAL"
  | "INDEPENDENT_PROFESSIONAL"
  | "EXPERT"
  | "SYSTEM_GENERATED";

export type EvidenceStatus = "INGESTED" | "VALIDATED" | "REJECTED" | "SUPERSEDED";

export interface EvidenceSource {
  id: string;
  sourceType: EvidenceSourceType;
  title: string;
  organization?: string;
  uri?: string;
  retrievedAt?: string;
  publishedAt?: string;
}

export interface EvidenceItem {
  id: string;
  sourceId: string;
  title: string;
  excerpt?: string;
  status: EvidenceStatus;
  qualityScore: number;
  confidence: number;
  analystValidated: boolean;
  validatedBy?: string;
  validatedAt?: string;
  tags?: string[];
  sourceLocator?: {
    page?: number;
    lineStart?: number;
    lineEnd?: number;
    cell?: string;
    section?: string;
  };
}

export interface FormulaReference {
  id: string;
  formulaRegisterVersion: string;
  name: string;
  expression: string;
  description?: string;
}

export interface ScenarioNodeReference {
  id: string;
  scenarioRunId: string;
  nodeId: string;
  label: string;
  nodeType: string;
}

export interface MetricReference {
  id: string;
  metricCode: "DSI" | "DCI" | "SCM" | "AIR_LINK" | "RISK_SCORE";
  value: number | string;
  formulaId?: string;
  scenarioNodeIds?: string[];
}

export interface ReportClaim {
  id: string;
  reportId: string;
  reportVersion: number;
  section: string;
  claimText: string;
  metricId?: string;
  evidenceItemIds: string[];
  decisionGate?: string;
}

export type TraceKind =
  | "REPORT_CLAIM"
  | "METRIC"
  | "FORMULA"
  | "SCENARIO_NODE"
  | "EVIDENCE_ITEM"
  | "SOURCE";

export type TraceRelation =
  | "SUPPORTED_BY"
  | "DERIVED_FROM"
  | "CALCULATED_WITH"
  | "PROPAGATED_THROUGH"
  | "EXTRACTED_FROM";

export interface LedgerTraceNode {
  id: string;
  kind: TraceKind;
  label: string;
  details?: Record<string, string | number | boolean | null>;
}

export interface LedgerTraceEdge {
  source: string;
  target: string;
  relation: TraceRelation;
}

export interface LedgerTrace {
  rootClaimId: string;
  nodes: LedgerTraceNode[];
  edges: LedgerTraceEdge[];
}
