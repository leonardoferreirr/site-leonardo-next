'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { blogPosts } from '@/data/blogPosts';
import Header from '@/components/Header';

export default function BlogPage() {
  const { setRef } = useIntersectionObserver();
  const t = useTranslations('Blog');

  return (
    <>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="ds-container">

          {/* Page Header */}
          <div className="ds-section-title fade-in-up" ref={setRef(0)} style={{ marginBottom: '64px' }}>
            <span className="ds-body-sm">{t('tag')}</span>
            <h1 className="ds-h2">{t('title')}</h1>
            <p className="ds-body" style={{ maxWidth: '600px', margin: '16px auto 0' }}>{t('subtitle')}</p>
          </div>

          {/* Blog Posts Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}` as any}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article
                  className="ds-glass-card fade-in-up"
                  ref={setRef(i + 1)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'transform var(--speed-normal), box-shadow var(--speed-normal)',
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--ds-shadow-light), 0 8px 32px rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  {/* Category + Reading Time */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      className="ds-body-sm"
                      style={{
                        color: 'var(--ds-text-primary)',
                        background: 'rgba(255,255,255,0.08)',
                        padding: '4px 12px',
                        borderRadius: '100px',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)' }}>
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="ds-h3"
                    style={{ fontSize: '1.25rem', lineHeight: 1.4, margin: 0 }}
                  >
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="ds-body"
                    style={{
                      color: 'var(--ds-text-secondary)',
                      margin: 0,
                      flexGrow: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    {post.description}
                  </p>

                  {/* Footer: date + read link */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--ds-glass-border)',
                      paddingTop: '16px',
                      marginTop: 'auto',
                    }}
                  >
                    <span className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)' }}>
                      {new Date(post.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <span
                      className="ds-body-sm"
                      style={{
                        color: 'var(--ds-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {t('read_more')} →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--ds-glass-border)' }}>
        <div className="ds-container footer-container">
          <div className="ds-body-sm footer-copyright">
            <span style={{ marginRight: '8px' }}>© 2023 Leonardo Ferreira. Todos os direitos reservados.</span>
            <Link href="/privacidade" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacidade</Link>
          </div>
          <div className="footer-actions">
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://wa.me/5534936180691?text=Oi%20Léo!%20Vim%20pelo%20site%20e%20queria%20falar%20sobre%20a%20minha%20marca!" target="_blank" rel="noopener noreferrer" className="ds-body-sm" style={{ color: 'var(--ds-text-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/leonardoferreirr/" target="_blank" rel="noopener noreferrer" className="ds-body-sm" style={{ color: 'var(--ds-text-primary)' }}>
                <i data-feather="instagram" style={{ width: '20px', height: '20px' }}></i>
              </a>
              <a href="https://www.linkedin.com/in/leonardo-ferreirr/" target="_blank" rel="noopener noreferrer" className="ds-body-sm" style={{ color: 'var(--ds-text-primary)' }}>
                <i data-feather="linkedin" style={{ width: '20px', height: '20px' }}></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
