import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware(routing);

// Com o português sem prefixo, o proxy precisa ver as páginas em português (/, /clientes...) para
// reescrevê-las por dentro para /pt. Lista só as páginas do app/[locale]: tudo o mais (propostas
// avulsas como /vilabotanica, /crm, /api, arquivos) passa direto sem ser tocado.
// Página nova dentro de app/[locale]? Acrescente o caminho aqui, senão ela dá 404 em português.
export const config = {
  matcher: [
    '/',
    '/(pt|en|es)/:path*',
    '/(clientes|orcamento|privacidade|blog)/:path*',
    '/projeto-:slug',
  ],
};
