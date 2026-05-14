'use client';

type Props = {
  items: string[];
  speed?: number;
  separator?: string;
  reverse?: boolean;
};

export default function Marquee({
  items,
  speed = 40,
  separator = '✱',
  reverse = false,
}: Props) {
  // Intercala separador entre os items: ✱ A ✱ B ✱ C
  // (sem separador final — ele aparece na próxima iteração do loop)
  const sequence: string[] = [];
  items.forEach((it) => {
    sequence.push(separator);
    sequence.push(it);
  });

  // Duplicamos pra criar loop infinito sem corte visual
  const rendered = [...sequence, ...sequence];

  return (
    <div
      aria-hidden
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '32px 0',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.015)',
        maskImage:
          'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '48px',
          whiteSpace: 'nowrap',
          width: 'max-content',
          animation: `${reverse ? 'marqueeScrollReverse' : 'marqueeScroll'} ${speed}s linear infinite`,
        }}
      >
        {rendered.map((item, i) => {
          const isSep = item === separator;
          return (
            <span
              key={i}
              style={{
                fontFamily: isSep ? 'var(--font-display)' : 'var(--font-primary)',
                fontStyle: isSep ? 'italic' : 'normal',
                fontSize: isSep
                  ? 'clamp(1.6rem, 3vw, 2.6rem)'
                  : 'clamp(1rem, 1.6vw, 1.4rem)',
                fontWeight: isSep ? 400 : 500,
                letterSpacing: isSep ? '0' : '0.22em',
                textTransform: isSep ? 'none' : 'uppercase',
                color: isSep ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.92)',
                flexShrink: 0,
                userSelect: 'none',
                lineHeight: 1,
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
