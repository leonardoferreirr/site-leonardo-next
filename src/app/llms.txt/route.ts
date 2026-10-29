// llms.txt montado a partir do catálogo do site: quando entra um site, sistema, case ou cliente
// novo no catalog.ts ou no clients.ts, o resumo para as IAs acompanha sem ninguém lembrar.
import { AGENCY, BRANDS, KIND_LABEL, SERVICES, SITES, SYSTEMS } from '@/data/v2/catalog';
import { CLIENTS } from '@/data/v2/clients';
import { SITE as BASE, siteUrl } from '@/routing';

export const dynamic = 'force-static';


export function GET() {
  const sites = SITES.filter((s) => s.url && s.kind !== 'conceito');
  const conceitos = SITES.filter((s) => s.url && s.kind === 'conceito');
  const sistemas = [AGENCY, ...SYSTEMS.filter((s) => !s.hidden)];
  const clientes = CLIENTS.map((c) => c.name).sort((a, b) => a.localeCompare(b, 'pt', { sensitivity: 'base', ignorePunctuation: true }));

  const l: string[] = [
    '# Leonardo Ferreira',
    '',
    '> Designer e desenvolvedor brasileiro. Faz sites, sistemas sob medida, identidade visual, social media, vídeo e tráfego pago para empresas que querem parecer grandes desde o primeiro contato. Atende em português, inglês e espanhol, no Brasil e fora dele. Contato só pelo WhatsApp: +55 34 93618-0691 (https://wa.me/5534936180691).',
    '',
    `Site: ${BASE} (em inglês ${siteUrl('en')} e em espanhol ${siteUrl('es')})`,
    '',
    '## Serviços',
    '',
    ...SERVICES.map((s) => `- **${s.title.pt}:** ${s.desc.pt} Ferramentas: ${s.tools}.`),
    '',
    `## Marcas que confiam no trabalho dele (${clientes.length})`,
    '',
    `Lista completa com as logos: ${siteUrl('pt', '/clientes')}`,
    '',
    clientes.join(', ') + '.',
    '',
    '## Sites no ar',
    '',
    ...sites.map((s) => `- [${s.title}](${s.url}): ${s.segment.pt}, ${KIND_LABEL[s.kind].pt.toLowerCase()}, feito em ${s.stack}.`),
    '',
    '## Conceitos (projetos autorais, sem contrato com a marca)',
    '',
    ...conceitos.map((s) => `- [${s.title}](${s.url}): ${s.segment.pt}, feito em ${s.stack}.`),
    '',
    '## Sistemas sob medida',
    '',
    'Os sistemas aparecem no site sem o nome do cliente e com dados fictícios.',
    '',
    ...sistemas.map((s) => `- **${s.name.pt}${s.soon ? ' (em breve)' : ''}:** ${s.desc.pt} Feito em ${s.stack}.`),
    '',
    '## Cases de identidade visual',
    '',
    ...BRANDS.map((b) => `- [${b.title}](${siteUrl('pt', b.href ?? '')}): ${b.segment.pt}.`),
    '',
    '## Contato',
    '',
    '- WhatsApp: +55 34 93618-0691 (https://wa.me/5534936180691)',
    `- Atualizado em ${new Date().toISOString().slice(0, 10)}.`,
    '',
  ];

  return new Response(l.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
