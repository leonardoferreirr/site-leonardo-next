'use client';

import { useEffect } from 'react';
import CodeField from '@/components/CodeField';
import { ArrowRight, WhatsApp } from '@/components/v2/Icons';

const WA = '5534936180691'; // mesmo número do botão do site (SectionCta)

const MSG = {
  identidade: 'Oi Léo! Vi a proposta do Vila Botânica e quero seguir com a Identidade Visual.',
  branding: 'Oi Léo! Vi a proposta do Vila Botânica e quero seguir com o Branding Completo.',
  conversa: 'Oi Léo! Vi a proposta do Vila Botânica e queria conversar antes de decidir.',
};

const wa = (texto: string) => `https://wa.me/${WA}?text=${encodeURIComponent(texto)}`;

// pontos de cor das categorias da home (sites, sistemas, identidade, social, vídeo, lab), misturados pela página.
// No papel entra o mesmo tom mais fundo: o claro não passa no contraste sobre o branco.
const CORES = ['#4da3ff', '#6be07a', '#ff5c8a', '#ffb547', '#ff6b4a', '#b18cff'];
const CORES_PAPEL = ['#1f6fd6', '#16803a', '#c8155a', '#9a6200', '#cc3a17', '#7448d6'];
const cor = (i: number, papel = false) => ({ ['--cor' as string]: (papel ? CORES_PAPEL : CORES)[i % 6] });


const NUMEROS = [
  { valor: 135, casas: 0, sufixo: '', texto: 'resorts em funcionamento no Brasil', fonte: 'Radar Resorts Brasil, set/2025' },
  { valor: 21, casas: 0, sufixo: '', texto: 'novos resorts previstos até 2029', fonte: 'Radar Resorts Brasil, set/2025' },
  { valor: 11.8, casas: 1, sufixo: ' mi', texto: 'visitas aos parques nacionais em 2025, 8% a mais que em 2024', fonte: 'Ministério do Turismo' },
];

const LIDO = [
  {
    t: 'O sentimento',
    p: 'Integração com a natureza, acolhimento, conforto contemporâneo e sofisticação sem ostentação. Um lugar para respirar, não para impressionar.',
  },
  {
    t: 'A base de cor',
    p: 'Verde e tons claros como base, terracota e amarelo capim como acento. Entra no estudo como ponto de partida e é testada na marca antes de virar regra.',
  },
  {
    t: 'Onde a marca vai viver',
    p: 'Instagram, site, folder institucional e a entrada e a fachada do empreendimento. Cada uma dessas peças entra no projeto desde o primeiro rascunho.',
  },
  {
    t: 'O cuidado técnico',
    p: 'Versões que funcionam pequenas, no celular e no ícone do site, arquivos finais em todos os formatos e regras de uso documentadas antes de dar a marca por concluída.',
  },
];

const PASSOS = [
  {
    t: 'Imersão',
    p: 'Conversa com vocês, leitura do diagnóstico estratégico e do levantamento da marca, e um olhar atento para o projeto arquitetônico e o terreno.',
  },
  {
    t: 'Estudo e rascunho',
    p: 'Pesquisa do lugar: vegetação, relevo, materiais da construção, o jeito de receber. Daí saem os primeiros rascunhos, ainda no lápis.',
  },
  {
    t: 'Duas direções',
    p: 'Desenho no Illustrator e apresento duas direções visuais completas. Vocês escolhem uma e a gente refina junto.',
  },
  {
    t: 'Aplicação e entrega',
    p: 'A marca vai para os mockups, passa pelos ajustes finais e chega com o guia de uso e todos os arquivos.',
  },
];

const APLICACOES_A = ['Portal de entrada', 'Fachada', 'Perfil do Instagram', 'Posts e stories', 'Site', 'Folder institucional', 'Cartão de visita'];
const APLICACOES_B = ['Papel timbrado', 'Uniforme da equipe', 'Enxoval e toalhas', 'Amenities do banho', 'Cartão-chave do quarto', 'Sinalização', 'Placa da recepção'];

