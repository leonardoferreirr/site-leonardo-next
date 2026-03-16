import { Link } from '@/routing';

export default function ProjectCard({
  slug,
  title,
  imageSrc
}: {
  slug: string;
  title: string;
  imageSrc: string;
}) {
  return (
    <Link href={`/${slug}`} className="ds-project-card">
      <img src={imageSrc} alt={title} />
      <div className="ds-project-overlay">
        <h3 className="ds-project-title-tag">{title}</h3>
      </div>
    </Link>
  );
}
