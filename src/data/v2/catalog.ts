// Catálogo da home v2: tudo que aparece no site, nos 3 idiomas.
// Regras (triagem de 16/10/2026):
// - sistemas NUNCA levam nome de cliente; telas com dados fictícios;
// - nunca citar a ferramenta de vídeo programático, vídeo aparece como React;
// - link de site é o .vercel.app que o Leonardo controla (AL usa o domínio, o .vercel.app dela caiu).

export type Locale = 'pt' | 'en' | 'es';
export type L = Record<Locale, string>;

export const tr = (l: L, locale: string) => l[(locale as Locale)] ?? l.pt;

export type Category = 'sites' | 'sistemas' | 'identidade' | 'social' | 'video' | 'lab';

// cor de cada categoria: aparece só como ponto e no ícone de pixel, nunca como fundo
export const CATEGORY_COLOR: Record<Category, string> = {
  sites: '#4DA3FF',
  sistemas: '#6BE07A',
  identidade: '#FF5C8A',
  social: '#FFB547',
  video: '#FF6B4A',
  lab: '#B18CFF',
};

export const CATEGORY_LABEL: Record<Category, L> = {
  sites: { pt: 'Sites', en: 'Websites', es: 'Sitios' },
  sistemas: { pt: 'Sistemas', en: 'Systems', es: 'Sistemas' },
  identidade: { pt: 'Identidade', en: 'Identity', es: 'Identidad' },
  social: { pt: 'Social', en: 'Social', es: 'Social' },
  video: { pt: 'Vídeo', en: 'Video', es: 'Video' },
  lab: { pt: 'Lab', en: 'Lab', es: 'Lab' },
};

/* ------------------------------------------------------------------ sites */

export type SiteKind = 'landing' | 'institucional' | 'ecommerce' | 'conceito';

export const KIND_LABEL: Record<SiteKind, L> = {
  landing: { pt: 'Landing page', en: 'Landing page', es: 'Landing page' },
  institucional: { pt: 'Site institucional', en: 'Company website', es: 'Sitio institucional' },
  ecommerce: { pt: 'E-commerce', en: 'E-commerce', es: 'E-commerce' },
  conceito: { pt: 'Conceito', en: 'Concept', es: 'Concepto' },
};

export const KIND_PLURAL: Record<SiteKind, L> = {
  landing: { pt: 'Landing pages', en: 'Landing pages', es: 'Landing pages' },
  institucional: { pt: 'Institucionais', en: 'Company sites', es: 'Institucionales' },
  ecommerce: { pt: 'E-commerce', en: 'E-commerce', es: 'E-commerce' },
  conceito: { pt: 'Conceitos', en: 'Concepts', es: 'Conceptos' },
};

export type Site = {
  slug: string;
  title: string;
  segment: L;
  kind: SiteKind;
  stack: string;
  url: string;
  featured?: boolean;
};

const S = {
  static: 'HTML + CSS + JS',
  gsap: 'HTML + GSAP',
  next: 'Next.js + React',
  react: 'React + Vite',
  three: 'HTML + Three.js',
};

