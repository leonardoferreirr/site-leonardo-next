import { getTranslations } from 'next-intl/server';
import { languageAlternates, routing, siteUrl } from '@/routing';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  
  if (!routing.locales.includes(locale as any)) {
    return {};
  }
  
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = `${t('project_title_prefix')} | Leonardo Ferreira`;

  return {
    title: title,
    description: t('project_description'),
    alternates: {
      canonical: siteUrl(locale, `/${slug}`),
      languages: languageAlternates(`/${slug}`),
    },
    openGraph: {
      title: title,
      description: t('project_description'),
      url: siteUrl(locale, `/${slug}`),
    }
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
