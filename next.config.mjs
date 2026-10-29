import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CSS embutido no HTML: a primeira pintura não espera mais 3 a 4 arquivos de CSS. No celular o
  // PageSpeed somava todo o JS e as imagens pedidas nessa espera ao tempo do texto do topo (LCP)
  experimental: {
    inlineCss: true,
  },
  // /portfolio saiu do ar em 17/10/2026: o portfólio agora vive na home. 301 para a seção de sites,
  // porque o link antigo está nos e-mails frios já enviados
  async redirects() {
    return [
      { source: '/portfolio', destination: '/#sites', permanent: true },
      { source: '/portfolio/:path*', destination: '/#sites', permanent: true },
      // português perdeu o /pt (29/10/2026): link antigo vai para o endereço sem prefixo
      { source: '/pt', destination: '/', permanent: true },
      { source: '/pt/:path*', destination: '/:path*', permanent: true },
    ];
  },
  // Landing do CRM servida como página estática em /crm (public/crm/index.html).
  async rewrites() {
    return [{ source: '/crm', destination: '/crm/index.html' }];
  },
};

export default withNextIntl(nextConfig);
