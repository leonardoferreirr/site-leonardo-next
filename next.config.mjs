import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CSS embutido no HTML: a primeira pintura não espera mais 3 a 4 arquivos de CSS. No celular o
  // PageSpeed somava todo o JS e as imagens pedidas nessa espera ao tempo do texto do topo (LCP)
  experimental: {
    inlineCss: true,
  },
  // Landing do CRM servida como página estática em /crm (public/crm/index.html).
  async rewrites() {
    return [{ source: '/crm', destination: '/crm/index.html' }];
  },
};

export default withNextIntl(nextConfig);
