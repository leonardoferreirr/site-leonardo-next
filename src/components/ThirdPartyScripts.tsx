'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Carrega scripts de terceiros fora do caminho crítico de renderização:
// - feather-icons: afterInteractive (não bloqueia o first paint) + replace() no onLoad
// - Meta Pixel: lazyOnload (depois do load, libera a main thread durante o LCP)
export default function ThirdPartyScripts() {
  const pathname = usePathname();

  // Re-aplica os ícones a cada troca de rota, caso o feather já tenha carregado.
  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.feather) window.feather.replace();
  }, [pathname]);

  return (
    <>
      <Script
        src="https://unpkg.com/feather-icons"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          window.feather?.replace();
        }}
      />
      <Script id="meta-pixel" strategy="lazyOnload">
        {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2116057592584389');
          fbq('track', 'PageView');`}
      </Script>
    </>
  );
}
