'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/routing';
import MacWindow from './MacWindow';
import PixelIcon from './PixelIcon';
import { ArrowUpRight, Close, Play } from './Icons';
import SectionCta from './SectionCta';
import { useInView, useNear, useReducedMotion } from './hooks';
import { BRANDS, CATEGORY_COLOR, tr } from '@/data/v2/catalog';
import { LAB, REELS, SOCIAL, type Reel } from '@/data/v2/media';

/* ------------------------------------------------------------- identidade */

export function IdentitySection() {
  const t = useTranslations('Home2.identity');

  return (
    <section className="v2-sec" id="identidade">
      <div className="v2-wrap">
        <div className="v2-head v2-head--center v2-in">
          <h2 className="v2-h2">
            <PixelIcon cat="identidade" />
            {t('title')}
          </h2>
        </div>

        <div className="v2-brands">
          {BRANDS.map((b, i) => {
            const inner = (
              <>
                <div className="v2-brand__img">
                  <img src={b.cover} alt="" width={1200} height={900} loading="lazy" decoding="async" />
                </div>
                <div className="v2-card__meta">
                  <h3 className="v2-card__name">
                    {b.title} {b.href ? <ArrowUpRight /> : null}
                  </h3>
                  <span className="v2-stack">{'{ Illustrator + Photoshop }'}</span>
                </div>
              </>
            );
            const cls = `v2-brand v2-card v2-in${i < 3 || i > 6 ? ' v2-brand--big' : ''}`;
            return b.href ? (
              <Link key={b.slug} href={b.href} className={cls} aria-label={`${b.title}: ${t('case')}`}>
                {inner}
              </Link>
            ) : (
              <div key={b.slug} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
        <SectionCta />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- social */

export function SocialSection() {
  const t = useTranslations('Home2.social');
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>('0px');

  // duas faixas: destaques primeiro na de cima
  const posts = SOCIAL.flatMap((b) => b.posts.map((src, i) => ({ src, brand: b.title, key: `${b.slug}-${i}`, tall: b.tall })));
  const top = posts.filter((_, i) => i % 2 === 0);
  const bottom = posts.filter((_, i) => i % 2 === 1);

  const row = (items: typeof posts, rev: boolean, dur: number) => (
    <div className={`v2-track${rev ? ' v2-track--rev' : ''}`} style={{ ['--dur' as string]: `${dur}s` }}>
      {[...items, ...items].map((p, i) => (
        <figure className={`v2-post${p.tall ? ' v2-post--tall' : ''}`} key={`${p.key}-${i}`} aria-hidden={i >= items.length}>
          <img src={p.src} alt={i < items.length ? p.brand : ''} width={720} height={p.tall ? 1280 : 900} loading="lazy" decoding="async" />
          <figcaption>
            <span className="v2-dot" style={{ background: CATEGORY_COLOR.social }} />
            {p.brand}
          </figcaption>
        </figure>
      ))}
    </div>
  );

  if (!SOCIAL.length) return null;

  return (
    <section className="v2-sec" id="social">
      <div className="v2-wrap">
        <div className="v2-head v2-head--center v2-in">
          <h2 className="v2-h2">
            <PixelIcon cat="social" />
            {t('title')}
          </h2>
        </div>
      </div>
      <div ref={ref} className={`v2-social${!inView || reduced ? ' is-paused' : ''}`}>
        {row(top, false, Math.max(60, top.length * 4))}
        {row(bottom, true, Math.max(60, bottom.length * 4))}
      </div>
      <div className="v2-wrap">
        <SectionCta />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ vídeo */

function ReelTile({ reel, onOpen, label, sub }: { reel: Reel; onOpen: (r: Reel) => void; label: string; sub: string }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLButtonElement>('0px');
  const [nearRef, near] = useNear<HTMLDivElement>();
  const vref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    if (inView && !reduced) {
      if (!v.src) v.src = reel.loop;
      v.play().catch(() => {});
    } else v.pause();
  }, [inView, reduced, reel.loop]);

  return (
    <div ref={nearRef} className={`v2-reel v2-in${reel.wide ? ' v2-reel--wide' : ''}`}>
      <button ref={ref} type="button" className="v2-reel__frame" onClick={() => onOpen(reel)} aria-label={`${label}: ${reel.title}`}>
        <video ref={vref} poster={near ? reel.poster : undefined} muted loop playsInline preload="none" aria-hidden="true" />
        <span className="v2-reel__play" aria-hidden="true">
          <Play />
        </span>
      </button>
      <div style={{ marginTop: 14 }}>
        <h3 className="v2-card__name" style={{ fontSize: '1rem' }}>
          {reel.title}
        </h3>
        <p className="v2-card__seg">{sub}</p>
      </div>
    </div>
  );
}

export function VideoSection() {
  const t = useTranslations('Home2.video');
  const locale = useLocale();
  const [open, setOpen] = useState<Reel | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!REELS.length) return null;

  return (
    <section className="v2-sec" id="video">
      <div className="v2-wrap">
        <div className="v2-head v2-head--center v2-in">
          <h2 className="v2-h2">
            <PixelIcon cat="video" />
            {t('title')}
          </h2>
        </div>
        <div className="v2-reels">
          {REELS.map((r) => (
            <ReelTile key={r.slug} reel={r} onOpen={setOpen} label={t('play')} sub={tr(r.sub, locale)} />
          ))}
        </div>
        <span className="v2-stack" style={{ display: 'block', marginTop: 20 }}>
          {'{ Premiere + Photoshop + React }'}
        </span>
        <SectionCta />
      </div>

      {open ? (
        <div className="v2-lb" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <button ref={closeRef} type="button" className="v2-lb__close" onClick={() => setOpen(null)} aria-label={t('close')}>
            <Close />
          </button>
          <video
            src={open.full}
            poster={open.poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            aria-label={`${open.title}: ${tr(open.sub, locale)}`}
          />
        </div>
      ) : null}
    </section>
  );
}

/* -------------------------------------------------------------------- lab */

function LabCard({ item, locale, openLabel }: { item: (typeof LAB)[number]; locale: string; openLabel: string }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>('0px');
  const [nearRef, near] = useNear<HTMLDivElement>();
  const vref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vref.current;
    if (!v || !item.loop) return;
    if (inView && !reduced) {
      if (!v.src) v.src = item.loop;
      v.play().catch(() => {});
    } else v.pause();
  }, [inView, reduced, item.loop]);

  const body = (
    <>
      <div ref={nearRef}>
        <div ref={ref}>
          <MacWindow title={item.title}>
            {item.loop ? (
              <video ref={vref} poster={near ? item.cover : undefined} muted loop playsInline preload="none" aria-hidden="true" />
            ) : (
              <img src={item.cover} alt={item.title} width={1600} height={1000} loading="lazy" decoding="async" />
            )}
          </MacWindow>
        </div>
      </div>
      <div className="v2-card__meta">
        <div>
          <h3 className="v2-card__name">
            {item.title} {item.url ? <ArrowUpRight /> : null}
          </h3>
          <p className="v2-card__seg">{tr(item.desc, locale)}</p>
        </div>
        <span className="v2-stack">{`{ ${item.stack} }`}</span>
      </div>
    </>
  );

  return item.url ? (
    <a className="v2-card v2-in" href={item.url} target="_blank" rel="noopener" aria-label={`${item.title}: ${openLabel}`}>
      {body}
    </a>
  ) : (
    <div className="v2-card v2-in">{body}</div>
  );
}

export function LabSection() {
  const t = useTranslations('Home2.lab');
  const locale = useLocale();
  if (!LAB.length) return null;

  return (
    <section className="v2-sec" id="lab">
      <div className="v2-wrap">
        <div className="v2-head v2-head--center v2-in">
          <h2 className="v2-h2">
            <PixelIcon cat="lab" />
            {t('title')}
          </h2>
        </div>
        <div className={`v2-lab${LAB.length === 1 ? ' v2-lab--single' : ''}`}>
          {LAB.map((item) => (
            <LabCard key={item.slug} item={item} locale={locale} openLabel={t('open')} />
          ))}
        </div>
        <SectionCta />
      </div>
    </section>
  );
}
