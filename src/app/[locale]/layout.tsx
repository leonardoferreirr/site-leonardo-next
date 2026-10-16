import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { poppins, mono } from '@/fonts/site';
import { routing } from '@/routing';
import '../globals.css';
import GlobalSchemas from '@/components/seo/GlobalSchemas';
import PageTransition from '@/components/PageTransition';
import LenisProvider from '@/components/LenisProvider';
import ThirdPartyScripts from '@/components/ThirdPartyScripts';

// Poppins em tudo, sem itálico (pedido do Leonardo em out/2026); mono só nos detalhes técnicos.
// As fontes moram em src/fonts (ver o motivo lá).

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  if (!routing.locales.includes(locale as any)) {
    return {};
  }
  
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      template: '%s | Leonardo Ferreira',
      default: t('home_title'),
    },
    description: t('home_description'),
    alternates: {
      // sempre com o prefixo do idioma: sem ele a raiz redireciona e as páginas internas dão 404
      canonical: `https://www.leonardoferreirr.com.br/${locale}`,
      languages: {
        'pt': 'https://www.leonardoferreirr.com.br/pt',
        'en': 'https://www.leonardoferreirr.com.br/en',
        'es': 'https://www.leonardoferreirr.com.br/es',
        'x-default': 'https://www.leonardoferreirr.com.br/pt',
      },
    },
    openGraph: {
      title: t('home_title'),
      description: t('home_description'),
      url: `https://www.leonardoferreirr.com.br/${locale}`,
      siteName: 'Leonardo Ferreira',
      images: [{ url: 'https://www.leonardoferreirr.com.br/assets/profile.png', width: 1200, height: 630 }],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    }
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const params = await props.params;
  const { locale } = params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${poppins.variable} ${mono.variable}`}>
      <head>
        <GlobalSchemas />
      </head>
      <body id="top">
        <ThirdPartyScripts />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=2116057592584389&ev=PageView&noscript=1" alt="" />
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <LenisProvider />
          <PageTransition>{children}</PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
