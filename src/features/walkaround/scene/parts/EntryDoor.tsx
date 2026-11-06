"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BoxGeometry, SphereGeometry, type Group } from "three";
import { box, mergeAll, place } from "@/features/three/geometry";
import { useDisposable } from "@/features/three/use-disposable";
import { houseSpec } from "../house-spec";
import type { HouseMaterials } from "../materials";
import { useSceneFrame } from "../SceneFrame";
import { ServicePart } from "../ServicePart";

const { halfDepth, foundation, wallThickness, door } = houseSpec;

const SLAB_DEPTH = 0.05;
/** The door sits in the middle of the wall's thickness; it swings inwards. */
const slabZ = halfDepth - wallThickness / 2;
const hingeX = -door.width / 2;
const OPEN_ANGLE = 1.35;

const openingTop = foundation + door.openingHeight;

/** Door slab in hinge space: the hinge edge is at x = 0 and the slab runs towards +x. */
function buildSlab() {
  const w = door.width;
  const h = door.height;
  const panel = (px: number, py: number, pw: number, ph: number) =>
    box([pw, ph, 0.015], [px, py, SLAB_DEPTH / 2 + 0.0075]);

  return mergeAll([
    box([w, h, SLAB_DEPTH], [w / 2, h / 2, 0]),
    // six raised panels
    panel(w * 0.28, h * 0.8, w * 0.32, h * 0.22),
    panel(w * 0.72, h * 0.8, w * 0.32, h * 0.22),
    panel(w * 0.28, h * 0.5, w * 0.32, h * 0.26),
    panel(w * 0.72, h * 0.5, w * 0.32, h * 0.26),
    panel(w * 0.28, h * 0.18, w * 0.32, h * 0.22),
    panel(w * 0.72, h * 0.18, w * 0.32, h * 0.22),
  ]);
}

function buildHardware() {
  const x = door.width - 0.09;
  return mergeAll([
    place(new SphereGeometry(0.035, 16, 12), [x, 1.0, SLAB_DEPTH / 2 + 0.05]),
    box([0.012, 0.012, 0.05], [x, 1.0, SLAB_DEPTH / 2 + 0.025]),
    box([0.05, 0.16, 0.012], [x, 1.18, SLAB_DEPTH / 2 + 0.006]),
    // kick plate
    box([door.width - 0.08, 0.16, 0.006], [door.width / 2, 0.1, SLAB_DEPTH / 2 + 0.003]),
  ]);
}

/** Jambs lining the opening, pilasters and a small flat canopy on brackets over the stoop. */
function buildTrim() {
  const halfOpening = door.openingWidth / 2;
  const jambDepth = wallThickness + 0.02;
  const pilaster = 0.18;
  const front = halfDepth + 0.02;
  const canopyY = openingTop + 0.42;

  return mergeAll([
    box([0.04, door.openingHeight, jambDepth], [-halfOpening + 0.02, foundation + door.openingHeight / 2, slabZ]),
    box([0.04, door.openingHeight, jambDepth], [halfOpening - 0.02, foundation + door.openingHeight / 2, slabZ]),
    box([door.openingWidth, 0.04, jambDepth], [0, openingTop - 0.02, slabZ]),
    box([pilaster, door.openingHeight + 0.1, 0.06], [-(halfOpening + pilaster / 2), foundation + (door.openingHeight + 0.1) / 2, front]),
    box([pilaster, door.openingHeight + 0.1, 0.06], [halfOpening + pilaster / 2, foundation + (door.openingHeight + 0.1) / 2, front]),
    box([door.openingWidth + pilaster * 2 + 0.12, 0.24, 0.08], [0, openingTop + 0.2, front + 0.01]),
    // canopy and brackets
    box([2.3, 0.1, 1.05], [0, canopyY + 0.1, halfDepth + 0.52]),
    box([2.42, 0.05, 1.12], [0, canopyY + 0.17, halfDepth + 0.55]),
    box([0.08, 0.36, 0.5], [-1.0, canopyY - 0.12, halfDepth + 0.25]),
    box([0.08, 0.36, 0.5], [1.0, canopyY - 0.12, halfDepth + 0.25]),
  ]);
}

function buildStoop() {
  return mergeAll([
    box([2.4, foundation, 1.5], [0, foundation / 2, halfDepth + 0.75]),
    box([2.4, foundation / 2, 0.45], [0, foundation / 4, halfDepth + 1.72]),
    // front walk
    box([1.3, 0.03, 6.2], [0, 0.015, halfDepth + 5.05]),
  ]);
}

export function EntryDoor({ materials }: { materials: HouseMaterials }) {
  const frameRef = useSceneFrame();
  const hingeRef = useRef<Group>(null);

  const geometry = useDisposable(
    () => ({
      slab: buildSlab(),
      hardware: buildHardware(),
      trim: buildTrim(),
      stoop: buildStoop(),
      // Lit room behind the door, seen through the opening. Only its inside faces are drawn.
      foyer: place(new BoxGeometry(2.6, 2.9, 2.4), [0, foundation + 1.45, slabZ - 1.25]),
    }),
  );

  useFrame(() => {
    const hinge = hingeRef.current;
    if (hinge) {
      hinge.rotation.y = OPEN_ANGLE * frameRef.current.effects.doorOpen;
    }
  });

  return (
    <group>
      <ServicePart service="Doors">
        <group ref={hingeRef} position={[hingeX, foundation, slabZ]}>
          <mesh geometry={geometry.slab} material={materials.door} castShadow receiveShadow />
          <mesh geometry={geometry.hardware} material={materials.hardware} castShadow />
        </group>
        <mesh geometry={geometry.trim} material={materials.doorTrim} castShadow receiveShadow />
      </ServicePart>
      <mesh geometry={geometry.foyer} material={materials.foyer} />
      <mesh geometry={geometry.stoop} material={materials.paving} castShadow receiveShadow />
    </group>
  );
}
