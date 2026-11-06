// Geometry for the roof section on /services/roofing: a short length of an 8/12 gable roof, both
// slopes, built up layer by layer from the rafters. All units are metres. Every layer is merged
// into one geometry per material, so the whole model is a handful of draw calls.
import type { BufferGeometry } from "three";
import { applyWorldUVs, box, mergeAll, type Vec3Tuple } from "@/features/three/geometry";
import { textureScale } from "@/features/three/textures";
import type { RoofLayerId } from "@/lib/roofing-content";

export const section = {
  width: 3.6,
  /** Rafter-line length of each slope, ridge to eave. */
  slopeLength: 2.5,
  ridgeHeight: 2.6,
  pitch: Math.atan(8 / 12),
  rafterSpacing: 0.6,
  /** How far the rafter tails run past the end of the roof surface. */
  tail: 0.18,
} as const;

const thickness = {
  deck: 0.03,
  iceWater: 0.008,
  underlayment: 0.008,
  shingles: 0.04,
} as const;

/** Width of the ice-and-water barrier strip up from the eave. */
const ICE_STRIP = 0.95;

type Side = 1 | -1;

const sin = Math.sin(section.pitch);
const cos = Math.cos(section.pitch);

/** A point `along` metres down a slope from the ridge and `offset` metres out of the rafter line. */
export function slopePoint(side: Side, along: number, offset: number, x = 0): Vec3Tuple {
  return [x, section.ridgeHeight - sin * along + cos * offset, side * (cos * along + sin * offset)];
}

/** A flat slab lying on one slope, between two distances from the ridge. */
function slopeSlab(side: Side, from: number, to: number, offset: number, depth: number, width = section.width): BufferGeometry {
  const length = to - from;
  return box([width, depth, length], slopePoint(side, from + length / 2, offset + depth / 2), [side * section.pitch, 0, 0]);
}

function bothSlopes(build: (side: Side) => BufferGeometry[]): BufferGeometry[] {
  return [...build(1), ...build(-1)];
}

const { slopeLength: L, width: W } = section;

function buildFraming(): BufferGeometry {
  const parts = bothSlopes((side) => {
    const rafters: BufferGeometry[] = [];
    const count = Math.round(W / section.rafterSpacing);
    for (let i = 0; i <= count; i += 1) {
      const x = -W / 2 + 0.03 + i * ((W - 0.06) / count);
      const length = L + section.tail;
      rafters.push(
        box([0.045, 0.18, length], slopePoint(side, length / 2, -0.09, x), [side * section.pitch, 0, 0]),
      );
    }
    return rafters;
  });
  // ridge board
  parts.push(box([W, 0.22, 0.04], [0, section.ridgeHeight - 0.12, 0]));
  return mergeAll(parts);
}

function buildTrim(): BufferGeometry {
  return mergeAll(
    bothSlopes((side) => {
      const [, y, z] = slopePoint(side, L + section.tail, -0.09);
      return [
        // fascia across the rafter tails
        box([W + 0.04, 0.2, 0.025], [0, y - 0.02, z + side * 0.012]),
      ];
    }),
  );
}

function buildGutters(): BufferGeometry {
  return mergeAll(
    bothSlopes((side) => {
      const [, y, z] = slopePoint(side, L + section.tail, -0.09);
      const gz = z + side * 0.1;
      return [
        box([W + 0.04, 0.012, 0.13], [0, y - 0.1, gz]),
        box([W + 0.04, 0.11, 0.012], [0, y - 0.045, gz + side * 0.065]),
      ];
    }),
  );
}

/** Geometry for every roof layer, keyed like the content in roofing-content.ts. */
export function buildLayerGeometry(): Record<RoofLayerId, BufferGeometry> {
  const iceOffset = thickness.deck;
  const underlaymentOffset = thickness.deck + thickness.iceWater * 0.5;
  const shingleOffset = thickness.deck + thickness.iceWater + thickness.underlayment;

  const deck = mergeAll(bothSlopes((side) => [slopeSlab(side, 0, L, 0, thickness.deck)]));
  const iceWater = mergeAll(bothSlopes((side) => [slopeSlab(side, L - ICE_STRIP, L, iceOffset, thickness.iceWater)]));
  const underlayment = mergeAll(
    bothSlopes((side) => [slopeSlab(side, 0.04, L - ICE_STRIP + 0.15, underlaymentOffset, thickness.underlayment)]),
  );
  const shingles = mergeAll(bothSlopes((side) => [slopeSlab(side, 0.14, L + 0.02, shingleOffset, thickness.shingles)]));

  // Drip edge: a small metal L along each eave and up both rakes.
  const dripEdge = mergeAll(
    bothSlopes((side) => {
      const edge = slopePoint(side, L + 0.01, thickness.deck);
      const [, rakeY, rakeZ] = slopePoint(side, L / 2, thickness.deck - 0.02);
      const rakes = [W / 2 + 0.008, -W / 2 - 0.008].map((x) =>
        box([0.016, 0.07, L], [x, rakeY, rakeZ], [side * section.pitch, 0, 0]),
      );
      return [
        box([W + 0.03, 0.006, 0.08], [0, edge[1] + 0.003, edge[2] - side * 0.03], [side * section.pitch, 0, 0]),
        box([W + 0.03, 0.08, 0.006], [0, edge[1] - 0.035, edge[2] + side * 0.012]),
        ...rakes,
      ];
    }),
  );

  // Ridge vent: a low two-sided cap over the gap left at the ridge. Each half hangs from the peak.
  const capPeak = section.ridgeHeight + (shingleOffset + thickness.shingles) / cos + 0.04;
  const capTilt = section.pitch * 0.55;
  const capHalf = 0.12;
  const ridgeVent = mergeAll(
    ([1, -1] as const).map((side) =>
      box(
        [W - 0.1, 0.045, capHalf * 2],
        [0, capPeak - Math.sin(capTilt) * capHalf, side * Math.cos(capTilt) * capHalf],
        [side * capTilt, 0, 0],
      ),
    ),
  );

  return {
    deck: applyWorldUVs(deck, textureScale.osb),
    iceWater,
    underlayment: applyWorldUVs(underlayment, textureScale.underlayment),
    dripEdge,
    shingles: applyWorldUVs(shingles, textureScale.shingles),
    ridgeVent,
  };
}

export function buildStructureGeometry() {
  return {
    framing: buildFraming(),
    trim: buildTrim(),
    gutters: buildGutters(),
  };
}

/** Where each layer's label sits on the model (before the layers are separated). */
export const labelAnchors: Record<RoofLayerId, Vec3Tuple> = {
  deck: slopePoint(1, 0.55, 0.06, W / 2 - 0.25),
  iceWater: slopePoint(1, L - 0.35, 0.06, W / 2 - 0.4),
  underlayment: slopePoint(1, 1.1, 0.06, -W / 2 + 0.5),
  dripEdge: slopePoint(1, L + 0.05, 0.02, -0.3),
  shingles: slopePoint(1, 0.85, 0.12, 0.7),
  ridgeVent: [-0.6, section.ridgeHeight + 0.25, 0],
};

/** How far each layer rises when the roof is fully separated, bottom layer first. */
export const layerLift: Record<RoofLayerId, number> = {
  deck: 0,
  iceWater: 0.32,
  underlayment: 0.6,
  dripEdge: 0.9,
  shingles: 1.25,
  ridgeVent: 1.7,
};
