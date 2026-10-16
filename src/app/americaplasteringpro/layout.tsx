import type { Metadata } from 'next';
import { inter } from '@/fonts/legacy';
import './americaplasteringpro.css';

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
