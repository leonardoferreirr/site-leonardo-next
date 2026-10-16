import type { Metadata } from 'next';
import { inter, instrumentSerif } from '@/fonts/legacy';
import './calazadoreto.css';

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
