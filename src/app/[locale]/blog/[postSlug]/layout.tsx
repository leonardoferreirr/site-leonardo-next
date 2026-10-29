import { languageAlternates, siteUrl } from '@/routing';
import type { Metadata } from 'next';

// canonical própria: sem isto a página herdava a da home e o Google a tratava como cópia dela
export async function generateMetadata({ params }: { params: Promise<{ locale: string; postSlug: string }> }): Promise<Metadata> {
  const p = await params;
  const path = `/blog/${p.postSlug}`;
  return {
    alternates: {
      canonical: siteUrl(p.locale, path),
      languages: languageAlternates(path),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
