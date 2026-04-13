'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Header from '@/components/Header';
import ButtonBeam from '@/components/ButtonBeam';
import ProjectCard from '@/components/ProjectCard';
import MobileProjects from '@/components/MobileProjects';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Home() {
  const tHero = useTranslations('Hero');
  const tProjects = useTranslations('Projects');
  const tMethodology = useTranslations('Methodology');
  const tAbout = useTranslations('About');
  const tDeliverables = useTranslations('Deliverables');
  const tCTA = useTranslations('CTA');
  const tFooter = useTranslations('Footer');

  const { setRef } = useIntersectionObserver();

  return (
    <>
      <Header />

      {/* 1. HERO SECTION */}
      <section className="ds-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/assets/spherewave.gif" alt="Sphere Wave" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.4, mixBlendMode: 'screen', filter: 'grayscale(100%)' }} />
        </div>
        <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 className="ds-display-1 fade-in-up" ref={setRef(0)}>
            {tHero('title1')} {tHero('title_stroke1')} {tHero('title2')} <em style={{ fontStyle: 'italic' }}>{tHero('title_stroke2')}</em> <em style={{ fontStyle: 'italic' }}>{tHero('title3')}</em>
          </h1>
          <div className="fade-in-up delay-1" ref={setRef(1)} style={{ marginTop: '56px' }}>
            <ButtonBeam href="/orcamento">{tHero('cta_button')}</ButtonBeam>
          </div>
        </div>
      </section>

      {/* 2. PROJETOS */}
      <section className="ds-container" id="projetos">
        <div className="ds-section-title fade-in-up" ref={setRef(2)}>
          <span className="ds-body-sm">{tProjects('tag')}</span>
          <h2 className="ds-h2">{tProjects('title')}</h2>
        </div>
        <div className="ds-carousel-wrapper fade-in-up delay-1" ref={setRef(3)}>
          <div className="ds-carousel" id="projectCarousel">
            <ProjectCard slug="projeto-mademax" title="MADEMAX" imageSrc="/assets/00. Cover/01. MADEMAX.png" />
            <ProjectCard slug="projeto-biothera" title="Biothera" imageSrc="/assets/00. Cover/02. Biothera.png" />
            <ProjectCard slug="projeto-divinocar" title="Divino Car" imageSrc="/assets/00. Cover/03. Divino Car.png" />
            <ProjectCard slug="projeto-proconsult" title="ProConsult" imageSrc="/assets/00. Cover/04. ProConsult.png" />
            <ProjectCard slug="projeto-hellobim" title="Hello BIM" imageSrc="/assets/00. Cover/05. Hello BIM.png" />
            <ProjectCard slug="projeto-raxseguros" title="RAX Seguros" imageSrc="/assets/00. Cover/06. RAX Seguros.png" />
            <ProjectCard slug="projeto-polysantos" title="Poly Santos" imageSrc="/assets/00. Cover/07. Poly Santos.png" />
            <ProjectCard slug="projeto-ecomove" title="Ecomove" imageSrc="/assets/00. Cover/08. Ecomove.png" />
            <ProjectCard slug="projeto-remachcapital" title="Remach Capital" imageSrc="/assets/00. Cover/09. Remach Capital.png" />
          </div>
        </div>
        <MobileProjects />
      </section>

      {/* 3. METODOLOGIA */}
      <section className="ds-container" id="metodologia">
        <div className="ds-section-title fade-in-up" ref={setRef(4)}>
          <span className="ds-body-sm">{tMethodology('tag')}</span>
          <h2 className="ds-h2">{tMethodology('title')}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="ds-methodology-card fade-in-up" ref={setRef(5 + i)}>
              <h3 className="ds-h3 ds-text-stroke">{tMethodology(`steps.${i}.title`)}</h3>
              <p className="ds-body">{tMethodology(`steps.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOBRE */}
      <section className="ds-container" id="sobre">
        <div className="ds-grid ds-grid-2" style={{ alignItems: 'center' }}>
          <div className="fade-in-up" ref={setRef(12)}>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--ds-shadow-light)' }}>
              <img src="/assets/profile.png" alt="Leonardo Ferreira" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="fade-in-up delay-1" ref={setRef(13)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="ds-h2 ds-text-stroke">{tAbout('name')}</h2>
            <p className="ds-body-lg" style={{ marginBottom: '24px' }}>{tAbout('p1')}</p>
            <p className="ds-body" style={{ marginBottom: '24px' }}>{tAbout('p2')}</p>
            <p className="ds-body" style={{ marginBottom: '24px' }}>{tAbout('p3')}</p>
            <blockquote style={{ borderLeft: '2px solid var(--ds-text-primary)', paddingLeft: '16px', fontStyle: 'italic', color: 'var(--ds-text-primary)', marginTop: '16px' }}>
              {tAbout('quote')}
            </blockquote>
          </div>
        </div>
      </section>

      {/* 5. ENTREGÁVEIS */}
      <section className="ds-container" id="entregaveis">
        <div className="ds-section-title fade-in-up" ref={setRef(14)}>
          <span className="ds-body-sm">{tDeliverables('tag')}</span>
          <h2 className="ds-h2">{tDeliverables('title')}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="ds-methodology-card fade-in-up" ref={setRef(15 + i)}>
              <h3 className="ds-h3 ds-text-stroke">{tDeliverables(`items.${i}.title`)}</h3>
              <p className="ds-body">{tDeliverables(`items.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA */}
      <section className="ds-container" id="contato">
        <div className="ds-grid ds-grid-2" style={{ alignItems: 'center' }}>
          <div className="fade-in-up" ref={setRef(19)}>
            <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--ds-shadow-light)' }}>
              <img src="/assets/metal-rock.png" alt="CTA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="fade-in-up delay-1" ref={setRef(20)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left' }}>
            <h2 className="ds-h2 ds-text-stroke" style={{ marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: tCTA('title') }} />
            <p className="ds-body-lg" style={{ marginBottom: '40px' }}>
              {tCTA('desc')}<br />
              <a href="mailto:leonardoferreirrs@gmail.com" style={{ color: 'var(--ds-text-primary)', textDecoration: 'none', fontWeight: 500, transition: 'color var(--speed-normal)' }}>
                leonardoferreirrs@gmail.com
              </a>
            </p>
            <ButtonBeam href="/orcamento">{tCTA('button')}</ButtonBeam>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--ds-glass-border)', marginTop: '120px' }}>
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
            <span style={{ color: 'var(--ds-text-secondary)' }}>|</span>
            <a href="#top" style={{ color: 'var(--ds-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ds-glass-bg)', border: '1px solid var(--ds-glass-border)', transition: 'all var(--speed-normal)', cursor: 'pointer' }}>
              <i data-feather="arrow-up"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
