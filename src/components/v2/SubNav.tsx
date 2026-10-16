'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import PixelIcon from './PixelIcon';
import { CATEGORY_LABEL, tr, type Category } from '@/data/v2/catalog';

const ORDER: Category[] = ['sites', 'sistemas', 'identidade', 'social', 'video', 'lab'];

// ícones grandes logo depois do hero; ao grudar no topo, encolhem e viram a barra de categorias
export default function SubNav() {
  const locale = useLocale();
  const [active, setActive] = useState<string>('');
  const [stuck, setStuck] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const secs = ORDER.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const top = parseFloat(getComputedStyle(el).top) || 0;
      setStuck(el.getBoundingClientRect().top <= top + 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav ref={ref} className={`v2-subnav${stuck ? ' is-stuck' : ''}`} aria-label="Categorias">
      <div className="v2-subnav__in">
        {ORDER.map((c) => (
          <a key={c} href={`#${c}`} aria-current={active === c ? 'true' : undefined}>
            <PixelIcon cat={c} />
            <span>{tr(CATEGORY_LABEL[c], locale)}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
