'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import PixelIcon from './PixelIcon';
import { ArrowUpRight } from './Icons';
import SectionCta from './SectionCta';
import GlassReel, { type ReelItem } from './GlassReel';
import { KIND_LABEL, KIND_PLURAL, SITE_REEL, SITES, siteCover, tr, type SiteKind } from '@/data/v2/catalog';

// cor do brilho atrás da tela do centro
const GLOW: Record<string, string> = {
  cazetv: '#c13bff',
  duolingo: '#58cc02',
  'buenas-taqueria': '#ff4f9a',
  'nalu-poke': '#ff8a00',
  'air-jordan': '#e1121b',
  pokemon: '#7b4dff',
};

const reelItems = (locale: string): ReelItem[] =>
  SITE_REEL.map((slug) => {
    const s = SITES.find((x) => x.slug === slug)!;
    const base = `/assets/portfolio/${slug}`;
    return {
      key: slug,
      name: s.title,
      sub: `${tr(s.segment, locale)} · ${tr(KIND_LABEL[s.kind], locale)}`,
      stack: s.stack,
      color: GLOW[slug],
      href: s.url,
      shots: [{ lg: `${base}-lg.webp`, md: `${base}-md.webp` }],
      m: `${base}-m.webp`,
    };
  });

const KINDS: SiteKind[] = ['landing', 'institucional', 'ecommerce', 'conceito'];
const FIRST = 12;

function SiteIndex({ locale }: { locale: string }) {
  const t = useTranslations('Home2.sites');
  const [kind, setKind] = useState<SiteKind | 'todos'>('todos');
  const [open, setOpen] = useState(false);
  const peekRef = useRef<HTMLDivElement>(null);
  const peekImg = useRef<HTMLImageElement>(null);

  const list = useMemo(() => (kind === 'todos' ? SITES : SITES.filter((s) => s.kind === kind)), [kind]);
  const shown = open ? list : list.slice(0, FIRST);
  const count = (k: SiteKind) => SITES.filter((s) => s.kind === k).length;

  // prévia flutuante só em mouse de verdade
  useEffect(() => {
    const peek = peekRef.current;
    if (!peek || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let x = 0, y = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          peek.style.transform = `translate3d(${x + 22}px, ${y - 90}px, 0)`;
        });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const show = (slug: string) => {
    const peek = peekRef.current, img = peekImg.current;
    if (!peek || !img || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    img.src = siteCover(slug, true);
    peek.classList.add('is-on');
  };
  const hide = () => peekRef.current?.classList.remove('is-on');

  return (
    <div className="v2-index">
      <div className="v2-index__top">
        <h3 className="v2-index__title">{t('index_title')}</h3>
        <div className="v2-chips" role="group" aria-label={t('index_title')}>
          <button type="button" className="v2-chip" aria-pressed={kind === 'todos'} onClick={() => setKind('todos')}>
            {t('all')} <small>{SITES.length}</small>
          </button>
          {KINDS.map((k) => (
            <button key={k} type="button" className="v2-chip" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {tr(KIND_PLURAL[k], locale)} <small>{count(k)}</small>
            </button>
          ))}
        </div>
      </div>

      <ul className="v2-rows" onMouseLeave={hide}>
        {shown.map((s, i) => (
          <li className="v2-row" key={s.slug}>
            <a href={s.url} target="_blank" rel="noopener" onMouseEnter={() => show(s.slug)} onFocus={() => show(s.slug)} onBlur={hide}>
              <span className="v2-row__n v2-mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="v2-row__thumb" aria-hidden="true">
                <img src={siteCover(s.slug, true)} alt="" width={480} height={300} loading="lazy" decoding="async" />
              </span>
              <span className="v2-row__mid">
                <span className="v2-row__name">{s.title}</span>
                <span className="v2-row__seg">{tr(s.segment, locale)}</span>
              </span>
              <span className="v2-row__kind">{tr(KIND_LABEL[s.kind], locale)}</span>
              <span className="v2-row__stack v2-stack">{`{ ${s.stack} }`}</span>
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>

      {list.length > FIRST ? (
        <div className="v2-index__more">
          <button type="button" className="v2-btn v2-btn--ghost" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {open ? t('less') : t('more', { count: list.length })}
          </button>
        </div>
      ) : null}

      <div className="v2-peek" ref={peekRef} aria-hidden="true">
        <img ref={peekImg} alt="" width={480} height={300} />
      </div>
    </div>
  );
}

export default function SitesSection() {
  const t = useTranslations('Home2.sites');
  const locale = useLocale();
  const items = useMemo(() => reelItems(locale), [locale]);

  return (
    <section className="v2-sec v2-sec--reel" id="sites">
      <div className="v2-wrap">
        <div className="v2-head v2-head--center v2-in">
          <h2 className="v2-h2">
            <PixelIcon cat="sites" />
            {t('title')}
          </h2>
        </div>
      </div>

      <GlassReel items={items} label={t('title')} variant="sites" />

      <div className="v2-wrap">
        <SiteIndex locale={locale} />
        <SectionCta />
      </div>
    </section>
  );
}
