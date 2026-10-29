'use client';

import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import PixelIcon from './PixelIcon';
import { CLIENTS, clientLogo, type Client } from '@/data/v2/clients';

// tamanho de exibição pela área, não pela altura: logo comprida fica baixa e logo quadrada fica alta,
// e as duas parecem do mesmo tamanho
export function logoSize(c: Client, area = 4200, maxH = 52, maxW = 168) {
  const r = c.w / c.h;
  let h = Math.min(Math.sqrt(area / r), maxH);
  let w = h * r;
  if (w > maxW) {
    w = maxW;
    h = w / r;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

const PASSO = 72; // respiro de cada logo (36 px de cada lado), igual ao padding do CSS
const VELOCIDADE = 95; // px por segundo no computador

// "Marcas que confiam no meu trabalho": duas faixas infinitas logo depois do hero,
// a de cima corre para a direita e a de baixo para a esquerda (pedido de 29/10/2026)
export default function ClientsMarquee() {
  const t = useTranslations('Home2.clients');
  const ref = useRef<HTMLElement>(null);

  const rows = useMemo(() => {
    const linhas: Client[][] = [[], []];
    CLIENTS.forEach((c, i) => linhas[i % 2].push(c));
    return linhas.map((linha) => ({
      items: linha,
      dur: linha.reduce((s, c) => s + logoSize(c).w + PASSO, 0) / VELOCIDADE,
    }));
  }, []);

  // só anda enquanto está na tela
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-on', e.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="v2-clients" id="marcas" aria-labelledby="marcas-titulo" ref={ref}>
      {/* mesmo título das seções (fonte e ícone de pixel), centralizado; sem v2-in: aparece já na primeira tela */}
      <div className="v2-wrap">
        <div className="v2-head v2-head--center">
          <h2 className="v2-h2 v2-clients__h2" id="marcas-titulo">
            <PixelIcon cat="marcas" />
            {t('title')}
          </h2>
        </div>
      </div>

      <div className="v2-clients__rows">
        {rows.map((row, i) => (
          <div className={`v2-clients__row${i === 0 ? ' is-dir' : ''}`} key={i}>
            <ul className="v2-clients__track" style={{ '--dur': `${row.dur.toFixed(1)}s` } as CSSProperties}>
              {[...row.items, ...row.items].map((c, j) => {
                const copia = j >= row.items.length;
                const s = logoSize(c);
                return (
                  <li key={`${c.slug}-${j}`} aria-hidden={copia || undefined}>
                    <img
                      src={clientLogo(c.slug)}
                      alt={copia ? '' : c.name}
                      width={s.w}
                      height={s.h}
                      style={{ '--w': s.w } as CSSProperties}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="v2-clients__more v2-in">
        <Link href="/clientes" className="v2-btn v2-btn--ghost v2-btn--sm">
          {t('more')}
        </Link>
      </div>
    </section>
  );
}
