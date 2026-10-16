import type { Metadata } from 'next';
import { inter, instrumentSerif } from '@/fonts/legacy';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Formulário de Branding · Leonardo Ferreira',
  description: 'Briefing inicial para o projeto de identidade visual da sua marca.',
  robots: { index: false, follow: false },
};

export default function FormularioDeBrandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
