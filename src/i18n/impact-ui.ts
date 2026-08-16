import type { Lang } from './config';
import { localizeEvidenceItem } from './evidence-content';

export type ImpactStageKey='EVIDENCE_ITEM'|'SCENARIO_NODE'|'FORMULA'|'METRIC'|'DECISION_GATE'|'REPORT_CLAIM';

type ImpactUi={
  title:string; selected:string; selectPrompt:string; clickPrompt:string; confidenceNote:string;
  lineageBasis:string; projection:string; live:string;
  stages:Record<ImpactStageKey,string>;
};

const ui:Record<Lang,ImpactUi>={
  en:{title:'EVIDENCE IMPACT CRYSTAL',selected:'SELECTED IMPACT NODE',selectPrompt:'Select a node around the crystal',clickPrompt:'Click a node to inspect its public metadata.',confidenceNote:'Evidence confidence controls visual strength. Internal source URIs remain behind the publication boundary.',lineageBasis:'LINEAGE BASIS',projection:'V12 TRACE PROJECTION',live:'V13 LIVE FORWARD LINEAGE',stages:{EVIDENCE_ITEM:'EVIDENCE ITEM',SCENARIO_NODE:'SCENARIO NODE',FORMULA:'FORMULA',METRIC:'METRIC',DECISION_GATE:'DECISION GATE',REPORT_CLAIM:'REPORT CLAIM'}},
  ru:{title:'КРИСТАЛЛ ВЛИЯНИЯ ДОКАЗАТЕЛЬСТВ',selected:'ВЫБРАННЫЙ УЗЕЛ ВЛИЯНИЯ',selectPrompt:'Выберите узел вокруг кристалла',clickPrompt:'Нажмите на узел, чтобы просмотреть его публичные метаданные.',confidenceNote:'Уровень доверия к доказательству управляет визуальной интенсивностью. Внутренние URI источников остаются за границей публикации.',lineageBasis:'ОСНОВА ТРАССИРОВКИ',projection:'ПРОЕКЦИЯ ТРАССИРОВКИ V12',live:'ПРЯМАЯ ТРАССИРОВКА V13',stages:{EVIDENCE_ITEM:'ЭЛЕМЕНТ ДОКАЗАТЕЛЬСТВА',SCENARIO_NODE:'СЦЕНАРНЫЙ УЗЕЛ',FORMULA:'ФОРМУЛА',METRIC:'МЕТРИКА',DECISION_GATE:'ШЛЮЗ РЕШЕНИЯ',REPORT_CLAIM:'УТВЕРЖДЕНИЕ ОТЧЁТА'}},
  es:{title:'CRISTAL DE IMPACTO DE EVIDENCIA',selected:'NODO DE IMPACTO SELECCIONADO',selectPrompt:'Seleccione un nodo alrededor del cristal',clickPrompt:'Pulse un nodo para inspeccionar sus metadatos públicos.',confidenceNote:'La confianza de la evidencia controla la intensidad visual. Los URI internos permanecen detrás del límite de publicación.',lineageBasis:'BASE DE TRAZABILIDAD',projection:'PROYECCIÓN DE TRAZA V12',live:'TRAZABILIDAD DIRECTA V13',stages:{EVIDENCE_ITEM:'ELEMENTO DE EVIDENCIA',SCENARIO_NODE:'NODO DE ESCENARIO',FORMULA:'FÓRMULA',METRIC:'MÉTRICA',DECISION_GATE:'PUERTA DE DECISIÓN',REPORT_CLAIM:'AFIRMACIÓN DEL INFORME'}},
  ca:{title:"CRISTALL D'IMPACTE D'EVIDÈNCIA",selected:"NODE D'IMPACTE SELECCIONAT",selectPrompt:'Seleccioneu un node al voltant del cristall',clickPrompt:'Feu clic en un node per inspeccionar-ne les metadades públiques.',confidenceNote:"La confiança de l'evidència controla la intensitat visual. Els URI interns romanen darrere del límit de publicació.",lineageBasis:'BASE DE TRAÇABILITAT',projection:'PROJECCIÓ DE TRAÇA V12',live:'TRAÇABILITAT DIRECTA V13',stages:{EVIDENCE_ITEM:"ELEMENT D'EVIDÈNCIA",SCENARIO_NODE:"NODE D'ESCENARI",FORMULA:'FÓRMULA',METRIC:'MÈTRICA',DECISION_GATE:'PORTA DE DECISIÓ',REPORT_CLAIM:"AFIRMACIÓ DE L'INFORME"}},
  fr:{title:"CRISTAL D'IMPACT DES PREUVES",selected:"NŒUD D'IMPACT SÉLECTIONNÉ",selectPrompt:'Sélectionnez un nœud autour du cristal',clickPrompt:'Cliquez sur un nœud pour consulter ses métadonnées publiques.',confidenceNote:"Le niveau de confiance de la preuve contrôle l'intensité visuelle. Les URI internes restent derrière la frontière de publication.",lineageBasis:'BASE DE TRAÇABILITÉ',projection:'PROJECTION DE TRACE V12',live:'TRAÇABILITÉ DIRECTE V13',stages:{EVIDENCE_ITEM:'ÉLÉMENT DE PREUVE',SCENARIO_NODE:'NŒUD DE SCÉNARIO',FORMULA:'FORMULE',METRIC:'MÉTRIQUE',DECISION_GATE:'PORTE DE DÉCISION',REPORT_CLAIM:'AFFIRMATION DU RAPPORT'}},
  de:{title:'EVIDENZ-WIRKUNGSKRISTALL',selected:'AUSGEWÄHLTER WIRKUNGSKNOTEN',selectPrompt:'Wählen Sie einen Knoten um den Kristall',clickPrompt:'Klicken Sie auf einen Knoten, um seine öffentlichen Metadaten zu prüfen.',confidenceNote:'Die Evidenzsicherheit steuert die visuelle Intensität. Interne Quell-URIs bleiben hinter der Veröffentlichungsgrenze.',lineageBasis:'GRUNDLAGE DER RÜCKVERFOLGUNG',projection:'V12-TRACE-PROJEKTION',live:'V13 DIREKTE WIRKUNGSLINIE',stages:{EVIDENCE_ITEM:'EVIDENZELEMENT',SCENARIO_NODE:'SZENARIOKNOTEN',FORMULA:'FORMEL',METRIC:'METRIK',DECISION_GATE:'ENTSCHEIDUNGSTOR',REPORT_CLAIM:'BERICHTSAUSSAGE'}},
  it:{title:"CRISTALLO D'IMPATTO DELLE EVIDENZE",selected:"NODO D'IMPATTO SELEZIONATO",selectPrompt:'Seleziona un nodo intorno al cristallo',clickPrompt:'Fai clic su un nodo per esaminarne i metadati pubblici.',confidenceNote:"La confidenza dell'evidenza controlla l'intensità visiva. Gli URI interni restano oltre il confine di pubblicazione.",lineageBasis:'BASE DELLA TRACCIABILITÀ',projection:'PROIEZIONE TRACCIA V12',live:'TRACCIABILITÀ DIRETTA V13',stages:{EVIDENCE_ITEM:'ELEMENTO DI EVIDENZA',SCENARIO_NODE:'NODO DI SCENARIO',FORMULA:'FORMULA',METRIC:'METRICA',DECISION_GATE:'GATE DECISIONALE',REPORT_CLAIM:'AFFERMAZIONE DEL RAPPORTO'}},
  pt:{title:'CRISTAL DE IMPACTO DAS EVIDÊNCIAS',selected:'NÓ DE IMPACTO SELECIONADO',selectPrompt:'Selecione um nó em torno do cristal',clickPrompt:'Clique num nó para consultar os seus metadados públicos.',confidenceNote:'A confiança da evidência controla a intensidade visual. Os URI internos permanecem atrás do limite de publicação.',lineageBasis:'BASE DE RASTREABILIDADE',projection:'PROJEÇÃO DE TRAÇO V12',live:'RASTREABILIDADE DIRETA V13',stages:{EVIDENCE_ITEM:'ELEMENTO DE EVIDÊNCIA',SCENARIO_NODE:'NÓ DE CENÁRIO',FORMULA:'FÓRMULA',METRIC:'MÉTRICA',DECISION_GATE:'PORTA DE DECISÃO',REPORT_CLAIM:'AFIRMAÇÃO DO RELATÓRIO'}}
};

