'use client';

import { useEffect, useState } from 'react';

const WA = '5534997697377'; // Leonardo

const MSG = {
  avulso:
    'Oi Leonardo, vi a proposta do CRM Calaza Doreto. Quero fechar a entrega única.',
  recorrente:
    'Oi Leonardo, vi a proposta do CRM Calaza Doreto. Quero fechar o acompanhamento recorrente.',
};

function waLink(text: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
}

type Model = 'avulso' | 'recorrente';

function ToggleSwitch({
  model,
  onChange,
}: {
  model: Model;
  onChange: (m: Model) => void;
}) {
  return (
    <div className="cd-toggle" role="tablist" aria-label="Modelo da proposta">
      <button
        role="tab"
        aria-selected={model === 'avulso'}
        className={model === 'avulso' ? 'active' : ''}
        onClick={() => onChange('avulso')}
      >
        Entrega única
      </button>
      <button
        role="tab"
        aria-selected={model === 'recorrente'}
        className={model === 'recorrente' ? 'active' : ''}
        onClick={() => onChange('recorrente')}
      >
        Acompanhamento recorrente
      </button>
      <span
        className="cd-toggle-thumb"
        style={{
          left: model === 'avulso' ? '0.32rem' : 'calc(50% + 0.1rem)',
          width: 'calc(50% - 0.42rem)',
        }}
      />
    </div>
  );
}

