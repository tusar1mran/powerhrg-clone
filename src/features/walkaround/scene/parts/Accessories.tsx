"use client";

import { useLayoutEffect, useRef } from "react";
import type { InstancedMesh } from "three";
import { applyWorldUVs, box, mergeAll } from "@/features/three/geometry";
import { textureScale } from "@/features/three/textures";
import { useDisposable } from "@/features/three/use-disposable";
import { houseSpec, slopeFrame, slopePoint, windowPlacements, type SlopeSide } from "../house-spec";
import type { HouseMaterials } from "../materials";
import { ServicePart } from "../ServicePart";
import { writeInstanceMatrices } from "./Windows";

const { halfWidth, halfDepth, foundation, wallTop, roofLength, slopeLength, eaveHeight, eaveOverhang, rakeOverhang } = houseSpec;

const eaveZ = halfDepth + eaveOverhang;
const rakeX = halfWidth + rakeOverhang;
const FASCIA_HEIGHT = 0.2;

/** Fascia, soffit and frieze along both eaves, rake boards along both gables, and corner boards. */
function buildTrim() {
  const pieces = [];

  for (const side of [1, -1] as const) {
    // fascia: the vertical board along the eave edge
    pieces.push(box([roofLength, FASCIA_HEIGHT, 0.04], [0, eaveHeight - FASCIA_HEIGHT / 2 + 0.06, side * (eaveZ + 0.02)]));
    // soffit: the underside of the overhang
    pieces.push(box([roofLength - 0.04, 0.025, eaveOverhang], [0, eaveHeight - FASCIA_HEIGHT + 0.08, side * (halfDepth + eaveOverhang / 2)]));
    // frieze board where the wall meets the soffit
    pieces.push(box([houseSpec.width, 0.22, 0.03], [0, wallTop - 0.2, side * (halfDepth + 0.015)]));
  }

  for (const end of [1, -1] as const) {
    for (const side of [1, -1] as const) {
      pieces.push(rakeBoard(side, end));
    }
  }

  // corner boards on the two left-hand corners (the right-hand gable wall carries its own)
  for (const z of [halfDepth, -halfDepth]) {
    const height = wallTop - foundation;
    pieces.push(box([0.15, height, 0.15], [-halfWidth + 0.06, foundation + height / 2, z - Math.sign(z) * 0.06]));
  }

  return mergeAll(pieces);
}

function rakeBoard(side: SlopeSide, end: 1 | -1) {
  const { rotationX } = slopeFrame(side);
  const centre = slopePoint(side, slopeLength / 2, 0.01, end * (rakeX + 0.02));
  return box([0.04, FASCIA_HEIGHT, slopeLength], centre, [rotationX, 0, 0]);
}

const GUTTER = { width: 0.14, height: 0.12 };
const DOWNSPOUT = 0.075;

/** K-style gutters as a simple open trough on both eaves, with downspouts at the four corners. */
function buildGutters() {
  const pieces = [];
  const y = eaveHeight - FASCIA_HEIGHT + 0.1;

  for (const side of [1, -1] as const) {
    const z = side * (eaveZ + 0.04 + GUTTER.width / 2);
    pieces.push(box([roofLength, 0.012, GUTTER.width], [0, y, z]));
    pieces.push(box([roofLength, GUTTER.height, 0.012], [0, y + GUTTER.height / 2, z + side * GUTTER.width / 2]));
    pieces.push(box([roofLength, GUTTER.height * 0.8, 0.012], [0, y + GUTTER.height * 0.4, z - side * GUTTER.width / 2]));
    // end caps
    pieces.push(box([0.012, GUTTER.height, GUTTER.width], [roofLength / 2, y + GUTTER.height / 2, z]));
    pieces.push(box([0.012, GUTTER.height, GUTTER.width], [-roofLength / 2, y + GUTTER.height / 2, z]));

    for (const end of [1, -1] as const) {
      const x = end * (halfWidth - 0.3);
      const wallZ = side * (halfDepth + DOWNSPOUT / 2 + 0.02);
      // outlet and elbow back to the wall, then the pipe down to a splash block
      pieces.push(box([DOWNSPOUT, 0.22, DOWNSPOUT], [x, y - 0.1, z]));
      pieces.push(box([DOWNSPOUT, DOWNSPOUT, Math.abs(z - wallZ)], [x, y - 0.22, (z + wallZ) / 2]));
      pieces.push(box([DOWNSPOUT, y - 0.25, DOWNSPOUT], [x, (y - 0.25) / 2 + 0.12, wallZ]));
      pieces.push(box([DOWNSPOUT, DOWNSPOUT, 0.3], [x, 0.12, wallZ + side * 0.15]));
    }
  }
  return mergeAll(pieces);
}

const SHUTTER_WIDTH = 0.46;
const shutterPlacements = windowPlacements.filter((placement) => placement.shutters);
const shutterOffset = houseSpec.window.width / 2 + 0.15 + SHUTTER_WIDTH / 2;

function Shutters({ materials }: { materials: HouseMaterials }) {
  const leftRef = useRef<InstancedMesh>(null);
  const rightRef = useRef<InstancedMesh>(null);
  const geometry = useDisposable(
    () => applyWorldUVs(box([SHUTTER_WIDTH, houseSpec.window.height + 0.14, 0.035], [0, 0, 0.02]), textureScale.louvers),
    [],
  );

  useLayoutEffect(() => {
    if (leftRef.current) {
      writeInstanceMatrices(leftRef.current, shutterPlacements, -shutterOffset);
    }
    if (rightRef.current) {
      writeInstanceMatrices(rightRef.current, shutterPlacements, shutterOffset);
    }
  }, []);

  return (
    <>
      <instancedMesh ref={leftRef} args={[geometry, materials.shutter, shutterPlacements.length]} castShadow receiveShadow />
      <instancedMesh ref={rightRef} args={[geometry, materials.shutter, shutterPlacements.length]} castShadow receiveShadow />
    </>
  );
}

export function Accessories({ materials }: { materials: HouseMaterials }) {
  const geometry = useDisposable(
    () => ({
      trim: buildTrim(),
      gutters: buildGutters(),
    }),
    [],
  );

  return (
    <ServicePart service="Accessories">
      <mesh geometry={geometry.trim} material={materials.trim} castShadow receiveShadow />
      <mesh geometry={geometry.gutters} material={materials.gutter} castShadow receiveShadow />
      <Shutters materials={materials} />
    </ServicePart>
  );
}
