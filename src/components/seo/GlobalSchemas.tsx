// Schemas globais (entram no <head> de todas as páginas pelo app/[locale]/layout.tsx).
// Posicionamento de out/2026: sites, sistemas, identidade visual, social, vídeo e tráfego.
// Contato só pelo WhatsApp (pedido de 19/10), por isso não há e-mail aqui.

import SchemaMarkup from './SchemaMarkup';
import { SERVICES } from '@/data/v2/catalog';

const BASE = 'https://www.leonardoferreirr.com.br';
const WHATSAPP = '+55 34 93618-0691';

export default function GlobalSchemas() {
  const grafo = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${BASE}/#leonardo`,
        name: 'Leonardo Ferreira',
        jobTitle: 'Designer e desenvolvedor de sites e sistemas',
        description:
          'Leonardo Ferreira faz sites, sistemas sob medida, identidade visual, social media e vídeo para empresas que querem parecer grandes desde o primeiro contato.',
        url: `${BASE}/`,
        image: `${BASE}/assets/profile.png`,
        telephone: WHATSAPP,
        nationality: { '@type': 'Country', name: 'Brasil' },
        knowsAbout: [
          'Sites e landing pages',
          'Sistemas sob medida e CRM',
          'Identidade visual e branding',
          'Social media',
          'Edição de vídeo',
          'Tráfego pago (Meta Ads e Google Ads)',
          'Next.js',
          'React',
        ],
        worksFor: { '@id': `${BASE}/#negocio` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE}/#negocio`,
        name: 'Leonardo Ferreira',
        url: BASE,
        logo: `${BASE}/assets/v2/logo-caricatura.webp`,
        image: `${BASE}/assets/profile.png`,
        description:
          'Sites, sistemas sob medida, identidade visual, social media, vídeo e tráfego pago, do rascunho ao ar, em português, inglês e espanhol.',
        telephone: WHATSAPP,
        address: { '@type': 'PostalAddress', addressCountry: 'BR' },
        areaServed: ['BR', 'US', 'ES'],
        founder: { '@id': `${BASE}/#leonardo` },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: WHATSAPP,
          url: 'https://wa.me/5534936180691',
          availableLanguage: ['pt-BR', 'en', 'es'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Serviços',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title.pt, description: s.desc.pt },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#site`,
        name: 'Leonardo Ferreira',
        url: BASE,
        inLanguage: ['pt-BR', 'en', 'es'],
        publisher: { '@id': `${BASE}/#negocio` },
      },
    ],
  };

  return <SchemaMarkup schema={grafo} />;
}
