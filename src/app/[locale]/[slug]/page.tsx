import { projectsData } from '@/data/projects';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ProjectView from './ProjectView';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
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
