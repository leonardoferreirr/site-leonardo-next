import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './americaplasteringpro.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  // sem preload: no build do Turbopack a Inter vazava para o preload da home nova (48 KB no caminho do LCP)
  preload: false,
});

export const metadata: Metadata = {
  title: 'America Plastering Pro · auditoria técnica',
  description:
    'Mapa técnico e escopo de reestruturação do americaplasteringpro.com: 717 páginas inventariadas e defeitos verificados em produção.',
  robots: { index: false, follow: false },
};

export default function AmericaPlasteringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
