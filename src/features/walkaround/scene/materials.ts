"use client";

import { BackSide, Color, MeshStandardMaterial, type Side, type Texture } from "three";
import type { ServiceName } from "@/lib/links";
import { useDisposable } from "@/features/three/use-disposable";
import {
  createBrickTexture,
  createInsulationTexture,
  createLawnTexture,
  createLouverTexture,
  createOsbTexture,
  createRadialFadeTexture,
  createShingleTexture,
  createSidingTexture,
  createUnderlaymentTexture,
  createWrapTexture,
} from "@/features/three/textures";

/** Which part of the house a material belongs to. "neutral" is the site and structure around it. */
export type MaterialGroup = ServiceName | "neutral";

/** Constant self-illumination, e.g. window glass glowing warmly at dusk. */
export type Glow = { color: Color; day: number; dusk: number };

export type RegisteredMaterial = {
  material: MeshStandardMaterial;
  group: MaterialGroup;
  /** Colour as authored. */
  base: Color;
  /** Desaturated, darker version used while another part of the house is in focus. */
  dimmed: Color;
  glow: Glow | null;
};

const materialDefinitions = {
  // Siding chapter: the finished wall and the layers under it.
  siding: { group: "Siding", color: "#d6cfbf", roughness: 0.8 },
  sheathing: { group: "Siding", color: "#ffffff", roughness: 0.9 },
  wrap: { group: "Siding", color: "#f5f5f3", roughness: 0.55 },
  framing: { group: "Siding", color: "#c9a273", roughness: 0.85 },
  // Roofing chapter. The front slope has its own copies so it can fade out for the attic view.
  deck: { group: "Roofing", color: "#ffffff", roughness: 0.9 },
  underlayment: { group: "Roofing", color: "#c9d1d6", roughness: 0.7 },
  shingles: { group: "Roofing", color: "#8f8a83", roughness: 0.92 },
  frontDeck: { group: "Roofing", color: "#ffffff", roughness: 0.9, transparent: true },
  frontUnderlayment: { group: "Roofing", color: "#c9d1d6", roughness: 0.7, transparent: true },
  frontShingles: { group: "Roofing", color: "#8f8a83", roughness: 0.92, transparent: true },
  ridgeVent: { group: "Roofing", color: "#34383a", roughness: 0.75, transparent: true },
  // Windows chapter.
  windowFrame: { group: "Windows", color: "#2a2f31", roughness: 0.42, metalness: 0.1 },
  windowCasing: { group: "Windows", color: "#f2f0ea", roughness: 0.6 },
  glass: { group: "Windows", color: "#25343c", roughness: 0.06, metalness: 0.65, glow: ["#ffb35c", 0, 1.35] },
  // Doors chapter.
  door: { group: "Doors", color: "#244852", roughness: 0.48 },
  doorTrim: { group: "Doors", color: "#f2f0ea", roughness: 0.6 },
  hardware: { group: "Doors", color: "#c79a4b", roughness: 0.3, metalness: 0.9 },
  // Insulation chapter.
  joists: { group: "Insulation", color: "#c7a174", roughness: 0.85 },
  atticFloor: { group: "Insulation", color: "#d9d3c7", roughness: 0.9 },
  insulation: { group: "Insulation", color: "#ffffff", roughness: 1 },
  sealant: { group: "Insulation", color: "#f0ad3c", roughness: 0.5, glow: ["#f0ad3c", 0.35, 0.6] },
  // Accessories chapter.
  trim: { group: "Accessories", color: "#f2f0ea", roughness: 0.6 },
  gutter: { group: "Accessories", color: "#eeece6", roughness: 0.38, metalness: 0.15 },
  shutter: { group: "Accessories", color: "#3a4549", roughness: 0.6 },
  // Everything else.
  foundation: { group: "neutral", color: "#aaa59c", roughness: 0.95 },
  paving: { group: "neutral", color: "#c7c1b6", roughness: 0.95 },
  lawn: { group: "neutral", color: "#ffffff", roughness: 1, transparent: true },
  brick: { group: "neutral", color: "#ffffff", roughness: 0.9 },
  foliage: { group: "neutral", color: "#5f704f", roughness: 0.9, flatShading: true },
  bark: { group: "neutral", color: "#5c4b3d", roughness: 0.95 },
  // Seen from outside through the open door, so only the inside faces of the room are drawn.
  foyer: { group: "neutral", color: "#efe2c9", roughness: 0.9, glow: ["#ffcf8a", 0.18, 1.1], side: BackSide },
  drywall: { group: "neutral", color: "#d9d4ca", roughness: 0.95 },
} satisfies Record<string, MaterialDefinition>;

