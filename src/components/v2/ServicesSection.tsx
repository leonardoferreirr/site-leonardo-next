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
        <div className="v2-head v2-head--center v2-in">
          <h2 className="v2-h2">{t('title')}</h2>
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

        <ul className="v2-tools v2-in" aria-label={t('tools_label')}>
          {TOOLS.map((tool) => (
            <li className="v2-tool" key={tool.name}>
              <img src={`/assets/v2/tools/${tool.logo}.svg`} alt="" width={40} height={40} loading="lazy" decoding="async" />
              <span>{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
