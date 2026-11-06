import { useId } from "react";
import { serviceSheet } from "@/lib/sheets";
import {
  ArrowMarker,
  BreakLine,
  Bubble,
  DimensionLine,
  ExtensionLine,
  HatchDefs,
  Leader,
  hatchFill,
  round,
  toPath,
  toPoints,
  type Pt,
} from "@/components/drawing/svg";

/** Parts of the roof the callouts can point at. Some parts have two leaders (e.g. soffit and ridge vents). */
export type RoofPart = "deck" | "barrier" | "underlayment" | "flashing" | "ventilation" | "shingles";

type Props = {
  callouts: { mark: number; part: RoofPart }[];
  title: string;
  description: string;
};

// ---------------------------------------------------------------------------------------------
// Geometry. The roof is drawn in "slope coordinates": t runs up the slope from the eave edge of the
// deck, n runs perpendicular to it (negative = above the deck, positive = into the rafter).
// Layer thicknesses are exaggerated so each one can be seen and called out; the drawing is NTS.
// ---------------------------------------------------------------------------------------------

const VIEW = { w: 1200, h: 760 };
const EAVE: Pt = { x: 220, y: 430 };
const RIDGE_X = 1000;
const PITCH = 0.45;
const ANGLE = Math.atan(PITCH);
const COS = Math.cos(ANGLE);
const SIN = Math.sin(ANGLE);
/** Slope length from the eave edge to the ridge line. */
const L = (RIDGE_X - EAVE.x) / COS;
const RIDGE: Pt = { x: RIDGE_X, y: EAVE.y - (RIDGE_X - EAVE.x) * PITCH };

/** Layer offsets (n) for each band of the roof. */
const N = {
  shingleTop: -24,
  shingleBase: -6,
  membraneTop: -6,
  deckTop: 0,
  deckBottom: 12,
  rafterBottom: 60,
};

/** Where the deck and shingles stop short of the ridge to leave the ridge-vent slot. */
const RIDGE_GAP_T = L - 30;
const BARRIER_END_T = 170;

const along = (t: number, n: number): Pt => ({
  x: EAVE.x + t * COS + n * SIN,
  y: EAVE.y - t * SIN + n * COS,
});

/** Point on the slope line at offset n directly above/below global x. */
const atX = (x: number, n: number): Pt => along((x - EAVE.x - n * SIN) / COS, n);

/** Band between two offsets, from t0 to t1, as a closed path. */
const band = (t0: number, t1: number, n0: number, n1: number) =>
  toPath([along(t0, n0), along(t1, n0), along(t1, n1), along(t0, n1)], true);

// Framing below the roof plane.
const WALL = { siding: 366, sheathing: 378, studOut: 384, studIn: 420, drywall: 424 };
const PLATE_TOP = 412;
const JOIST = { top: 388, bottom: PLATE_TOP };
const SOFFIT_Y = 505;
const FASCIA = { left: 206, right: 220, top: 431, bottom: SOFFIT_Y };
const RIGHT_BREAK_X = 1150;
const WALL_BOTTOM = 740;

// Rafter outline: plumb tail at the eave, birdsmouth over the wall plate, plumb cut at the ridge board.
const rafterTailTop = along(0, N.deckBottom);
const rafterTailBottom = atX(rafterTailTop.x, N.rafterBottom);
const birdsmouthHeel = atX(WALL.studOut, N.rafterBottom);
const rafterRidgeTop = atX(RIDGE_X - 6, N.deckBottom);
const rafterRidgeBottom = atX(RIDGE_X - 6, N.rafterBottom);

// The birdsmouth seat runs level along the plate top until it meets the rafter's bottom edge again.
const seatEnd = (() => {
  // Solve for the point on the bottom edge whose y equals the plate top.
  const t = (EAVE.y + N.rafterBottom * COS - PLATE_TOP) / SIN;
  return along(t, N.rafterBottom);
})();

const rafterPath = toPath(
  [
    rafterTailTop,
    rafterRidgeTop,
    rafterRidgeBottom,
    seatEnd,
    { x: WALL.studOut, y: PLATE_TOP },
    birdsmouthHeel,
    rafterTailBottom,
  ],
  true,
);

