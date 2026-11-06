"use client";

import { applyWorldUVs, box, mergeAll, profileSlab } from "@/features/three/geometry";
import { textureScale } from "@/features/three/textures";
import { useDisposable } from "@/features/three/use-disposable";
import { houseSpec } from "../house-spec";
import type { HouseMaterials } from "../materials";
import { ServicePart } from "../ServicePart";

const { halfWidth, halfDepth, foundation, wallTop, wallThickness, ridgeHeight, door, chimney } = houseSpec;

/** Outline of a gable end wall in the z/y plane: the wall rectangle with the gable triangle on top. */
export const gableOutline: readonly (readonly [number, number])[] = [
  [-halfDepth, foundation],
  [halfDepth, foundation],
  [halfDepth, wallTop],
  [0, ridgeHeight],
  [-halfDepth, wallTop],
];

/**
 * The sided walls that don't peel apart: the front wall (with the door opening), the back wall and
 * the left gable end. Front and back walls sit between the two gable ends, so no faces overlap at
 * the corners. All of it is one merged mesh with one material.
 */
function buildSiding() {
  const inner = halfWidth - wallThickness;
  const wallHeight = wallTop - foundation;
  const frontZ = halfDepth - wallThickness / 2;
  const doorLeft = -door.openingWidth / 2;
  const doorRight = door.openingWidth / 2;
  const doorTop = foundation + door.openingHeight;

  const pieces = [
    // front wall, left of the door
    box([doorLeft + inner, wallHeight, wallThickness], [(-inner + doorLeft) / 2, foundation + wallHeight / 2, frontZ]),
    // front wall, right of the door
    box([inner - doorRight, wallHeight, wallThickness], [(inner + doorRight) / 2, foundation + wallHeight / 2, frontZ]),
    // front wall, above the door
    box([door.openingWidth, wallTop - doorTop, wallThickness], [0, (wallTop + doorTop) / 2, frontZ]),
    // back wall
    box([inner * 2, wallHeight, wallThickness], [0, foundation + wallHeight / 2, -frontZ]),
    // left gable end
    profileSlab(gableOutline, wallThickness, -halfWidth),
  ];

  return applyWorldUVs(mergeAll(pieces), textureScale.siding);
}

function buildChimney() {
  const x = -halfWidth - chimney.depth / 2;
  return applyWorldUVs(
    mergeAll([
      box([chimney.depth, chimney.top, chimney.width], [x, chimney.top / 2, 0]),
      // corbelled cap
      box([chimney.depth + 0.12, 0.16, chimney.width + 0.12], [x, chimney.top - 0.08, 0]),
    ]),
    textureScale.brick,
  );
}

export function Shell({ materials }: { materials: HouseMaterials }) {
  const geometry = useDisposable(
    () => ({
      siding: buildSiding(),
      foundation: box([houseSpec.width + 0.1, foundation, houseSpec.depth + 0.1], [0, foundation / 2, 0]),
      chimney: buildChimney(),
      flue: box([0.3, 0.4, 0.3], [-halfWidth - chimney.depth / 2, chimney.top + 0.2, 0.2]),
    }),
    [],
  );

  return (
    <group>
      <ServicePart service="Siding">
        <mesh geometry={geometry.siding} material={materials.siding} castShadow receiveShadow />
      </ServicePart>
      <mesh geometry={geometry.foundation} material={materials.foundation} castShadow receiveShadow />
      <mesh geometry={geometry.chimney} material={materials.brick} castShadow receiveShadow />
      <mesh geometry={geometry.flue} material={materials.foundation} castShadow />
    </group>
  );
}
