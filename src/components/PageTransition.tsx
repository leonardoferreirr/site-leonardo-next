'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// entra visível no primeiro carregamento (senão o conteúdo fica invisível até o JS hidratar e o
// FCP do celular vai a 7 s); a transição só roda nas trocas de rota feitas no navegador
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current === null || prevPath.current === pathname) {
      prevPath.current = pathname;
      return;
    }
    prevPath.current = pathname;
    setVisible(false);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        // 'none' depois de entrar: transform residual quebra position:fixed dos filhos (cabeçalho)
        transform: visible ? 'none' : 'translateY(16px)',
        transition: visible ? 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)' : 'none',
      }}
    >
      {children}
    </div>
  );
}
