import type { Lang } from './config';

export type MethodologySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
};

export type MethodologyArticle = {
  sections: MethodologySection[];
};

type LocalizedArticles = Partial<Record<Lang, MethodologyArticle>>;

/**
 * TAMVER methodology translation pass v0.8.3.
 * Source of meaning: the canonical English knowledge articles in src/content/knowledge.
 * Controlled terms follow src/i18n/terminology.ts.
 * No new methodology claims are introduced in these translations.
 */
export const methodologyContent: Record<string, LocalizedArticles> = {
  dss: {
    ru:{sections:[
      {heading:'Назначение',paragraphs:['DSS структурирует проверку стратегического решения до начала его реализации.']},
      {heading:'Направления исследования',bullets:['контекст решения;','предпосылки;','доказательная база;','зависимости;','устойчивость к сценариям;','готовность к реализации;','управление и проверка.']}
    ]},
    es:{sections:[
      {heading:'Propósito',paragraphs:['DSS estructura el examen de una decisión estratégica antes de su implementación.']},
      {heading:'Dimensiones de investigación',bullets:['contexto de la decisión;','supuestos;','evidencia;','dependencias;','resiliencia frente a escenarios;','preparación para la implementación;','gobernanza y revisión.']}
    ]},
    ca:{sections:[
      {heading:'Propòsit',paragraphs:['DSS estructura l’examen d’una decisió estratègica abans de la seva implementació.']},
      {heading:'Dimensions de recerca',bullets:['context de la decisió;','supòsits;','evidència;','dependències;','resiliència davant d’escenaris;','preparació per a la implementació;','governança i revisió.']}
    ]},
    fr:{sections:[
      {heading:'Objectif',paragraphs:['DSS structure l’examen d’une décision stratégique avant sa mise en œuvre.']},
      {heading:'Dimensions de recherche',bullets:['contexte de la décision ;','hypothèses ;','éléments probants ;','dépendances ;','résilience aux scénarios ;','préparation à la mise en œuvre ;','gouvernance et revue.']}
    ]},
    de:{sections:[
      {heading:'Zweck',paragraphs:['DSS strukturiert die Prüfung einer strategischen Entscheidung vor ihrer Umsetzung.']},
      {heading:'Untersuchungsdimensionen',bullets:['Entscheidungskontext;','Annahmen;','Evidenz;','Abhängigkeiten;','Szenarioresilienz;','Umsetzungsbereitschaft;','Governance und Review.']}
    ]},
    it:{sections:[
      {heading:'Scopo',paragraphs:['DSS struttura l’esame di una decisione strategica prima della sua implementazione.']},
      {heading:'Dimensioni di ricerca',bullets:['contesto della decisione;','ipotesi;','evidenze;','dipendenze;','resilienza agli scenari;','preparazione all’implementazione;','governance e revisione.']}
    ]},
    pt:{sections:[
      {heading:'Objetivo',paragraphs:['O DSS estrutura o exame de uma decisão estratégica antes da sua implementação.']},
      {heading:'Dimensões de investigação',bullets:['contexto da decisão;','pressupostos;','evidência;','dependências;','resiliência a cenários;','preparação para a implementação;','governação e revisão.']}
    ]}
  },
  air: {
    ru:{sections:[
      {heading:'Назначение',paragraphs:['AIR исследует, как изменения в одной части стратегической системы могут распространяться через связанные секторы и зависимости.']},
      {heading:'Базовая логика',paragraphs:['Методология построена вокруг сущностей, секторов, отношений, критических точек и сценарного распространения.']},
      {heading:'Исследовательское правило',paragraphs:['Публичные утверждения отделяются от внутренних методологических предпосылок. Количественные утверждения требуют доказательной базы до публикации.']}
    ]},
    es:{sections:[
      {heading:'Propósito',paragraphs:['AIR examina cómo los cambios en una parte de un sistema estratégico pueden propagarse a través de sectores y dependencias conectados.']},
      {heading:'Lógica central',paragraphs:['La metodología se estructura en torno a entidades, sectores, relaciones, puntos críticos y propagación de escenarios.']},
      {heading:'Regla de investigación',paragraphs:['Las afirmaciones públicas se separan de los supuestos metodológicos internos. Las afirmaciones cuantitativas requieren evidencia antes de su publicación.']}
    ]},
    ca:{sections:[
      {heading:'Propòsit',paragraphs:['AIR examina com els canvis en una part d’un sistema estratègic es poden propagar a través de sectors i dependències connectats.']},
      {heading:'Lògica central',paragraphs:['La metodologia s’estructura al voltant d’entitats, sectors, relacions, punts crítics i propagació d’escenaris.']},
      {heading:'Regla de recerca',paragraphs:['Les afirmacions públiques se separen dels supòsits metodològics interns. Les afirmacions quantitatives requereixen evidència abans de publicar-se.']}
    ]},
    fr:{sections:[
      {heading:'Objectif',paragraphs:['AIR examine comment les changements dans une partie d’un système stratégique peuvent se propager à travers des secteurs et des dépendances connectés.']},
      {heading:'Logique centrale',paragraphs:['La méthodologie est structurée autour des entités, des secteurs, des relations, des points critiques et de la propagation des scénarios.']},
      {heading:'Règle de recherche',paragraphs:['Les affirmations publiques sont séparées des hypothèses méthodologiques internes. Les affirmations quantitatives nécessitent des éléments probants avant publication.']}
    ]},
    de:{sections:[
      {heading:'Zweck',paragraphs:['AIR untersucht, wie sich Veränderungen in einem Teil eines strategischen Systems über verbundene Sektoren und Abhängigkeiten ausbreiten können.']},
      {heading:'Kernlogik',paragraphs:['Die Methodik ist um Entitäten, Sektoren, Beziehungen, kritische Punkte und Szenariopropagation strukturiert.']},
      {heading:'Forschungsregel',paragraphs:['Öffentliche Aussagen werden von internen methodischen Annahmen getrennt. Quantitative Aussagen benötigen vor der Veröffentlichung Evidenz.']}
    ]},
    it:{sections:[
      {heading:'Scopo',paragraphs:['AIR esamina come i cambiamenti in una parte di un sistema strategico possano propagarsi attraverso settori e dipendenze connessi.']},
      {heading:'Logica centrale',paragraphs:['La metodologia è strutturata attorno a entità, settori, relazioni, punti critici e propagazione degli scenari.']},
      {heading:'Regola di ricerca',paragraphs:['Le affermazioni pubbliche sono separate dalle ipotesi metodologiche interne. Le affermazioni quantitative richiedono evidenze prima della pubblicazione.']}
    ]},
    pt:{sections:[
      {heading:'Objetivo',paragraphs:['O AIR examina como alterações numa parte de um sistema estratégico podem propagar-se através de setores e dependências ligados.']},
      {heading:'Lógica central',paragraphs:['A metodologia é estruturada em torno de entidades, setores, relações, pontos críticos e propagação de cenários.']},
      {heading:'Regra de investigação',paragraphs:['As afirmações públicas são separadas dos pressupostos metodológicos internos. As afirmações quantitativas exigem evidência antes da publicação.']}
    ]}
  },
  scm: {
    ru:{sections:[
      {heading:'Назначение',paragraphs:['SCM проверяет, сохраняют ли элементы, поддерживающие стратегическое решение, системную согласованность при изменении условий.']},
      {heading:'Связь с другими элементами',paragraphs:['SCM интерпретируется совместно с DSS, AIR и сценарным анализом, а не как самостоятельный вывод.']}
    ]},
    es:{sections:[
      {heading:'Propósito',paragraphs:['SCM examina si los elementos que sostienen una decisión estratégica mantienen la coherencia sistémica cuando cambian las condiciones.']},
      {heading:'Relación',paragraphs:['SCM se interpreta junto con DSS, AIR y el análisis de escenarios, y no como una conclusión independiente.']}
    ]},
    ca:{sections:[
      {heading:'Propòsit',paragraphs:['SCM examina si els elements que sostenen una decisió estratègica mantenen la coherència sistèmica quan canvien les condicions.']},
      {heading:'Relació',paragraphs:['SCM s’interpreta conjuntament amb DSS, AIR i l’anàlisi d’escenaris, i no com una conclusió independent.']}
    ]},
    fr:{sections:[
      {heading:'Objectif',paragraphs:['SCM examine si les éléments qui soutiennent une décision stratégique conservent leur cohérence systémique lorsque les conditions changent.']},
      {heading:'Relation',paragraphs:['SCM est interprété conjointement avec DSS, AIR et l’analyse de scénarios, et non comme une conclusion autonome.']}
    ]},
    de:{sections:[
      {heading:'Zweck',paragraphs:['SCM untersucht, ob die Elemente, die eine strategische Entscheidung tragen, ihre Systemkohärenz unter veränderten Bedingungen bewahren.']},
      {heading:'Zusammenhang',paragraphs:['SCM wird gemeinsam mit DSS, AIR und Szenarioanalyse interpretiert und nicht als eigenständige Schlussfolgerung.']}
    ]},
    it:{sections:[
      {heading:'Scopo',paragraphs:['SCM esamina se gli elementi che sostengono una decisione strategica mantengano la coerenza sistemica al variare delle condizioni.']},
      {heading:'Relazione',paragraphs:['SCM viene interpretato insieme a DSS, AIR e all’analisi degli scenari, e non come una conclusione autonoma.']}
    ]},
    pt:{sections:[
      {heading:'Objetivo',paragraphs:['O SCM examina se os elementos que sustentam uma decisão estratégica mantêm a coerência sistémica quando as condições mudam.']},
      {heading:'Relação',paragraphs:['O SCM é interpretado em conjunto com DSS, AIR e análise de cenários, e não como uma conclusão autónoma.']}
    ]}
  },
  'evidence-registry': {
    ru:{sections:[
      {heading:'Классы доказательной базы',numbered:['Первичные данные клиента.','Официальные внешние данные.','Независимые профессиональные источники.','Экспертные данные.','Внутренние методологические предпосылки.']},
      {heading:'Ограничение для ИИ',paragraphs:['Предложение, сгенерированное ИИ, не является доказательством. Evidence Registry — это слой контроля источников для публикации фактических утверждений.']}
    ]},
    es:{sections:[
      {heading:'Clases de evidencia',numbered:['Datos primarios del cliente.','Datos externos oficiales.','Fuentes profesionales independientes.','Evidencia experta.','Supuestos metodológicos internos.']},
      {heading:'Control para IA',paragraphs:['Una frase generada por IA no constituye evidencia. Evidence Registry es la capa de control de fuentes para la publicación de afirmaciones fácticas.']}
    ]},
    ca:{sections:[
      {heading:'Classes d’evidència',numbered:['Dades primàries del client.','Dades externes oficials.','Fonts professionals independents.','Evidència experta.','Supòsits metodològics interns.']},
      {heading:'Control per a la IA',paragraphs:['Una frase generada per IA no és evidència. Evidence Registry és la capa de control de fonts per a la publicació d’afirmacions factuals.']}
    ]},
    fr:{sections:[
      {heading:'Classes d’éléments probants',numbered:['Données primaires du client.','Données externes officielles.','Sources professionnelles indépendantes.','Éléments probants issus d’experts.','Hypothèses méthodologiques internes.']},
      {heading:'Garde-fou IA',paragraphs:['Une phrase générée par l’IA ne constitue pas un élément probant. Evidence Registry est la couche de contrôle des sources pour la publication d’affirmations factuelles.']}
    ]},
    de:{sections:[
      {heading:'Evidenzklassen',numbered:['Primärdaten des Kunden.','Offizielle externe Daten.','Unabhängige professionelle Quellen.','Expertenevidenz.','Interne methodische Annahmen.']},
      {heading:'KI-Leitplanke',paragraphs:['Ein KI-generierter Satz ist keine Evidenz. Evidence Registry ist die Quellenkontrollschicht für die Veröffentlichung faktischer Aussagen.']}
    ]},
    it:{sections:[
      {heading:'Classi di evidenza',numbered:['Dati primari del cliente.','Dati esterni ufficiali.','Fonti professionali indipendenti.','Evidenze di esperti.','Ipotesi metodologiche interne.']},
      {heading:'Controllo per l’IA',paragraphs:['Una frase generata dall’IA non è un’evidenza. Evidence Registry è il livello di controllo delle fonti per la pubblicazione di affermazioni fattuali.']}
    ]},
    pt:{sections:[
      {heading:'Classes de evidência',numbered:['Dados primários do cliente.','Dados externos oficiais.','Fontes profissionais independentes.','Evidência de especialistas.','Pressupostos metodológicos internos.']},
      {heading:'Salvaguarda para IA',paragraphs:['Uma frase gerada por IA não constitui evidência. Evidence Registry é a camada de controlo de fontes para a publicação de afirmações factuais.']}
    ]}
  },
  'scenario-stress-testing': {
    ru:{sections:[
      {heading:'Что проверяется',paragraphs:['Scenario Stress-Test проверяет, остаётся ли логика решения жизнеспособной при изменении важных предпосылок или внешних условий.']},
      {heading:'Результаты',paragraphs:['Возможные результаты включают карты сценариев, уязвимые зависимости, пороговые значения, критические точки и приоритеты переработки решения.']}
    ]},
    es:{sections:[
      {heading:'Qué se prueba',paragraphs:['Scenario Stress-Test comprueba si la lógica de una decisión sigue siendo viable cuando cambian supuestos importantes o condiciones externas.']},
      {heading:'Resultados',paragraphs:['Los resultados potenciales incluyen mapas de escenarios, dependencias vulnerables, umbrales, puntos críticos y prioridades de rediseño.']}
    ]},
    ca:{sections:[
      {heading:'Què es prova',paragraphs:['Scenario Stress-Test comprova si la lògica d’una decisió continua sent viable quan canvien supòsits importants o condicions externes.']},
      {heading:'Resultats',paragraphs:['Els resultats potencials inclouen mapes d’escenaris, dependències vulnerables, llindars, punts crítics i prioritats de redisseny.']}
    ]},
    fr:{sections:[
      {heading:'Ce qui est testé',paragraphs:['Scenario Stress-Test vérifie si la logique d’une décision reste viable lorsque des hypothèses importantes ou des conditions externes changent.']},
      {heading:'Résultats',paragraphs:['Les résultats potentiels comprennent des cartes de scénarios, des dépendances vulnérables, des seuils, des points critiques et des priorités de refonte.']}
    ]},
    de:{sections:[
      {heading:'Was geprüft wird',paragraphs:['Der Scenario Stress-Test prüft, ob die Logik einer Entscheidung tragfähig bleibt, wenn sich wichtige Annahmen oder externe Bedingungen verändern.']},
      {heading:'Ergebnisse',paragraphs:['Mögliche Ergebnisse umfassen Szenariokarten, verwundbare Abhängigkeiten, Schwellenwerte, kritische Punkte und Prioritäten für die Überarbeitung.']}
    ]},
    it:{sections:[
      {heading:'Cosa viene verificato',paragraphs:['Scenario Stress-Test verifica se la logica di una decisione rimane sostenibile quando cambiano ipotesi importanti o condizioni esterne.']},
      {heading:'Risultati',paragraphs:['I possibili risultati includono mappe di scenario, dipendenze vulnerabili, soglie, punti critici e priorità di riprogettazione.']}
    ]},
    pt:{sections:[
      {heading:'O que é testado',paragraphs:['Scenario Stress-Test verifica se a lógica de uma decisão permanece viável quando pressupostos importantes ou condições externas mudam.']},
      {heading:'Resultados',paragraphs:['Os resultados potenciais incluem mapas de cenários, dependências vulneráveis, limiares, pontos críticos e prioridades de reformulação.']}
    ]}
  }
};

export function getMethodologyArticle(id:string, lang:Lang){
  if(lang === 'en') return undefined;
  return methodologyContent[id]?.[lang];
}

export const methodologyTranslationIds = Object.keys(methodologyContent);
