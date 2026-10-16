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
export const REELS: Reel[] = [];
export const LAB: LabItem[] = [];
