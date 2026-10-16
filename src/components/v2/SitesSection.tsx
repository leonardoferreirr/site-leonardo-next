'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import MacWindow from './MacWindow';
import PixelIcon from './PixelIcon';
import { ArrowUpRight } from './Icons';
import { KIND_LABEL, KIND_PLURAL, SITES, siteCover, tr, type Site, type SiteKind } from '@/data/v2/catalog';

// bento dos destaques: [7,5] [4,4,4] [5,7] e um panorâmico no fim
const LAYOUT = ['v2-c7 v2-card--lead', 'v2-c5 v2-card--fill', 'v2-c4', 'v2-c4', 'v2-c4', 'v2-c5 v2-card--fill', 'v2-c7 v2-card--lead', 'v2-c12 v2-card--pano'];

function SiteCard({ site, layout, locale }: { site: Site; layout: string; locale: string }) {
  return (
    <a className={`v2-card v2-in ${layout}`} href={site.url} target="_blank" rel="noopener">
      <MacWindow title={site.title}>
        <img
          src={`/assets/portfolio/${site.slug}-lg.webp`}
          srcSet={`/assets/portfolio/${site.slug}-md.webp 800w, /assets/portfolio/${site.slug}-lg.webp 1600w`}
          sizes={layout.includes('c12') ? '(max-width: 860px) 100vw, 1240px' : layout.includes('c7') ? '(max-width: 860px) 100vw, 720px' : '(max-width: 860px) 100vw, 520px'}
          alt={`${site.title}: ${tr(site.segment, locale)}`}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
        />
      </MacWindow>
      <div className="v2-card__meta">
        <div>
          <h3 className="v2-card__name">
            {site.title} <ArrowUpRight />
          </h3>
          <p className="v2-card__seg">
            {tr(site.segment, locale)} · {tr(KIND_LABEL[site.kind], locale)}
          </p>
        </div>
        <span className="v2-stack">{`{ ${site.stack} }`}</span>
      </div>
    </a>
  );
}

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
  const featured = SITES.filter((s) => s.featured);

  return (
    <section className="v2-sec" id="sites">
      <div className="v2-wrap">
        <div className="v2-head v2-in">
          <h2 className="v2-h2">
            <PixelIcon cat="sites" />
            {t('title')}
          </h2>
          <p className="v2-lead">{t('lead')}</p>
        </div>

        <div className="v2-bento">
          {featured.map((s, i) => (
            <SiteCard key={s.slug} site={s} layout={LAYOUT[i] ?? 'v2-c4'} locale={locale} />
          ))}
        </div>

        <SiteIndex locale={locale} />
      </div>
    </section>
  );
}
