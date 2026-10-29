import { getTranslations } from 'next-intl/server';
import { SITE, languageAlternates, routing, siteUrl } from '@/routing';
import React from 'react';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { CLIENTS } from '@/data/v2/clients';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('clients_title'),
    description: t('clients_description'),
    alternates: {
      canonical: siteUrl(locale, '/clientes'),
      languages: languageAlternates('/clientes'),
    },
    openGraph: {
      title: t('clients_title'),
      description: t('clients_description'),
      url: siteUrl(locale, '/clientes'),
    },
  };
}

// lista das marcas para buscadores e IAs: quem já contratou o Leonardo, em ordem alfabética
export default async function ClientesLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const nomes = CLIENTS.map((c) => c.name).sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base', ignorePunctuation: true }));

  return (
    <>
      <SchemaMarkup
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: t('clients_title'),
          description: t('clients_description'),
          url: siteUrl(locale, '/clientes'),
          inLanguage: locale,
          about: { '@id': `${SITE}/#leonardo` },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: nomes.length,
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            itemListElement: nomes.map((name, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: { '@type': 'Organization', name },
            })),
          },
        }}
      />
      {children}
    </>
  );
}