export const SITES: Site[] = [
  // destaques (ordem do bento)
  { slug: 'wigga', title: 'Wigga', segment: { pt: 'Esquadrias de PVC', en: 'PVC windows and doors', es: 'Carpintería de PVC' }, kind: 'landing', stack: S.static, url: 'https://wiggaesquadrias.vercel.app/', featured: true },
  { slug: 'buenas-taqueria', title: '¡Buenas! Taquería', segment: { pt: 'Taquería em Los Angeles', en: 'Taqueria in Los Angeles', es: 'Taquería en Los Ángeles' }, kind: 'conceito', stack: 'Three.js + GSAP', url: 'https://buenastaqueria.vercel.app/', featured: true },
  { slug: 'al-revestimentos', title: 'AL Revestimentos', segment: { pt: 'Pedra natural de alto padrão', en: 'High-end natural stone', es: 'Piedra natural de alto nivel' }, kind: 'landing', stack: S.static, url: 'https://www.alrevestimentosexclusivos.com.br/', featured: true },
  { slug: 'vessar', title: 'Vessar', segment: { pt: 'Valores mobiliários', en: 'Securities', es: 'Valores mobiliarios' }, kind: 'institucional', stack: S.static, url: 'https://vessarlandingpage.vercel.app/', featured: true },
  { slug: 'gervasio-marmores', title: 'Gervásio Mármores', segment: { pt: 'Marmoraria', en: 'Marble workshop', es: 'Marmolería' }, kind: 'landing', stack: S.static, url: 'https://gervasio-marmoraria.vercel.app/', featured: true },
  { slug: 'nalu-poke', title: 'Nalu Poke', segment: { pt: 'Cardápio digital', en: 'Digital menu', es: 'Menú digital' }, kind: 'institucional', stack: S.static, url: 'https://nalupoke.vercel.app/', featured: true },
  { slug: 'air-jordan', title: 'Air Jordan', segment: { pt: 'Experiência interativa', en: 'Interactive experience', es: 'Experiencia interactiva' }, kind: 'conceito', stack: S.static, url: 'https://airjordan-eight.vercel.app/', featured: true },
  { slug: 'pokemon', title: 'Pokémon', segment: { pt: 'Narrativa cinematográfica', en: 'Cinematic storytelling', es: 'Narrativa cinematográfica' }, kind: 'conceito', stack: S.gsap, url: 'https://pokemon-kappa-neon.vercel.app/', featured: true },

  // o resto, mais recentes primeiro
  { slug: 'pedras-decorativas', title: 'Pedras Decorativas', segment: { pt: 'Pedras decorativas', en: 'Decorative stones', es: 'Piedras decorativas' }, kind: 'landing', stack: S.static, url: 'https://petranobile.vercel.app/' },
  { slug: 'toque-e-retoque', title: 'Toque & Retoque', segment: { pt: 'Acabamentos e porcelanato', en: 'Finishes and porcelain', es: 'Acabados y porcelanato' }, kind: 'landing', stack: S.static, url: 'https://toqueeretoque.vercel.app/' },
  { slug: 'constru-facil', title: 'Constru Fácil', segment: { pt: 'Pedras e churrasqueiras', en: 'Stones and barbecue grills', es: 'Piedras y parrillas' }, kind: 'landing', stack: S.static, url: 'https://construfacilitu.vercel.app/' },
  { slug: 'iiot', title: 'IIOT', segment: { pt: 'Internet industrial', en: 'Industrial IoT', es: 'IoT industrial' }, kind: 'institucional', stack: S.static, url: 'https://iiotlandingpage.vercel.app/' },
  { slug: 'agata-aesthetics', title: 'Agata Medical Aesthetics', segment: { pt: 'Estética médica', en: 'Medical aesthetics', es: 'Medicina estética' }, kind: 'institucional', stack: S.static, url: 'https://agatasoldato.vercel.app/' },
  { slug: 'elisangela-selau', title: 'Elisângela Selau', segment: { pt: 'Arquitetura', en: 'Architecture', es: 'Arquitectura' }, kind: 'landing', stack: S.static, url: 'https://elisangelaselau.vercel.app/' },
  { slug: 'vougue-festas', title: 'Vougue Festas', segment: { pt: 'Casa de festas', en: 'Event venue', es: 'Salón de fiestas' }, kind: 'landing', stack: S.static, url: 'https://vouguefestas.vercel.app/' },
  { slug: 'yuri-reis', title: 'Yuri Reis', segment: { pt: 'Educação financeira', en: 'Financial education', es: 'Educación financiera' }, kind: 'institucional', stack: S.static, url: 'https://yuri-links.vercel.app/' },
  { slug: 'paulani', title: 'Paulani', segment: { pt: 'Gestão empresarial', en: 'Business management', es: 'Gestión empresarial' }, kind: 'institucional', stack: S.static, url: 'https://paulani.vercel.app/' },
  { slug: 'forset', title: 'Forset', segment: { pt: 'Aplicativo de beach tennis', en: 'Beach tennis app', es: 'App de beach tennis' }, kind: 'institucional', stack: S.static, url: 'https://forset.vercel.app/' },
  { slug: 'neuro-summit', title: 'Neuro Summit', segment: { pt: 'Simpósio científico', en: 'Scientific symposium', es: 'Simposio científico' }, kind: 'landing', stack: S.react, url: 'https://neuro-summit-landing.vercel.app/' },
  { slug: 'fino-acabamento', title: 'Fino Acabamento', segment: { pt: 'Revestimentos e porcelanato', en: 'Tiles and porcelain', es: 'Revestimientos y porcelanato' }, kind: 'landing', stack: S.static, url: 'https://finoacabamento.vercel.app/' },
  { slug: 'brn-streaming', title: 'BRN Streaming', segment: { pt: 'Estúdio de transmissão', en: 'Live streaming studio', es: 'Estudio de transmisión' }, kind: 'institucional', stack: S.gsap, url: 'https://brnstreaming.vercel.app/' },
  { slug: 'bip-vale', title: 'BIP Vale', segment: { pt: 'Loteamento industrial', en: 'Industrial park', es: 'Parque industrial' }, kind: 'landing', stack: S.gsap, url: 'https://bipvale.vercel.app/' },
  { slug: 'gcarneiro', title: 'GCarneiro', segment: { pt: 'Consultoria de treino', en: 'Training coaching', es: 'Asesoría de entrenamiento' }, kind: 'institucional', stack: S.static, url: 'https://gcarneiro.vercel.app/' },
  { slug: 'retro-em-campo', title: 'Retrô em Campo', segment: { pt: 'Camisas de futebol', en: 'Retro football shirts', es: 'Camisetas de fútbol' }, kind: 'ecommerce', stack: S.static, url: 'https://retroemcampo.vercel.app/' },
  { slug: 'lizzy-prime', title: 'Lizzy Prime', segment: { pt: 'Consórcio', en: 'Purchase consortium', es: 'Consorcio' }, kind: 'landing', stack: S.gsap, url: 'https://lizzyprime.vercel.app/' },
  { slug: 'pedras-do-brasil', title: 'Pedras do Brasil', segment: { pt: 'Pedra natural', en: 'Natural stone', es: 'Piedra natural' }, kind: 'landing', stack: S.static, url: 'https://pedrasdobrasilfoz.vercel.app/' },
  { slug: 'aeroprev', title: 'AeroPrev', segment: { pt: 'Direito previdenciário', en: 'Pension law', es: 'Derecho previsional' }, kind: 'landing', stack: S.static, url: 'https://landingpageaeroprev.vercel.app/' },
  { slug: 'race-valley', title: 'Race Valley', segment: { pt: 'Evento esportivo', en: 'Sports event', es: 'Evento deportivo' }, kind: 'landing', stack: S.static, url: 'https://racevalley.vercel.app/' },
  { slug: 'acc-consultoria', title: 'ACC Consultoria', segment: { pt: 'Consultoria jurídica', en: 'Legal consulting', es: 'Consultoría jurídica' }, kind: 'landing', stack: S.static, url: 'https://acconsultoria.vercel.app/' },
  { slug: 'canopus', title: 'Canopus', segment: { pt: 'Lançamento imobiliário', en: 'Real estate launch', es: 'Lanzamiento inmobiliario' }, kind: 'landing', stack: S.static, url: 'https://aptosemsp-hub.vercel.app/' },
  { slug: 'tadex', title: 'Tadex', segment: { pt: 'Transportadora', en: 'Freight carrier', es: 'Transportadora' }, kind: 'institucional', stack: S.static, url: 'https://tadex.vercel.app/' },
  { slug: 'danilo-lovisaro', title: 'Danilo Lovisaro', segment: { pt: 'Professor de Direito', en: 'Law professor', es: 'Profesor de Derecho' }, kind: 'landing', stack: S.static, url: 'https://danilolovisaro.vercel.app/' },
  { slug: 'invista-capital', title: 'Invista Capital', segment: { pt: 'Consórcio', en: 'Purchase consortium', es: 'Consorcio' }, kind: 'landing', stack: S.static, url: 'https://invistacapital.vercel.app/' },
  { slug: 'remach', title: 'Remach', segment: { pt: 'Planejamento financeiro', en: 'Financial planning', es: 'Planificación financiera' }, kind: 'institucional', stack: S.react, url: 'https://remach.vercel.app/' },
  { slug: 'the-auad-method', title: 'The Auad Method', segment: { pt: 'Formação médica', en: 'Medical training', es: 'Formación médica' }, kind: 'landing', stack: S.three, url: 'https://palomaauad.vercel.app/' },
  { slug: 'onlife', title: 'OnLife', segment: { pt: 'Telemedicina', en: 'Telemedicine', es: 'Telemedicina' }, kind: 'landing', stack: S.static, url: 'https://onlifebrasil.vercel.app/' },
  { slug: 'miami-haus', title: 'Miami Haus', segment: { pt: 'Imóveis em Miami', en: 'Miami real estate', es: 'Inmuebles en Miami' }, kind: 'institucional', stack: S.static, url: 'https://miamihaus.vercel.app/' },
  { slug: 'sensorial-moove', title: 'Sensorial Moove', segment: { pt: 'Estimulação cognitiva', en: 'Cognitive stimulation', es: 'Estimulación cognitiva' }, kind: 'landing', stack: S.gsap, url: 'https://sensorial-lp.vercel.app/' },
  { slug: 'clau-carvalho', title: 'Clau Carvalho', segment: { pt: 'Nutrição', en: 'Nutrition', es: 'Nutrición' }, kind: 'landing', stack: S.static, url: 'https://nutriclau.vercel.app/' },
  { slug: 'clinica-tempora', title: 'Clínica Têmpora', segment: { pt: 'Fisioterapia', en: 'Physiotherapy', es: 'Fisioterapia' }, kind: 'landing', stack: S.static, url: 'https://clinicatempora.vercel.app/' },
  { slug: 'casa-design', title: 'Casa Design', segment: { pt: 'Móveis planejados', en: 'Custom furniture', es: 'Muebles a medida' }, kind: 'institucional', stack: S.react, url: 'https://casadesign-coral.vercel.app/' },
  { slug: 'cts-construction', title: 'CTS Construction', segment: { pt: 'Construção e reforma', en: 'Construction and remodeling', es: 'Construcción y reformas' }, kind: 'institucional', stack: S.react, url: 'https://ctsconstruction.vercel.app/' },
  { slug: 'ld-services', title: 'LD Services', segment: { pt: 'Pintura profissional', en: 'Professional painting', es: 'Pintura profesional' }, kind: 'institucional', stack: S.react, url: 'https://ldservicesinc.vercel.app/' },
  { slug: 'united-way', title: 'United Way', segment: { pt: 'Organização social', en: 'Nonprofit', es: 'Organización social' }, kind: 'institucional', stack: S.react, url: 'https://unitedwayswga.vercel.app/' },
  { slug: 'proconsult', title: 'ProConsult', segment: { pt: 'Consultoria em gestão', en: 'Management consulting', es: 'Consultoría de gestión' }, kind: 'institucional', stack: S.static, url: 'https://proconsult-lake.vercel.app/' },
  { slug: 'the-toxic-land', title: 'The Toxic Land', segment: { pt: 'Loja de camisetas', en: 'T-shirt store', es: 'Tienda de camisetas' }, kind: 'ecommerce', stack: S.next, url: 'https://thetoxicland.vercel.app/' },
  { slug: 'blck-belt', title: 'BLCK BELT', segment: { pt: 'Moda esportiva', en: 'Sportswear', es: 'Moda deportiva' }, kind: 'ecommerce', stack: S.next, url: 'https://blckbelt-store.vercel.app/' },
  { slug: 'torofila', title: 'Torofila', segment: { pt: 'Suplemento', en: 'Supplement', es: 'Suplemento' }, kind: 'ecommerce', stack: S.static, url: 'https://torofila.vercel.app/' },
  { slug: 'portao-eletronico-mg', title: 'Portão Eletrônico MG', segment: { pt: 'Portões e automação', en: 'Gates and automation', es: 'Portones y automatización' }, kind: 'landing', stack: S.static, url: 'https://portaoeletronico.vercel.app/' },
];

