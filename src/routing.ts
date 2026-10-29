import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// português sem prefixo (leonardoferreirr.com.br/clientes), inglês e espanhol com /en e /es (29/10/2026):
// 90% dos clientes são brasileiros e o link compartilhado tem que abrir direto em português.
// localeDetection desligado: a raiz é sempre português, mesmo com o navegador em outro idioma.
export const routing = defineRouting({
  locales: ['pt', 'en', 'es'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  localeDetection: false,
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const SITE = 'https://www.leonardoferreirr.com.br';

// endereço público de uma página em um idioma: português sem prefixo
export function siteUrl(locale: string, path = '') {
  return `${SITE}${locale === routing.defaultLocale ? '' : `/${locale}`}${path}`;
}

// hreflang de uma página nos três idiomas (x-default = português)
export function languageAlternates(path = '') {
  return {
    pt: siteUrl('pt', path),
    en: siteUrl('en', path),
    es: siteUrl('es', path),
    'x-default': siteUrl('pt', path),
  };
}
