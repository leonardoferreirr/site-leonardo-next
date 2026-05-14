'use client';

import { Link } from '@/routing';

type Category = 'brand' | 'web' | 'traffic';

const CATEGORY_LABEL: Record<Category, string> = {
  brand: 'Branding',
  web: 'Website',
  traffic: 'Tráfego',
};

const CATEGORY_ICON: Record<Category, React.ReactNode> = {
  brand: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  web: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  traffic: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="12"/><line x1="12" y1="12" x2="20" y2="12"/>
    </svg>
  ),
};

export default function ProjectCard({
  slug,
  title,
  imageSrc,
  imageSrcMobile,
  category = 'brand',
  externalUrl,
}: {
  slug: string;
  title: string;
  imageSrc: string;
  imageSrcMobile?: string;
  category?: Category;
  externalUrl?: string;
}) {
  const badge = (
    <span
      className="ds-project-badge"
      style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 2,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '999px',
        background: 'rgba(0,0,0,0.55)',
        color: '#fff',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        fontWeight: 600,
        border: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      {CATEGORY_ICON[category]}
      {CATEGORY_LABEL[category]}
    </span>
  );

  const inner = (
    <>
      {badge}
      <picture>
        {imageSrcMobile && <source media="(max-width: 768px)" srcSet={imageSrcMobile} />}
        <img src={imageSrc} alt={title} />
      </picture>
      <div className="ds-project-overlay">
        <h3 className="ds-project-title-tag">{title}</h3>
      </div>
    </>
  );

  const commonProps = {
    className: 'ds-project-card',
    style: { position: 'relative' as const },
  };

  if (externalUrl) {
    return (
      <a
        {...commonProps}
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir site ${title} em nova aba`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link {...commonProps} href={`/${slug}`}>
      {inner}
    </Link>
  );
}
