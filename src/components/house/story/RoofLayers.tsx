// Roof system art, layer by layer, shared by the homepage "take it apart" diagram (exploded) and
// the roofing page hero (stepped cutaway). Each layer draws itself inside a footprint box.
import type { ReactNode } from "react";
import { roofLayers, type RoofLayer } from "@/lib/house/layers";
import { ExplodedLayer, IsoBox, LayerCallout, LayerFigure, Texture } from "./LayerDiagram";
import { collapseOffset, project, segments, type Box, type Origin } from "./iso";

type Footprint = { x: number; y: number; z: number; w: number; d: number };
type LayerArt = (origin: Origin, f: Footprint) => ReactNode;

/** Heights of each layer, and the point its callout leader starts from. */
const thickness: Record<RoofLayer, number> = {
  deck: 10,
  barrier: 3,
  underlayment: 3,
  flashing: 9,
  shingles: 6,
  ridgeVent: 12,
};

function rows(f: Footprint, z: number, step: number): [number, number, number, number, number, number][] {
  const lines: [number, number, number, number, number, number][] = [];
  for (let y = f.y + step; y < f.y + f.d - 2; y += step) {
    lines.push([f.x, y, z, f.x + f.w, y, z]);
  }
  return lines;
}

const art: Record<RoofLayer, LayerArt> = {
  deck: (origin, f) => {
    const box: Box = { ...f, h: thickness.deck };
    const z = f.z + box.h;
    const half = f.y + f.d / 2;
    const seams = segments(origin, [
      [f.x, half, z, f.x + f.w, half, z],
      [f.x + f.w * 0.5, f.y, z, f.x + f.w * 0.5, half, z],
      [f.x + f.w * 0.25, half, z, f.x + f.w * 0.25, f.y + f.d, z],
      [f.x + f.w * 0.75, half, z, f.x + f.w * 0.75, f.y + f.d, z],
    ]);
    const grain = segments(origin, [
      [f.x + 20, f.y + 26, z, f.x + 90, f.y + 26, z],
      [f.x + 40, f.y + 60, z, f.x + 120, f.y + 60, z],
      [f.x + f.w * 0.5 + 30, f.y + 40, z, f.x + f.w - 30, f.y + 40, z],
      [f.x + 30, half + 40, z, f.x + 70, half + 40, z],
      [f.x + f.w * 0.5, half + 30, z, f.x + f.w * 0.5 + 60, half + 30, z],
      [f.x + f.w * 0.8, half + 60, z, f.x + f.w - 10, half + 60, z],
    ]);
    return (
      <>
        <IsoBox origin={origin} box={box} top="paper3" sides="paper2" />
        <Texture d={grain} />
        <Texture d={seams} tone="strong" />
      </>
    );
  },
  barrier: (origin, f) => {
    // Self-sealing membrane along the eave (the front edge), where ice dams form.
    const band: Box = { x: f.x, y: f.y + f.d * 0.62, z: f.z, w: f.w, d: f.d * 0.38, h: thickness.barrier };
    const lap = segments(origin, [[band.x, band.y + band.d / 2, f.z + band.h, band.x + band.w, band.y + band.d / 2, f.z + band.h]]);
    return (
      <>
        <IsoBox origin={origin} box={band} top="dark" sides="dark" />
        <path d={lap} className="fill-none stroke-paper/50" strokeWidth={1} strokeDasharray="5 5" />
      </>
    );
  },
  underlayment: (origin, f) => {
    const box: Box = { ...f, h: thickness.underlayment };
    const z = f.z + box.h;
    return (
      <>
        <IsoBox origin={origin} box={box} top="white" sides="paper2" />
        <Texture d={segments(origin, rows(f, z, 36))} tone="strong" />
        <path
          d={segments(
            origin,
            rows(f, z, 36).map(([x0, y, zz, x1]) => [x0 + 8, y - 12, zz, x1 - 8, y - 12, zz]),
          )}
          className="fill-none stroke-charcoal/30"
          strokeWidth={1}
          strokeDasharray="2 8"
        />
      </>
    );
  },
  flashing: (origin, f) => {
    // Drip edge along the eave and the rake, as two long metal strips.
    const eave: Box = { x: f.x, y: f.y + f.d - 8, z: f.z, w: f.w, d: 8, h: thickness.flashing };
    const rake: Box = { x: f.x + f.w - 8, y: f.y, z: f.z, w: 8, d: f.d - 8, h: thickness.flashing };
    return (
      <>
        <IsoBox origin={origin} box={rake} top="glass" sides="glass" />
        <IsoBox origin={origin} box={eave} top="glass" sides="glass" />
      </>
    );
  },
  shingles: (origin, f) => {
    const box: Box = { ...f, h: thickness.shingles };
    const z = f.z + box.h;
    const courses = rows(f, z, 20);
    const tabs: [number, number, number, number, number, number][] = [];
    courses.forEach(([, y], row) => {
      const offset = row % 2 === 0 ? 0 : 15;
      for (let x = f.x + 15 + offset; x < f.x + f.w - 4; x += 30) {
        tabs.push([x, y, z, x, Math.min(y + 20, f.y + f.d), z]);
      }
    });
    return (
      <>
        <IsoBox origin={origin} box={box} top="paper2" sides="paper3" />
        <Texture d={segments(origin, courses)} tone="strong" />
        <Texture d={segments(origin, tabs)} />
      </>
    );
  },
  ridgeVent: (origin, f) => {
    // Vent cap along the ridge (the back edge).
    const cap: Box = { x: f.x, y: f.y, z: f.z, w: f.w, d: 26, h: thickness.ridgeVent };
    const z = f.z + cap.h;
    const slots: [number, number, number, number, number, number][] = [];
    for (let x = f.x + 12; x < f.x + f.w - 8; x += 16) {
      slots.push([x, f.y + 6, z, x, f.y + 20, z]);
    }
    return (
      <>
        <IsoBox origin={origin} box={cap} top="paper" sides="paper2" />
        <Texture d={segments(origin, slots)} tone="strong" />
      </>
    );
  },
};

