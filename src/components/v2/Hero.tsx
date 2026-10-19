'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { ArrowRight } from './Icons';

// topo: título, frase e os dois botões. A vitrine em slideshow que vinha logo abaixo saiu (19/10):
// depois do topo já entram os ícones das categorias e a seção de sites.
export default function Hero() {
  const t = useTranslations('Home2');

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
      </div>
    </section>
  );
}
