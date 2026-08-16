export type DSSDomain = {
  domain_id:string; domain:string; weight:number; domain_score:number; confidence:number; risk:number; status:string;
};
export type AIRLink = {
  pair_id:string; sector_a:string; sector_b:string; link_strength:number; risk_exposure:number; opportunity_potential:number;
  uncertainty:number; implementation_capacity:number; evidence_confidence:number; note:string;
};
export type SCMAxis = { axis:string; score:number; description:string };
export type ScenarioRow = {
  scenario_id:string; scenario:string; horizon:string; probability:number; impact:number; uncertainty:number; preparedness:number;
  opportunity_potential:number; trigger_signals:string; recommended_action:string;
};

// Source: TAMVER_DEMO_CASSETTE_v0_1.zip + tamver_dss_air_demo_app_v0_2.zip.
// Values are intentionally kept identical to the supplied demonstration cassette.
export const DSS_BASELINE:DSSDomain[] = [
  {domain_id:'D1',domain:'Strategic mandate and decision context',weight:.12,domain_score:64.47,confidence:69,risk:2.33,status:'Controlled but fragile'},
  {domain_id:'D2',domain:'Evidence base and data quality',weight:.13,domain_score:49.4,confidence:53.67,risk:3.33,status:'Vulnerable decision'},
  {domain_id:'D3',domain:'Scenario and risk modelling',weight:.12,domain_score:38.4,confidence:45.33,risk:4.33,status:'Critical decision insecurity'},
  {domain_id:'D4',domain:'Economic and financial sustainability',weight:.11,domain_score:49,confidence:51.67,risk:3.33,status:'Vulnerable decision'},
  {domain_id:'D5',domain:'Operational and implementation capacity',weight:.11,domain_score:49.33,confidence:53.33,risk:3.33,status:'Vulnerable decision'},
  {domain_id:'D6',domain:'Institutional governance and accountability',weight:.11,domain_score:63.73,confidence:65.33,risk:2.33,status:'Controlled but fragile'},
  {domain_id:'D7',domain:'Stakeholders / political / social acceptance',weight:.10,domain_score:49.07,confidence:52,risk:3.33,status:'Vulnerable decision'},
  {domain_id:'D8',domain:'Legal / regulatory / compliance risks',weight:.10,domain_score:63.73,confidence:65.33,risk:2.33,status:'Controlled but fragile'},
  {domain_id:'D9',domain:'Monitoring, adaptation and learning',weight:.10,domain_score:49.33,confidence:53.33,risk:3.33,status:'Vulnerable decision'}
];

export const AIR_BASELINE:AIRLink[] = [
  {pair_id:'AD01',sector_a:'Tourism',sector_b:'Water_Climate',link_strength:90,risk_exposure:85,opportunity_potential:55,uncertainty:80,implementation_capacity:55,evidence_confidence:70,note:'Tourism depends on climate and water resources'},
  {pair_id:'AD02',sector_a:'Housing',sector_b:'Demography',link_strength:85,risk_exposure:80,opportunity_potential:60,uncertainty:70,implementation_capacity:50,evidence_confidence:65,note:'Housing pressure affects workforce and social balance'},
  {pair_id:'AD03',sector_a:'Finance',sector_b:'EU_Relations',link_strength:80,risk_exposure:70,opportunity_potential:75,uncertainty:60,implementation_capacity:70,evidence_confidence:75,note:'EU convergence affects banking model and market access'},
  {pair_id:'AD04',sector_a:'Tourism',sector_b:'Infrastructure',link_strength:88,risk_exposure:65,opportunity_potential:72,uncertainty:55,implementation_capacity:60,evidence_confidence:70,note:'Transport capacity conditions tourism growth'},
  {pair_id:'AD05',sector_a:'Digital_State',sector_b:'Finance',link_strength:65,risk_exposure:45,opportunity_potential:82,uncertainty:50,implementation_capacity:75,evidence_confidence:70,note:'Digital governance can improve transparency and financial services'},
  {pair_id:'AD06',sector_a:'Water_Climate',sector_b:'Infrastructure',link_strength:70,risk_exposure:75,opportunity_potential:55,uncertainty:65,implementation_capacity:50,evidence_confidence:60,note:'Infrastructure is exposed to climate and resource constraints'},
  {pair_id:'AD07',sector_a:'Institutional_Capacity',sector_b:'EU_Relations',link_strength:75,risk_exposure:65,opportunity_potential:80,uncertainty:55,implementation_capacity:65,evidence_confidence:75,note:'Governance capacity conditions EU adaptation'},
  {pair_id:'AD08',sector_a:'Tourism',sector_b:'Housing',link_strength:78,risk_exposure:70,opportunity_potential:50,uncertainty:60,implementation_capacity:45,evidence_confidence:60,note:'Tourism growth can intensify housing pressure'},
  {pair_id:'AD09',sector_a:'Finance',sector_b:'Institutional_Capacity',link_strength:82,risk_exposure:68,opportunity_potential:65,uncertainty:65,implementation_capacity:70,evidence_confidence:65,note:'Financial reputation depends on governance quality'},
  {pair_id:'AD10',sector_a:'Institutional_Capacity',sector_b:'Strategic_Investment',link_strength:80,risk_exposure:60,opportunity_potential:85,uncertainty:55,implementation_capacity:65,evidence_confidence:70,note:'Institutional capacity enables strategic investments'}
];