function ScreenFeature({
  n,
  tag,
  title,
  desc,
  bullets,
  image,
  alt,
  flip = false,
}: {
  n: string;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
  alt: string;
  flip?: boolean;
}) {
  return (
    <div className={`cd-screen cd-rv ${flip ? 'flip' : ''}`}>
      <div className="cd-screen-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={alt} loading="lazy" />
      </div>
      <div className="cd-screen-body">
        <h3>
          <span className="cd-screen-num">{n}</span>
          {title}
        </h3>
        <p>{desc}</p>
        <ul className="cd-bullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ModelAvulso() {
  return (
    <div className="cd-model-content" key="avulso">
      <div className="cd-model-head cd-rv">
        <h2 className="cd-h2">
          Entrega única, <em>chave na mão.</em>
        </h2>
        <p className="cd-sub">
          O CRM completo, instalado no domínio que vocês escolherem, com todos os módulos
          listados acima funcionando em produção. Vocês recebem o sistema, o acesso de admin
          e a documentação. A partir daí, o time interno toma conta.
        </p>
      </div>

      <div className="cd-price-banner cd-rv">
        <div className="cd-price-banner-amount">
          <span className="cd-price-cur">R$</span>
          <span className="cd-price-num">5.000</span>
        </div>
        <div className="cd-price-banner-meta">
          em até <strong>12x sem juros</strong> no cartão
        </div>
      </div>

      <div className="cd-cards">
        <div className="cd-card cd-rv">
          <h4>Sistema completo em produção</h4>
          <p>Os seis módulos navegáveis acima, deploy em domínio próprio, autenticação ativa e identidade visual já calibrada com a marca Calaza Doreto.</p>
          <ul className="cd-bullets">
            <li>Dashboard, Cobranças, Clientes, Contratos, NFs e Régua</li>
            <li>White-label aplicado: logo, paleta, favicon e título</li>
            <li>Deploy em produção com SSL na Vercel</li>
            <li>Documentação de uso e estrutura técnica</li>
          </ul>
        </div>

        <div className="cd-card cd-rv">
          <h4>2 a 4 semanas até o go-live</h4>
          <p>Trabalho dividido em fases: kickoff e alinhamento, integrações (Supabase, Asaas, NFS-e) e refinamento final com a equipe usando.</p>
          <ul className="cd-bullets">
            <li>Semana 1: kickoff, acesso e alinhamento de identidade</li>
            <li>Semana 2: integrações Asaas e NFS-e</li>
            <li>Semana 3: validação com casos reais da Calaza</li>
            <li>Semana 4: go-live e handover</li>
          </ul>
        </div>

        <div className="cd-card cd-rv">
          <h4>30 dias de ajuste pós-entrega</h4>
          <p>Bug, comportamento inesperado, ajuste fino de fluxo: cobertos sem custo nos primeiros 30 dias após o go-live.</p>
          <ul className="cd-bullets">
            <li>Correção de bugs reportados</li>
            <li>Ajustes visuais finos (cores, espaçamento, textos)</li>
            <li>Suporte por WhatsApp em horário comercial</li>
          </ul>
        </div>

        <div className="cd-card cd-rv">
          <h4>O que fica fora do escopo</h4>
          <p>Pra evitar surpresas, o que está fora desse contrato (e pode entrar como projeto novo ou no modelo recorrente):</p>
          <ul className="cd-bullets">
            <li>Novas integrações além de Asaas e NFS-e</li>
            <li>Novos módulos (agenda, contratos jurídicos, mensageria)</li>
            <li>Suporte continuado após os 30 dias</li>
            <li>Hospedagem após o primeiro ano</li>
          </ul>
        </div>
      </div>

      <div className="cd-roadmap cd-rv">
        <h3>Quando esse modelo faz sentido</h3>
        <p>
          Vocês querem o sistema rodando, têm clareza do escopo e querem autonomia depois. Time
          interno (ou parceiro de tecnologia) cuida da operação do dia a dia, das pequenas
          evoluções e do suporte aos usuários a partir do mês 2.
        </p>
      </div>
    </div>
  );
}

function ModelRecorrente() {
  return (
    <div className="cd-model-content" key="recorrente">
      <div className="cd-model-head cd-rv">
        <h2 className="cd-h2">
          Acompanhamento contínuo, <em>o sistema cresce com vocês.</em>
        </h2>
        <p className="cd-sub">
          Vocês recebem o CRM como base e mantém um vínculo recorrente comigo pra evoluir o
          sistema. Conforme a operação cresce, novos módulos entram e o CRM deixa de ser só
          financeiro: vira o centro do ecossistema da Calaza Doreto.
        </p>
      </div>

      <div className="cd-tiers">
        <div className="cd-tier cd-rv">
          <h4>Light</h4>
          <div className="cd-tier-hours">
            4h <small>por semana</small>
          </div>
          <div className="cd-tier-price">
            <span className="cd-tier-rate">R$ 100/hora</span>
            <span className="cd-tier-monthly">≈ R$ 1.600/mês</span>
          </div>
          <p className="cd-tier-sub">
            Manter o CRM rodando, fazer ajustes pontuais e responder ao time quando precisarem.
          </p>
          <ul className="cd-bullets">
            <li>Correções e ajustes finos</li>
            <li>Reuniões quinzenais de alinhamento</li>
            <li>SLA de atendimento em até 4 horas úteis</li>
            <li>Pequenos refinamentos de UX</li>
            <li>Acesso direto via WhatsApp em horário comercial</li>
          </ul>
          <div className="cd-tier-fit">
            <strong>Quando encaixa:</strong> operação estável, equipe acostumada com o
            sistema, evolução em ritmo lento.
          </div>
        </div>

        <div className="cd-tier cd-tier-featured cd-rv">
          <span className="cd-tier-flag">Recomendado</span>
          <h4>Standard</h4>
          <div className="cd-tier-hours">
            8h <small>por semana</small>
          </div>
          <div className="cd-tier-price">
            <span className="cd-tier-rate">R$ 90/hora</span>
            <span className="cd-tier-monthly">≈ R$ 2.880/mês</span>
          </div>
          <p className="cd-tier-sub">
            Evolução contínua: novas integrações, melhorias de fluxo e relatórios sob medida
            entrando todo mês.
          </p>
          <ul className="cd-bullets">
            <li>Tudo do Light</li>
            <li>Reuniões quinzenais de roadmap</li>
            <li>1 entrega de melhoria a cada 2 semanas</li>
            <li>Integrações novas (e-mail, WhatsApp, etc)</li>
            <li>Dashboards e relatórios sob demanda</li>
          </ul>
          <div className="cd-tier-fit">
            <strong>Quando encaixa:</strong> escritório crescendo, sentindo dor pra escalar, e
            quer evoluir o sistema sem montar time interno de tecnologia.
          </div>
        </div>

        <div className="cd-tier cd-rv">
          <h4>Deep</h4>
          <div className="cd-tier-hours">
            16h <small>por semana</small>
          </div>
          <div className="cd-tier-price">
            <span className="cd-tier-rate">R$ 80/hora</span>
            <span className="cd-tier-monthly">≈ R$ 5.120/mês</span>
          </div>
          <p className="cd-tier-sub">
            Eu virtualmente como o head de produto da Calaza Doreto. O CRM evolui pra ser o
            sistema central do escritório.
          </p>
          <ul className="cd-bullets">
            <li>Tudo do Standard</li>
            <li>Construção de novos módulos completos</li>
            <li>Reuniões semanais com sócios e líderes</li>
            <li>Roadmap trimestral com OKRs definidos</li>
          </ul>
          <div className="cd-tier-fit">
            <strong>Quando encaixa:</strong> visão de transformar o CRM em sistema central do
            escritório (contratos, agenda, mensageria, financeiro tudo em um só lugar).
          </div>
        </div>
      </div>

      <div className="cd-roadmap cd-rv">
        <h3>Para onde o CRM pode evoluir</h3>
        <p>
          Hoje o foco é cobrança. Conforme o relacionamento amadurece, o CRM absorve outras
          frentes da Calaza Doreto até virar um único lugar pra rodar o escritório.
        </p>
        <div className="cd-road-track">
          <div className="cd-road-step cd-road-now">
            <div className="cd-road-dot" />
            <div className="cd-road-n">Hoje</div>
            <h5>Cobrança financeira</h5>
            <p>Régua, NF, dashboard de inadimplência. O que já está pronto.</p>
          </div>
          <div className="cd-road-step">
            <div className="cd-road-dot" />
            <div className="cd-road-n">Mês 1 a 3</div>
            <h5>Contratos vivos</h5>
            <p>Aditivos, reajustes automáticos, renovação e alerta de fim de contrato.</p>
          </div>
          <div className="cd-road-step">
            <div className="cd-road-dot" />
            <div className="cd-road-n">Mês 3 a 6</div>
            <h5>Atendimento</h5>
            <p>Disparos automáticos por WhatsApp e e-mail, integrados à régua de cobrança.</p>
          </div>
          <div className="cd-road-step">
            <div className="cd-road-dot" />
            <div className="cd-road-n">Mês 6 a 9</div>
            <h5>Agenda e processos</h5>
            <p>Audiências, prazos processuais, ligação direta com o cliente no CRM.</p>
          </div>
          <div className="cd-road-step">
            <div className="cd-road-dot" />
            <div className="cd-road-n">Mês 9+</div>
            <h5>Ecossistema completo</h5>
            <p>BI executivo, gestão de pessoas, fluxos jurídicos: a operação inteira aqui.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalazaDoretoProposalPage() {
  const [model, setModel] = useState<Model>('avulso');

  // Reveal on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('cd-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.cd-rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [model]);

  return (
    <main className="cd-page">
      {/* HERO */}
      <section className="cd-hero">
        <div className="cd-wrap">
          <span className="cd-eyebrow">Olá, pessoal da Calaza Doreto! Apresento para vocês</span>
          <h1 className="cd-h1">
            Um sistema <em>sob medida</em> pra cobrar bem, sem virar planilha.
          </h1>
          <p className="cd-lead">
            A demonstração que o Bruno viu já está rodando: dashboard executivo, kanban de
            cobranças, NFs sincronizadas e régua automática. Esta proposta apresenta duas
            formas de receber esse sistema na Calaza Doreto.
          </p>
        </div>
      </section>

      {/* O QUE É O CRM */}
      <section className="cd-section cd-screens">
        <div className="cd-wrap">
          <div className="cd-model-head cd-rv">
            <h2 className="cd-h2">
              Tudo que já está <em>pronto e rodando.</em>
            </h2>
            <p className="cd-sub">
              Seis módulos navegáveis em produção. Não é mockup, é o sistema real, com
              autenticação, dados de exemplo e identidade da Calaza aplicada.
            </p>
          </div>

          <ScreenFeature
            n="01"
            tag="Visão executiva"
            title="Dashboard"
            desc="Quanto entrou, quanto vai entrar, quem está devendo e o que precisa da sua atenção hoje. Tudo em uma tela só."
            bullets={[
              'Previsto do mês, recebido até hoje e MRR ativo',
              'Taxa de inadimplência com alerta visual',
              'Bloco "Precisa de você": cobranças que travam o fluxo',
              'Pipeline da competência por status (a emitir, enviada, paga, vencida)',
            ]}
            image="/calazadoreto/screen-dashboard.png"
            alt="Dashboard executivo do CRM Calaza Doreto"
            flip={false}
          />

          <ScreenFeature
            n="02"
            tag="Operação"
            title="Cobranças"
            desc="Kanban com toda a régua: emitir, enviada, paga, vencida, em cobrança. Cada cliente aparece como um card que se move pelas colunas conforme o status muda."
            bullets={[
              'Filtro por competência (mês de referência)',
              'Drag-and-drop entre status quando necessário',
              'Drawer lateral com histórico e ações rápidas',
              'Sinalização visual de atraso (D+3, D+7, D+15)',
            ]}
            image="/calazadoreto/screen-cobrancas.png"
            alt="Kanban de cobranças com cards por status"
            flip={true}
          />

          <ScreenFeature
            n="03"
            tag="Cadastro central"
            title="Clientes"
            desc="Lista completa com busca, filtros (ativos, inadimplentes, suspensos) e drawer com tudo que importa de cada cliente, sem precisar abrir 5 abas."
            bullets={[
              'Auto-fill via BrasilAPI ao digitar o CNPJ',
              'Filtros por status e segmento',
              'Histórico de pagamentos, NFs e mensagens em um drawer só',
              'Ações rápidas: gerar cobrança, abrir WhatsApp, baixar NF',
            ]}
            image="/calazadoreto/screen-clientes.png"
            alt="Lista de clientes com drawer detalhado"
            flip={false}
          />

          <ScreenFeature
            n="04"
            tag="Contratos vigentes"
            title="Contratos"
            desc="Cada contrato com tipo (honorários, contencioso), escopo, MRR e cliente vinculado. A base que alimenta a régua de cobrança automática."
            bullets={[
              'Tipos: honorários, contencioso, projeto',
              'MRR (receita mensal recorrente) por contrato',
              'Vínculo direto com o cliente correspondente',
              'Base pra reajuste e renovação automatizados (fase 2)',
            ]}
            image="/calazadoreto/screen-contratos.png"
            alt="Tabela de contratos vigentes"
            flip={true}
          />

          <ScreenFeature
            n="05"
            tag="Fiscal"
            title="Notas Fiscais"
            desc="Todas as NFs emitidas em um lugar, com filtros por status. Quando alguma é rejeitada pela prefeitura, o motivo aparece inline pra resolver na hora."
            bullets={[
              'Filtros: emitidas, enviadas, rejeitadas, canceladas',
              'Motivo de rejeição visível inline',
              'Ações: PDF, XML, reemitir, cancelar',
              'Integração nativa com NFS-e municipal (fase 2)',
            ]}
            image="/calazadoreto/screen-notas-fiscais.png"
            alt="Listagem de notas fiscais com filtros e ações"
            flip={false}
          />

          <ScreenFeature
            n="06"
            tag="Automação"
            title="Régua de cobrança"
            desc="Timeline visual com os disparos automáticos (D-3, D0, D+3, D+7, D+15) e o editor de templates pra cada momento. O time deixa de cobrar manualmente."
            bullets={[
              'Timeline visual de cada disparo (e-mail, WhatsApp)',
              'Editor de templates por estágio da régua',
              '6 regras gerais (feriados, fim de semana, atrasos limite)',
              'Histórico de envios por cliente e por contrato',
            ]}
            image="/calazadoreto/screen-regua.png"
            alt="Régua de cobrança com timeline visual"
            flip={true}
          />
        </div>
      </section>

      {/* MODELOS */}
      <section className="cd-section cd-models" id="modelos">
        <div className="cd-wrap">
          <div className="cd-sticky-toggle">
            <ToggleSwitch model={model} onChange={setModel} />
          </div>

          {model === 'avulso' ? <ModelAvulso /> : <ModelRecorrente />}
        </div>
      </section>

      {/* STACK TÉCNICA */}
      <section className="cd-section cd-stack">
        <div className="cd-wrap">
          <div className="cd-stack-grid">
            <div className="cd-rv">
              <h2 className="cd-h2">
                Construído pra <em>durar.</em>
              </h2>
              <p className="cd-sub">
                Sem código mágico, sem framework exótico. Tudo em tecnologias que qualquer
                desenvolvedor sério consegue dar manutenção.
              </p>
              <div className="cd-stack-pills">
                <span className="cd-pill">Next.js 14</span>
                <span className="cd-pill">React 18</span>
                <span className="cd-pill">TypeScript</span>
                <span className="cd-pill">Supabase</span>
                <span className="cd-pill">PostgreSQL</span>
                <span className="cd-pill">Vercel</span>
                <span className="cd-pill">RLS Multi-tenant</span>
              </div>
            </div>

            <ul className="cd-stack-list cd-rv">
              <li>
                <span className="k">Frontend</span>
                <span className="v">
                  Next.js 14 com App Router, React Server Components, TypeScript estrito,
                  dark/light theme nativo.
                </span>
              </li>
              <li>
                <span className="k">Banco de dados</span>
                <span className="v">
                  Supabase (Postgres gerenciado) com Row Level Security multi-tenant: cada
                  escritório vê só seus dados.
                </span>
              </li>
              <li>
                <span className="k">Hospedagem</span>
                <span className="v">
                  Vercel com CDN global, SSL automático e deploy contínuo direto do GitHub.
                </span>
              </li>
              <li>
                <span className="k">Integrações</span>
                <span className="v">
                  Asaas (cobrança), API de NFS-e municipal, BrasilAPI (auto-fill de CNPJ),
                  WhatsApp via Twilio ou Z-API (fase 2).
                </span>
              </li>
              <li>
                <span className="k">Segurança</span>
                <span className="v">
                  Auth com sessão por escritório, RLS no Postgres, logs de auditoria, backup
                  diário automático.
                </span>
              </li>
              <li>
                <span className="k">Propriedade</span>
                <span className="v">
                  Todo o código fica em repositório da Calaza Doreto (entrega via GitHub). Vocês
                  são donos do produto.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cd-section cd-cta-final">
        <div className="cd-wrap">
          <h2 className="cd-h2">
            Vamos colocar isso <em>de pé.</em>
          </h2>
          <p className="cd-sub">
            Escolha a modalidade que faz sentido pro momento da Calaza Doreto. O fechamento
            acontece direto no WhatsApp comigo, sem fricção.
          </p>
          <div className="cd-cta-buttons">
            <a
              href={waLink(MSG.avulso)}
              target="_blank"
              rel="noopener noreferrer"
              className="cd-btn"
            >
              Fechar entrega única
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href={waLink(MSG.recorrente)}
              target="_blank"
              rel="noopener noreferrer"
              className="cd-btn cd-btn-ghost"
            >
              Fechar acompanhamento
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cd-footer">
        <div className="cd-wrap">
          <span>Proposta elaborada por Leonardo Ferreira · Junho 2026</span>
          <a href="https://www.leonardoferreirr.com.br" target="_blank" rel="noopener noreferrer">
            leonardoferreirr.com.br
          </a>
        </div>
      </footer>
    </main>
  );
}
