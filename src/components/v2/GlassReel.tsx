'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from '@/routing';
import { ArrowUpRight } from './Icons';
import { useNear } from './hooks';

// Vitrine fixada: a seção prende a tela e as janelas de vidro descem da direita para a esquerda
// numa diagonal em perspectiva (cover flow). Tudo em transform/opacity, calculado no rAF do scroll.
// Usada em Sites (prints dos sites, link externo), Sistemas (telas trocando sozinhas, sem link)
// e Identidade (logo e aplicações trocando sozinhas, link para o case no próprio site).

export type ReelItem = {
  key: string;
  name: string;
  sub: string; // linha de baixo: segmento e tipo (sites) ou descrição (sistemas)
  stack: string;
  color: string; // brilho atrás quando a tela está no centro
  href?: string; // sem link o cartão não é clicável
  internal?: boolean; // link para página do próprio site (abre na mesma aba, com o idioma)
  shots: { lg: string; md: string }[]; // com mais de uma, a tela do centro troca sozinha
  m?: string; // print em retrato para o celular
  video?: string;
  pixel?: boolean;
  badge?: ReactNode;
  node?: ReactNode; // tela desenhada em código no lugar do print
};

// passo lateral e vertical em fração do cartão (vertical negativo: os da direita vêm de cima), recuo em px, giro em graus
const DESK = { kx: 0.74, ky: -0.2, kz: 260, ry: 24, maxRy: 50 };
const MOB = { kx: 0.9, ky: -0.1, kz: 160, ry: 14, maxRy: 32 };
const SWAP_MS = 3200;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function GlassReel({ items, label, variant }: { items: ReelItem[]; label: string; variant: 'sites' | 'systems' | 'brands' }) {
  const N = items.length;
  const [outer, near] = useNear<HTMLDivElement>('400px');
  const stage = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrap = outer.current, st = stage.current;
    if (!wrap || !st || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(st.querySelectorAll<HTMLElement>('.v2-glass'));
    const veils = cards.map((c) => c.querySelector<HTMLElement>('.v2-glass__veil')!);
    const shines = cards.map((c) => c.querySelector<HTMLElement>('.v2-glass__shine')!);
    const shots = cards.map((c) => Array.from(c.querySelectorAll<HTMLImageElement>('img.v2-glass__img')));
    const videos = cards.map((c) => c.querySelector<HTMLVideoElement>('video[data-src]'));

    let W = 0, H = 0, vh = 0, dist = 0, lead = 0, cfg = DESK;
    let raf = 0, active = -1, live = false, playing: HTMLVideoElement | null = null, swap = 0;

    const measure = () => {
      cfg = window.matchMedia('(max-width: 760px)').matches ? MOB : DESK;
      W = cards[0].offsetWidth;
      H = cards[0].offsetHeight;
      vh = st.offsetHeight;
      dist = Math.max(1, wrap.offsetHeight - vh);
      lead = Math.min(dist * 0.12, vh * 0.2); // respiro no começo e no fim do trilho
    };

    // a tela do centro troca de print de tempos em tempos (só quando o cartão tem mais de um)
    const show = (imgs: HTMLImageElement[], k: number) => {
      const img = imgs[k];
      if (!img.getAttribute('src') && img.dataset.src) {
        img.srcset = img.dataset.srcset || '';
        img.src = img.dataset.src;
      }
      imgs.forEach((im, j) => im.classList.toggle('is-on', j === k));
    };
    const tick = () => {
      if (!live || active < 0) return;
      const imgs = shots[active];
      if (imgs.length < 2) return;
      const k = (imgs.findIndex((im) => im.classList.contains('is-on')) + 1) % imgs.length;
      show(imgs, k);
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
        if (active >= 0) cards[active].classList.remove('is-active');
        active = a;
        cards[a].classList.add('is-active');
        if (glow.current) glow.current.style.color = items[a].color;
        if (num.current) num.current.textContent = String(a + 1).padStart(2, '0');
        window.clearInterval(swap);
        swap = window.setInterval(tick, SWAP_MS);
      }
      if (bar.current) bar.current.style.transform = `scaleX(${t.toFixed(4)})`;

      // vídeo: carrega quando chega perto e só toca no centro
      videos.forEach((v, i) => {
        if (!v) return;
        const dv = Math.abs(i - p);
        if (dv < 1.6 && !v.getAttribute('src')) v.src = v.dataset.src!;
        if (dv < 0.5 && live && playing !== v) {
          playing = v;
          v.play().catch(() => (playing = null));
        } else if ((dv >= 0.5 || !live) && playing === v) {
          playing = null;
          v.pause();
        }
      });
    };

    const ask = () => {
      if (live && !raf) raf = requestAnimationFrame(render);
    };

    // só trabalha enquanto a vitrine está na tela
    const io = new IntersectionObserver(([e]) => {
      live = e.isIntersecting;
      wrap.classList.toggle('is-live', live);
      if (live) ask();
      else if (playing) {
        playing.pause();
        playing = null;
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
      window.clearInterval(swap);
      io.disconnect();
      ro.disconnect();
      cards.forEach((c, i) => c.removeEventListener('focus', focusers[i]));
      if (raf) cancelAnimationFrame(raf);
    };
  }, [outer, items, N]);

  return (
    <div className={`v2-pin v2-pin--${variant}`} ref={outer} style={{ ['--n' as string]: N }} role="region" aria-label={label}>
      <div className="v2-pin__stage" ref={stage}>
        <div className="v2-pin__glow" ref={glow} style={{ color: items[0].color }} aria-hidden="true" />

        {items.map((it, i) => {
          const body = (
            <>
              <span className="v2-glass__shine" aria-hidden="true" />
              <div className="v2-glass__shot">
                {it.node ??
                  it.shots.map((s, j) => (
                    <picture key={s.lg}>
                      {near && j === 0 && it.m ? <source media="(max-width: 760px)" srcSet={it.m} width={540} height={960} /> : null}
                      <img
                        className={`v2-glass__img${j === 0 ? ' is-on' : ''}`}
                        src={near && j === 0 ? s.lg : undefined}
                        srcSet={near && j === 0 ? `${s.md} 800w, ${s.lg} 1600w` : undefined}
                        data-src={j > 0 ? s.lg : undefined}
                        data-srcset={j > 0 ? `${s.md} 800w, ${s.lg} 1600w` : undefined}
                        sizes="(max-width: 760px) 86vw, 60vw"
                        alt={j === 0 ? `${it.name}: ${it.sub}` : ''}
                        width={1600}
                        height={1000}
                        decoding="async"
                        style={it.pixel ? { imageRendering: 'pixelated' } : undefined}
                      />
                    </picture>
                  ))}
                {it.video ? (
                  <video
                    data-src={it.video}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    style={it.pixel ? { imageRendering: 'pixelated' } : undefined}
                  />
                ) : null}
              </div>
              <div className="v2-glass__meta">
                <div>
                  <h3 className="v2-glass__name">
                    {it.name} {it.href ? <ArrowUpRight /> : null}
                    {it.badge}
                  </h3>
                  <p className="v2-glass__sub">{it.sub}</p>
                </div>
                <span className="v2-stack">{`{ ${it.stack} }`}</span>
              </div>
              <span className="v2-glass__veil" aria-hidden="true" />
            </>
          );
          if (it.href && it.internal)
            return (
              <Link key={it.key} className="v2-glass" style={{ ['--i' as string]: i }} href={it.href}>
                {body}
              </Link>
            );
          return it.href ? (
            <a key={it.key} className="v2-glass" style={{ ['--i' as string]: i }} href={it.href} target="_blank" rel="noopener">
              {body}
            </a>
          ) : (
            <article key={it.key} className="v2-glass" style={{ ['--i' as string]: i }}>
              {body}
            </article>
          );
        })}

        <div className="v2-pin__hud" aria-hidden="true">
          <span className="v2-mono">
            <b ref={num}>01</b> / {String(N).padStart(2, '0')}
          </span>
          <span className="v2-pin__bar">
            <i ref={bar} />
          </span>
        </div>
      </div>
    </div>
  );
}
