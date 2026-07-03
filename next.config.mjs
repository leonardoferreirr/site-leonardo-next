import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Landing do CRM servida como página estática em /crm (public/crm/index.html).
  async rewrites() {
    return [{ source: '/crm', destination: '/crm/index.html' }];
  },
};

export default withNextIntl(nextConfig);
