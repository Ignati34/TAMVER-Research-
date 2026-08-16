export type PublicationStatus = 'draft' | 'review' | 'verified' | 'approved' | 'public' | 'superseded';
export type EvidenceClass = 'primary' | 'official' | 'professional' | 'expert' | 'methodological';

export interface LedgerSource {
  id: string;
  title: string;
  publisher?: string;
  sourceClass: EvidenceClass;
  date?: string;
  url?: string;
  status: PublicationStatus;
}

export interface EvidenceItem {
  id: string;
  title: string;
  summary: string;
  sourceIds: string[];
  status: PublicationStatus;
  confidence: 'low' | 'medium' | 'high';
  reviewedAt?: string;
}

export interface FormulaRef {
  id: string;
  title: string;
  expression?: string;
  methodology: string;
  status: PublicationStatus;
}

export interface MetricRef {
  id: string;
  title: string;
  value: string;
  formulaId?: string;
  status: PublicationStatus;
}

export interface ScenarioNode {
  id: string;
  title: string;
  description: string;
  relatedEvidenceIds: string[];
  status: PublicationStatus;
}

export interface Claim {
  id: string;
  title: string;
  statement: string;
  evidenceIds: string[];
  metricIds: string[];
  formulaIds: string[];
  scenarioNodeIds: string[];
  status: PublicationStatus;
  confidence: 'low' | 'medium' | 'high';
  reviewer?: string;
  lastVerified?: string;
  limitations?: string[];
}
