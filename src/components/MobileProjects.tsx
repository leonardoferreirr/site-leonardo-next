'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from '@/routing';

type Category = 'all' | 'brand' | 'web';

type Project = {
  slug: string;
  title: string;
  imageSrc: string;
  imageSrcMobile?: string;
  category: 'brand' | 'web';
  externalUrl?: string;
};

const projects: Project[] = [
  // === BRANDING (9) ===
  { slug: 'projeto-mademax', title: 'MADEMAX', imageSrc: '/assets/00. Cover/01. MADEMAX.png', category: 'brand' },
  { slug: 'projeto-biothera', title: 'Biothera', imageSrc: '/assets/00. Cover/02. Biothera.png', category: 'brand' },
  { slug: 'projeto-divinocar', title: 'Divino Car', imageSrc: '/assets/00. Cover/03. Divino Car.png', category: 'brand' },
  { slug: 'projeto-proconsult', title: 'ProConsult', imageSrc: '/assets/00. Cover/04. ProConsult.png', category: 'brand' },
  { slug: 'projeto-hellobim', title: 'Hello BIM', imageSrc: '/assets/00. Cover/05. Hello BIM.png', category: 'brand' },
  { slug: 'projeto-raxseguros', title: 'RAX Seguros', imageSrc: '/assets/00. Cover/06. RAX Seguros.png', category: 'brand' },
  { slug: 'projeto-polysantos', title: 'Poly Santos', imageSrc: '/assets/00. Cover/07. Poly Santos.png', category: 'brand' },
  { slug: 'projeto-ecomove', title: 'Ecomove', imageSrc: '/assets/00. Cover/08. Ecomove.png', category: 'brand' },
  { slug: 'projeto-remachcapital', title: 'Remach Capital', imageSrc: '/assets/00. Cover/09. Remach Capital.png', category: 'brand' },
  // === WEBSITES (6) ===
  { slug: 'projeto-p1marketing', title: 'P1 Marketing', imageSrc: '/assets/00. Cover/10. P1 Marketing.png', imageSrcMobile: '/assets/00. Cover/10. P1 Marketing.mobile.png', category: 'web', externalUrl: 'https://p1-marketing.vercel.app/' },
  { slug: 'projeto-nalupoke', title: 'Nalu Poke', imageSrc: '/assets/00. Cover/11. Nalu Poke.png', imageSrcMobile: '/assets/00. Cover/11. Nalu Poke.mobile.png', category: 'web', externalUrl: 'https://nalupoke.vercel.app/' },
  { slug: 'projeto-forset', title: 'Forset', imageSrc: '/assets/00. Cover/12. Forset.png', imageSrcMobile: '/assets/00. Cover/12. Forset.mobile.png', category: 'web', externalUrl: 'https://site.forset.com.br/' },
  { slug: 'projeto-airjordan', title: 'Air Jordan', imageSrc: '/assets/00. Cover/13. Air Jordan.png', imageSrcMobile: '/assets/00. Cover/13. Air Jordan.mobile.png', category: 'web', externalUrl: 'https://airjordan-portfolio.vercel.app/' },
  { slug: 'projeto-pokemon', title: 'Pokémon', imageSrc: '/assets/00. Cover/14. Pokemon.png', imageSrcMobile: '/assets/00. Cover/14. Pokemon.mobile.png', category: 'web', externalUrl: 'https://pokemon.leonardoferreirr.com.br/' },
  { slug: 'projeto-gcarneiro', title: 'GCarneiro', imageSrc: '/assets/00. Cover/15. GCarneiro.png', imageSrcMobile: '/assets/00. Cover/15. GCarneiro.mobile.png', category: 'web', externalUrl: 'https://www.gcarneiro.com.br/' },
];

export default function MobileProjects({ filter = 'all' as Category }: { filter?: Category }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const elementsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  useEffect(() => {
    // Trim refs ao tamanho atual da lista visível
    elementsRef.current = elementsRef.current.slice(0, visible.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      // Faixa de 20% no centro do viewport — mais tolerante a itens pequenos
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    const els = elementsRef.current.filter(Boolean) as HTMLAnchorElement[];
    els.forEach((el) => observer.observe(el));

    return () => {
      els.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [visible]);

  return (
    <div className="mobile-projects-wrapper">
      {/* Coluna Esquerda: Nomes dos Projetos */}
      <div className="mobile-names-list">
        {visible.map((project, index) => {
          const itemContent = (
            <h3
              className="ds-h3"
              style={{
                fontFamily: 'var(--font-secondary)',
                fontWeight: 700,
                fontStyle: 'normal',
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
                opacity: activeIndex === index ? 1 : 0.5,
                transition: 'opacity 0.5s ease, color 0.5s ease',
                margin: 0,
                color: activeIndex === index ? 'var(--ds-text-primary)' : '#333333',
              }}
            >
              {project.title}
            </h3>
          );

          if (project.externalUrl) {
            return (
              <a
                key={project.slug}
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-index={index}
                style={{ textDecoration: 'none' }}
                ref={(el) => {
                  elementsRef.current[index] = el;
                }}
              >
                {itemContent}
              </a>
            );
          }

          return (
            <Link
              key={project.slug}
              href={`/${project.slug}`}
              data-index={index}
              style={{ textDecoration: 'none' }}
              ref={(el) => {
                elementsRef.current[index] = el;
              }}
            >
              {itemContent}
            </Link>
          );
        })}
      </div>

      {/* Coluna Direita: Imagem Sticky */}
      <div className="mobile-images-sticky">
        {visible.map((project, index) => (
          <img
            key={project.slug}
            src={project.imageSrcMobile || project.imageSrc}
            alt={project.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: activeIndex === index ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
