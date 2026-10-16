'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { ArrowRight, Mail, WhatsApp } from './Icons';

const WA = 'https://wa.me/5534936180691?text=Oi%20L%C3%A9o!%20Vim%20pelo%20site%20e%20queria%20falar%20sobre%20um%20projeto!';
const EMAIL = 'leonardoferreirrs@gmail.com';
const STEP_COLORS = ['#4da3ff', '#6be07a', '#ffb547', '#ff5c8a'];

export function AboutSection() {
  const t = useTranslations('Home2.about');
  const steps = [0, 1, 2, 3];

  return (
    <section className="v2-sec v2-paper" id="sobre">
      <div className="v2-wrap">
        <div className="v2-about">
          <div className="v2-about__photo v2-in">
            <img src="/assets/profile.webp" alt="Leonardo Ferreira" width={1080} height={1080} loading="lazy" decoding="async" />
          </div>
          <div className="v2-about__text v2-in">
            <h2 className="v2-h2" style={{ marginBottom: 28 }}>
              {t('title')}
            </h2>
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </div>
        </div>

        <div className="v2-steps">
          {steps.map((i) => (
            <div className="v2-step v2-in" key={i} style={{ transitionDelay: `${i * 70}ms` }}>
              <b>
                <span className="v2-dot" style={{ background: STEP_COLORS[i] }} />
                {String(i + 1).padStart(2, '0')}
              </b>
              <h3>{t(`steps.${i}.t`)}</h3>
              <p>{t(`steps.${i}.d`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const t = useTranslations('Home2.cta');
  const f = useTranslations('Home2.footer');

  return (
    <>
      <section className="v2-sec v2-cta" id="contato">
        <div className="v2-wrap">
          <h2 className="v2-cta__title v2-in">
            {t('title_a')} <span>{t('title_b')}</span>
          </h2>
          <p className="v2-cta__sub v2-in">{t('sub')}</p>
          <div className="v2-cta__links v2-in">
            <Link href="/orcamento" className="v2-btn v2-btn--solid">
              {t('primary')} <ArrowRight />
            </Link>
            <a href={WA} target="_blank" rel="noopener" className="v2-btn v2-btn--ghost">
              <WhatsApp /> {t('whatsapp')}
            </a>
            <a href={`mailto:${EMAIL}`} className="v2-btn v2-btn--ghost">
              <Mail /> {t('email')}
            </a>
          </div>
        </div>
      </section>

      <footer className="v2-foot">
        <div className="v2-wrap v2-foot__in v2-mono">
          <span>
            © {new Date().getFullYear()} Leonardo Ferreira. {f('rights')}
          </span>
          <nav aria-label="Rodapé">
            <a href="https://www.instagram.com/leonardoferreirr/" target="_blank" rel="noopener">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/leonardo-ferreirr/" target="_blank" rel="noopener">
              LinkedIn
            </a>
            <Link href="/blog">Blog</Link>
            <Link href="/privacidade">{f('privacy')}</Link>
            <a href="#top">{f('top')} ↑</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
