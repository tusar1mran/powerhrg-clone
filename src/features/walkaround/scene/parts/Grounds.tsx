"use client";

import { useLayoutEffect, useRef } from "react";
import {
  CircleGeometry,
  CylinderGeometry,
  IcosahedronGeometry,
  Matrix4,
  Quaternion,
  Vector3,
  Euler,
  type InstancedMesh,
} from "three";
import { useDisposable } from "@/features/three/use-disposable";
import { createRandom } from "@/features/three/textures";
import type { Vec3Tuple } from "@/features/three/geometry";
import { houseSpec } from "../house-spec";
import type { HouseMaterials } from "../materials";

const GROUND_RADIUS = 34;

type Blob = { position: Vec3Tuple; scale: Vec3Tuple };

const frontZ = houseSpec.halfDepth + 0.75;

/** Foundation shrubs along the front, plus two trees behind the house to frame it. */
const shrubs: Blob[] = [
  { position: [-4.4, 0.45, frontZ], scale: [0.95, 0.7, 0.75] },
  { position: [-2.4, 0.4, frontZ], scale: [0.8, 0.62, 0.7] },
  { position: [2.4, 0.4, frontZ], scale: [0.8, 0.62, 0.7] },
  { position: [4.4, 0.45, frontZ], scale: [0.95, 0.7, 0.75] },
  { position: [-6.3, 0.5, 2.8], scale: [0.9, 0.75, 0.9] },
  { position: [6.4, 0.45, 3.2], scale: [0.85, 0.65, 0.85] },
];

const trees: { position: Vec3Tuple; height: number }[] = [
  { position: [-10.5, 0, -6.5], height: 7.4 },
  { position: [11.5, 0, -7.5], height: 8.6 },
  { position: [-13.5, 0, 3.5], height: 6.2 },
];

/** Each tree crown is a few overlapping, slightly irregular blobs. */
function crownBlobs(): Blob[] {
  const random = createRandom(7);
  return trees.flatMap(({ position, height }) => {
    const [x, , z] = position;
    const radius = height * 0.3;
    return [
      { position: [x, height * 0.62, z], scale: [radius, radius * 1.05, radius] },
      { position: [x + radius * 0.5, height * 0.78, z - radius * 0.2], scale: [radius * 0.72, radius * 0.8, radius * 0.72] },
      { position: [x - radius * 0.45, height * 0.5, z + radius * 0.3], scale: [radius * 0.7, radius * 0.7, radius * 0.7] },
    ].map((blob) => {
      const jitter = () => 0.92 + random() * 0.16;
      const blobScale: Vec3Tuple = [blob.scale[0] * jitter(), blob.scale[1] * jitter(), blob.scale[2] * jitter()];
      const blobPosition: Vec3Tuple = [blob.position[0], blob.position[1], blob.position[2]];
      return { position: blobPosition, scale: blobScale };
    });
  });
}

const foliageBlobs: Blob[] = [...shrubs, ...crownBlobs()];

const matrix = new Matrix4();
const position = new Vector3();
const scale = new Vector3();
const quaternion = new Quaternion();
const euler = new Euler();

export function Grounds({ materials }: { materials: HouseMaterials }) {
  const foliageRef = useRef<InstancedMesh>(null);
  const trunkRef = useRef<InstancedMesh>(null);

  const geometry = useDisposable(
    () => ({
      lawn: new CircleGeometry(GROUND_RADIUS, 64).rotateX(-Math.PI / 2),
      foliage: new IcosahedronGeometry(1, 1),
      trunk: new CylinderGeometry(0.12, 0.18, 1, 8).translate(0, 0.5, 0),
    }),
  );

  useLayoutEffect(() => {
    const random = createRandom(29);
    const foliage = foliageRef.current;
    if (foliage) {
      foliageBlobs.forEach((blob, index) => {
        euler.set(random() * 0.4, random() * Math.PI, random() * 0.4);
        quaternion.setFromEuler(euler);
        matrix.compose(position.set(...blob.position), quaternion, scale.set(...blob.scale));
        foliage.setMatrixAt(index, matrix);
      });
      foliage.instanceMatrix.needsUpdate = true;
      foliage.computeBoundingSphere();
    }

    const trunk = trunkRef.current;
    if (trunk) {
      trees.forEach((tree, index) => {
        quaternion.identity();
        matrix.compose(position.set(...tree.position), quaternion, scale.set(1, tree.height * 0.62, 1));
        trunk.setMatrixAt(index, matrix);
      });
      trunk.instanceMatrix.needsUpdate = true;
      trunk.computeBoundingSphere();
    }
  }, []);

  return (
    <group>
      {/* the lawn fades out at its edge, so the scene sits on the page with no visible horizon */}
      <mesh geometry={geometry.lawn} material={materials.lawn} receiveShadow renderOrder={-1} />
      <instancedMesh ref={foliageRef} args={[geometry.foliage, materials.foliage, foliageBlobs.length]} castShadow receiveShadow />
      <instancedMesh ref={trunkRef} args={[geometry.trunk, materials.bark, trees.length]} castShadow />
    </group>
  );
}
