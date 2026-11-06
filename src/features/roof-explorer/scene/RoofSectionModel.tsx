"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Color, MathUtils, MeshStandardMaterial, type BufferGeometry, type Group } from "three";
import { createOsbTexture, createShingleTexture, createUnderlaymentTexture } from "@/features/three/textures";
import { useDisposable } from "@/features/three/use-disposable";
import { roofLayers, type RoofLayerId } from "@/lib/roofing-content";
import { useRoofExplorerActions, useRoofExplorerMeta, useRoofExplorerState } from "../RoofExplorerProvider";
import { buildLayerGeometry, buildStructureGeometry, labelAnchors, layerLift } from "./roof-section-geometry";

type LayerLook = { color: string; roughness: number; metalness?: number };

const layerLook: Record<RoofLayerId, LayerLook> = {
  deck: { color: "#ffffff", roughness: 0.9 },
  iceWater: { color: "#2d3134", roughness: 0.45 },
  underlayment: { color: "#c6ced3", roughness: 0.7 },
  dripEdge: { color: "#d4d6d6", roughness: 0.35, metalness: 0.6 },
  shingles: { color: "#8f8a83", roughness: 0.92 },
  ridgeVent: { color: "#34383a", roughness: 0.75 },
};

const gold = new Color("#f0ad3c");
const black = new Color(0, 0, 0);

/** Position of each layer in the stack, deck first. */
const layerOrder = Object.fromEntries(roofLayers.map((layer, index) => [layer.id, index])) as Record<RoofLayerId, number>;
const SELECTION_CLEARANCE = 0.7;

function dimmedColor(base: Color): Color {
  const luminance = base.r * 0.2126 + base.g * 0.7152 + base.b * 0.0722;
  return new Color(luminance, luminance, luminance).multiplyScalar(0.45);
}

/** Materials and geometry for the section, created once per canvas and disposed with it. */
function useRoofSectionResources() {
  return useDisposable(() => {
    const osb = createOsbTexture(9);
    const shingles = createShingleTexture();
    const underlayment = createUnderlaymentTexture();

    const layers = Object.fromEntries(
      roofLayers.map((layer) => {
        const look = layerLook[layer.id];
        const material = new MeshStandardMaterial({
          color: look.color,
          roughness: look.roughness,
          metalness: look.metalness ?? 0,
        });
        return [layer.id, material];
      }),
    ) as Record<RoofLayerId, MeshStandardMaterial>;

    layers.deck.map = osb;
    layers.underlayment.map = underlayment;
    layers.shingles.map = shingles.map;
    layers.shingles.bumpMap = shingles.bump;
    layers.shingles.bumpScale = 2.2;

    const structure = {
      framing: new MeshStandardMaterial({ color: "#c9a273", roughness: 0.85 }),
      trim: new MeshStandardMaterial({ color: "#f2f0ea", roughness: 0.6 }),
      gutters: new MeshStandardMaterial({ color: "#eeece6", roughness: 0.38, metalness: 0.15 }),
    };

    const layerGeometry = buildLayerGeometry();
    const structureGeometry = buildStructureGeometry();
    const disposables = [
      ...Object.values(layers),
      ...Object.values(structure),
      ...Object.values(layerGeometry),
      ...Object.values(structureGeometry),
      osb,
      shingles.map,
      shingles.bump,
      underlayment,
    ];

    return {
      layers,
      structure,
      layerGeometry,
      structureGeometry,
      base: Object.fromEntries(roofLayers.map((layer) => [layer.id, layers[layer.id].color.clone()])) as Record<RoofLayerId, Color>,
      dimmed: Object.fromEntries(roofLayers.map((layer) => [layer.id, dimmedColor(layers[layer.id].color)])) as Record<RoofLayerId, Color>,
      dispose() {
        for (const item of disposables) {
          item.dispose();
        }
      },
    };
  });
}

type LayerProps = {
  id: RoofLayerId;
  label: string;
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
  base: Color;
  dimmed: Color;
};

/**
 * One roof layer. It eases towards its separated height and towards its highlight state (the
 * selected layer keeps its colour and glows faintly; the others dim). Clicking it selects it, the
 * same as picking it in the list beside the canvas.
 */
