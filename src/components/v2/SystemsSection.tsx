'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import MacWindow from './MacWindow';
import PixelIcon from './PixelIcon';
import { ArrowRight } from './Icons';
import { useCycle, useInView, useReducedMotion } from './hooks';
import { AGENCY, SYSTEMS, tr, type System } from '@/data/v2/catalog';
import { Link } from '@/routing';

// telas com abas; gira sozinho enquanto visível e para quando a pessoa escolhe uma aba
function Screens({ sys, locale, pixel = false, interval = 4200 }: { sys: System; locale: string; pixel?: boolean; interval?: number }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>('0px');
  const [cur, pick] = useCycle(sys.screens.length, interval, inView && !reduced);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // vídeo só toca na aba ativa e com a seção na tela
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === cur && inView && !reduced) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [cur, inView, reduced]);

  return (
    <div ref={ref}>
      <MacWindow title={tr(sys.name, locale)}>
        {sys.screens.map((s, i) =>
          s.video ? (
            <video
              key={s.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className={`v2-slide${i === cur ? ' is-on' : ''}`}
              data-src={s.video}
              poster={s.src}
              muted
              loop
              playsInline
              preload="none"
              aria-label={tr(s.label, locale)}
              style={pixel ? { imageRendering: 'pixelated' } : undefined}
            />
          ) : (
            <img
              key={s.src}
              className={`v2-slide${i === cur ? ' is-on' : ''}`}
              src={s.src}
              srcSet={`${s.src.replace('.webp', '-sm.webp')} 800w, ${s.src} 1600w`}
              sizes="(max-width: 860px) 100vw, 720px"
              alt={`${tr(sys.name, locale)}: ${tr(s.label, locale)}`}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              style={pixel ? { imageRendering: 'pixelated' } : undefined}
            />
          ),
        )}
      </MacWindow>
      {sys.screens.length > 1 ? (
        <div className="v2-tabs" role="group" aria-label={tr(sys.name, locale)}>
          {sys.screens.map((s, i) => (
            <button key={s.src} type="button" aria-pressed={i === cur} onClick={() => pick(i)}>
              {tr(s.label, locale)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// painel de prospecção desenhado em código: números de demonstração, nada de dado real
function Outreach({ label, kpi }: { label: string; kpi: [string, string, string, string] }) {
  const [ref, inView] = useInView<HTMLDivElement>('-10% 0px');
  const bars = [38, 52, 44, 70, 61, 83, 58, 76, 92, 66, 88, 100, 74, 95];
  return (
    <div ref={ref} className={inView ? 'is-in' : ''}>
      <MacWindow title={label}>
        <div className="v2-outreach" role="img" aria-label={label}>
          <div className="v2-outreach__kpis">
            <div className="v2-outreach__kpi">
              <small>{kpi[0]}</small>
              <b>1.240</b>
            </div>
            <div className="v2-outreach__kpi">
              <small>{kpi[1]}</small>
              <b>
                54%<em>+6</em>
              </b>
            </div>
            <div className="v2-outreach__kpi">
              <small>{kpi[2]}</small>
              <b>
                11%<em>+2</em>
              </b>
            </div>
            <div className="v2-outreach__kpi">
              <small>{kpi[3]}</small>
              <b>18</b>
            </div>
          </div>
          <div className="v2-outreach__bars" aria-hidden="true">
            {bars.map((h, i) => (
              <i key={i} style={{ height: `${h}%`, transitionDelay: `${i * 45}ms` }} />
            ))}
          </div>
        </div>
      </MacWindow>
    </div>
  );
}

export default function SystemsSection() {
  const t = useTranslations('Home2.systems');
  const locale = useLocale();
  const [crm, ...rest] = SYSTEMS;

  return (
    <section className="v2-sec" id="sistemas">
      <div className="v2-wrap">
        <div className="v2-head v2-in">
          <h2 className="v2-h2">
            <PixelIcon cat="sistemas" />
            {t('title')}
          </h2>
          <p className="v2-lead">{t('lead')}</p>
        </div>

        {/* o maior destaque: a agência de IA */}
        <article className="v2-agency v2-in">
          <div>
            <h3 className="v2-agency__name">
              {tr(AGENCY.name, locale)}
              <span className="v2-soon">
                {t('soon')}
                <i aria-hidden="true" />
              </span>
            </h3>
            <p className="v2-agency__desc">{tr(AGENCY.desc, locale)}</p>
            <ul className="v2-points">
              {AGENCY.points?.map((p) => (
                <li key={p.pt}>{tr(p, locale)}</li>
              ))}
            </ul>
            <div className="v2-agency__foot">
              <Link href="/orcamento" className="v2-btn v2-btn--ghost">
                {t('agency_cta')} <ArrowRight />
              </Link>
              <span className="v2-stack">{`{ ${AGENCY.stack} }  2026`}</span>
            </div>
          </div>
          <Screens sys={AGENCY} locale={locale} pixel interval={6500} />
        </article>

        <div className="v2-sys">
          {/* destaque secundário */}
          <article className="v2-sys__card v2-sys__card--wide v2-in">
            <div>
              <h3 className="v2-sys__name">{tr(crm.name, locale)}</h3>
              <p className="v2-sys__desc">{tr(crm.desc, locale)}</p>
              <div className="v2-sys__foot">
                <span className="v2-stack">{`{ ${crm.stack} }  2026`}</span>
              </div>
            </div>
            <Screens sys={crm} locale={locale} />
          </article>

          {rest.map((s) => (
            <article className="v2-sys__card v2-in" key={s.slug}>
              <h3 className="v2-sys__name">{tr(s.name, locale)}</h3>
              <p className="v2-sys__desc">{tr(s.desc, locale)}</p>
              {s.screens.length ? <Screens sys={s} locale={locale} /> : <Outreach label={tr(s.name, locale)} kpi={[t('kpi_sent'), t('kpi_opens'), t('kpi_clicks'), t('kpi_meetings')]} />}
              <div className="v2-sys__foot">
                <span className="v2-stack">{`{ ${s.stack} }  2026`}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="v2-mono" style={{ marginTop: 28, color: '#8a8a8a' }}>
          * {t('demo')}
        </p>
      </div>
    </section>
  );
}
