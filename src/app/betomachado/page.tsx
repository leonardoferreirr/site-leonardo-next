'use client';

import { useEffect } from 'react';

const WA = '5534997697377'; // Leonardo

const MSG = {
  atelie:
    'Oi Leonardo, vi a proposta. Quero fechar a identidade do Ateliê de Música.',
  atelieSite:
    'Oi Leonardo, vi a proposta. Quero fechar a identidade do Ateliê de Música mais o site.',
  duas:
    'Oi Leonardo, vi a proposta. Quero fechar as duas identidades, Ateliê e Cartório e Afeto.',
  duasSites:
    'Oi Leonardo, vi a proposta. Quero fechar tudo, as duas identidades mais os dois sites.',
  duvida:
    'Oi Leonardo, vi a proposta de identidade visual. Tenho uma dúvida antes de fechar.',
};

function waLink(text: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
}

export default function BetoMachadoProposalPage() {
  // Reveal on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('bm-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.bm-rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="bm-page">
      {/* HERO */}
      <section className="bm-hero">
        <div className="bm-wrap">
          <span className="bm-eyebrow">Olá, Beto! Apresento para você</span>
          <h1 className="bm-h1">
            A identidade visual <em>que a sua arte merece,</em> traduzida em duas marcas que conversam.
          </h1>
          <p className="bm-lead">
            Você não toca piano há pouco tempo. Não chegou ao Grammy Latino por acaso. E o ateliê
            que você construiu não é mais um fornecedor de música para evento, é referência.
            A proposta a seguir é sobre traduzir tudo isso em assinatura visual, do logo ao
            cartão de visita, do site ao reels.
          </p>
        </div>
      </section>

      {/* SUA HISTÓRIA */}
      <section className="bm-section bm-story">
        <div className="bm-wrap">
          <div className="bm-story-grid">
            <div className="bm-story-media bm-rv">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/betomachado/beto.jpg" alt="Beto Machado, pianista e produtor musical" />
            </div>
            <div className="bm-story-body bm-rv">
              <span className="bm-eyebrow">Sua história</span>
              <h2 className="bm-h2">
                Pianista desde os 15. <em>Profissional, vivido, premiado.</em>
              </h2>
              <p>
                A maioria das marcas que faço identidade visual começa do zero: empresa nova,
                história ainda sendo escrita. Com você é o contrário. <strong>Você já tem
                história, e ela é poderosa.</strong> Pianista desde a adolescência, produtor
                musical, indicado ao Grammy Latino na produção de Victor e Léo.
              </p>
              <p>
                Isso muda tudo no projeto. Não é inventar uma identidade do nada, é desenhar
                uma marca que esteja à altura do que você já é. Que comunique, no primeiro
                segundo, que quem está do outro lado do contrato é referência, não amador.
              </p>
              <p>
                Vamos contar a sua história. A música vai estar na tipografia, no símbolo,
                na paleta. E vai estar de um jeito que o noivo, a noiva e o cartório sintam
                antes de entender.
              </p>

              <div className="bm-story-marks">
                <div className="bm-story-mark">
                  <strong>+25 anos</strong>
                  no piano
                </div>
                <div className="bm-story-mark">
                  <strong>Grammy</strong>
                  indicado por produção
                </div>
                <div className="bm-story-mark">
                  <strong>2 marcas</strong>
                  no mesmo universo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAS MARCAS */}
      <section className="bm-section">
        <div className="bm-wrap">
          <div className="bm-rv" style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
            <span className="bm-eyebrow">As duas marcas</span>
          </div>
          <div className="bm-rv" style={{ textAlign: 'center' }}>
            <h2 className="bm-h2" style={{ margin: '0 auto 1rem', maxWidth: '24ch' }}>
              Dois momentos da vida, <em>duas identidades que se reconhecem.</em>
            </h2>
            <p className="bm-sub" style={{ margin: '0 auto', maxWidth: '54ch' }}>
              Cada marca atende uma cena diferente do casamento. Vamos desenhar as duas como
              irmãs: do mesmo DNA, mas com personalidades próprias.
            </p>
          </div>

          <div className="bm-marks-grid">
            <div className="bm-mark-card bm-rv">
              <span className="bm-mark-tag">Marca 01</span>
              <h3>Beto Machado Ateliê de Música</h3>
              <div className="bm-mark-sub">A festa, o salão cheio, o sim da noiva.</div>
              <p>
                A marca dos casamentos grandes, das festas de quinze, dos eventos onde a
                música precisa enche o ambiente. Sofisticada, calorosa, presente. Vai aparecer
                em palco, em telão, em catálogo de fornecedor, em assinatura de e-mail para
                cerimonialistas.
              </p>
              <div className="bm-mark-vibes">
                <span className="bm-vibe">refinada</span>
                <span className="bm-vibe">calorosa</span>
                <span className="bm-vibe">cerimonial</span>
                <span className="bm-vibe">memorável</span>
              </div>
            </div>

            <div className="bm-mark-card bm-rv">
              <span className="bm-mark-tag">Marca 02</span>
              <h3>Beto Machado Cartório e Afeto</h3>
              <div className="bm-mark-sub">O sim no civil, a formalização afetiva.</div>
              <p>
                A marca da cerimônia de cartório, geralmente em dia de semana, com a família
                próxima. É o momento íntimo, antes da festa. Aqui a marca precisa ser mais
                pessoal, mais quente, menos pomposa. Comunica intimidade e afeto sem perder
                o senso de profissionalismo.
              </p>
              <div className="bm-mark-vibes">
                <span className="bm-vibe">íntima</span>
                <span className="bm-vibe">afetiva</span>
                <span className="bm-vibe">cuidadosa</span>
                <span className="bm-vibe">próxima</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bm-section bm-steps">
        <div className="bm-wrap">
          <div className="bm-rv">
            <span className="bm-eyebrow">Como vamos trabalhar</span>
            <h2 className="bm-h2">
              Três etapas, <em>seis semanas, zero achismo.</em>
            </h2>
            <p className="bm-sub">
              Não desenho marca por intuição. Toda decisão visual vem de uma análise feita
              antes: do mercado, da sua história, do público que você atende.
            </p>
          </div>

          <div className="bm-steps-grid">
            <div className="bm-step bm-rv">
              <div className="bm-step-num">01</div>
              <h4>Imersão e estratégia</h4>
              <p>
                Briefing aprofundado com você, análise de concorrentes (cerimonialistas,
                ateliês de música, fornecedores premium), estudo do público. Sai daqui um
                mapa estratégico antes de o lápis encostar no papel.
              </p>
            </div>

            <div className="bm-step bm-rv">
              <div className="bm-step-num">02</div>
              <h4>Criação e refinamento</h4>
              <p>
                Desenho do logo, das variações, da paleta, da tipografia, dos elementos de
                apoio. Apresentação de duas direções visuais, escolha conjunta de uma, e
                refinamento até a versão final.
              </p>
            </div>

            <div className="bm-step bm-rv">
              <div className="bm-step-num">03</div>
              <h4>Apresentação e entrega</h4>
              <p>
                Apresentação completa do projeto em chamada, manual da marca em PDF, arquivos
                em todos os formatos (vetorial, alta resolução, RGB, CMYK) e versão pronta
                para registro no INPI, se você quiser registrar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE ESTÁ INCLUSO */}
      <section className="bm-section">
        <div className="bm-wrap">
          <div className="bm-rv">
            <span className="bm-eyebrow">O que você recebe</span>
            <h2 className="bm-h2">
              Tudo que a marca precisa <em>para viver no mundo real.</em>
            </h2>
            <p className="bm-sub">
              Não entrego só um arquivo de logo. Entrego um sistema visual completo, pronto
              para qualquer aplicação que apareça pela frente.
            </p>
          </div>

          <div className="bm-deliv-grid">
            <div className="bm-deliv bm-rv">
              <h5>Logo</h5>
              <ul>
                <li>Símbolo e logotipo</li>
                <li>Versão vertical</li>
                <li>Versão horizontal</li>
                <li>Selo / emblema</li>
                <li>Preto e branco</li>
                <li>Áreas de respiro e usos proibidos</li>
              </ul>
            </div>

            <div className="bm-deliv bm-rv">
              <h5>Cores</h5>
              <ul>
                <li>Paleta principal</li>
                <li>Paleta de apoio</li>
                <li>Códigos em RGB, CMYK e Pantone</li>
                <li>Hierarquia e combinações</li>
              </ul>
            </div>

            <div className="bm-deliv bm-rv">
              <h5>Tipografia</h5>
              <ul>
                <li>Fontes institucionais</li>
                <li>Pesos e hierarquia</li>
                <li>Uso em título, corpo e legendas</li>
                <li>Tom de voz visual</li>
              </ul>
            </div>

            <div className="bm-deliv bm-rv">
              <h5>Aplicações e manual</h5>
              <ul>
                <li>Manual de marca em PDF</li>
                <li>Templates para Instagram</li>
                <li>Assinatura de e-mail</li>
                <li>Apresentação comercial</li>
                <li>Versão pronta para o INPI</li>
                <li>Arquivos: EPS, PNG, JPG</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRAZO */}
      <section className="bm-section bm-steps">
        <div className="bm-wrap">
          <div className="bm-rv">
            <span className="bm-eyebrow">Prazo</span>
            <h2 className="bm-h2">
              Seis semanas <em>do início ao manual final.</em>
            </h2>
            <p className="bm-sub">
              Esse é o cronograma para uma identidade. Para duas (Ateliê e Cartório),
              trabalhamos em paralelo: o prazo total não dobra, fica em torno de oito semanas.
            </p>
          </div>

          <div className="bm-timeline bm-rv">
            <h3>Cronograma de uma identidade</h3>
            <p>
              As duas primeiras semanas são as mais importantes. Sem imersão bem feita,
              qualquer marca cai em armadilha de seguir tendência sem critério.
            </p>
            <div className="bm-timeline-track">
              <div className="bm-timeline-step">
                <div className="bm-tl-dot" />
                <div className="bm-tl-week">Semana 1</div>
                <h5>Imersão</h5>
                <p>Briefing aprofundado, mapa do que a marca precisa comunicar.</p>
              </div>
              <div className="bm-timeline-step">
                <div className="bm-tl-dot" />
                <div className="bm-tl-week">Semana 2</div>
                <h5>Pesquisa</h5>
                <p>Análise de mercado, referências visuais, posicionamento.</p>
              </div>
              <div className="bm-timeline-step">
                <div className="bm-tl-dot" />
                <div className="bm-tl-week">Semana 3 a 4</div>
                <h5>Criação</h5>
                <p>Desenho do logo, variações, paleta, tipografia e elementos.</p>
              </div>
              <div className="bm-timeline-step">
                <div className="bm-tl-dot" />
                <div className="bm-tl-week">Semana 5</div>
                <h5>Refinamento</h5>
                <p>Ajustes na direção escolhida, testes em aplicação real.</p>
              </div>
              <div className="bm-timeline-step">
                <div className="bm-tl-dot" />
                <div className="bm-tl-week">Semana 6</div>
                <h5>Apresentação e entrega</h5>
                <p>Apresentação ao vivo, manual e arquivos finais.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTIMENTO */}
      <section className="bm-section bm-invest" id="investimento">
        <div className="bm-wrap">
          <div className="bm-invest-head bm-rv">
            <span className="bm-eyebrow">Investimento</span>
            <h2 className="bm-h2">
              Quatro caminhos. <em>Você escolhe até onde a gente vai.</em>
            </h2>
            <p className="bm-sub">
              A identidade do Ateliê é a base. A partir dela, dá pra somar a do Cartório e
              os sites das duas marcas. Todas as opções parcelam em até 12x no cartão.
            </p>
          </div>

          <div className="bm-plans">
            {/* PLANO 1: Identidade Ateliê */}
            <div className="bm-plan bm-rv">
              <h4>Opção 01</h4>
              <div className="bm-plan-name">
                Identidade do <em>Ateliê de Música</em>
              </div>
              <div className="bm-plan-price">
                <div className="bm-plan-amount">
                  <span className="bm-plan-cur">R$</span>
                  <span className="bm-plan-num">4.000</span>
                </div>
                <span className="bm-plan-meta">
                  ou em até <strong>12x sem juros</strong> no cartão
                </span>
              </div>
              <ul className="bm-plan-list">
                <li>Identidade visual completa do Ateliê</li>
                <li>Logo, paleta, tipografia, manual e aplicações</li>
                <li>Arquivos finais em todos os formatos</li>
                <li>Apresentação ao vivo do projeto</li>
                <li>Versão pronta para registro no INPI</li>
              </ul>
              <div className="bm-plan-cta">
                <a
                  href={waLink(MSG.atelie)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bm-plan-btn"
                >
                  Fechar essa opção
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* PLANO 2: Ateliê + Site */}
            <div className="bm-plan bm-rv">
              <h4>Opção 02</h4>
              <div className="bm-plan-name">
                Ateliê <em>+ site do Ateliê</em>
              </div>
              <div className="bm-plan-price">
                <div className="bm-plan-amount">
                  <span className="bm-plan-cur">R$</span>
                  <span className="bm-plan-num">5.500</span>
                </div>
                <span className="bm-plan-meta">
                  ou em até <strong>12x sem juros</strong> no cartão
                </span>
              </div>
              <ul className="bm-plan-list">
                <li>Tudo da Opção 01</li>
                <li>Site institucional do Ateliê de Música</li>
                <li>Otimizado para mobile e para Google</li>
                <li>Pronto para receber contato dos noivos</li>
                <li>Hospedagem do primeiro ano incluída</li>
              </ul>
              <div className="bm-plan-cta">
                <a
                  href={waLink(MSG.atelieSite)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bm-plan-btn"
                >
                  Fechar essa opção
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* PLANO 3: Duas identidades (DESTACADO) */}
            <div className="bm-plan bm-plan-featured bm-rv">
              <span className="bm-plan-flag">Mais escolhido</span>
              <h4>Opção 03</h4>
              <div className="bm-plan-name">
                Ateliê <em>+ Cartório e Afeto</em>
              </div>
              <div className="bm-plan-price">
                <div className="bm-plan-amount">
                  <span className="bm-plan-cur">R$</span>
                  <span className="bm-plan-num">7.000</span>
                </div>
                <span className="bm-plan-meta">
                  ou em até <strong>12x sem juros</strong> no cartão
                </span>
              </div>
              <ul className="bm-plan-list">
                <li>Identidade visual do Ateliê de Música</li>
                <li>Identidade visual do Cartório e Afeto</li>
                <li>Sistema visual coerente entre as duas marcas</li>
                <li>Manuais separados, um para cada</li>
                <li>Apresentação ao vivo das duas identidades</li>
                <li>Versão pronta para INPI nas duas marcas</li>
              </ul>
              <div className="bm-plan-cta">
                <a
                  href={waLink(MSG.duas)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bm-plan-btn"
                >
                  Fechar essa opção
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* PLANO 4: Tudo */}
            <div className="bm-plan bm-plan-premium bm-rv">
              <span className="bm-plan-flag bm-flag-premium">Mais completo</span>
              <h4>Opção 04</h4>
              <div className="bm-plan-name">
                Duas identidades <em>+ dois sites</em>
              </div>
              <div className="bm-plan-price">
                <div className="bm-plan-amount">
                  <span className="bm-plan-cur">R$</span>
                  <span className="bm-plan-num">9.000</span>
                </div>
                <span className="bm-plan-meta">
                  ou em até <strong>12x sem juros</strong> no cartão
                </span>
              </div>
              <ul className="bm-plan-list">
                <li>Tudo da Opção 03</li>
                <li>Site institucional do Ateliê de Música</li>
                <li>Site institucional do Cartório e Afeto</li>
                <li>Os dois otimizados para mobile e Google</li>
                <li>Hospedagem do primeiro ano incluída</li>
                <li>Universo digital completo, pronto para escalar</li>
              </ul>
              <div className="bm-plan-cta">
                <a
                  href={waLink(MSG.duasSites)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bm-plan-btn"
                >
                  Fechar essa opção
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <p
            className="bm-rv"
            style={{
              marginTop: '2.5rem',
              textAlign: 'center',
              color: 'var(--bm-text-faint)',
              fontSize: '0.88rem',
              maxWidth: '60ch',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Se preferir outra forma de pagamento (Pix à vista com desconto, entrada parcelada,
            etc), é só me chamar. A gente acha o formato que cabe.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bm-section bm-cta-final">
        <div className="bm-wrap">
          <h2 className="bm-h2">
            Bora começar a desenhar <em>essa história?</em>
          </h2>
          <p className="bm-sub">
            Escolha o caminho que faz sentido para o momento, ou me chama para conversar antes
            de decidir. O fechamento acontece direto no WhatsApp, sem burocracia.
          </p>
          <a
            href={waLink(MSG.duvida)}
            target="_blank"
            rel="noopener noreferrer"
            className="bm-btn"
          >
            Conversar no WhatsApp
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bm-footer">
        <div className="bm-wrap">
          <span>Proposta elaborada por Leonardo Ferreira · Junho 2026</span>
          <a href="https://www.leonardoferreirr.com.br" target="_blank" rel="noopener noreferrer">
            leonardoferreirr.com.br
          </a>
        </div>
      </footer>
    </main>
  );
}
