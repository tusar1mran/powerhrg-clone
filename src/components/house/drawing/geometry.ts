// Coordinates for the front-elevation house drawing, in SVG user units. Everything the drawing
// needs (outlines, repeated detail paths, hit areas, legend markers) is computed once here, so the
// React components only map data to elements.
import type { ServiceName } from "@/lib/links";

/** Cropped tightly around the house so the drawing is as large as possible on a phone. */
export const HOUSE_VIEWBOX = { x: 40, y: 70, width: 820, height: 730 } as const;
export const houseViewBox = `${HOUSE_VIEWBOX.x} ${HOUSE_VIEWBOX.y} ${HOUSE_VIEWBOX.width} ${HOUSE_VIEWBOX.height}`;

export type Rect = { x: number; y: number; width: number; height: number };
export type HitShape = { kind: "rect"; rect: Rect } | { kind: "polygon"; points: string };

const round = (n: number): number => Math.round(n * 10) / 10;

// Hip roof seen from the front: a trapezoid from the eaves up to the ridge.
export const roof = {
  eaveY: 340,
  ridgeY: 150,
  eaveLeft: 100,
  eaveRight: 800,
  ridgeLeft: 280,
  ridgeRight: 620,
} as const;

const roofRun = (roof.ridgeLeft - roof.eaveLeft) / (roof.eaveY - roof.ridgeY);
const roofLeftAt = (y: number): number => roof.ridgeLeft - (y - roof.ridgeY) * roofRun;
const roofRightAt = (y: number): number => roof.ridgeRight + (y - roof.ridgeY) * roofRun;

export const roofOutline = [
  `${roof.eaveLeft},${roof.eaveY}`,
  `${roof.ridgeLeft},${roof.ridgeY}`,
  `${roof.ridgeRight},${roof.ridgeY}`,
  `${roof.eaveRight},${roof.eaveY}`,
].join(" ");

const COURSE = 14;

function buildShingleCourses(): string {
  const segments: string[] = [];
  for (let y = roof.ridgeY + COURSE; y < roof.eaveY; y += COURSE) {
    segments.push(`M${round(roofLeftAt(y))} ${y}H${round(roofRightAt(y))}`);
  }
  return segments.join("");
}

// Short vertical joints between shingle tabs, staggered every other course.
function buildShingleTabs(): string {
  const segments: string[] = [];
  let row = 0;
  for (let y = roof.ridgeY; y + COURSE <= roof.eaveY; y += COURSE) {
    const bottom = y + COURSE;
    const left = roofLeftAt(bottom) + 6;
    const right = roofRightAt(bottom) - 6;
    const offset = row % 2 === 0 ? 0 : 15;
    for (let x = roof.ridgeLeft - 180 + offset; x < right; x += 30) {
      if (x > left) {
        segments.push(`M${round(x)} ${y + 3}V${bottom}`);
      }
    }
    row += 1;
  }
  return segments.join("");
}

export const shingleCourses = buildShingleCourses();
export const shingleTabs = buildShingleTabs();

export const chimney = { x: 640, y: 100, width: 48, height: 140 } as const;
export const chimneyCap: Rect = { x: 632, y: 90, width: 64, height: 11 };

function buildChimneyBricks(): string {
  const segments: string[] = [];
  let row = 0;
  for (let y = chimney.y + 12; y < chimney.y + chimney.height; y += 12) {
    segments.push(`M${chimney.x} ${y}H${chimney.x + chimney.width}`);
    const start = chimney.x + (row % 2 === 0 ? 12 : 24);
    for (let x = start; x < chimney.x + chimney.width; x += 24) {
      segments.push(`M${x} ${y}v12`);
    }
    row += 1;
  }
  return segments.join("");
}

export const chimneyBricks = buildChimneyBricks();

/** Height of the right-hand roof slope at a given x. */
const rightSlopeY = (x: number): number => roof.ridgeY + (x - roof.ridgeRight) / roofRun;

