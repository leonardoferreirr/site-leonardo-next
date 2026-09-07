export type WebCategory =
  | 'marketing'
  | 'saude'
  | 'imoveis'
  | 'financas'
  | 'eventos'
  | 'ecommerce'
  | 'corporativo'
  | 'juridico'
  | 'conceito';

export type WebProject = {
  title: string;
  segment: string;
  category: WebCategory;
  cover: string;
  url: string;
};

export const CATEGORY_LABELS: Record<WebCategory | 'todos', string> = {
  todos: 'Todos',
  marketing: 'Marketing',
  saude: 'Saúde e Bem-estar',
  imoveis: 'Imóveis e Construção',
  financas: 'Finanças',
  eventos: 'Eventos',
  ecommerce: 'E-commerce',
  corporativo: 'Corporativo',
  juridico: 'Jurídico',
  conceito: 'Conceito',
};

export const CATEGORY_ORDER: (WebCategory | 'todos')[] = [
  'todos',
  'marketing',
  'saude',
  'imoveis',
  'financas',
  'eventos',
  'ecommerce',
  'corporativo',
  'juridico',
  'conceito',
];

/**
 * Ordem intencional:
 * 1-8   destaques que já vinham do site principal, na prioridade original
 * 9-16  os projetos mais fortes do acervo
 * 17-40 meio
 * 41+   trabalhos do início de carreira
 * O link SEMPRE aponta para o deploy na Vercel, que é o que eu controlo.
 * Domínio do cliente não serve de prova: ele pode revisar o site com outra
 * pessoa, deixar vencer ou tirar do ar, e o card passa a mostrar algo que não
 * é meu. As exceções estão comentadas caso a caso.
 */
