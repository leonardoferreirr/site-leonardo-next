import type { MetadataRoute } from 'next';
import { languageAlternates, siteUrl } from '@/routing';

const locales = ['pt', 'en', 'es'];

const staticRoutes = ['/', '/clientes', '/orcamento'];

const projectSlugs = [
  'projeto-mademax',
  'projeto-biothera',
  'projeto-divinocar',
  'projeto-proconsult',
  'projeto-hellobim',
  'projeto-raxseguros',
  'projeto-polysantos',
  'projeto-ecomove',
  'projeto-remachcapital',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home and static routes
  for (const locale of locales) {
    // Generate static routes
    for (const route of staticRoutes) {
      // português sem prefixo, inglês e espanhol com /en e /es (src/routing.ts)
      const path = route === '/' ? '' : route;
      entries.push({
        url: siteUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
        priority: route === '/' ? 1.0 : 0.8,
        alternates: { languages: languageAlternates(path) },
      });
    }

    // Generate project dynamic routes
    for (const slug of projectSlugs) {
      entries.push({
        url: siteUrl(locale, `/${slug}`),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages: languageAlternates(`/${slug}`) },
      });
    }
  }

  return entries;
}