export const SCM_BASELINE:SCMAxis[] = [
  {axis:'Technological',score:72,description:'Protection of equipment, innovation and processes'},
  {axis:'Operational',score:58,description:'Physical integrity and continuity of operations'},
  {axis:'Resource',score:42,description:'Independence of critical supplies and logistics'},
  {axis:'Human_Capital',score:55,description:'Talent retention and knowledge transfer'},
  {axis:'Legal_Policy',score:64,description:'Compliance and regulatory adaptability'},
  {axis:'Social',score:48,description:'Organizational loyalty and reputational safeguards'},
  {axis:'Information',score:38,description:'Data protection and cyber resilience'},
  {axis:'Environmental',score:32,description:'Exposure to ESG and environmental risks'},
  {axis:'Financial',score:66,description:'Liquidity buffers and capital resilience'}
];

export const SCENARIO_BASELINE:ScenarioRow[] = [
  {scenario_id:'SC01',scenario:'Baseline managed adaptation',horizon:'2026-2030',probability:45,impact:55,uncertainty:45,preparedness:60,opportunity_potential:65,trigger_signals:'Moderate reforms, controlled demand changes',recommended_action:'Maintain monitoring and update roadmap'},
  {scenario_id:'SC02',scenario:'Climate / water stress on tourism',horizon:'2026-2035',probability:30,impact:85,uncertainty:75,preparedness:45,opportunity_potential:50,trigger_signals:'Droughts, water pressure, weaker tourism quality',recommended_action:'Run climate-water-tourism stress test'},
  {scenario_id:'SC03',scenario:'EU regulatory convergence shock',horizon:'2026-2030',probability:35,impact:70,uncertainty:60,preparedness:55,opportunity_potential:75,trigger_signals:'New EU requirements, banking and tax pressure',recommended_action:'Prepare legal and institutional adaptation plan'},
  {scenario_id:'SC04',scenario:'Housing affordability and social tension',horizon:'2026-2032',probability:40,impact:80,uncertainty:65,preparedness:45,opportunity_potential:55,trigger_signals:'Housing prices, workforce shortage, social pressure',recommended_action:'Connect housing, demography and labor market into one programme'},
  {scenario_id:'SC05',scenario:'Digital state acceleration',horizon:'2026-2030',probability:50,impact:60,uncertainty:45,preparedness:65,opportunity_potential:85,trigger_signals:'Digital services, data governance, AI adoption',recommended_action:'Use as transparency and efficiency opportunity'},
  {scenario_id:'SC06',scenario:'Financial reputation stress',horizon:'2026-2030',probability:25,impact:75,uncertainty:70,preparedness:60,opportunity_potential:60,trigger_signals:'Reputation risks, compliance pressure, external scrutiny',recommended_action:'Launch financial-regulatory DSS review'}
];

