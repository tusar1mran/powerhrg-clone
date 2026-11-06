"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import { NeutralToneMapping } from "three";
import { chapters } from "../chapters";
import { useWalkaroundActions, useWalkaroundState } from "../WalkaroundProvider";
import { CameraRig } from "./CameraRig";
import { HouseModel } from "./HouseModel";
import { Lighting } from "./Lighting";
import { SceneDirector, SceneFrameProvider } from "./SceneFrame";

type Props = {
  /** False while the stage is off screen or the tab is hidden: nothing is rendered at all. */
  active: boolean;
};

/** Tells the page the first frame is on screen, so the canvas can fade in over the backdrop. */
function ReadySignal() {
  const { setSceneStatus } = useWalkaroundActions();
  const signalled = useRef(false);

  useFrame(() => {
    if (!signalled.current) {
      signalled.current = true;
      setSceneStatus("ready");
    }
  });

  return null;
}

/** Pointer cursor while a clickable part of the house is under the mouse. */
function CursorSync() {
  const { hovered } = useWalkaroundState();
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    canvas.style.cursor = hovered ? "pointer" : "";
  }, [canvas, hovered]);

  return null;
}

/** Falls back to the static drawing if the GPU drops the WebGL context. */
function ContextLossWatcher() {
  const { setSceneStatus } = useWalkaroundActions();
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    const onLost = (event: Event) => {
      event.preventDefault();
      setSceneStatus("failed");
    };
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [canvas, setSceneStatus]);

  return null;
}

/** Draws a frame as soon as rendering resumes, e.g. when the stage scrolls back into view. */
function ResumeKick({ active }: Props) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (active) {
      invalidate();
    }
  }, [active, invalidate]);

  return null;
}

function configureRenderer({ gl }: RootState) {
  gl.toneMapping = NeutralToneMapping;
  gl.toneMappingExposure = 1.05;
}

const intro = chapters[0].pose;

/**
 * The walk-around canvas. Loaded on the client only (next/dynamic with ssr: false), so three.js
 * stays out of the server bundle and out of every page that doesn't show the house. Renders on
 * demand: a frame is drawn only when the scroll position, a setting or an animation changes.
 */
export default function WalkaroundCanvas({ active }: Props) {
  return (
    <Canvas
      frameloop={active ? "demand" : "never"}
      dpr={[1, 2]}
      shadows="percentage"
      camera={{ fov: 32, near: 0.5, far: 260, position: [...intro.position] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={configureRenderer}
      // Let vertical swipes over the house scroll the page on touch screens.
      style={{ touchAction: "pan-y" }}
    >
      <SceneFrameProvider>
        <SceneDirector />
        <CameraRig />
        <Lighting />
        <HouseModel />
        <ReadySignal />
        <CursorSync />
        <ContextLossWatcher />
        <ResumeKick active={active} />
      </SceneFrameProvider>
    </Canvas>
  );
}
