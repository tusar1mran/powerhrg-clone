// Isometric projection helpers for the layer diagrams. World axes: x runs to the lower right,
// y to the lower left, z straight up. Units are SVG user units.

const COS = 0.866;
const SIN = 0.5;

export type Origin = { ox: number; oy: number };
export type Box = { x: number; y: number; z: number; w: number; d: number; h: number };

const round = (n: number): number => Math.round(n * 10) / 10;

export function project(origin: Origin, x: number, y: number, z: number): [number, number] {
  return [round(origin.ox + (x - y) * COS), round(origin.oy + (x + y) * SIN - z)];
}

const toPoints = (pts: [number, number][]): string => pts.map(([px, py]) => `${px},${py}`).join(" ");

/** The three visible faces of a box: top, the face toward +x (right) and the face toward +y (front). */
export function boxFaces(origin: Origin, b: Box): { top: string; right: string; front: string } {
  const p = (x: number, y: number, z: number) => project(origin, x, y, z);
  const x1 = b.x + b.w;
  const y1 = b.y + b.d;
  const z1 = b.z + b.h;
  return {
    top: toPoints([p(b.x, b.y, z1), p(x1, b.y, z1), p(x1, y1, z1), p(b.x, y1, z1)]),
    right: toPoints([p(x1, b.y, z1), p(x1, y1, z1), p(x1, y1, b.z), p(x1, b.y, b.z)]),
    front: toPoints([p(b.x, y1, z1), p(x1, y1, z1), p(x1, y1, b.z), p(b.x, y1, b.z)]),
  };
}

/** A path of straight segments, each given as two world points. */
export function segments(origin: Origin, lines: [x0: number, y0: number, z0: number, x1: number, y1: number, z1: number][]): string {
  return lines
    .map(([ax, ay, az, bx, by, bz]) => {
      const [sx, sy] = project(origin, ax, ay, az);
      const [ex, ey] = project(origin, bx, by, bz);
      return `M${sx} ${sy}L${ex} ${ey}`;
    })
    .join("");
}

/**
 * Screen offset that moves a layer from its exploded position back to its stacked one, for the
 * scroll animation's starting frame. `dx`/`dy`/`dz` are world-space distances.
 */
export function collapseOffset(dx: number, dy: number, dz: number): { x: number; y: number } {
  return { x: round((dx - dy) * COS), y: round((dx + dy) * SIN - dz) };
}

/** Semi-axes of a horizontal circle of radius r once projected. */
export function isoEllipse(r: number): { rx: number; ry: number } {
  return { rx: round(r * 1.2247), ry: round(r * 0.7071) };
}

/** A rectangle lying in the vertical plane at depth `y` (a wall face), as polygon points. */
export function wallRect(origin: Origin, y: number, x0: number, x1: number, z0: number, z1: number): string {
  return toPoints([
    project(origin, x0, y, z0),
    project(origin, x1, y, z0),
    project(origin, x1, y, z1),
    project(origin, x0, y, z1),
  ]);
}
