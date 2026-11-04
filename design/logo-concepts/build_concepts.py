"""
Logo concept sheet: horizontal lockups (icon + wordmark) for the shortlisted names.

Lettering is Jost (SIL OFL), instanced per weight and outlined to paths,
so every SVG renders the same without the font installed.
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
OUT_DIR = Path(sys.argv[2])

NAVY = "#102F48"
LIME = "#DDFE5C"
WHITE = "#FFFFFF"

HEIGHT = 44
GAP = 11


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


def text_line(text: str, x: float, baseline: float, weight: int, cap: float, tracking_em: float = 0.0, width: float | None = None) -> tuple[str, float]:
    """
    Outlines one line with its ink starting at `x`. Returns (path, ink width).
    With `width` the tracking is stretched so the ink fills it exactly.
    """
    font = font_at(weight)
    upm = font["head"].unitsPerEm
    scale = cap / font["OS/2"].sCapHeight
    tracking = tracking_em * upm
    if width is not None:
        x_min, x_max = ink_x(font, text, 0)
        tracking = (width / scale - (x_max - x_min)) / (len(text) - 1)
    x_min, x_max = ink_x(font, text, tracking)
    pen = SVGPathPen(font.getGlyphSet(), ntos=fmt)
    draw(font, text, tracking, TransformPen(pen, (scale, 0, 0, -scale, x - x_min * scale, baseline)))
    return pen.getCommands(), (x_max - x_min) * scale


def stacked_wordmark(x: float, top: tuple[str, int, float, float], bottom: tuple[str, int, float]) -> tuple[list[str], float]:
    """Two lines of equal width: a strong name over a tracked descriptor."""
    name, name_weight, name_cap, name_track = top
    line_one, width = text_line(name, x, 25, name_weight, name_cap, name_track)
    label, label_weight, label_cap = bottom
    line_two, _ = text_line(label, x, 41, label_weight, label_cap, width=width)
    return [line_one, line_two], width


def svg(width: float, title: str, body: str) -> str:
    return f"""<svg width="{fmt(width)}" height="{HEIGHT}" viewBox="0 0 {fmt(width)} {HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title">
  <title id="title">{title}</title>
{body}
</svg>
"""


def paths(items: list[str], fill: str) -> str:
    return "\n".join(f'  <path d="{d}" fill="{fill}"/>' for d in items)


# A. Shah Built: a floating roof over a solid block with an "S" monogram.
def shah_built(ink: str, accent: str, block_text: str) -> tuple[str, float]:
    monogram, mono_width = text_line("S", 0, 0, 800, 17)
    block_x, block_w = 4, 32
    mono_x = block_x + (block_w - mono_width) / 2
    monogram, _ = text_line("S", mono_x, 38.5, 800, 17)
    words, width = stacked_wordmark(40 + GAP, ("SHAH", 700, 17, 0.06), ("BUILT", 400, 8))
    icon = f"""  <path d="M3 14.5L20 2.5L37 14.5" stroke="{accent}" stroke-width="4" stroke-linecap="square"/>
  <rect x="{block_x}" y="18" width="{block_w}" height="26" fill="{ink}"/>
  <path d="{monogram}" fill="{block_text}"/>"""
    return icon + "\n" + paths(words, ink), 40 + GAP + width


# B. Kingpost: a king post roof truss, the post itself carries the accent.
def kingpost(ink: str, accent: str) -> tuple[str, float]:
    words, width = stacked_wordmark(48 + GAP, ("KINGPOST", 600, 15, 0.08), ("RENOVATION", 400, 7))
    icon = f"""  <path d="M3 40L24 6L45 40Z" stroke="{ink}" stroke-width="4" stroke-linejoin="miter"/>
  <path d="M24 40L13.5 23M24 40L34.5 23" stroke="{ink}" stroke-width="3"/>
  <path d="M24 9V40" stroke="{accent}" stroke-width="4"/>"""
    return icon + "\n" + paths(words, ink), 48 + GAP + width


# C. Crown & Beam: three roof peaks form a crown that sits on a beam.
def crown_and_beam(ink: str, accent: str) -> tuple[str, float]:
    words, width = stacked_wordmark(48 + GAP, ("CROWN & BEAM", 600, 13, 0.06), ("HOME RENOVATION", 400, 6.5))
    icon = f"""  <path d="M2 33V11L13 20.5L24 3L35 20.5L46 11V33Z" fill="{ink}"/>
  <rect x="2" y="36.5" width="44" height="6" fill="{accent}"/>"""
    return icon + "\n" + paths(words, ink), 48 + GAP + width


# D. Shah & Crew: a round seal with a line-drawn house and door.
def shah_and_crew(ink: str, seal: str, house: str) -> tuple[str, float]:
    words, width = stacked_wordmark(44 + GAP, ("SHAH & CREW", 700, 14, 0.05), ("HOME RENOVATION", 400, 6.5))
    icon = f"""  <circle cx="22" cy="22" r="22" fill="{seal}"/>
  <path d="M11 22.5L22 12.5L33 22.5" stroke="{house}" stroke-width="3" stroke-linecap="square"/>
  <path d="M14.5 21V32.5H29.5V21" stroke="{house}" stroke-width="3"/>
  <rect x="19.5" y="25" width="5" height="7.5" fill="{house}"/>"""
    return icon + "\n" + paths(words, ink), 44 + GAP + width


concepts = {
    "a-shah-built": ("Shah Built", lambda dark: shah_built(WHITE if dark else NAVY, LIME if dark else NAVY, NAVY if dark else WHITE)),
    "b-kingpost": ("Kingpost Renovation", lambda dark: kingpost(WHITE if dark else NAVY, LIME if dark else NAVY)),
    "c-crown-and-beam": ("Crown &amp; Beam", lambda dark: crown_and_beam(WHITE if dark else NAVY, LIME if dark else NAVY)),
    "d-shah-and-crew": ("Shah &amp; Crew", lambda dark: shah_and_crew(WHITE if dark else NAVY, LIME if dark else NAVY, NAVY if dark else WHITE)),
}

OUT_DIR.mkdir(parents=True, exist_ok=True)
for slug, (title, build) in concepts.items():
    for variant, dark in (("navy", False), ("white", True)):
        body, width = build(dark)
        (OUT_DIR / f"{slug}-{variant}.svg").write_text(svg(width, title, body))
        print(f"{slug}-{variant}.svg  {width:.1f} x {HEIGHT}")
