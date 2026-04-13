'use client';

import { notFound, useRouter } from 'next/navigation';
import { use } from 'react';
import { blogPosts } from '@/data/blogPosts';
import Header from '@/components/Header';
import { Link } from '@/routing';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

export default function BlogPostPage({ params }: { params: Promise<{ locale: string; postSlug: string }> }) {
  const { locale, postSlug } = use(params);
  const post = blogPosts.find(p => p.slug === postSlug);

  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: post.author, url: `https://www.leonardoferreirr.com.br/${locale}` },
    publisher: { '@type': 'Organization', name: 'Leonardo Ferreira Design', url: 'https://www.leonardoferreirr.com.br' },
    datePublished: post.date,
    dateModified: post.dateModified,
    url: `https://www.leonardoferreirr.com.br/${locale}/blog/${post.slug}`,
    inLanguage: locale === 'pt' ? 'pt-BR' : locale,
  };

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <Header />

      <main style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="ds-container" style={{ maxWidth: '760px' }}>

          {/* Back link */}
          <Link
            href="/blog"
            className="ds-body-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--ds-text-secondary)',
              textDecoration: 'none',
              marginBottom: '48px',
              transition: 'color var(--speed-fast)',
            }}
          >
            ← Voltar ao Blog
          </Link>

          {/* Post Header */}
          <header style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
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
              <span className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)' }}>{post.readingTime}</span>
              <span className="ds-body-sm" style={{ color: 'var(--ds-text-secondary)' }}>
                {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 className="ds-h2" style={{ marginBottom: '16px', lineHeight: 1.3 }}>{post.title}</h1>
            <p className="ds-body-lg" style={{ color: 'var(--ds-text-secondary)' }}>{post.description}</p>
          </header>

          <hr style={{ border: 'none', borderTop: '1px solid var(--ds-glass-border)', marginBottom: '48px' }} />

          {/* Post Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {post.content.map((section, i) => {
              if (section.type === 'hr') {
                return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--ds-glass-border)' }} />;
              }
              if (section.type === 'intro') {
                return (
                  <p key={i} className="ds-body-lg" style={{ fontWeight: 600, lineHeight: 1.7 }}>
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'h2') {
                return (
                  <h2 key={i} className="ds-h3" style={{ fontSize: '1.5rem', marginTop: '8px' }}>
                    {section.text}
                  </h2>
                );
              }
              if (section.type === 'h3') {
                return (
                  <h3 key={i} className="ds-body-lg" style={{ fontWeight: 600 }}>
                    {section.text}
                  </h3>
                );
              }
              if (section.type === 'p') {
                return (
                  <p key={i} className="ds-body" style={{ lineHeight: 1.8, color: 'var(--ds-text-secondary)' }}>
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'ul') {
                return (
                  <ul key={i} style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {section.items?.map((item, j) => (
                      <li key={j} className="ds-body" style={{ color: 'var(--ds-text-secondary)', lineHeight: 1.7 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (section.type === 'quote') {
                return (
                  <blockquote
                    key={i}
                    style={{
                      borderLeft: '2px solid var(--ds-text-primary)',
                      paddingLeft: '24px',
                      fontStyle: 'italic',
                      color: 'var(--ds-text-secondary)',
                      margin: '8px 0',
                    }}
                  >
                    {section.text}
                  </blockquote>
                );
              }
              if (section.type === 'cta') {
                return (
                  <div
                    key={i}
                    className="ds-glass-card"
                    style={{ textAlign: 'center', marginTop: '24px' }}
                  >
                    <p className="ds-body-lg" style={{ marginBottom: '24px', fontWeight: 500 }}>
                      {section.text?.split('Solicite uma proposta')[0]}
                    </p>
                    <Link
                      href="/orcamento"
                      style={{
                        display: 'inline-block',
                        background: 'var(--ds-text-primary)',
                        color: 'var(--ds-bg-color)',
                        padding: '14px 32px',
                        borderRadius: '100px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'opacity var(--speed-normal)',
                      }}
                    >
                      Solicite uma proposta →
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--ds-glass-border)' }}>
            {post.tags.map(tag => (
              <span
                key={tag}
                className="ds-body-sm"
                style={{
                  padding: '4px 12px',
                  borderRadius: '100px',
                  border: '1px solid var(--ds-glass-border)',
                  color: 'var(--ds-text-secondary)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--ds-glass-border)' }}>
        <div className="ds-container footer-container">
          <div className="ds-body-sm footer-copyright">
            © 2023 Leonardo Ferreira. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
