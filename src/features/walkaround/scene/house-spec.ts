// Dimensions of the illustrated house, in metres. The proportions follow a typical two-story
// center-hall colonial with an 8/12 gable roof; they are for the illustration only.
import type { Vec3Tuple } from "@/features/three/geometry";

const width = 10.4; // along x, the front facade
const depth = 7.6; // along z
const foundation = 0.5; // visible concrete above grade
const floorHeight = 2.85;
const wallHeight = floorHeight * 2;
const pitch = Math.atan(8 / 12);
const eaveOverhang = 0.45;
const rakeOverhang = 0.28;

const halfWidth = width / 2;
const halfDepth = depth / 2;
const wallTop = foundation + wallHeight;
const ridgeHeight = wallTop + halfDepth * Math.tan(pitch);

/** Distance along the slope from the ridge to the eave edge. */
const slopeLength = (halfDepth + eaveOverhang) / Math.cos(pitch);
const eaveHeight = wallTop - eaveOverhang * Math.tan(pitch);

export const houseSpec = {
  width,
  depth,
  halfWidth,
  halfDepth,
  foundation,
  floorHeight,
  wallHeight,
  wallTop,
  wallThickness: 0.2,
  pitch,
  eaveOverhang,
  rakeOverhang,
  ridgeHeight,
  slopeLength,
  eaveHeight,
  roofLength: width + rakeOverhang * 2,
  door: {
    width: 1.0,
    height: 2.2,
    /** Opening in the front wall, a little larger than the slab for the frame. */
    openingWidth: 1.16,
    openingHeight: 2.3,
  },
  window: {
    width: 0.95,
    height: 1.5,
  },
  chimney: {
    width: 1.3, // along z
    depth: 0.7, // along x
    top: ridgeHeight + 0.9,
  },
} as const;

export type WindowPlacement = { position: Vec3Tuple; rotationY: number; shutters: boolean };

const upperY = foundation + floorHeight + 1.4;
const lowerY = foundation + 1.45;
const frontZ = halfDepth;
const columnX = 3.3;

/** Every double-hung window, placed on the outside face of its wall. */
export const windowPlacements: WindowPlacement[] = [
  // Front: three across the second floor, two flanking the door below.
  { position: [-columnX, upperY, frontZ], rotationY: 0, shutters: true },
  { position: [0, upperY, frontZ], rotationY: 0, shutters: true },
  { position: [columnX, upperY, frontZ], rotationY: 0, shutters: true },
  { position: [-columnX, lowerY, frontZ], rotationY: 0, shutters: true },
  { position: [columnX, lowerY, frontZ], rotationY: 0, shutters: true },
  // Left side (the chimney sits between these).
  { position: [-halfWidth, upperY, 2], rotationY: -Math.PI / 2, shutters: false },
  { position: [-halfWidth, upperY, -2], rotationY: -Math.PI / 2, shutters: false },
  { position: [-halfWidth, lowerY, 2], rotationY: -Math.PI / 2, shutters: false },
  { position: [-halfWidth, lowerY, -2], rotationY: -Math.PI / 2, shutters: false },
  // Back.
  { position: [-columnX, upperY, -frontZ], rotationY: Math.PI, shutters: false },
  { position: [0, upperY, -frontZ], rotationY: Math.PI, shutters: false },
  { position: [columnX, upperY, -frontZ], rotationY: Math.PI, shutters: false },
  { position: [-columnX, lowerY, -frontZ], rotationY: Math.PI, shutters: false },
  { position: [columnX, lowerY, -frontZ], rotationY: Math.PI, shutters: false },
];

/* -------------------------------------------------------------------------------------------- */
/* Roof slopes                                                                                  */
/* -------------------------------------------------------------------------------------------- */

/** +1 is the front slope (draining towards +z), -1 the back slope. */
export type SlopeSide = 1 | -1;

/** Thickness of each roof layer. Exaggerated a little so the layers read at a distance. */
export const roofLayerThickness = {
  deck: 0.04,
  underlayment: 0.014,
  shingles: 0.05,
} as const;

/** Height of the finished roof surface above the rafter line, measured along the slope normal. */
export const roofStackHeight = roofLayerThickness.deck + roofLayerThickness.underlayment + roofLayerThickness.shingles;

export type SlopeFrame = {
  /** Rotation about x that lays a flat box onto this slope. */
  rotationX: number;
  /** Unit vector pointing out of the roof surface. */
  normal: Vec3Tuple;
  /** Unit vector pointing down the slope, from the ridge to the eave. */
  down: Vec3Tuple;
};

export function slopeFrame(side: SlopeSide): SlopeFrame {
  const sin = Math.sin(houseSpec.pitch);
  const cos = Math.cos(houseSpec.pitch);
  return {
    rotationX: side * houseSpec.pitch,
    normal: [0, cos, side * sin],
    down: [0, -sin, side * cos],
  };
}

/**
 * A point on a slope: `along` metres down from the ridge, `offset` metres out from the rafter line
 * (the plane through the top outside edge of the walls). `x` runs along the ridge.
 */
export function slopePoint(side: SlopeSide, along: number, offset: number, x = 0): Vec3Tuple {
  const { normal, down } = slopeFrame(side);
  return [x, houseSpec.ridgeHeight + down[1] * along + normal[1] * offset, down[2] * along + normal[2] * offset];
}

/** Height of the rafter line above a given z, i.e. the underside of the roof deck. */
export function rafterHeightAt(z: number): number {
  return houseSpec.ridgeHeight - Math.abs(z) * Math.tan(houseSpec.pitch);
}
