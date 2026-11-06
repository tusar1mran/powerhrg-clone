"use client";

import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
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
  // A fixed mount point. Without it, labels that mount before R3F's event layer connects are
  // moved to a new container once it does, and drei leaves them empty.
  const container = useThree((state) => state.gl.domElement.parentElement);
  const portal = useMemo(() => (container ? { current: container } : undefined), [container]);

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
    <Html position={position} center zIndexRange={[20, 0]} pointerEvents="none" portal={portal}>
      <span
        ref={labelRef}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-charcoal-950/75 px-2.5 py-1 text-[11px] font-semibold tracking-wide sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[12px] whitespace-nowrap text-white shadow-lg backdrop-blur-md select-none"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <span aria-hidden className="size-1.5 rounded-full bg-gold" />
        {text}
      </span>
    </Html>
  );
}
