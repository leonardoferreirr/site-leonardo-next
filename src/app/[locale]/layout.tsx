import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Instrument_Serif } from 'next/font/google';
import { routing } from '@/routing';
import '../globals.css';
import GlobalSchemas from '@/components/seo/GlobalSchemas';
import PageTransition from '@/components/PageTransition';
import LenisProvider from '@/components/LenisProvider';
import ThirdPartyScripts from '@/components/ThirdPartyScripts';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

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
      canonical: `https://www.leonardoferreirr.com.br/${locale === 'pt' ? '' : locale}`,
      languages: {
        'pt': 'https://www.leonardoferreirr.com.br',
        'en': 'https://www.leonardoferreirr.com.br/en',
        'es': 'https://www.leonardoferreirr.com.br/es',
      },
    },
    openGraph: {
      title: t('home_title'),
      description: t('home_description'),
      url: `https://www.leonardoferreirr.com.br/${locale === 'pt' ? '' : locale}`,
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
    <html lang={locale} className={`${inter.variable} ${instrumentSerif.variable}`}>
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
