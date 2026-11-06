// The walk-around timeline: which chapters exist, where the camera stands for each one, and how
// the scroll position turns into scene effects (roof layers separating, door opening, ...).
// Pure functions and plain data only. Nothing here imports three.js, so the HTML side of the
// page can use it without pulling the 3D bundle in.
import { serviceLinks, type ServiceName } from "@/lib/links";
import { serviceSlugByName } from "@/lib/quote/quote-params";

export type Vec3 = readonly [number, number, number];

/** Where the camera stands and what it looks at. Units are metres; the house front faces +z. */
export type CameraPose = { position: Vec3; target: Vec3 };

export type Chapter = {
  /** 0 is the intro (hero); 1..n are the services in navigation order. */
  index: number;
  service: ServiceName | null;
  pose: CameraPose;
};

const introPose: CameraPose = { position: [-15.5, 6.2, 19.5], target: [0.4, 3.9, 0] };

const servicePoses: Record<ServiceName, CameraPose> = {
  // Front, slightly to the right, at second-floor height so both rows of windows read.
  Windows: { position: [7.5, 5.2, 14.5], target: [-0.6, 3.6, 2.5] },
  // High three-quarter view so the separated layers stack up above the roof.
  Roofing: { position: [15.5, 15.5, 15.5], target: [0, 7.6, 0] },
  // Square on to the right-hand wall, which is the one that peels apart.
  Siding: { position: [19, 5.4, 7.5], target: [4.8, 3.6, 0] },
  // Low and close on the entry door.
  Doors: { position: [3.4, 2.4, 11.5], target: [0, 1.9, 3.6] },
  // Above and in front, looking down into the attic once the roof lifts away.
  Insulation: { position: [1.5, 17.5, 12.5], target: [0, 6.2, -0.2] },
  // Front-left corner, where the gutters, downspout, trim and shutters meet.
  Accessories: { position: [-13, 5.6, 11.5], target: [-3.2, 4.2, 2.6] },
};

export const chapters: readonly Chapter[] = [
  { index: 0, service: null, pose: introPose },
  ...serviceLinks.map((service, i) => ({
    index: i + 1,
    service: service.name,
    pose: servicePoses[service.name],
  })),
];

/** Number of service chapters (the intro is not counted). */
export const SERVICE_CHAPTER_COUNT = serviceLinks.length;

const chapterIndexByService = new Map<ServiceName, number>(
  chapters.flatMap((chapter) => (chapter.service ? [[chapter.service, chapter.index] as const] : [])),
);

export function chapterIndexOf(service: ServiceName): number {
  return chapterIndexByService.get(service) ?? 0;
}

/** DOM id of a chapter section, used for in-page links (#chapter-roofing). */
export function chapterDomId(service: ServiceName): string {
  return `chapter-${serviceSlugByName[service]}`;
}

export const INTRO_DOM_ID = "walkaround-intro";

/* -------------------------------------------------------------------------------------------- */
/* Timeline                                                                                     */
/* -------------------------------------------------------------------------------------------- */

/**
 * The whole tour is one number, the "timeline", so it can be smoothed with a single damped value.
 * Each service chapter k (1..n) owns two units:
 *   [2k - 1, 2k)  arriving: the chapter section scrolls up into view and the camera moves to it
 *   [2k, 2k + 1]  dwelling: the panel is pinned and the signature effect plays
 * The intro sits at 0.
 */
export const TIMELINE_MAX = SERVICE_CHAPTER_COUNT * 2 + 1;

export type SectionBox = { top: number; height: number };

/** Turns the page scroll position into a timeline value. `sections` are the service chapters, in order. */
export function computeTimeline(sections: readonly SectionBox[], scrollY: number, viewportHeight: number): number {
  if (viewportHeight <= 0) {
    return 0;
  }

  for (let i = sections.length - 1; i >= 0; i -= 1) {
    const k = i + 1;
    const top = sections[i].top - scrollY;

    if (top <= 0) {
      const dwellRange = sections[i].height - viewportHeight;
      const dwell = dwellRange > 0 ? clamp01(-top / dwellRange) : 1;
      return 2 * k + dwell;
    }

    if (top < viewportHeight) {
      return 2 * k - 1 + (1 - top / viewportHeight);
    }
  }

  return 0;
}

export type TimelineState = {
  /** Camera position along the chapters: 0 = intro, k = service chapter k. Fractional while moving. */
  progress: number;
  /** 0..1 through the pinned part of the current chapter. */
  dwell: number;
};

/**
 * With reduced motion the camera does not travel between chapters: it cuts to the nearest one, and
 * that chapter's effect is shown in its finished state.
 */
