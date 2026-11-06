import Link from "next/link";
import { useId } from "react";
import { HatchDefs, hatchFill, round, type Pt } from "@/components/drawing/svg";
import type { ServiceName } from "@/lib/links";

// Front elevation of a two-storey house, used as the key plan on the cover sheet. Each numbered
// callout is a link to the sheet for that part of the house, so the drawing doubles as navigation.
// It is a diagram (NTS): proportions are chosen for legibility, not measured from a real house.

export type ElevationCallout = {
  service: ServiceName;
  /** Sheet number printed in the bubble, e.g. "A-200". */
  number: string;
  /** Short label printed next to the bubble, e.g. "Roof". */
  label: string;
  href: string;
};

type Props = {
  callouts: ElevationCallout[];
  title: string;
  description: string;
};

const VIEW = { w: 960, h: 640 };
const GROUND = 548;
const WALL = { left: 200, right: 760, top: 172, bottom: 528 };
const EAVE = { left: 164, right: 796, y: 164 };
const RIDGE = { left: 316, right: 644, y: 70 };
const FLOOR_BAND = 344;
const DOOR = { left: 440, right: 520, top: 398, bottom: WALL.bottom };
const PORCH = { left: 398, right: 562, eave: 378, apex: 334 };

type Opening = { x: number; y: number; w: number; h: number };

const upperWindows: Opening[] = [
  { x: 254, y: 212, w: 72, h: 96 },
  { x: 444, y: 212, w: 72, h: 96 },
  { x: 634, y: 212, w: 72, h: 96 },
];
const lowerWindows: Opening[] = [
  { x: 254, y: 392, w: 72, h: 96 },
  { x: 634, y: 392, w: 72, h: 96 },
];

/** Where each service's leader points, and where its bubble and label sit. */
type Placement = { bubble: Pt; target: Pt; via?: Pt; label: Pt; anchor: "start" | "middle" | "end" };

const placements: Record<ServiceName, Placement> = {
  Roofing: { bubble: { x: 196, y: 64 }, target: { x: 360, y: 112 }, label: { x: 236, y: 64 }, anchor: "start" },
  Insulation: { bubble: { x: 900, y: 64 }, target: { x: 700, y: 150 }, label: { x: 860, y: 64 }, anchor: "end" },
  Accessories: { bubble: { x: 884, y: 210 }, target: { x: 790, y: 182 }, label: { x: 884, y: 262 }, anchor: "middle" },
  Windows: { bubble: { x: 84, y: 260 }, target: { x: 246, y: 260 }, label: { x: 84, y: 312 }, anchor: "middle" },
  Siding: { bubble: { x: 884, y: 430 }, target: { x: 730, y: 430 }, label: { x: 884, y: 482 }, anchor: "middle" },
  Doors: {
    bubble: { x: 300, y: 596 },
    target: { x: 452, y: 470 },
    via: { x: 380, y: 596 },
    label: { x: 260, y: 596 },
    anchor: "end",
  },
};

const BUBBLE_R = 30;

/**
 * Downspout from the gutter to grade, with an elbow and a splash shoe turned away from the house.
 * `x` is the side nearest the wall; `dir` is -1 to kick out to the left and 1 to the right.
 */
function downspout(x: number, dir: -1 | 1) {
  const top = EAVE.y + 22;
  const w = 12;
  const outer = x + (dir < 0 ? 0 : w);
  const inner = x + (dir < 0 ? w : 0);
  const path = [
    `M${outer} ${top}`,
    `V${GROUND - 32}`,
    `L${outer + dir * 18} ${GROUND - 14}`,
    `H${outer + dir * 36}`,
    `V${GROUND - 2}`,
    `H${outer + dir * 12}`,
    `L${inner} ${GROUND - 26}`,
    `V${top}`,
    "Z",
  ].join("");
  const straps = `M${x} ${top + 110}H${x + w}M${x} ${top + 240}H${x + w}`;
  return { key: `${x}`, path, straps };
}

const downspouts = [downspout(176, -1), downspout(772, 1)];

function Window({ x, y, w, h }: Opening) {
  const mid = y + h / 2;
  return (
    <g>
      {/* casing */}
      <rect x={x - 7} y={y - 7} width={w + 14} height={h + 14} fill="var(--color-paper)" stroke="currentColor" className="lw-light" />
      {/* frame and sashes */}
      <rect x={x} y={y} width={w} height={h} fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x={x + 5} y={y + 5} width={w - 10} height={h / 2 - 5} fill="none" stroke="currentColor" className="lw-hair" />
      <rect x={x + 5} y={mid} width={w - 10} height={h / 2 - 5} fill="none" stroke="currentColor" className="lw-hair" />
      <line x1={x} y1={mid} x2={x + w} y2={mid} stroke="currentColor" className="lw-medium" />
      {/* glass reflection */}
      <path
        d={`M${x + 16} ${mid - 14}L${x + 34} ${y + 16}M${x + 16} ${y + h - 14}L${x + 34} ${mid + 12}`}
        stroke="currentColor"
        className="lw-hair"
      />
      {/* sill */}
      <rect x={x - 12} y={y + h + 7} width={w + 24} height="6" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
    </g>
  );
}

