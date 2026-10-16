'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/routing';
import { useTransition } from 'react';

const LOCALES = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
] as const;

// seletor de idioma em texto (sem bandeira): PT · EN · ES
export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="lf-lang" role="group" aria-label="Idioma / Language">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          title={l.name}
          aria-pressed={locale === l.code}
          disabled={isPending}
          onClick={() => startTransition(() => router.replace(pathname, { locale: l.code }))}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
