import type { Metadata } from 'next';

// canonical própria: sem isto a página herdava a da home e o Google a tratava como cópia dela
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const p = await params;
  const path = `/privacidade`;
  return {
    alternates: {
      canonical: `https://www.leonardoferreirr.com.br/${p.locale}${path}`,
      languages: {
        pt: `https://www.leonardoferreirr.com.br/pt${path}`,
        en: `https://www.leonardoferreirr.com.br/en${path}`,
        es: `https://www.leonardoferreirr.com.br/es${path}`,
      },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
