export type ProjectCategory =
  | 'all'
  | 'educativo'
  | 'instalaciones'
  | 'ip-original'
  | 'advergame';

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface TvcProject {
  id: string;
  code: string;
  title: string;
  year: string;
  genreLabel: string;
  category: Exclude<ProjectCategory, 'all'>;
  categories?: Exclude<ProjectCategory, 'all'>[];
  categoryLabel: string;
  client: string;
  platforms: string[];
  storeLinks?: {
    appStore?: boolean;
    googlePlay?: boolean;
    steamWishlist?: boolean;
    appStoreUrl?: string;
    googlePlayUrl?: string;
    steamUrl?: string;
    arcadeCustomUrl?: string;
  };
  summary: string;
  objective: string;
  development: string;
  highlights: string[];
  teamSizeOrHardware: string;
  featuredSpan?: boolean;
  coverImage: string;
  posterImage?: string;
  screenshots: ProjectScreenshot[];
}

export interface BrandColorSpec {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  group: 'Cromática Principal' | 'Cromática Secundaria' | 'Acento Editorial';
  usage: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  deliverables: string[];
  relatedProjectCode: string;
  iconName: 'graduation' | 'megaphone' | 'compass' | 'cpu' | 'code';
}

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Todos los Proyectos' },
  { id: 'educativo', label: 'Edutainments' },
  { id: 'instalaciones', label: 'Instalaciones & Hardware' },
  { id: 'ip-original', label: 'IP Original & Cultural' },
  { id: 'advergame', label: 'Advergames & Marcas' },
];

