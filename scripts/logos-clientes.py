#!/usr/bin/env python3
"""Logos da faixa "Marcas que confiam no meu trabalho" em tons de cinza.

Entrada: scripts/clientes/raw/<slug>.png (logo original, fundo transparente, cores da marca)
e opcionalmente <slug>-clara.png (versão da própria marca para fundo escuro, usada no lugar
da principal). A lista de quem entra, com nome e ordem, fica em scripts/clientes/clientes.json.

Saída: public/assets/v2/clientes/<slug>.webp e src/data/v2/clients.ts (nome e tamanho de cada uma).

Regra de cor (pedido de 29/10/2026): logo de uma cor só vira um cinza chapado; logo com mais
de uma cor vira tons de cinza, mantendo a diferença entre as partes. Tudo pensado para o fundo
preto do site, então logo feita para fundo claro tem os tons invertidos (o escuro vira o claro).
Converter aqui, e não com filter: grayscale no CSS, poupa a GPU (60 imagens correndo na tela).

    python3 scripts/logos-clientes.py
"""
from __future__ import annotations

import json
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
RAW = RAIZ / "scripts/clientes/raw"
LISTA = RAIZ / "scripts/clientes/clientes.json"
SAIDA = RAIZ / "public/assets/v2/clientes"
TS = RAIZ / "src/data/v2/clients.ts"

CAIXA = (400, 160)        # 2x do maior tamanho em que aparece
CINZA_MONO = 0.66         # logo de uma cor só
CINZA_FAIXA = (0.42, 0.88)  # tons das logos com mais de uma cor, do mais escuro ao mais claro


def luz(r, g, b):
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255


def uma_cor(px, alfa) -> bool:
    """Uma cor só quando os pixels firmes (sem a borda suavizada) quase não variam."""
    firmes = [p for p, a in zip(px, alfa) if a > 200]
    if len(firmes) < 50:
        return True
    n = len(firmes)
    med = [sum(p[i] for p in firmes) / n for i in range(3)]
    desvio = (sum(sum((p[i] - med[i]) ** 2 for i in range(3)) for p in firmes) / n) ** 0.5
    return desvio < 22


def converter(im: Image.Image, forca: str | None, feita_para: str | None) -> Image.Image:
    im = im.convert("RGBA")
    bbox = im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    if bbox:
        im = im.crop(bbox)
    im.thumbnail(CAIXA, Image.LANCZOS)

    r, g, b, a = im.split()
    px = list(zip(r.getdata(), g.getdata(), b.getdata()))
    alfa = list(a.getdata())
    mono = forca == "mono" if forca in ("mono", "multi") else uma_cor(px, alfa)

    if mono:
        v = round(CINZA_MONO * 255)
        cinza = Image.new("L", im.size, v)
        return Image.merge("RGBA", (cinza, cinza, cinza, a))

    ys = [luz(*p) for p in px]
    pesos = [x / 255 for x in alfa]
    total = sum(pesos) or 1
    media = sum(y * w for y, w in zip(ys, pesos)) / total
    inverter = feita_para == "fundo claro" if feita_para else media < 0.5
    vs = [1 - y if inverter else y for y in ys]

    firmes = sorted(v for v, al in zip(vs, alfa) if al > 200) or sorted(vs)
    lo = firmes[int(len(firmes) * 0.02)]
    hi = firmes[int(len(firmes) * 0.98) - 1] if len(firmes) > 1 else lo
    lo_c, hi_c = CINZA_FAIXA
    if hi - lo < 0.08:  # tons quase iguais: trata como uma cor só
        cinza = Image.new("L", im.size, round(CINZA_MONO * 255))
    else:
        cinza = Image.new("L", im.size)
        cinza.putdata([round(255 * (lo_c + (hi_c - lo_c) * min(max((v - lo) / (hi - lo), 0), 1))) for v in vs])
    return Image.merge("RGBA", (cinza, cinza, cinza, a))


def main() -> int:
    lista = json.loads(LISTA.read_text(encoding="utf-8"))
    SAIDA.mkdir(parents=True, exist_ok=True)
    linhas, faltando = [], []
    for c in lista:
        slug = c["slug"]
        clara, base = RAW / f"{slug}-clara.png", RAW / f"{slug}.png"
        fonte = clara if clara.exists() and not c.get("sem_clara") else base
        if not fonte.exists():
            faltando.append(slug)
            continue
        feita_para = "fundo escuro" if fonte == clara else c.get("feita_para")
        out = converter(Image.open(fonte), c.get("cores"), feita_para)
        out.save(SAIDA / f"{slug}.webp", "WEBP", quality=90, method=6)
        nome = json.dumps(c["nome"], ensure_ascii=False)
        cats = ", ".join(f"'{k}'" for k in c.get("servicos", []))
        linhas.append(f"  {{ slug: '{slug}', name: {nome}, w: {out.width}, h: {out.height}, cats: [{cats}] }},")

    TS.write_text(
        "// Gerado por scripts/logos-clientes.py a partir de scripts/clientes/clientes.json: não editar à mão.\n"
        "// Ordem do carrossel. A página /clientes ordena por nome.\n\n"
        "import type { Category } from './catalog';\n\n"
        "export type Client = { slug: string; name: string; w: number; h: number; cats: Category[] };\n\n"
        "export const clientLogo = (slug: string) => `/assets/v2/clientes/${slug}.webp`;\n\n"
        "export const CLIENTS: Client[] = [\n" + "\n".join(linhas) + "\n];\n",
        encoding="utf-8",
    )
    print(f"{len(linhas)} logos em {SAIDA.relative_to(RAIZ)}" + (f" | sem arquivo: {', '.join(faltando)}" if faltando else ""))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
