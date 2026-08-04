'use client';

import { useEffect, useRef } from 'react';

/* ---------- janela de UI ---------- */
function Janela({
  titulo,
  children,
  className = '',
}: {
  titulo: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`ap-win ${className}`}>
      <div className="ap-win__bar">
        <span className="ap-win__dot ap-win__dot--r" />
        <span className="ap-win__dot ap-win__dot--y" />
        <span className="ap-win__dot ap-win__dot--g" />
        <span className="ap-win__title">{titulo}</span>
      </div>
      <div className="ap-win__body">{children}</div>
    </div>
  );
}

function Linha({
  titulo,
  sub,
  valor,
  pill,
}: {
  titulo: string;
  sub?: string;
  valor?: string;
  pill?: { texto: string; tom: 'crit' | 'alto' | 'medio' | 'ok' };
}) {
  return (
    <div className="ap-row">
      <div className="ap-row__l">
        <span className="ap-row__t">{titulo}</span>
        {sub && <span className="ap-row__s">{sub}</span>}
      </div>
      {pill ? (
        <span className={`ap-pill ap-pill--${pill.tom}`}>{pill.texto}</span>
      ) : (
        <span className="ap-row__v">{valor}</span>
      )}
    </div>
  );
}

const ACHADOS: {
  tom: 'crit' | 'alto' | 'medio';
  sev: string;
  titulo: string;
  texto: string;
  ev?: React.ReactNode;
}[] = [
  {
    tom: 'crit',
    sev: 'Crítico',
    titulo: 'O telefone exibido não é o telefone que disca',
    texto:
      'Em todos os botões de telefone conferidos, o número que aparece na tela é (781) 818-5107 e o número no atributo href é +1 781-851-6385. São números diferentes. No celular, o toque no botão inicia a chamada para o segundo. O título que aparece no resultado de busca das páginas de cidade traz o primeiro.',
    ev: (
      <>
        {'<a href="tel:'}
        <b>+17818516385</b>
        {'" aria-label="'}
        <b>(781) 818-5107</b>
        {'">'}
        <b>(781) 818-5107</b>
        {'</a>'}
      </>
    ),
  },
  {
    tom: 'alto',
    sev: 'Alto',
    titulo: 'As 695 páginas de cidade não declaram dados estruturados de negócio local',
    texto:
      'Apenas a home declara dados estruturados, do tipo Organization. Nenhuma página de cidade declara LocalBusiness, Service ou área atendida. É a camada usada pelos buscadores para associar serviço e localidade.',
  },
  {
    tom: 'alto',
    sev: 'Alto',
    titulo: 'Sete páginas publicadas estão fora de todas as sitemaps',
    texto:
      'Respondem 200 e constam no menu principal, mas não aparecem em nenhuma das oito sitemaps do domínio: /about-us/, /portfolio/ e as quatro filhas de drywall (installation, finishing, remodeling e home-additions).',
  },
  {
    tom: 'alto',
    sev: 'Alto',
    titulo: '400 URLs aparecem em duas sitemaps simultaneamente',
    texto:
      'O índice declara 1.111 entradas para 711 endereços únicos. A paginação das sitemaps repete o mesmo bloco de URLs, o que duplica o rastreamento e distorce os relatórios do Search Console.',
  },
  {
    tom: 'medio',
    sev: 'Médio',
    titulo: 'Requisição a endpoint externo retorna 401 em toda visita',
    texto:
      'Cada carregamento de página dispara uma chamada a um endpoint de rastreamento que responde 401. A integração está presente em todas as páginas e não completa.',
    ev: <>401 · luulxhajwrxnthjutibc.supabase.co/rest/v1/public_tracking_configs</>,
  },
  {
    tom: 'medio',
    sev: 'Médio',
    titulo: 'Nenhuma imagem usa carregamento adiado',
    texto:
      'Nenhuma imagem declara loading="lazy". As páginas medidas transferem de 1,0 a 2,2 MB em 93 a 111 requisições.',
  },
  {
    tom: 'medio',
    sev: 'Médio',
    titulo: 'Alvos de toque abaixo do mínimo recomendado',
    texto:
      'Em viewport de 390 px, 25 dos 49 links e botões da home ficam abaixo de 40 px de altura ou largura. O menor texto corrido é 12 px. Não há rolagem horizontal e o layout responde corretamente.',
  },
  {
    tom: 'medio',
    sev: 'Menor',
    titulo: 'A mesma URL responde com e sem barra final',
    texto:
      '/contact e /contact/ retornam 200 com HTML idêntico, sem redirecionamento entre as duas formas. A canonical aponta para a versão com barra, o que contém o risco de indexação duplicada.',
  },
];

