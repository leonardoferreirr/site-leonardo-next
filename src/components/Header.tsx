'use client';

import './header.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { WhatsApp } from './v2/Icons';
import { WHATSAPP_URL } from './v2/SectionCta';

// cabeçalho do site: some ao descer, volta ao subir; no celular vira menu em tela cheia
export default function Header() {
  const t = useTranslations('Home2.nav');
  const c = useTranslations('Home2.cta');
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setSolid(y > 24);
        const h = y > 240 && y > last;
        setHidden(h);
        // a barra de categorias da home sobe quando o cabeçalho some
        document.documentElement.dataset.hdr = h ? 'off' : 'on';
        last = y;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { href: '/#sites', label: t('work') },
    { href: '/#sistemas', label: t('systems') },
    { href: '/#servicos', label: t('services') },
    { href: '/#sobre', label: t('about') },
  ];

  return (
    <header className={`lf-header${hidden && !open ? ' is-hidden' : ''}${solid || open ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <div className="lf-header__in">
        <Link href="/" className="lf-logo" onClick={() => setOpen(false)}>
          <img className="lf-logo__mark" src="/assets/v2/logo-caricatura.webp" alt="" width={36} height={36} />
          <span className="lf-logo__name">Leonardo Ferreira</span>
        </Link>

        <nav className="lf-nav" id="lf-nav" aria-label="Principal">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="lf-nav__extra">
            <LanguageSwitcher />
            {/* contato só pelo WhatsApp (19/10): o botão do topo deixou de levar ao formulário */}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="lf-cta" onClick={() => setOpen(false)}>
              <WhatsApp /> {c('section')}
            </a>
          </div>
        </nav>

        <button
          type="button"
          className="lf-burger"
          aria-expanded={open}
          aria-controls="lf-nav"
          aria-label={open ? t('close') : t('menu')}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