// ---- Exploded diagram (homepage) ---------------------------------------------------------------

const EXPLODED_ORIGIN: Origin = { ox: 250, oy: 300 };
const EXPLODED = { w: 300, d: 200, gap: 48, stacked: 8 };

/** The roof system pulled apart, first layer at the bottom. */
export function RoofLayersExploded() {
  return (
    <LayerFigure viewBox="40 20 580 540">
      {roofLayers.map((layer, i) => (
        <ExplodedLayer key={layer} collapse={collapseOffset(0, 0, i * EXPLODED.stacked - i * EXPLODED.gap)}>
          {art[layer](EXPLODED_ORIGIN, { x: 0, y: 0, z: i * EXPLODED.gap, w: EXPLODED.w, d: EXPLODED.d })}
        </ExplodedLayer>
      ))}
      {roofLayers.map((layer, i) => {
        const z = i * EXPLODED.gap + thickness[layer];
        const anchorY = layer === "ridgeVent" ? 13 : layer === "barrier" ? EXPLODED.d * 0.8 : EXPLODED.d * 0.5;
        const [fx, fy] = project(EXPLODED_ORIGIN, EXPLODED.w, anchorY, z);
        // Bubbles line up in a column, evenly spaced by layer height, whatever the leader start.
        const [, ay] = project(EXPLODED_ORIGIN, EXPLODED.w, EXPLODED.d * 0.5, z);
        return <LayerCallout key={layer} number={i + 1} from={{ x: fx, y: fy }} at={{ x: 580, y: ay }} />;
      })}
    </LayerFigure>
  );
}

// ---- Stepped cutaway (roofing page) ------------------------------------------------------------

const CUTAWAY_ORIGIN: Origin = { ox: 230, oy: 120 };
const CUTAWAY = { w: 380, d: 230, step: 52, stacked: 7 };

/**
 * One roof plane with each layer cut back a step further than the one above it, so every layer of
 * the system is visible at once.
 */
export function RoofCutaway() {
  return (
    <LayerFigure viewBox="20 40 600 470">
      {roofLayers.map((layer, i) => {
        const start = i * CUTAWAY.step;
        return (
          <g key={layer}>
            {art[layer](CUTAWAY_ORIGIN, {
              x: start,
              y: 0,
              z: i * CUTAWAY.stacked,
              w: CUTAWAY.w - start,
              d: CUTAWAY.d,
            })}
          </g>
        );
      })}
      {roofLayers.map((layer, i) => {
        const z = i * CUTAWAY.stacked + thickness[layer];
        const stripX = i * CUTAWAY.step + CUTAWAY.step / 2;
        if (layer === "ridgeVent") {
          const [fx, fy] = project(CUTAWAY_ORIGIN, i * CUTAWAY.step + 60, 13, z);
          return <LayerCallout key={layer} number={i + 1} from={{ x: fx, y: fy }} at={{ x: fx + 40, y: fy - 44 }} />;
        }
        const [fx, fy] = project(CUTAWAY_ORIGIN, stripX, CUTAWAY.d - 4, z);
        return <LayerCallout key={layer} number={i + 1} from={{ x: fx, y: fy }} at={{ x: fx - 26, y: fy + 52 }} />;
      })}
    </LayerFigure>
  );
}
