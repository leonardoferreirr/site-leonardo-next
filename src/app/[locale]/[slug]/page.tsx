import { projectsData } from '@/data/projects';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ProjectView from './ProjectView';

import { routing } from '@/routing'; // Import routing config

export async function generateStaticParams() {
  const params: { locale: string, slug: string }[] = [];
  
  // For each project, generate a static param pair for each supported locale
  projectsData.forEach((project) => {
    routing.locales.forEach((locale) => {
      params.push({
        locale: locale,
        slug: project.slug,
      });
    });
  });

  return params;
}

export default async function ProjectPage(props: { params: Promise<{ slug: string, locale: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const t = await getTranslations('Hero'); // reuse the same CTA button label

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectView project={project} ctaText={t('cta_button')} />;
}