// Shingle courses: a sawtooth top surface (each butt steps up) over a straight base line.
const EXPOSURE = 34;
const SHINGLE_START_T = -8;
const shingleCourses = Array.from(
  { length: Math.floor((RIDGE_GAP_T - SHINGLE_START_T) / EXPOSURE) },
  (_, k) => SHINGLE_START_T + k * EXPOSURE,
);
const shingleTopPath = (() => {
  const points: Pt[] = [along(SHINGLE_START_T, N.shingleBase)];
  for (const t of shingleCourses) {
    points.push(along(t, N.shingleTop));
    points.push(along(Math.min(t + EXPOSURE, RIDGE_GAP_T), N.shingleTop + 5));
  }
  points.push(along(RIDGE_GAP_T, N.shingleTop + 5));
  points.push(along(RIDGE_GAP_T, N.shingleBase));
  return toPath(points, true);
})();
/** Underside of each shingle and the laminated second layer near its butt. */
const shingleLayerLines = shingleCourses
  .map((t) => {
    const end = Math.min(t + EXPOSURE * 2.4, RIDGE_GAP_T);
    const lam = Math.min(t + EXPOSURE * 0.85, RIDGE_GAP_T);
    const a = along(t, N.shingleTop + 7);
    const b = along(end, N.shingleBase - 1);
    const c = along(t, N.shingleTop + 13);
    const d = along(lam, N.shingleTop + 11);
    return `M${round(a.x)} ${round(a.y)}L${round(b.x)} ${round(b.y)}M${round(c.x)} ${round(c.y)}L${round(d.x)} ${round(d.y)}`;
  })
  .join("");

// Drip edge: flange on the deck, over the deck edge, down the fascia face, kick-out at the bottom.
const dripEdge = toPath([
  along(60, -1),
  along(0, -1),
  { x: FASCIA.left - 2, y: FASCIA.top - 1 },
  { x: FASCIA.left - 3, y: 452 },
  { x: FASCIA.left - 9, y: 458 },
]);

// K-style gutter hung on the fascia below the drip edge.
const gutter =
  "M203 456L203 493Q203 499 197 499L173 499Q167 499 166 493L162 471Q160 461 166 457L171 452";

// Plumbing vent through the roof, sealed with a flashing boot.
const PIPE = { left: 560, right: 576, top: 196 };
const pipeBase = JOIST.top;
const bootFlangeLeft = atX(526, N.shingleTop - 1.5);
const bootFlangeRight = atX(612, N.shingleTop - 1.5);
const bootCollar = toPath(
  [
    atX(PIPE.left - 10, N.shingleTop - 2),
    { x: PIPE.left - 2, y: atX(PIPE.left, N.shingleTop).y - 26 },
    { x: PIPE.right + 2, y: atX(PIPE.right, N.shingleTop).y - 26 },
    atX(PIPE.right + 10, N.shingleTop - 2),
  ],
  true,
);

// Ridge vent cap spanning the slot at the ridge, symmetric about the ridge line.
const capBase = along(L - 75, N.shingleTop);
const capTop = along(L - 75, N.shingleTop - 14);
const ridgeShingleApex = { x: RIDGE_X, y: RIDGE.y + N.shingleTop / COS };
const capApex = { x: RIDGE_X, y: RIDGE.y + (N.shingleTop - 14) / COS };
const mirrorX = (p: Pt): Pt => ({ x: 2 * RIDGE_X - p.x, y: p.y });
const ridgeCap = toPath([capBase, capTop, capApex, mirrorX(capTop), mirrorX(capBase), ridgeShingleApex], true);
const ridgeLouvres = [0.18, 0.3, 0.42]
  .map((f) => {
    const p = { x: capBase.x + (capApex.x - capBase.x) * f, y: capBase.y + (capApex.y - capBase.y) * f };
    const q = { x: p.x, y: p.y + 9 };
    const mp = mirrorX(p);
    const mq = mirrorX(q);
    return `M${round(p.x)} ${round(p.y)}V${round(q.y)}M${round(mp.x)} ${round(mp.y)}V${round(mq.y)}`;
  })
  .join("");

