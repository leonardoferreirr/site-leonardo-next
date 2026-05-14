'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import { Link } from '@/routing';
import ButtonBeam from '@/components/ButtonBeam';
import ProjectCard from '@/components/ProjectCard';
import MobileProjects from '@/components/MobileProjects';
import ScrollProgress from '@/components/ScrollProgress';
import Magnetic from '@/components/Magnetic';
import Marquee from '@/components/Marquee';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function SplitText({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            paddingBottom: '0.1em',
            paddingRight: i === words.length - 1 ? 0 : '0.25em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: 'translateY(100%)',
              opacity: 0,
              animation: `splitReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay + i * 0.06}s forwards`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

type ProjectItem = {
  slug: string;
  title: string;
  imageSrc: string;
  category: 'brand' | 'web';
  externalUrl?: string;
};

type ProjectItemFull = ProjectItem & { imageSrcMobile?: string };

const PROJECTS: ProjectItemFull[] = [
  // === BRANDING (9) ===
  { slug: 'projeto-mademax', title: 'MADEMAX', imageSrc: '/assets/00. Cover/01. MADEMAX.png', category: 'brand' },
  { slug: 'projeto-biothera', title: 'Biothera', imageSrc: '/assets/00. Cover/02. Biothera.png', category: 'brand' },
  { slug: 'projeto-divinocar', title: 'Divino Car', imageSrc: '/assets/00. Cover/03. Divino Car.png', category: 'brand' },
  { slug: 'projeto-proconsult', title: 'ProConsult', imageSrc: '/assets/00. Cover/04. ProConsult.png', category: 'brand' },
  { slug: 'projeto-hellobim', title: 'Hello BIM', imageSrc: '/assets/00. Cover/05. Hello BIM.png', category: 'brand' },
  { slug: 'projeto-raxseguros', title: 'RAX Seguros', imageSrc: '/assets/00. Cover/06. RAX Seguros.png', category: 'brand' },
  { slug: 'projeto-polysantos', title: 'Poly Santos', imageSrc: '/assets/00. Cover/07. Poly Santos.png', category: 'brand' },
  { slug: 'projeto-ecomove', title: 'Ecomove', imageSrc: '/assets/00. Cover/08. Ecomove.png', category: 'brand' },
  { slug: 'projeto-remachcapital', title: 'Remach Capital', imageSrc: '/assets/00. Cover/09. Remach Capital.png', category: 'brand' },
  // === WEBSITES (6) — usa cover mobile (vertical) tambem no desktop pra encaixar nos cards verticais sem cropar
  { slug: 'projeto-p1marketing', title: 'P1 Marketing', imageSrc: '/assets/00. Cover/10. P1 Marketing.mobile.png', imageSrcMobile: '/assets/00. Cover/10. P1 Marketing.mobile.png', category: 'web', externalUrl: 'https://p1-marketing.vercel.app/' },
  { slug: 'projeto-nalupoke', title: 'Nalu Poke', imageSrc: '/assets/00. Cover/11. Nalu Poke.mobile.png', imageSrcMobile: '/assets/00. Cover/11. Nalu Poke.mobile.png', category: 'web', externalUrl: 'https://nalupoke.vercel.app/' },
  { slug: 'projeto-forset', title: 'Forset', imageSrc: '/assets/00. Cover/12. Forset.mobile.png', imageSrcMobile: '/assets/00. Cover/12. Forset.mobile.png', category: 'web', externalUrl: 'https://site.forset.com.br/' },
  { slug: 'projeto-airjordan', title: 'Air Jordan', imageSrc: '/assets/00. Cover/13. Air Jordan.mobile.png', imageSrcMobile: '/assets/00. Cover/13. Air Jordan.mobile.png', category: 'web', externalUrl: 'https://airjordan-portfolio.vercel.app/' },
  { slug: 'projeto-pokemon', title: 'Pokémon', imageSrc: '/assets/00. Cover/14. Pokemon.mobile.png', imageSrcMobile: '/assets/00. Cover/14. Pokemon.mobile.png', category: 'web', externalUrl: 'https://pokemon.leonardoferreirr.com.br/' },
  { slug: 'projeto-gcarneiro', title: 'GCarneiro', imageSrc: '/assets/00. Cover/15. GCarneiro.mobile.png', imageSrcMobile: '/assets/00. Cover/15. GCarneiro.mobile.png', category: 'web', externalUrl: 'https://www.gcarneiro.com.br/' },
];

const BRAND_PROJECTS = PROJECTS.filter((p) => p.category === 'brand');
const WEB_PROJECTS = PROJECTS.filter((p) => p.category === 'web');

export default function Home() {
  const tHero = useTranslations('Hero');
  const tPillars = useTranslations('Pillars');
  const tProjects = useTranslations('Projects');
  const tMethodology = useTranslations('Methodology');
  const tAbout = useTranslations('About');
  const tCTA = useTranslations('CTA');

  const { setRef } = useIntersectionObserver();
  const sphereRef = useRef<HTMLImageElement>(null);

  // Scroll-driven 3D parallax no sphere
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sphereRef.current;
      if (!el) return;
      const y = window.scrollY;
      const max = window.innerHeight * 1.2;
      const progress = Math.min(y / max, 1);
      // sobe + escala + leve rotação Y conforme rolagem
      const translateY = -progress * 120;
      const scale = 1 + progress * 0.12;
      const rotateY = progress * 18;
      const rotateX = -progress * 6;
      const opacity = 0.4 - progress * 0.25;
      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      el.style.opacity = String(Math.max(opacity, 0.05));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const PILLAR_ICONS: Record<string, React.ReactNode> = {
    brand: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    web: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    traffic: (
      // Gráfico de barras crescente (cliché mas faz sentido)
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="21" x2="21" y2="21"/>
        <rect x="5" y="13" width="3" height="8"/>
        <rect x="10.5" y="9" width="3" height="12"/>
        <rect x="16" y="5" width="3" height="16"/>
      </svg>
    ),
    graphic: (
      // Pincel + figura geométrica
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 7l3 3"/>
        <path d="M5 5l8 8a2 2 0 0 1 0 3l-3 3-8-8 3-3a2 2 0 0 1 3 0z" transform="translate(2 0)"/>
        <path d="M15 5l3-3 3 3-3 3z"/>
      </svg>
    ),
    video: (
      // Câmera de vídeo / play em retângulo
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="14" height="12" rx="2"/>
        <path d="M16 10l5-3v10l-5-3z"/>
      </svg>
    ),
    ai: (
      // Sparkles / IA mágica
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/>
        <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>
        <path d="M4 14l.6 1.6L6 16l-1.4.4L4 18l-.6-1.6L2 16l1.4-.4z"/>
      </svg>
    ),
    social: (
      // Bolha de chat + pessoas
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
    copy: (
      // Pen / escrever
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>
        <line x1="15" y1="5" x2="19" y2="9"/>
      </svg>
    ),
  };

  const PILLAR_COUNT = 8;

  return (
    <>
      <ScrollProgress />
      <Header />

      {/* 1. HERO */}
      <section className="ds-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px' }}>
          <img
            ref={sphereRef}
            src="/assets/spherewave.gif"
            alt=""
            aria-hidden
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: 0.4,
              mixBlendMode: 'screen',
              filter: 'grayscale(100%)',
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
              transition: 'opacity 0.4s',
            }}
          />
        </div>
        <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 className="ds-display-1">
            <SplitText text={tHero('title1')} baseDelay={0.1} />
            {' '}
            <em style={{ fontStyle: 'italic' }}>
              <SplitText text={tHero('title_stroke1')} baseDelay={0.25} />
            </em>
            {' '}
            <SplitText text={tHero('title2')} baseDelay={0.45} />
            {' '}
            <em style={{ fontStyle: 'italic' }}>
              <SplitText text={tHero('title_stroke2')} baseDelay={0.6} />
            </em>
            {' '}
            <SplitText text={tHero('title3')} baseDelay={0.72} />
          </h1>
          <p
            style={{
              marginTop: '32px',
              maxWidth: '720px',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
              fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
              lineHeight: 1.5,
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              opacity: 0,
              animation: 'splitReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards',
              transform: 'translateY(20px)',
            }}
          >
            {tHero('subline')}
          </p>
          <div
            style={{
              marginTop: '40px',
              opacity: 0,
              animation: 'splitReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.35s forwards',
              transform: 'translateY(20px)',
            }}
          >
            <Magnetic strength={0.25}>
              <ButtonBeam href="/orcamento">{tHero('cta_button')}</ButtonBeam>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* MARQUEE — entre hero e pilares */}
      <Marquee
        items={['Branding', 'Webdesign', 'Tráfego pago', 'Performance', 'Estratégia']}
        speed={45}
      />

      {/* 2. PILARES — carrossel Netflix-style com peek do próximo card */}
      <section className="ds-container ds-pillars-container" id="servicos">
        <div className="ds-section-title fade-in-up" ref={setRef(3)}>
          <h2 className="ds-h2">{tPillars('title')}</h2>
        </div>

        <div className="ds-pillars-track fade-in-up delay-1" ref={setRef(4)}>
          {Array.from({ length: PILLAR_COUNT }).map((_, i) => {
            const key = tPillars(`items.${i}.key`);
            return (
              <div key={i} className="ds-pillar-card">
                <div className="ds-pillar-icon">{PILLAR_ICONS[key]}</div>
                <h3 className="ds-pillar-title">{tPillars(`items.${i}.title`)}</h3>
                <p className="ds-pillar-desc">{tPillars(`items.${i}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PROJETOS — duas linhas separadas */}
      <section className="ds-container" id="projetos">
        <div className="ds-section-title fade-in-up" ref={setRef(5)}>
          <h2 className="ds-h2">{tProjects('title')}</h2>
        </div>

        {/* Linha de Branding */}
        <div className="fade-in-up delay-1" ref={setRef(6)} style={{ marginBottom: '24px' }}>
          <h3
            className="ds-h3"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              color: 'var(--ds-text-primary)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            {tProjects('filter_brand')}
          </h3>
        </div>
        <div className="ds-carousel-wrapper fade-in-up delay-1" ref={setRef(7)}>
          <div className="ds-carousel" id="projectCarouselBrand">
            {BRAND_PROJECTS.map((p) => (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                imageSrc={p.imageSrc}
                imageSrcMobile={p.imageSrcMobile}
                category={p.category}
                externalUrl={p.externalUrl}
              />
            ))}
          </div>
        </div>
        <MobileProjects filter="brand" />

        {/* Linha de Websites */}
        <div className="fade-in-up delay-2" ref={setRef(8)} style={{ marginTop: '80px', marginBottom: '24px' }}>
          <h3
            className="ds-h3"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              color: 'var(--ds-text-primary)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            {tProjects('filter_web')}
          </h3>
        </div>
        <div className="ds-carousel-wrapper fade-in-up delay-2" ref={setRef(9)}>
          <div className="ds-carousel" id="projectCarouselWeb">
            {WEB_PROJECTS.map((p) => (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                imageSrc={p.imageSrc}
                imageSrcMobile={p.imageSrcMobile}
                category={p.category}
                externalUrl={p.externalUrl}
              />
            ))}
          </div>
        </div>
        <MobileProjects filter="web" />
      </section>

      {/* 4. PROCESSO */}
      <section className="ds-container" id="metodologia">
        <div className="ds-section-title fade-in-up" ref={setRef(20)}>
          <h2 className="ds-h2">{tMethodology('title')}</h2>
        </div>
        <div className="ds-methodology-stack">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="ds-methodology-card-stack"
              style={{ top: `${100 + i * 24}px` }}
            >
              <h3 className="ds-h3 ds-text-stroke">{tMethodology(`steps.${i}.title`)}</h3>
              <p className="ds-body">{tMethodology(`steps.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE INVERTIDO — entre Processo e Sobre */}
      <Marquee
        items={['Criar', 'Lançar', 'Posicionar', 'Escalar', 'Converter']}
        speed={50}
        reverse
      />

      {/* 5. SOBRE */}
      <section className="ds-container" id="sobre">
        <div className="ds-grid ds-grid-2" style={{ alignItems: 'center' }}>
          <div className="fade-in-up" ref={setRef(30)}>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--ds-shadow-light)' }}>
              <img src="/assets/profile.png" alt="Leonardo Ferreira" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="fade-in-up delay-1" ref={setRef(31)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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

      {/* 6. CTA */}
      <section className="ds-container" id="contato">
        <div className="ds-grid ds-grid-2" style={{ alignItems: 'center' }}>
          <div className="fade-in-up" ref={setRef(40)}>
            <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--ds-shadow-light)' }}>
              <img src="/assets/metal-rock.png" alt="CTA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="fade-in-up delay-1" ref={setRef(41)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left' }}>
            <h2 className="ds-h2 ds-text-stroke" style={{ marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: tCTA('title') }} />
            <p className="ds-body-lg" style={{ marginBottom: '40px' }}>
              {tCTA('desc')}<br />
              <a href="mailto:leonardoferreirrs@gmail.com" style={{ color: 'var(--ds-text-primary)', textDecoration: 'none', fontWeight: 500, transition: 'color var(--speed-normal)' }}>
                leonardoferreirrs@gmail.com
              </a>
            </p>
            <Magnetic strength={0.25}>
              <ButtonBeam href="/orcamento">{tCTA('button')}</ButtonBeam>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--ds-glass-border)', marginTop: '120px' }}>
        <div className="ds-container footer-container">
          <div className="ds-body-sm footer-copyright">
            <span style={{ marginRight: '8px' }}>© 2023 Leonardo Ferreira. Todos os direitos reservados.</span>
            <Link href="/privacidade" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacidade</Link>
          </div>
          <div className="footer-actions">
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://wa.me/5534936180691?text=Oi%20Léo!%20Vim%20pelo%20site%20e%20queria%20falar%20sobre%20um%20projeto!" target="_blank" rel="noopener noreferrer" className="ds-body-sm" style={{ color: 'var(--ds-text-primary)' }}>
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
