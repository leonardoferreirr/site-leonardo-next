import { CATEGORY_COLOR, type Category } from '@/data/v2/catalog';

// ícones 8x8 desenhados pixel a pixel: o único lugar em que o pixel art aparece fora da agência
// estrela: "Marcas que confiam no meu trabalho" (29/10), na sétima cor, o turquesa que faltava entre o verde e o azul
export type PixelName = Category | 'marcas';
const COLOR: Record<PixelName, string> = { ...CATEGORY_COLOR, marcas: '#4FE0D4' };

const GRID: Record<PixelName, string[]> = {
  sites: ['########', '#......#', '#......#', '#......#', '########', '...##...', '..####..', '........'],
  sistemas: ['########', '#......#', '#.#....#', '#..#...#', '#.#.##.#', '#......#', '########', '........'],
  identidade: ['...##...', '..####..', '.##..##.', '##....##', '.##..##.', '..####..', '...##...', '........'],
  social: ['.##..##.', '########', '########', '########', '.######.', '..####..', '...##...', '........'],
  video: ['..#.....', '..##....', '..###...', '..####..', '..###...', '..##....', '..#.....', '........'],
  lab: ['..####..', '...##...', '...##...', '..#..#..', '.#....#.', '#.####.#', '########', '........'],
  marcas: ['...##...', '...##...', '########', '.######.', '..####..', '.##..##.', '##....##', '........'],
};

export default function PixelIcon({ cat, color, className = '' }: { cat: PixelName; color?: string; className?: string }) {
  const rects: React.ReactNode[] = [];
  GRID[cat].forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === '#') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }),
  );
  return (
    <svg className={`v2-px ${className}`} viewBox="0 0 8 8" fill={color ?? COLOR[cat]} aria-hidden="true">
      {rects}
    </svg>
  );
}
