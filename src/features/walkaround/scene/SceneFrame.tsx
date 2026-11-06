"use client";

import { createContext, use, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import { serviceLinks, type ServiceName } from "@/lib/links";
import {
  computeSceneEffects,
  createSceneEffects,
  smoothstep,
  timelineToState,
  type SceneEffects,
  type TimelineState,
} from "../chapters";
import { useWalkaroundMeta, useWalkaroundState } from "../WalkaroundProvider";

/**
 * Per-frame values shared by everything in the scene. It is a mutable object read inside
 * `useFrame`, not React state, so 60 updates a second never re-render a component.
 */
export type SceneFrameState = {
  /** Smoothed copy of the scroll timeline. */
  timeline: number;
  state: TimelineState;
  effects: SceneEffects;
  /** 0 = day, 1 = dusk. */
  dusk: number;
  /** 0..1 per service, eased towards whether it is in the quote selection. */
  selection: Record<ServiceName, number>;
  /** 0..1 per service, eased towards whether the pointer is over it. */
  hover: Record<ServiceName, number>;
  /** 0..1 strength of the gentle idle camera drift on the intro view. */
  idle: number;
};

const SceneFrameContext = createContext<RefObject<SceneFrameState> | null>(null);

function serviceRecord(): Record<ServiceName, number> {
  return Object.fromEntries(serviceLinks.map((service) => [service.name, 0])) as Record<ServiceName, number>;
}

function createFrameState(timeline: number, reducedMotion: boolean): SceneFrameState {
  const state = timelineToState(timeline, reducedMotion);
  return {
    timeline,
    state,
    effects: computeSceneEffects(state, createSceneEffects()),
    dusk: 0,
    selection: serviceRecord(),
    hover: serviceRecord(),
    idle: 0,
  };
}

export function SceneFrameProvider({ children }: { children: ReactNode }) {
  const { timeline, reducedMotion } = useWalkaroundMeta();
  // Start from the current scroll position, so loading mid-page doesn't sweep the camera.
  const [initial] = useState(() => createFrameState(timeline.get(), reducedMotion));
  const frame = useRef(initial);
  return <SceneFrameContext value={frame}>{children}</SceneFrameContext>;
}

/** The shared frame values. Read `.current` inside `useFrame`. */
export function useSceneFrame(): RefObject<SceneFrameState> {
  const frame = use(SceneFrameContext);
  if (!frame) {
    throw new Error("useSceneFrame must be used inside <SceneFrameProvider>");
  }
  return frame;
}

/** Largest step used for easing, so a long pause between on-demand frames doesn't cause a jump. */
const MAX_DELTA = 1 / 30;
const SETTLED = 0.0005;

/**
 * Runs first in every frame (negative priority): eases the shared values towards their targets,
 * derives the scene effects, and asks for another frame only while something is still moving.
 * With `frameloop="demand"` the scene therefore renders nothing while the page is still.
 */
export function SceneDirector() {
  const frameRef = useSceneFrame();
  const { timeline, reducedMotion } = useWalkaroundMeta();
  const { selected, hovered, timeOfDay } = useWalkaroundState();
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => timeline.subscribe(() => invalidate()), [timeline, invalidate]);

  useEffect(() => {
    invalidate();
  }, [selected, hovered, timeOfDay, reducedMotion, invalidate]);

  useFrame((_, rawDelta) => {
    const frame = frameRef.current;
    const delta = Math.min(rawDelta, MAX_DELTA);
    let moving = false;

    const ease = (current: number, target: number, lambda: number): number => {
      if (reducedMotion || Math.abs(current - target) < SETTLED) {
        return target;
      }
      moving = true;
      return MathUtils.damp(current, target, lambda, delta);
    };

    frame.timeline = ease(frame.timeline, timeline.get(), 4.2);
    frame.dusk = ease(frame.dusk, timeOfDay === "dusk" ? 1 : 0, 2.4);

    for (const service of serviceLinks) {
      const name = service.name;
      frame.selection[name] = ease(frame.selection[name], selected.includes(name) ? 1 : 0, 9);
      frame.hover[name] = ease(frame.hover[name], hovered === name ? 1 : 0, 12);
    }

    frame.state = timelineToState(frame.timeline, reducedMotion);
    computeSceneEffects(frame.state, frame.effects);
    frame.idle = reducedMotion ? 0 : 1 - smoothstep(0, 0.7, frame.timeline);

    if (moving || frame.idle > 0.001) {
      invalidate();
    }
  }, -1);

  return null;
}
