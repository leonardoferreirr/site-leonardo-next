'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import ButtonBeam from '@/components/ButtonBeam';
import Header from '@/components/Header';
import { Link } from '@/routing';
import { useTranslations } from 'next-intl';

export default function ProjectView({ project, ctaText }: { project: any, ctaText: string }) {
  const { setRef } = useIntersectionObserver();
  const t = useTranslations('CaseStudy');
  const tData = useTranslations('ProjectsData.' + project.slug);

  return (
    <>
      <Header />
      <div className="ds-container pt-32" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
        <Link href="/" className="ds-body-sm fade-in-up"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--ds-text-secondary)', textDecoration: 'none', marginBottom: '64px', transition: 'color var(--speed-fast)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          {t('back_portfolio')}
        </Link>
        <div ref={setRef(0)} className="fade-in-up delay-1" style={{ maxWidth: '800px', marginBottom: '80px' }}>
          <span className="ds-body-sm" style={{ color: 'var(--ds-accent-primary)', marginBottom: '16px', display: 'block' }}>
            {t('case_study')}
          </span>
          <h1 className="ds-display-1" style={{ marginBottom: '24px' }}>{project.title}</h1>
          <p className="ds-body-lg">
            {tData('challenge')}
          </p>
        </div>
      </div>

      {/* Defesa do Projeto / Case Study */}
      <div ref={setRef(1)} className="ds-grid ds-grid-2 fade-in-up delay-2" style={{ marginBottom: '120px', maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div className="ds-glass-card">
          <h3 className="ds-h3 ds-text-stroke">{t('the_challenge')}</h3>
          <p className="ds-body" style={{ marginBottom: '32px' }}>
            {tData('challenge')}
          </p>

          <h3 className="ds-h3 ds-text-stroke">{t('the_solution')}</h3>
          <p className="ds-body">
            {tData('solution')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '16px' }}>
          <div style={{ borderBottom: '1px solid var(--ds-glass-border)', paddingBottom: '16px' }}>
            <span className="ds-body-sm">{t('client')}</span>
            <p className="ds-body-lg" style={{ color: 'var(--ds-text-primary)', marginTop: '8px' }}>{project.client}</p>
          </div>
          <div style={{ borderBottom: '1px solid var(--ds-glass-border)', paddingBottom: '16px' }}>
            <span className="ds-body-sm">{t('services')}</span>
            <p className="ds-body-lg" style={{ color: 'var(--ds-text-primary)', marginTop: '8px' }}>{tData('services')}</p>
          </div>
          <div style={{ borderBottom: '1px solid var(--ds-glass-border)', paddingBottom: '16px' }}>
            <span className="ds-body-sm">{t('year')}</span>
            <p className="ds-body-lg" style={{ color: 'var(--ds-text-primary)', marginTop: '8px' }}>{project.year}</p>
          </div>
        </div>
      </div>

      {/* Galeria de Imagens */}
      <div ref={setRef(2)} style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ padding: '0 10%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {project.images && project.images.length > 0 ? (
            project.images.map((src: string, i: number) => (
              <img ref={setRef(3 + i)} className="fade-in-up" key={i} src={src} alt={`${project.title} - ${i}`} style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--ds-shadow-light)' }} />
            ))
          ) : (
            <img ref={setRef(3)} className="fade-in-up" src={project.coverImage} alt={project.title} style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--ds-shadow-light)' }} />
          )}
        </div>
      </div>

      <div ref={setRef(100)} className="ds-container fade-in-up" style={{ textAlign: 'center' }}>
        <ButtonBeam href="/orcamento">{ctaText}</ButtonBeam>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--ds-glass-border)', marginTop: '120px' }}>
        <div className="ds-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
          <Link href="/" className="ds-body-sm" style={{ textDecoration: 'none', transition: 'color var(--speed-normal)', color: 'var(--ds-text-primary)' }}>
            Voltar ao Início
          </Link>
        </div>
      </footer>
    </>
  );
}
