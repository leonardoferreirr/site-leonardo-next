'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <button
        onClick={() => startTransition(() => router.replace(pathname, { locale: 'pt' }))}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          opacity: locale === 'pt' ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
          fontSize: '20px'
        }}
        disabled={isPending}
        title="Português"
      >
        🇧🇷
      </button>
      <button
        onClick={() => startTransition(() => router.replace(pathname, { locale: 'en' }))}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          opacity: locale === 'en' ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
          fontSize: '20px'
        }}
        disabled={isPending}
        title="English"
      >
        🇺🇸
      </button>
      <button
        onClick={() => startTransition(() => router.replace(pathname, { locale: 'es' }))}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          opacity: locale === 'es' ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
          fontSize: '20px'
        }}
        disabled={isPending}
        title="Español"
      >
        🇪🇸
      </button>
    </div>
  );
}
