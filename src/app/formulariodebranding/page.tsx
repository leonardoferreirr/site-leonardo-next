'use client';

import { useState } from 'react';

const WHATSAPP_FALLBACK =
  'https://wa.me/5534936180691?text=Oi%20L%C3%A9o!%20Tentei%20enviar%20o%20formul%C3%A1rio%20de%20branding%20mas%20deu%20erro.%20Posso%20te%20mandar%20por%20aqui?';

// País: bandeira, nome, código e quantos dígitos o número nacional costuma ter.
const COUNTRIES = [
  { code: '55', flag: '🇧🇷', name: 'Brasil', digits: 11, sample: '11999998888' },
  { code: '1', flag: '🇺🇸', name: 'EUA / Canadá', digits: 10, sample: '2025550173' },
  { code: '351', flag: '🇵🇹', name: 'Portugal', digits: 9, sample: '912345678' },
  { code: '34', flag: '🇪🇸', name: 'Espanha', digits: 9, sample: '612345678' },
  { code: '44', flag: '🇬🇧', name: 'Reino Unido', digits: 10, sample: '7400123456' },
  { code: '52', flag: '🇲🇽', name: 'México', digits: 10, sample: '5512345678' },
  { code: '54', flag: '🇦🇷', name: 'Argentina', digits: 10, sample: '1123456789' },
  { code: '353', flag: '🇮🇪', name: 'Irlanda', digits: 9, sample: '851234567' },
  { code: '61', flag: '🇦🇺', name: 'Austrália', digits: 9, sample: '412345678' },
  { code: '', flag: '🌐', name: 'Outro país', digits: 15, sample: 'código + número' },
];

const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '8px' };
const fieldGap: React.CSSProperties = { marginBottom: '24px' };

