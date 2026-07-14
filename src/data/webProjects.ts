export type WebCategory =
  | 'marketing'
  | 'saude'
  | 'imoveis'
  | 'financas'
  | 'eventos'
  | 'ecommerce'
  | 'corporativo'
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
  saude: 'Saúde',
  imoveis: 'Imóveis e Construção',
  financas: 'Finanças',
  eventos: 'Eventos',
  ecommerce: 'E-commerce',
  corporativo: 'Corporativo',
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
  'conceito',
];

/**
 * Ordem intencional: os 8 primeiros já eram os destaques do site principal
 * e mantêm a prioridade original. Os demais vêm em seguida.
 */
export const webProjects: WebProject[] = [
  {
    title: 'P1 Marketing',
    segment: 'Agência de performance',
    category: 'marketing',
    cover: '/assets/00. Cover/10. P1 Marketing.webp',
    url: 'https://p1-marketing.vercel.app/',
  },
  {
    title: 'Nalu Poke',
    segment: 'Cardápio digital',
    category: 'ecommerce',
    cover: '/assets/00. Cover/11. Nalu Poke.webp',
    url: 'https://nalupoke.vercel.app/',
  },
  {
    title: 'Forset',
    segment: 'Ranking de beach tennis',
    category: 'corporativo',
    cover: '/assets/00. Cover/12. Forset.webp',
    url: 'https://site.forset.com.br/',
  },
  {
    title: 'Neuro Summit',
    segment: 'Simpósio científico',
    category: 'eventos',
    cover: '/assets/00. Cover/13. Neuro Summit.webp',
    url: 'https://neurosummit.sensorial.life/',
  },
  {
    title: 'Air Jordan',
    segment: 'Experiência interativa',
    category: 'conceito',
    cover: '/assets/00. Cover/14. Air Jordan.webp',
    url: 'https://airjordan-portfolio.vercel.app/',
  },
  {
    title: 'Pokémon',
    segment: 'Narrativa cinematográfica',
    category: 'conceito',
    cover: '/assets/00. Cover/15. Pokemon.webp',
    url: 'https://pokemon.leonardoferreirr.com.br/',
  },
  {
    title: 'GCarneiro',
    segment: 'Consultoria de treino',
    category: 'saude',
    cover: '/assets/00. Cover/16. GCarneiro.webp',
    url: 'https://www.gcarneiro.com.br/',
  },
  {
    title: 'ProConsult',
    segment: 'Consultoria em gestão',
    category: 'corporativo',
    cover: '/assets/00. Cover/17. ProConsult Site.webp',
    url: 'https://www.proconsult.tech/',
  },

  {
    title: 'Lizzy Prime',
    segment: 'Consórcio',
    category: 'financas',
    cover: '/assets/portfolio/lizzyprime.webp',
    url: 'https://lizzyprime.vercel.app/',
  },
  {
    title: 'BIP Vale',
    segment: 'Loteamento industrial',
    category: 'imoveis',
    cover: '/assets/portfolio/bipvale.webp',
    url: 'https://bipvale.vercel.app/',
  },
  {
    title: 'Race Valley',
    segment: 'Evento esportivo',
    category: 'eventos',
    cover: '/assets/portfolio/racevalley.webp',
    url: 'https://racevalley.vercel.app/',
  },
  {
    title: 'BRN Streaming',
    segment: 'Estúdio de transmissão',
    category: 'marketing',
    cover: '/assets/portfolio/brnstreaming.webp',
    url: 'https://brnstreaming.vercel.app/',
  },
  {
    title: 'Invista Capital',
    segment: 'Consórcio',
    category: 'financas',
    cover: '/assets/portfolio/invistacapital.webp',
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
    title: 'OnLife África',
    segment: 'Telemedicina',
    category: 'saude',
    cover: '/assets/portfolio/onlifeafrica.webp',
    url: 'https://onlifeafrica.vercel.app/',
  },
  {
    title: 'Sensorial Moove',
    segment: 'Estimulação cognitiva',
    category: 'saude',
    cover: '/assets/portfolio/sensorialmoove.webp',
    url: 'https://sensorial-lp.vercel.app/',
  },
  {
    title: 'The Auad Method',
    segment: 'Formação médica',
    category: 'saude',
    cover: '/assets/portfolio/auadmethod.webp',
    url: 'https://palomaauad.vercel.app/',
  },
  {
    title: 'Nutriclau',
    segment: 'Nutrição',
    category: 'saude',
    cover: '/assets/portfolio/nutriclau.webp',
    url: 'https://nutriclau.vercel.app/',
  },
  {
    title: 'IdealPrev',
    segment: 'Clínica médica',
    category: 'saude',
    cover: '/assets/portfolio/idealprev.webp',
    url: 'https://idealprev-sa-de-conecta.vercel.app/',
  },
  {
    title: 'Miami Haus',
    segment: 'Real estate',
    category: 'imoveis',
    cover: '/assets/portfolio/miamihaus.webp',
    url: 'https://miamihaus.vercel.app/',
  },
  {
    title: 'CTS Construction',
    segment: 'Construção e reforma',
    category: 'imoveis',
    cover: '/assets/portfolio/ctsconstruction.webp',
    url: 'https://ctsconstruction.vercel.app/',
  },
  {
    title: 'G&M ProServices',
    segment: 'Pintura e marcenaria',
    category: 'imoveis',
    cover: '/assets/portfolio/gmproservices.webp',
    url: 'https://gmproservices.vercel.app/',
  },
  {
    title: 'Tadex',
    segment: 'Transportadora',
    category: 'corporativo',
    cover: '/assets/portfolio/tadex.webp',
    url: 'https://tadex.vercel.app/',
  },
  {
    title: 'United Way',
    segment: 'Organização social',
    category: 'corporativo',
    cover: '/assets/portfolio/unitedway.webp',
    url: 'https://unitedwayswga.vercel.app/',
  },
  {
    title: 'The Toxic Land',
    segment: 'Loja de camisetas',
    category: 'ecommerce',
    cover: '/assets/portfolio/toxicland.webp',
    url: 'https://thetoxicland.vercel.app/',
  },
  {
    title: 'BLCK BELT',
    segment: 'Moda esportiva',
    category: 'ecommerce',
    cover: '/assets/portfolio/blckbelt.webp',
    url: 'https://blckbelt-store.vercel.app/',
  },
  {
    title: 'Bella Scelta',
    segment: 'Beleza e autocuidado',
    category: 'ecommerce',
    cover: '/assets/portfolio/bellascelta.webp',
    url: 'https://bella-scelta.vercel.app/',
  },
  {
    title: 'Torofila',
    segment: 'Suplemento',
    category: 'ecommerce',
    cover: '/assets/portfolio/torofila.webp',
    url: 'https://torofila.vercel.app/',
  },
];