/** Step flashing where the chimney meets the right-hand roof slope. */
const flashLeft = chimney.x - 5;
const flashRight = chimney.x + chimney.width + 5;
export const chimneyFlashing = [
  `M${flashLeft} ${round(rightSlopeY(flashLeft) - 6)}`,
  `L${flashRight} ${round(rightSlopeY(flashRight) - 6)}`,
  `L${flashRight} ${round(rightSlopeY(flashRight))}`,
  `L${flashLeft} ${round(rightSlopeY(flashLeft))}Z`,
].join("");

export const ridgeVent: Rect = { x: 292, y: 141, width: 316, height: 9 };
export const ridgeVentTicks = Array.from({ length: 15 }, (_, i) => `M${312 + i * 20} 142v7`).join("");

// Front cross gable: rake boards (part of the roof) around the attic face (insulation).
export const gableRake = "M316 348L450 180L584 348ZM340 340L450 200L560 340Z";
export const atticFace = "340,340 450,200 560,340";
export const atticSection = "M354 331L450 210L546 331Z";

function buildBumps(x0: number, x1: number, baseY: number, width: number, height: number): string {
  const count = Math.floor((x1 - x0) / width);
  const start = x0 + ((x1 - x0) - count * width) / 2;
  let d = `M${round(start)} ${baseY}`;
  for (let i = 0; i < count; i += 1) {
    d += `q${width / 2} ${-height} ${width} 0`;
  }
  return d;
}

export const atticJoist = "M352 326H548";
export const atticInsulation = [buildBumps(362, 538, 326, 16, 13), buildBumps(374, 526, 315, 16, 11)].join("");
export const atticVent = { cx: 450, cy: 250, r: 14 } as const;
export const atticVentLouvers = "M439 244H461M437 250H463M439 256H461";

// Walls and lap siding.
export const wall: Rect = { x: 150, y: 340, width: 600, height: 396 };
export const cornerBoards: Rect[] = [
  { x: 150, y: 354, width: 14, height: 382 },
  { x: 736, y: 354, width: 14, height: 382 },
];
export const beltBoard: Rect = { x: 150, y: 556, width: 600, height: 12 };

function buildLapLines(): string {
  const segments: string[] = [];
  for (let y = 368; y < wall.y + wall.height; y += 14) {
    if (y >= beltBoard.y - 2 && y <= beltBoard.y + beltBoard.height + 2) {
      continue;
    }
    segments.push(`M${wall.x + 14} ${y}H${wall.x + wall.width - 14}`);
  }
  return segments.join("");
}

export const lapLines = buildLapLines();

export const foundation: Rect = { x: 142, y: 736, width: 616, height: 24 };
export const foundationJoints = [
  "M142 748H758",
  ...Array.from({ length: 12 }, (_, i) => `M${180 + i * 50} 736v12`),
  ...Array.from({ length: 12 }, (_, i) => `M${155 + i * 50} 748v12`),
].join("");

// Windows: three upstairs, two downstairs, all double-hung.
export const windows: Rect[] = [
  { x: 205, y: 386, width: 100, height: 140 },
  { x: 400, y: 386, width: 100, height: 140 },
  { x: 595, y: 386, width: 100, height: 140 },
  { x: 205, y: 594, width: 100, height: 120 },
  { x: 595, y: 594, width: 100, height: 120 },
];

/** Outer windows get a pair of shutters (an accessory). */
export const shutters: Rect[] = [windows[0], windows[2], windows[3], windows[4]].flatMap((w) => [
  { x: w.x - 28, y: w.y - 4, width: 22, height: w.height + 8 },
  { x: w.x + w.width + 6, y: w.y - 4, width: 22, height: w.height + 8 },
]);

export function shutterLouvers(s: Rect): string {
  const segments: string[] = [];
  for (let y = s.y + 10; y < s.y + s.height - 6; y += 9) {
    segments.push(`M${s.x + 5} ${y}H${s.x + s.width - 5}`);
  }
  return segments.join("");
}