const ESTRATEGIA = [
  {
    t: 'Ponto de partida',
    p: 'Leio a síntese do diagnóstico estratégico e o levantamento que vocês já fizeram, para construir em cima do que existe e não refazer trabalho.',
  },
  {
    t: 'Concorrência',
    p: 'Mapeio como os resorts e pousadas de natureza que disputam o mesmo hóspede se apresentam: nome, cores, fotos, tom e preço. O objetivo é achar o espaço que ninguém ocupa.',
  },
  {
    t: 'Hóspede ideal',
    p: 'Quem é, de onde vem, com quem viaja, o que procura num fim de semana fora e o que faz essa pessoa apertar o botão de reservar.',
  },
  {
    t: 'Posicionamento e personalidade',
    p: 'A frase que resume por que escolher o Vila Botânica, a essência, os valores e o jeito de ser da marca. É o que orienta cada decisão de desenho depois.',
  },
  {
    t: 'Tom de voz e mensagens',
    p: 'Como a marca fala no Instagram, no site, no WhatsApp e na recepção, com exemplos prontos e as frases que vão se repetir na comunicação.',
  },
];

const PLANOS = [
  {
    nome: 'Identidade Visual',
    preco: '2.500',
    parcela: '208,33',
    prazo: '1 semana',
    msg: MSG.identidade,
    cta: 'Quero a Identidade Visual',
    itens: [
      'Logotipo principal desenhado do zero',
      'Variações horizontal, vertical, símbolo e versão reduzida',
      'Versões em positivo, negativo e uma cor',
      'Paleta de cores com códigos para tela e impressão',
      'Tipografia e hierarquia de uso',
      'Duas direções visuais, escolha de uma e refinamento',
      'Mockups: portal de entrada, fachada, Instagram, site, folder, papelaria e uniforme',
      'Guia de uso da marca em PDF',
      'Arquivos finais em AI, PDF, SVG, PNG e JPG',
      'Apresentação do projeto por videochamada',
    ],
  },
  {
    nome: 'Branding Completo',
    preco: '4.000',
    parcela: '333,33',
    prazo: '2 semanas',
    msg: MSG.branding,
    cta: 'Quero o Branding Completo',
    itens: [
      'Tudo da Identidade Visual',
      'Imersão com vocês e leitura do diagnóstico estratégico',
      'Análise da concorrência',
      'Perfil do hóspede ideal',
      'Posicionamento, essência, valores e personalidade',
      'Tom de voz com exemplos e mensagens-chave',
      'Grafismos e padronagens de apoio',
      'Mockups também de enxoval, amenities, sinalização e cartão-chave',
      'Manual completo da marca, com estratégia e identidade',
    ],
  },
];