/** Batt symbol (overlapping loops) drawn in hidden line, for insulation behind the roof. */
function hiddenBatts(x0: number, x1: number, base: number, height: number, pitch: number) {
  const parts: string[] = [`M${x0} ${base}`];
  for (let x = x0; x + pitch <= x1; x += pitch) {
    parts.push(
      `C${round(x - pitch * 0.35)} ${round(base - height)} ${round(x + pitch * 1.35)} ${round(base - height)} ${round(x + pitch)} ${base}`,
    );
  }
  return parts.join("");
}

export default function HouseElevation({ callouts, title, description }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const prefix = `elev-${uid}`;
  const titleId = `${prefix}-title`;
  const descId = `${prefix}-desc`;
  const roofClip = `${prefix}-roof`;
  const wallClip = `${prefix}-wall`;

  const roof = `M${EAVE.left} ${EAVE.y}L${RIDGE.left} ${RIDGE.y}H${RIDGE.right}L${EAVE.right} ${EAVE.y}Z`;
  const porchRoof = `M${PORCH.left} ${PORCH.eave}L${(PORCH.left + PORCH.right) / 2} ${PORCH.apex}L${PORCH.right} ${PORCH.eave}Z`;

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      role="group"
      aria-labelledby={`${titleId} ${descId}`}
      className="drawing block h-auto w-full"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{description}</desc>
      <HatchDefs prefix={prefix} />
      <defs>
        <clipPath id={roofClip}>
          <path d={roof} />
        </clipPath>
        <clipPath id={wallClip}>
          <rect x={WALL.left} y={WALL.top} width={WALL.right - WALL.left} height={WALL.bottom - WALL.top} />
        </clipPath>
      </defs>

      {/* ---------- ground and foundation ---------- */}
      <rect x={WALL.left - 4} y={WALL.bottom} width={WALL.right - WALL.left + 8} height={GROUND - WALL.bottom} fill="var(--color-paper)" />
      <rect
        x={WALL.left - 4}
        y={WALL.bottom}
        width={WALL.right - WALL.left + 8}
        height={GROUND - WALL.bottom}
        fill={hatchFill(prefix, "diagonal")}
        stroke="currentColor"
        className="lw-medium"
      />

      {/* ---------- walls: lap siding, floor band, corner boards ---------- */}
      <rect x={WALL.left} y={WALL.top} width={WALL.right - WALL.left} height={WALL.bottom - WALL.top} fill="var(--color-paper)" />
      <rect
        x={WALL.left}
        y={WALL.top}
        width={WALL.right - WALL.left}
        height={WALL.bottom - WALL.top}
        fill={hatchFill(prefix, "lap")}
        stroke="currentColor"
        className="lw-heavy"
      />
      <rect x={WALL.left - 4} y={FLOOR_BAND - 5} width={WALL.right - WALL.left + 8} height="10" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x={WALL.left} y={WALL.top} width="14" height={WALL.bottom - WALL.top} fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x={WALL.right - 14} y={WALL.top} width="14" height={WALL.bottom - WALL.top} fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />

      {/* ---------- windows ---------- */}
      {[...upperWindows, ...lowerWindows].map((w) => (
        <Window key={`${w.x}-${w.y}`} {...w} />
      ))}

      {/* ---------- entry door, porch roof and steps ---------- */}
      <rect x={DOOR.left - 8} y={DOOR.top - 8} width={DOOR.right - DOOR.left + 16} height={DOOR.bottom - DOOR.top + 8} fill="var(--color-paper)" stroke="currentColor" className="lw-light" />
      <rect x={DOOR.left} y={DOOR.top} width={DOOR.right - DOOR.left} height={DOOR.bottom - DOOR.top} fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x={DOOR.left + 12} y={DOOR.top + 14} width={DOOR.right - DOOR.left - 24} height="38" fill="none" stroke="currentColor" className="lw-hair" />
      <rect x={DOOR.left + 12} y={DOOR.top + 64} width={DOOR.right - DOOR.left - 24} height="52" fill="none" stroke="currentColor" className="lw-hair" />
      <circle cx={DOOR.right - 12} cy={DOOR.top + 64} r="3" fill="currentColor" />
      <path
        d={`M${DOOR.right} ${DOOR.top}L${DOOR.left} ${(DOOR.top + DOOR.bottom) / 2}L${DOOR.right} ${DOOR.bottom}`}
        fill="none"
        stroke="currentColor"
        strokeDasharray="6 5"
        className="lw-hair"
      />
      {[PORCH.left + 10, PORCH.right - 18].map((x) => (
        <rect key={x} x={x} y={PORCH.eave} width="8" height={WALL.bottom - PORCH.eave} fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      ))}
      <path d={porchRoof} fill="var(--color-paper)" />
      <path d={porchRoof} fill={hatchFill(prefix, "courses")} stroke="currentColor" strokeLinejoin="round" className="lw-heavy" />
      <rect x={PORCH.left - 6} y={PORCH.eave} width={PORCH.right - PORCH.left + 12} height="8" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x={DOOR.left - 24} y={WALL.bottom} width={DOOR.right - DOOR.left + 48} height="10" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x={DOOR.left - 36} y={WALL.bottom + 10} width={DOOR.right - DOOR.left + 72} height="10" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />

      {/* ---------- hip roof ---------- */}
      <path d={roof} fill="var(--color-paper)" />
      <path d={roof} fill={hatchFill(prefix, "courses")} stroke="currentColor" strokeLinejoin="round" className="lw-heavy" />
      <line x1={RIDGE.left} y1={RIDGE.y} x2={RIDGE.right} y2={RIDGE.y} stroke="currentColor" className="lw-heavy" />

      {/* attic insulation behind the roof, in hidden (dashed) line */}
      <g clipPath={`url(#${roofClip})`}>
        <rect x={WALL.left + 20} y={EAVE.y - 34} width={WALL.right - WALL.left - 40} height="30" fill="var(--color-paper)" opacity="0.7" />
        <path
          d={hiddenBatts(WALL.left + 24, WALL.right - 24, EAVE.y - 6, 30, 26)}
          fill="none"
          stroke="currentColor"
          strokeDasharray="5 4"
          className="lw-light"
        />
        <line x1={WALL.left + 20} y1={EAVE.y - 6} x2={WALL.right - 20} y2={EAVE.y - 6} stroke="currentColor" strokeDasharray="10 5" className="lw-light" />
      </g>

      {/* ---------- fascia, gutter and downspouts ---------- */}
      <rect x={EAVE.left} y={EAVE.y} width={EAVE.right - EAVE.left} height="8" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x={EAVE.left - 6} y={EAVE.y + 8} width={EAVE.right - EAVE.left + 12} height="14" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <line x1={EAVE.left - 6} y1={EAVE.y + 12} x2={EAVE.right + 6} y2={EAVE.y + 12} stroke="currentColor" className="lw-hair" />
      {downspouts.map((d) => (
        <g key={d.key}>
          <path d={d.path} fill="var(--color-paper)" stroke="currentColor" strokeLinejoin="round" className="lw-medium" />
          <path d={d.straps} stroke="currentColor" className="lw-hair" />
        </g>
      ))}

      {/* ---------- grade ---------- */}
      <line x1="40" y1={GROUND} x2={VIEW.w - 40} y2={GROUND} stroke="currentColor" className="lw-heavy" />
      <path
        d={Array.from({ length: 36 }, (_, i) => {
          const x = 52 + i * 24;
          return `M${x} ${GROUND}l-10 12`;
        }).join("")}
        stroke="currentColor"
        className="lw-hair"
      />

      {/* ---------- callouts: each one links to its sheet ---------- */}
      {callouts.map((c) => {
        const p = placements[c.service];
        const first = p.via ?? p.target;
        const dx = first.x - p.bubble.x;
        const dy = first.y - p.bubble.y;
        const len = Math.hypot(dx, dy) || 1;
        const start = { x: p.bubble.x + (dx / len) * BUBBLE_R, y: p.bubble.y + (dy / len) * BUBBLE_R };
        const line = [start, ...(p.via ? [p.via] : []), p.target].map((q) => `${round(q.x)},${round(q.y)}`).join(" ");

        return (
          <Link key={c.service} href={c.href} aria-label={`${c.label}: sheet ${c.number}`} className="callout-link">
            <polyline points={line} fill="none" stroke="currentColor" className="lw-light" />
            <circle cx={p.target.x} cy={p.target.y} r="4" fill="currentColor" />
            <circle cx={p.bubble.x} cy={p.bubble.y} r={BUBBLE_R} className="callout-bubble lw-medium" stroke="currentColor" />
            <text x={p.bubble.x} y={p.bubble.y} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="600">
              {c.number}
            </text>
            <text
              x={p.label.x}
              y={p.label.y}
              textAnchor={p.anchor}
              dominantBaseline="central"
              fontSize="17"
              fontWeight="500"
              className="callout-label"
            >
              {c.label.toUpperCase()}
            </text>
          </Link>
        );
      })}
    </svg>
  );
}
