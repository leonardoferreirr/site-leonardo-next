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
 * Sempre que o cliente tem domínio próprio, o link aponta para ele.
 */
export const webProjects: WebProject[] = [
  {
    title: 'P1',
    segment: 'Agência de marketing',
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
    segment: 'Aplicativo de beach tennis',
    category: 'saude',
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
    title: 'BRN Streaming',
    segment: 'Estúdio de transmissão',
    category: 'marketing',
    cover: '/assets/portfolio/brnstreaming.webp',
    url: 'https://www.brnstreaming.com/',
  },
  {
    title: 'BIP Vale',
    segment: 'Loteamento industrial',
    category: 'imoveis',
    cover: '/assets/portfolio/bipvale.webp',
    url: 'https://bipvale.vercel.app/',
  },
  {
    title: 'GCarneiro',
    segment: 'Consultoria de treino',
    category: 'saude',
    cover: '/assets/00. Cover/16. GCarneiro.webp',
    url: 'https://www.gcarneiro.com.br/',
  },
  {
    title: 'Retrô em Campo',
    segment: 'Camisas de futebol',
    category: 'ecommerce',
    cover: '/assets/portfolio/retroemcampo.webp',
    url: 'https://www.retroemcampo.com.br/',
  },
  {
    title: 'Lizzy Prime',
    segment: 'Consórcio',
    category: 'financas',
    cover: '/assets/portfolio/lizzyprime.webp',
    url: 'https://lizzyprime.vercel.app/',
  },
  {
    title: 'Air Jordan',
    segment: 'Experiência interativa',
    category: 'conceito',
    cover: '/assets/00. Cover/14. Air Jordan.webp',
    url: 'https://airjordan-portfolio.vercel.app/',
  },
  {
    title: 'Race Valley',
    segment: 'Evento esportivo',
    category: 'eventos',
    cover: '/assets/portfolio/racevalley.webp',
    url: 'https://www.valleygroup.com.br/',
  },
  {
    title: 'Mia Compra',
    segment: 'Envios dos Estados Unidos',
    category: 'corporativo',
    cover: '/assets/portfolio/miacompra.webp',
    url: 'https://www.miacompra.com/',
  },
  {
    title: 'ACC Consultoria',
    segment: 'Consultoria jurídica',
    category: 'juridico',
    cover: '/assets/portfolio/accjuridica.webp',
    url: 'https://www.acconsultoriajuridica.com.br/',
  },
  {
    title: 'Canopus',
    segment: 'Lançamento imobiliário',
    category: 'imoveis',
    cover: '/assets/portfolio/canopus.webp',
    url: 'https://lpcanopus.vercel.app/',
  },
  {
    title: 'Pokémon',
    segment: 'Narrativa cinematográfica',
    category: 'conceito',
    cover: '/assets/00. Cover/15. Pokemon.webp',
    url: 'https://pokemon.leonardoferreirr.com.br/',
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
    url: 'https://www.remachcapital.com.br/',
  },
  {
    title: 'The Auad Method',
    segment: 'Formação médica',
    category: 'saude',
    cover: '/assets/portfolio/auadmethod.webp',
    url: 'https://www.drapalomaauad.com/',
  },
  {
    title: 'OnLife',
    segment: 'Telemedicina',
    category: 'saude',
    cover: '/assets/portfolio/onlifebr.webp',
    url: 'https://www.onlifetelemedicina.com/',
  },
  {
    title: 'Miami Haus',
    segment: 'Real estate',
    category: 'imoveis',
    cover: '/assets/portfolio/miamihaus.webp',
    url: 'https://miamihaus.vercel.app/',
  },
  {
    title: 'Sensorial Moove',
    segment: 'Estimulação cognitiva',
    category: 'saude',
    cover: '/assets/portfolio/sensorialmoove.webp',
    url: 'https://sensorial-lp.vercel.app/',
  },
  {
    title: 'Clau Carvalho',
    segment: 'Nutrição',
    category: 'saude',
    cover: '/assets/portfolio/nutriclau.webp',
    url: 'https://www.nutriclaucarvalho.com.br/',
  },
  {
    title: 'Clínica IdealPrev',
    segment: 'Clínica médica',
    category: 'saude',
    cover: '/assets/portfolio/idealprev.webp',
    url: 'https://clinicaidealprev.com.br/',
  },
  {
    title: 'Clínica Têmpora',
    segment: 'Fisioterapia',
    category: 'saude',
    cover: '/assets/portfolio/tempora.webp',
    url: 'https://www.clinicatempora.com.br/',
  },
  {
    title: 'Casa Design',
    segment: 'Móveis planejados',
    category: 'imoveis',
    cover: '/assets/portfolio/casadesign.webp',
    url: 'https://www.casadesigncuritiba.com.br/',
  },
  {
    title: 'CTS Construction',
    segment: 'Construção e reforma',
    category: 'imoveis',
    cover: '/assets/portfolio/ctsconstruction.webp',
    url: 'https://www.ctsconstructioninc.com/',
  },
  {
    title: 'G&M ProServices',
    segment: 'Pintura e marcenaria',
    category: 'imoveis',
    cover: '/assets/portfolio/gmproservices.webp',
    url: 'https://www.gmproservicesinc.com/',
  },
  {
    title: 'LD Services',
    segment: 'Pintura profissional',
    category: 'imoveis',
    cover: '/assets/portfolio/ldservices.webp',
    url: 'https://www.ldservicespainting.com/',
  },
  {
    title: 'Tadex',
    segment: 'Transportadora',
    category: 'corporativo',
    cover: '/assets/portfolio/tadex.webp',
    url: 'https://tadex.com.br/landingpage',
  },
  {
    title: 'United Way',
    segment: 'Organização social',
    category: 'corporativo',
    cover: '/assets/portfolio/unitedway.webp',
    url: 'https://unitedwayswga.vercel.app/',
  },
  {
    title: 'ProConsult',
    segment: 'Consultoria em gestão',
    category: 'corporativo',
    cover: '/assets/00. Cover/17. ProConsult Site.webp',
    url: 'https://www.proconsult.tech/',
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
    url: 'https://www.blckbelt.com.br/',
  },
  {
    title: 'Bella Scelta',
    segment: 'Beleza e autocuidado',
    category: 'ecommerce',
    cover: '/assets/portfolio/bellascelta.webp',
    url: 'https://www.bellasceltashop.com/',
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
    cover: '/assets/portfolio/portaoeletronico.webp',
    url: 'https://www.portaoeletronicomg.com/',
  },
  {
    title: 'ArcBus',
    segment: 'Ar-condicionado para ônibus',
    category: 'corporativo',
    cover: '/assets/portfolio/arcbus.webp',
    url: 'https://www.arcbus.com.br/',
  },
  {
    title: 'Hunter Sob Medida',
    segment: 'Gestão para marcenarias',
    category: 'corporativo',
    cover: '/assets/portfolio/huntersobmedida.webp',
    url: 'https://www.huntersobmedida.com.br/',
  },
  {
    title: 'Beatriz Benita',
    segment: 'Advocacia',
    category: 'juridico',
    cover: '/assets/portfolio/beatrizbenita.webp',
    url: 'https://www.beatrizbenita.adv.br/',
  },
  {
    title: 'Ferreira Advocacia',
    segment: 'Assessoria jurídica',
    category: 'juridico',
    cover: '/assets/portfolio/ferreiraadvocacia.webp',
    url: 'https://www.ferreiraadvocaciabrasil.com.br/',
  },
  {
    title: 'Bianca Jensen',
    segment: 'Nutrição',
    category: 'saude',
    cover: '/assets/portfolio/biancajensen.webp',
    url: 'https://www.biancajensennutri.com.br/',
  },
  {
    title: 'Academia Brasileira da Face',
    segment: 'Harmonização orofacial',
    category: 'saude',
    cover: '/assets/portfolio/academiaface.webp',
    url: 'https://poshof.academiabrasileiradaface.com.br/',
  },
  {
    title: 'Nupis',
    segment: 'Consultoria de comunicação',
    category: 'marketing',
    cover: '/assets/portfolio/nupis.webp',
    url: 'https://www.nupisdigital.com.br/',
  },
  {
    title: 'Jéssica Laia',
    segment: 'Psicologia',
    category: 'saude',
    cover: '/assets/portfolio/jessicalaia.webp',
    url: 'https://www.jessicalaia.com.br/',
  },
  {
    title: 'Dropping',
    segment: 'Venda sem estoque',
    category: 'ecommerce',
    cover: '/assets/portfolio/dropping.webp',
    url: 'https://www.dropping.com.br/',
  },
  {
    title: 'DML Logística',
    segment: 'Guincho e logística',
    category: 'corporativo',
    cover: '/assets/portfolio/dmlguincho.webp',
    url: 'https://www.dmlguinchoelogistica.com.br/',
  },
  {
    title: 'Ecossistema Aceleração 10x',
    segment: 'Recrutamento e treinamento',
    category: 'corporativo',
    cover: '/assets/portfolio/ecossistema10x.webp',
    url: 'https://www.ecossistemaaceleracao10x.com.br/',
  },
];
