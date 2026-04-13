import type { MetadataRoute } from 'next';

const locales = ['pt', 'en', 'es'];
const baseUrl = 'https://www.leonardoferreirr.com.br';

const staticRoutes = ['/', '/orcamento'];

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
      // In next-intl default config without prefix default router, usually /pt is prefixed or not.
      // But we will be safe and provide the fully qualified locale prefix routes since the user has multiple regions
      const pathSuffix = route === '/' ? `/${locale}` : `/${locale}${route}`;
      entries.push({
        url: `${baseUrl}${pathSuffix}`,
        lastModified: new Date(),
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
        priority: route === '/' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${route === '/' ? '' : route}`])
          ),
        },
      });
    }

    // Generate project dynamic routes
    for (const slug of projectSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
