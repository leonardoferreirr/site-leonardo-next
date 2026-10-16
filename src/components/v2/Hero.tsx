'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/routing';
import MacWindow from './MacWindow';
import { ArrowRight } from './Icons';
import { useCycle, useInView, useReducedMotion } from './hooks';
import { AGENCY, BRANDS, CATEGORY_COLOR, SITES, SYSTEMS, tr, type Category } from '@/data/v2/catalog';

type Slide = { title: string; cat: Category; src: string; pixel?: boolean };

const SLIDES = (locale: string): Slide[] => [
  { title: 'Wigga', cat: 'sites', src: '/assets/portfolio/wigga-lg.webp' },
  { title: tr(AGENCY.name, locale), cat: 'sistemas', src: AGENCY.screens[0].src, pixel: true },
  { title: 'Vessar', cat: 'sites', src: '/assets/portfolio/vessar-lg.webp' },
  { title: tr(SYSTEMS[0].name, locale), cat: 'sistemas', src: SYSTEMS[0].screens[0].src },
  { title: 'Nalu Poke', cat: 'sites', src: '/assets/portfolio/nalu-poke-lg.webp' },
  { title: tr(SYSTEMS[2].name, locale), cat: 'sistemas', src: SYSTEMS[2].screens[0].src },
  { title: 'AL Revestimentos', cat: 'sites', src: '/assets/portfolio/al-revestimentos-lg.webp' },
];

export default function Hero() {
  const t = useTranslations('Home2');
  const locale = useLocale();
  const slides = SLIDES(locale);
  const reduced = useReducedMotion();
  const [showRef, inView] = useInView<HTMLDivElement>('0px');
  const [cur, pick] = useCycle(slides.length, 3800, inView && !reduced);
  const tiltRef = useRef<HTMLDivElement>(null);

  // a vitrine entra inclinada e assenta conforme rola
  useEffect(() => {
    const el = tiltRef.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh - r.top) / (vh * 0.85), 0), 1);
      const tilt = 16 * (1 - p);
      const scale = 0.94 + 0.06 * p;
      el.style.transform = `rotateX(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  const stats: { n: string; label: string }[] = [
    { n: String(SITES.length), label: t('stats.sites') },
    { n: String(SYSTEMS.length + 1), label: t('stats.systems') },
    { n: String(BRANDS.length), label: t('stats.brands') },
    { n: '6+', label: t('stats.years') },
  ];

  return (
    <section className="v2-hero" id="inicio">
      <div className="v2-wrap">
        <h1 className="v2-h1 v2-rise" style={{ animationDelay: '0.05s' }}>
          {t('hero.title_a')} <span>{t('hero.title_b')}</span>
        </h1>
        <p className="v2-hero__sub v2-rise" style={{ animationDelay: '0.25s' }}>
          {t('hero.sub')}
        </p>
        <div className="v2-hero__ctas v2-rise" style={{ animationDelay: '0.4s' }}>
          <Link href="/orcamento" className="v2-btn v2-btn--solid">
            {t('hero.cta_primary')} <ArrowRight />
          </Link>
          <a href="#sites" className="v2-btn v2-btn--ghost">
            {t('hero.cta_secondary')}
          </a>
        </div>
        <div className="v2-hero__status v2-mono v2-rise" style={{ animationDelay: '0.55s' }}>
          <span className="v2-pulse" aria-hidden="true" />
          {t('hero.status')}
        </div>

        <div className="v2-show v2-rise" style={{ animationDelay: '0.6s' }} ref={showRef} aria-label={t('hero.show_label')} role="region">
          <div className="v2-show__tilt" ref={tiltRef}>
            <MacWindow title={slides[cur].title}>
              {slides.map((s, i) => (
                <img
                  key={s.src}
                  className={`v2-slide${i === cur ? ' is-on' : ''}`}
                  src={s.src}
                  alt={s.title}
                  width={1600}
                  height={1000}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  style={s.pixel ? { imageRendering: 'pixelated' } : undefined}
                  aria-hidden={i !== cur}
                />
              ))}
            </MacWindow>
          </div>
          <div className="v2-show__legend">
            {slides.map((s, i) => (
              <button key={s.src} type="button" aria-pressed={i === cur} onClick={() => pick(i)}>
                <span className="v2-dot" style={{ background: CATEGORY_COLOR[s.cat] }} />
                {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="v2-stats">
          {stats.map((s) => (
            <div className="v2-stat v2-in" key={s.label}>
              <strong>{s.n}</strong>
              <span className="v2-mono">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

