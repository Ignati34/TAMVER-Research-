import React,{useEffect,useMemo,useRef,useState} from 'react';
import * as THREE from 'three';
import type { Lang } from '../i18n/config';
import {
  AIR_BASELINE,DSS_BASELINE,SCM_BASELINE,SCENARIO_BASELINE,
  calcAIR,calcAIRRow,calcDSS,calcSCM,calcScenario,
  type AIRLink,type DSSDomain,type SCMAxis,type ScenarioRow
} from '../lib/andorra/demo-model';

type Tab='scenario'|'air'|'scm'|'dss';
const uiByLang:Record<Lang,Record<string,string>>={
 en:{demo:'ANDORRA 2035 / INTERACTIVE DEMO',crystal:'Scenario Decision Crystal',badge:'ILLUSTRATIVE DATA · LIVE FORMULAS',preset:'Scenario preset',probability:'Probability',impact:'Impact',uncertainty:'Uncertainty',preparedness:'Preparedness',opportunityPotential:'Opportunity potential',riskLoad:'Risk Load',opportunityLoad:'Opportunity Load',trigger:'Trigger',action:'Action',nameScenario:'Name custom scenario',save:'SAVE VARIANT',dependency:'AIR dependency',linkStrength:'Link strength',riskExposure:'Risk exposure',implementationCapacity:'Implementation capacity',evidenceConfidence:'Evidence confidence',criticality:'Criticality',priority:'Priority',opportunity:'Opportunity',scmAxis:'SCM axis',axisScore:'Axis score',coordinate:'SCM Coordinate',adjustment:'Adjustment',weakAxes:'Weak axes',dssDomain:'DSS domain',domainScore:'Domain score',confidence:'Confidence',risk:'Risk',avgRisk:'Avg risk',status:'Status',weakest:'Weakest',reset:'RESET DEMO BASELINE',top:'TOP AIR DEPENDENCIES',coeff:'LIVE RESULT COEFFICIENTS',basis:'Calculation basis',basisText:'This interactive demonstration implements the formulas contained in the supplied TAMVER DSS/AIR Demo App v0.2 and its demo cassette. Changing a Scenario slider recalculates Scenario Risk/Opportunity; AIR sliders recalculate the selected dependency; SCM and DSS controls recalculate their respective engines. These are illustrative Andorra demo inputs, not an official assessment.',saved:'saved'},
 ru:{demo:'АНДОРРА 2035 / ИНТЕРАКТИВНОЕ ДЕМО',crystal:'Сценарный Decision Crystal',badge:'ИЛЛЮСТРАТИВНЫЕ ДАННЫЕ · ЖИВЫЕ ФОРМУЛЫ',preset:'Сценарий',probability:'Вероятность',impact:'Влияние',uncertainty:'Неопределённость',preparedness:'Готовность',opportunityPotential:'Потенциал возможностей',riskLoad:'Рисковая нагрузка',opportunityLoad:'Нагрузка возможностей',trigger:'Триггер',action:'Действие',nameScenario:'Название пользовательского сценария',save:'СОХРАНИТЬ ВАРИАНТ',dependency:'Зависимость AIR',linkStrength:'Сила связи',riskExposure:'Риск-экспозиция',implementationCapacity:'Способность к реализации',evidenceConfidence:'Уверенность в доказательствах',criticality:'Критичность',priority:'Приоритет',opportunity:'Возможность',scmAxis:'Ось SCM',axisScore:'Оценка оси',coordinate:'Координата SCM',adjustment:'Корректировка',weakAxes:'Слабые оси',dssDomain:'Домен DSS',domainScore:'Оценка домена',confidence:'Уверенность',risk:'Риск',avgRisk:'Средний риск',status:'Статус',weakest:'Самый слабый',reset:'СБРОСИТЬ ДЕМО-К БАЗОВОЙ ЛИНИИ',top:'КЛЮЧЕВЫЕ ЗАВИСИМОСТИ AIR',coeff:'РАСЧЁТНЫЕ КОЭФФИЦИЕНТЫ',basis:'Основа расчёта',basisText:'Интерактивная демонстрация реализует формулы из TAMVER DSS/AIR Demo App v0.2 и демо-кассеты. Ползунки Scenario пересчитывают риск и возможности; AIR — выбранную зависимость; SCM и DSS — соответствующие движки. Это иллюстративные данные Андорры, а не официальная оценка.',saved:'сохранён'},
 es:{demo:'ANDORRA 2035 / DEMO INTERACTIVA',crystal:'Scenario Decision Crystal',badge:'DATOS ILUSTRATIVOS · FÓRMULAS EN VIVO',preset:'Escenario',probability:'Probabilidad',impact:'Impacto',uncertainty:'Incertidumbre',preparedness:'Preparación',opportunityPotential:'Potencial de oportunidad',riskLoad:'Carga de riesgo',opportunityLoad:'Carga de oportunidad',trigger:'Trigger',action:'Acción',nameScenario:'Nombre del escenario personalizado',save:'GUARDAR VARIANTE',dependency:'Dependencia AIR',linkStrength:'Fuerza del vínculo',riskExposure:'Exposición al riesgo',implementationCapacity:'Capacidad de implementación',evidenceConfidence:'Confianza en la evidencia',criticality:'Criticidad',priority:'Prioridad',opportunity:'Oportunidad',scmAxis:'Eje SCM',axisScore:'Puntuación del eje',coordinate:'Coordenada SCM',adjustment:'Ajuste',weakAxes:'Ejes débiles',dssDomain:'Dominio DSS',domainScore:'Puntuación del dominio',confidence:'Confianza',risk:'Riesgo',avgRisk:'Riesgo medio',status:'Estado',weakest:'Más débil',reset:'RESTABLECER BASE DEMO',top:'PRINCIPALES DEPENDENCIAS AIR',coeff:'COEFICIENTES EN VIVO',basis:'Base de cálculo',basisText:'Esta demostración interactiva implementa las fórmulas de TAMVER DSS/AIR Demo App v0.2 y su cassette demo. Los controles recalculan Scenario, AIR, SCM y DSS por separado. Son inputs ilustrativos de Andorra, no una evaluación oficial.',saved:'guardado'},
 ca:{demo:'ANDORRA 2035 / DEMO INTERACTIVA',crystal:'Scenario Decision Crystal',badge:'DADES IL·LUSTRATIVES · FÓRMULES EN VIU',preset:'Escenari',probability:'Probabilitat',impact:'Impacte',uncertainty:'Incertesa',preparedness:'Preparació',opportunityPotential:'Potencial d’oportunitat',riskLoad:'Càrrega de risc',opportunityLoad:'Càrrega d’oportunitat',trigger:'Trigger',action:'Acció',nameScenario:'Nom de l’escenari personalitzat',save:'DESAR VARIANT',dependency:'Dependència AIR',linkStrength:'Força del vincle',riskExposure:'Exposició al risc',implementationCapacity:'Capacitat d’implementació',evidenceConfidence:'Confiança en l’evidència',criticality:'Criticitat',priority:'Prioritat',opportunity:'Oportunitat',scmAxis:'Eix SCM',axisScore:'Puntuació de l’eix',coordinate:'Coordenada SCM',adjustment:'Ajust',weakAxes:'Eixos febles',dssDomain:'Domini DSS',domainScore:'Puntuació del domini',confidence:'Confiança',risk:'Risc',avgRisk:'Risc mitjà',status:'Estat',weakest:'Més feble',reset:'RESTABLIR BASE DEMO',top:'PRINCIPALS DEPENDÈNCIES AIR',coeff:'COEFICIENTS EN VIU',basis:'Base de càlcul',basisText:'Aquesta demostració interactiva implementa les fórmules de TAMVER DSS/AIR Demo App v0.2 i la seva cassette demo. Els controls recalculen Scenario, AIR, SCM i DSS per separat. Són inputs il·lustratius d’Andorra, no una avaluació oficial.',saved:'desat'},
 fr:{demo:'ANDORRE 2035 / DÉMO INTERACTIVE',crystal:'Scenario Decision Crystal',badge:'DONNÉES ILLUSTRATIVES · FORMULES EN DIRECT',preset:'Scénario',probability:'Probabilité',impact:'Impact',uncertainty:'Incertitude',preparedness:'Préparation',opportunityPotential:'Potentiel d’opportunité',riskLoad:'Charge de risque',opportunityLoad:'Charge d’opportunité',trigger:'Déclencheur',action:'Action',nameScenario:'Nom du scénario personnalisé',save:'ENREGISTRER LA VARIANTE',dependency:'Dépendance AIR',linkStrength:'Force du lien',riskExposure:'Exposition au risque',implementationCapacity:'Capacité de mise en œuvre',evidenceConfidence:'Confiance dans les preuves',criticality:'Criticité',priority:'Priorité',opportunity:'Opportunité',scmAxis:'Axe SCM',axisScore:'Score de l’axe',coordinate:'Coordonnée SCM',adjustment:'Ajustement',weakAxes:'Axes faibles',dssDomain:'Domaine DSS',domainScore:'Score du domaine',confidence:'Confiance',risk:'Risque',avgRisk:'Risque moyen',status:'Statut',weakest:'Plus faible',reset:'RÉINITIALISER LA BASE DEMO',top:'PRINCIPALES DÉPENDANCES AIR',coeff:'COEFFICIENTS EN DIRECT',basis:'Base de calcul',basisText:'Cette démonstration interactive implémente les formules du TAMVER DSS/AIR Demo App v0.2 et de sa cassette demo. Les contrôles recalculent séparément Scenario, AIR, SCM et DSS. Il s’agit de données illustratives pour Andorre, et non d’une évaluation officielle.',saved:'enregistré'},
 de:{demo:'ANDORRA 2035 / INTERAKTIVE DEMO',crystal:'Scenario Decision Crystal',badge:'ILLUSTRATIVE DATEN · LIVE-FORMELN',preset:'Szenario',probability:'Wahrscheinlichkeit',impact:'Auswirkung',uncertainty:'Unsicherheit',preparedness:'Vorbereitung',opportunityPotential:'Chancenpotenzial',riskLoad:'Risikobelastung',opportunityLoad:'Chancenbelastung',trigger:'Trigger',action:'Maßnahme',nameScenario:'Name des eigenen Szenarios',save:'VARIANTE SPEICHERN',dependency:'AIR-Abhängigkeit',linkStrength:'Verbindungsstärke',riskExposure:'Risikoexposition',implementationCapacity:'Umsetzungsfähigkeit',evidenceConfidence:'Evidenzvertrauen',criticality:'Kritikalität',priority:'Priorität',opportunity:'Chance',scmAxis:'SCM-Achse',axisScore:'Achsenwert',coordinate:'SCM-Koordinate',adjustment:'Anpassung',weakAxes:'Schwache Achsen',dssDomain:'DSS-Domäne',domainScore:'Domänenwert',confidence:'Vertrauen',risk:'Risiko',avgRisk:'Ø Risiko',status:'Status',weakest:'Schwächste',reset:'DEMO-BASIS ZURÜCKSETZEN',top:'TOP AIR-ABHÄNGIGKEITEN',coeff:'LIVE-ERGEBNISKOEFFIZIENTEN',basis:'Berechnungsbasis',basisText:'Diese interaktive Demonstration implementiert die Formeln der TAMVER DSS/AIR Demo App v0.2 und ihrer Demo-Cassette. Die Regler berechnen Scenario, AIR, SCM und DSS getrennt neu. Es handelt sich um illustrative Andorra-Eingaben, nicht um eine offizielle Bewertung.',saved:'gespeichert'},
 it:{demo:'ANDORRA 2035 / DEMO INTERATTIVA',crystal:'Scenario Decision Crystal',badge:'DATI ILLUSTRATIVI · FORMULE LIVE',preset:'Scenario',probability:'Probabilità',impact:'Impatto',uncertainty:'Incertezza',preparedness:'Preparazione',opportunityPotential:'Potenziale opportunità',riskLoad:'Carico di rischio',opportunityLoad:'Carico di opportunità',trigger:'Trigger',action:'Azione',nameScenario:'Nome scenario personalizzato',save:'SALVA VARIANTE',dependency:'Dipendenza AIR',linkStrength:'Forza del legame',riskExposure:'Esposizione al rischio',implementationCapacity:'Capacità di implementazione',evidenceConfidence:'Confidenza nelle evidenze',criticality:'Criticità',priority:'Priorità',opportunity:'Opportunità',scmAxis:'Asse SCM',axisScore:'Punteggio asse',coordinate:'Coordinata SCM',adjustment:'Correzione',weakAxes:'Assi deboli',dssDomain:'Dominio DSS',domainScore:'Punteggio dominio',confidence:'Confidenza',risk:'Rischio',avgRisk:'Rischio medio',status:'Stato',weakest:'Più debole',reset:'RIPRISTINA BASE DEMO',top:'PRINCIPALI DIPENDENZE AIR',coeff:'COEFFICIENTI LIVE',basis:'Base di calcolo',basisText:'Questa demo interattiva implementa le formule di TAMVER DSS/AIR Demo App v0.2 e della relativa cassette demo. I controlli ricalcolano separatamente Scenario, AIR, SCM e DSS. Sono input illustrativi per Andorra, non una valutazione ufficiale.',saved:'salvato'},
 pt:{demo:'ANDORRA 2035 / DEMO INTERATIVA',crystal:'Scenario Decision Crystal',badge:'DADOS ILUSTRATIVOS · FÓRMULAS AO VIVO',preset:'Cenário',probability:'Probabilidade',impact:'Impacto',uncertainty:'Incerteza',preparedness:'Preparação',opportunityPotential:'Potencial de oportunidade',riskLoad:'Carga de risco',opportunityLoad:'Carga de oportunidade',trigger:'Trigger',action:'Ação',nameScenario:'Nome do cenário personalizado',save:'GUARDAR VARIANTE',dependency:'Dependência AIR',linkStrength:'Força da ligação',riskExposure:'Exposição ao risco',implementationCapacity:'Capacidade de implementação',evidenceConfidence:'Confiança na evidência',criticality:'Criticidade',priority:'Prioridade',opportunity:'Oportunidade',scmAxis:'Eixo SCM',axisScore:'Pontuação do eixo',coordinate:'Coordenada SCM',adjustment:'Ajuste',weakAxes:'Eixos fracos',dssDomain:'Domínio DSS',domainScore:'Pontuação do domínio',confidence:'Confiança',risk:'Risco',avgRisk:'Risco médio',status:'Estado',weakest:'Mais fraco',reset:'REPOR BASE DEMO',top:'PRINCIPAIS DEPENDÊNCIAS AIR',coeff:'COEFICIENTES AO VIVO',basis:'Base de cálculo',basisText:'Esta demonstração interativa implementa as fórmulas do TAMVER DSS/AIR Demo App v0.2 e da respetiva cassette demo. Os controlos recalculam Scenario, AIR, SCM e DSS separadamente. São inputs ilustrativos de Andorra, não uma avaliação oficial.',saved:'guardado'}
};
type Pos={x:number;y:number};
const sectorPos:Record<string,Pos>={
  Tourism:{x:16,y:24},Water_Climate:{x:80,y:18},Housing:{x:13,y:47},Demography:{x:86,y:42},Finance:{x:18,y:70},EU_Relations:{x:82,y:68},Infrastructure:{x:35,y:86},Institutional_Capacity:{x:66,y:84},Digital_State:{x:50,y:10},Strategic_Investment:{x:50,y:94}
};
const pretty=(s:string)=>s.replaceAll('_',' / ');
const clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v));

