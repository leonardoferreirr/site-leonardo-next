import type { Metadata } from 'next';
import { poppins, mono } from '@/fonts/site';
import './vilabotanica.css';

// proposta no visual novo do site (preto, Poppins sem itálico, mono nos detalhes), não no das propostas antigas
export const metadata: Metadata = {
  title: 'Proposta · Vila Botânica · Leonardo Ferreira',
  description: 'Proposta de identidade visual e branding para o Vila Botânica Eco Resort.',
  robots: { index: false, follow: false },
};

export default function VilaBotanicaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* esconde os blocos que entram no scroll só quando o JS existe; sem ele a página fica inteira */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('vb-js');setTimeout(function(){if(!window.__vb)document.documentElement.classList.add('vb-sem')},3500)",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
