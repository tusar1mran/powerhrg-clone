"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { BufferGeometry, Group, MeshStandardMaterial } from "three";
import { applyWorldUVs, box, mergeAll, place } from "@/features/three/geometry";
import { textureScale } from "@/features/three/textures";
import { useDisposable } from "@/features/three/use-disposable";
import { chapterDetails } from "@/lib/walkaround-content";
import {
  houseSpec,
  roofLayerThickness,
  roofStackHeight,
  slopeFrame,
  slopePoint,
  type SlopeSide,
} from "../house-spec";
import type { HouseMaterials } from "../materials";
import { SceneLabel } from "../SceneLabel";
import { useSceneFrame, type SceneFrameState } from "../SceneFrame";
import { ServicePart } from "../ServicePart";

const { roofLength, slopeLength, ridgeHeight } = houseSpec;

type RoofLayerKey = "deck" | "underlayment" | "shingles";

/** Offset of each layer's underside from the rafter line, and how far it lifts when exploded. */
const layerStack: Record<RoofLayerKey, { offset: number; lift: number }> = {
  deck: { offset: 0, lift: 0 },
  underlayment: { offset: roofLayerThickness.deck, lift: 0.85 },
  shingles: { offset: roofLayerThickness.deck + roofLayerThickness.underlayment, lift: 1.8 },
};

const RIDGE_VENT_LIFT = 2.9;
/** How far the front slope rises before it has faded out, for the attic view. */
const ATTIC_LIFT = 3.4;

const uvScale: Record<RoofLayerKey, number> = {
  deck: textureScale.osb,
  underlayment: textureScale.underlayment,
  shingles: textureScale.shingles,
};

function slopeLayer(side: SlopeSide, key: RoofLayerKey) {
  const thickness = roofLayerThickness[key];
  const { rotationX } = slopeFrame(side);
  // Shingles stop a little short of the ridge, where the ridge vent covers them.
  const inset = key === "shingles" ? 0.12 : 0;
  const length = slopeLength - inset;
  const centre = slopePoint(side, inset + length / 2, layerStack[key].offset + thickness / 2);
  return applyWorldUVs(box([roofLength, thickness, length], centre, [rotationX, 0, 0]), uvScale[key]);
}

/** A low, two-sided cap over the ridge, standing in for a shingled-over ridge vent. */
function buildRidgeVent() {
  const width = 0.24;
  const tilt = houseSpec.pitch * 0.55;
  const length = roofLength - 0.5;
  const base = ridgeHeight + roofStackHeight / Math.cos(houseSpec.pitch);
  return mergeAll([
    place(box([length, 0.05, width], [0, 0, width / 2]), [0, base, 0], [tilt, 0, 0]),
    place(box([length, 0.05, width], [0, 0, -width / 2]), [0, base, 0], [-tilt, 0, 0]),
  ]);
}

const explodeStrength = (frame: SceneFrameState) => frame.effects.roofExplode;

type SlopeLayerProps = {
  side: SlopeSide;
  layer: RoofLayerKey;
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
  /** The front slope lifts away and fades out for the attic view; the back slope stays. */
  fades: boolean;
  children?: ReactNode;
};

/**
 * One layer of one slope. It lifts along the slope normal as the roof explodes (higher layers
 * further), and, on the front slope, rises and fades out when the attic is revealed.
 */
function SlopeLayer({ side, layer, geometry, material, fades, children }: SlopeLayerProps) {
  const frameRef = useSceneFrame();
  const groupRef = useRef<Group>(null);
  const { normal } = slopeFrame(side);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    const { roofExplode, atticReveal } = frameRef.current.effects;
    const lift = layerStack[layer].lift * roofExplode + (fades ? ATTIC_LIFT * atticReveal : 0);
    group.position.set(0, normal[1] * lift, normal[2] * lift);
    if (fades) {
      applyFade(group, material, atticReveal);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      {children}
    </group>
  );
}

/** Fades a group's material out as the attic is revealed, and stops drawing it once it's gone. */
function applyFade(group: Group, material: MeshStandardMaterial, reveal: number) {
  const opacity = 1 - Math.min(reveal * 1.25, 1);
  material.opacity = opacity;
  material.depthWrite = opacity > 0.98;
  group.visible = opacity > 0.01;
}

function RidgeVent({ geometry, material, label }: { geometry: BufferGeometry; material: MeshStandardMaterial; label: string }) {
  const frameRef = useSceneFrame();
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    const { roofExplode, atticReveal } = frameRef.current.effects;
    group.position.y = RIDGE_VENT_LIFT * roofExplode + ATTIC_LIFT * 0.6 * atticReveal;
    applyFade(group, material, atticReveal);
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} material={material} castShadow />
      <SceneLabel text={label} position={[labelX, ridgeHeight + 0.5, 0]} strength={explodeStrength} />
    </group>
  );
}

// Labels ride on the front slope layers, which face the Roofing camera, staggered down the slope
// so they don't overlap once the layers separate.
const labelX = roofLength / 2 - 1.6;

export function Roof({ materials }: { materials: HouseMaterials }) {
  const geometry = useDisposable(
    () => ({
      frontDeck: slopeLayer(1, "deck"),
      frontUnderlayment: slopeLayer(1, "underlayment"),
      frontShingles: slopeLayer(1, "shingles"),
      backDeck: slopeLayer(-1, "deck"),
      backUnderlayment: slopeLayer(-1, "underlayment"),
      backShingles: slopeLayer(-1, "shingles"),
      ridgeVent: buildRidgeVent(),
    }),
  );

  const [deckLabel, underlaymentLabel, shinglesLabel, ridgeLabel] = chapterDetails.Roofing.layers;

  return (
    <ServicePart service="Roofing">
      <SlopeLayer side={1} layer="deck" geometry={geometry.frontDeck} material={materials.frontDeck} fades>
        <SceneLabel text={deckLabel} position={slopePoint(1, slopeLength * 0.82, 0.08, labelX)} strength={explodeStrength} />
      </SlopeLayer>
      <SlopeLayer side={1} layer="underlayment" geometry={geometry.frontUnderlayment} material={materials.frontUnderlayment} fades>
        <SceneLabel text={underlaymentLabel} position={slopePoint(1, slopeLength * 0.62, 0.08, labelX)} strength={explodeStrength} />
      </SlopeLayer>
      <SlopeLayer side={1} layer="shingles" geometry={geometry.frontShingles} material={materials.frontShingles} fades>
        <SceneLabel text={shinglesLabel} position={slopePoint(1, slopeLength * 0.42, 0.12, labelX)} strength={explodeStrength} />
      </SlopeLayer>

      <SlopeLayer side={-1} layer="deck" geometry={geometry.backDeck} material={materials.deck} fades={false} />
      <SlopeLayer side={-1} layer="underlayment" geometry={geometry.backUnderlayment} material={materials.underlayment} fades={false} />
      <SlopeLayer side={-1} layer="shingles" geometry={geometry.backShingles} material={materials.shingles} fades={false} />

      <RidgeVent geometry={geometry.ridgeVent} material={materials.ridgeVent} label={ridgeLabel} />
    </ServicePart>
  );
}