export const siteCover = (slug: string, small = false) => `/assets/portfolio/${slug}${small ? '-sm' : ''}.webp`;

/* --------------------------------------------------------------- sistemas */

export type Screen = { label: L; src: string; video?: string };

export type System = {
  slug: string;
  name: L;
  desc: L;
  points?: L[];
  stack: string;
  screens: Screen[];
  soon?: boolean;
};

const tab = (pt: string, en: string, es: string): L => ({ pt, en, es });
const shot = (file: string) => `/assets/v2/sistemas/${file}.webp`;

export const AGENCY: System = {
  slug: 'agencia-ia',
  name: tab('Agência de IA', 'AI Agency', 'Agencia de IA'),
  desc: tab(
    'Um escritório com agentes de IA trabalhando ao vivo. Cada um tem função, mesa e fila de tarefas: você pede no chat, eles planejam, produzem e entregam para a sua aprovação.',
    'An office of AI agents working live. Each one has a role, a desk and a task queue: you ask in the chat, they plan, produce and deliver for your approval.',
    'Una oficina con agentes de IA trabajando en vivo. Cada uno tiene función, escritorio y cola de tareas: pides en el chat, ellos planean, producen y entregan para tu aprobación.',
  ),
  points: [
    tab('Agentes de copy, design, vídeo, tráfego e comercial', 'Copy, design, video, ads and sales agents', 'Agentes de copy, diseño, video, tráfico y comercial'),
    tab('Pedido no chat, plano na hora, entrega para aprovar', 'Ask in the chat, get a plan, approve the delivery', 'Pedido en el chat, plan al instante, entrega para aprobar'),
    tab('Painel com receita, custo e entregas da semana', 'Dashboard with revenue, cost and weekly output', 'Panel con ingresos, costos y entregas de la semana'),
  ],
  stack: 'React + Node',
  soon: true,
  screens: [
    { label: tab('Escritório', 'Office', 'Oficina'), src: shot('agencia-escritorio'), video: '/assets/v2/agencia/escritorio.mp4' },
    { label: tab('Chat', 'Chat', 'Chat'), src: shot('agencia-chat'), video: '/assets/v2/agencia/escritorio-chat.mp4' },
    { label: tab('Painel', 'Dashboard', 'Panel'), src: shot('agencia-painel') },
    { label: tab('Comercial', 'Sales', 'Comercial'), src: shot('agencia-comercial') },
  ],
};

