'use client';

import './home.css';
import Header from '@/components/Header';
import CodeField from '@/components/CodeField';
import Hero from '@/components/v2/Hero';
import SubNav from '@/components/v2/SubNav';
import SitesSection from '@/components/v2/SitesSection';
import SystemsSection from '@/components/v2/SystemsSection';
import ServicesSection from '@/components/v2/ServicesSection';
import { IdentitySection, LabSection, SocialSection, VideoSection } from '@/components/v2/WorkSections';
import { AboutSection, ContactSection } from '@/components/v2/AboutContact';
import { useRevealAll } from '@/components/v2/hooks';

// home v2: institucional e portfólio juntos (o /portfolio sai depois da aprovação)
export default function Home() {
  useRevealAll();

  return (
    <>
      {/* fundo de código; sticky porque o PageTransition tem transform (fixed não funciona dentro dele) */}
      <CodeField variant="sticky" />
      <Header />
      <main className="v2">
        <Hero />
        <SubNav />
        <SitesSection />
        <SystemsSection />
        <ServicesSection />
        <IdentitySection />
        <SocialSection />
        <VideoSection />
        <LabSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
