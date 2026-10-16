'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import PixelIcon from './PixelIcon';
import { CATEGORY_LABEL, tr, type Category } from '@/data/v2/catalog';

const ORDER: Category[] = ['sites', 'sistemas', 'identidade', 'social', 'video', 'lab'];

// barra de categorias que gruda no topo depois do hero e marca a seção atual
export default function SubNav() {
  const locale = useLocale();
  const [active, setActive] = useState<string>('');

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

  return (
    <nav className="v2-subnav" aria-label="Categorias">
      <div className="v2-subnav__in">
        {ORDER.map((c) => (
          <a key={c} href={`#${c}`} aria-current={active === c ? 'true' : undefined}>
            <PixelIcon cat={c} />
            {tr(CATEGORY_LABEL[c], locale)}
          </a>
        ))}
      </div>
    </nav>
  );
}
