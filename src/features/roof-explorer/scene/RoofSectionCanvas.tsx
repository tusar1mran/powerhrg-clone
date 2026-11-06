"use client";

import { useEffect, useRef, type ComponentRef, type RefObject } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import { CircleGeometry, NeutralToneMapping, PMREMGenerator, Vector3 } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { Vec3Tuple } from "@/features/three/geometry";
import { useDisposable } from "@/features/three/use-disposable";
import { useRoofExplorerActions, useRoofExplorerMeta, useRoofExplorerState, type RoofViewId } from "../RoofExplorerProvider";
import { RoofSectionModel } from "./RoofSectionModel";

type Controls = ComponentRef<typeof OrbitControls>;

/** Camera presets for the view buttons. The target stays near the middle of the separated layers. */
const views: Record<RoofViewId, { position: Vec3Tuple; target: Vec3Tuple }> = {
  eave: { position: [5.9, 3.3, 7.2], target: [0, 2.3, 0.4] },
  ridge: { position: [-4.6, 6.6, 4.4], target: [0, 2.9, 0] },
  overhead: { position: [0.4, 10.5, 3], target: [0, 2.4, 0] },
};

const desiredPosition = new Vector3();
const desiredTarget = new Vector3();

/**
 * Moves the camera to the chosen preset. Dragging takes over at once; picking a view again brings
 * the camera back. With reduced motion the camera cuts straight to the preset.
 */
function CameraDirector({ controlsRef }: { controlsRef: RefObject<Controls | null> }) {
  const { view, viewRequest } = useRoofExplorerState();
  const { reducedMotion } = useRoofExplorerMeta();
  const invalidate = useThree((state) => state.invalidate);
  const animating = useRef(true);

  useEffect(() => {
    animating.current = true;
    invalidate();
  }, [view, viewRequest, invalidate]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }
    const stop = () => {
      animating.current = false;
    };
    controls.addEventListener("start", stop);
    return () => controls.removeEventListener("start", stop);
  }, [controlsRef]);

  useFrame((state, rawDelta) => {
    const controls = controlsRef.current;
    if (!controls || !animating.current) {
      return;
    }
    const preset = views[view];
    // Narrow (portrait) stages step back so the whole section stays in frame.
    const aspect = state.size.width / Math.max(state.size.height, 1);
    const fit = aspect < 1.2 ? Math.pow(1.2 / aspect, 0.85) : 1;
    desiredTarget.set(...preset.target);
    desiredPosition.set(...preset.position).sub(desiredTarget).multiplyScalar(fit).add(desiredTarget);

    if (reducedMotion) {
      state.camera.position.copy(desiredPosition);
      controls.target.copy(desiredTarget);
    } else {
      const t = 1 - Math.exp(-5 * Math.min(rawDelta, 0.25));
      state.camera.position.lerp(desiredPosition, t);
      controls.target.lerp(desiredTarget, t);
    }
    controls.update();

    if (state.camera.position.distanceTo(desiredPosition) < 0.005 && controls.target.distanceTo(desiredTarget) < 0.005) {
      animating.current = false;
    } else {
      state.invalidate();
    }
  });

  return null;
}

function SceneSetup() {
  const get = useThree((state) => state.get);
  const { setSceneStatus } = useRoofExplorerActions();
  const signalled = useRef(false);

  useEffect(() => {
    const { gl, scene } = get();
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = generator.fromScene(room, 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = 0.55;
    room.dispose();
    generator.dispose();

    const canvas = gl.domElement;
    const onLost = (event: Event) => {
      event.preventDefault();
      setSceneStatus("failed");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      scene.environment = null;
      target.dispose();
    };
  }, [get, setSceneStatus]);

  useFrame(() => {
    if (!signalled.current) {
      signalled.current = true;
      setSceneStatus("ready");
    }
  });

  return null;
}

/** A soft round floor that catches the model's shadow. */
function ShadowFloor() {
  const geometry = useDisposable(() => new CircleGeometry(4.2, 48).rotateX(-Math.PI / 2));
  return (
    <mesh geometry={geometry} position={[0, 0.6, 0]} receiveShadow>
      <shadowMaterial transparent opacity={0.28} />
    </mesh>
  );
}

function configureRenderer({ gl }: RootState) {
  gl.toneMapping = NeutralToneMapping;
  gl.toneMappingExposure = 1.05;
}

/**
 * The orbit-able roof section on /services/roofing. Client only, loaded with next/dynamic, and
 * rendered on demand: it draws only while the camera or a layer is moving.
 */
export default function RoofSectionCanvas({ active }: { active: boolean }) {
  const controlsRef = useRef<Controls>(null);

  return (
    <Canvas
      frameloop={active ? "demand" : "never"}
      dpr={[1, 2]}
      shadows="percentage"
      camera={{ fov: 32, near: 0.2, far: 60, position: [...views.eave.position] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={configureRenderer}
      style={{ touchAction: "pan-y" }}
    >
      <hemisphereLight args={["#e4ecef", "#5a5547", 1.2]} />
      <directionalLight
        position={[-5, 9, 6]}
        intensity={2.6}
        color="#fff3e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-radius={3}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[6, 4, -5]} intensity={0.6} color="#d4e0ff" />
      <SceneSetup />
      <RoofSectionModel />
      <ShadowFloor />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        enablePan={false}
        // Wheel and pinch zoom would fight page scrolling, so distance is fixed by the presets.
        enableZoom={false}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2 - 0.08}
        target={views.eave.target}
      />
      <CameraDirector controlsRef={controlsRef} />
    </Canvas>
  );
}
