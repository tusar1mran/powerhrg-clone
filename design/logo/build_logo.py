"""
Builds the Shah & Crew logo files used by the header.

Design: a floating roof over a solid block with an "S" monogram (concept A in
design/logo-concepts), with "SHAH" over a tracked "& CREW" to the right.

Lettering is Jost (SIL Open Font License), instanced per weight and outlined to
paths, so the SVGs render the same without the font installed.

Usage:
    python3 design/logo/build_logo.py <path to Jost variable font> [output dir]

The Jost variable font (wght axis) is on Google Fonts. After `next dev` it is
also cached under .next/dev/static/media/ (latin subset).
"""

import sys
from functools import cache
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FONT_PATH = sys.argv[1]
OUT_DIR = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("public/assets/logo")

CHARCOAL = "#1E2B31"
GOLD = "#F0AD3C"
WHITE = "#FFFFFF"

TITLE = "Shah &amp; Crew"
HEIGHT = 44
ICON_WIDTH = 40
GAP = 11

# Icon geometry (40 x 44): roof chevron above a solid block.
ROOF = "M3 14.5L20 2.5L37 14.5"
BLOCK_X = 4
BLOCK_Y = 18
BLOCK_W = 32
BLOCK_H = 26


@cache
def font_at(weight: int) -> TTFont:
    return instantiateVariableFont(TTFont(FONT_PATH), {"wght": weight})


def fmt(value: float) -> str:
    return f"{value:.2f}".rstrip("0").rstrip(".")


def draw(font: TTFont, text: str, tracking: float, pen) -> None:
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    x = 0.0
    for ch in text:
        name = cmap[ord(ch)]
        glyph_set[name].draw(TransformPen(pen, (1, 0, 0, 1, x, 0)))
        x += font["hmtx"][name][0] + tracking


def ink_x(font: TTFont, text: str, tracking: float) -> tuple[float, float]:
    pen = BoundsPen(font.getGlyphSet())
    draw(font, text, tracking, pen)
    return pen.bounds[0], pen.bounds[2]


def text_line(
    text: str,
    x: float,
    baseline: float,
    weight: int,
    cap: float,
    tracking_em: float = 0.0,
    width: float | None = None,
) -> tuple[str, float]:
    """
    Outlines one line with its ink starting at `x`. Returns (path, ink width).
    With `width` the tracking is stretched so the ink fills it exactly.
    """
    font = font_at(weight)
    scale = cap / font["OS/2"].sCapHeight
    tracking = tracking_em * font["head"].unitsPerEm
    if width is not None:
        x_min, x_max = ink_x(font, text, 0)
        tracking = (width / scale - (x_max - x_min)) / (len(text) - 1)
    x_min, x_max = ink_x(font, text, tracking)
    pen = SVGPathPen(font.getGlyphSet(), ntos=fmt)
    draw(font, text, tracking, TransformPen(pen, (scale, 0, 0, -scale, x - x_min * scale, baseline)))
    return pen.getCommands(), (x_max - x_min) * scale


def cap_to_fit(text: str, weight: int, tracking_em: float, width: float) -> float:
    """Cap height at which `text`, at this weight and tracking, has an ink width of `width`."""
    font = font_at(weight)
    x_min, x_max = ink_x(font, text, tracking_em * font["head"].unitsPerEm)
    return width / (x_max - x_min) * font["OS/2"].sCapHeight


def icon(roof: str, block: str, letter: str) -> str:
    _, letter_width = text_line("S", 0, 0, 800, 17)
    monogram, _ = text_line("S", BLOCK_X + (BLOCK_W - letter_width) / 2, 38.5, 800, 17)
    return f"""  <path d="{ROOF}" stroke="{roof}" stroke-width="4" stroke-linecap="square"/>
  <rect x="{BLOCK_X}" y="{BLOCK_Y}" width="{BLOCK_W}" height="{BLOCK_H}" fill="{block}"/>
  <path d="{monogram}" fill="{letter}"/>"""


def wordmark(ink: str) -> tuple[str, float]:
    """
    "SHAH" over "& CREW", both bold with normal letter spacing.
    The second line is sized (not tracked out) to match the first line's width,
    so it stays legible when the logo is shown at 44px tall or less.
    """
    x = ICON_WIDTH + GAP
    name, width = text_line("SHAH", x, 22, 700, 16, tracking_em=0.03)
    crew_cap = cap_to_fit("& CREW", 600, 0.02, width)
    crew, _ = text_line("& CREW", x, 41.5, 600, crew_cap, tracking_em=0.02)
    print(f"cap heights: SHAH {fmt(16)}, & CREW {fmt(crew_cap)}")
    return f"""  <path d="{name}" fill="{ink}"/>
  <path d="{crew}" fill="{ink}"/>""", x + width


def svg(width: float, body: str) -> str:
    return f"""<svg width="{fmt(width)}" height="{HEIGHT}" viewBox="0 0 {fmt(width)} {HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title">
  <title id="title">{TITLE}</title>
{body}
</svg>
"""


def lockup(ink: str, roof: str, letter: str) -> tuple[str, float]:
    words, width = wordmark(ink)
    return svg(width, icon(roof, ink, letter) + "\n" + words), width


OUT_DIR.mkdir(parents=True, exist_ok=True)

# Dark: white or light backgrounds (scrolled desktop header).
dark, width = lockup(CHARCOAL, CHARCOAL, WHITE)
(OUT_DIR / "shah-crew-dark.svg").write_text(dark)

# White: charcoal or photo backgrounds (transparent desktop header on the home page).
white, _ = lockup(WHITE, GOLD, CHARCOAL)
(OUT_DIR / "shah-crew-white.svg").write_text(white)

# Icon only: the 60px mobile header has no room for the wordmark.
(OUT_DIR / "shah-crew-icon-dark.svg").write_text(svg(ICON_WIDTH, icon(CHARCOAL, CHARCOAL, WHITE)))

print(f"lockup {fmt(width)} x {HEIGHT}, icon {ICON_WIDTH} x {HEIGHT} -> {OUT_DIR}")
