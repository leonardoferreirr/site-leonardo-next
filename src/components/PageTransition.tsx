'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    // primeira renderização ou troca de rota
    setVisible(false);
    const raf = requestAnimationFrame(() => {
      setVisible(true);
    });
    prevPath.current = pathname;
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        // 'none' depois de entrar: transform residual quebra position:fixed dos filhos (cabeçalho)
        transform: visible ? 'none' : 'translateY(16px)',
        transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {children}
    </div>
  );
}