// Front door with a small pediment and two steps.
export const door = {
  casing: { x: 394, y: 582, width: 112, height: 154 } satisfies Rect,
  slab: { x: 406, y: 592, width: 88, height: 144 } satisfies Rect,
  panels: [
    { x: 415, y: 602, width: 30, height: 40 },
    { x: 455, y: 602, width: 30, height: 40 },
    { x: 415, y: 654, width: 30, height: 70 },
    { x: 455, y: 654, width: 30, height: 70 },
  ] satisfies Rect[],
  knob: { cx: 482, cy: 690, r: 4 },
  pediment: "384,580 450,546 516,580",
  pedimentBase: { x: 382, y: 578, width: 136, height: 7 } satisfies Rect,
  steps: [
    { x: 384, y: 736, width: 132, height: 11 },
    { x: 372, y: 747, width: 156, height: 13 },
  ] satisfies Rect[],
} as const;

// Gutters and downspouts (accessories).
export const gutter: Rect = { x: 94, y: 340, width: 712, height: 14 };
export const gutterHangers = Array.from({ length: 10 }, (_, i) => `M${130 + i * 72} 341v5`).join("");
export const downspouts = [
  {
    pipe: { x: 116, y: 354, width: 12, height: 370 } satisfies Rect,
    elbow: "116,724 128,724 120,750 100,750 100,740 110,740",
    brackets: [440, 640].map((y) => ({ x: 112, y, width: 20, height: 5 })),
  },
  {
    pipe: { x: 772, y: 354, width: 12, height: 370 } satisfies Rect,
    elbow: "772,724 784,724 790,740 800,740 800,750 780,750",
    brackets: [440, 640].map((y) => ({ x: 768, y, width: 20, height: 5 })),
  },
] as const;

// Ground, path and two small shrubs beside the steps (decoration only).
export const groundLine = "M50 760H850";
export const groundTicks = [64, 78, 92, 806, 820, 834].map((x) => `M${x} 760l4 -7`).join("");
export const walkway = "M372 760L330 800M528 760L570 800";
export const shrubs = [
  "M336 760c-8-2-10-14-2-18c-2-10 10-16 16-10c6-8 20-4 18 6c8 2 8 16 0 22Z",
  "M532 760c-8-2-10-14-2-18c-2-10 10-16 16-10c6-8 20-4 18 6c8 2 8 16 0 22Z",
];

/**
 * Invisible hit areas. Each is at least 96 units across, which is just under 46 CSS px when the
 * drawing runs edge to edge on a 390 px phone (44 px is the minimum). Later parts in paint order
 * win where areas overlap (e.g. the gutter band over the bottom of the roof).
 */
export const hitAreas: Record<ServiceName, HitShape[]> = {
  Roofing: [
    { kind: "polygon", points: roofOutline },
    { kind: "rect", rect: { x: chimney.x - 24, y: chimneyCap.y, width: 96, height: 120 } },
  ],
  Insulation: [{ kind: "polygon", points: "330,344 450,190 570,344" }],
  Siding: [{ kind: "rect", rect: wall }],
  Windows: windows.map((w) => ({
    kind: "rect" as const,
    rect: { x: w.x - 8, y: w.y - 16, width: w.width + 16, height: w.height + 32 },
  })),
  Doors: [{ kind: "rect", rect: { x: 380, y: 544, width: 140, height: 216 } }],
  Accessories: [
    { kind: "rect", rect: { x: 74, y: 298, width: 752, height: 96 } },
    { kind: "rect", rect: { x: 74, y: 394, width: 96, height: 366 } },
    { kind: "rect", rect: { x: 730, y: 394, width: 96, height: 366 } },
    ...shutters.map((s) => ({ kind: "rect" as const, rect: s })),
  ],
};

/** Numbered legend markers, placed on a clear spot inside each part. */
export const markers: Record<ServiceName, { x: number; y: number }> = {
  Roofing: { x: 232, y: 252 },
  Insulation: { x: 450, y: 290 },
  Siding: { x: 364, y: 466 },
  Windows: { x: 450, y: 420 },
  Doors: { x: 450, y: 622 },
  Accessories: { x: 122, y: 540 },
};

export const MARKER_RADIUS = 18;
