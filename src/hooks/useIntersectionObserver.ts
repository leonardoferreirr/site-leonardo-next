'use client';

import { useEffect, useRef } from 'react';

export function useIntersectionObserver(options = { root: null, rootMargin: '0px', threshold: 0.15 }) {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [options]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    elementsRef.current[index] = el;
  };

  return { setRef };
}
