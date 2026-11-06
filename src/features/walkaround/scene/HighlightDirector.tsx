"use client";

import { useFrame } from "@react-three/fiber";
import { Color } from "three";
import { lerp } from "../chapters";
import type { RegisteredMaterial } from "./materials";
import { useSceneFrame } from "./SceneFrame";

const gold = new Color("#f0ad3c");
const emissive = new Color();

/**
 * Applies focus, selection and hover to every material once per frame. The part of the house in
 * focus keeps its colours with a faint warm lift; everything else fades towards a muted grey.
 * Parts in the quote selection get a stronger gold glow, and the part under the pointer a lighter one.
 */
export function HighlightDirector({ registry }: { registry: readonly RegisteredMaterial[] }) {
  const frameRef = useSceneFrame();

  useFrame(() => {
    const frame = frameRef.current;
    const { effects, dusk } = frame;

    for (const entry of registry) {
      const group = entry.group;
      const neutral = group === "neutral";
      const focus = group === "neutral" ? 0 : effects.focus[group];
      const dim = effects.focusStrength * (1 - focus) * (neutral ? 0.75 : 1);

      entry.material.color.copy(entry.base).lerp(entry.dimmed, dim * 0.82);

      emissive.setRGB(0, 0, 0);
      if (entry.glow) {
        emissive.copy(entry.glow.color).multiplyScalar(lerp(entry.glow.day, entry.glow.dusk, dusk) * (1 - dim * 0.6));
      }
      if (group !== "neutral") {
        // A faint warm lift on the part in focus, a stronger one for the quote selection, and a
        // light one under the pointer.
        const glow = focus * 0.06 + frame.selection[group] * 0.2 + frame.hover[group] * 0.12;
        emissive.r += gold.r * glow;
        emissive.g += gold.g * glow;
        emissive.b += gold.b * glow;
      }
      entry.material.emissive.copy(emissive);
    }
  });

  return null;
}
