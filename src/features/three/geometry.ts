// Geometry helpers for building the house procedurally. Parts are built as separate primitives,
// moved into place, then merged so each material costs one draw call instead of one per board.
import {
  BoxGeometry,
  BufferAttribute,
  Euler,
  ExtrudeGeometry,
  Matrix4,
  Quaternion,
  Shape,
  Vector3,
  type BufferGeometry,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export type Vec3Tuple = readonly [number, number, number];

const tempMatrix = new Matrix4();
const tempQuaternion = new Quaternion();
const tempEuler = new Euler();
const tempScale = new Vector3(1, 1, 1);
const tempPosition = new Vector3();

/** Moves (and optionally rotates) a geometry in place and returns it, for chaining. */
export function place<T extends BufferGeometry>(geometry: T, position: Vec3Tuple, rotation: Vec3Tuple = [0, 0, 0]): T {
  tempEuler.set(rotation[0], rotation[1], rotation[2]);
  tempQuaternion.setFromEuler(tempEuler);
  tempPosition.set(position[0], position[1], position[2]);
  tempMatrix.compose(tempPosition, tempQuaternion, tempScale);
  geometry.applyMatrix4(tempMatrix);
  return geometry;
}

/** An axis-aligned box of the given size, centred at `position`. */
export function box(size: Vec3Tuple, position: Vec3Tuple, rotation?: Vec3Tuple): BoxGeometry {
  return place(new BoxGeometry(size[0], size[1], size[2]), position, rotation);
}

/**
 * A flat wall piece facing ±x, cut to an outline drawn in the z/y plane (e.g. a gable end: a
 * rectangle with a triangle on top). The piece spans `x` to `x + thickness`.
 */
export function profileSlab(outline: readonly (readonly [number, number])[], thickness: number, x: number): BufferGeometry {
  const shape = new Shape();
  outline.forEach(([z, y], index) => {
    if (index === 0) {
      shape.moveTo(z, y);
    } else {
      shape.lineTo(z, y);
    }
  });
  shape.closePath();

  const geometry = new ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false });
  // Shape x becomes world z; the extrusion (local +z) becomes world -x, so shift it back by
  // `thickness` to make the slab start at `x`.
  geometry.rotateY(-Math.PI / 2);
  geometry.translate(x + thickness, 0, 0);
  return geometry;
}

/**
 * Replaces a geometry's UVs with world-space planar coordinates, chosen per vertex from the
 * direction the surface faces. Textures then keep the same real-world scale on every wall, gable
 * and trim board, whatever their size. Call after the geometry has been moved into place.
 */
export function applyWorldUVs<T extends BufferGeometry>(geometry: T, metresPerRepeat: number): T {
  const position = geometry.getAttribute("position");
  const normal = geometry.getAttribute("normal");
  const uv = new Float32Array(position.count * 2);

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const nx = Math.abs(normal.getX(i));
    const ny = Math.abs(normal.getY(i));
    const nz = Math.abs(normal.getZ(i));

    let u: number;
    let v: number;
    if (ny >= nx && ny >= nz) {
      u = x;
      v = z;
    } else if (nx >= nz) {
      u = z;
      v = y;
    } else {
      u = x;
      v = y;
    }
    uv[i * 2] = u / metresPerRepeat;
    uv[i * 2 + 1] = v / metresPerRepeat;
  }

  geometry.setAttribute("uv", new BufferAttribute(uv, 2));
  return geometry;
}

/**
 * Merges geometries into one. Indexed and non-indexed inputs can't be merged directly, so a mixed
 * list is converted to non-indexed first. The inputs are disposed; only the result is kept.
 */
export function mergeAll(geometries: BufferGeometry[]): BufferGeometry {
  const mixed = geometries.some((g) => g.index === null) && geometries.some((g) => g.index !== null);
  const prepared = mixed ? geometries.map((g) => (g.index === null ? g : g.toNonIndexed())) : geometries;

  for (const g of prepared) {
    // Keep only the attributes every part has, so merging never fails on an extra attribute.
    for (const name of Object.keys(g.attributes)) {
      if (name !== "position" && name !== "normal" && name !== "uv") {
        g.deleteAttribute(name);
      }
    }
  }

  const merged = mergeGeometries(prepared, false);
  if (!merged) {
    throw new Error("mergeAll: geometries could not be merged");
  }

  for (const g of new Set([...geometries, ...prepared])) {
    g.dispose();
  }
  merged.computeBoundingBox();
  merged.computeBoundingSphere();
  return merged;
}
