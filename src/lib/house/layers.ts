// Layer keys for the "take it apart" diagrams. Each list runs from the first layer installed to the
// last, which is also the order the diagrams draw them in. Copy for each layer lives in
// src/lib/house-content.ts, keyed by these names so a missing layer is a type error.

export const roofLayers = ["deck", "barrier", "underlayment", "flashing", "shingles", "ridgeVent"] as const;
export type RoofLayer = (typeof roofLayers)[number];

export const wallLayers = ["sheathing", "wrap", "flashing", "siding", "trim"] as const;
export type WallLayer = (typeof wallLayers)[number];

export const atticLayers = ["airSeal", "insulation", "baffles"] as const;
export type AtticLayer = (typeof atticLayers)[number];

export type LayerNote = { title: string; text: string };