// número que conta de 0 até o valor quando entra na tela
function contar(el: HTMLElement) {
  const alvo = Number(el.dataset.valor);
  const casas = Number(el.dataset.casas || 0);
  const sufixo = el.dataset.sufixo || '';
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }) + sufixo;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = fmt(alvo);
    return;
  }
  const ini = performance.now();
  const dur = 1400;
  const passo = (agora: number) => {
    const k = Math.min(1, (agora - ini) / dur);
    el.textContent = fmt(alvo * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

export default function VilaBotanicaProposta() {
  useEffect(() => {
    (window as Window & { __vb?: number }).__vb = 1;

    // entrada no scroll (uma vez só) + contagem dos números
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          e.target.querySelectorAll<HTMLElement>('[data-valor]').forEach(contar);
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    document.querySelectorAll('.vb-in').forEach((el) => io.observe(el));

    // animação contínua (janela do Illustrator, faixas) só roda com o bloco na tela
    const vivo = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.target.classList.toggle('vb-pausa', !e.isIntersecting)),
      { rootMargin: '80px 0px' },
    );
    document.querySelectorAll('[data-vivo]').forEach((el) => vivo.observe(el));

    // cabeçalho ganha vidro ao rolar
    const topo = document.querySelector('.vb-topo');
    let quadro = 0;
    const rolar = () => {
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        topo?.classList.toggle('is-solid', window.scrollY > 24);
      });
    };
    rolar();
    window.addEventListener('scroll', rolar, { passive: true });

    return () => {
      io.disconnect();
      vivo.disconnect();
      window.removeEventListener('scroll', rolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <>
      <CodeField variant="fixed" />

      <header className="vb-topo">
        <div className="vb-topo__in">
          <a href="https://www.leonardoferreirr.com.br" className="vb-logo" aria-label="Leonardo Ferreira, site">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/v2/logo-caricatura.webp" alt="" width={36} height={36} />
            <span>Leonardo Ferreira</span>
          </a>
          <a href={wa(MSG.conversa)} target="_blank" rel="noopener" className="vb-btn vb-btn--solid vb-btn--p">
            <WhatsApp /> Entrar em contato
          </a>
        </div>
      </header>

      <main className="vb">
        {/* ABERTURA */}
        <section className="vb-hero">
          <div className="vb-wrap">
            <h1 className="vb-h1 vb-sobe">
              <span className="vb-h1__a">Proposta de Identidade Visual e Branding</span>{' '}
              <span className="vb-h1__b">para o Vila Botânica Eco Resort</span>
            </h1>
            <div className="vb-hero__ctas vb-sobe" style={{ animationDelay: '0.25s' }}>
              <a href="#investimento" className="vb-btn vb-btn--solid">
                Ver as opções <ArrowRight />
              </a>
              <a href={wa(MSG.conversa)} target="_blank" rel="noopener" className="vb-btn vb-btn--ghost">
                <WhatsApp /> Conversar no WhatsApp
              </a>
            </div>
            <p className="vb-hero__status vb-mono vb-sobe" style={{ animationDelay: '0.4s' }}>
              <span className="vb-cores" aria-hidden="true">
                {CORES.map((c) => (
                  <i key={c} style={{ background: c }} />
                ))}
              </span>
              proposta · outubro de 2026
            </p>
          </div>
        </section>

        {/* CONTEXTO */}
        <section className="vb-sec">
          <div className="vb-wrap">
            <div className="vb-contexto">
              <div className="vb-in">
                <h2 className="vb-h2">Cada vez mais gente busca o verde.</h2>
                <div className="vb-texto">
                  <p>
                    O Brasil tem 135 resorts funcionando e outros 21 a caminho até 2029. Os parques nacionais
                    passaram de 11,8 milhões de visitas em 2025. Tem muita gente querendo desacelerar perto da
                    natureza.
                  </p>
                  <p>
                    E essa escolha começa no celular, bem antes da chegada. Uma marca com jeito próprio faz o Vila
                    Botânica ser lembrado com carinho, e não confundido com os lugares que usam a mesma folha, o
                    mesmo sol e o mesmo telhado.
                  </p>
                </div>
              </div>
              <ul className="vb-numeros vb-in">
                {NUMEROS.map((n, i) => (
                  <li key={n.texto} style={cor(i)}>
                    <strong data-valor={n.valor} data-casas={n.casas} data-sufixo={n.sufixo}>
                      {n.valor.toLocaleString('pt-BR', { minimumFractionDigits: n.casas }) + n.sufixo}
                    </strong>
                    <span>{n.texto}</span>
                    <em className="vb-mono">{n.fonte}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* O QUE EU LI */}
        <section className="vb-sec vb-papel">
          <div className="vb-wrap">
            <div className="vb-cabeca vb-cabeca--centro vb-in">
              <h2 className="vb-h2">O que já está claro</h2>
            </div>
            <ol className="vb-lido">
              {LIDO.map((item, i) => (
                <li key={item.t} className="vb-in" style={{ transitionDelay: `${i * 0.08}s`, ...cor(i, true) }}>
                  <span className="vb-num vb-mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.t}</h3>
                  <p>{item.p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FEITO À MÃO */}
        <section className="vb-sec">
          <div className="vb-wrap">
            <div className="vb-cabeca vb-cabeca--centro vb-in">
              <h2 className="vb-h2">Desenhado à mão, do zero</h2>
              <p className="vb-lead vb-lead--largo">
                Nada de modelo pronto, banco de imagem ou símbolo de catálogo. A marca nasce no papel, vai para o
                Illustrator e só sai de lá quando cada curva tem um motivo.
              </p>
            </div>

            <div className="vb-win vb-in" data-vivo aria-hidden="true">
              <div className="vb-win__bar">
                <span />
                <span />
                <span />
                <em className="vb-mono">vila-botanica.ai @ 400%</em>
              </div>
              <div className="vb-ai">
                <div className="vb-ai__tools">
                  {['M5 3l12 8-6 1-3 6z', 'M4 4l8 16 2-7 7-2z', 'M12 3l3 7-3 11-3-11z', 'M4 18c4-1 6-12 16-12', 'M6 5h12M12 5v14', 'M4 6h16v12H4z', 'M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16z', 'M8 11V6a2 2 0 0 1 4 0v5m0-3a2 2 0 0 1 4 0v6a6 6 0 0 1-12 0v-3a2 2 0 0 1 4 0'].map((d, i) => (
                    <svg key={d} viewBox="0 0 24 24" className={i === 2 ? 'is-on' : ''}>
                      <path d={d} />
                    </svg>
                  ))}
                </div>
                <div className="vb-ai__mesa">
                  <svg viewBox="0 0 600 380" className="vb-ai__arte">
                    <defs>
                      <pattern id="vb-grade" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M20 0H0V20" fill="none" stroke="#ececec" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="600" height="380" fill="#fff" />
                    <rect width="600" height="380" fill="url(#vb-grade)" />
                    <path className="vb-ai__tinta" d="M70 280C120 140 220 90 300 160S450 300 530 110" />
                    <path className="vb-ai__traco" pathLength={1} d="M70 280C120 140 220 90 300 160S450 300 530 110" />
                    <g className="vb-ai__alcas">
                      <path d="M70 280L120 140M300 160L220 90M300 160L380 230M530 110L450 300" />
                      <circle cx="120" cy="140" r="4" />
                      <circle cx="220" cy="90" r="4" />
                      <circle cx="380" cy="230" r="4" />
                      <circle cx="450" cy="300" r="4" />
                    </g>
                    <g className="vb-ai__pontos">
                      <rect x="65" y="275" width="10" height="10" />
                      <rect x="295" y="155" width="10" height="10" />
                      <rect x="525" y="105" width="10" height="10" />
                    </g>
                  </svg>
                </div>
                <div className="vb-ai__painel vb-mono">
                  <b>Camadas</b>
                  <span className="is-on">rascunho 03</span>
                  <span>rascunho 02</span>
                  <span>rascunho 01</span>
                  <b>Amostras</b>
                  <div className="vb-ai__cores">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </div>

            <ol className="vb-passos">
              {PASSOS.map((p, i) => (
                <li key={p.t} className="vb-in" style={{ transitionDelay: `${i * 0.08}s`, ...cor(i + 2) }}>
                  <span className="vb-num vb-mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.t}</h3>
                  <p>{p.p}</p>
                </li>
              ))}
            </ol>

          </div>
        </section>

        {/* APLICAÇÕES */}
        <section className="vb-sec vb-sec--faixas" data-vivo>
          <div className="vb-wrap">
            <div className="vb-cabeca vb-cabeca--centro vb-in">
              <h2 className="vb-h2">A marca no lugar</h2>
            </div>
          </div>
          <div className="vb-faixas" aria-label="Aplicações apresentadas em mockup">
            {[APLICACOES_A, APLICACOES_B].map((linha, i) => (
              <div key={i} className={`vb-faixa${i ? ' vb-faixa--volta' : ''}`}>
                {[0, 1].map((copia) => (
                  <div key={copia} className="vb-faixa__grupo" aria-hidden={copia === 1}>
                    {linha.map((t, j) => (
                      <span key={t}>
                        <i className="vb-dot" style={cor(j + i * 3)} />
                        {t}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ESTRATÉGIA */}
        <section className="vb-sec vb-papel">
          <div className="vb-wrap vb-estrategia">
            <div className="vb-estrategia__cabeca vb-in">
              <h2 className="vb-h2">A estratégia por trás</h2>
              <p className="vb-lead">
                No Branding Completo, antes do desenho vem a estratégia. É ela que dá argumento à marca, e não só
                aparência.
              </p>
              <p className="vb-lead">
                Tudo isso vira o manual completo da marca, com estratégia e identidade no mesmo documento, para a
                equipe e qualquer fornecedor usarem do mesmo jeito.
              </p>
            </div>
            <ol className="vb-pilha">
              {ESTRATEGIA.map((e, i) => (
                <li key={e.t} className="vb-cartao" style={{ ['--i' as string]: i, ...cor(i + 1, true) }}>
                  <span className="vb-num vb-mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{e.t}</h3>
                  <p>{e.p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* INVESTIMENTO */}
        <section className="vb-sec" id="investimento">
          <div className="vb-wrap">
            <div className="vb-cabeca vb-cabeca--centro vb-in">
              <h2 className="vb-h2">Duas formas de fazer</h2>
              <p className="vb-lead">As duas parcelam em até 12x sem juros no cartão.</p>
            </div>
            <div className="vb-planos">
              {PLANOS.map((p, i) => (
                <article key={p.nome} className="vb-plano vb-in" style={{ transitionDelay: `${i * 0.1}s`, ...cor(i ? 5 : 2) }}>
                  <h3>{p.nome}</h3>
                  <div className="vb-plano__preco">
                    <span className="vb-plano__moeda">R$</span>
                    <strong>{p.preco}</strong>
                  </div>
                  <p className="vb-plano__parcela">
                    ou 12x de R$ {p.parcela} sem juros no cartão
                  </p>
                  <p className="vb-plano__prazo vb-mono">prazo · {p.prazo}</p>
                  <ul className="vb-plano__lista">
                    {p.itens.map((it, j) => (
                      <li key={it} style={cor(j)}>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a href={wa(p.msg)} target="_blank" rel="noopener" className="vb-btn vb-btn--solid vb-plano__cta">
                    <WhatsApp /> {p.cta}
                  </a>
                </article>
              ))}
            </div>
            <p className="vb-nota vb-in">
              Se preferir Pix ou outro formato de pagamento, me chama que a gente acerta.
            </p>
          </div>
        </section>

        {/* FECHAMENTO */}
        <section className="vb-sec vb-final">
          <div className="vb-wrap">
            <div className="vb-in">
              <h2 className="vb-h2">Vamos desenhar o Vila Botânica?</h2>
              <p className="vb-lead">
                Escolha o caminho que faz sentido agora ou me chama para conversar antes de decidir. O fechamento é
                direto pelo WhatsApp.
              </p>
              <a href={wa(MSG.conversa)} target="_blank" rel="noopener" className="vb-btn vb-btn--solid">
                <WhatsApp /> Conversar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="vb-pe">
        <div className="vb-wrap vb-pe__in">
          <span>Proposta elaborada por Leonardo Ferreira · outubro de 2026</span>
          <a href="https://www.leonardoferreirr.com.br">leonardoferreirr.com.br</a>
        </div>
      </footer>
    </>
  );
}
