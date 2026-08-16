import type { LedgerTraceNode, TraceRelation } from "../ledger/v12-types";

export type ImpactStage =
  | "EVIDENCE_ITEM"
  | "SCENARIO_NODE"
  | "FORMULA"
  | "METRIC"
  | "DECISION_GATE"
  | "REPORT_CLAIM";

export interface ImpactNode {
  id: string;
  stage: ImpactStage;
  label: string;
  details?: Record<string, string | number | boolean | null>;
  confidence?: number;
  qualityScore?: number;
  validated?: boolean;
  sourceNode?: LedgerTraceNode;
}

export interface ImpactEdge {
  source: string;
  target: string;
  relation: TraceRelation | "AFFECTS" | "CONTRIBUTES_TO" | "GATES";
  inferred: boolean;
}

export interface EvidenceImpactProjection {
  rootEvidenceId: string;
  nodes: ImpactNode[];
  edges: ImpactEdge[];
  basis: "V12_TRACE_PROJECTION" | "V13_API";
  limitations: string[];
}
