// social, vídeo e lab: preenchido com os arquivos de public/assets/v2/{social,video,lab}
import type { L } from './catalog';

// tall = capa 9:16 (vídeo); o resto é post 4:5
export type SocialBrand = { slug: string; title: string; featured?: boolean; tall?: boolean; posts: string[] };

export type Reel = {
  slug: string;
  title: string;
  sub: L;
  poster: string;
  loop: string;
  full: string;
  wide?: boolean;
};

export type LabItem = {
  slug: string;
  title: string;
  desc: L;
  stack: string;
  cover: string;
  loop?: string;
  url?: string;
};

export const SOCIAL: SocialBrand[] = [
  { slug: 'buenas-taqueria', title: 'Buenas Taquería', featured: true, posts: [1, 2, 3].map((n) => `/assets/v2/social/buenas-taqueria-${n}.webp`) },
  { slug: 'nalu-poke', title: 'Nalu Poke', featured: true, posts: [1, 2, 3].map((n) => `/assets/v2/social/nalu-poke-${n}.webp`) },
  { slug: 'beef-n-cheese', title: 'Beef N\' Cheese', featured: true, posts: [1, 2, 3].map((n) => `/assets/v2/social/beef-n-cheese-${n}.webp`) },
  { slug: 'yuri-reis', title: 'Yuri Reis', posts: [1, 2, 3].map((n) => `/assets/v2/social/yuri-reis-${n}.webp`) },
  { slug: 'amme-arquitetura', title: 'Âmme Arquitetura', posts: [1, 2, 3].map((n) => `/assets/v2/social/amme-arquitetura-${n}.webp`) },
  { slug: 'nook-workplace', title: 'Nook Workplace', posts: [1, 2, 3].map((n) => `/assets/v2/social/nook-workplace-${n}.webp`) },
  { slug: 'fisio-neurogeronto', title: 'Fisio NeuroGeronto', posts: [1, 2, 3].map((n) => `/assets/v2/social/fisio-neurogeronto-${n}.webp`) },
  { slug: 'gabriel-carneiro', title: 'Gabriel Carneiro', posts: [1, 2, 3].map((n) => `/assets/v2/social/gabriel-carneiro-${n}.webp`) },
  { slug: 'rax-seguros', title: 'RAX Seguros', posts: [1, 2, 3].map((n) => `/assets/v2/social/rax-seguros-${n}.webp`) },
  { slug: 'easy-social', title: 'Easy Social', posts: [1, 2, 3].map((n) => `/assets/v2/social/easy-social-${n}.webp`) },
  { slug: 'whiskr', title: 'Whiskr', posts: [1, 2, 3].map((n) => `/assets/v2/social/whiskr-${n}.webp`) },
  { slug: 'forset', title: 'Forset', posts: [1, 2, 3].map((n) => `/assets/v2/social/forset-${n}.webp`) },
  { slug: 'carteira-360', title: 'Carteira 360º', posts: [1, 2, 3].map((n) => `/assets/v2/social/carteira-360-${n}.webp`) },
  { slug: 'dispensados', title: 'Dispensados', tall: true, posts: [1, 2, 3].map((n) => `/assets/v2/social/dispensados-${n}.webp`) },
  { slug: 'p1-marketing', title: 'P1 Marketing', posts: [1, 2, 3].map((n) => `/assets/v2/social/p1-marketing-${n}.webp`) },
  { slug: 'digital-tk', title: 'Digital TK', posts: [1, 2, 3].map((n) => `/assets/v2/social/digital-tk-${n}.webp`) },
  { slug: 'donna-personalizados', title: 'Donna Personalizados', posts: [1, 2, 3].map((n) => `/assets/v2/social/donna-personalizados-${n}.webp`) },
];
const reel = (slug: string) => ({
  poster: `/assets/v2/video/${slug}-poster.webp`,
  loop: `/assets/v2/video/${slug}-loop.mp4`,
  full: `/assets/v2/video/${slug}-full.mp4`,
});

// reels de marca (OLIPOP, Nike, Amazônia) são conteúdo do perfil dele, não projeto para a marca
export const REELS: Reel[] = [
  { slug: 'p1-luiz', title: 'P1 Marketing', sub: { pt: 'Vídeo de portfólio para agência', en: 'Portfolio video for an agency', es: 'Video de portafolio para agencia' }, ...reel('p1-luiz') },
  { slug: 'dispensados-azambuja', title: 'Dispensados', sub: { pt: 'Corte de futebol: final da Libertadores', en: 'Football cut: Libertadores final', es: 'Corte de fútbol: final de la Libertadores' }, ...reel('dispensados-azambuja') },
  { slug: 'dispensados-gaug', title: 'Dispensados', sub: { pt: 'Corte de futebol: Barra FC', en: 'Football cut: Barra FC', es: 'Corte de fútbol: Barra FC' }, ...reel('dispensados-gaug') },
  { slug: 'reel-mg', title: 'MG Pães de Queijo', sub: { pt: 'Reel do perfil: marca criada do zero', en: 'Profile reel: a brand built from scratch', es: 'Reel del perfil: marca creada desde cero' }, ...reel('reel-mg') },
  { slug: 'reel-olipop', title: 'OLIPOP', sub: { pt: 'Reel do perfil: análise de marca', en: 'Profile reel: brand breakdown', es: 'Reel del perfil: análisis de marca' }, ...reel('reel-olipop') },
  { slug: 'reel-amazonia', title: 'Amazônia', sub: { pt: 'Reel do perfil: análise de marca', en: 'Profile reel: brand breakdown', es: 'Reel del perfil: análisis de marca' }, ...reel('reel-amazonia') },
  { slug: 'reel-nike', title: 'Venda emocional', sub: { pt: 'Reel do perfil: Nike, Apple e McDonald’s', en: 'Profile reel: Nike, Apple and McDonald’s', es: 'Reel del perfil: Nike, Apple y McDonald’s' }, ...reel('reel-nike') },
];

const lab = (slug: string) => ({ cover: `/assets/v2/lab/${slug}-cover.webp`, loop: `/assets/v2/lab/${slug}-loop.mp4` });

export const LAB: LabItem[] = [
  { slug: 'lab-3d', title: 'Lab 3D', desc: { pt: '55 objetos 3D interativos, feitos em código', en: '55 interactive 3D objects, built in code', es: '55 objetos 3D interactivos, hechos en código' }, stack: 'Babylon.js + TypeScript', url: 'https://lab-3d.vercel.app/', ...lab('lab-3d') },
  { slug: 'prisma', title: 'Prisma', desc: { pt: 'Cristal 3D guiado pela rolagem', en: 'A 3D crystal driven by scroll', es: 'Cristal 3D guiado por el scroll' }, stack: 'Babylon.js + GSAP', url: 'https://blenderprisma.vercel.app/', ...lab('prisma') },
  { slug: 'beija-flor', title: 'Beija-flor 3D', desc: { pt: 'Modelo 3D realista na página. Modelo por LasquetiSpice, CC BY 4.0', en: 'A realistic 3D model on the page. Model by LasquetiSpice, CC BY 4.0', es: 'Modelo 3D realista en la página. Modelo de LasquetiSpice, CC BY 4.0' }, stack: 'WebGL', ...lab('beija-flor') },
  { slug: 'pixar-popup', title: 'Pixar Pop-up Book', desc: { pt: 'Portfólio ilustrado de 6 filmes', en: 'An illustrated portfolio of 6 films', es: 'Portafolio ilustrado de 6 películas' }, stack: 'Illustrator + Photoshop', ...lab('pixar-popup') },
];
