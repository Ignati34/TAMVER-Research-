import type { Lang } from './config';

type EvidenceCopy = {
  title: string;
  excerpt: string;
  status: string;
};

type EvidenceMap = Record<string, EvidenceCopy>;

const evidenceContent: Record<Lang, EvidenceMap> = {
  en: {
    'ev-supplier-single-point': {
      title: 'Single-source dependency',
      excerpt: 'The production line depends on one critical supplier without an approved alternative source.',
      status: 'VALIDATED'
    },
    'ev-inventory-buffer': {
      title: 'Limited inventory buffer',
      excerpt: 'Current buffer covers materially less than the modeled disruption horizon.',
      status: 'VALIDATED'
    },
    'ev-air-output': {
      title: 'AIR propagation result',
      excerpt: 'Supplier shock propagates to logistics, production and delivery commitments.',
      status: 'VALIDATED'
    }
  },
  ru: {
    'ev-supplier-single-point': {
      title: 'Зависимость от единственного поставщика',
      excerpt: 'Производственная линия зависит от одного критически важного поставщика без утверждённого альтернативного источника.',
      status: 'ПРОВЕРЕНО'
    },
    'ev-inventory-buffer': {
      title: 'Ограниченный запас материалов',
      excerpt: 'Текущий запас существенно меньше смоделированного горизонта возможного сбоя поставок.',
      status: 'ПРОВЕРЕНО'
    },
    'ev-air-output': {
      title: 'Результат распространения риска AIR',
      excerpt: 'Шок у поставщика распространяется на логистику, производство и обязательства по поставкам.',
      status: 'ПРОВЕРЕНО'
    }
  },
  es: {
    'ev-supplier-single-point': {
      title: 'Dependencia de un único proveedor',
      excerpt: 'La línea de producción depende de un proveedor crítico sin una fuente alternativa aprobada.',
      status: 'VALIDADO'
    },
    'ev-inventory-buffer': {
      title: 'Colchón de inventario limitado',
      excerpt: 'El inventario disponible cubre un periodo materialmente inferior al horizonte de interrupción modelizado.',
      status: 'VALIDADO'
    },
    'ev-air-output': {
      title: 'Resultado de propagación AIR',
      excerpt: 'El impacto sobre el proveedor se propaga a la logística, la producción y los compromisos de entrega.',
      status: 'VALIDADO'
    }
  },
  ca: {
    'ev-supplier-single-point': {
      title: 'Dependència d’un únic proveïdor',
      excerpt: 'La línia de producció depèn d’un proveïdor crític sense una font alternativa aprovada.',
      status: 'VALIDAT'
    },
    'ev-inventory-buffer': {
      title: 'Marge d’inventari limitat',
      excerpt: 'L’inventari disponible cobreix un període materialment inferior a l’horitzó d’interrupció modelitzat.',
      status: 'VALIDAT'
    },
    'ev-air-output': {
      title: 'Resultat de propagació AIR',
      excerpt: 'L’impacte sobre el proveïdor es propaga a la logística, la producció i els compromisos de lliurament.',
      status: 'VALIDAT'
    }
  },
  fr: {
    'ev-supplier-single-point': {
      title: 'Dépendance à un fournisseur unique',
      excerpt: 'La ligne de production dépend d’un fournisseur critique sans source alternative approuvée.',
      status: 'VALIDÉ'
    },
    'ev-inventory-buffer': {
      title: 'Marge de stock limitée',
      excerpt: 'Le stock disponible couvre une période nettement inférieure à l’horizon de perturbation modélisé.',
      status: 'VALIDÉ'
    },
    'ev-air-output': {
      title: 'Résultat de propagation AIR',
      excerpt: 'Le choc fournisseur se propage à la logistique, à la production et aux engagements de livraison.',
      status: 'VALIDÉ'
    }
  },
  de: {
    'ev-supplier-single-point': {
      title: 'Abhängigkeit von einem einzigen Lieferanten',
      excerpt: 'Die Produktionslinie hängt von einem kritischen Lieferanten ab, ohne dass eine genehmigte Alternativquelle besteht.',
      status: 'VALIDIERT'
    },
    'ev-inventory-buffer': {
      title: 'Begrenzter Lagerpuffer',
      excerpt: 'Der aktuelle Bestand deckt einen deutlich kürzeren Zeitraum ab als der modellierte Störungshorizont.',
      status: 'VALIDIERT'
    },
    'ev-air-output': {
      title: 'AIR-Ausbreitungsergebnis',
      excerpt: 'Der Lieferantenschock wirkt sich auf Logistik, Produktion und Lieferverpflichtungen aus.',
      status: 'VALIDIERT'
    }
  },
  it: {
    'ev-supplier-single-point': {
      title: 'Dipendenza da un unico fornitore',
      excerpt: 'La linea di produzione dipende da un fornitore critico senza una fonte alternativa approvata.',
      status: 'VALIDATO'
    },
    'ev-inventory-buffer': {
      title: 'Margine di inventario limitato',
      excerpt: 'La disponibilità attuale copre un periodo sensibilmente inferiore all’orizzonte di interruzione modellato.',
      status: 'VALIDATO'
    },
    'ev-air-output': {
      title: 'Risultato di propagazione AIR',
      excerpt: 'Lo shock sul fornitore si propaga alla logistica, alla produzione e agli impegni di consegna.',
      status: 'VALIDATO'
    }
  },
  pt: {
    'ev-supplier-single-point': {
      title: 'Dependência de um único fornecedor',
      excerpt: 'A linha de produção depende de um fornecedor crítico sem uma fonte alternativa aprovada.',
      status: 'VALIDADO'
    },
    'ev-inventory-buffer': {
      title: 'Margem de inventário limitada',
      excerpt: 'O inventário disponível cobre um período significativamente inferior ao horizonte de interrupção modelado.',
      status: 'VALIDADO'
    },
    'ev-air-output': {
      title: 'Resultado de propagação AIR',
      excerpt: 'O choque no fornecedor propaga-se à logística, à produção e aos compromissos de entrega.',
      status: 'VALIDADO'
    }
  }
};

export function localizeEvidenceItem<T extends { id: string; title: string; excerpt: string; status: string }>(item: T, lang: Lang): T {
  const copy = evidenceContent[lang]?.[item.id] ?? evidenceContent.en[item.id];
  if (!copy) return item;
  return { ...item, ...copy };
}
