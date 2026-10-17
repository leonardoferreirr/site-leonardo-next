'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from './Icons';
import { AGENCY, KIND_LABEL, SITES, SITE_REEL, tr, type L } from '@/data/v2/catalog';

// Vitrine fixada: a seção prende a tela e as janelas de vidro passam da direita para a esquerda
// numa diagonal em perspectiva (cover flow). Tudo em transform/opacity, calculado no rAF do scroll.

type Item = {
  key: string;
  name: L;
  seg: L;
  kind: L;
  stack: string;
  href: string;
  external: boolean;
  lg: string;
  md: string;
  m: string; // retrato para o celular
  video?: string;
  color: string;
};

// cor do brilho atrás da tela ativa
const GLOW: Record<string, string> = {
  cazetv: '#c13bff',
  duolingo: '#58cc02',
  'agencia-ia': '#3d8bff',
  'buenas-taqueria': '#ff4f9a',
  'nalu-poke': '#ff8a00',
  'air-jordan': '#e1121b',
  pokemon: '#7b4dff',
};

const SYSTEM: L = { pt: 'Sistema', en: 'System', es: 'Sistema' };
const AGENCY_SEG: L = { pt: 'Escritório com agentes de IA', en: 'An office of AI agents', es: 'Oficina con agentes de IA' };

const ITEMS: Item[] = SITE_REEL.map((slug) => {
  if (slug === AGENCY.slug) {
    const s = AGENCY.screens[0];
    return {
      key: slug,
      name: AGENCY.name,
      seg: AGENCY_SEG,
      kind: SYSTEM,
      stack: AGENCY.stack,
      href: '#sistemas',
      external: false,
      lg: s.src,
      md: s.src.replace('.webp', '-sm.webp'),
      m: s.src.replace('.webp', '-m.webp'),
      video: s.video,
      color: GLOW[slug],
    };
  }
  const site = SITES.find((x) => x.slug === slug)!;
  return {
    key: slug,
    name: { pt: site.title, en: site.title, es: site.title },
    seg: site.segment,
    kind: KIND_LABEL[site.kind],
    stack: site.stack,
    href: site.url,
    external: true,
    lg: `/assets/portfolio/${slug}-lg.webp`,
    md: `/assets/portfolio/${slug}-md.webp`,
    m: `/assets/portfolio/${slug}-m.webp`,
    color: GLOW[slug],
  };
});

const N = ITEMS.length;

