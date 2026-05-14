'use client';

import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  strength?: number; // 0..1, quanto o elemento "segue" o mouse
  className?: string;
};

export default function Magnetic({ children, strength = 0.35, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const target = targetRef.current;
    if (!wrap || !target) return;

    let raf = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHover = false;

    const easing = 0.18;

    const tick = () => {
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;
      target.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (isHover || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = (e.clientX - cx) * strength;
      targetY = (e.clientY - cy) * strength;
    };

    const onEnter = () => {
      isHover = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      isHover = false;
      targetX = 0;
      targetY = 0;
    };

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('mousemove', onMove);
    };
  }, [strength]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <div ref={targetRef} style={{ display: 'inline-block', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
