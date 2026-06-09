import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './betomachado.css';

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
  title: 'Proposta · Beto Machado · Leonardo Ferreira',
  description: 'Identidade visual para Beto Machado Ateliê de Música e Beto Machado Cartório e Afeto.',
  robots: { index: false, follow: false },
};

export default function BetoMachadoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