function Field({
  label,
  name,
  required,
  placeholder,
  textarea,
  type = 'text',
  hint,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  type?: string;
  hint?: string;
}) {
  return (
    <div style={fieldGap}>
      <label className="ds-body-sm" style={labelStyle}>
        {label} {required ? <span style={{ color: 'var(--ds-accent, #e63946)' }}>*</span> : null}
      </label>
      {hint ? (
        <p className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)', margin: '0 0 10px 0', fontSize: '0.85rem', opacity: 0.85 }}>
          {hint}
        </p>
      ) : null}
      {textarea ? (
        <textarea
          name={name}
          className="ds-input"
          rows={3}
          required={required}
          placeholder={placeholder || 'Escreva aqui'}
          style={{ resize: 'vertical' }}
        />
      ) : (
        <input type={type} name={name} className="ds-input" required={required} placeholder={placeholder || 'Escreva aqui'} />
      )}
    </div>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 className="ds-h3" style={{ fontSize: '1.5rem', marginBottom: sub ? '8px' : 0 }}>
        {children}
      </h3>
      {sub ? (
        <p className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)', margin: 0 }}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export default function FormularioDeBrandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [countryCode, setCountryCode] = useState('55');
  const [phone, setPhone] = useState('');
  const country = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const get = (k: string) => String(formData.get(k) || '').trim();

    const telefone = phone.trim() ? `${country.code ? '+' + country.code + ' ' : ''}${phone.trim()} (${country.name})` : '';

    const payload: Record<string, string> = {
      // Sobre você e a marca
      nome: get('name'),
      email_contato: get('email'),
      telefone,
      marca: get('brand'),
      segmento: get('segment'),
      site_e_redes: get('links'),
      tempo_de_existencia: get('age'),
      tamanho_do_time: get('team'),

      // O negócio
      o_que_faz_e_como_ganha: get('business_what'),
      como_funciona_a_venda: get('business_sales'),
      de_onde_sai_para_onde_vai: get('business_ab'),
      o_que_ja_funciona: get('business_keep'),
      por_que_marca_agora: get('business_why_now'),
      maior_risco: get('business_risk'),
      datas_ou_metas: get('business_deadline'),

      // Quem quer atingir
      cliente_ideal: get('audience_who'),
      dor_real: get('audience_pain'),
      como_resolve_hoje: get('audience_alt'),
      onde_busca_e_confia: get('audience_trust'),
      cliente_que_nao_quer: get('audience_not'),

      // Mercado e diferenciação
      promessa: get('value_promise'),
      concorrentes: get('value_competitors'),
      fa_e_hater: get('value_fan_hater'),
      por_que_diferente_e_verdadeira: get('value_diff'),

      // História e personalidade
      como_a_marca_nasceu: get('story_origin'),
      eu_nunca_vou: get('story_never'),
      o_que_mais_me_move: get('story_drive'),
      legado_30_anos: get('story_legacy'),
      personalidade: get('story_personality'),
      marcas_que_admira: get('story_admire'),

      // Identidade e aplicações
      identidade_atual: get('id_existing'),
      cores_e_fontes: get('id_colors'),
      sensacoes: get('id_feel'),
      onde_vai_aparecer: get('id_apps'),
      mais_alguma_coisa: get('id_extra'),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch('/api/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json().catch(() => ({} as { success?: boolean }));
      if (response.ok && (data as { success?: boolean }).success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(true);
      }
    } catch {
      clearTimeout(timeoutId);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="ds-container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
      <a
        href="/"
        className="ds-body-sm"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--ds-text-secondary)',
          textDecoration: 'none',
          marginBottom: '48px',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Voltar ao início
      </a>

      <div className="ds-section-title" style={{ marginBottom: '48px' }}>
        <h1 className="ds-h2 ds-text-stroke">Formulário de Branding</h1>
        <p className="ds-body" style={{ maxWidth: '640px', margin: '24px auto 0 auto' }}>
          Esse é o ponto de partida do projeto da sua identidade visual. Quanto mais verdade você colocar aqui, mais a
          marca vai ter a sua cara. Não existe resposta certa ou errada, responda do seu jeito. Os campos com asterisco
          são obrigatórios, o resto é bem-vindo.
        </p>
      </div>

      {submitted ? (
        <div className="ds-glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="ds-h3" style={{ marginBottom: '12px' }}>Recebido. Obrigado!</h2>
          <p className="ds-body" style={{ color: 'var(--ds-text-secondary)' }}>
            Suas respostas chegaram aqui comigo. Vou analisar tudo e te chamar para a conversa de alinhamento. Se quiser
            adiantar, é só me chamar no WhatsApp.
          </p>
          <a
            href="https://wa.me/5534936180691?text=Oi%20L%C3%A9o!%20Acabei%20de%20enviar%20o%20formul%C3%A1rio%20de%20branding."
            target="_blank"
            rel="noopener noreferrer"
            className="ds-btn ds-btn-primary"
            style={{ display: 'inline-block', marginTop: '24px', border: 'none', padding: '16px 28px', textDecoration: 'none' }}
          >
            Falar no WhatsApp
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="ds-glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Sobre você e a marca */}
          <div style={{ marginBottom: '48px' }}>
            <SectionTitle sub="Para eu saber com quem e com qual marca estou falando.">Sobre você e a marca</SectionTitle>
            <Field label="Seu nome" name="name" required />
            <Field label="Seu melhor email" name="email" type="email" required hint="É para onde eu vou te responder." />

            {/* Telefone / WhatsApp com seletor de país */}
            <div style={fieldGap}>
              <label className="ds-body-sm" style={labelStyle}>Telefone / WhatsApp</label>
              <p className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)', margin: '0 0 10px 0', fontSize: '0.85rem', opacity: 0.85 }}>
                Se preferir contato por e-mail ou SMS, sem problema, esse campo é opcional.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <select
                  className="ds-input"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  aria-label="País"
                  style={{ flex: '0 0 auto', width: 'auto', minWidth: '170px' }}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.code}>
                      {c.flag} {c.name} {c.code ? `+${c.code}` : ''}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  inputMode="numeric"
                  className="ds-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d\s()-]/g, ''))}
                  maxLength={country.digits + 6}
                  placeholder={country.sample}
                  aria-label="Número"
                  style={{ flex: '1 1 200px' }}
                />
              </div>
              <p className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)', margin: '8px 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
                {country.code
                  ? `${country.name}: ${country.digits} dígitos (com DDD/área), sem o +${country.code}.`
                  : 'Inclua o código do país antes do número.'}
              </p>
            </div>

            <Field label="Nome da marca ou projeto" name="brand" required />
            <Field label="O que a marca vende, o segmento dela" name="segment" required />
            <Field label="Site e redes sociais, se já tiver" name="links" />
            <Field label="Há quanto tempo a marca existe" name="age" />
            <Field label="Quantas pessoas fazem parte do time" name="team" />
          </div>

          {/* O negócio */}
          <div style={{ marginBottom: '48px' }}>
            <SectionTitle sub="Marca existe para apoiar o negócio, então preciso entender o negócio primeiro.">O negócio</SectionTitle>
            <Field label="Em uma frase, o que a empresa faz e como ela ganha dinheiro hoje?" name="business_what" textarea />
            <Field label="Como funciona a venda na prática: onde o cliente compra, ticket médio, é compra única ou recorrente?" name="business_sales" textarea />
            <Field label="De onde a marca precisa sair e aonde precisa chegar nos próximos 1 a 3 anos?" name="business_ab" textarea hint="Pense no negócio, não no logo." />
            <Field label="O que já está funcionando hoje e não pode se perder numa mudança de marca?" name="business_keep" textarea />
            <Field label="O que te incomoda hoje e te fez decidir investir em marca agora? Por que agora?" name="business_why_now" textarea />
            <Field label="Se daqui a 3 anos der tudo errado, qual teria sido o motivo mais provável?" name="business_risk" textarea />
            <Field label="Tem alguma data, lançamento ou meta concreta amarrada a esse projeto?" name="business_deadline" />
          </div>

          {/* Quem você quer atingir */}
          <div style={{ marginBottom: '48px' }}>
            <SectionTitle sub="Quem fala com todo mundo não fala com ninguém.">Quem você quer atingir</SectionTitle>
            <Field label="Descreva o cliente que você mais quer atrair, a pessoa específica: idade, rotina, onde vive, o que faz" name="audience_who" textarea required />
            <Field label="O que essa pessoa tenta resolver na vida dela que o seu produto toca? A dor real, não só 'ela quer o produto'" name="audience_pain" textarea />
            <Field label="Antes de te conhecer, como ela resolve esse problema hoje? O que ela usa, compra ou faz no lugar?" name="audience_alt" textarea />
            <Field label="Onde ela busca informação e em quem ela confia antes de comprar?" name="audience_trust" textarea />
            <Field label="Tem um tipo de cliente que você NÃO quer? Descreva." name="audience_not" textarea />
          </div>

          {/* Mercado e diferenciação */}
          <div style={{ marginBottom: '48px' }}>
            <SectionTitle sub="O que te coloca num lugar que ninguém mais ocupa.">Mercado e diferenciação</SectionTitle>
            <Field label="Qual é a promessa da sua marca: que transformação o cliente vive depois de comprar de você?" name="value_promise" textarea required />
            <Field label="Quem mais faz essa mesma promessa? Liste de 3 a 5 concorrentes pelo nome" name="value_competitors" textarea />
            <Field label="Para cada concorrente, o que um fã apaixonado diria sobre ele, e o que um hater diria?" name="value_fan_hater" textarea />
            <Field label="Por que a sua promessa é diferente da deles, e por que ela é verdadeira? Que prova você tem?" name="value_diff" textarea />
          </div>

          {/* História e personalidade */}
          <div style={{ marginBottom: '48px' }}>
            <SectionTitle sub="A parte que ninguém pode copiar, porque é só sua.">A história e a personalidade da marca</SectionTitle>
            <Field label="Como e por que essa marca nasceu? O que estava acontecendo na sua vida, qual foi o ponto de virada que te fez começar?" name="story_origin" textarea />
            <Field label="Complete sem pensar muito: 'Nessa marca eu nunca vou...'" name="story_never" />
            <Field label="Complete: 'O que mais me move nesse projeto é...'" name="story_drive" />
            <Field label="Imagine que daqui a 30 anos a marca encerra. O que você gostaria que dissessem que ela representou? Por que ela importou?" name="story_legacy" textarea />
            <Field label="Se a sua marca fosse uma pessoa, como ela seria? Escolha de 5 a 7 características" name="story_personality" textarea hint="Ex.: séria, ousada, acolhedora, técnica, divertida, sofisticada, direta." />
            <Field label="Quais marcas, de qualquer segmento, você admira e o que especificamente em cada uma? O tom, o design, o jeito de falar, o preço, a postura?" name="story_admire" textarea />
          </div>

          {/* Identidade e aplicações */}
          <div style={{ marginBottom: '40px' }}>
            <SectionTitle sub="Os limites práticos e os gostos, para a parte visual.">Identidade visual e aplicações</SectionTitle>
            <Field label="Já existe alguma identidade visual? Algo que deva ser mantido?" name="id_existing" textarea />
            <Field label="Cores ou fontes que você ama, ou que detesta?" name="id_colors" textarea />
            <Field label="Quais sensações a identidade deve transmitir?" name="id_feel" textarea hint="É matéria-prima, vamos validar isso juntos depois." />
            <Field label="Onde a identidade vai aparecer? (site, redes, embalagem, fachada)" name="id_apps" textarea />
            <Field label="Tem algo relevante que nenhuma pergunta acima cobriu?" name="id_extra" textarea />
          </div>

          {error && (
            <div
              role="alert"
              style={{
                marginBottom: '24px',
                padding: '20px 24px',
                border: '1px solid rgba(230, 57, 70, 0.4)',
                background: 'rgba(230, 57, 70, 0.08)',
                borderRadius: '12px',
              }}
            >
              <p className="ds-body-sm" style={{ margin: '0 0 12px 0', color: '#e63946', fontWeight: 600 }}>
                Algo deu errado no envio.
              </p>
              <p className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)', margin: '0 0 12px 0' }}>
                Tenta de novo, ou me manda direto pelo WhatsApp que eu resolvo.
              </p>
              <a
                href={WHATSAPP_FALLBACK}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn ds-btn-primary"
                style={{ border: 'none', padding: '12px 20px', textDecoration: 'none', display: 'inline-block' }}
              >
                Falar no WhatsApp
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="ds-btn ds-btn-primary"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              padding: '20px',
              fontSize: '1rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar formulário'}
          </button>
        </form>
      )}
    </main>
  );
}
