"use client";

import { useFrame } from "@react-three/fiber";
import type { PerspectiveCamera } from "three";
import { clamp01, lerp, samplePose } from "../chapters";
import { useSceneFrame } from "./SceneFrame";

type MutableVec3 = [number, number, number];

/**
 * Where the house sits on screen, as a fraction of the viewport, so it never hides behind the
 * HTML. Wide screens keep the text on the left and the house to the right. Narrow screens put the
 * hero text above the house, and the chapter panels below it.
 */
const screenAnchor = {
  wide: { intro: { x: 0.17, y: 0.02 }, chapter: { x: 0.19, y: 0 } },
  narrow: { intro: { x: 0, y: -0.15 }, chapter: { x: 0, y: 0.2 } },
} as const;

const NARROW_BREAKPOINT = 1024;
/** Below this aspect ratio the camera backs off so the whole house still fits across the screen. */
const FIT_ASPECT = 1.3;

const position: MutableVec3 = [0, 0, 0];
const target: MutableVec3 = [0, 0, 0];

/**
 * Moves the camera along the chapter poses, adds a slow idle drift on the hero view, and frames the
 * house for the viewport. Runs after the director (priority 0) so it reads this frame's values.
 */
export function CameraRig() {
  const frameRef = useSceneFrame();

  useFrame((state) => {
    const frame = frameRef.current;
    const camera = state.camera as PerspectiveCamera;
    const { width, height } = state.size;
    const progress = frame.state.progress;

    samplePose(progress, position, target);

    // Idle drift: a slow sway around the house, fading out as the tour starts.
    if (frame.idle > 0) {
      const time = state.clock.elapsedTime;
      const angle = Math.sin(time * 0.16) * 0.07 * frame.idle;
      const dx = position[0] - target[0];
      const dz = position[2] - target[2];
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      position[0] = target[0] + dx * cos - dz * sin;
      position[2] = target[2] + dx * sin + dz * cos;
      position[1] += Math.sin(time * 0.23) * 0.25 * frame.idle;
    }

    // Portrait screens: step back along the view direction so the house still fits. Narrow
    // screens step back a little more in the chapters, where the panel takes the lower half.
    const aspect = width / Math.max(height, 1);
    const narrow = width < NARROW_BREAKPOINT;
    const toChapter = clamp01(progress);
    const portraitFit = aspect < FIT_ASPECT ? Math.pow(FIT_ASPECT / aspect, 0.8) : 1;
    const fit = portraitFit * (narrow ? lerp(1, 1.18, toChapter) : 1);
    camera.position.set(
      target[0] + (position[0] - target[0]) * fit,
      target[1] + (position[1] - target[1]) * fit,
      target[2] + (position[2] - target[2]) * fit,
    );
    camera.lookAt(target[0], target[1], target[2]);

    // Shift the image (not the camera) so the house sits beside or above the HTML panels.
    const layout = narrow ? screenAnchor.narrow : screenAnchor.wide;
    const anchorX = lerp(layout.intro.x, layout.chapter.x, toChapter);
    const anchorY = lerp(layout.intro.y, layout.chapter.y, toChapter);
    camera.setViewOffset(width, height, -anchorX * width, anchorY * height, width, height);
  });

  return null;
}
