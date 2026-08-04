'use client';

import { useEffect, useRef } from 'react';

const WA = '5534997697377'; // Leonardo
const MSG =
  'Oi Leonardo, vi a auditoria do America Plastering Pro. Quero conversar sobre a reestruturação.';
const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(MSG)}`;

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
      'Em todos os botões de telefone do site, o número que a pessoa lê é (781) 818-5107 e o número que o clique disca é +1 781-851-6385. São números diferentes. No celular, tocar no botão liga para um número que nunca foi anunciado. O título que aparece no Google, nas 695 páginas de cidade, traz o primeiro número.',
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
    titulo: 'As 695 páginas de cidade não têm marcação de negócio local',
    texto:
      'Só a home declara dados estruturados, e apenas do tipo Organization. Nenhuma página de cidade declara LocalBusiness, Service ou área atendida. O site inteiro foi construído para busca local e justamente a camada que o Google usa para entender "serviço X na cidade Y" está vazia.',
  },
  {
    tom: 'alto',
    sev: 'Alto',
    titulo: 'Sete páginas no ar ficaram fora de todas as sitemaps',
    texto:
      'Respondem 200, estão no menu principal e não constam em nenhuma sitemap: /about-us/, /portfolio/ e as quatro filhas de drywall (installation, finishing, remodeling e home-additions).',
  },
  {
    tom: 'alto',
    sev: 'Alto',
    titulo: '400 URLs aparecem em duas sitemaps ao mesmo tempo',
    texto:
      'O índice declara 1.111 entradas para 711 endereços únicos. A paginação das sitemaps está repetindo o mesmo bloco, o que desperdiça rastreamento e polui os relatórios do Search Console.',
  },
  {
    tom: 'medio',
    sev: 'Médio',
    titulo: 'Uma integração morta dispara em toda visita',
    texto:
      'Cada carregamento de página chama um endpoint de rastreamento que responde 401. É código rodando em 717 páginas sem entregar nada.',
    ev: <>401 · luulxhajwrxnthjutibc.supabase.co/rest/v1/public_tracking_configs</>,
  },
  {
    tom: 'medio',
    sev: 'Médio',
    titulo: 'Nenhuma imagem tem carregamento adiado',
    texto:
      'Zero imagens com loading="lazy". Com 1,0 a 2,2 MB e 93 a 111 requisições por página, é o ganho de velocidade mais barato disponível.',
  },
  {
    tom: 'medio',
    sev: 'Médio',
    titulo: 'Alvos de toque pequenos no celular',
    texto:
      '25 dos 49 links e botões da home ficam abaixo de 40 px em tela de 390 px, e o menor texto corrido é 12 px. O layout responde bem e não há rolagem horizontal.',
  },
  {
    tom: 'medio',
    sev: 'Menor',
    titulo: 'A mesma URL responde com e sem barra final',
    texto:
      '/contact e /contact/ devolvem 200 com HTML idêntico. A canonical aponta para a versão com barra, então o risco de indexação está contido. É higiene, não urgência.',
  },
];

const PACOTES = [
  {
    t: 'Arquitetura e modelo de conteúdo',
    n: '10 a 16 h',
    d: 'Mapa das 717 rotas, modelo dos dados de cidade e serviço, plano de redirecionamento sem perder o que já está indexado.',
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
    d: 'Formulário refeito mantendo a rota para o GoHighLevel, antispam, validação e confirmação.',
  },
  {
    t: 'Migração de SEO',
    n: '14 a 22 h',
    d: 'Redirecionamentos, canonicals, sitemaps corrigidas, marcação de negócio local nas 695 páginas, títulos e descrições por template.',
  },
  {
    t: 'Correção dos defeitos desta auditoria',
    n: '6 a 10 h',
    d: 'Telefone, integração morta, imagens adiadas, alvos de toque e barra final.',
  },
  {
    t: 'Performance, testes e publicação',
    n: '14 a 22 h',
    d: 'Peso de imagem, requisições, testes em telas reais, checagem de rastreamento e virada.',
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
          <b>Leonardo Ferreira</b>
          <span>· auditoria técnica</span>
        </div>
        <a className="ap-btn ap-nav__cta" href={waLink} target="_blank" rel="noopener">
          Conversar sobre a reestruturação
        </a>
      </nav>

      {/* ================= HERO ================= */}
      <header className="ap-hero">
        <div className="ap-wrap ap-hero__grid">
          <div className="ap-hero__col ap-rv">
            <span className="ap-eyebrow">America Plastering Pro</span>
            <h1 className="ap-h1">
              717 páginas no ar. O botão de ligar <em>disca um número que ninguém anunciou.</em>
            </h1>
            <p className="ap-lead">
              Auditoria técnica completa do americaplasteringpro.com. Todas as páginas
              inventariadas, defeitos verificados no HTML servido em produção e um escopo de
              reestruturação com preço fechado.
            </p>
            <a className="ap-btn" href={waLink} target="_blank" rel="noopener">
              Conversar sobre a reestruturação
            </a>
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
              <Linha titulo="O que a pessoa lê" valor="(781) 818-5107" />
              <Linha titulo="O que o clique disca" valor="+1 781-851-6385" />
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
              <span>saem de um template</span>
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

      {/* ================= O REENQUADRAMENTO ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap ap-split">
          <div className="ap-split__txt ap-rv">
            <h2 className="ap-h2">
              São 717 páginas, mas <em>são nove layouts.</em>
            </h2>
            <p className="ap-lead">
              As 695 páginas de cidade saem de um único template, cruzando seis serviços com 121
              cidades de Massachusetts. As outras 22 se distribuem em oito layouts.
            </p>
            <p className="ap-note">
              É isso que torna a reestruturação viável. O trabalho não é refazer 717 páginas: é
              reconstruir nove layouts, criar o motor que gera as 695 a partir de uma tabela e migrar
              as URLs preservando o que já está indexado.
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
            <h2 className="ap-h2">
              As 22 páginas <em>próprias.</em>
            </h2>
            <p className="ap-lead">
              São as que têm conteúdo autoral e sustentam a marca. Duas delas estão vivas no menu e
              fora de todas as sitemaps, junto com as quatro filhas de drywall.
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
        <div className="ap-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="ap-rv" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span className="ap-eyebrow">Oito achados</span>
            <h2 className="ap-h2">
              O que está <em>quebrado hoje.</em>
            </h2>
            <p className="ap-note">
              Ordenados por impacto comercial. Cada um foi conferido no HTML entregue pelo servidor,
              não inferido a partir do visual.
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

      {/* ================= STACK ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap ap-split">
          <div className="ap-split__txt ap-rv">
            <h2 className="ap-h2">
              O que está <em>rodando por baixo.</em>
            </h2>
            <p className="ap-lead">
              WordPress com Elementor Pro sobre o tema Hello e um tema filho. Cache pelo WP Rocket,
              servidor LiteSpeed com PHP 8.5.
            </p>
            <p className="ap-note">
              Uma boa notícia para o orçamento: os leads já vão para o GoHighLevel, que também serve o
              chat flutuante. O CRM continua de pé e não precisa ser reconstruído nem migrado.
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
              <Linha titulo="Destino do lead" sub="via AJAX" valor="GoHighLevel" />
            </Janela>
          </div>
        </div>
      </section>

      {/* ================= ESCOPO ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="ap-rv" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span className="ap-eyebrow">Escopo</span>
            <h2 className="ap-h2">
              O que a reestruturação <em>envolve.</em>
            </h2>
            <p className="ap-note">
              Horas de execução, sem contar reuniões e rodadas extras de aprovação. O conteúdo atual é
              reaproveitado e reorganizado, não reescrito do zero.
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

      {/* ================= PREÇO ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap">
          <div className="ap-price ap-rv">
            <span className="ap-eyebrow" style={{ margin: 0 }}>
              Investimento
            </span>
            <div className="ap-price__amount">
              <span className="ap-price__cur">R$</span>
              <span className="ap-price__num">8.000</span>
            </div>
            <p className="ap-lead" style={{ maxWidth: '52ch', textAlign: 'center' }}>
              Projeto fechado, do mapa de arquitetura à virada em produção. As 717 páginas entram
              renovadas, sem cobrança por página.
            </p>
            <div className="ap-price__inc">
              <span>Nove layouts novos</span>
              <span>Motor das 695 páginas de cidade</span>
              <span>Formulário e integração</span>
              <span>Migração de SEO</span>
              <span>Marcação de negócio local</span>
              <span>Os oito defeitos corrigidos</span>
              <span>Performance e publicação</span>
            </div>
            <a className="ap-btn" href={waLink} target="_blank" rel="noopener">
              Conversar sobre a reestruturação
            </a>
          </div>
        </div>
      </section>

      {/* ================= MÉTODO ================= */}
      <section className="ap-section" style={{ paddingTop: 0 }}>
        <div className="ap-wrap ap-rv" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span className="ap-eyebrow">Como foi levantado</span>
          <h2 className="ap-h2" style={{ maxWidth: '18ch' }}>
            Sem <em>achismo.</em>
          </h2>
          <p className="ap-note">
            O inventário das 717 páginas saiu da leitura integral das oito sitemaps do domínio,
            somada às páginas do menu que não constam nelas. Os defeitos foram conferidos no HTML
            servido em produção e nas páginas renderizadas em navegador, incluindo as requisições de
            rede, os dados estruturados e o comportamento em tela de celular.
          </p>
        </div>
      </section>

      <footer className="ap-wrap ap-foot">
        <span>Leonardo Ferreira · auditoria técnica · americaplasteringpro.com</span>
        <a className="ap-btn ap-btn--ghost" href={waLink} target="_blank" rel="noopener">
          Falar no WhatsApp
        </a>
      </footer>
    </main>
  );
}
