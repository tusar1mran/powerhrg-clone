"use client";

import { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Vec3Tuple } from "@/features/three/geometry";
import { useSceneFrame, type SceneFrameState } from "./SceneFrame";

type Props = {
  text: string;
  position: Vec3Tuple;
  /** How visible the label is in the current frame, 0..1. */
  strength: (frame: SceneFrameState) => number;
};

/**
 * A text label pinned to a point on the model. Labels repeat information that is also listed in
 * the HTML chapter panel, so they are hidden from assistive technology with the rest of the
 * canvas. Opacity is written straight to the DOM each frame instead of through React state.
 */
export function SceneLabel({ text, position, strength }: Props) {
  const frameRef = useSceneFrame();
  const labelRef = useRef<HTMLSpanElement>(null);
  const lastOpacity = useRef(-1);

  useFrame(() => {
    const element = labelRef.current;
    if (!element) {
      return;
    }
    const opacity = Math.round(Math.min(Math.max((strength(frameRef.current) - 0.25) / 0.5, 0), 1) * 100) / 100;
    if (opacity === lastOpacity.current) {
      return;
    }
    lastOpacity.current = opacity;
    element.style.opacity = String(opacity);
    element.style.visibility = opacity > 0 ? "visible" : "hidden";
    element.style.transform = `translate3d(0, ${(1 - opacity) * 6}px, 0)`;
  });

  return (
    <Html position={position} center zIndexRange={[20, 0]} pointerEvents="none">
      <span
        ref={labelRef}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-charcoal-950/75 px-3 py-1.5 text-[12px] font-semibold tracking-wide whitespace-nowrap text-white shadow-lg backdrop-blur-md select-none"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <span aria-hidden className="size-1.5 rounded-full bg-gold" />
        {text}
      </span>
    </Html>
  );
}
