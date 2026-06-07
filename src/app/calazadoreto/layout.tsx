import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './calazadoreto.css';

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
  title: 'Proposta · Calaza Doreto · Leonardo Ferreira',
  description: 'CRM de cobrança sob medida para Calaza Doreto. Entrega única ou acompanhamento recorrente.',
  robots: { index: false, follow: false },
};

export default function CalazaDoretoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
