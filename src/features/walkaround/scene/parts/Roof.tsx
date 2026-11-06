"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, MeshStandardMaterial } from "three";
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

/** Sets a fading material's opacity, and stops drawing it once it is fully transparent. */
function setFade(material: MeshStandardMaterial, opacity: number, group: Group | null) {
  material.opacity = opacity;
  material.depthWrite = opacity > 0.98;
  if (group) {
    group.visible = opacity > 0.01;
  }
}

export function Roof({ materials }: { materials: HouseMaterials }) {
  const frameRef = useSceneFrame();
  const front = {
    deck: useRef<Group>(null),
    underlayment: useRef<Group>(null),
    shingles: useRef<Group>(null),
  };
  const back = {
    deck: useRef<Group>(null),
    underlayment: useRef<Group>(null),
    shingles: useRef<Group>(null),
  };
  const ridgeRef = useRef<Group>(null);

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
    [],
  );

  useFrame(() => {
    const { roofExplode, atticReveal } = frameRef.current.effects;
    const frontNormal = slopeFrame(1).normal;
    const backNormal = slopeFrame(-1).normal;

    for (const key of ["deck", "underlayment", "shingles"] as const) {
      const lift = layerStack[key].lift * roofExplode;
      const frontLift = lift + ATTIC_LIFT * atticReveal;
      front[key].current?.position.set(0, frontNormal[1] * frontLift, frontNormal[2] * frontLift);
      back[key].current?.position.set(0, backNormal[1] * lift, backNormal[2] * lift);
    }
    ridgeRef.current?.position.set(0, RIDGE_VENT_LIFT * roofExplode + ATTIC_LIFT * 0.6 * atticReveal, 0);

    const opacity = 1 - Math.min(atticReveal * 1.25, 1);
    setFade(materials.frontDeck, opacity, front.deck.current);
    setFade(materials.frontUnderlayment, opacity, front.underlayment.current);
    setFade(materials.frontShingles, opacity, front.shingles.current);
    setFade(materials.ridgeVent, opacity, ridgeRef.current);
  });

  const [deckLabel, underlaymentLabel, shinglesLabel, ridgeLabel] = chapterDetails.Roofing.layers;
  // Labels ride on the front slope layers, which face the Roofing camera, staggered down the
  // slope so they don't overlap once the layers separate.
  const labelX = roofLength / 2 - 1.6;

  return (
    <ServicePart service="Roofing">
      <group ref={front.deck}>
        <mesh geometry={geometry.frontDeck} material={materials.frontDeck} castShadow receiveShadow />
        <SceneLabel text={deckLabel} position={slopePoint(1, slopeLength * 0.82, 0.08, labelX)} strength={explodeStrength} />
      </group>
      <group ref={front.underlayment}>
        <mesh geometry={geometry.frontUnderlayment} material={materials.frontUnderlayment} castShadow receiveShadow />
        <SceneLabel text={underlaymentLabel} position={slopePoint(1, slopeLength * 0.62, 0.08, labelX)} strength={explodeStrength} />
      </group>
      <group ref={front.shingles}>
        <mesh geometry={geometry.frontShingles} material={materials.frontShingles} castShadow receiveShadow />
        <SceneLabel text={shinglesLabel} position={slopePoint(1, slopeLength * 0.42, 0.12, labelX)} strength={explodeStrength} />
      </group>

      <group ref={back.deck}>
        <mesh geometry={geometry.backDeck} material={materials.deck} castShadow receiveShadow />
      </group>
      <group ref={back.underlayment}>
        <mesh geometry={geometry.backUnderlayment} material={materials.underlayment} castShadow receiveShadow />
      </group>
      <group ref={back.shingles}>
        <mesh geometry={geometry.backShingles} material={materials.shingles} castShadow receiveShadow />
      </group>

      <group ref={ridgeRef}>
        <mesh geometry={geometry.ridgeVent} material={materials.ridgeVent} castShadow />
        <SceneLabel text={ridgeLabel} position={[labelX, ridgeHeight + 0.5, 0]} strength={explodeStrength} />
      </group>
    </ServicePart>
  );
}
