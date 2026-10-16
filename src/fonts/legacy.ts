import localFont from 'next/font/local';

// Fontes das páginas antigas de proposta (/formulariodebranding, /calazadoreto, /betomachado,
// /americaplasteringpro). Arquivo separado e sem preload: no Turbopack o preload de uma fonte
// declarada aqui vazava para a home e disputava banda com o topo.

export const inter = localFont({
  src: './inter-latin-var.woff2',
  weight: '300 800',
  variable: '--font-sans',
  display: 'swap',
  preload: false,
});

export const instrumentSerif = localFont({
  src: [
    { path: './instrument-serif-400.woff2', weight: '400', style: 'normal' },
    { path: './instrument-serif-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
});
