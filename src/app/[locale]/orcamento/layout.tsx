import { getTranslations } from 'next-intl/server';
import { languageAlternates, routing, siteUrl } from '@/routing';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  if (!routing.locales.includes(locale as any)) {
    return {};
  }
  
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('orcamento_title'),
    description: t('orcamento_description'),
    alternates: {
      canonical: siteUrl(locale, '/orcamento'),
      languages: languageAlternates('/orcamento'),
    },
    openGraph: {
      title: t('orcamento_title'),
      description: t('orcamento_description'),
      url: siteUrl(locale, '/orcamento'),
    }
  };
}

export default function OrcamentoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
