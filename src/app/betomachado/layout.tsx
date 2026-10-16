import type { Metadata } from 'next';
import { inter, instrumentSerif } from '@/fonts/legacy';
import './betomachado.css';

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
