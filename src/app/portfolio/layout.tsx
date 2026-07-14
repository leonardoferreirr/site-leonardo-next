import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfólio de Webdesign · Leonardo Ferreira',
  description:
    'Sites e landing pages desenhados e desenvolvidos por Leonardo Ferreira. Projetos no ar em saúde, imóveis, finanças, eventos, e-commerce e mais.',
  alternates: { canonical: 'https://www.leonardoferreirr.com.br/portfolio' },
  openGraph: {
    title: 'Portfólio de Webdesign · Leonardo Ferreira',
    description:
      'Sites e landing pages desenhados e desenvolvidos por Leonardo Ferreira. Todos no ar, clicáveis.',
    url: 'https://www.leonardoferreirr.com.br/portfolio',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