const PACOTES = [
  {
    t: 'Arquitetura e modelo de conteúdo',
    n: '10 a 16 h',
    d: 'Mapa das 717 rotas, modelo de dados de cidade e serviço, plano de redirecionamento preservando o que está indexado.',
  },
  {
    t: 'Sistema visual e nove layouts',
    n: '55 a 80 h',
    d: 'Home, sobre, portfólio, contato, hub de serviço, filha de serviço, página de cidade, índice e artigo do blog.',
  },
  {
    t: 'Motor das páginas de cidade',
    n: '18 a 28 h',
    d: 'Template que cruza 6 serviços com 121 cidades a partir de uma tabela, com variação de conteúdo, links entre cidades vizinhas e dados estruturados por página.',
  },
  {
    t: 'Formulário e integração',
    n: '10 a 16 h',
    d: 'Formulário reconstruído mantendo o envio para o GoHighLevel, antispam, validação e confirmação.',
  },
  {
    t: 'Migração de SEO',
    n: '14 a 22 h',
    d: 'Redirecionamentos, canonicals, sitemaps corrigidas, dados estruturados de negócio local nas 695 páginas, títulos e descrições por template.',
  },
  {
    t: 'Correção dos defeitos desta auditoria',
    n: '6 a 10 h',
    d: 'Telefone, integração com retorno 401, carregamento adiado de imagens, alvos de toque e barra final.',
  },
  {
    t: 'Performance, testes e publicação',
    n: '14 a 22 h',
    d: 'Peso de imagem, número de requisições, testes em viewports reais, verificação de rastreamento e virada em produção.',
  },
];

