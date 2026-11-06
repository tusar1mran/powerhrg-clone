"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Euler,
  Matrix4,
  PlaneGeometry,
  Quaternion,
  Vector3,
  type BufferGeometry,
  type InstancedMesh,
  type MeshStandardMaterial,
} from "three";
import { box, mergeAll, place } from "@/features/three/geometry";
import { useDisposable } from "@/features/three/use-disposable";
import { houseSpec, windowPlacements, type WindowPlacement } from "../house-spec";
import type { HouseMaterials } from "../materials";
import { ServicePart } from "../ServicePart";

const { width: W, height: H } = houseSpec.window;

const CASING = 0.13;
const FRAME = 0.06;
const BAR = 0.022;

/**
 * One double-hung window in its own space: centred on the opening, on the outside face of the
 * wall, looking down +z. Built once and drawn for every opening with instancing, so all windows
 * on the house cost one draw call per material.
 */
function buildCasing() {
  return mergeAll([
    box([CASING, H + CASING * 2, 0.04], [-(W / 2 + CASING / 2), 0, 0.02]),
    box([CASING, H + CASING * 2, 0.04], [W / 2 + CASING / 2, 0, 0.02]),
    // head with a small drip cap
    box([W + CASING * 2 + 0.06, 0.16, 0.05], [0, H / 2 + 0.08, 0.025]),
    box([W + CASING * 2 + 0.12, 0.035, 0.08], [0, H / 2 + 0.175, 0.04]),
    // sill
    box([W + CASING * 2 + 0.1, 0.05, 0.11], [0, -(H / 2 + 0.04), 0.055]),
  ]);
}

function buildFrame() {
  const sashHeight = H / 2;
  const pieces = [
    box([FRAME, H, 0.05], [-(W / 2 - FRAME / 2), 0, 0.025]),
    box([FRAME, H, 0.05], [W / 2 - FRAME / 2, 0, 0.025]),
    box([W, FRAME, 0.05], [0, H / 2 - FRAME / 2, 0.025]),
    box([W, FRAME, 0.05], [0, -(H / 2 - FRAME / 2), 0.025]),
    // meeting rail, where the two sashes overlap
    box([W, 0.05, 0.06], [0, 0, 0.03]),
  ];

  // Colonial grilles: three panes across and two down in each sash (six over six).
  for (const sashY of [sashHeight / 2, -sashHeight / 2]) {
    for (const x of [-W / 6, W / 6]) {
      pieces.push(box([BAR, sashHeight - FRAME, 0.02], [x, sashY, 0.035]));
    }
    pieces.push(box([W - FRAME, BAR, 0.02], [0, sashY, 0.035]));
  }
  return mergeAll(pieces);
}

function buildGlass() {
  return place(new PlaneGeometry(W - FRAME, H - FRAME), [0, 0, 0.012]);
}

const matrix = new Matrix4();
const position = new Vector3();
const quaternion = new Quaternion();
const euler = new Euler();
const unitScale = new Vector3(1, 1, 1);

/** Instance matrices for every window opening, in world space. */
export function writeInstanceMatrices(mesh: InstancedMesh, placements: readonly WindowPlacement[], offsetX = 0) {
  placements.forEach((placement, index) => {
    euler.set(0, placement.rotationY, 0);
    quaternion.setFromEuler(euler);
    // Shift along the wall in the window's own space, e.g. to put shutters either side of it.
    position.set(offsetX, 0, 0).applyQuaternion(quaternion);
    position.x += placement.position[0];
    position.y += placement.position[1];
    position.z += placement.position[2];
    matrix.compose(position, quaternion, unitScale);
    mesh.setMatrixAt(index, matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  mesh.computeBoundingBox();
  mesh.computeBoundingSphere();
}

type InstancesProps = {
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
  castShadow: boolean;
};

function WindowInstances({ geometry, material, castShadow }: InstancesProps) {
  const ref = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      writeInstanceMatrices(ref.current, windowPlacements);
    }
  }, []);

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, windowPlacements.length]}
      castShadow={castShadow}
      receiveShadow
    />
  );
}

export function Windows({ materials }: { materials: HouseMaterials }) {
  const geometry = useDisposable(
    () => ({
      casing: buildCasing(),
      frame: buildFrame(),
      glass: buildGlass(),
    }),
    [],
  );

  return (
    <ServicePart service="Windows">
      <WindowInstances geometry={geometry.casing} material={materials.windowCasing} castShadow />
      <WindowInstances geometry={geometry.frame} material={materials.windowFrame} castShadow />
      <WindowInstances geometry={geometry.glass} material={materials.glass} castShadow={false} />
    </ServicePart>
  );
}