// Soffit vent: perforated stretch of the soffit board.
const SOFFIT_VENT = { left: 242, right: 302 };

// Air path: in at the soffit, up the rafter bay under the deck, out through the ridge vent.
const airIn = toPath([
  { x: 272, y: SOFFIT_Y + 44 },
  { x: 272, y: SOFFIT_Y + 8 },
]);
const airUp = (() => {
  const start = atX(300, 24);
  const end = along(L - 46, 24);
  return `M${round(start.x)} ${round(start.y)}L${round(end.x)} ${round(end.y)}`;
})();
const airOut = (() => {
  const a = { x: RIDGE_X - 14, y: RIDGE.y + 46 };
  const b = { x: RIDGE_X - 14, y: RIDGE.y - 2 };
  const c = { x: capBase.x + 22, y: capBase.y - 6 };
  return `M${round(a.x)} ${round(a.y)}L${round(b.x)} ${round(b.y)}Q${round(b.x - 6)} ${round(c.y - 2)} ${round(c.x)} ${round(c.y)}`;
})();

// Insulation batt symbol on the attic floor: overlapping loops between two lines.
const battPath = (x0: number, x1: number, yBase: number, height: number, pitch: number) => {
  const segments: string[] = [`M${round(x0)} ${round(yBase)}`];
  for (let x = x0; x < x1; x += pitch) {
    segments.push(
      `C${round(x - pitch * 0.35)} ${round(yBase - height * 1.25)} ${round(x + pitch * 1.35)} ${round(yBase - height * 1.25)} ${round(x + pitch)} ${round(yBase)}`,
    );
  }
  return segments.join("");
};

// Callout anchor points, by part. Parts with two leaders repeat the same number, as keynotes do.
type Anchor = { bubble: Pt; target: Pt; via?: Pt };
const anchors: Record<RoofPart, Anchor[]> = {
  deck: [{ bubble: { x: 800, y: 300 }, target: along(520, 6) }],
  barrier: [{ bubble: { x: 130, y: 300 }, target: along(70, -3) }],
  underlayment: [{ bubble: { x: 360, y: 150 }, target: along(250, -3) }],
  shingles: [{ bubble: { x: 230, y: 214 }, target: along(150, -16) }],
  flashing: [
    { bubble: { x: 92, y: 384 }, target: { x: FASCIA.left - 3, y: 444 } },
    { bubble: { x: 500, y: 112 }, target: bootFlangeLeft },
  ],
  ventilation: [
    { bubble: { x: 300, y: 612 }, target: { x: 272, y: SOFFIT_Y + 3 } },
    { bubble: { x: 850, y: 36 }, target: { x: capTop.x + 18, y: capTop.y - 4 } },
  ],
};

/** One slope of the roof: framing, deck, membranes, shingles. Drawn once and mirrored for the far slope. */
function Slope({ prefix }: { prefix: string }) {
  return (
    <g>
      {/* rafter */}
      <path d={rafterPath} fill="var(--color-paper)" />
      <path d={rafterPath} fill={hatchFill(prefix, "grain")} stroke="currentColor" className="lw-medium" />
      {/* roof deck */}
      <path d={band(0, RIDGE_GAP_T, N.deckTop, N.deckBottom)} fill="var(--color-paper)" />
      <path d={band(0, RIDGE_GAP_T, N.deckTop, N.deckBottom)} fill={hatchFill(prefix, "diagonal")} stroke="currentColor" className="lw-medium" />
      {/* ice-and-water barrier at the eave: solid membrane */}
      <path d={band(0, BARRIER_END_T, N.membraneTop, N.deckTop)} fill="currentColor" stroke="currentColor" className="lw-light" />
      {/* synthetic underlayment over the rest of the deck */}
      <path d={band(BARRIER_END_T, RIDGE_GAP_T, N.membraneTop, N.deckTop)} fill="var(--color-paper)" stroke="currentColor" className="lw-light" />
      <path
        d={`M${round(along(BARRIER_END_T, -3).x)} ${round(along(BARRIER_END_T, -3).y)}L${round(along(RIDGE_GAP_T, -3).x)} ${round(along(RIDGE_GAP_T, -3).y)}`}
        stroke="currentColor"
        strokeDasharray="7 4"
        className="lw-light"
      />
      {/* architectural shingles */}
      <path d={shingleTopPath} fill="var(--color-paper)" />
      <path d={shingleTopPath} fill={hatchFill(prefix, "cross")} stroke="currentColor" className="lw-medium" />
      <path d={shingleLayerLines} fill="none" stroke="currentColor" className="lw-hair" />
    </g>
  );
}

