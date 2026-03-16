'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.feather) {
      // @ts-ignore
      window.feather.replace();
    }
  }); // Run after every render to catch any dynamically injected icons (like the Footer)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      style={{
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '24px 0',
        pointerEvents: 'none',
        transition: 'transform 0.4s ease, opacity 0.4s ease',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        opacity: hidden ? 0 : 1
      }}
    >
      <div
        className="ds-container fade-in-up visible header-container"
        style={{ padding: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}
      >
        <nav
          className="ds-glass-card main-nav"
          style={{
            padding: '16px 40px',
            borderRadius: '100px',
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            boxShadow: 'var(--ds-shadow-light), var(--ds-glass-inner)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all var(--speed-normal)'
          }}
        >
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--ds-text-primary)',
              cursor: 'pointer',
              display: 'none',
              padding: '8px'
            }}
          >
            <i data-feather={isMenuOpen ? "x" : "menu"} style={{ width: '24px', height: '24px' }}></i>
          </button>

          {/* Desktop Links */}
          <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            <Link href="/#projetos" className="ds-body-sm nav-link" onClick={() => setIsMenuOpen(false)}>{t('projects')}</Link>
            <Link href="/#metodologia" className="ds-body-sm nav-link" onClick={() => setIsMenuOpen(false)}>{t('methodology')}</Link>
            <Link href="/#sobre" className="ds-body-sm nav-link" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
            <Link href="/#entregaveis" className="ds-body-sm nav-link" onClick={() => setIsMenuOpen(false)}>{t('deliverables')}</Link>
            <Link href="/#contato" className="ds-body-sm nav-link" onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link>
          </div>

          <div className="nav-divider" style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
          <LanguageSwitcher />
        </nav>
      </div>
      <style jsx>{`
        .nav-link {
          text-decoration: none;
          font-weight: 500;
          transition: color var(--speed-normal);
          color: var(--ds-text-primary);
        }
        .nav-link:hover {
          color: #FFFFFF;
        }
      `}</style>
    </header>
  );
}
