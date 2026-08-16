import type { Lang } from './config';

export type TermId =
  | 'decisionSecurity'
  | 'evidence'
  | 'interdependency'
  | 'scenarioStressTest'
  | 'provenance'
  | 'systemCoherence'
  | 'decisionGate';

export type TermEntry = {
  canonical: string;
  localized: string;
  short: string;
  definition: string;
  usage: string;
};

/**
 * TAMVER controlled terminology v0.8.2.
 * English canonical labels remain stable identifiers across all languages.
 * Localized labels are approved UI/explanatory equivalents, not replacements
 * for TAMVER product or methodology names where the canonical English term is required.
 */
export const terminology: Record<Lang, Record<TermId, TermEntry>> = {
  en: {
    decisionSecurity:{canonical:'Decision Security',localized:'Decision Security',short:'Decision Security',definition:'Independent verification of whether a high-stakes strategic decision is evidence-based, resilient, executable and protected against hidden risks before commitment or implementation.',usage:'Use as the TAMVER category name. Keep capitalized.'},
    evidence:{canonical:'Evidence',localized:'Evidence',short:'Evidence',definition:'Traceable information, source material or validated analytical support used to justify an assessment, metric, claim or decision conclusion.',usage:'Use “evidence item” for a discrete ledger object and “evidence base” for the body of support.'},
    interdependency:{canonical:'Interdependency',localized:'Interdependency',short:'Interdependency',definition:'A reciprocal or directional dependency through which change, risk or opportunity in one sector, actor or system component can affect another.',usage:'Preferred AIR term. Avoid using “connection” when a dependency relationship is meant.'},
    scenarioStressTest:{canonical:'Scenario Stress-Test',localized:'Scenario Stress-Test',short:'Stress-Test',definition:'A structured test of whether a decision remains viable when assumptions, external conditions or system pressures change across alternative scenarios.',usage:'Use for TAMVER scenario testing. Do not imply prediction certainty.'},
    provenance:{canonical:'Provenance',localized:'Provenance',short:'Provenance',definition:'The traceable origin and transformation history of a source, evidence item, calculation, metric or claim through the analytical chain.',usage:'Use together with lineage/traceability where technical precision is needed.'},
    systemCoherence:{canonical:'System Coherence',localized:'System Coherence',short:'System Coherence',definition:'The degree to which the structural components required to sustain and implement a decision remain mutually consistent and resilient under pressure.',usage:'Preferred SCM explanatory term.'},
    decisionGate:{canonical:'Decision Gate',localized:'Decision Gate',short:'Decision Gate',definition:'A formal control point at which evidence, analysis, conditions and review status determine whether a decision can proceed, requires redesign, or must be held.',usage:'Keep “Decision Gate” as the canonical TAMVER control term.'}
  },
  ru: {
    decisionSecurity:{canonical:'Decision Security',localized:'Безопасность стратегического решения',short:'Безопасность решения',definition:'Независимая проверка того, является ли стратегическое решение доказательным, устойчивым, исполнимым и защищённым от скрытых рисков до принятия обязательств или начала реализации.',usage:'Decision Security сохраняется как название категории TAMVER; русский эквивалент используется для пояснения.'},
    evidence:{canonical:'Evidence',localized:'Доказательная база',short:'Доказательства',definition:'Прослеживаемые данные, источники и проверенные аналитические материалы, которые обосновывают оценку, метрику, утверждение или вывод по решению.',usage:'“Элемент доказательной базы” — отдельный объект Ledger; “доказательная база” — совокупность подтверждений.'},
    interdependency:{canonical:'Interdependency',localized:'Взаимозависимость',short:'Взаимозависимость',definition:'Взаимная или направленная зависимость, через которую изменение, риск или возможность в одном секторе, участнике или элементе системы влияет на другой.',usage:'Основной термин AIR. Не заменять нейтральным “связь”, если речь именно о зависимости.'},
    scenarioStressTest:{canonical:'Scenario Stress-Test',localized:'Сценарный стресс-тест',short:'Стресс-тест сценариев',definition:'Структурированная проверка устойчивости решения при изменении предпосылок, внешних условий и системного давления в альтернативных сценариях.',usage:'Не трактовать как точный прогноз будущего.'},
    provenance:{canonical:'Provenance',localized:'Происхождение и прослеживаемость',short:'Прослеживаемость',definition:'Прослеживаемое происхождение и история преобразований источника, доказательства, расчёта, метрики или утверждения по всей аналитической цепочке.',usage:'В техническом контексте допустимо “provenance / lineage”; в пользовательском интерфейсе — “происхождение и прослеживаемость”.'},
    systemCoherence:{canonical:'System Coherence',localized:'Системная согласованность',short:'Системная согласованность',definition:'Степень согласованности и устойчивости структурных элементов, необходимых для поддержания и реализации решения под нагрузкой.',usage:'Основной поясняющий термин SCM.'},
    decisionGate:{canonical:'Decision Gate',localized:'Контрольная точка решения',short:'Decision Gate',definition:'Формальная контрольная точка, в которой доказательства, анализ, условия и статус проверки определяют: продолжать решение, отправить его на доработку или остановить.',usage:'Decision Gate сохраняется как канонический TAMVER-термин; перевод используется в пояснении.'}
  },
  es: {
    decisionSecurity:{canonical:'Decision Security',localized:'Seguridad de la Decisión',short:'Seguridad de la Decisión',definition:'Verificación independiente de que una decisión estratégica de alto impacto está basada en evidencia, es resiliente, ejecutable y está protegida frente a riesgos ocultos antes del compromiso o la ejecución.',usage:'Mantener “Decision Security” como nombre de categoría TAMVER; usar la traducción para explicación.'},
    evidence:{canonical:'Evidence',localized:'Evidencia',short:'Evidencia',definition:'Información, fuentes y soporte analítico trazables y validados que justifican una evaluación, métrica, afirmación o conclusión de decisión.',usage:'“Elemento de evidencia” para un objeto individual; “base de evidencia” para el conjunto.'},
    interdependency:{canonical:'Interdependency',localized:'Interdependencia',short:'Interdependencia',definition:'Dependencia recíproca o direccional mediante la cual un cambio, riesgo u oportunidad en un sector, actor o componente del sistema afecta a otro.',usage:'Término preferido de AIR.'},
    scenarioStressTest:{canonical:'Scenario Stress-Test',localized:'Prueba de estrés de escenarios',short:'Stress-test de escenarios',definition:'Prueba estructurada de si una decisión sigue siendo viable cuando cambian los supuestos, las condiciones externas o las presiones del sistema en escenarios alternativos.',usage:'No presentarlo como predicción cierta.'},
    provenance:{canonical:'Provenance',localized:'Procedencia y trazabilidad',short:'Trazabilidad',definition:'Origen trazable e historial de transformación de una fuente, evidencia, cálculo, métrica o afirmación a lo largo de la cadena analítica.',usage:'Usar “procedencia y trazabilidad” en interfaz; “provenance/lineage” puede mantenerse en documentación técnica.'},
    systemCoherence:{canonical:'System Coherence',localized:'Coherencia sistémica',short:'Coherencia sistémica',definition:'Grado en que los componentes estructurales necesarios para sostener y ejecutar una decisión se mantienen consistentes y resilientes bajo presión.',usage:'Término explicativo preferido de SCM.'},
    decisionGate:{canonical:'Decision Gate',localized:'Punto de control de decisión',short:'Decision Gate',definition:'Punto formal de control en el que la evidencia, el análisis, las condiciones y la revisión determinan si una decisión puede avanzar, debe rediseñarse o quedar en espera.',usage:'Mantener “Decision Gate” como término canónico TAMVER.'}
  },
  ca: {
    decisionSecurity:{canonical:'Decision Security',localized:'Seguretat de la Decisió',short:'Seguretat de la Decisió',definition:'Verificació independent que una decisió estratègica d’alt impacte està basada en evidència, és resilient, executable i protegida davant riscos ocults abans del compromís o la implementació.',usage:'Mantenir “Decision Security” com a nom de categoria TAMVER.'},
    evidence:{canonical:'Evidence',localized:'Evidència',short:'Evidència',definition:'Informació, fonts i suport analític traçables i validats que justifiquen una avaluació, mètrica, afirmació o conclusió de decisió.',usage:'“Element d’evidència” per a un objecte individual; “base d’evidència” per al conjunt.'},
    interdependency:{canonical:'Interdependency',localized:'Interdependència',short:'Interdependència',definition:'Dependència recíproca o direccional per la qual un canvi, risc o oportunitat en un sector, actor o component del sistema afecta un altre.',usage:'Terme preferit d’AIR.'},
    scenarioStressTest:{canonical:'Scenario Stress-Test',localized:'Prova d’estrès d’escenaris',short:'Stress-test d’escenaris',definition:'Prova estructurada de si una decisió continua sent viable quan canvien els supòsits, les condicions externes o les pressions del sistema en escenaris alternatius.',usage:'No presentar-ho com una predicció certa.'},
    provenance:{canonical:'Provenance',localized:'Procedència i traçabilitat',short:'Traçabilitat',definition:'Origen traçable i historial de transformació d’una font, evidència, càlcul, mètrica o afirmació al llarg de la cadena analítica.',usage:'Usar “procedència i traçabilitat” en interfície.'},
    systemCoherence:{canonical:'System Coherence',localized:'Coherència sistèmica',short:'Coherència sistèmica',definition:'Grau en què els components estructurals necessaris per sostenir i executar una decisió es mantenen consistents i resilients sota pressió.',usage:'Terme explicatiu preferit de SCM.'},
    decisionGate:{canonical:'Decision Gate',localized:'Punt de control de decisió',short:'Decision Gate',definition:'Punt formal de control en què l’evidència, l’anàlisi, les condicions i la revisió determinen si una decisió pot avançar, s’ha de redissenyar o s’ha d’aturar.',usage:'Mantenir “Decision Gate” com a terme canònic TAMVER.'}
  },
  fr: {
    decisionSecurity:{canonical:'Decision Security',localized:'Sécurité de la décision',short:'Sécurité de la décision',definition:'Vérification indépendante qu’une décision stratégique à fort enjeu est fondée sur des éléments probants, résiliente, exécutable et protégée contre les risques cachés avant tout engagement ou mise en œuvre.',usage:'Conserver “Decision Security” comme nom de catégorie TAMVER.'},
    evidence:{canonical:'Evidence',localized:'Éléments probants',short:'Éléments probants',definition:'Informations, sources et supports analytiques traçables et validés qui justifient une évaluation, une métrique, une affirmation ou une conclusion de décision.',usage:'“Élément probant” pour un objet individuel; “base probante” pour l’ensemble.'},
    interdependency:{canonical:'Interdependency',localized:'Interdépendance',short:'Interdépendance',definition:'Dépendance réciproque ou directionnelle par laquelle un changement, un risque ou une opportunité dans un secteur, un acteur ou un composant du système affecte un autre.',usage:'Terme AIR privilégié.'},
    scenarioStressTest:{canonical:'Scenario Stress-Test',localized:'Test de résistance des scénarios',short:'Stress-test de scénarios',definition:'Test structuré visant à vérifier si une décision reste viable lorsque les hypothèses, les conditions externes ou les pressions du système évoluent selon plusieurs scénarios.',usage:'Ne pas présenter comme une prévision certaine.'},
    provenance:{canonical:'Provenance',localized:'Provenance et traçabilité',short:'Traçabilité',definition:'Origine traçable et historique de transformation d’une source, d’un élément probant, d’un calcul, d’une métrique ou d’une affirmation tout au long de la chaîne analytique.',usage:'Utiliser “provenance et traçabilité” dans l’interface.'},
    systemCoherence:{canonical:'System Coherence',localized:'Cohérence systémique',short:'Cohérence systémique',definition:'Degré auquel les composantes structurelles nécessaires pour soutenir et exécuter une décision restent cohérentes et résilientes sous pression.',usage:'Terme explicatif privilégié de SCM.'},
    decisionGate:{canonical:'Decision Gate',localized:'Jalon décisionnel',short:'Decision Gate',definition:'Point de contrôle formel où les éléments probants, l’analyse, les conditions et le statut de revue déterminent si une décision peut avancer, doit être redessinée ou suspendue.',usage:'Conserver “Decision Gate” comme terme canonique TAMVER.'}
  },
  de: {
    decisionSecurity:{canonical:'Decision Security',localized:'Entscheidungssicherheit',short:'Entscheidungssicherheit',definition:'Unabhängige Prüfung, ob eine strategische Entscheidung mit hoher Tragweite evidenzbasiert, resilient, umsetzbar und vor verborgenen Risiken geschützt ist, bevor Verpflichtungen eingegangen oder Maßnahmen umgesetzt werden.',usage:'“Decision Security” als TAMVER-Kategorienamen beibehalten.'},
    evidence:{canonical:'Evidence',localized:'Evidenz',short:'Evidenz',definition:'Nachverfolgbare und validierte Informationen, Quellen und analytische Belege, die eine Bewertung, Kennzahl, Aussage oder Entscheidungsfolgerung stützen.',usage:'“Evidenzelement” für ein einzelnes Ledger-Objekt; “Evidenzbasis” für die Gesamtheit.'},
    interdependency:{canonical:'Interdependency',localized:'Interdependenz',short:'Interdependenz',definition:'Wechselseitige oder gerichtete Abhängigkeit, durch die Veränderungen, Risiken oder Chancen in einem Sektor, Akteur oder Systemelement ein anderes beeinflussen.',usage:'Bevorzugter AIR-Begriff.'},
    scenarioStressTest:{canonical:'Scenario Stress-Test',localized:'Szenario-Stresstest',short:'Szenario-Stresstest',definition:'Strukturierter Test, ob eine Entscheidung tragfähig bleibt, wenn sich Annahmen, externe Bedingungen oder Systembelastungen in alternativen Szenarien verändern.',usage:'Nicht als sichere Zukunftsprognose darstellen.'},
    provenance:{canonical:'Provenance',localized:'Provenienz und Nachverfolgbarkeit',short:'Provenienz',definition:'Nachverfolgbare Herkunft und Transformationshistorie einer Quelle, eines Evidenzelements, einer Berechnung, Kennzahl oder Aussage entlang der analytischen Kette.',usage:'In der Oberfläche “Provenienz und Nachverfolgbarkeit” verwenden.'},
    systemCoherence:{canonical:'System Coherence',localized:'Systemkohärenz',short:'Systemkohärenz',definition:'Grad, in dem die strukturellen Komponenten, die eine Entscheidung tragen und umsetzen müssen, unter Belastung konsistent und resilient bleiben.',usage:'Bevorzugter SCM-Erklärbegriff.'},
    decisionGate:{canonical:'Decision Gate',localized:'Entscheidungsfreigabepunkt',short:'Decision Gate',definition:'Formaler Kontrollpunkt, an dem Evidenz, Analyse, Bedingungen und Review-Status bestimmen, ob eine Entscheidung fortgesetzt, überarbeitet oder angehalten wird.',usage:'“Decision Gate” als kanonischen TAMVER-Begriff beibehalten.'}
  },
  it: {
    decisionSecurity:{canonical:'Decision Security',localized:'Sicurezza decisionale',short:'Sicurezza decisionale',definition:'Verifica indipendente che una decisione strategica ad alto impatto sia basata su evidenze, resiliente, eseguibile e protetta dai rischi nascosti prima dell’impegno o dell’implementazione.',usage:'Mantenere “Decision Security” come nome della categoria TAMVER.'},
    evidence:{canonical:'Evidence',localized:'Evidenza',short:'Evidenza',definition:'Informazioni, fonti e supporti analitici tracciabili e validati che giustificano una valutazione, una metrica, un’affermazione o una conclusione decisionale.',usage:'“Elemento di evidenza” per un oggetto individuale; “base di evidenze” per l’insieme.'},
    interdependency:{canonical:'Interdependency',localized:'Interdipendenza',short:'Interdipendenza',definition:'Dipendenza reciproca o direzionale attraverso la quale un cambiamento, rischio o opportunità in un settore, attore o componente del sistema influisce su un altro.',usage:'Termine AIR preferito.'},
    scenarioStressTest:{canonical:'Scenario Stress-Test',localized:'Stress test di scenario',short:'Stress test di scenario',definition:'Test strutturato per verificare se una decisione resta sostenibile quando cambiano ipotesi, condizioni esterne o pressioni del sistema in scenari alternativi.',usage:'Non presentarlo come previsione certa.'},
    provenance:{canonical:'Provenance',localized:'Provenienza e tracciabilità',short:'Tracciabilità',definition:'Origine tracciabile e storia delle trasformazioni di una fonte, evidenza, calcolo, metrica o affermazione lungo la catena analitica.',usage:'Usare “provenienza e tracciabilità” nell’interfaccia.'},
    systemCoherence:{canonical:'System Coherence',localized:'Coerenza sistemica',short:'Coerenza sistemica',definition:'Grado in cui i componenti strutturali necessari a sostenere e attuare una decisione restano coerenti e resilienti sotto pressione.',usage:'Termine esplicativo preferito di SCM.'},
    decisionGate:{canonical:'Decision Gate',localized:'Punto di controllo decisionale',short:'Decision Gate',definition:'Punto formale di controllo in cui evidenze, analisi, condizioni e stato della revisione determinano se una decisione può proseguire, deve essere riprogettata o sospesa.',usage:'Mantenere “Decision Gate” come termine canonico TAMVER.'}
  },
  pt: {
    decisionSecurity:{canonical:'Decision Security',localized:'Segurança da decisão',short:'Segurança da decisão',definition:'Verificação independente de que uma decisão estratégica de elevado impacto é baseada em evidência, resiliente, executável e protegida contra riscos ocultos antes do compromisso ou da implementação.',usage:'Manter “Decision Security” como nome da categoria TAMVER.'},
    evidence:{canonical:'Evidence',localized:'Evidência',short:'Evidência',definition:'Informação, fontes e suporte analítico rastreáveis e validados que justificam uma avaliação, métrica, afirmação ou conclusão de decisão.',usage:'“Elemento de evidência” para um objeto individual; “base de evidência” para o conjunto.'},
    interdependency:{canonical:'Interdependency',localized:'Interdependência',short:'Interdependência',definition:'Dependência recíproca ou direcional através da qual uma alteração, risco ou oportunidade num setor, ator ou componente do sistema afeta outro.',usage:'Termo AIR preferido.'},
    scenarioStressTest:{canonical:'Scenario Stress-Test',localized:'Teste de stress de cenários',short:'Teste de stress',definition:'Teste estruturado para verificar se uma decisão permanece viável quando pressupostos, condições externas ou pressões do sistema mudam em cenários alternativos.',usage:'Não apresentar como previsão certa.'},
    provenance:{canonical:'Provenance',localized:'Proveniência e rastreabilidade',short:'Rastreabilidade',definition:'Origem rastreável e histórico de transformação de uma fonte, evidência, cálculo, métrica ou afirmação ao longo da cadeia analítica.',usage:'Usar “proveniência e rastreabilidade” na interface.'},
    systemCoherence:{canonical:'System Coherence',localized:'Coerência sistémica',short:'Coerência sistémica',definition:'Grau em que os componentes estruturais necessários para sustentar e executar uma decisão permanecem consistentes e resilientes sob pressão.',usage:'Termo explicativo preferido de SCM.'},
    decisionGate:{canonical:'Decision Gate',localized:'Ponto de controlo da decisão',short:'Decision Gate',definition:'Ponto formal de controlo em que evidência, análise, condições e estado da revisão determinam se uma decisão pode avançar, deve ser redesenhada ou ficar suspensa.',usage:'Manter “Decision Gate” como termo canónico TAMVER.'}
  }
};

export function term(lang:Lang,id:TermId){ return terminology[lang]?.[id] ?? terminology.en[id]; }
export const termIds = Object.keys(terminology.en) as TermId[];
