'use client';

import { Link } from '@/routing';

export default function ButtonBeam({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="shimmer-btn-wrapper">
      <div className="glow-bg"></div>
      <Link href={href} className="ds-btn ds-btn-beam group">
        <span className="ds-btn-beam-bg"></span>
        <span className="ds-btn-beam-inner">
          <span className="ds-btn-beam-shimmer"></span>
          <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 500, fontFamily: 'var(--font-secondary)', color: 'var(--ds-text-primary)' }}>
            {children}
          </span>
        </span>
      </Link>
    </div>
  );
}