function RoofLayer({ id, label, geometry, material, base, dimmed }: LayerProps) {
  const groupRef = useRef<Group>(null);
  const highlight = useRef({ lift: -1, dim: -1, glow: -1 });
  const { explode, layer: selected } = useRoofExplorerState();
  const { selectLayer } = useRoofExplorerActions();
  const { reducedMotion } = useRoofExplorerMeta();
  const portalTarget = useThree((state) => state.gl.domElement.parentElement);
  const portal = useMemo(() => (portalTarget ? { current: portalTarget } : undefined), [portalTarget]);

  const compact = useThree((state) => state.size.width < 560);
  // Layers above the selected one lift a little further, so the selected layer is never buried.
  const above = selected !== null && layerOrder[id] > layerOrder[selected];
  const targetLift = layerLift[id] * explode + (above ? SELECTION_CLEARANCE : 0);
  const targetDim = selected !== null && selected !== id ? 1 : 0;
  const targetGlow = selected === id ? 1 : 0;
  // On small stages only the selected layer is labelled, so the labels don't pile up.
  const showLabel = selected === id || (selected === null && explode > 0.3 && !compact);
  const invalidate = useThree((state) => state.invalidate);

  // A change from the controls starts the easing; the frame loop keeps going until it settles.
  useEffect(() => {
    invalidate();
  }, [targetLift, targetDim, targetGlow, invalidate]);

  useFrame((state, rawDelta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    const delta = Math.min(rawDelta, 0.25);
    const current = highlight.current;
    const step = (value: number, target: number, lambda: number) =>
      reducedMotion || value < 0 || Math.abs(value - target) < 0.0005 ? target : MathUtils.damp(value, target, lambda, delta);

    current.lift = step(current.lift, targetLift, 6);
    current.dim = step(current.dim, targetDim, 8);
    current.glow = step(current.glow, targetGlow, 8);

    group.position.y = current.lift;
    material.color.copy(base).lerp(dimmed, current.dim * 0.75);
    material.emissive.copy(black).lerp(gold, current.glow * 0.22);

    if (current.lift !== targetLift || current.dim !== targetDim || current.glow !== targetGlow) {
      state.invalidate();
    }
  });

  const onClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      selectLayer(selected === id ? null : id);
    },
    [id, selected, selectLayer],
  );

  const onPointerOver = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
  }, []);

  const onPointerOut = useCallback(() => {
    document.body.style.cursor = "";
  }, []);

  return (
    <group ref={groupRef}>
      <mesh
        geometry={geometry}
        material={material}
        castShadow
        receiveShadow
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      />
      <Html position={labelAnchors[id]} center zIndexRange={[20, 0]} pointerEvents="none" portal={portal}>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap shadow-lg backdrop-blur-md transition-opacity duration-300 select-none sm:text-[12px] ${
            selected === id ? "border-gold/60 bg-charcoal-950/90 text-white" : "border-white/15 bg-charcoal-950/75 text-white/90"
          } ${showLabel ? "opacity-100" : "opacity-0"}`}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-gold" />
          {label}
        </span>
      </Html>
    </group>
  );
}

/** The roof section: framing and trim that stay put, and the six layers that separate. */
export function RoofSectionModel() {
  const resources = useRoofSectionResources();
  const { structure, structureGeometry } = resources;

  return (
    <group>
      <mesh geometry={structureGeometry.framing} material={structure.framing} castShadow receiveShadow />
      <mesh geometry={structureGeometry.trim} material={structure.trim} castShadow receiveShadow />
      <mesh geometry={structureGeometry.gutters} material={structure.gutters} castShadow receiveShadow />
      {roofLayers.map((layer) => (
        <RoofLayer
          key={layer.id}
          id={layer.id}
          label={layer.label}
          geometry={resources.layerGeometry[layer.id]}
          material={resources.layers[layer.id]}
          base={resources.base[layer.id]}
          dimmed={resources.dimmed[layer.id]}
        />
      ))}
    </group>
  );
}
