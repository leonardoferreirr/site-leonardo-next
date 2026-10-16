'use client';

import { useEffect, useRef, useState } from 'react';

// marca .is-in em todo .v2-in que entrar na tela (uma vez só)
export function useRevealAll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.v2-in:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// true enquanto o elemento estiver perto da tela (para tocar vídeo e girar slides só quando visível)
export function useInView<T extends HTMLElement>(margin = '120px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView] as const;
}

// vira true uma vez quando o elemento chega perto da tela e não volta: serve para só pedir
// capa de vídeo (poster) perto da hora; o navegador baixa poster na abertura mesmo lá embaixo
export function useNear<T extends HTMLElement>(margin = '900px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, near]);
  return [ref, near] as const;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

// troca de slide automática enquanto visível; parar ao interagir
export function useCycle(count: number, ms: number, active: boolean) {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!active || held || count < 2) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % count), ms);
    return () => window.clearInterval(t);
  }, [active, held, count, ms]);
  const pick = (n: number) => {
    setI(n);
    setHeld(true);
  };
  return [i, pick] as const;
}
