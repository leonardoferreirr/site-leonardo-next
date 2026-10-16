import { CATEGORY_COLOR, type Category } from '@/data/v2/catalog';

// ícones 8x8 desenhados pixel a pixel: o único lugar em que o pixel art aparece fora da agência
const GRID: Record<Category, string[]> = {
  sites: ['########', '#......#', '#......#', '#......#', '########', '...##...', '..####..', '........'],
  sistemas: ['########', '#......#', '#.#....#', '#..#...#', '#.#.##.#', '#......#', '########', '........'],
  identidade: ['...##...', '..####..', '.##..##.', '##....##', '.##..##.', '..####..', '...##...', '........'],
  social: ['.##..##.', '########', '########', '########', '.######.', '..####..', '...##...', '........'],
  video: ['..#.....', '..##....', '..###...', '..####..', '..###...', '..##....', '..#.....', '........'],
  lab: ['..####..', '...##...', '...##...', '..#..#..', '.#....#.', '#.####.#', '########', '........'],
};

export default function PixelIcon({ cat, color, className = '' }: { cat: Category; color?: string; className?: string }) {
  const rects: React.ReactNode[] = [];
  GRID[cat].forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === '#') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }),
  );
  return (
    <svg className={`v2-px ${className}`} viewBox="0 0 8 8" fill={color ?? CATEGORY_COLOR[cat]} aria-hidden="true">
      {rects}
    </svg>
  );
}