export const TVC_PROJECTS: TvcProject[] = [
  {
    id: 'en-el-nombre-de-la-ley',
    code: '03.A',
    title: 'EN EL NOMBRE DE LA LEY',
    year: '2025',
    genreLabel: 'Aventura Gráfica · Edutainment',
    category: 'educativo',
    categories: ['educativo'],
    categoryLabel: 'Edutainments',
    client: 'Honorable Legislatura de Tucumán',
    platforms: ['Google Play', 'App Store'],
    storeLinks: {
      appStore: true,
      googlePlay: true,
      appStoreUrl:
        'https://apps.apple.com/us/app/en-el-nombre-de-la-ley/id6754856974',
      googlePlayUrl:
        'https://play.google.com/store/apps/details?id=com.EnelNombredelaLey.tvc&pcampaignid=web_share',
    },
    summary:
      'Aventura gráfica educativa desarrollada para acercar la labor parlamentaria y el proceso de creación de leyes a estudiantes secundarios y a toda la ciudadanía.',
    objective:
      'Crear una herramienta educativa que pueda servir a estudiantes secundarios primero, y a todo ciudadano luego, para aprender sobre la labor legislativa y los procesos a través de los cuales se crean leyes.',
    development:
      'Fue la producción más grande hasta el momento en la región de Tucumán, contando con más de 15 profesionales en un equipo interdisciplinario incluyendo actuación y doblaje de voz original.',
    highlights: [
      'Producción regional récord con más de 15 profesionales locales',
      'Actuación y doblaje de voz completo para personajes y legisladores',
      'Debates interactivos sobre proyectos culturales, ciencia y tecnología',
      'Disponible para dispositivos móviles Android e iOS',
    ],
    teamSizeOrHardware: '+15 profesionales · Doblaje de voz completo',
    featuredSpan: true,
    coverImage: '/assets/tvc/ley_legisladora_dialog.jpg',
    posterImage: '/assets/tvc/ley_poster_ilustrado.jpg',
    screenshots: [
      {
        src: '/assets/tvc/ley_legisladora_dialog.jpg',
        caption: 'Diálogo interactivo con legisladora en el entorno 3D/2D de la Honorable Legislatura.',
      },
      {
        src: '/assets/tvc/ley_screen_1.jpg',
        caption: 'Análisis y selección de propuestas para el articulado de una nueva ley audiovisual.',
      },
      {
        src: '/assets/tvc/ley_screen_2.jpg',
        caption: 'Mecánica de clasificación entre Fake News, Información Objetiva y Opinión ciudadana.',
      },
      {
        src: '/assets/tvc/ley_screen_3.jpg',
        caption: 'Personaje Luna presentando proyectos que cruzan el folklore tucumano con narrativa actual.',
      },
    ],
  },
  {
    id: 'edet-arcade',
    code: '03.B',
    title: 'EDET ARCADE',
    year: '2025',
    genreLabel: 'Acción · Arcade · Edutainment · Advergame',
    category: 'instalaciones',
    categories: ['instalaciones', 'educativo', 'advergame'],
    categoryLabel: 'Instalaciones · Edutainment · Advergame',
    client: 'EDET (Empresa de Distribución Eléctrica de Tucumán)',
    platforms: ['Arcade Custom', 'Periférico Exclusivo', '1 a 4 Jugadores'],
    storeLinks: {
      arcadeCustomUrl:
        'https://www.instagram.com/reel/DR9bP5sjgRi/?utm_source=ig_web_copy_link&rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    },
    summary:
      'Experiencia arcade cooperativa e instalación física con un tablero de control ensamblado a partir de interruptores de luz reales y controles de aire acondicionado.',
    objective:
      'Desarrollar un videojuego para concientizar sobre el ahorro energético y diseñar una experiencia atractiva que la Empresa de Distribución Eléctrica de Tucumán (EDET) pueda exhibir en diversas ocasiones.',
    development:
      'Ensamblamos un periférico especial para el juego que cuenta con elementos reales como teclas de luz y controles remotos de aire acondicionado. El control permitió que la cantidad de jugadores pueda variar de 1 a 4, generando una grata experiencia familiar estrenada en la EXPO Tucumán 2025.',
    highlights: [
      'Periférico físico exclusivo con teclas de luz reales y controles de A/C',
      'Multijugador cooperativo adaptable de 1 a 4 participantes en simultáneo',
      'Estreno oficial con alta convocatoria familiar en EXPO Tucumán 2025',
      'Indicador de eficiencia energética en tiempo real (escala A–G)',
    ],
    teamSizeOrHardware: 'Periférico físico custom · 1 a 4 jugadores',
    featuredSpan: false,
    coverImage: '/assets/tvc/edet_screen_1.jpg',
    screenshots: [
      {
        src: '/assets/tvc/edet_screen_1.jpg',
        caption: 'Público jugando en la EXPO Tucumán 2025 utilizando el tablero con teclas de luz y controles de aire.',
      },
      {
        src: '/assets/tvc/edet_screen_2.jpg',
        caption: 'Vista cenital de la vivienda: gestión cooperativa del consumo eléctrico habitación por habitación.',
      },
      {
        src: '/assets/tvc/edet_controllers_closeup.jpg',
        caption: 'Detalle de ingeniería del periférico exclusivo con llaves térmicas, teclas e infrarrojos.',
      },
      {
        src: '/assets/tvc/como_trabajamos_playtest.jpg',
        caption: 'Sesión familiar frente a pantalla gigante durante jornadas de concientización energética.',
      },
    ],
  },
  {
    id: 'vagabundo',
    code: '03.C',
    title: 'VAGABUNDO',
    year: '2025–2026',
    genreLabel: 'Aventura 3D · Cozy',
    category: 'ip-original',
    categoryLabel: 'IP Original & Cultural',
    client: 'Propiedad Intelectual Original de TVC Games',
    platforms: ['Steam'],
    storeLinks: {
      steamWishlist: true,
      steamUrl: 'https://store.steampowered.com/app/4041500/Vagabundo/',
    },
    summary:
      'Aventura 3D contemplativa y relajada donde el jugador acompaña a un perrito a través de paisajes biodiversos inspirados en la yunga tucumana.',
    objective:
      'Ofrecer una experiencia relajada en la que el jugador toma el control de un perrito que pasea y explora territorios naturales inspirados en la yunga tucumana.',
    development:
      'Propiedad intelectual original de TVC Games en desarrollo desde 2025. Vagabundo fue beneficiario del programa de incubación impulsado en conjunto por Image Campus (Argentina) y SpielFabrique (Alemania), y obtuvo en 2025 el Sello de Buen Diseño Argentino.',
    highlights: [
      'Distinguido con el Sello de Buen Diseño Argentino (2025)',
      'Seleccionado en la incubación internacional Image Campus (AR) + SpielFabrique (GER)',
      'Dirección de arte cel-shaded inspirada en la flora y fauna de las yungas tucumanas',
      'Disponible en PC a través de Steam',
    ],
    teamSizeOrHardware: 'Sello Buen Diseño 2025 · Image Campus & SpielFabrique',
    featuredSpan: true,
    coverImage: '/assets/aistudio/image_ee5e59d3.png',
    screenshots: [
      {
        src: '/assets/aistudio/image_ee5e59d3.png',
        caption: 'Arte principal oficial de Vagabundo en los paisajes de la yunga tucumana.',
      },
      {
        src: '/assets/tvc/vagabundo_screen_2.jpg',
        caption: 'Vuelo de aves autóctonas sobre los valles y quebradas de la yunga tucumana.',
      },
      {
        src: '/assets/tvc/vagabundo_screen_1.jpg',
        caption: 'Exploración libre cruzando ríos cristalinos y senderos naturales.',
      },
      {
        src: '/assets/tvc/vagabundo_screen_3.jpg',
        caption: 'Rastreo de aromas y paseo relajado entre vegetación nativa en 3D.',
      },
    ],
  },
  {
    id: 'trivia-dia-de-las-infancias',
    code: '03.D',
    title: 'TRIVIA DEL DÍA DE LAS INFANCIAS',
    year: '2025',
    genreLabel: 'Trivia Competitiva · Instalación',
    category: 'instalaciones',
    categoryLabel: 'Instalaciones & Hardware',
    client: 'Municipalidad de San Miguel de Tucumán',
    platforms: ['Instalación Interactiva', '2 Atriles Físicos Dedicados'],
    summary:
      'Instalación competitiva para eventos masivos con dos atriles físicos personalizados donde niños y familias ponen a prueba sus conocimientos culturales de Tucumán.',
    objective:
      'Crear una trivia competitiva con preguntas de índole educativo, cultural e identitario de la provincia y la ciudad. Según los resultados del juego, sus participantes ganaban premios físicos.',
    development:
      'Se produjeron e integraron dos atriles específicos para el juego con botoneras arcade iluminadas desde los cuales cada uno de los dos jugadores elige su respuesta en duelo directo.',
    highlights: [
      'Diseño y fabricación de 2 atriles físicos independientes con botoneras A/B/C/D',
      'Contenido educativo, histórico e identitario sobre San Miguel de Tucumán',
      'Dinámica competitiva 1v1 en tiempo real con entrega de premios físicos',
      'Interfaz visual de alto contraste pensada para espacios públicos y escenarios al aire libre',
    ],
    teamSizeOrHardware: '2 atriles físicos dedicados · Duelo 1v1 en vivo',
    featuredSpan: false,
    coverImage: '/assets/tvc/trivia_screen_2.jpg',
    screenshots: [
      {
        src: '/assets/tvc/trivia_screen_2.jpg',
        caption: 'Participantes compitiendo desde los dos atriles físicos producidos para la Municipalidad de San Miguel de Tucumán.',
      },
      {
        src: '/assets/tvc/trivia_screen_1.jpg',
        caption: 'Interfaz de pregunta sobre cultura e identidad de San Miguel de Tucumán.',
      },
    ],
  },
  {
    id: 'rnr-revenge',
    code: '03.E',
    title: 'RNR REVENGE',
    year: '2026',
    genreLabel: 'Disparos Sobre Rieles · Advergame',
    category: 'advergame',
    categoryLabel: 'Advergames & Marcas',
    client: 'Banda de Rock "Burro The Arranque"',
    platforms: ['Google Play', 'App Store'],
    storeLinks: {
      appStore: true,
      googlePlay: true,
      appStoreUrl:
        'https://apps.apple.com/us/app/rock-and-roll-revenge/id6817584934',
      googlePlayUrl:
        'https://play.google.com/store/apps/details?id=com.TVCGames.RocknRollRevenge&pcampaignid=web_share',
    },
    summary:
      'Advergame shooter arcade con estética western sobrenatural, música rock/metal original y tabla de clasificación semanal para fidelizar seguidores.',
    objective:
      'Promocionar una banda de rock local mediante un ranking de puntuación semanal y entrega de premios para fidelizar a nuevos seguidores y potenciar sus lanzamientos.',
    development:
      'Se desarrolló un Shooter arcade sobre rieles con estética western sobrenatural cargado de música rock/metal original de la banda, jefes finales y foco en high score y rejugabilidad.',
    highlights: [
      'Ranking de puntuación semanal competitivo con entrega de premios a fans',
      'Banda sonora original rock/metal integrada a la acción sobre rieles',
      'Estética western sobrenatural con identidad visual de "Burro The Arranque"',
      'Optimizado para sesiones rápidas de alta rejugabilidad en iOS y Android',
    ],
    teamSizeOrHardware: 'Ranking semanal · Android & iOS (2026)',
    featuredSpan: false,
    coverImage: '/assets/tvc/rnr_screen_2.jpg',
    screenshots: [
      {
        src: '/assets/tvc/rnr_screen_2.jpg',
        caption: 'Presentación del protagonista de "Burro The Arranque" en el desierto western sobrenatural.',
      },
      {
        src: '/assets/tvc/rnr_screen_1.jpg',
        caption: 'Acción de disparos sobre rieles en el pueblo western con multiplicadores de puntaje.',
      },
      {
        src: '/assets/tvc/rnr_screen_3.jpg',
        caption: 'Combate contra jefe colosal al ritmo de rock/metal por el primer puesto del ranking semanal.',
      },
    ],
  },
];

export const TVC_SERVICES: ServiceItem[] = [
  {
    id: 'educativos',
    index: '02.1',
    title: 'Videojuegos Educativos (Edutainment)',
    shortTitle: 'Educativos',
    description:
      'Transformamos currículas pedagógicas, procesos cívicos y contenidos institucionales en experiencias interactivas memorables para estudiantes y ciudadanía.',
    deliverables: [
      'Aventuras gráficas con narrativa ramificada y doblaje de voz',
      'Simuladores cívicos y herramientas para escuelas y organismos públicos',
      'Guías didácticas integradas para uso en el aula y dispositivos móviles',
    ],
    relatedProjectCode: 'En el Nombre de la Ley',
    iconName: 'graduation',
  },
  {
    id: 'publicitarios',
    index: '02.2',
    title: 'Videojuegos Publicitarios (Advergames)',
    shortTitle: 'Publicitarios',
    description:
      'Diseñamos juegos a medida para marcas, bandas y campañas que buscan conectar con su audiencia mediante desafíos, rankings semanales y recompensas reales.',
    deliverables: [
      'Sistemas de High Score y tablas de clasificación semanales',
      'Integración de identidad sonora, estética de marca y lanzamientos',
      'Publicación llave en mano en App Store, Google Play y Web',
    ],
    relatedProjectCode: 'RNR Revenge',
    iconName: 'megaphone',
  },
  {
    id: 'culturales',
    index: '02.3',
    title: 'Proyectos Culturales & Propiedad Intelectual',
    shortTitle: 'Culturales & IP',
    description:
      'Entendemos el videojuego como lenguaje cultural. Creamos mundos originales inspirados en el patrimonio, los paisajes y la identidad de Tucumán y Latinoamérica.',
    deliverables: [
      'Desarrollo integral de IP original para PC (Steam) y Smart TV',
      'Dirección de arte con identidad regional y proyección internacional',
      'Articulación con fondos culturales e incubadoras globales',
    ],
    relatedProjectCode: 'Vagabundo',
    iconName: 'compass',
  },
  {
    id: 'inmersivas',
    index: '02.4',
    title: 'Experiencias Inmersivas, VR/AR e Instalaciones Custom',
    shortTitle: 'Instalaciones & VR/AR',
    description:
      'Diseñamos y ensamblamos hardware interactivo a medida, periféricos exclusivos y atriles físicos para ferias, museos, exposiciones y activaciones en vivo.',
    deliverables: [
      'Periféricos electrónicos a medida (teclas reales, sensores, botoneras)',
      'Atriles competitivos multijugador para eventos masivos y stands',
      'Experiencias de Realidad Virtual (VR) y Realidad Aumentada (AR)',
    ],
    relatedProjectCode: 'EDET Arcade · Trivia del Día de las Infancias',
    iconName: 'cpu',
  },
  {
    id: 'codev',
    index: '02.5',
    title: 'Servicios de Desarrollo para Otros Estudios',
    shortTitle: 'Co-Desarrollo',
    description:
      'Nos integramos de manera colaborativa y flexible con estudios nacionales e internacionales para potenciar sus producciones en todas las etapas técnicas y artísticas.',
    deliverables: [
      'Programación de gameplay, UI/UX e integración en motores modernos',
      'Arte 2D/3D, animación, diseño narrativo y localización',
      'Porteo multiplataforma (Mobile, PC, Android TV, iOS TV)',
    ],
    relatedProjectCode: 'Alianzas & Co-Producción Internacional',
    iconName: 'code',
  },
];

export const TVC_BRAND_COLORS: BrandColorSpec[] = [
  {
    name: 'Verde Vibrante TVC',
    role: 'Primario Energía',
    hex: '#06BE0D',
    rgb: 'R: 6 · G: 190 · B: 13',
    cmyk: 'C: 74% · M: 0% · Y: 100% · K: 0%',
    group: 'Cromática Principal',
    usage: 'Acentos de máxima luminosidad, estados activos e iconografía destacada.',
  },
  {
    name: 'Verde Esmeralda TVC',
    role: 'Primario Interactivo',
    hex: '#07C845',
    rgb: 'R: 7 · G: 200 · B: 69',
    cmyk: 'C: 71% · M: 0% · Y: 90% · K: 0%',
    group: 'Cromática Principal',
    usage: 'Botones CTA principales, foco interactivo y bloques de identidad.',
  },
  {
    name: 'Verde Institucional TVC',
    role: 'Primario Base',
    hex: '#03B16C',
    rgb: 'R: 3 · G: 177 · B: 108',
    cmyk: 'C: 76% · M: 0% · Y: 70% · K: 0%',
    group: 'Cromática Principal',
    usage: 'Superficie institucional del Manual y Portfolio, encabezados de sección e isotipo.',
  },
  {
    name: 'Turquesa Cooperativo',
    role: 'Primario Transición',
    hex: '#07C8B2',
    rgb: 'R: 7 · G: 200 · B: 178',
    cmyk: 'C: 69% · M: 0% · Y: 41% · K: 0%',
    group: 'Cromática Principal',
    usage: 'Insignias de "Sobre Nosotros", gradientes de marca y soporte visual.',
  },
  {
    name: 'Violeta Profundo TVC',
    role: 'Contraste Secundario',
    hex: '#5D117B',
    rgb: 'R: 93 · G: 17 · B: 123',
    cmyk: 'C: 72% · M: 98% · Y: 0% · K: 18%',
    group: 'Cromática Secundaria',
    usage: 'Contraste oficial en portada de Portfolio, numeración 03. e insignia de Socios.',
  },
  {
    name: 'Lima Editorial Portfolio',
    role: 'Acento de Catálogo',
    hex: '#D4FF33',
    rgb: 'R: 212 · G: 255 · B: 51',
    cmyk: 'C: 18% · M: 0% · Y: 88% · K: 0%',
    group: 'Acento Editorial',
    usage: 'Separadores de fichas técnicas, años (2025–2026) y bloque 04. Cómo Trabajamos.',
  },
];

export const TVC_METRICS = [
  {
    value: '05',
    unit: 'Producciones Clave',
    context: 'Lanzadas y en desarrollo entre 2025 y 2026 (Móvil, PC, TV e Instalaciones)',
  },
  {
    value: '+15',
    unit: 'Profesionales en Red',
    context: 'Récord de producción regional en Tucumán con actuación y doblaje de voz',
  },
  {
    value: '04',
    unit: 'Plataformas de Destino',
    context: 'Android / iOS / PC y Arcade Custom',
  },
  {
    value: '2025',
    unit: 'Sello Buen Diseño',
    context: 'Distinción oficial argentina + Incubación Image Campus (AR) & SpielFabrique (GER)',
  },
];

export const TVC_DIFFERENTIATORS = [
  {
    number: '05.1',
    title: 'Versatilidad de géneros, tecnologías y estéticas',
    detail:
      'Nos adaptamos desde aventuras gráficas educativas 2D/3D con doblaje hasta shooters sobre rieles, aventuras cozy en 3D y hardware electrónico a medida.',
  },
  {
    number: '05.2',
    title: 'El videojuego como lenguaje cultural',
    detail:
      'Concebimos cada obra como un medio capaz de transmitir identidad, patrimonio y valores comunitarios sin perder profundidad jugable.',
  },
  {
    number: '05.3',
    title: 'Experiencia comprobada en educación y publicidad',
    detail:
      'Articulamos objetivos pedagógicos e institucionales (Legislatura, Municipalidad, EDET) y metas comerciales de fidelización con mecánicas claras.',
  },
  {
    number: '05.4',
    title: 'Trabajo cooperativo en constante diálogo',
    detail:
      'Construimos cada proyecto intercambiando ideas, ajustando decisiones de diseño y acompañando a cada institución o marca en todo el proceso.',
  },
  {
    number: '05.5',
    title: 'Proyectos con proyección a largo plazo',
    detail:
      'Diseñamos arquitecturas escalables y experiencias pensadas para perdurar en escuelas, exposiciones itinerantes y tiendas digitales.',
  },
  {
    number: '05.6',
    title: 'Desde Tucumán, Latinoamérica, con mirada al mundo',
    detail:
      'Impulsamos la industria local del videojuego con estándares internacionales, participando en programas de incubación entre Argentina y Europa.',
  },
];
