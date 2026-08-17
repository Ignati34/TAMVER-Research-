import type { Lang } from './config';

type RelatedUi = {
  eyebrow: string;
  title: string;
  research: string;
  evidence: string;
  ledger: string;
  methodologies: string;
};

const copy: Record<Lang, RelatedUi> = {
  en:{eyebrow:'CONNECTED KNOWLEDGE',title:'Continue through the Decision Security system',research:'Research',evidence:'Evidence Registry',ledger:'Decision Evidence Ledger',methodologies:'Methodologies'},
  ru:{eyebrow:'СВЯЗАННЫЕ ЗНАНИЯ',title:'Продолжить по системе Decision Security',research:'Исследования',evidence:'Реестр доказательств',ledger:'Decision Evidence Ledger',methodologies:'Методологии'},
  es:{eyebrow:'CONOCIMIENTO CONECTADO',title:'Continuar por el sistema Decision Security',research:'Investigación',evidence:'Registro de evidencia',ledger:'Decision Evidence Ledger',methodologies:'Metodologías'},
  ca:{eyebrow:'CONEIXEMENT CONNECTAT',title:'Continuar pel sistema Decision Security',research:'Recerca',evidence:"Registre d'evidència",ledger:'Decision Evidence Ledger',methodologies:'Metodologies'},
  fr:{eyebrow:'CONNAISSANCE CONNECTÉE',title:'Poursuivre dans le système Decision Security',research:'Recherche',evidence:'Registre des preuves',ledger:'Decision Evidence Ledger',methodologies:'Méthodologies'},
  de:{eyebrow:'VERNETZTES WISSEN',title:'Im Decision-Security-System fortfahren',research:'Forschung',evidence:'Evidenzregister',ledger:'Decision Evidence Ledger',methodologies:'Methodologien'},
  it:{eyebrow:'CONOSCENZA CONNESSA',title:'Continuare nel sistema Decision Security',research:'Ricerca',evidence:'Registro delle evidenze',ledger:'Decision Evidence Ledger',methodologies:'Metodologie'},
  pt:{eyebrow:'CONHECIMENTO CONECTADO',title:'Continuar pelo sistema Decision Security',research:'Investigação',evidence:'Registo de evidências',ledger:'Decision Evidence Ledger',methodologies:'Metodologias'}
};

export function relatedUi(lang: Lang){ return copy[lang] ?? copy.en; }
