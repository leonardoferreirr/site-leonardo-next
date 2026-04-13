export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: BlogSection[];
}

export interface BlogSection {
  type: 'intro' | 'h2' | 'h3' | 'p' | 'ul' | 'quote' | 'hr' | 'cta';
  text?: string;
  items?: string[];
  href?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'o-que-e-identidade-visual',
    title: 'O que é identidade visual? Diferença entre logo, marca e branding',
    description:
      'Entenda de vez o que é identidade visual, como ela se diferencia do logotipo, da marca e do branding — e por que sua empresa precisa de um sistema visual completo.',
    date: '2025-06-01',
    dateModified: '2025-06-01',
    author: 'Leonardo Ferreira',
    category: 'Identidade Visual',
    tags: ['identidade visual', 'logotipo', 'branding', 'marca', 'design estratégico'],
    readingTime: '8 min',
    content: [
      {
        type: 'intro',
        text: 'Identidade visual é o conjunto de elementos gráficos que representam uma empresa de forma consistente em todos os seus pontos de contato: logotipo, paleta de cores, tipografia, grafismos e padrões visuais. É o que faz uma marca ser reconhecida de imediato — antes mesmo de qualquer pessoa ler o nome da empresa.',
      },
      {
        type: 'p',
        text: 'Se você já confundiu os termos logotipo, marca, identidade visual e branding, não está sozinho. Esses conceitos são usados de forma intercambiável no dia a dia, mas têm significados bem diferentes — e entender essa diferença é o primeiro passo para tomar decisões estratégicas sobre a comunicação visual da sua empresa.',
      },
      { type: 'hr' },
      { type: 'h2', text: 'O que é um logotipo?' },
      {
        type: 'p',
        text: 'O logotipo é o elemento gráfico central que representa uma marca: pode ser um símbolo, uma tipografia estilizada, uma combinação dos dois, ou apenas as iniciais da empresa. É a "assinatura visual" do negócio.',
      },
      {
        type: 'p',
        text: 'Exemplos que todo mundo reconhece: a maçã da Apple, o símbolo da Nike, as letras douradas do McDonald\'s. Cada um desses é um logotipo — mas nenhum deles, sozinho, é a identidade visual completa dessas empresas.',
      },
      {
        type: 'p',
        text: 'O logotipo é apenas uma peça do sistema. Sem as cores, as fontes e os grafismos que o acompanham, ele perde força e consistência.',
      },
      { type: 'hr' },
      { type: 'h2', text: 'O que é identidade visual?' },
      {
        type: 'p',
        text: 'Identidade visual é o sistema completo que dá vida à marca. Ela expande o logotipo e define como todos os elementos visuais se comportam juntos — em um cartão de visita, em um post de Instagram, em um site, em uma embalagem ou em um uniforme.',
      },
      {
        type: 'p',
        text: 'Uma identidade visual profissional é composta por:',
      },
      {
        type: 'ul',
        items: [
          'Logotipo — em todas as suas versões (colorido, monocromático, negativo, horizontal, vertical)',
          'Paleta de cores — com códigos técnicos para uso digital (RGB e HEX) e impresso (CMYK e Pantone)',
          'Tipografia — fontes primárias e secundárias com hierarquia definida',
          'Grafismos e padrões — elementos de apoio que dão personalidade à comunicação',
          'Brandbook — o manual que documenta todas as regras de uso',
        ],
      },
      {
        type: 'quote',
        text: 'Empresas com identidade visual consistente são percebidas como até 3,5 vezes mais confiáveis do que empresas com comunicação visual despadronizada.',
      },
      { type: 'hr' },
      { type: 'h2', text: 'O que é marca?' },
      {
        type: 'p',
        text: 'Marca vai além do visual. Ela é a percepção que as pessoas têm de uma empresa — a soma de todas as experiências, emoções e associações que surgem quando alguém pensa no seu negócio.',
      },
      {
        type: 'p',
        text: 'A marca existe na mente do consumidor. Ela é construída ao longo do tempo por meio de como a empresa se comunica, como ela trata seus clientes, o que ela entrega de valor e como ela se apresenta visualmente.',
      },
      {
        type: 'p',
        text: 'A identidade visual é a expressão gráfica da marca. Ela não cria a marca — ela comunica o que a marca já é.',
      },
      { type: 'hr' },
      { type: 'h2', text: 'O que é branding?' },
      {
        type: 'p',
        text: 'Branding é o processo estratégico de construir e gerenciar a marca. É a atividade que envolve pesquisa de mercado, definição de posicionamento, criação de narrativa, desenvolvimento da identidade visual e gestão contínua de como a marca se apresenta ao mundo.',
      },
      {
        type: 'ul',
        items: [
          'Branding é o processo → o que você faz para construir a marca',
          'Marca é o resultado → o que as pessoas percebem e sentem',
          'Identidade visual é a ferramenta → como a marca se apresenta graficamente',
          'Logotipo é um elemento → a assinatura visual dentro do sistema',
        ],
      },
      { type: 'hr' },
      { type: 'h2', text: 'Por que sua empresa precisa de uma identidade visual profissional?' },
      {
        type: 'p',
        text: 'Independentemente do tamanho do negócio, a identidade visual cumpre funções estratégicas:',
      },
      {
        type: 'ul',
        items: [
          'Credibilidade imediata — 75% das pessoas julgam a credibilidade de uma empresa com base no design visual',
          'Reconhecimento consistente — o cérebro associa padrões visuais à empresa automaticamente',
          'Diferenciação no mercado — o visual é o primeiro critério de seleção em mercados competitivos',
          'Economia a longo prazo — materiais futuros ficam mais rápidos, baratos e consistentes',
        ],
      },
      { type: 'hr' },
      { type: 'h2', text: 'Conclusão' },
      {
        type: 'p',
        text: 'Logotipo, identidade visual, marca e branding são conceitos distintos que se complementam. O logotipo é o ponto de partida — mas é a identidade visual completa que garante consistência, e o branding que garante relevância ao longo do tempo.',
      },
      {
        type: 'p',
        text: 'Se você está começando um negócio ou percebeu que o visual da sua empresa não comunica mais quem ela é, o primeiro passo é investir em um sistema visual bem construído — não apenas em um logo isolado.',
      },
      {
        type: 'cta',
        text: 'Quer criar ou reformular a identidade visual da sua empresa? Solicite uma proposta.',
        href: '/orcamento',
      },
    ],
  },
];