export default function AmericaPlasteringPro() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle('solid', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.ap-rv').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <main className="ap-page">
      <nav className="ap-nav" ref={navRef}>
        <div className="ap-nav__mark">
          <b>America Plastering Pro</b>
          <span>· auditoria técnica</span>
        </div>
      </nav>

      {/* ================= ABERTURA ================= */}
      <header className="ap-hero">
        <div className="ap-wrap ap-hero__grid">
          <div className="ap-hero__col ap-rv">
            <span className="ap-eyebrow">Mapa técnico e escopo</span>
            <h1 className="ap-h1">americaplasteringpro.com</h1>
            <p className="ap-lead">
              Levantamento de páginas, redirecionamentos, formulários e defeitos, feito por leitura
              integral das sitemaps do domínio e renderização das páginas em navegador. Base para
              dimensionar a reestruturação.
            </p>
            <p className="ap-note">
              WordPress com Elementor Pro · servidor LiteSpeed · Massachusetts, Estados Unidos
            </p>
          </div>

          <div className="ap-rv ap-rv-d1">
            <Janela titulo="americaplasteringpro.com · botão de telefone">
              <div className="ap-win__code">
                {'<a href="tel:'}
                <b>+17818516385</b>
                {'"\n   aria-label="'}
                <i>(781) 818-5107</i>
                {'">\n  '}
                <i>(781) 818-5107</i>
                {'\n</a>'}
              </div>
              <Linha titulo="Número exibido na tela" valor="(781) 818-5107" />
              <Linha titulo="Número no atributo href" valor="+1 781-851-6385" />
              <Linha
                titulo="Páginas conferidas"
                sub="todas com a mesma divergência"
                pill={{ texto: '14 de 14', tom: 'crit' }}
              />
            </Janela>
          </div>
        </div>
      </header>

      {/* ================= NÚMEROS ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap">
          <div className="ap-stats ap-rv">
            <div className="ap-stat">
              <b>717</b>
              <span>páginas publicadas</span>
            </div>
            <div className="ap-stat">
              <b>695</b>
              <span>geradas por template</span>
            </div>
            <div className="ap-stat">
              <b>9</b>
              <span>layouts distintos</span>
            </div>
            <div className="ap-stat">
              <b>121</b>
              <span>cidades atendidas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ESTRUTURA ================= */}
      <section className="ap-section">
        <div className="ap-wrap ap-split">
          <div className="ap-split__txt ap-rv">
            <h2 className="ap-h2">Estrutura das 717 páginas</h2>
            <p className="ap-lead">
              As 695 páginas de cidade derivam de um único template, cruzando seis serviços com 121
              cidades de Massachusetts. As outras 22 se distribuem em oito layouts.
            </p>
            <p className="ap-note">
              O dimensionamento do trabalho segue o número de layouts, não o número de páginas: nove
              layouts a reconstruir, um motor que gera as 695 a partir de uma tabela e a migração das
              URLs preservando o que já está indexado. Média de 2.900 palavras por página de cidade,
              com 57% a 69% de sobreposição de vocabulário entre elas.
            </p>
          </div>
          <div className="ap-rv ap-rv-d1">
            <Janela titulo="Inventário · páginas geradas por template">
              <Linha titulo="Ceiling Replacement" sub="121 cidades" valor="121" />
              <Linha titulo="Drywall Services" sub="121 cidades" valor="121" />
              <Linha titulo="Plastering Services" sub="121 cidades" valor="121" />
              <Linha titulo="Veneer Plaster" sub="121 cidades" valor="121" />
              <Linha titulo="Wall Plastering" sub="121 cidades" valor="121" />
              <Linha titulo="Drywall Installation" sub="90 cidades" valor="90" />
              <Linha titulo="Total" sub="a partir de um único layout" valor="695" />
            </Janela>
          </div>
        </div>
      </section>

      {/* ================= PÁGINAS PRÓPRIAS ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap ap-split ap-split--flip">
          <div className="ap-split__txt ap-rv">
            <h2 className="ap-h2">As 22 páginas próprias</h2>
            <p className="ap-lead">
              São as páginas com conteúdo autoral. Duas delas constam no menu principal e estão fora
              de todas as sitemaps, assim como as quatro filhas de drywall.
            </p>
          </div>
          <div className="ap-rv ap-rv-d1">
            <Janela titulo="Inventário · páginas próprias">
              <Linha titulo="Home" sub="/" pill={{ texto: 'na sitemap', tom: 'ok' }} />
              <Linha titulo="Sobre" sub="/about-us/" pill={{ texto: 'fora', tom: 'crit' }} />
              <Linha titulo="Portfólio" sub="/portfolio/" pill={{ texto: 'fora', tom: 'crit' }} />
              <Linha titulo="Contato" sub="/contact/" pill={{ texto: 'na sitemap', tom: 'ok' }} />
              <Linha
                titulo="Reboco"
                sub="hub + wall, veneer e ceiling"
                pill={{ texto: 'na sitemap', tom: 'ok' }}
              />
              <Linha
                titulo="Drywall"
                sub="hub na sitemap · 4 filhas fora"
                pill={{ texto: 'parcial', tom: 'alto' }}
              />
              <Linha
                titulo="Blog"
                sub="índice + 8 artigos"
                pill={{ texto: 'na sitemap', tom: 'ok' }}
              />
            </Janela>
          </div>
        </div>
      </section>

      {/* ================= ACHADOS ================= */}
      <section className="ap-section">
        <div className="ap-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="ap-rv" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h2 className="ap-h2">Defeitos encontrados</h2>
            <p className="ap-note">
              Ordenados por impacto. Cada item foi conferido no HTML entregue pelo servidor e nas
              requisições de rede da página renderizada.
            </p>
          </div>

          <div className="ap-finds ap-rv">
            {ACHADOS.map((a) => (
              <article className="ap-find" key={a.titulo}>
                <div className="ap-find__top">
                  <span className={`ap-pill ap-pill--${a.tom}`}>{a.sev}</span>
                  <h3 className="ap-h3">{a.titulo}</h3>
                </div>
                <p>{a.texto}</p>
                {a.ev && <div className="ap-find__ev">{a.ev}</div>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORMULÁRIO E STACK ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap ap-split">
          <div className="ap-split__txt ap-rv">
            <h2 className="ap-h2">Formulário e rota do lead</h2>
            <p className="ap-lead">
              Existe um único formulário, idêntico nas 717 páginas, montado no Elementor Pro e
              enviado por AJAX para a própria URL da página.
            </p>
            <p className="ap-note">
              Os envios seguem para o GoHighLevel, que também serve o chat flutuante. A camada de CRM
              permanece operante e está fora do escopo de reconstrução. Proteção antispam por honeypot
              e reCAPTCHA. Stack: WordPress sobre tema Hello Elementor com tema filho, cache pelo WP
              Rocket, servidor LiteSpeed com PHP 8.5, sitemaps geradas pelo Yoast, medição por Google
              Analytics. Os redirecionamentos de domínio estão corretos: http encaminha para https e
              www encaminha para a raiz, sem cadeia intermediária.
            </p>
          </div>
          <div className="ap-rv ap-rv-d1">
            <Janela titulo="Formulário · idêntico nas 717 páginas">
              <Linha titulo="name" sub="texto" valor="Nome" />
              <Linha titulo="phone" sub="telefone, obrigatório" valor="Contato" />
              <Linha titulo="zipcode" sub="define a praça" valor="CEP" />
              <Linha titulo="email" sub="e-mail" valor="Contato" />
              <Linha titulo="service" sub="lista suspensa" valor="Serviço" />
              <Linha titulo="details" sub="texto livre" valor="Projeto" />
              <Linha titulo="Destino do envio" sub="via AJAX" valor="GoHighLevel" />
            </Janela>
          </div>
        </div>
      </section>

      {/* ================= ESCOPO ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="ap-rv" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h2 className="ap-h2">Escopo da reestruturação</h2>
            <p className="ap-note">
              Pacotes de trabalho e estimativa de horas de execução, sem contabilizar reuniões e
              rodadas extras de aprovação. O conteúdo existente é reaproveitado e reorganizado, não
              reescrito. Total estimado: 127 a 194 horas.
            </p>
          </div>

          <div className="ap-pkgs ap-rv">
            {PACOTES.map((p) => (
              <div className="ap-pkg" key={p.t}>
                <h3 className="ap-h3">{p.t}</h3>
                <span className="ap-pkg__n">{p.n}</span>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INVESTIMENTO ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap">
          <div className="ap-price ap-rv">
            <span className="ap-eyebrow" style={{ margin: 0 }}>
              Investimento sugerido
            </span>
            <div className="ap-price__amount">
              <span className="ap-price__cur">US$</span>
              <span className="ap-price__num">1.500</span>
            </div>
            <p className="ap-note" style={{ maxWidth: '54ch', textAlign: 'center' }}>
              Valor sugerido para o escopo acima, do mapa de arquitetura à virada em produção. As 717
              páginas entram na reestruturação sem cobrança por página.
            </p>
            <div className="ap-price__inc">
              <span>Nove layouts</span>
              <span>Motor das 695 páginas de cidade</span>
              <span>Formulário e integração</span>
              <span>Migração de SEO</span>
              <span>Dados estruturados de negócio local</span>
              <span>Correção dos oito defeitos</span>
              <span>Performance e publicação</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MÉTODO ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div
          className="ap-wrap ap-rv"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
        >
          <h2 className="ap-h2">Como foi levantado</h2>
          <p className="ap-note">
            O inventário das 717 páginas vem da leitura integral das oito sitemaps do domínio, somada
            às páginas presentes no menu principal que não constam nelas. Os defeitos foram
            verificados no HTML entregue pelo servidor e nas páginas renderizadas em navegador,
            incluindo requisições de rede, dados estruturados e comportamento em viewport de celular.
            A verificação por página foi feita em 14 páginas, cobrindo os seis tipos de serviço, os
            dois hubs, a home e o contato.
          </p>
        </div>
      </section>

      <footer className="ap-wrap ap-foot">
        <span>Auditoria técnica · americaplasteringpro.com · agosto de 2026</span>
        <span>Leonardo Ferreira</span>
      </footer>
    </main>
  );
}