export const SYSTEMS: System[] = [
  {
    slug: 'crm-estetica',
    name: tab('CRM para clínica de estética', 'CRM for an aesthetics clinic', 'CRM para clínica estética'),
    desc: tab(
      '17 módulos numa plataforma só: funil de leads, inbox, agenda, PDV, estoque, relatórios e portal do cliente.',
      '17 modules in one platform: lead pipeline, inbox, calendar, POS, inventory, reports and client portal.',
      '17 módulos en una sola plataforma: embudo de leads, inbox, agenda, punto de venta, inventario, informes y portal del cliente.',
    ),
    stack: 'Next.js + React + Postgres',
    screens: [
      { label: tab('Início', 'Home', 'Inicio'), src: shot('estetica-home') },
      { label: tab('Leads', 'Leads', 'Leads'), src: shot('estetica-leads') },
      { label: tab('Agenda', 'Calendar', 'Agenda'), src: shot('estetica-agenda') },
      { label: tab('Relatórios', 'Reports', 'Informes'), src: shot('estetica-relatorios') },
      { label: tab('Inbox', 'Inbox', 'Inbox'), src: shot('estetica-inbox') },
    ],
  },
  {
    slug: 'crm-infantil',
    name: tab('CRM para clínica infantil de TDAH e TEA', 'CRM for a pediatric ADHD and autism clinic', 'CRM para clínica infantil de TDAH y TEA'),
    desc: tab(
      'Atendimento por WhatsApp com três atendentes no mesmo número, e relatório de tempo de resposta e conversão por pessoa.',
      'WhatsApp service with three agents on a single number, plus response time and conversion reports per person.',
      'Atención por WhatsApp con tres agentes en el mismo número, e informes de tiempo de respuesta y conversión por persona.',
    ),
    stack: 'Next.js + Supabase',
    screens: [
      { label: tab('Conversas', 'Chats', 'Conversaciones'), src: shot('infantil-conversas') },
      { label: tab('Relatórios', 'Reports', 'Informes'), src: shot('infantil-relatorios') },
    ],
  },
  {
    slug: 'crm-advocacia',
    name: tab('CRM para escritório de advocacia', 'CRM for a law firm', 'CRM para despacho de abogados'),
    desc: tab(
      'Cobrança mensal, nota fiscal e régua de follow-up automática por e-mail e WhatsApp.',
      'Monthly billing, invoices and automatic follow-up sequences by email and WhatsApp.',
      'Cobranza mensual, factura y secuencia de seguimiento automática por e-mail y WhatsApp.',
    ),
    stack: 'Next.js + Supabase',
    screens: [
      { label: tab('Painel', 'Dashboard', 'Panel'), src: shot('advocacia-dashboard') },
      { label: tab('Cobranças', 'Billing', 'Cobros'), src: shot('advocacia-kanban') },
      { label: tab('Régua', 'Follow-up', 'Seguimiento'), src: shot('advocacia-regua') },
    ],
  },
  {
    slug: 'envios',
    name: tab('Plataforma de envios internacionais', 'International shipping platform', 'Plataforma de envíos internacionales'),
    desc: tab(
      'Cotação por caixa, pagamento online e um bot de WhatsApp que assume o atendimento depois da compra.',
      'Per-box quotes, online payment and a WhatsApp bot that takes over after the purchase.',
      'Cotización por caja, pago en línea y un bot de WhatsApp que atiende después de la compra.',
    ),
    stack: 'Next.js + Stripe',
    screens: [{ label: tab('Cotação', 'Quote', 'Cotización'), src: shot('envios-cotizador') }],
  },
  {
    slug: 'prospeccao',
    name: tab('Prospecção automática', 'Automated outreach', 'Prospección automática'),
    desc: tab(
      'E-mail frio com disparo em rodízio de contas, aberturas, cliques, respostas e agenda num painel só.',
      'Cold email with rotating sender accounts, opens, clicks, replies and scheduling in one dashboard.',
      'E-mail en frío con rotación de cuentas, aperturas, clics, respuestas y agenda en un solo panel.',
    ),
    stack: 'Next.js + Supabase',
    screens: [],
  },
];