export const webProjects: WebProject[] = [
  {
    title: 'Paulani',
    segment: 'Gestão empresarial',
    category: 'corporativo',
    cover: '/assets/portfolio/paulani.webp',
    url: 'https://paulani.vercel.app/',
  },
  {
    title: 'Nalu Poke',
    segment: 'Cardápio digital',
    category: 'ecommerce',
    cover: '/assets/portfolio/nalu-poke.webp',
    url: 'https://nalupoke.vercel.app/',
  },
  {
    title: 'Forset',
    segment: 'Aplicativo de beach tennis',
    category: 'saude',
    cover: '/assets/portfolio/forset.webp',
    url: 'https://forset.vercel.app/',
  },
  {
    title: 'Neuro Summit',
    segment: 'Simpósio científico',
    category: 'eventos',
    cover: '/assets/portfolio/neuro-summit.webp',
    url: 'https://neuro-summit-landing.vercel.app/',
  },
  {
    title: 'Fino Acabamento',
    segment: 'Revestimentos e porcelanato',
    category: 'imoveis',
    cover: '/assets/portfolio/fino-acabamento.webp',
    // Exceção: o projeto 'finoacabamento' na Vercel não tem alias público .vercel.app.
    // Só existe o domínio do cliente e as URLs com sufixo do time, que pedem
    // login. Para blindar este card, criar o alias na Vercel e trocar aqui.
    url: 'https://www.finoacabamentopisos.com.br/',
  },
  {
    title: 'BRN Streaming',
    segment: 'Estúdio de transmissão',
    category: 'marketing',
    cover: '/assets/portfolio/brn-streaming.webp',
    url: 'https://brnstreaming.vercel.app/',
  },
  {
    title: 'BIP Vale',
    segment: 'Loteamento industrial',
    category: 'imoveis',
    cover: '/assets/portfolio/bip-vale.webp',
    url: 'https://bipvale.vercel.app/',
  },
  {
    title: 'GCarneiro',
    segment: 'Consultoria de treino',
    category: 'saude',
    cover: '/assets/portfolio/gcarneiro.webp',
    url: 'https://gcarneiro.vercel.app/',
  },
  {
    title: 'Retrô em Campo',
    segment: 'Camisas de futebol',
    category: 'ecommerce',
    cover: '/assets/portfolio/retro-em-campo.webp',
    // Exceção: o projeto 'retro-em-campo' na Vercel não tem alias público .vercel.app.
    // Só existe o domínio do cliente e as URLs com sufixo do time, que pedem
    // login. Para blindar este card, criar o alias na Vercel e trocar aqui.
    url: 'https://www.retroemcampo.com.br/',
  },
  {
    title: 'Lizzy Prime',
    segment: 'Consórcio',
    category: 'financas',
    cover: '/assets/portfolio/lizzy-prime.webp',
    url: 'https://lizzyprime.vercel.app/',
  },
  {
    title: 'Pedras do Brasil',
    segment: 'Pedra natural',
    category: 'imoveis',
    cover: '/assets/portfolio/pedras-do-brasil.webp',
    // Exceção: o projeto 'pedrasdobrasil-landing' na Vercel não tem alias público .vercel.app.
    // Só existe o domínio do cliente e as URLs com sufixo do time, que pedem
    // login. Para blindar este card, criar o alias na Vercel e trocar aqui.
    url: 'https://www.pedrasdobrasilfoz.com.br/',
  },
  {
    title: 'AeroPrev',
    segment: 'Direito previdenciário',
    category: 'juridico',
    cover: '/assets/portfolio/aeroprev.webp',
    url: 'https://landingpageaeroprev.vercel.app/',
  },
  {
    title: 'Air Jordan',
    segment: 'Experiência interativa',
    category: 'conceito',
    cover: '/assets/portfolio/air-jordan.webp',
    url: 'https://airjordan-eight.vercel.app/',
  },
  {
    title: 'Race Valley',
    segment: 'Evento esportivo',
    category: 'eventos',
    cover: '/assets/portfolio/race-valley.webp',
    url: 'https://racevalley.vercel.app/',
  },
  {
    title: 'Mia Compra',
    segment: 'Envios dos Estados Unidos',
    category: 'corporativo',
    cover: '/assets/portfolio/mia-compra.webp',
    // Exceção: o projeto 'miacompra' na Vercel não tem alias público .vercel.app.
    // Só existe o domínio do cliente e as URLs com sufixo do time, que pedem
    // login. Para blindar este card, criar o alias na Vercel e trocar aqui.
    url: 'https://www.miacompra.com/',
  },
  {
    title: 'ACC Consultoria',
    segment: 'Consultoria jurídica',
    category: 'juridico',
    cover: '/assets/portfolio/acc-consultoria.webp',
    url: 'https://acconsultoria.vercel.app/',
  },
  {
    title: 'Canopus',
    segment: 'Lançamento imobiliário',
    category: 'imoveis',
    cover: '/assets/portfolio/canopus.webp',
    url: 'https://aptosemsp-hub.vercel.app/',
  },
  {
    title: 'Tadex',
    segment: 'Transportadora',
    category: 'corporativo',
    cover: '/assets/portfolio/tadex.webp',
    url: 'https://tadex.vercel.app/',
  },
  {
    title: 'Pokémon',
    segment: 'Narrativa cinematográfica',
    category: 'conceito',
    cover: '/assets/portfolio/pokemon.webp',
    url: 'https://pokemon-kappa-neon.vercel.app/',
  },
  {
    title: 'Danilo Lovisaro',
    segment: 'Professor de Direito',
    category: 'juridico',
    cover: '/assets/portfolio/danilo-lovisaro.webp',
    url: 'https://danilolovisaro.vercel.app/',
  },
  {
    title: 'Invista Capital',
    segment: 'Consórcio',
    category: 'financas',
    cover: '/assets/portfolio/invista-capital.webp',
    url: 'https://invistacapital.vercel.app/',
  },
  {
    title: 'Remach',
    segment: 'Planejamento financeiro',
    category: 'financas',
    cover: '/assets/portfolio/remach.webp',
    url: 'https://remach.vercel.app/',
  },
  {
    title: 'The Auad Method',
    segment: 'Formação médica',
    category: 'saude',
    cover: '/assets/portfolio/the-auad-method.webp',
    url: 'https://palomaauad.vercel.app/',
  },
  {
    title: 'OnLife',
    segment: 'Telemedicina',
    category: 'saude',
    cover: '/assets/portfolio/onlife.webp',
    url: 'https://onlifebrasil.vercel.app/',
  },
  {
    title: 'Miami Haus',
    segment: 'Real estate',
    category: 'imoveis',
    cover: '/assets/portfolio/miami-haus.webp',
    url: 'https://miamihaus.vercel.app/',
  },
  {
    title: 'Sensorial Moove',
    segment: 'Estimulação cognitiva',
    category: 'saude',
    cover: '/assets/portfolio/sensorial-moove.webp',
    url: 'https://sensorial-lp.vercel.app/',
  },
  {
    title: 'Clau Carvalho',
    segment: 'Nutrição',
    category: 'saude',
    cover: '/assets/portfolio/clau-carvalho.webp',
    url: 'https://nutriclau.vercel.app/',
  },
  {
    title: 'Clínica Têmpora',
    segment: 'Fisioterapia',
    category: 'saude',
    cover: '/assets/portfolio/clinica-tempora.webp',
    url: 'https://clinicatempora.vercel.app/',
  },
  {
    title: 'Casa Design',
    segment: 'Móveis planejados',
    category: 'imoveis',
    cover: '/assets/portfolio/casa-design.webp',
    url: 'https://casadesign-coral.vercel.app/',
  },
  {
    title: 'CTS Construction',
    segment: 'Construção e reforma',
    category: 'imoveis',
    cover: '/assets/portfolio/cts-construction.webp',
    url: 'https://ctsconstruction.vercel.app/',
  },
  {
    title: 'LD Services',
    segment: 'Pintura profissional',
    category: 'imoveis',
    cover: '/assets/portfolio/ld-services.webp',
    url: 'https://ldservicesinc.vercel.app/',
  },
  {
    title: 'United Way',
    segment: 'Organização social',
    category: 'corporativo',
    cover: '/assets/portfolio/united-way.webp',
    url: 'https://unitedwayswga.vercel.app/',
  },
  {
    title: 'ProConsult',
    segment: 'Consultoria em gestão',
    category: 'corporativo',
    cover: '/assets/portfolio/proconsult.webp',
    url: 'https://proconsult-lake.vercel.app/',
  },
  {
    title: 'The Toxic Land',
    segment: 'Loja de camisetas',
    category: 'ecommerce',
    cover: '/assets/portfolio/the-toxic-land.webp',
    url: 'https://thetoxicland.vercel.app/',
  },
  {
    title: 'BLCK BELT',
    segment: 'Moda esportiva',
    category: 'ecommerce',
    cover: '/assets/portfolio/blck-belt.webp',
    url: 'https://blckbelt-store.vercel.app/',
  },
  {
    title: 'Bella Scelta',
    segment: 'Beleza e autocuidado',
    category: 'ecommerce',
    cover: '/assets/portfolio/bella-scelta.webp',
    url: 'https://bella-scelta.vercel.app/',
  },
  {
    title: 'Torofila',
    segment: 'Suplemento',
    category: 'ecommerce',
    cover: '/assets/portfolio/torofila.webp',
    url: 'https://torofila.vercel.app/',
  },
  {
    title: 'Portão Eletrônico MG',
    segment: 'Portões e automação',
    category: 'imoveis',
    cover: '/assets/portfolio/portao-eletronico-mg.webp',
    url: 'https://portaoeletronico.vercel.app/',
  },
  {
    title: 'ArcBus',
    segment: 'Ar-condicionado para ônibus',
    category: 'corporativo',
    cover: '/assets/portfolio/arcbus.webp',
    // Exceção: o projeto 'arcbus' na Vercel não tem alias público .vercel.app.
    // Só existe o domínio do cliente e as URLs com sufixo do time, que pedem
    // login. Para blindar este card, criar o alias na Vercel e trocar aqui.
    url: 'https://www.arcbus.com.br/',
  },
  {
    title: 'Hunter Sob Medida',
    segment: 'Gestão para marcenarias',
    category: 'corporativo',
    cover: '/assets/portfolio/hunter-sob-medida.webp',
    url: 'https://huntersobmedida.vercel.app/',
  },
  {
    title: 'Beatriz Benita',
    segment: 'Advocacia',
    category: 'juridico',
    cover: '/assets/portfolio/beatriz-benita.webp',
    url: 'https://beatrizbenita.vercel.app/',
  },
  {
    title: 'Ferreira Advocacia',
    segment: 'Assessoria jurídica',
    category: 'juridico',
    cover: '/assets/portfolio/ferreira-advocacia.webp',
    url: 'https://ferreiraadvocacia.vercel.app/',
  },
  {
    title: 'Bianca Jensen',
    segment: 'Nutrição',
    category: 'saude',
    cover: '/assets/portfolio/bianca-jensen.webp',
    url: 'https://biancajensennutri.vercel.app/',
  },
  {
    title: 'Academia Brasileira da Face',
    segment: 'Harmonização orofacial',
    category: 'saude',
    cover: '/assets/portfolio/academia-brasileira-da-face.webp',
    url: 'https://academiabrasileiradaface.vercel.app/',
  },
  {
    title: 'Nupis',
    segment: 'Consultoria de comunicação',
    category: 'marketing',
    cover: '/assets/portfolio/nupis.webp',
    url: 'https://nupis.vercel.app/',
  },
  {
    title: 'Jéssica Laia',
    segment: 'Psicologia',
    category: 'saude',
    cover: '/assets/portfolio/jessica-laia.webp',
    url: 'https://jessicalaia.vercel.app/',
  },
  {
    title: 'DML Logística',
    segment: 'Guincho e logística',
    category: 'corporativo',
    cover: '/assets/portfolio/dml-logistica.webp',
    url: 'https://dmlguincho.vercel.app/',
  },
  {
    title: 'Ecossistema Aceleração 10x',
    segment: 'Recrutamento e treinamento',
    category: 'corporativo',
    cover: '/assets/portfolio/ecossistema-aceleracao-10x.webp',
    url: 'https://ecossistemaaceleracao10x10x.vercel.app/',
  },
  {
    title: 'Clínica IdealPrev',
    segment: 'Clínica médica',
    category: 'saude',
    cover: '/assets/portfolio/clinica-idealprev.webp',
    url: 'https://idealprev-sa-de-conecta.vercel.app/',
  },
  {
    title: 'D7 Home',
    segment: 'Móveis modulares',
    category: 'ecommerce',
    cover: '/assets/portfolio/d7-home.webp',
    url: 'https://d7home.vercel.app/',
  },
  {
    title: 'G&M ProServices',
    segment: 'Pintura e marcenaria',
    category: 'imoveis',
    cover: '/assets/portfolio/g-m-proservices.webp',
    url: 'https://gmproservices.vercel.app/',
  },
];
