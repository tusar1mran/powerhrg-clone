// Shared SVG building blocks for the sheet drawings: hatch patterns, callout bubbles, leaders,
// dimension lines and break lines. Line weights come from the .lw-* classes in globals.css.
// Coordinates are rounded to one decimal place to keep the markup small.

export type Pt = { x: number; y: number };

export const round = (n: number) => Math.round(n * 10) / 10;

/** "x,y x,y …" for polygon/polyline `points`. */
export const toPoints = (list: Pt[]) => list.map((p) => `${round(p.x)},${round(p.y)}`).join(" ");

/** "M x y L x y …" path data, optionally closed. */
export const toPath = (list: Pt[], close = false) => {
  const [first, ...rest] = list;
  const head = `M${round(first.x)} ${round(first.y)}`;
  const tail = rest.map((p) => `L${round(p.x)} ${round(p.y)}`).join(" ");
  return `${head} ${tail}${close ? " Z" : ""}`;
};

export type HatchName = "diagonal" | "cross" | "grain" | "courses" | "lap";

export const hatchId = (prefix: string, name: HatchName) => `${prefix}-${name}`;

export const hatchFill = (prefix: string, name: HatchName) => `url(#${hatchId(prefix, name)})`;

/**
 * Material hatches, in the conventions used on construction drawings:
 * diagonal = sheathing / plywood, cross = shingles, grain = lumber along its length,
 * courses = shingle roof in elevation, lap = lap siding in elevation.
 */
export function HatchDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <pattern id={hatchId(prefix, "diagonal")} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.55" />
      </pattern>
      <pattern id={hatchId(prefix, "cross")} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
        <path d="M0 0V8M0 0H8" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />
      </pattern>
      <pattern id={hatchId(prefix, "grain")} patternUnits="userSpaceOnUse" width="64" height="9">
        <path d="M0 4.5C16 2 32 7 48 4.5S64 3 64 4.5" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />
      </pattern>
      <pattern id={hatchId(prefix, "courses")} patternUnits="userSpaceOnUse" width="32" height="14">
        <path d="M0 13.5H32M10 0V13.5M26 0V6.5" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.55" fill="none" />
      </pattern>
      <pattern id={hatchId(prefix, "lap")} patternUnits="userSpaceOnUse" width="16" height="11">
        <path d="M0 10.5H16" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      </pattern>
    </defs>
  );
}

/** Arrowhead marker for airflow and sequence arrows. */
export function ArrowMarker({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10Z" fill="currentColor" />
      </marker>
    </defs>
  );
}

type BubbleProps = { at: Pt; r?: number; children: string };

/** Numbered callout bubble. */
export function Bubble({ at, r = 17, children }: BubbleProps) {
  return (
    <g>
      <circle cx={round(at.x)} cy={round(at.y)} r={r} className="lw-medium" fill="var(--color-paper)" stroke="currentColor" />
      <text x={round(at.x)} y={round(at.y)} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="600">
        {children}
      </text>
    </g>
  );
}

type LeaderProps = {
  /** Bubble centre; the line starts on the bubble's edge. */
  from: Pt;
  to: Pt;
  r?: number;
  /** Optional elbow between the bubble and the target. */
  via?: Pt;
};

/** Leader line from a callout bubble to the thing it describes, ending in a dot. */
export function Leader({ from, to, r = 17, via }: LeaderProps) {
  const first = via ?? to;
  const dx = first.x - from.x;
  const dy = first.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const start = { x: from.x + (dx / len) * r, y: from.y + (dy / len) * r };
  const line = via ? [start, via, to] : [start, to];

  return (
    <g>
      <polyline points={toPoints(line)} fill="none" stroke="currentColor" className="lw-light" />
      <circle cx={round(to.x)} cy={round(to.y)} r="3" fill="currentColor" />
    </g>
  );
}

type DimensionProps = {
  a: Pt;
  b: Pt;
  label: string;
  fontSize?: number;
};

/**
 * Dimension line with architectural ticks and the label set in a gap at the middle. The labels on
 * this site's drawings are notations such as "F.V." (field verify), never invented measurements.
 */
export function DimensionLine({ a, b, label, fontSize = 13 }: DimensionProps) {
  const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  // Plex Mono advances 0.6em per character, plus the 0.04em letter-spacing set on .drawing text.
  const gap = label.length * fontSize * 0.64 + 14;
  const tick = (p: Pt) => `M${round(p.x - 5)} ${round(p.y + 5)}L${round(p.x + 5)} ${round(p.y - 5)}`;

  return (
    <g>
      <line x1={round(a.x)} y1={round(a.y)} x2={round(b.x)} y2={round(b.y)} stroke="currentColor" className="lw-light" />
      <g transform={`rotate(${round(angle)} ${round(a.x)} ${round(a.y)})`}>
        <path d={tick({ x: a.x, y: a.y })} stroke="currentColor" className="lw-medium" />
      </g>
      <g transform={`rotate(${round(angle)} ${round(b.x)} ${round(b.y)})`}>
        <path d={tick({ x: b.x, y: b.y })} stroke="currentColor" className="lw-medium" />
      </g>
      <g transform={`rotate(${round(angle)} ${round(mid.x)} ${round(mid.y)})`}>
        <rect x={round(mid.x - gap / 2)} y={round(mid.y - fontSize * 0.75)} width={round(gap)} height={round(fontSize * 1.5)} fill="var(--color-paper)" />
        <text x={round(mid.x)} y={round(mid.y)} textAnchor="middle" dominantBaseline="central" fontSize={fontSize}>
          {label}
        </text>
      </g>
    </g>
  );
}

/** Extension line from the object to a dimension line, with the usual small gap at the object. */
export function ExtensionLine({ from, to }: { from: Pt; to: Pt }) {
  return <line x1={round(from.x)} y1={round(from.y)} x2={round(to.x)} y2={round(to.y)} stroke="currentColor" className="lw-hair" />;
}

/** Zig-zag break line where a member is cut off for the drawing. */
export function BreakLine({ a, b }: { a: Pt; b: Pt }) {
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // Perpendicular offset for the zig-zag.
  const px = -uy * 9;
  const py = ux * 9;
  const along = (d: number) => ({ x: mid.x + ux * d, y: mid.y + uy * d });
  const p1 = along(-6);
  const p2 = along(6);
  const points: Pt[] = [
    { x: a.x - ux * 8, y: a.y - uy * 8 },
    p1,
    { x: along(-2).x + px, y: along(-2).y + py },
    { x: along(2).x - px, y: along(2).y - py },
    p2,
    { x: b.x + ux * 8, y: b.y + uy * 8 },
  ];
  return <polyline points={toPoints(points)} fill="none" stroke="currentColor" className="lw-light" />;
}
