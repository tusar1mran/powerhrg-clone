"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { applyWorldUVs, box, mergeAll, profileSlab } from "@/features/three/geometry";
import { textureScale } from "@/features/three/textures";
import { useDisposable } from "@/features/three/use-disposable";
import { chapterDetails } from "@/lib/walkaround-content";
import { houseSpec, rafterHeightAt } from "../house-spec";
import type { HouseMaterials } from "../materials";
import { SceneLabel } from "../SceneLabel";
import { useSceneFrame, type SceneFrameState } from "../SceneFrame";
import { ServicePart } from "../ServicePart";
import { gableOutline } from "./Shell";

const { halfWidth, halfDepth, foundation, wallTop } = houseSpec;

/**
 * The right-hand gable wall is built layer by layer so it can peel open in the Siding chapter:
 * studs over drywall, then sheathing, house wrap and siding. Each layer swings out from the back
 * corner like the pages of a book, outer layers furthest.
 */
const layers = {
  studs: { from: halfWidth - 0.2, depth: 0.14 },
  sheathing: { from: halfWidth - 0.06, depth: 0.02, swing: 0.14, slide: 0.1 },
  wrap: { from: halfWidth - 0.04, depth: 0.012, swing: 0.3, slide: 0.2 },
  siding: { from: halfWidth - 0.028, depth: 0.028, swing: 0.48, slide: 0.32 },
} as const;

const STUD_SPACING = 0.4; // 16 inches on centre
const STUD_WIDTH = 0.045;

function buildStuds() {
  const { from, depth } = layers.studs;
  const x = from + depth / 2;
  const pieces = [];
  const count = Math.floor((halfDepth * 2) / STUD_SPACING);

  for (let i = 0; i <= count; i += 1) {
    const z = Math.min(-halfDepth + STUD_WIDTH / 2 + i * STUD_SPACING, halfDepth - STUD_WIDTH / 2);
    const top = rafterHeightAt(z) - 0.02;
    pieces.push(box([depth, top - foundation, STUD_WIDTH], [x, (top + foundation) / 2, z]));
  }
  // bottom plate, double top plate and the mid-height band joist
  pieces.push(box([depth, 0.05, halfDepth * 2], [x, foundation + 0.025, 0]));
  pieces.push(box([depth, 0.1, halfDepth * 2], [x, wallTop - 0.05, 0]));
  pieces.push(box([depth, 0.2, halfDepth * 2], [x, foundation + houseSpec.floorHeight, 0]));
  return mergeAll(pieces);
}

/** Moves the slab so its back edge (z = -halfDepth) sits on the group origin, the hinge. */
function hingedSlab(from: number, depth: number, uvScale: number) {
  const geometry = applyWorldUVs(profileSlab(gableOutline, depth, from), uvScale);
  geometry.translate(-halfWidth, 0, halfDepth);
  return geometry;
}

type PeelLayerKey = "sheathing" | "wrap" | "siding";

const peelStrength = (frame: SceneFrameState) => frame.effects.wallPeel;

type PeelLayerProps = {
  layer: PeelLayerKey;
  children: ReactNode;
};

/** One layer of the wall, hanging from a hinge at the back corner. It swings open as the wall peels. */
function PeelLayer({ layer, children }: PeelLayerProps) {
  const frameRef = useSceneFrame();
  const groupRef = useRef<Group>(null);
  const { swing, slide } = layers[layer];

  useFrame(() => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    const peel = frameRef.current.effects.wallPeel;
    group.rotation.y = swing * peel;
    group.position.x = halfWidth + slide * peel;
  });

  return (
    <group ref={groupRef} position={[halfWidth, 0, -halfDepth]}>
      {children}
    </group>
  );
}

export function SidingWall({ materials }: { materials: HouseMaterials }) {
  const geometry = useDisposable(
    () => ({
      drywall: profileSlab(gableOutline, 0.02, halfWidth - 0.22),
      studs: buildStuds(),
      sheathing: hingedSlab(layers.sheathing.from, layers.sheathing.depth, textureScale.osb),
      wrap: hingedSlab(layers.wrap.from, layers.wrap.depth, textureScale.wrap),
      siding: hingedSlab(layers.siding.from, layers.siding.depth, textureScale.siding),
      cornerTrim: mergeAll([
        box([0.03, wallTop - foundation, 0.14], [halfWidth + 0.015, (wallTop + foundation) / 2, halfDepth - 0.07]),
        box([0.03, wallTop - foundation, 0.14], [halfWidth + 0.015, (wallTop + foundation) / 2, -halfDepth + 0.07]),
      ]).translate(-halfWidth, 0, halfDepth),
    }),
  );

  const [sheathingLabel, wrapLabel, sidingLabel] = chapterDetails.Siding.layers;
  const labelY = foundation + houseSpec.floorHeight * 1.1;

  return (
    <ServicePart service="Siding">
      <mesh geometry={geometry.drywall} material={materials.drywall} receiveShadow />
      <mesh geometry={geometry.studs} material={materials.framing} castShadow receiveShadow />

      <PeelLayer layer="sheathing">
        <mesh geometry={geometry.sheathing} material={materials.sheathing} castShadow receiveShadow />
        <SceneLabel text={sheathingLabel} position={[0.05, labelY - 0.9, halfDepth * 2 - 0.9]} strength={peelStrength} />
      </PeelLayer>
      <PeelLayer layer="wrap">
        <mesh geometry={geometry.wrap} material={materials.wrap} castShadow receiveShadow />
        <SceneLabel text={wrapLabel} position={[0.05, labelY, halfDepth * 2 - 0.7]} strength={peelStrength} />
      </PeelLayer>
      <PeelLayer layer="siding">
        <mesh geometry={geometry.siding} material={materials.siding} castShadow receiveShadow />
        <mesh geometry={geometry.cornerTrim} material={materials.trim} castShadow />
        <SceneLabel text={sidingLabel} position={[0.05, labelY + 0.9, halfDepth * 2 - 0.5]} strength={peelStrength} />
      </PeelLayer>
    </ServicePart>
  );
}
