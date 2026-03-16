'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/routing';

const projects = [
  { slug: "projeto-mademax", title: "MADEMAX", imageSrc: "/assets/00. Cover/01. MADEMAX.png" },
  { slug: "projeto-biothera", title: "Biothera", imageSrc: "/assets/00. Cover/02. Biothera.png" },
  { slug: "projeto-divinocar", title: "Divino Car", imageSrc: "/assets/00. Cover/03. Divino Car.png" },
  { slug: "projeto-proconsult", title: "ProConsult", imageSrc: "/assets/00. Cover/04. ProConsult.png" },
  { slug: "projeto-hellobim", title: "Hello BIM", imageSrc: "/assets/00. Cover/05. Hello BIM.png" },
  { slug: "projeto-raxseguros", title: "RAX Seguros", imageSrc: "/assets/00. Cover/06. RAX Seguros.png" },
  { slug: "projeto-polysantos", title: "Poly Santos", imageSrc: "/assets/00. Cover/07. Poly Santos.png" },
  { slug: "projeto-ecomove", title: "Ecomove", imageSrc: "/assets/00. Cover/08. Ecomove.png" },
  { slug: "projeto-remachcapital", title: "Remach Capital", imageSrc: "/assets/00. Cover/09. Remach Capital.png" }
];

export default function MobileProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const elementsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px"
      }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="mobile-projects-wrapper">
      {/* Coluna Esquerda: Nomes dos Projetos */}
      <div className="mobile-names-list">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/${project.slug}`}
            data-index={index}
            style={{ textDecoration: 'none' }}
            ref={(el) => { elementsRef.current[index] = el; }}
          >
            <h3
              className="ds-h3 ds-text-stroke"
              style={{
                opacity: activeIndex === index ? 1 : 0.3,
                transition: 'opacity 0.5s ease',
                margin: 0,
                color: activeIndex === index ? 'var(--ds-text-primary)' : 'transparent'
              }}
            >
              {project.title}
            </h3>
          </Link>
        ))}
      </div>

      {/* Coluna Direita: Imagem Sticky */}
      <div className="mobile-images-sticky">
        {projects.map((project, index) => (
          <img
            key={project.slug}
            src={project.imageSrc}
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
