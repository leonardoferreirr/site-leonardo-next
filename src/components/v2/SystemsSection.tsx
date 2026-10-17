'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import PixelIcon from './PixelIcon';
import SectionCta from './SectionCta';
import GlassReel, { type ReelItem } from './GlassReel';
import { AGENCY, SYSTEMS, tr, type System } from '@/data/v2/catalog';

// painel de prospecção desenhado em código: números de demonstração, nada de dado real
function Outreach({ label, kpi }: { label: string; kpi: [string, string, string, string] }) {
  const bars = [38, 52, 44, 70, 61, 83, 58, 76, 92, 66, 88, 100, 74, 95];
  return (
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
  );
}

// brilho atrás da tela do centro, na ordem da vitrine
const GLOW: Record<string, string> = {
  'agencia-ia': '#4da3ff',
  'crm-estetica': '#ff5c8a',
  'crm-infantil': '#ffb547',
  'crm-advocacia': '#b18cff',
  envios: '#6be07a',
  prospeccao: '#4da3ff',
};

const shots = (sys: System) => sys.screens.map((s) => ({ lg: s.src, md: s.src.replace('.webp', '-sm.webp') }));

export default function SystemsSection() {
  const t = useTranslations('Home2.systems');
  const locale = useLocale();

  // a agência abre a vitrine; o CRM da clínica vem logo depois
  const items = useMemo<ReelItem[]>(
    () =>
      [AGENCY, ...SYSTEMS].map((sys) => ({
        key: sys.slug,
        name: tr(sys.name, locale),
        sub: tr(sys.desc, locale),
        stack: sys.stack,
        color: GLOW[sys.slug] ?? '#6be07a',
        shots: sys === AGENCY ? shots(sys).slice(0, 1) : shots(sys),
        video: sys === AGENCY ? sys.screens[0].video : undefined,
        pixel: sys === AGENCY,
        badge: sys.soon ? (
          <span className="v2-soon">
            {t('soon')}
            <i aria-hidden="true" />
          </span>
        ) : undefined,
        node: sys.screens.length ? undefined : (
          <Outreach label={tr(sys.name, locale)} kpi={[t('kpi_sent'), t('kpi_opens'), t('kpi_clicks'), t('kpi_meetings')]} />
        ),
      })),
    [locale, t],
  );

  return (
    <section className="v2-sec v2-sec--reel" id="sistemas">
      <div className="v2-wrap">
        <div className="v2-head v2-head--center v2-in">
          <h2 className="v2-h2">
            <PixelIcon cat="sistemas" />
            {t('title')}
          </h2>
        </div>
      </div>

      <GlassReel items={items} label={t('title')} variant="systems" />

      <div className="v2-wrap">
        <p className="v2-mono v2-pin__note">* {t('demo')}</p>
        <SectionCta />
      </div>
    </section>
  );
}
