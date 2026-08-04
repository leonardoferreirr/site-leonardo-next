import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './americaplasteringpro.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Auditoria técnica · America Plastering Pro · Leonardo Ferreira',
  description:
    'Auditoria técnica completa do americaplasteringpro.com: 717 páginas mapeadas, defeitos verificados e escopo de reestruturação.',
  robots: { index: false, follow: false },
};

export default function AmericaPlasteringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