/* ------------------------------------------------------------- identidade */

export type Brand = { slug: string; title: string; cover: string; href?: string; featured?: boolean };

const cover = (n: string) => `/assets/00. Cover/${n}.webp`;

export const BRANDS: Brand[] = [
  { slug: 'biothera', title: 'Biothera', cover: cover('02. Biothera'), href: '/projeto-biothera', featured: true },
  { slug: 'hello-bim', title: 'Hello BIM', cover: cover('05. Hello BIM'), href: '/projeto-hellobim', featured: true },
  { slug: 'rax-seguros', title: 'RAX Seguros', cover: cover('06. RAX Seguros'), href: '/projeto-raxseguros', featured: true },
  { slug: 'nexa', title: 'NEXA.co', cover: '/assets/v2/identidade/nexa-cover.webp', href: '/projeto-nexa' },
  { slug: 'mademax', title: 'MADEMAX', cover: cover('01. MADEMAX'), href: '/projeto-mademax' },
  { slug: 'divino-car', title: 'Divino Car', cover: cover('03. Divino Car'), href: '/projeto-divinocar' },
  { slug: 'proconsult', title: 'ProConsult', cover: cover('04. ProConsult'), href: '/projeto-proconsult' },
  { slug: 'poly-santos', title: 'Poly Santos', cover: cover('07. Poly Santos'), href: '/projeto-polysantos' },
  { slug: 'ecomove', title: 'Ecomove', cover: cover('08. Ecomove'), href: '/projeto-ecomove' },
  { slug: 'remach-capital', title: 'Remach Capital', cover: cover('09. Remach Capital'), href: '/projeto-remachcapital' },
];

