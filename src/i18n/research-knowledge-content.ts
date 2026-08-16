import type { Lang } from './config';
import type { MethodologyArticle } from './methodology-content';

type LocalizedArticles = Partial<Record<Lang, MethodologyArticle>>;

/**
 * TAMVER Research & Knowledge Translation Pass v0.8.5.
 * Source of meaning: the canonical English knowledge articles in src/content/knowledge.
 * Controlled TAMVER identifiers remain unchanged where they function as product,
 * methodology or program names. No new claims are introduced in translation.
 */
export const researchKnowledgeContent: Record<string, LocalizedArticles> = {
  'family-business': {
    ru:{sections:[{heading:'Фокус исследования',paragraphs:['Это направление изучает стратегические решения в семейном бизнесе через призму управления решениями, взаимозависимостей и устойчивости к сценариям.']}]},
    es:{sections:[{heading:'Enfoque de investigación',paragraphs:['Esta área estudia las decisiones estratégicas en empresas familiares desde la gobernanza de decisiones, las interdependencias y la resiliencia frente a escenarios.']}]},
    ca:{sections:[{heading:'Enfocament de recerca',paragraphs:['Aquesta àrea estudia les decisions estratègiques en empreses familiars des de la governança de decisions, les interdependències i la resiliència davant d’escenaris.']}]},
    fr:{sections:[{heading:'Axe de recherche',paragraphs:['Ce domaine étudie les décisions stratégiques dans les entreprises familiales sous l’angle de la gouvernance des décisions, des interdépendances et de la résilience aux scénarios.']}]},
    de:{sections:[{heading:'Forschungsschwerpunkt',paragraphs:['Dieser Bereich untersucht strategische Entscheidungen in Familienunternehmen anhand von Decision Governance, Interdependenzen und Szenarioresilienz.']}]},
    it:{sections:[{heading:'Focus di ricerca',paragraphs:['Quest’area studia le decisioni strategiche nelle imprese familiari attraverso la governance delle decisioni, le interdipendenze e la resilienza agli scenari.']}]},
    pt:{sections:[{heading:'Foco de investigação',paragraphs:['Esta área estuda decisões estratégicas em empresas familiares através da governação das decisões, das interdependências e da resiliência a cenários.']}]}
  },
  'strategic-decision-audit': {
    ru:{sections:[{heading:'Цель',paragraphs:['Аудит создаёт трассируемое представление о предпосылках, доказательствах, зависимостях и рисках реализации, на которых основано стратегическое решение.']}]},
    es:{sections:[{heading:'Objetivo',paragraphs:['La auditoría crea una visión trazable de los supuestos, la evidencia, las dependencias y los riesgos de implementación que sustentan una decisión estratégica.']}]},
    ca:{sections:[{heading:'Objectiu',paragraphs:['L’auditoria crea una visió traçable dels supòsits, l’evidència, les dependències i els riscos d’implementació que sustenten una decisió estratègica.']}]},
    fr:{sections:[{heading:'Objectif',paragraphs:['L’audit crée une vue traçable des hypothèses, des éléments probants, des dépendances et des risques de mise en œuvre qui soutiennent une décision stratégique.']}]},
    de:{sections:[{heading:'Ziel',paragraphs:['Das Audit schafft eine nachvollziehbare Sicht auf die Annahmen, Evidenz, Abhängigkeiten und Umsetzungsrisiken, die eine strategische Entscheidung tragen.']}]},
    it:{sections:[{heading:'Obiettivo',paragraphs:['L’audit crea una visione tracciabile delle ipotesi, delle evidenze, delle dipendenze e dei rischi di implementazione che sostengono una decisione strategica.']}]},
    pt:{sections:[{heading:'Objetivo',paragraphs:['A auditoria cria uma visão rastreável dos pressupostos, da evidência, das dependências e dos riscos de implementação que sustentam uma decisão estratégica.']}]}
  },
  'decision-security-research-program': {
    ru:{sections:[{heading:'Исследовательская программа',paragraphs:['Программа развивает концепции, методы и сравнительные исследования в области устойчивости стратегических решений.']}]},
    es:{sections:[{heading:'Agenda de investigación',paragraphs:['El programa desarrolla conceptos, métodos e investigación comparativa sobre la resiliencia de las decisiones estratégicas.']}]},
    ca:{sections:[{heading:'Agenda de recerca',paragraphs:['El programa desenvolupa conceptes, mètodes i recerca comparativa sobre la resiliència de les decisions estratègiques.']}]},
    fr:{sections:[{heading:'Programme de recherche',paragraphs:['Le programme développe des concepts, des méthodes et des recherches comparatives sur la résilience des décisions stratégiques.']}]},
    de:{sections:[{heading:'Forschungsagenda',paragraphs:['Das Programm entwickelt Konzepte, Methoden und vergleichende Forschung zur Resilienz strategischer Entscheidungen.']}]},
    it:{sections:[{heading:'Agenda di ricerca',paragraphs:['Il programma sviluppa concetti, metodi e ricerca comparativa sulla resilienza delle decisioni strategiche.']}]},
    pt:{sections:[{heading:'Agenda de investigação',paragraphs:['O programa desenvolve conceitos, métodos e investigação comparativa sobre a resiliência das decisões estratégicas.']}]}
  }
};

export function getResearchKnowledgeArticle(id: string, lang: Lang): MethodologyArticle | null {
  if (lang === 'en') return null;
  return researchKnowledgeContent[id]?.[lang] ?? null;
}
