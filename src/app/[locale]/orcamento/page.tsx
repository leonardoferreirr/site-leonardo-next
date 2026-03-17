'use client';

import { useState } from 'react';
import { Link } from '@/routing';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTranslations } from 'next-intl';

export default function OrcamentoPage() {
  const { setRef } = useIntersectionObserver();
  const t = useTranslations('Form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      instagram: formData.get('instagram'),
      company: formData.get('company'),
      employees: formData.get('employees'),
      products: formData.get('products'),
      howFound: formData.get('howFound'),
      revenue: formData.get('revenue'),
      message: formData.get('message'),
    };

    const payload = {
      content: "🚀 **Novo Orçamento Recebido!**",
      embeds: [{
        title: "Detalhes do Contato",
        color: 3447003,
        fields: [
          { name: "Nome", value: data.name || "N/A", inline: true },
          { name: "Email", value: data.email || "N/A", inline: true },
          { name: "WhatsApp", value: data.whatsapp || "N/A", inline: true },
          { name: "Instagram", value: data.instagram || "N/A", inline: true },
          { name: "Empresa", value: data.company || "N/A", inline: true },
          { name: "Colaboradores", value: data.employees || "N/A", inline: true },
          { name: "Faturamento", value: data.revenue || "N/A", inline: true },
          { name: "Como encontrou", value: data.howFound || "N/A", inline: true },
          { name: "Mensagem", value: data.message ? String(data.message).substring(0, 1024) : "N/A" }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch("https://discord.com/api/webhooks/1427470183005421580/uLRhGOmC3jmkhw37woRqAwICCxeC0rrDQ_eTJcTiemHIbeH32N4aREV22BynUVOwITQm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar o orçamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
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
            © 2023 Leonardo Ferreira. Todos os direitos reservados.
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
