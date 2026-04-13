import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
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
      canonical: `https://www.leonardoferreirr.com.br/${locale === 'pt' ? 'orcamento' : `${locale}/orcamento`}`,
      languages: {
        'pt': 'https://www.leonardoferreirr.com.br/orcamento',
        'en': 'https://www.leonardoferreirr.com.br/en/orcamento',
        'es': 'https://www.leonardoferreirr.com.br/es/orcamento',
      },
    },
    openGraph: {
      title: t('orcamento_title'),
      description: t('orcamento_description'),
      url: `https://www.leonardoferreirr.com.br/${locale === 'pt' ? 'orcamento' : `${locale}/orcamento`}`,
    }
  };
}

export default function OrcamentoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
