'use client';

import { useMemo, useState } from 'react';
import {
  webProjects,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type WebCategory,
} from '@/data/webProjects';

type Filter = WebCategory | 'todos';

export default function PortfolioGrid() {
  const [active, setActive] = useState<Filter>('todos');

  const visible = useMemo(
    () => (active === 'todos' ? webProjects : webProjects.filter((p) => p.category === active)),
    [active]
  );

  // só mostra o filtro que tem projeto por trás
  const filters = useMemo(
    () =>
      CATEGORY_ORDER.filter(
        (c) => c === 'todos' || webProjects.some((p) => p.category === c)
      ),
    []
  );

  return (
    <>
      <p className="pf-count">
        {visible.length} {visible.length === 1 ? 'projeto' : 'projetos'}
      </p>

      <div className="pf-filters" role="group" aria-label="Filtrar projetos por segmento">
        {filters.map((c) => (
          <button
            key={c}
            type="button"
            className="pf-chip"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div className="pf-grid">
        {visible.map((p, i) => (
          <a
            key={p.title}
            className="pf-card"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${Math.min(i, 11) * 45}ms` }}
            aria-label={`Abrir o site ${p.title} em uma nova aba`}
          >
            <div className="pf-thumb">
              <img
                src={p.cover}
                srcSet={`${p.cover.replace('.webp', '-sm.webp')} 480w, ${p.cover} 1200w`}
                sizes="(max-width: 860px) 50vw, (max-width: 1180px) 33vw, 25vw"
                alt={`Site ${p.title}, ${p.segment}`}
                loading={i < 4 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                decoding="async"
                width={1200}
                height={750}
              />
              <span className="pf-veil" aria-hidden="true" />
              <span className="pf-open" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </div>
            <div className="pf-meta">
              <span className="pf-name">{p.title}</span>
              <span className="pf-seg">{p.segment}</span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