type MaterialDefinition = {
  group: MaterialGroup;
  color: string;
  roughness: number;
  metalness?: number;
  transparent?: boolean;
  flatShading?: boolean;
  /** Which faces are drawn. Front faces only unless set. */
  side?: Side;
  /** [colour, intensity by day, intensity at dusk] */
  glow?: readonly [string, number, number];
};

export type HouseMaterialKey = keyof typeof materialDefinitions;
export type HouseMaterials = Record<HouseMaterialKey, MeshStandardMaterial>;

export type HouseMaterialSet = {
  materials: HouseMaterials;
  registry: RegisteredMaterial[];
};

const dimTint = new Color("#5d676c");

function dimmedColor(base: Color): Color {
  const luminance = base.r * 0.2126 + base.g * 0.7152 + base.b * 0.0722;
  return new Color(luminance, luminance, luminance).lerp(dimTint, 0.35).multiplyScalar(0.62);
}

type TextureSet = {
  siding: { map: Texture; bump: Texture };
  shingles: { map: Texture; bump: Texture };
  insulation: { map: Texture; bump: Texture };
  osb: Texture;
  osbDeck: Texture;
  underlayment: Texture;
  wrap: Texture;
  brick: Texture;
  louvers: Texture;
  lawn: Texture;
  fade: Texture;
};

function createTextures(): TextureSet {
  return {
    siding: createSidingTexture(),
    shingles: createShingleTexture(),
    insulation: createInsulationTexture(),
    osb: createOsbTexture(5),
    osbDeck: createOsbTexture(9),
    underlayment: createUnderlaymentTexture(),
    wrap: createWrapTexture(),
    brick: createBrickTexture(),
    louvers: createLouverTexture(),
    lawn: createLawnTexture(),
    fade: createRadialFadeTexture(),
  };
}

function flattenTextures(textures: TextureSet): Texture[] {
  return [
    textures.siding.map,
    textures.siding.bump,
    textures.shingles.map,
    textures.shingles.bump,
    textures.insulation.map,
    textures.insulation.bump,
    textures.osb,
    textures.osbDeck,
    textures.underlayment,
    textures.wrap,
    textures.brick,
    textures.louvers,
    textures.lawn,
    textures.fade,
  ];
}

function applyTextures(materials: HouseMaterials, textures: TextureSet): void {
  materials.siding.map = textures.siding.map;
  materials.siding.bumpMap = textures.siding.bump;
  materials.siding.bumpScale = 1.4;

  materials.sheathing.map = textures.osb;
  materials.wrap.map = textures.wrap;

  for (const key of ["deck", "frontDeck"] as const) {
    materials[key].map = textures.osbDeck;
  }
  for (const key of ["underlayment", "frontUnderlayment"] as const) {
    materials[key].map = textures.underlayment;
  }
  for (const key of ["shingles", "frontShingles"] as const) {
    materials[key].map = textures.shingles.map;
    materials[key].bumpMap = textures.shingles.bump;
    materials[key].bumpScale = 2.2;
  }

  materials.insulation.map = textures.insulation.map;
  materials.insulation.bumpMap = textures.insulation.bump;
  materials.insulation.bumpScale = 3;

  materials.brick.map = textures.brick;
  materials.shutter.map = textures.louvers;

  materials.lawn.map = textures.lawn;
  // The lawn texture tiles across the disc; the fade covers the whole disc once.
  textures.lawn.repeat.set(12, 12);
  materials.lawn.alphaMap = textures.fade;
}

/**
 * All materials of the walk-around house, created once per canvas and disposed with it. Each one is
 * registered with the part of the house it belongs to, so the highlight pass can dim the parts
 * that are not in focus.
 */
export function useHouseMaterials(): HouseMaterialSet {
  const resources = useDisposable(() => {
    const textures = createTextures();
    const registry: RegisteredMaterial[] = [];
    const materials = {} as HouseMaterials;

    for (const [key, definition] of Object.entries(materialDefinitions) as [HouseMaterialKey, MaterialDefinition][]) {
      const material = new MeshStandardMaterial({
        color: definition.color,
        roughness: definition.roughness,
        metalness: definition.metalness ?? 0,
        transparent: definition.transparent ?? false,
        flatShading: definition.flatShading ?? false,
      });
      if (definition.side !== undefined) {
        material.side = definition.side;
      }
      material.name = key;
      materials[key] = material;

      const base = material.color.clone();
      registry.push({
        material,
        group: definition.group,
        base,
        dimmed: dimmedColor(base),
        glow: definition.glow
          ? { color: new Color(definition.glow[0]), day: definition.glow[1], dusk: definition.glow[2] }
          : null,
      });
    }

    applyTextures(materials, textures);

    return {
      materials,
      registry,
      disposables: [...Object.values(materials), ...flattenTextures(textures)],
      dispose() {
        for (const item of this.disposables) {
          item.dispose();
        }
      },
    };
  });

  return resources;
}
