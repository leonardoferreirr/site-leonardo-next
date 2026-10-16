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

// reels do perfil levam o nome dele (pedido de 16/10); os de marca (OLIPOP, Nike...) são análise, não projeto para a marca
const perfil = (pt: string, en: string, es: string) => ({ pt: `Reel do perfil: ${pt}`, en: `Profile reel: ${en}`, es: `Reel del perfil: ${es}` });
const disp = (pt: string, en: string, es: string) => ({ pt: `Corte de futebol: ${pt}`, en: `Football cut: ${en}`, es: `Corte de fútbol: ${es}` });

export const REELS: Reel[] = [
  { slug: 'p1-luiz', title: 'P1 Marketing', sub: { pt: 'Vídeo de portfólio para agência', en: 'Portfolio video for an agency', es: 'Video de portafolio para agencia' }, ...reel('p1-luiz') },
  { slug: 'reel-mg', title: 'Leonardo Ferreira', sub: perfil('criação de logo', 'logo design', 'creación de logo'), ...reel('reel-mg') },
  { slug: 'dispensados-azambuja', title: 'Dispensados', sub: disp('final da Libertadores', 'Libertadores final', 'final de la Libertadores'), ...reel('dispensados-azambuja') },
  { slug: 'reel-cr7', title: 'Leonardo Ferreira', sub: perfil('tráfego pago', 'paid ads', 'tráfico pago'), ...reel('reel-cr7') },
  { slug: 'dispensados-gaug', title: 'Dispensados', sub: disp('Barra FC', 'Barra FC', 'Barra FC'), ...reel('dispensados-gaug') },
  { slug: 'reel-olipop', title: 'Leonardo Ferreira', sub: perfil('análise da OLIPOP', 'OLIPOP breakdown', 'análisis de OLIPOP'), ...reel('reel-olipop') },
  { slug: 'dispensados-vasco', title: 'Dispensados', sub: disp('o ano do Vasco', 'Vasco’s year', 'el año del Vasco'), ...reel('dispensados-vasco') },
  { slug: 'reel-marimaria', title: 'Leonardo Ferreira', sub: perfil('Mari Maria x Larissa Manoela', 'Mari Maria x Larissa Manoela', 'Mari Maria x Larissa Manoela'), ...reel('reel-marimaria') },
  { slug: 'dispensados-neymar', title: 'Dispensados', sub: disp('Santos e Neymar', 'Santos and Neymar', 'Santos y Neymar'), ...reel('dispensados-neymar') },
  { slug: 'reel-timex', title: 'Leonardo Ferreira', sub: perfil('a copy da Timex', 'Timex copywriting', 'el copy de Timex'), ...reel('reel-timex') },
  { slug: 'dispensados-var', title: 'Dispensados', sub: disp('VAR e arbitragem', 'VAR and refereeing', 'VAR y arbitraje'), ...reel('dispensados-var') },
  { slug: 'reel-amazonia', title: 'Leonardo Ferreira', sub: perfil('análise de marca', 'brand breakdown', 'análisis de marca'), ...reel('reel-amazonia') },
  { slug: 'reel-nike', title: 'Leonardo Ferreira', sub: perfil('venda emocional', 'emotional selling', 'venta emocional'), ...reel('reel-nike') },
];


const lab = (slug: string) => ({ cover: `/assets/v2/lab/${slug}-cover.webp`, loop: `/assets/v2/lab/${slug}-loop.mp4` });

// só o Lab 3D (16/10): Prisma, Pixar e beija-flor saíram
export const LAB: LabItem[] = [
  { slug: 'lab-3d', title: 'Lab 3D', desc: { pt: '55 objetos 3D interativos, feitos em código', en: '55 interactive 3D objects, built in code', es: '55 objetos 3D interactivos, hechos en código' }, stack: 'Babylon.js + TypeScript', url: 'https://lab-3d.vercel.app/', ...lab('lab-3d') },
];