/* ----------------------------------------------------------------- serviços */

export type Service = { key: Category | 'trafego'; title: L; desc: L; tools: string; color: string };

export const SERVICES: Service[] = [
  {
    key: 'sites',
    color: CATEGORY_COLOR.sites,
    title: tab('Sites e landing pages', 'Websites and landing pages', 'Sitios y landing pages'),
    desc: tab('Do layout ao ar, rápidos no celular e prontos para anúncio, em até três idiomas.', 'From layout to launch, fast on mobile and ready for ads, in up to three languages.', 'Del diseño al lanzamiento, rápidos en el celular y listos para anuncios, en hasta tres idiomas.'),
    tools: 'Figma · HTML · CSS · JS · Next.js',
  },
  {
    key: 'sistemas',
    color: CATEGORY_COLOR.sistemas,
    title: tab('Sistemas sob medida', 'Custom systems', 'Sistemas a medida'),
    desc: tab('CRMs, plataformas, automações e prospecção automática, feitos para a rotina do seu time.', 'CRMs, platforms, automations and automated outreach, built around your team’s routine.', 'CRMs, plataformas, automatizaciones y prospección automática, hechos para la rutina de tu equipo.'),
    tools: 'React · Next.js · Node · Supabase',
  },
  {
    key: 'identidade',
    color: CATEGORY_COLOR.identidade,
    title: tab('Identidade visual', 'Visual identity', 'Identidad visual'),
    desc: tab('Logo, paleta, tipografia e manual de marca para a empresa parecer do tamanho que quer ter.', 'Logo, palette, typography and brand guidelines so the company looks the size it wants to be.', 'Logo, paleta, tipografía y manual de marca para que la empresa parezca del tamaño que quiere tener.'),
    tools: 'Illustrator · Photoshop · Figma',
  },
  {
    key: 'social',
    color: CATEGORY_COLOR.social,
    title: tab('Social media', 'Social media', 'Social media'),
    desc: tab('Posts, carrosséis e criativos de anúncio com direção de arte consistente, mês a mês.', 'Posts, carousels and ad creatives with consistent art direction, month after month.', 'Posts, carruseles y creativos de anuncio con dirección de arte consistente, mes a mes.'),
    tools: 'Photoshop · Illustrator · Figma',
  },
  {
    key: 'video',
    color: CATEGORY_COLOR.video,
    title: tab('Vídeo', 'Video', 'Video'),
    desc: tab('Reels, cortes e vídeos de anúncio com legenda, trilha e efeito sonoro.', 'Reels, clips and ad videos with captions, music and sound design.', 'Reels, cortes y videos de anuncio con subtítulos, música y efectos de sonido.'),
    tools: 'Premiere · Photoshop · React',
  },
  {
    key: 'trafego',
    color: '#E0E0E0',
    title: tab('Tráfego pago', 'Paid ads', 'Tráfico pago'),
    desc: tab('Campanhas no Meta e no Google com página, criativo e mensuração conversando entre si.', 'Meta and Google campaigns where page, creative and tracking work together.', 'Campañas en Meta y Google con página, creativo y medición trabajando juntos.'),
    tools: 'Meta Ads · Google Ads · GTM',
  },
];

// logos do devicon (MIT), em public/assets/v2/tools
export const TOOLS: { name: string; logo: string }[] = [
  { name: 'Illustrator', logo: 'illustrator' },
  { name: 'Photoshop', logo: 'photoshop' },
  { name: 'Premiere', logo: 'premiere' },
  { name: 'Figma', logo: 'figma' },
  { name: 'HTML', logo: 'html' },
  { name: 'CSS', logo: 'css' },
  { name: 'JavaScript', logo: 'javascript' },
  { name: 'React', logo: 'react' },
  { name: 'Next.js', logo: 'nextjs' },
  { name: 'Node.js', logo: 'node' },
  { name: 'Supabase', logo: 'supabase' },
  { name: 'Vercel', logo: 'vercel' },
];
