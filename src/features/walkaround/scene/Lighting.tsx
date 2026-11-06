"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, PMREMGenerator, type DirectionalLight, type HemisphereLight } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { lerp } from "../chapters";
import { useSceneFrame } from "./SceneFrame";

/** Day and dusk values for each light. The frame's `dusk` value (0..1) blends between them. */
const lighting = {
  sun: { day: new Color("#fff3e0"), dusk: new Color("#ff9a5a"), dayIntensity: 2.7, duskIntensity: 0.55 },
  sky: { day: new Color("#e4ecef"), dusk: new Color("#6d7fa6"), dayIntensity: 1.25, duskIntensity: 0.45 },
  ground: { day: new Color("#6b6550"), dusk: new Color("#2a2a33") },
  fill: { dayIntensity: 0.55, duskIntensity: 0.2 },
  environment: { day: 0.5, dusk: 0.12 },
} as const;

const SHADOW_EXTENT = 15;

/**
 * Soft daylight: a warm, low sun from the front left that casts the only shadows, a sky/ground
 * hemisphere for the ambient light, and a cool fill from behind. Reflections (glass, gutters,
 * door hardware) come from three.js's procedural room environment, so no HDR file is downloaded.
 */
export function Lighting() {
  const frameRef = useSceneFrame();
  const get = useThree((state) => state.get);
  const sunRef = useRef<DirectionalLight>(null);
  const fillRef = useRef<DirectionalLight>(null);
  const skyRef = useRef<HemisphereLight>(null);
  const lastDusk = useRef(-1);

  useEffect(() => {
    const { gl, scene } = get();
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = generator.fromScene(room, 0.04);
    scene.environment = target.texture;
    room.dispose();
    generator.dispose();

    return () => {
      scene.environment = null;
      target.dispose();
    };
  }, [get]);

  useFrame((state) => {
    const dusk = frameRef.current.dusk;
    if (dusk === lastDusk.current) {
      return;
    }
    lastDusk.current = dusk;

    const sun = sunRef.current;
    const sky = skyRef.current;
    const fill = fillRef.current;
    if (sun) {
      sun.color.lerpColors(lighting.sun.day, lighting.sun.dusk, dusk);
      sun.intensity = lerp(lighting.sun.dayIntensity, lighting.sun.duskIntensity, dusk);
    }
    if (sky) {
      sky.color.lerpColors(lighting.sky.day, lighting.sky.dusk, dusk);
      sky.groundColor.lerpColors(lighting.ground.day, lighting.ground.dusk, dusk);
      sky.intensity = lerp(lighting.sky.dayIntensity, lighting.sky.duskIntensity, dusk);
    }
    if (fill) {
      fill.intensity = lerp(lighting.fill.dayIntensity, lighting.fill.duskIntensity, dusk);
    }
    state.scene.environmentIntensity = lerp(lighting.environment.day, lighting.environment.dusk, dusk);
  });

  return (
    <>
      <hemisphereLight ref={skyRef} args={[lighting.sky.day, lighting.ground.day, lighting.sky.dayIntensity]} />
      <directionalLight
        ref={sunRef}
        position={[-13, 19, 15]}
        color={lighting.sun.day}
        intensity={lighting.sun.dayIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0003}
        shadow-normalBias={0.025}
        shadow-radius={3}
        shadow-camera-left={-SHADOW_EXTENT}
        shadow-camera-right={SHADOW_EXTENT}
        shadow-camera-top={SHADOW_EXTENT}
        shadow-camera-bottom={-SHADOW_EXTENT}
        shadow-camera-near={1}
        shadow-camera-far={70}
      />
      <directionalLight ref={fillRef} position={[14, 9, -12]} color="#d4e0ff" intensity={lighting.fill.dayIntensity} />
    </>
  );
}
