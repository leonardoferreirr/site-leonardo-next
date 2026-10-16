'use client';

import { useLocale, useTranslations } from 'next-intl';
import PixelIcon from './PixelIcon';
import { SERVICES, TOOLS, tr, type Category } from '@/data/v2/catalog';

export default function ServicesSection() {
  const t = useTranslations('Home2.services');
  const locale = useLocale();

  return (
    <section className="v2-sec v2-paper" id="servicos">
      <div className="v2-wrap">
        <div className="v2-head v2-in">
          <h2 className="v2-h2">{t('title')}</h2>
          <p className="v2-lead">{t('lead')}</p>
        </div>

        <div className="v2-services">
          {SERVICES.map((s, i) => (
            <article className="v2-service v2-in" key={s.key} style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div className="v2-service__n v2-mono">
                {s.key === 'trafego' ? (
                  <span className="v2-dot" style={{ background: '#0b0b0b' }} />
                ) : (
                  <PixelIcon cat={s.key as Category} className="v2-service__px" />
                )}
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3>{tr(s.title, locale)}</h3>
              <p>{tr(s.desc, locale)}</p>
              <span className="v2-stack">{`{ ${s.tools} }`}</span>
            </article>
          ))}
        </div>

        <div className="v2-tools v2-in" aria-label={t('tools_label')}>
          {TOOLS.map((tool, i) => (
            <span className="v2-tool" key={tool}>
              <span className="v2-dot" style={{ background: ['#4da3ff', '#6be07a', '#ff5c8a', '#ffb547', '#ff6b4a', '#b18cff'][i % 6] }} />
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