const simpleLabels:Partial<Record<Lang,Record<string,string>>>={
  ru:{'sn-supplier':'Критический поставщик','sn-logistics':'Логистика','sn-production':'Производство','f-scm-demo':'Перерасчёт стресс-сценария SCM','claim-scm':'Системная согласованность недостаточна для прямого принятия; требуется редизайн или пилотный контроль.'},
  es:{'sn-supplier':'Proveedor crítico','sn-logistics':'Logística','sn-production':'Producción','f-scm-demo':'Recálculo de estrés SCM','claim-scm':'La coherencia del sistema es insuficiente para una aceptación directa; se requiere rediseño o control piloto.'},
  ca:{'sn-supplier':'Proveïdor crític','sn-logistics':'Logística','sn-production':'Producció','f-scm-demo':'Recàlcul d’estrès SCM','claim-scm':'La coherència del sistema és insuficient per a una acceptació directa; cal redisseny o control pilot.'},
  fr:{'sn-supplier':'Fournisseur critique','sn-logistics':'Logistique','sn-production':'Production','f-scm-demo':'Recalcul de stress SCM','claim-scm':'La cohérence du système est insuffisante pour une acceptation directe ; une refonte ou un contrôle pilote est requis.'},
  de:{'sn-supplier':'Kritischer Lieferant','sn-logistics':'Logistik','sn-production':'Produktion','f-scm-demo':'SCM-Stress-Neuberechnung','claim-scm':'Die Systemkohärenz reicht für eine direkte Freigabe nicht aus; Redesign oder Pilotkontrollen sind erforderlich.'},
  it:{'sn-supplier':'Fornitore critico','sn-logistics':'Logistica','sn-production':'Produzione','f-scm-demo':'Ricalcolo stress SCM','claim-scm':'La coerenza del sistema non è sufficiente per l’accettazione diretta; sono necessari redesign o controlli pilota.'},
  pt:{'sn-supplier':'Fornecedor crítico','sn-logistics':'Logística','sn-production':'Produção','f-scm-demo':'Recálculo de stress SCM','claim-scm':'A coerência do sistema é insuficiente para aceitação direta; é necessário redesenho ou controlo piloto.'}
};

export function impactUi(lang:Lang){return ui[lang]??ui.en;}
export function localizeImpactNodeLabel(id:string,fallback:string,lang:Lang){
  if(id.startsWith('ev-')){
    const localized=localizeEvidenceItem({id,title:fallback,excerpt:'',status:''},lang);
    return localized.title;
  }
  return simpleLabels[lang]?.[id] ?? fallback;
}