// passo lateral e vertical em fração da janela, recuo em px, giro em graus
const DESK = { kx: 0.74, ky: 0.2, kz: 260, ry: 24, maxRy: 50 };
const MOB = { kx: 0.9, ky: 0.1, kz: 160, ry: 14, maxRy: 32 };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function SitesReel({ locale, label }: { locale: string; label: string }) {
  const outer = useRef<HTMLDivElement>(null);
  // a 1ª tela vem no HTML (é o que aparece na abertura); as outras só depois do load ou do 1º gesto,
  // para não disputar banda com a imagem do topo
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const go = () => setArmed(true);
    const evs = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    evs.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    let t = 0;
    const onLoad = () => (t = window.setTimeout(go, 1200));
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    return () => {
      evs.forEach((e) => window.removeEventListener(e, go));
      window.removeEventListener('load', onLoad);
      window.clearTimeout(t);
    };
  }, []);
  const stage = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrap = outer.current, st = stage.current;
    if (!wrap || !st || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(st.querySelectorAll<HTMLAnchorElement>('.v2-glass'));
    const veils = cards.map((c) => c.querySelector<HTMLElement>('.v2-glass__veil')!);
    const shines = cards.map((c) => c.querySelector<HTMLElement>('.v2-glass__shine')!);
    const video = st.querySelector<HTMLVideoElement>('video[data-src]');
    const videoAt = video ? cards.findIndex((c) => c.contains(video)) : -1;

    let W = 0, H = 0, vh = 0, dist = 0, lead = 0, cfg = DESK;
    let raf = 0, active = -1, live = false, playing = false;

    const measure = () => {
      cfg = window.matchMedia('(max-width: 760px)').matches ? MOB : DESK;
      W = cards[0].offsetWidth;
      H = cards[0].offsetHeight;
      vh = st.offsetHeight;
      dist = Math.max(1, wrap.offsetHeight - vh);
      lead = Math.min(dist * 0.12, vh * 0.2); // respiro no começo e no fim do trilho
    };

    const render = () => {
      raf = 0;
      const top = wrap.getBoundingClientRect().top;
      const t = clamp((-top - lead) / (dist - 2 * lead), 0, 1);
      const raw = t * (N - 1);
      // ímã: desacelera perto de cada tela, acelera no meio do caminho
      const f = raw - Math.floor(raw);
      const p = Math.floor(raw) + f - (Math.sin(2 * Math.PI * f) / (2 * Math.PI)) * 0.72;

      for (let i = 0; i < N; i++) {
        const d = i - p;
        const ad = Math.abs(d);
        const op = d < 0 ? clamp(1 - (-d - 0.55) * 1.15, 0, 1) : clamp(1 - (d - 2.2), 0, 1);
        const c = cards[i];
        c.style.transform =
          `translate(-50%, -50%) translate3d(${(d * W * cfg.kx).toFixed(1)}px, ${(d * H * cfg.ky).toFixed(1)}px, ${(-ad * cfg.kz).toFixed(1)}px) ` +
          `rotateY(${clamp(-d * cfg.ry, -cfg.maxRy, cfg.maxRy).toFixed(2)}deg)`;
        c.style.opacity = op.toFixed(3);
        c.style.zIndex = String(100 - Math.round(ad * 10));
        c.style.pointerEvents = op < 0.15 ? 'none' : '';
        veils[i].style.opacity = (Math.min(ad, 1.6) * 0.4).toFixed(3);
        shines[i].style.transform = `translate3d(${(d * 26).toFixed(1)}%, 0, 0)`;
      }

      const a = clamp(Math.round(p), 0, N - 1);
      if (a !== active) {
        active = a;
        if (glow.current) glow.current.style.color = ITEMS[a].color;
        if (num.current) num.current.textContent = String(a + 1).padStart(2, '0');
      }
      if (bar.current) bar.current.style.transform = `scaleX(${t.toFixed(4)})`;

      // a tela do escritório ganha vida só quando está no centro
      if (video && videoAt >= 0) {
        const dv = Math.abs(videoAt - p);
        if (dv < 1.6 && !video.src) {
          video.src = video.dataset.src!;
        }
        if (dv < 0.5 && live && !playing) {
          playing = true;
          video.play().catch(() => (playing = false));
        } else if ((dv >= 0.5 || !live) && playing) {
          playing = false;
          video.pause();
        }
      }
    };

    const ask = () => {
      if (live && !raf) raf = requestAnimationFrame(render);
    };

    // só trabalha enquanto a vitrine está na tela
    const io = new IntersectionObserver(([e]) => {
      live = e.isIntersecting;
      if (live) ask();
      else if (playing && video) {
        playing = false;
        video.pause();
      }
    });
    io.observe(wrap);

    const onResize = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(render);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(st);
    ro.observe(wrap);

    // teclado: ao focar uma tela fora do centro, o scroll leva até ela
    const onFocus = (i: number) => () => {
      const top = wrap.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + lead + (i / (N - 1)) * (dist - 2 * lead), behavior: 'auto' });
    };
    const focusers = cards.map((c, i) => {
      const fn = onFocus(i);
      c.addEventListener('focus', fn);
      return fn;
    });

    measure();
    render();
    window.addEventListener('scroll', ask, { passive: true });

    return () => {
      window.removeEventListener('scroll', ask);
      io.disconnect();
      ro.disconnect();
      cards.forEach((c, i) => c.removeEventListener('focus', focusers[i]));
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="v2-reel" ref={outer} style={{ ['--n' as string]: N }} role="region" aria-label={label}>
      <div className="v2-reel__stage" ref={stage}>
        <div className="v2-reel__glow" ref={glow} aria-hidden="true" />

        {ITEMS.map((it, i) => (
          <a
            key={it.key}
            className="v2-glass"
            style={{ ['--i' as string]: i }}
            href={it.href}
            {...(it.external ? { target: '_blank', rel: 'noopener' } : {})}
          >
            <span className="v2-glass__shine" aria-hidden="true" />
            <div className="v2-glass__shot">
              <picture>
                {i === 0 || armed ? <source media="(max-width: 760px)" srcSet={it.m} width={540} height={960} /> : null}
                <img
                  src={i === 0 || armed ? it.lg : undefined}
                  srcSet={i === 0 || armed ? `${it.md} 800w, ${it.lg} 1600w` : undefined}
                  sizes="60vw"
                  alt={`${tr(it.name, locale)}: ${tr(it.seg, locale)}`}
                  width={1600}
                  height={1000}
                  decoding={i === 0 ? 'sync' : 'async'}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  style={it.key === AGENCY.slug ? { imageRendering: 'pixelated' } : undefined}
                />
              </picture>
              {it.video ? <video data-src={it.video} muted loop playsInline preload="none" aria-hidden="true" /> : null}
            </div>
            <div className="v2-glass__meta">
              <div>
                <h3 className="v2-glass__name">
                  {tr(it.name, locale)} {it.external ? <ArrowUpRight /> : <ArrowRight />}
                </h3>
                <p className="v2-glass__seg">
                  {tr(it.seg, locale)} · {tr(it.kind, locale)}
                </p>
              </div>
              <span className="v2-stack">{`{ ${it.stack} }`}</span>
            </div>
            <span className="v2-glass__veil" aria-hidden="true" />
          </a>
        ))}

        <div className="v2-reel__hud" aria-hidden="true">
          <span className="v2-mono">
            <b ref={num}>01</b> / {String(N).padStart(2, '0')}
          </span>
          <span className="v2-reel__bar">
            <i ref={bar} />
          </span>
        </div>
      </div>
    </div>
  );
}
