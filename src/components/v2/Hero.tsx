'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/routing';
import MacWindow from './MacWindow';
import { ArrowRight } from './Icons';
import { useCycle, useInView, useReducedMotion } from './hooks';
import { AGENCY, SYSTEMS, tr, type Category } from '@/data/v2/catalog';

type Slide = {
  title: string;
  cat: Category;
  src: string;
  md: string;
  pixel?: boolean;
};

const site = (slug: string) => ({
  src: `/assets/portfolio/${slug}-lg.webp`,
  md: `/assets/portfolio/${slug}-md.webp`,
});
const shotOf = (src: string) => ({ src, md: src.replace('.webp', '-sm.webp') });

// ordem pedida pelo Leonardo (16/10): agência, Wigga, Nalu, os dois CRMs, Pedras do Brasil e Retrô em Campo
const SLIDES = (locale: string): Slide[] => [
  {
    title: tr(AGENCY.name, locale),
    cat: 'sistemas',
    ...shotOf(AGENCY.screens[0].src),
    pixel: true,
  },
  { title: 'Wigga', cat: 'sites', ...site('wigga') },
  { title: 'Nalu Poke', cat: 'sites', ...site('nalu-poke') },
  {
    title: tr(SYSTEMS[0].name, locale),
    cat: 'sistemas',
    ...shotOf(SYSTEMS[0].screens[0].src),
  },
  {
    title: tr(SYSTEMS[2].name, locale),
    cat: 'sistemas',
    ...shotOf(SYSTEMS[2].screens[0].src),
  },
  { title: 'Pedras do Brasil', cat: 'sites', ...site('pedras-do-brasil') },
  { title: 'Retrô em Campo', cat: 'sites', ...site('retro-em-campo') },
];

export default function Hero() {
  const t = useTranslations('Home2');
  const locale = useLocale();
  const slides = SLIDES(locale);
  const reduced = useReducedMotion();
  const [showRef, inView] = useInView<HTMLDivElement>('0px');
  // a rotação só começa quando a pessoa rola/toca/digita (ou após 8 s): cada slide novo virava
  // um LCP tardio no Lighthouse e no dado real de usuário
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const go = () => setArmed(true);
    const evs = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    evs.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    const t = window.setTimeout(go, 8000);
    return () => {
      evs.forEach((e) => window.removeEventListener(e, go));
      window.clearTimeout(t);
    };
  }, []);
  const [cur] = useCycle(slides.length, 3800, armed && inView && !reduced);
  const tiltRef = useRef<HTMLDivElement>(null);
  // só monta a imagem do slide atual e a do próximo: antes as 7 baixavam juntas e atrasavam o LCP
  const [ready, setReady] = useState<Set<number>>(() => new Set([0]));
  useEffect(() => {
    setReady((prev) => {
      const next = (cur + 1) % slides.length;
      if (prev.has(cur) && prev.has(next)) return prev;
      return new Set([...prev, cur, next]);
    });
  }, [cur, slides.length]);

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

  return (
    <section className="v2-hero" id="inicio">
      <div className="v2-wrap">
        <div className="v2-hero__top">
          <h1 className="v2-h1 v2-rise" style={{ animationDelay: '0.05s' }}>
            {t('hero.title_a')} <span>{t('hero.title_b')}</span>
          </h1>
          <p className="v2-hero__sub v2-rise" style={{ animationDelay: '0.25s' }}>
            {t('hero.sub_a')}
            <br />
            {t('hero.sub_b')}
          </p>
          <div className="v2-hero__ctas v2-rise" style={{ animationDelay: '0.4s' }}>
            <Link href="/orcamento" className="v2-btn v2-btn--solid">
              {t('hero.cta_primary')} <ArrowRight />
            </Link>
            <a href="#sites" className="v2-btn v2-btn--ghost">
              {t('hero.cta_secondary')}
            </a>
          </div>
        </div>

        <div className="v2-show v2-rise" style={{ animationDelay: '0.6s' }} ref={showRef} aria-label={t('hero.show_label')} role="region">
          <div className="v2-show__tilt" ref={tiltRef}>
            <MacWindow title={slides[cur].title}>
              {slides.map((s, i) =>
                ready.has(i) ? (
                  <img
                    key={s.src}
                    className={`v2-slide${i === cur ? ' is-on' : ''}`}
                    src={s.src}
                    srcSet={`${s.md} 800w, ${s.src} 1600w`}
                    sizes="(max-width: 860px) 100vw, 1180px"
                    alt={s.title}
                    width={1600}
                    height={1000}
                    decoding={i === 0 ? 'sync' : 'async'}
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    style={s.pixel ? { imageRendering: 'pixelated' } : undefined}
                    aria-hidden={i !== cur}
                  />
                ) : null,
              )}
            </MacWindow>
          </div>
        </div>
      </div>
    </section>
  );
}
