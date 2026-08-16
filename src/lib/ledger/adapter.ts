import * as demo from './mock';

/**
 * Public Ledger Adapter
 *
 * Current mode: static demo adapter.
 * Production target: replace these calls with the real Decision Evidence Ledger v12 API.
 * Frontend pages should import from this file, not directly from mock.ts.
 */
export const ledger = {
  listClaims: async () => demo.claims.filter(x => ['approved','public'].includes(x.status)),
  listEvidence: async () => demo.evidence.filter(x => ['approved','public'].includes(x.status)),
  listSources: async () => demo.sources.filter(x => ['approved','public'].includes(x.status)),
  listMetrics: async () => demo.metrics.filter(x => ['approved','public'].includes(x.status)),
  listScenarioNodes: async () => demo.scenarioNodes.filter(x => ['approved','public'].includes(x.status)),
  getClaim: async (id:string) => demo.getClaim(id),
  getEvidence: async (id:string) => demo.getEvidence(id),
  getSource: async (id:string) => demo.getSource(id),
  getMetric: async (id:string) => demo.getMetric(id),
  getFormula: async (id:string) => demo.getFormula(id),
  getScenarioNode: async (id:string) => demo.getScenarioNode(id),
};
