'use client';

import { useState } from 'react';
import { Link } from '@/routing';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTranslations } from 'next-intl';

const WEB3FORMS_KEY = 'd2607090-4ff0-49c9-abf0-5b95c9b62afc';
const WHATSAPP_FALLBACK = 'https://wa.me/5534936180691?text=Oi%20L%C3%A9o!%20Tentei%20enviar%20o%20formul%C3%A1rio%20de%20or%C3%A7amento%20mas%20deu%20erro.%20Posso%20falar%20com%20voc%C3%AA%20por%20aqui?';

export default function OrcamentoPage() {
  const { setRef } = useIntersectionObserver();
  const t = useTranslations('Form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    const formData = new FormData(e.currentTarget);

    const payload: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: 'Novo orcamento — leonardoferreirr.com.br',
      from_name: String(formData.get('name') || 'Lead Site Leonardo'),
      email: String(formData.get('email') || 'no-reply@leonardoferreirr.com.br'),
      nome: String(formData.get('name') || ''),
      email_lead: String(formData.get('email') || ''),
      whatsapp: String(formData.get('whatsapp') || ''),
      instagram: String(formData.get('instagram') || ''),
      empresa: String(formData.get('company') || ''),
      funcionarios: String(formData.get('employees') || ''),
      produtos_servicos: String(formData.get('products') || ''),
      como_encontrou: String(formData.get('howFound') || ''),
      faturamento_mensal: String(formData.get('revenue') || ''),
      mensagem: String(formData.get('message') || ''),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({} as { success?: boolean }));

      if (response.ok && (data as { success?: boolean }).success) {
        setSubmitted(true);
      } else {
        console.error('Web3Forms response not ok:', response.status, data);
        setError(true);
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Erro no submit:', err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError(false);
  };

  return (
    <>
      <section className="ds-container" style={{ paddingTop: '80px', paddingBottom: 0 }}>
        {/* Voltar */}
        <Link id="voltar-inicio-link" href="/" className="ds-body-sm fade-in-up" ref={setRef(0)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--ds-text-secondary)', textDecoration: 'none', marginBottom: '64px', transition: 'color var(--speed-fast)' }}>
          <i data-feather="arrow-left" style={{ width: '16px', height: '16px' }}></i> {t('back_home')}
        </Link>
      </section>

      {/* 7. FORMULÁRIO DE INVESTIMENTO */}
      <section id="orcamento" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
        {/* Fill Background - Removed GIF completely! */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -2, background: 'var(--ds-bg-color)' }}></div>

        <div className="ds-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="ds-section-title fade-in-up" ref={setRef(1)} style={{ marginBottom: '64px' }}>
            <h2 className="ds-h2 ds-text-stroke">{t('title')}</h2>
            <p className="ds-body" style={{ maxWidth: '600px', margin: '24px auto 0 auto' }}>{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="ds-glass-card fade-in-up delay-1" ref={setRef(2)} style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Bloco 1: Dados de Contato */}
            <div style={{ marginBottom: '48px' }}>
              <h3 className="ds-h3" style={{ marginBottom: '24px', fontSize: '1.5rem' }}>{t('contact_info')}</h3>
              <div className="ds-grid ds-grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('full_name')}</label>
                  <input type="text" name="name" className="ds-input" placeholder={t('type_here')} required />
                </div>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('email')}</label>
                  <input type="email" name="email" className="ds-input" placeholder={t('type_here')} required />
                </div>
              </div>
              <div className="ds-grid" style={{ gap: '24px', gridTemplateColumns: '1fr' }}>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('whatsapp')}</label>
                  <input type="text" name="whatsapp" className="ds-input" placeholder={t('type_here')} />
                </div>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('instagram')}</label>
                  <input type="text" name="instagram" className="ds-input" placeholder={t('type_here')} />
                </div>
              </div>
            </div>

            {/* Bloco 2: Dados da empresa */}
            <div style={{ marginBottom: '48px' }}>
              <h3 className="ds-h3" style={{ marginBottom: '24px', fontSize: '1.5rem' }}>{t('company_data')}</h3>
              <div className="ds-grid ds-grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('company_name')}</label>
                  <input type="text" name="company" className="ds-input" placeholder={t('type_here')} required />
                </div>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('employees')}</label>
                  <select name="employees" className="ds-input" required defaultValue="">
                    <option value="" disabled>{t('select_option')}</option>
                    <option value="1-5">{t('emp_1_5')}</option>
                    <option value="6-20">{t('emp_6_20')}</option>
                    <option value="21-50">{t('emp_21_50')}</option>
                    <option value="50+">{t('emp_50_plus')}</option>
                  </select>
                </div>
              </div>
              <div className="ds-grid" style={{ gap: '24px', gridTemplateColumns: '1fr' }}>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('products')}</label>
                  <input type="text" name="products" className="ds-input" placeholder={t('type_here')} required />
                </div>
              </div>
            </div>

            {/* Bloco 3: Informações Finais */}
            <div style={{ marginBottom: '48px' }}>
              <h3 className="ds-h3" style={{ marginBottom: '24px', fontSize: '1.5rem' }}>{t('final_info')}</h3>
              <div className="ds-grid" style={{ gap: '24px', gridTemplateColumns: '1fr' }}>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('how_found')}</label>
                  <select name="howFound" className="ds-input" required defaultValue="">
                    <option value="" disabled>{t('select_option')}</option>
                    <option value="instagram">{t('ref_instagram')}</option>
                    <option value="linkedin">{t('ref_linkedin')}</option>
                    <option value="google">{t('ref_google')}</option>
                    <option value="indicacao">{t('ref_referral')}</option>
                    <option value="outros">{t('ref_other')}</option>
                  </select>
                </div>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('revenue')}</label>
                  <select name="revenue" className="ds-input" required defaultValue="">
                    <option value="" disabled>{t('select_option')}</option>
                    <option value="ate-10k">{t('rev_10k')}</option>
                    <option value="10k-50k">{t('rev_50k')}</option>
                    <option value="50k-100k">{t('rev_100k')}</option>
                    <option value="100k+">{t('rev_100k_plus')}</option>
                  </select>
                </div>
                <div>
                  <label className="ds-body-sm" style={{ display: 'block', marginBottom: '8px' }}>{t('message')}</label>
                  <textarea name="message" className="ds-input" rows={4} placeholder={t('type_here')} required style={{ resize: 'vertical' }}></textarea>
                </div>
              </div>
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e63946', fontWeight: 600 }}>
                  <i data-feather="alert-triangle" style={{ width: '20px', height: '20px' }}></i>
                  <span>{t('error_title')}</span>
                </div>
                <p className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)', margin: 0 }}>
                  {t('error_subtitle')}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="ds-btn"
                    style={{
                      border: '1px solid var(--ds-glass-border)',
                      background: 'transparent',
                      padding: '12px 20px',
                      cursor: 'pointer',
                      color: 'var(--ds-text-primary)',
                    }}
                  >
                    {t('retry')}
                  </button>
                  <a
                    href={WHATSAPP_FALLBACK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-btn ds-btn-primary"
                    style={{
                      border: 'none',
                      padding: '12px 20px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    {t('talk_whatsapp')}
                  </a>
                </div>
              </div>
            )}

            <div className="fade-in-up delay-2" ref={setRef(3)}>
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="ds-btn ds-btn-primary"
                style={{
                  width: '100%', border: 'none', outline: 'none', padding: '20px',
                  fontSize: '1rem', cursor: isSubmitting || submitted ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting || submitted ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Enviando...' : submitted ? '✅ Mensagem Enviada' : t('submit')}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--ds-glass-border)', marginTop: '0px' }}>
        <div className="ds-container footer-container">
          <div className="ds-body-sm footer-copyright">
            <span style={{ marginRight: '8px' }}>© 2023 Leonardo Ferreira. Todos os direitos reservados.</span>
            <Link href="/privacidade" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacidade</Link>
          </div>
          <div className="footer-actions">
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://wa.me/5534936180691?text=Oi%20Léo!%20Vim%20pelo%20site%20e%20queria%20falar%20sobre%20a%20minha%20marca!" target="_blank" rel="noopener noreferrer" className="ds-body-sm" style={{ color: 'var(--ds-text-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  <path d="M10.1 8c-.1-.3-.2-.3-.4-.3H9c-.2 0-.4.1-.6.3s-1 .9-1 2.3 1.2 2.6 1.4 2.8 2 2.9 4.7 4c.6.3 1.1.3 1.5.2s1.2-.5 1.4-1 .2-.9.1-1-.2-.2-.5-.3-1.6-.8-1.8-.9-.4-.1-.5.1-.7.9-.8 1c-.1.2-.3.2-.6.1-.8-.3-1.8-1.1-2.5-2-.2-.3-.1-.5 0-.7.2-.2.4-.4.5-.6s.2-.4.3-.6c.1-.3 0-.5-.1-.7s-.7-1.6-.9-2.1z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/leonardoferreirr/" target="_blank" rel="noopener noreferrer" className="ds-body-sm" style={{ color: 'var(--ds-text-primary)' }}>
                <i data-feather="instagram" style={{ width: '20px', height: '20px' }}></i>
              </a>
              <a href="https://www.linkedin.com/in/leonardo-ferreirr/" target="_blank" rel="noopener noreferrer" className="ds-body-sm" style={{ color: 'var(--ds-text-primary)' }}>
                <i data-feather="linkedin" style={{ width: '20px', height: '20px' }}></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
