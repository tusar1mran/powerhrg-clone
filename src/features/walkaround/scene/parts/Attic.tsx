"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { applyWorldUVs, box, mergeAll } from "@/features/three/geometry";
import { textureScale } from "@/features/three/textures";
import { useDisposable } from "@/features/three/use-disposable";
import { chapterDetails } from "@/lib/walkaround-content";
import { houseSpec } from "../house-spec";
import type { HouseMaterials } from "../materials";
import { SceneLabel } from "../SceneLabel";
import { useSceneFrame, type SceneFrameState } from "../SceneFrame";
import { ServicePart } from "../ServicePart";

const { halfWidth, halfDepth, wallTop, wallThickness } = houseSpec;

/** Inside faces of the walls, where the attic floor ends. */
const innerX = halfWidth - wallThickness;
const innerZ = halfDepth - wallThickness;
/** Insulation stops short of the eaves, where the roof comes down too low for it. */
const fillZ = innerZ - 0.55;
const FILL_DEPTH = 0.36;
const JOIST_SPACING = 0.6;

function buildJoists() {
  const pieces = [];
  const count = Math.floor((innerX * 2) / JOIST_SPACING);
  for (let i = 0; i <= count; i += 1) {
    const x = -innerX + 0.03 + i * ((innerX * 2 - 0.06) / count);
    pieces.push(box([0.045, 0.19, innerZ * 2], [x, wallTop + 0.095, 0]));
  }
  return mergeAll(pieces);
}

/** A bead of sealant along the top plates and around a light fixture and the attic hatch. */
function buildSealant() {
  const y = wallTop + 0.02;
  const bead = 0.05;
  return mergeAll([
    box([innerX * 2, bead, bead], [0, y, innerZ - 0.03]),
    box([innerX * 2, bead, bead], [0, y, -innerZ + 0.03]),
    box([bead, bead, innerZ * 2], [innerX - 0.03, y, 0]),
    box([bead, bead, innerZ * 2], [-innerX + 0.03, y, 0]),
    // attic hatch
    box([0.8, bead, bead], [2.1, y, 1.2]),
    box([0.8, bead, bead], [2.1, y, 0.4]),
    box([bead, bead, 0.8], [1.7, y, 0.8]),
    box([bead, bead, 0.8], [2.5, y, 0.8]),
    // ceiling fixtures
    box([0.22, bead, 0.22], [-2.4, y, 0.6]),
    box([0.22, bead, 0.22], [-0.3, y, -1.4]),
  ]);
}

const revealStrength = (frame: SceneFrameState) => frame.effects.atticReveal;

export function Attic({ materials }: { materials: HouseMaterials }) {
  const frameRef = useSceneFrame();
  const insulationRef = useRef<Mesh>(null);

  const geometry = useDisposable(
    () => ({
      floor: box([innerX * 2, 0.02, innerZ * 2], [0, wallTop - 0.01, 0]),
      joists: buildJoists(),
      sealant: buildSealant(),
      // A unit-height slab resting on the attic floor; it is scaled up as the attic fills.
      insulation: applyWorldUVs(
        box([innerX * 2 - 0.1, 1, fillZ * 2], [0, 0.5, 0]),
        textureScale.insulation,
      ),
    }),
    [],
  );

  useFrame(() => {
    const mesh = insulationRef.current;
    if (!mesh) {
      return;
    }
    const fill = frameRef.current.effects.insulationFill;
    mesh.visible = fill > 0.001;
    mesh.scale.y = Math.max(fill, 0.001) * FILL_DEPTH;
  });

  const [sealingLabel, insulationLabel] = chapterDetails.Insulation.layers;

  return (
    <ServicePart service="Insulation">
      <mesh geometry={geometry.floor} material={materials.atticFloor} receiveShadow />
      <mesh geometry={geometry.joists} material={materials.joists} castShadow receiveShadow />
      <mesh geometry={geometry.sealant} material={materials.sealant} />
      <mesh ref={insulationRef} geometry={geometry.insulation} material={materials.insulation} position={[0, wallTop, 0]} receiveShadow visible={false} />
      <SceneLabel text={sealingLabel} position={[2.1, wallTop + 0.25, 1.6]} strength={revealStrength} />
      <SceneLabel text={insulationLabel} position={[-2.2, wallTop + FILL_DEPTH + 0.3, 0.2]} strength={(frame) => frame.effects.insulationFill} />
    </ServicePart>
  );
}