function Diamond({pulseKey,pulseOrigin}:{pulseKey:number;pulseOrigin:[number,number,number]}){
  const mount=useRef<HTMLDivElement>(null);
  const pulse=useRef<{start:number;origin:[number,number,number]}>({start:-999,origin:pulseOrigin});
  useEffect(()=>{pulse.current={start:performance.now()/1000,origin:pulseOrigin}},[pulseKey,pulseOrigin]);
  useEffect(()=>{
    const el=mount.current;if(!el)return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(32,el.clientWidth/el.clientHeight,.1,100);camera.position.set(0,0,9.8);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(el.clientWidth,el.clientHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;el.appendChild(renderer.domElement);
    const seg=10,vertices:number[]=[],faces:number[]=[];vertices.push(0,1.62,0);const crown=1;
    for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*.66,1.40,Math.sin(a)*.66)}
    const girdle=crown+seg;for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*1.64,.42,Math.sin(a)*1.64)}
    const pavilion=girdle+seg;for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*.80,-.92,Math.sin(a)*.80)}
    const bottom=pavilion+seg;vertices.push(0,-2.22,0);
    for(let i=0;i<seg;i++){const n=(i+1)%seg;faces.push(0,crown+i,crown+n,crown+i,girdle+i,girdle+n,crown+i,girdle+n,crown+n,girdle+i,pavilion+i,pavilion+n,girdle+i,pavilion+n,girdle+n,pavilion+i,bottom,pavilion+n)}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setIndex(faces);geo.computeVertexNormals();
    const group=new THREE.Group();group.scale.setScalar(1.32);group.position.y=.05;scene.add(group);
    const mat=new THREE.MeshPhysicalMaterial({color:0x493d2d,emissive:0x5d3b18,emissiveIntensity:.07,metalness:.3,roughness:.13,transmission:.56,thickness:1.7,ior:1.5,clearcoat:1,clearcoatRoughness:.06,transparent:true,opacity:.27,side:THREE.DoubleSide});
    group.add(new THREE.Mesh(geo,mat));
    const edges=new THREE.EdgesGeometry(geo,5);const baseMat=new THREE.LineBasicMaterial({color:0xffd79e,transparent:true,opacity:.62,blending:THREE.AdditiveBlending});group.add(new THREE.LineSegments(edges,baseMat));
    const uniforms={uTime:{value:-99},uOrigin:{value:new THREE.Vector3(0,0,0)},uStrength:{value:0}};
    const pulseMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,depthTest:false,blending:THREE.AdditiveBlending,uniforms,
      vertexShader:`uniform vec3 uOrigin;varying float vDist;void main(){vDist=distance(position,uOrigin);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader:`uniform float uTime;uniform float uStrength;varying float vDist;void main(){float wave=uTime*2.4;float band=1.0-smoothstep(0.0,.32,abs(vDist-wave));float tail=(1.0-smoothstep(0.0,1.05,wave-vDist))*step(vDist,wave);float a=(band+tail*.18)*uStrength;if(a<.01)discard;gl_FragColor=vec4(1.0,.68,.30,a);}`});
    group.add(new THREE.LineSegments(edges,pulseMat));
    const light=new THREE.PointLight(0xffa448,0,9);scene.add(light);scene.add(new THREE.AmbientLight(0x735e3e,.78));const key=new THREE.PointLight(0xffd9a6,9,20);key.position.set(4,5,5);scene.add(key);
    let raf=0;const reduced=matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
    const resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};window.addEventListener('resize',resize);
    const tick=()=>{raf=requestAnimationFrame(tick);const now=performance.now()/1000;const age=now-pulse.current.start;const live=!reduced&&age>=0&&age<2.2;const decay=live?Math.pow(1-age/2.2,.65):0;uniforms.uOrigin.value.set(...pulse.current.origin);uniforms.uTime.value=live?age:-99;uniforms.uStrength.value=decay;light.position.set(...pulse.current.origin);light.intensity=11*decay;mat.emissiveIntensity=.07+(live?.9*decay:.025*Math.sin(now*.8));if(!reduced)group.rotation.y+=.0008;renderer.render(scene,camera)};tick();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);geo.dispose();edges.dispose();mat.dispose();baseMat.dispose();pulseMat.dispose();renderer.dispose();el.removeChild(renderer.domElement)};
  },[]);
  return <div className="andorra-diamond-canvas" ref={mount}/>;
}

function Slider({label,value,min=0,max=100,step=1,onChange,suffix=''}:{label:string;value:number;min?:number;max?:number;step?:number;onChange:(v:number)=>void;suffix?:string}){
  return <label className="as-slider"><span><b>{label}</b><output>{value.toFixed(step<1?2:0)}{suffix}</output></span><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/></label>
}

export default function AndorraScenarioLab({lang='en'}:{lang?:Lang}){
  const ui=uiByLang[lang] ?? uiByLang.en;
  const [tab,setTab]=useState<Tab>('scenario');
  const [dss,setDss]=useState<DSSDomain[]>(()=>clone(DSS_BASELINE));
  const [air,setAir]=useState<AIRLink[]>(()=>clone(AIR_BASELINE));
  const [scm,setScm]=useState<SCMAxis[]>(()=>clone(SCM_BASELINE));
  const [scenarios,setScenarios]=useState<ScenarioRow[]>(()=>clone(SCENARIO_BASELINE));
  const [scenarioId,setScenarioId]=useState('SC04');
  const [airId,setAirId]=useState('AD01');
  const [scmAxis,setScmAxis]=useState('Environmental');
  const [dssId,setDssId]=useState('D3');
  const [pulseKey,setPulseKey]=useState(0);
  const [saved,setSaved]=useState<ScenarioRow[]>([]);
  const [variantName,setVariantName]=useState('');

  useEffect(()=>{try{const v=localStorage.getItem('tamver-andorra-scenarios');if(v)setSaved(JSON.parse(v))}catch{}},[]);
  const dssK=useMemo(()=>calcDSS(dss),[dss]);
  const airK=useMemo(()=>calcAIR(air),[air]);
  const scmK=useMemo(()=>calcSCM(scm),[scm]);
  const scenario=scenarios.find(s=>s.scenario_id===scenarioId)??scenarios[0];
  const scenarioK=useMemo(()=>calcScenario(scenario),[scenario]);
  const airRow=air.find(r=>r.pair_id===airId)??air[0];const airRowK=useMemo(()=>calcAIRRow(airRow),[airRow]);
  const scmRow=scm.find(r=>r.axis===scmAxis)??scm[0];const dssRow=dss.find(r=>r.domain_id===dssId)??dss[0];
  const topLinks=airK.rows.slice().sort((a,b)=>b.priority_score-a.priority_score).slice(0,7);
  const activeSectors=new Set([airRow.sector_a,airRow.sector_b]);
  const midpoint=(()=>{const a=sectorPos[airRow.sector_a],b=sectorPos[airRow.sector_b];return a&&b?[(a.x+b.x)/2,(a.y+b.y)/2]:[50,50]})();
  const pulseOrigin:[number,number,number]=[(midpoint[0]-50)/28,-(midpoint[1]-50)/25,0];

  const touch=()=>setPulseKey(k=>k+1);
  const updateScenario=(key:keyof ScenarioRow,v:number)=>{setScenarios(xs=>xs.map(x=>x.scenario_id===scenarioId?{...x,[key]:v}:x));touch()};
  const updateAir=(key:keyof AIRLink,v:number)=>{setAir(xs=>xs.map(x=>x.pair_id===airId?{...x,[key]:v}:x));touch()};
  const updateScm=(v:number)=>{setScm(xs=>xs.map(x=>x.axis===scmAxis?{...x,score:v}:x));touch()};
  const updateDss=(key:'domain_score'|'confidence'|'risk',v:number)=>{setDss(xs=>xs.map(x=>x.domain_id===dssId?{...x,[key]:v}:x));touch()};
  const reset=()=>{setDss(clone(DSS_BASELINE));setAir(clone(AIR_BASELINE));setScm(clone(SCM_BASELINE));setScenarios(clone(SCENARIO_BASELINE));touch()};
  const saveVariant=()=>{const name=variantName.trim();if(!name)return;const item={...scenario,scenario_id:`CUSTOM-${Date.now()}`,scenario:name};const next=[...saved,item];setSaved(next);try{localStorage.setItem('tamver-andorra-scenarios',JSON.stringify(next))}catch{}setVariantName('')};

  return <section className="andorra-lab" aria-label={ui.demo}>
    <header className="andorra-lab-head">
      <div><span>{ui.demo}</span><h2>{ui.crystal}</h2></div>
      <div className="andorra-demo-badge">{ui.badge}</div>
    </header>

    <div className="andorra-lab-grid">
      <div className="andorra-crystal-stage">
        <Diamond pulseKey={pulseKey} pulseOrigin={pulseOrigin}/>
        <svg className="andorra-air-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {airK.rows.map(r=>{const a=sectorPos[r.sector_a],b=sectorPos[r.sector_b];if(!a||!b)return null;const active=r.pair_id===airId;return <line key={r.pair_id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={active?'active':''} style={{opacity:active?1:Math.max(.13,r.priority_score/180)}}/>})}
        </svg>
        {Object.entries(sectorPos).map(([id,p])=><button key={id} type="button" className={`andorra-sector-node ${activeSectors.has(id)?'active':''}`} style={{left:`${p.x}%`,top:`${p.y}%`}} onClick={()=>{const best=airK.rows.filter(r=>r.sector_a===id||r.sector_b===id).sort((a,b)=>b.priority_score-a.priority_score)[0];if(best)setAirId(best.pair_id);setTab('air');touch()}}><i/><b>{pretty(id)}</b></button>)}
        <div className="andorra-core-metrics">
          <span>TAMVER</span><strong>DECISION<br/>SECURITY</strong>
          <div><b>DSI {dssK.dsi}</b><b>DCI {dssK.dci}</b><b>SCM {scmK.finalCoordinate}</b></div>
          <small>AIR {airK.maxPriorityScore} · RISK {scenarioK.risk_load}</small>
        </div>
      </div>

      <aside className="andorra-controls">
        <div className="as-tabs" role="tablist">
          {(['scenario','air','scm','dss'] as Tab[]).map(t=><button key={t} type="button" className={tab===t?'active':''} onClick={()=>setTab(t)}>{t.toUpperCase()}</button>)}
        </div>

        {tab==='scenario'&&<div className="as-panel">
          <label className="as-select"><span>{ui.preset}</span><select value={scenarioId} onChange={e=>{setScenarioId(e.target.value);touch()}}>{scenarios.map(s=><option key={s.scenario_id} value={s.scenario_id}>{s.scenario} · {s.horizon}</option>)}{saved.map(s=><option key={s.scenario_id} value={s.scenario_id}>{s.scenario} · {ui.saved}</option>)}</select></label>
          <Slider label={ui.probability} value={scenario.probability} onChange={v=>updateScenario('probability',v)}/>
          <Slider label={ui.impact} value={scenario.impact} onChange={v=>updateScenario('impact',v)}/>
          <Slider label={ui.uncertainty} value={scenario.uncertainty} onChange={v=>updateScenario('uncertainty',v)}/>
          <Slider label={ui.preparedness} value={scenario.preparedness} onChange={v=>updateScenario('preparedness',v)}/>
          <Slider label={ui.opportunityPotential} value={scenario.opportunity_potential} onChange={v=>updateScenario('opportunity_potential',v)}/>
          <div className="as-results"><div><span>{ui.riskLoad}</span><b>{scenarioK.risk_load}</b></div><div><span>{ui.opportunityLoad}</span><b>{scenarioK.opportunity_load}</b></div></div>
          <p className="as-note"><b>{ui.trigger}:</b> {scenario.trigger_signals}<br/><b>{ui.action}:</b> {scenario.recommended_action}</p>
          <div className="as-save"><input value={variantName} onChange={e=>setVariantName(e.target.value)} placeholder={ui.nameScenario}/><button type="button" onClick={saveVariant}>{ui.save}</button></div>
        </div>}

        {tab==='air'&&<div className="as-panel">
          <label className="as-select"><span>{ui.dependency}</span><select value={airId} onChange={e=>{setAirId(e.target.value);touch()}}>{airK.rows.map(r=><option key={r.pair_id} value={r.pair_id}>{r.pair_id} · {pretty(r.sector_a)} × {pretty(r.sector_b)}</option>)}</select></label>
          <Slider label={ui.linkStrength} value={airRow.link_strength} onChange={v=>updateAir('link_strength',v)}/>
          <Slider label={ui.riskExposure} value={airRow.risk_exposure} onChange={v=>updateAir('risk_exposure',v)}/>
          <Slider label={ui.opportunityPotential} value={airRow.opportunity_potential} onChange={v=>updateAir('opportunity_potential',v)}/>
          <Slider label={ui.uncertainty} value={airRow.uncertainty} onChange={v=>updateAir('uncertainty',v)}/>
          <Slider label={ui.implementationCapacity} value={airRow.implementation_capacity} onChange={v=>updateAir('implementation_capacity',v)}/>
          <Slider label={ui.evidenceConfidence} value={airRow.evidence_confidence} onChange={v=>updateAir('evidence_confidence',v)}/>
          <div className="as-results as-results-3"><div><span>{ui.criticality}</span><b>{airRowK.criticality}</b></div><div><span>{ui.priority}</span><b>{airRowK.priority_score}</b><small>{airRowK.priority_category}</small></div><div><span>{ui.opportunity}</span><b>{airRowK.opportunity_score}</b></div></div>
          <p className="as-note">{airRow.note}</p>
        </div>}

        {tab==='scm'&&<div className="as-panel">
          <label className="as-select"><span>{ui.scmAxis}</span><select value={scmAxis} onChange={e=>{setScmAxis(e.target.value);touch()}}>{scm.map(r=><option key={r.axis} value={r.axis}>{pretty(r.axis)}</option>)}</select></label>
          <Slider label={ui.axisScore} value={scmRow.score} onChange={updateScm}/>
          <div className="as-results as-results-3"><div><span>{ui.coordinate}</span><b>{scmK.finalCoordinate}</b></div><div><span>{ui.adjustment}</span><b>{scmK.totalAdjustment}</b></div><div><span>{ui.weakAxes}</span><b>{scmK.weakAxesCount}</b></div></div>
          <p className="as-note"><b>{pretty(scmRow.axis)}</b><br/>{scmRow.description}<br/>Instability coefficient changes by the source bands: 31–39 → .04; 21–30 → .12; 11–20 → .18; 0–10 → .21.</p>
        </div>}

        {tab==='dss'&&<div className="as-panel">
          <label className="as-select"><span>{ui.dssDomain}</span><select value={dssId} onChange={e=>{setDssId(e.target.value);touch()}}>{dss.map(r=><option key={r.domain_id} value={r.domain_id}>{r.domain_id} · {r.domain}</option>)}</select></label>
          <Slider label={ui.domainScore} value={dssRow.domain_score} onChange={v=>updateDss('domain_score',v)}/>
          <Slider label={ui.confidence} value={dssRow.confidence} onChange={v=>updateDss('confidence',v)}/>
          <Slider label={ui.risk} value={dssRow.risk} min={0} max={5} step={.01} onChange={v=>updateDss('risk',v)}/>
          <div className="as-results as-results-3"><div><span>DSI</span><b>{dssK.dsi}</b></div><div><span>DCI</span><b>{dssK.dci}</b></div><div><span>{ui.avgRisk}</span><b>{dssK.averageRisk}</b></div></div>
          <p className="as-note"><b>{ui.status}:</b> {dssK.status}<br/><b>{ui.weakest}:</b> {dssK.weakestDomain} · {dssK.weakestScore}</p>
        </div>}

        <button className="as-reset" type="button" onClick={reset}>{ui.reset}</button>
      </aside>
    </div>

    <div className="andorra-kpi-strip">
      <div><span>DSI</span><b>{dssK.dsi}</b><small>{dssK.status}</small></div>
      <div><span>DCI</span><b>{dssK.dci}</b><small>Evidence confidence</small></div>
      <div><span>SCM</span><b>{scmK.finalCoordinate}</b><small>{scmK.status}</small></div>
      <div><span>Max AIR Priority</span><b>{airK.maxPriorityScore}</b><small>{airK.criticalLinksCount} critical links</small></div>
      <div><span>Scenario Risk</span><b>{scenarioK.risk_load}</b><small>{scenario.scenario}</small></div>
    </div>

    <div className="andorra-dependency-table">
      <div className="adt-head"><span>{ui.top}</span><span>{ui.coeff}</span></div>
      {topLinks.map(r=><button type="button" key={r.pair_id} className={r.pair_id===airId?'active':''} onClick={()=>{setAirId(r.pair_id);setTab('air');touch()}}><span>{r.pair_id}</span><strong>{pretty(r.sector_a)} × {pretty(r.sector_b)}</strong><em>Criticality {r.criticality}</em><em>Priority {r.priority_score}</em><em>{r.priority_category}</em></button>)}
    </div>

    <footer className="andorra-formula-note">
      <strong>{ui.basis}</strong>
      <p>{ui.basisText}</p>
    </footer>
  </section>;
}