export function calcDSS(rows:DSSDomain[]){
  const weightSum=rows.reduce((a,r)=>a+r.weight,0)||1;
  const dsi=rows.reduce((a,r)=>a+r.weight*r.domain_score,0)/weightSum;
  const dci=rows.reduce((a,r)=>a+r.weight*r.confidence,0)/weightSum;
  const averageRisk=rows.reduce((a,r)=>a+r.risk,0)/(rows.length||1);
  const weakest=[...rows].sort((a,b)=>a.domain_score-b.domain_score)[0];
  const status=dsi>=85?'Ready / high confidence':dsi>=70?'Adequately protected':dsi>=55?'Controlled but fragile':dsi>=40?'Vulnerable decision':'Critical decision insecurity';
  return {dsi:+dsi.toFixed(2),dci:+dci.toFixed(2),averageRisk:+averageRisk.toFixed(2),status,weakestDomain:weakest?.domain,weakestScore:+(weakest?.domain_score??0).toFixed(2)};
}

export function calcAIRRow(r:AIRLink){
  const criticality=r.link_strength*r.risk_exposure/100;
  const opportunity_score=r.link_strength*r.opportunity_potential*r.implementation_capacity/10000;
  const uncertainty_load=criticality*r.uncertainty/100;
  const evidence_gap_penalty=criticality*(100-r.evidence_confidence)/100;
  const priority_score=Math.min(100,criticality+.5*uncertainty_load+.3*evidence_gap_penalty);
  const priority_category=priority_score>=70?'Critical':priority_score>=55?'High':priority_score>=40?'Medium':'Watch';
  return {...r,criticality:+criticality.toFixed(2),opportunity_score:+opportunity_score.toFixed(2),uncertainty_load:+uncertainty_load.toFixed(2),evidence_gap_penalty:+evidence_gap_penalty.toFixed(2),priority_score:+priority_score.toFixed(2),priority_category};
}
export function calcAIR(rows:AIRLink[]){
  const computed=rows.map(calcAIRRow);
  const avg=(k:'criticality'|'opportunity_score',arr= computed)=>arr.reduce((a,r)=>a+r[k],0)/(arr.length||1);
  const topPriority=[...computed].sort((a,b)=>b.priority_score-a.priority_score)[0];
  const topOpportunity=[...computed].sort((a,b)=>b.opportunity_score-a.opportunity_score)[0];
  return {
    rows:computed,
    averageCriticality:+avg('criticality').toFixed(2),
    maxPriorityScore:+(topPriority?.priority_score??0).toFixed(2),
    criticalLinksCount:computed.filter(r=>r.priority_category==='Critical').length,
    averageOpportunityScore:+avg('opportunity_score').toFixed(2),
    averageUncertainty:+((rows.reduce((a,r)=>a+r.uncertainty,0)/(rows.length||1))).toFixed(2),
    averageEvidenceConfidence:+((rows.reduce((a,r)=>a+r.evidence_confidence,0)/(rows.length||1))).toFixed(2),
    topCriticalPair:topPriority?.pair_id,
    topOpportunityPair:topOpportunity?.pair_id
  };
}

export function scmKi(score:number){return score>=40?0:score>=31?.04:score>=21?.12:score>=11?.18:.21}
export function calcSCM(rows:SCMAxis[]){
  const calculated=rows.map(r=>({...r,ki:scmKi(r.score),adjustment:r.score<40?(40-r.score)*scmKi(r.score):0}));
  const average=calculated.reduce((a,r)=>a+r.score,0)/(calculated.length||1);
  const totalAdjustment=calculated.reduce((a,r)=>a+r.adjustment,0);
  const finalCoordinate=average-totalAdjustment;
  const status=finalCoordinate>=80?'High structural resilience':finalCoordinate>=65?'Resilient with control zones':finalCoordinate>=50?'Medium resilience':finalCoordinate>=40?'Borderline resilience':'Critical structural tension';
  return {rows:calculated,averageScore:+average.toFixed(2),totalAdjustment:+totalAdjustment.toFixed(2),finalCoordinate:+finalCoordinate.toFixed(2),status,weakAxesCount:calculated.filter(r=>r.score<40).length};
}

export function calcScenario(r:ScenarioRow){
  const risk_load=r.probability*r.impact*(1+r.uncertainty/100)*(1-r.preparedness/100)/100;
  const opportunity_load=r.probability*r.opportunity_potential*r.preparedness/10000;
  return {...r,risk_load:+risk_load.toFixed(2),opportunity_load:+opportunity_load.toFixed(2)};
}