export function timelineToState(timeline: number, reducedMotion: boolean): TimelineState {
  const t = Math.min(Math.max(timeline, 0), TIMELINE_MAX);

  if (t < 1) {
    return { progress: 0, dwell: 0 };
  }

  const k = Math.floor((t + 1) / 2);
  if (k > SERVICE_CHAPTER_COUNT) {
    return { progress: SERVICE_CHAPTER_COUNT, dwell: 1 };
  }
  const arriving = t < 2 * k;

  if (reducedMotion) {
    const nearest = arriving ? (t - (2 * k - 1) >= 0.5 ? k : k - 1) : k;
    return { progress: nearest, dwell: nearest === 0 ? 0 : 1 };
  }

  if (arriving) {
    return { progress: k - 1 + (t - (2 * k - 1)), dwell: 1 };
  }

  return { progress: k, dwell: clamp01(t - 2 * k) };
}

/** Index of the chapter the visitor is looking at, for the HTML side (rail, poster highlight). */
export function activeChapterIndex(timeline: number): number {
  const { progress } = timelineToState(timeline, false);
  return Math.min(Math.round(progress), SERVICE_CHAPTER_COUNT);
}

/* -------------------------------------------------------------------------------------------- */
/* Scene effects                                                                                */
/* -------------------------------------------------------------------------------------------- */

export type SceneEffects = {
  /** How much each service is in focus, 0..1. Others are dimmed while one is in focus. */
  focus: Record<ServiceName, number>;
  /** The largest focus value, i.e. how strongly everything else should be dimmed. */
  focusStrength: number;
  roofExplode: number;
  wallPeel: number;
  /** Roof lifting away so the attic can be seen. */
  atticReveal: number;
  insulationFill: number;
  doorOpen: number;
};

export function createSceneEffects(): SceneEffects {
  return {
    focus: {
      Windows: 0,
      Roofing: 0,
      Siding: 0,
      Doors: 0,
      Insulation: 0,
      Accessories: 0,
    },
    focusStrength: 0,
    roofExplode: 0,
    wallPeel: 0,
    atticReveal: 0,
    insulationFill: 0,
    doorOpen: 0,
  };
}

/** Writes the effects for a timeline state into `out` (reused every frame to avoid allocations). */
export function computeSceneEffects(state: TimelineState, out: SceneEffects): SceneEffects {
  let strongest = 0;

  for (const chapter of chapters) {
    if (!chapter.service) {
      continue;
    }
    const presence = smoothstep(0, 1, clamp01(1 - Math.abs(state.progress - chapter.index)));
    out.focus[chapter.service] = presence;
    strongest = Math.max(strongest, presence);
  }
  out.focusStrength = strongest;

  out.roofExplode = momentFor("Roofing", state);
  out.wallPeel = momentFor("Siding", state);
  out.doorOpen = momentFor("Doors", state);
  out.insulationFill = momentFor("Insulation", state, 0.15, 0.85);
  out.atticReveal = out.focus.Insulation;

  return out;
}

/**
 * A chapter's signature effect builds up while its panel is pinned (dwell) and fades back out as
 * the camera leaves for the next chapter, so scrolling backwards replays it in reverse.
 */
function momentFor(service: ServiceName, state: TimelineState, start = 0.05, end = 0.55): number {
  const k = chapterIndexOf(service);
  if (state.progress < k || state.progress >= k + 1) {
    return 0;
  }
  const build = smoothstep(start, end, state.dwell);
  const leave = 1 - smoothstep(0, 0.6, state.progress - k);
  return build * leave;
}

/* -------------------------------------------------------------------------------------------- */
/* Camera                                                                                       */
/* -------------------------------------------------------------------------------------------- */

type MutableVec3 = [number, number, number];

/** Interpolated camera pose for a (fractional) chapter progress. Writes into the given tuples. */
export function samplePose(progress: number, position: MutableVec3, target: MutableVec3): void {
  const last = chapters.length - 1;
  const clamped = Math.min(Math.max(progress, 0), last);
  const from = Math.floor(clamped);
  const to = Math.min(from + 1, last);
  const t = smoothstep(0, 1, clamped - from);

  const a = chapters[from].pose;
  const b = chapters[to].pose;

  for (let i = 0; i < 3; i += 1) {
    position[i] = lerp(a.position[i], b.position[i], t);
    target[i] = lerp(a.target[i], b.target[i], t);
  }

  // Lift the camera a little in the middle of a move, so it arcs over the house instead of
  // cutting through a corner of it.
  const arc = Math.sin(Math.PI * t) * 2.2;
  position[1] += arc;
}

/* -------------------------------------------------------------------------------------------- */
/* Helpers                                                                                      */
/* -------------------------------------------------------------------------------------------- */

export function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
