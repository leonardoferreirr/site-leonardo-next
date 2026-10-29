'use client';

import '../home.css';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/routing';
import Header from '@/components/Header';
import CodeField from '@/components/CodeField';
import SectionCta from '@/components/v2/SectionCta';
import { logoSize } from '@/components/v2/ClientsMarquee';
import { useRevealAll } from '@/components/v2/hooks';
import { CLIENTS, clientLogo } from '@/data/v2/clients';

// "ver mais" da faixa de marcas: todas as empresas em ordem alfabética, só a logo em cinza dentro de um cartão (pedido de 29/10)
export default function ClientesPage() {
  useRevealAll();
  const locale = useLocale();
  const t = useTranslations('Home2.clients');
  const lista = [...CLIENTS].sort((a, b) => a.name.localeCompare(b.name, locale, { sensitivity: 'base', ignorePunctuation: true }));

  return (
    <>
      <CodeField variant="sticky" />
      <Header />
      <main className="v2">
        <section className="v2-sec v2-clients-page">
          <div className="v2-wrap">
            <Link href="/#marcas" className="v2-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t('back')}
            </Link>

            {/* entrada por transform (v2-rise), não por opacidade: o título é o LCP desta página */}
            <div className="v2-head v2-rise">
              <h1 className="v2-h2">{t('title')}</h1>
            </div>

            <ul className="v2-clients-grid">
              {lista.map((c) => {
                const s = logoSize(c, 6200, 68, 172);
                return (
                  <li key={c.slug} className="v2-in">
                    <img src={clientLogo(c.slug)} alt={c.name} title={c.name} width={s.w} height={s.h} loading="lazy" decoding="async" />
                  </li>
                );
              })}
            </ul>

            <SectionCta />
          </div>
        </section>
      </main>
    </>
  );
}
