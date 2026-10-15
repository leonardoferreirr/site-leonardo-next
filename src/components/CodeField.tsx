'use client';

import { useEffect, useRef } from 'react';

/**
 * Campo de código no fundo: letras e números em fonte mono, quase apagados, formando manchas
 * que andam devagar. Perto do mouse eles acendem e embaralham (como a tela inicial do Claude Code).
 *
 * Feito para não pesar: só começa depois do `load`, desenha a 30 quadros (24 no celular) a
 * partir de um atlas de letras, pausa enquanto a página rola e com a aba escondida, e com
 * "reduzir movimento" fica parado.
 *
 * variant="sticky": para páginas dentro de um invólucro com transform (o fixed não funcionaria lá).
 * variant="fixed": para páginas sem esse invólucro.
 */

const LETRAS = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHJKMNPQRSTUVWXYZ';
const NIVEIS = 24; // tons agrupados: uma troca de transparência por tom, não por letra
const A_MAX = 0.62; // teto: o texto do site continua legível com o mouse em cima
const RAIO = 170; // alcance do brilho do mouse, em px

function criarRuido(semente: number) {
  // Simplex 2D (Stefan Gustavson, domínio público), com permutação a partir de uma semente.
  let s = semente;
  const aleatorio = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const p = new Uint8Array(256).map((_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  const perm12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    perm12[i] = perm[i] % 12;
  }
  const g = [1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, -1];
  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const G2 = (3 - Math.sqrt(3)) / 6;

  return (x: number, y: number) => {
    const t0s = (x + y) * F2;
    const i = Math.floor(x + t0s);
    const j = Math.floor(y + t0s);
    const t = (i + j) * G2;
    const x0 = x - (i - t);
    const y0 = y - (j - t);
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    let n = 0;
    let d = 0.5 - x0 * x0 - y0 * y0;
    if (d > 0) {
      const k = perm12[ii + perm[jj]] * 2;
      d *= d;
      n += d * d * (g[k] * x0 + g[k + 1] * y0);
    }
    d = 0.5 - x1 * x1 - y1 * y1;
    if (d > 0) {
      const k = perm12[ii + i1 + perm[jj + j1]] * 2;
      d *= d;
      n += d * d * (g[k] * x1 + g[k + 1] * y1);
    }
    d = 0.5 - x2 * x2 - y2 * y2;
    if (d > 0) {
      const k = perm12[ii + 1 + perm[jj + 1]] * 2;
      d *= d;
      n += d * d * (g[k] * x2 + g[k + 1] * y2);
    }
    return 70 * n; // -1 a 1
  };
}

export default function CodeField({ variant = 'fixed' }: { variant?: 'fixed' | 'sticky' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const toque = window.matchMedia('(hover: none)').matches;
    const ruido = criarRuido(20261015);
    const intervalo = 1000 / (toque ? 24 : 30);
    // sem mouse no celular: base um pouco mais forte e uma luz que passeia sozinha (o dedo assume ao tocar)
    const intensidade = toque ? 0.17 : 0.12;

    let largura = 0;
    let altura = 0;
    let dpr = 1;
    let passo = 14; // distância entre letras, em px
    let colunas = 0;
    let linhas = 0;
    let letras = new Uint8Array(0); // índice da letra em cada casa
    let brilho = new Float32Array(0); // variação fixa por casa, dá textura à borda das manchas
    let base = new Float32Array(0); // intensidade da mancha em cada casa
    let atlas: HTMLCanvasElement | null = null;
    let celula = 0; // lado de uma casa do atlas, em pixels do aparelho

    const mouse = { x: -9999, y: -9999, alvoX: -9999, alvoY: -9999, forca: 0, alvoForca: 0, dedo: false };
    const baldes: number[][] = Array.from({ length: NIVEIS }, () => []);
    let raf = 0;
    let ultimo = 0;
    let quadro = 0;
    let rolandoAte = 0;
    let rodando = false;

    const montarAtlas = (fonte: number) => {
      celula = Math.ceil(passo * dpr);
      atlas = document.createElement('canvas');
      atlas.width = celula * LETRAS.length;
      atlas.height = celula;
      const a = atlas.getContext('2d');
      if (!a) return;
      a.fillStyle = '#fff';
      a.textAlign = 'center';
      a.textBaseline = 'middle';
      a.font = `500 ${fonte * dpr}px ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace`;
      for (let i = 0; i < LETRAS.length; i++) a.fillText(LETRAS[i], i * celula + celula / 2, celula / 2 + 0.5);
    };

    const sortear = (i: number) => {
      letras[i] = (Math.random() * LETRAS.length) | 0;
      brilho[i] = 0.5 + Math.random() * 0.5;
    };

    const medir = () => {
      const caixa = canvas.parentElement ?? canvas;
      largura = caixa.clientWidth || window.innerWidth;
      altura = caixa.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      passo = largura < 700 ? 13 : 14;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      colunas = Math.ceil(largura / passo) + 1;
      linhas = Math.ceil(altura / passo) + 1;
      const total = colunas * linhas;
      letras = new Uint8Array(total);
      brilho = new Float32Array(total);
      base = new Float32Array(total);
      for (let i = 0; i < total; i++) sortear(i);
      montarAtlas(passo < 14 ? 10 : 11);
      calcularManchas(performance.now() / 1000);
    };

    // Duas camadas de ruído andando em direções diferentes: manchas que mudam de forma devagar.
    const calcularManchas = (t: number) => {
      for (let y = 0; y < linhas; y++) {
        for (let x = 0; x < colunas; x++) {
          const n =
            0.68 * ruido(x * 0.034 + t * 0.022, y * 0.052 - t * 0.016) +
            0.32 * ruido(x * 0.09 - t * 0.04, y * 0.12 + t * 0.03);
          const v = Math.min(Math.max((n - 0.04) / 0.5, 0), 1);
          base[y * colunas + x] = v * v * (3 - 2 * v);
        }
      }
    };

    const desenhar = (agora: number) => {
      if (!atlas) return;
      const t = agora / 1000;
      if (quadro++ % 2 === 0) calcularManchas(t); // a forma muda devagar: meio ritmo basta

      if (toque && !mouse.dedo) {
        mouse.alvoX = largura * (0.5 + 0.36 * Math.sin(t * 0.21));
        mouse.alvoY = altura * (0.5 + 0.38 * Math.sin(t * 0.15 + 1.3));
        mouse.alvoForca = 0.8;
        if (mouse.x < -999) {
          mouse.x = mouse.alvoX;
          mouse.y = mouse.alvoY;
        }
      }
      // o brilho segue o mouse com atraso, e some devagar quando o mouse sai
      mouse.x += (mouse.alvoX - mouse.x) * 0.18;
      mouse.y += (mouse.alvoY - mouse.y) * 0.18;
      mouse.forca += (mouse.alvoForca - mouse.forca) * 0.08;

      const total = colunas * linhas;
      // letras trocando sozinhas, poucas por quadro
      const trocas = (total * 0.0025) | 0;
      for (let k = 0; k < trocas; k++) sortear((Math.random() * total) | 0);

      for (const b of baldes) b.length = 0;
      const r2 = RAIO * RAIO;
      const temMouse = mouse.forca > 0.01;
      for (let y = 0; y < linhas; y++) {
        const py = y * passo + passo / 2;
        const dy = py - mouse.y;
        const linhaPerto = temMouse && dy * dy < r2;
        for (let x = 0; x < colunas; x++) {
          const i = y * colunas + x;
          const m = base[i];
          let a = m * intensidade * brilho[i];
          if (linhaPerto) {
            const dx = x * passo + passo / 2 - mouse.x;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2) {
              let gl = 1 - Math.sqrt(d2) / RAIO;
              gl = gl * gl * (3 - 2 * gl) * mouse.forca;
              a += gl * (0.06 + 0.6 * m) * brilho[i];
              if (Math.random() < gl * 0.1) sortear(i); // embaralha onde está aceso
            }
          }
          if (a < 0.014) continue;
          baldes[Math.min(NIVEIS - 1, ((a / A_MAX) * NIVEIS) | 0)].push(i);
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let k = 0; k < NIVEIS; k++) {
        const balde = baldes[k];
        if (!balde.length) continue;
        ctx.globalAlpha = ((k + 0.5) / NIVEIS) * A_MAX;
        for (const i of balde) {
          const x = i % colunas;
          const y = (i / colunas) | 0;
          ctx.drawImage(
            atlas,
            letras[i] * celula, 0, celula, celula,
            Math.round(x * passo * dpr), Math.round(y * passo * dpr), celula, celula,
          );
        }
      }
      ctx.globalAlpha = 1;
    };

    const laco = (agora: number) => {
      raf = requestAnimationFrame(laco);
      if (agora - ultimo < intervalo || agora < rolandoAte) return;
      ultimo = agora;
      desenhar(agora);
    };

    const ligar = () => {
      if (rodando || document.hidden) return;
      rodando = true;
      raf = requestAnimationFrame(laco);
    };
    const desligar = () => {
      rodando = false;
      cancelAnimationFrame(raf);
    };

    const aoMover = (e: PointerEvent) => {
      const caixa = canvas.getBoundingClientRect();
      mouse.alvoX = e.clientX - caixa.left;
      mouse.alvoY = e.clientY - caixa.top;
      if (mouse.forca < 0.01) {
        mouse.x = mouse.alvoX;
        mouse.y = mouse.alvoY;
      }
      mouse.alvoForca = 1;
      mouse.dedo = e.pointerType === 'touch';
    };
    const aoSair = () => (mouse.alvoForca = 0);
    const aoSoltar = (e: PointerEvent) => {
      if (e.pointerType === 'touch') mouse.dedo = false; // a luz volta a passear
    };
    const aoRolar = () => (rolandoAte = performance.now() + 160);
    const aoMudarAba = () => (document.hidden ? desligar() : ligar());
    let espera = 0;
    const aoRedimensionar = () => {
      clearTimeout(espera);
      espera = window.setTimeout(() => {
        medir();
        if (parado) desenhar(0);
      }, 150);
    };

    let ocioso = 0;
    const iniciar = () => {
      medir();
      desenhar(parado ? 0 : performance.now());
      canvas.style.opacity = '1';
      window.addEventListener('resize', aoRedimensionar);
      if (parado) return;
      window.addEventListener('pointermove', aoMover, { passive: true });
      window.addEventListener('pointerup', aoSoltar, { passive: true });
      document.documentElement.addEventListener('pointerleave', aoSair);
      window.addEventListener('blur', aoSair);
      window.addEventListener('scroll', aoRolar, { passive: true });
      document.addEventListener('visibilitychange', aoMudarAba);
      ligar();
    };
    const agendar = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      ocioso = w.requestIdleCallback ? w.requestIdleCallback(iniciar, { timeout: 2000 }) : window.setTimeout(iniciar, 600);
    };
    if (document.readyState === 'complete') agendar();
    else window.addEventListener('load', agendar, { once: true });

    return () => {
      desligar();
      clearTimeout(espera);
      clearTimeout(ocioso);
      const w = window as Window & { cancelIdleCallback?: (id: number) => void };
      w.cancelIdleCallback?.(ocioso);
      window.removeEventListener('load', agendar);
      window.removeEventListener('resize', aoRedimensionar);
      window.removeEventListener('pointermove', aoMover);
      window.removeEventListener('pointerup', aoSoltar);
      document.documentElement.removeEventListener('pointerleave', aoSair);
      window.removeEventListener('blur', aoSair);
      window.removeEventListener('scroll', aoRolar);
      document.removeEventListener('visibilitychange', aoMudarAba);
    };
  }, []);

  const camada: React.CSSProperties =
    variant === 'sticky'
      ? { position: 'sticky', top: 0, height: '100vh', marginBottom: '-100vh', zIndex: -1 }
      : { position: 'fixed', inset: 0, zIndex: 0 };

  return (
    <div aria-hidden style={{ ...camada, pointerEvents: 'none', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', opacity: 0, transition: 'opacity 1.6s ease' }}
      />
    </div>
  );
}