// Section through an asphalt shingle roof, eave to ridge. Server component: pure SVG, no state.
export default function RoofSection({ callouts, title, description }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const prefix = `roof-${uid}`;
  const titleId = `${prefix}-title`;
  const descId = `${prefix}-desc`;
  const arrowId = `${prefix}-arrow`;
  const farSlopeClip = `${prefix}-far`;
  const atticClip = `${prefix}-attic`;
  const gutterSheet = serviceSheet("Accessories").number;
  const insulationSheet = serviceSheet("Insulation").number;
  const sidingSheet = serviceSheet("Siding").number;

  // Attic space under the rafters and above the ceiling joists, for clipping the insulation.
  const attic = toPoints([
    { x: WALL.drywall, y: JOIST.top },
    atX(WALL.drywall, N.rafterBottom),
    atX(RIDGE_X - 6, N.rafterBottom),
    mirrorX(atX(2 * RIDGE_X - RIGHT_BREAK_X, N.rafterBottom)),
    { x: RIGHT_BREAK_X, y: JOIST.top },
  ]);

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className="drawing block h-auto w-full"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{description}</desc>
      <HatchDefs prefix={prefix} />
      <ArrowMarker id={arrowId} />
      <defs>
        <clipPath id={farSlopeClip}>
          <rect x={RIDGE_X} y="0" width={RIGHT_BREAK_X - RIDGE_X} height={VIEW.h} />
        </clipPath>
        <clipPath id={atticClip}>
          <polygon points={attic} />
        </clipPath>
      </defs>

      {/* ---------- wall below the eave ---------- */}
      <g>
        {/* lap siding profile on the outside face */}
        <rect x={WALL.siding} y={SOFFIT_Y} width={WALL.sheathing - WALL.siding} height={WALL_BOTTOM - SOFFIT_Y} fill="var(--color-paper)" />
        <path
          d={Array.from({ length: Math.ceil((WALL_BOTTOM - SOFFIT_Y) / 24) }, (_, i) => {
            const y = SOFFIT_Y + i * 24;
            return `M${WALL.sheathing} ${y}L${WALL.siding} ${y + 20}L${WALL.siding} ${Math.min(y + 24, WALL_BOTTOM)}`;
          }).join("")}
          fill="none"
          stroke="currentColor"
          className="lw-light"
        />
        {/* sheathing */}
        <rect x={WALL.sheathing} y={PLATE_TOP} width={WALL.studOut - WALL.sheathing} height={WALL_BOTTOM - PLATE_TOP} fill={hatchFill(prefix, "diagonal")} stroke="currentColor" className="lw-light" />
        {/* stud and double top plate */}
        <rect x={WALL.studOut} y={PLATE_TOP + 16} width={WALL.studIn - WALL.studOut} height={WALL_BOTTOM - PLATE_TOP - 16} fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
        <rect x={WALL.studOut} y={PLATE_TOP} width={WALL.studIn - WALL.studOut} height="8" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
        <rect x={WALL.studOut} y={PLATE_TOP + 8} width={WALL.studIn - WALL.studOut} height="8" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
        {/* interior finish */}
        <rect x={WALL.studIn} y={JOIST.bottom + 4} width={WALL.drywall - WALL.studIn} height={WALL_BOTTOM - JOIST.bottom - 4} fill="var(--color-paper)" stroke="currentColor" className="lw-light" />
        <BreakLine a={{ x: WALL.siding, y: WALL_BOTTOM }} b={{ x: WALL.drywall, y: WALL_BOTTOM }} />
      </g>

      {/* ---------- ceiling joist and ceiling ---------- */}
      <rect x={WALL.studOut} y={JOIST.top} width={RIGHT_BREAK_X - WALL.studOut} height={JOIST.bottom - JOIST.top} fill="var(--color-paper)" />
      <rect x={WALL.studOut} y={JOIST.top} width={RIGHT_BREAK_X - WALL.studOut} height={JOIST.bottom - JOIST.top} fill={hatchFill(prefix, "grain")} stroke="currentColor" className="lw-medium" />
      <rect x={WALL.studIn} y={JOIST.bottom} width={RIGHT_BREAK_X - WALL.studIn} height="4" fill="var(--color-paper)" stroke="currentColor" className="lw-light" />

      {/* ---------- attic insulation (reference, see the insulation sheet) ---------- */}
      <g clipPath={`url(#${atticClip})`}>
        <path d={battPath(WALL.drywall + 6, RIGHT_BREAK_X, JOIST.top, 44, 22)} fill="none" stroke="currentColor" className="lw-light" />
        <line x1={WALL.drywall} y1={JOIST.top - 46} x2={RIGHT_BREAK_X} y2={JOIST.top - 46} stroke="currentColor" strokeDasharray="3 5" className="lw-hair" />
      </g>

      {/* ---------- plumbing vent pipe (behind the roof layers it passes through) ---------- */}
      <rect x={PIPE.left} y={PIPE.top} width={PIPE.right - PIPE.left} height={pipeBase - PIPE.top} fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />

      {/* ---------- near slope ---------- */}
      <Slope prefix={prefix} />

      {/* ---------- far slope, mirrored about the ridge and cut off with a break line ---------- */}
      <g clipPath={`url(#${farSlopeClip})`}>
        <g transform={`translate(${2 * RIDGE_X} 0) scale(-1 1)`}>
          <Slope prefix={prefix} />
        </g>
      </g>
      <BreakLine a={{ x: RIGHT_BREAK_X, y: atX(2 * RIDGE_X - RIGHT_BREAK_X, N.shingleTop).y - 6 }} b={{ x: RIGHT_BREAK_X, y: JOIST.bottom + 4 }} />

      {/* ---------- ridge board and ridge vent ---------- */}
      <rect x={RIDGE_X - 6} y={round(RIDGE.y + 18)} width="12" height="72" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <path d={ridgeCap} fill="var(--color-paper)" stroke="currentColor" className="lw-heavy" />
      <path d={ridgeLouvres} stroke="currentColor" className="lw-light" />

      {/* ---------- pipe above the roof and its flashing boot ---------- */}
      <rect
        x={PIPE.left}
        y={PIPE.top}
        width={PIPE.right - PIPE.left}
        height={round(atX(PIPE.left, N.shingleTop).y - PIPE.top)}
        fill="var(--color-paper)"
        stroke="currentColor"
        className="lw-medium"
      />
      <path d={bootCollar} fill="var(--color-paper)" stroke="currentColor" className="lw-heavy" />
      <line
        x1={round(bootFlangeLeft.x)}
        y1={round(bootFlangeLeft.y)}
        x2={round(bootFlangeRight.x)}
        y2={round(bootFlangeRight.y)}
        stroke="currentColor"
        className="lw-heavy"
      />

      {/* ---------- eave: fascia, drip edge, gutter, soffit ---------- */}
      <rect x={FASCIA.left} y={FASCIA.top} width={FASCIA.right - FASCIA.left} height={FASCIA.bottom - FASCIA.top} fill="var(--color-paper)" />
      <rect
        x={FASCIA.left}
        y={FASCIA.top}
        width={FASCIA.right - FASCIA.left}
        height={FASCIA.bottom - FASCIA.top}
        fill={hatchFill(prefix, "grain")}
        stroke="currentColor"
        className="lw-medium"
      />
      <path d={dripEdge} fill="none" stroke="currentColor" strokeLinejoin="round" className="lw-heavy" />
      <path d={gutter} fill="var(--color-paper)" stroke="currentColor" strokeLinejoin="round" className="lw-medium" />
      <rect x={FASCIA.right} y={SOFFIT_Y - 6} width={WALL.siding - FASCIA.right} height="6" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <path
        d={Array.from({ length: 6 }, (_, i) => {
          const x = SOFFIT_VENT.left + 4 + i * 10;
          return `M${x} ${SOFFIT_Y - 6}V${SOFFIT_Y}`;
        }).join("")}
        stroke="currentColor"
        className="lw-light"
      />
      <rect x={SOFFIT_VENT.left} y={SOFFIT_Y - 6} width={SOFFIT_VENT.right - SOFFIT_VENT.left} height="6" fill="none" stroke="currentColor" className="lw-medium" />

      {/* ---------- airflow ---------- */}
      <g fill="none" stroke="currentColor" strokeDasharray="10 6" className="lw-light">
        <path d={airIn} markerEnd={`url(#${arrowId})`} />
        <path d={airUp} markerEnd={`url(#${arrowId})`} />
        <path d={airOut} markerEnd={`url(#${arrowId})`} />
        <path
          d={airOut}
          transform={`translate(${2 * RIDGE_X} 0) scale(-1 1)`}
          markerEnd={`url(#${arrowId})`}
        />
      </g>

      {/* ---------- dimension: eave overhang, measured on site ---------- */}
      <ExtensionLine from={{ x: FASCIA.left - 9, y: 506 }} to={{ x: FASCIA.left - 9, y: 712 }} />
      <ExtensionLine from={{ x: WALL.siding, y: WALL_BOTTOM - 20 }} to={{ x: WALL.siding, y: 712 }} />
      <DimensionLine a={{ x: FASCIA.left - 9, y: 704 }} b={{ x: WALL.siding, y: 704 }} label="F.V." />

      {/* ---------- reference labels ---------- */}
      <g fontSize="13">
        <text x={round(along(700, 44).x)} y={round(along(700, 44).y)} transform={`rotate(${round((-ANGLE * 180) / Math.PI)} ${round(along(700, 44).x)} ${round(along(700, 44).y)})`} textAnchor="middle" dominantBaseline="central">
          RAFTER
        </text>
        <text x={round(along(430, 24).x)} y={round(along(430, 24).y - 9)} transform={`rotate(${round((-ANGLE * 180) / Math.PI)} ${round(along(430, 24).x)} ${round(along(430, 24).y - 9)})`} textAnchor="middle" dominantBaseline="central" fontSize="11">
          AIR PATH
        </text>
        <text x="760" y="400" textAnchor="middle" dominantBaseline="central" fontSize="11">
          CEILING JOIST
        </text>

        <text x="40" y="548">GUTTER</text>
        <text x="40" y="566" fontSize="11">SEE {gutterSheet}</text>
        <polyline points="104,544 160,544 176,500" fill="none" stroke="currentColor" className="lw-light" />

        <text x="1140" y="318" textAnchor="end">ATTIC INSULATION · SEE {insulationSheet}</text>
        <polyline points="1040,326 1040,348" fill="none" stroke="currentColor" className="lw-light" />

        <text x="40" y="652">SIDING</text>
        <text x="40" y="670" fontSize="11">SEE {sidingSheet}</text>
        <polyline points="104,648 362,648" fill="none" stroke="currentColor" className="lw-light" />
        <circle cx="364" cy="648" r="3" fill="currentColor" />

        <text x="40" y="732" fontSize="11">EAVE OVERHANG: F.V. (FIELD VERIFY)</text>

        <text x="560" y="520" fontSize="12">INTERIOR</text>
      </g>

      {/* ---------- numbered callouts ---------- */}
      <g>
        {callouts.flatMap((c) =>
          anchors[c.part].map((a, i) => (
            <g key={`${c.part}-${i}`}>
              <Leader from={a.bubble} to={a.target} via={a.via} />
              <Bubble at={a.bubble}>{String(c.mark)}</Bubble>
            </g>
          )),
        )}
      </g>
    </svg>
  );
}
