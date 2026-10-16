import localFont from 'next/font/local';

// Fontes guardadas no projeto (subconjunto latin, cobre pt/en/es). Antes vinham do next/font/google,
// que baixa do Google a cada build: na Vercel o download da Inter falhou duas vezes e derrubou o deploy.

export const poppins = localFont({
  src: [
    { path: './poppins-300.woff2', weight: '300', style: 'normal' },
    { path: './poppins-400.woff2', weight: '400', style: 'normal' },
    { path: './poppins-500.woff2', weight: '500', style: 'normal' },
    { path: './poppins-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

// mono não entra no preload: só aparece em detalhes e não pode disputar banda com o topo
export const mono = localFont({
  src: './jetbrains-mono-400.woff2',
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});
