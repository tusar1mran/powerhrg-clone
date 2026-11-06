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
