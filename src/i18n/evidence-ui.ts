import type { Lang } from './config';

type EvidenceUi = {
  backToRegistry: string;
  provenanceEyebrow: string;
  sourceLineage: string;
  status: string;
  quality: string;
  confidence: string;
  analyst: string;
  validated: string;
  pending: string;
  openImpact: string;
  backToEvidence: string;
  impactEyebrow: string;
};

const copy: Record<Lang, EvidenceUi> = {
  en: { backToRegistry:'Back to Evidence Registry', provenanceEyebrow:'EVIDENCE / PROVENANCE', sourceLineage:'SOURCE LINEAGE', status:'STATUS', quality:'QUALITY', confidence:'CONFIDENCE', analyst:'ANALYST', validated:'VALIDATED', pending:'PENDING', openImpact:'OPEN IMPACT CRYSTAL', backToEvidence:'Back to evidence item', impactEyebrow:'EVIDENCE IMPACT' },
  ru: { backToRegistry:'Назад к реестру доказательств', provenanceEyebrow:'ДОКАЗАТЕЛЬСТВО / ПРОИСХОЖДЕНИЕ', sourceLineage:'ЦЕПОЧКА ИСТОЧНИКА', status:'СТАТУС', quality:'КАЧЕСТВО', confidence:'УВЕРЕННОСТЬ', analyst:'АНАЛИТИК', validated:'ПРОВЕРЕНО', pending:'ОЖИДАЕТ ПРОВЕРКИ', openImpact:'ОТКРЫТЬ КРИСТАЛЛ ВЛИЯНИЯ', backToEvidence:'Назад к доказательству', impactEyebrow:'ВЛИЯНИЕ ДОКАЗАТЕЛЬСТВА' },
  es: { backToRegistry:'Volver al registro de evidencia', provenanceEyebrow:'EVIDENCIA / PROCEDENCIA', sourceLineage:'TRAZABILIDAD DE LA FUENTE', status:'ESTADO', quality:'CALIDAD', confidence:'CONFIANZA', analyst:'ANALISTA', validated:'VALIDADO', pending:'PENDIENTE', openImpact:'ABRIR CRISTAL DE IMPACTO', backToEvidence:'Volver a la evidencia', impactEyebrow:'IMPACTO DE EVIDENCIA' },
  ca: { backToRegistry:"Tornar al registre d'evidència", provenanceEyebrow:'EVIDÈNCIA / PROCEDÈNCIA', sourceLineage:'TRAZABILITAT DE LA FONT', status:'ESTAT', quality:'QUALITAT', confidence:'CONFIANÇA', analyst:'ANALISTA', validated:'VALIDAT', pending:'PENDENT', openImpact:"OBRIR CRISTALL D'IMPACTE", backToEvidence:"Tornar a l'evidència", impactEyebrow:"IMPACTE DE L'EVIDÈNCIA" },
  fr: { backToRegistry:'Retour au registre des preuves', provenanceEyebrow:'PREUVE / PROVENANCE', sourceLineage:'LIGNÉE DE LA SOURCE', status:'STATUT', quality:'QUALITÉ', confidence:'CONFIANCE', analyst:'ANALYSTE', validated:'VALIDÉ', pending:'EN ATTENTE', openImpact:"OUVRIR LE CRISTAL D'IMPACT", backToEvidence:'Retour à la preuve', impactEyebrow:'IMPACT DE LA PREUVE' },
  de: { backToRegistry:'Zurück zum Evidenzregister', provenanceEyebrow:'EVIDENZ / HERKUNFT', sourceLineage:'QUELLENHERKUNFT', status:'STATUS', quality:'QUALITÄT', confidence:'KONFIDENZ', analyst:'ANALYST', validated:'VALIDIERT', pending:'AUSSTEHEND', openImpact:'IMPACT-KRISTALL ÖFFNEN', backToEvidence:'Zurück zur Evidenz', impactEyebrow:'EVIDENZ-IMPACT' },
  it: { backToRegistry:'Torna al registro delle evidenze', provenanceEyebrow:'EVIDENZA / PROVENIENZA', sourceLineage:'TRACCIABILITÀ DELLA FONTE', status:'STATO', quality:'QUALITÀ', confidence:'CONFIDENZA', analyst:'ANALISTA', validated:'VALIDATO', pending:'IN ATTESA', openImpact:"APRI IL CRISTALLO D'IMPATTO", backToEvidence:"Torna all'evidenza", impactEyebrow:"IMPATTO DELL'EVIDENZA" },
  pt: { backToRegistry:'Voltar ao registo de evidências', provenanceEyebrow:'EVIDÊNCIA / PROVENIÊNCIA', sourceLineage:'RASTREABILIDADE DA FONTE', status:'ESTADO', quality:'QUALIDADE', confidence:'CONFIANÇA', analyst:'ANALISTA', validated:'VALIDADO', pending:'PENDENTE', openImpact:'ABRIR CRISTAL DE IMPACTO', backToEvidence:'Voltar à evidência', impactEyebrow:'IMPACTO DA EVIDÊNCIA' }
};

export function evidenceUi(lang: Lang): EvidenceUi {
  return copy[lang] ?? copy.en;
}
