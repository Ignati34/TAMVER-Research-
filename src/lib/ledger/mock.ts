import type { Claim, EvidenceItem, FormulaRef, LedgerSource, MetricRef, ScenarioNode } from './types';

// DEMONSTRATION DATA ONLY.
// This adapter exists so the frontend can be connected to the real TAMVER Decision Evidence Ledger v12 API later.
export const sources: LedgerSource[] = [
  { id:'SRC-TVR-AND-08', title:'TAMVER Andorra public-source evidence pilot v0.8', publisher:'TAMVER', sourceClass:'methodological', date:'2026-07-13', status:'public' },
  { id:'SRC-TVR-METHOD-10', title:'TAMVER Methodology Core / Formula Register', publisher:'TAMVER', sourceClass:'methodological', status:'approved' },
  { id:'SRC-TVR-CASSETTE-10', title:'TAMVER Cassette Schema v1.0', publisher:'TAMVER', sourceClass:'methodological', status:'approved' }
];

export const evidence: EvidenceItem[] = [
  { id:'EVD-AND-001', title:'Andorra DSS/AIR/SCM evidence-backed pilot baseline', summary:'Controlled public-source pilot baseline used to demonstrate traceability, review gates and reproducible analysis.', sourceIds:['SRC-TVR-AND-08','SRC-TVR-CASSETTE-10'], status:'public', confidence:'high', reviewedAt:'2026-07-13' },
  { id:'EVD-AND-002', title:'Critical cross-sector links require validation', summary:'The public-source pilot identifies seven critical AIR links. External use remains subject to evidence and independent-review gates.', sourceIds:['SRC-TVR-AND-08'], status:'public', confidence:'medium', reviewedAt:'2026-07-13' },
  { id:'EVD-METHOD-001', title:'Decision Security calculation lineage', summary:'Formula outputs are versioned and separated from evidence, assumptions and reviewer decisions.', sourceIds:['SRC-TVR-METHOD-10','SRC-TVR-CASSETTE-10'], status:'approved', confidence:'high' }
];

export const formulas: FormulaRef[] = [
  { id:'FRM-DSI-001', title:'Decision Security Index calculation', methodology:'DSS', status:'approved' },
  { id:'FRM-DCI-001', title:'Decision Confidence / Evidence Confidence calculation', methodology:'DSS', status:'approved' },
  { id:'FRM-SCM-001', title:'SCM Coordinate calculation', methodology:'SCM', status:'approved' }
];

export const metrics: MetricRef[] = [
  { id:'MET-AND-DSI', title:'Decision Security Index', value:'61.63', formulaId:'FRM-DSI-001', status:'public' },
  { id:'MET-AND-DCI', title:'Evidence Confidence', value:'78.15', formulaId:'FRM-DCI-001', status:'public' },
  { id:'MET-AND-SCM', title:'SCM Coordinate', value:'55.11', formulaId:'FRM-SCM-001', status:'public' },
  { id:'MET-AND-AIR', title:'Critical AIR links', value:'7', status:'public' }
];

export const scenarioNodes: ScenarioNode[] = [
  { id:'SCN-AND-TWC', title:'Tourism × Water / Climate', description:'Cross-sector dependency requiring validation under official data and 2030/2035 stress scenarios.', relatedEvidenceIds:['EVD-AND-001','EVD-AND-002'], status:'public' },
  { id:'SCN-AND-HD', title:'Housing × Demography', description:'Affordability, workforce and demographic pressure treated as a connected decision-security node.', relatedEvidenceIds:['EVD-AND-001','EVD-AND-002'], status:'public' }
];

export const claims: Claim[] = [
  {
    id:'CLM-AND-001',
    title:'Andorra pilot is analyzable but not decision-ready',
    statement:'The evidence-backed Andorra pilot produces reproducible analytical outputs, while review and publication gates remain incomplete; it should be treated as a controlled pilot rather than an official assessment.',
    evidenceIds:['EVD-AND-001','EVD-AND-002'],
    metricIds:['MET-AND-DSI','MET-AND-DCI','MET-AND-SCM','MET-AND-AIR'],
    formulaIds:['FRM-DSI-001','FRM-DCI-001','FRM-SCM-001'],
    scenarioNodeIds:['SCN-AND-TWC','SCN-AND-HD'],
    status:'public', confidence:'high', reviewer:'TAMVER controlled publication layer', lastVerified:'2026-07-13',
    limitations:['Public-source evidence baseline, not official Andorran data.','Independent substantive review and Decision Owner approval remain required.','Metrics are provisional TAMVER analytical outputs, not an official rating.']
  },
  {
    id:'CLM-METHOD-001',
    title:'Evidence is separated from calculation and interpretation',
    statement:'TAMVER separates source evidence, analytical assumptions, deterministic formula outputs and human review status so that a published conclusion can retain a traceable provenance chain.',
    evidenceIds:['EVD-METHOD-001'], metricIds:[], formulaIds:['FRM-DSI-001','FRM-DCI-001','FRM-SCM-001'], scenarioNodeIds:[],
    status:'approved', confidence:'high', lastVerified:'2026-08-09'
  }
];

export function getSource(id:string){ return sources.find(x=>x.id===id); }
export function getEvidence(id:string){ return evidence.find(x=>x.id===id); }
export function getFormula(id:string){ return formulas.find(x=>x.id===id); }
export function getMetric(id:string){ return metrics.find(x=>x.id===id); }
export function getScenarioNode(id:string){ return scenarioNodes.find(x=>x.id===id); }
export function getClaim(id:string){ return claims.find(x=>x.id===id); }
