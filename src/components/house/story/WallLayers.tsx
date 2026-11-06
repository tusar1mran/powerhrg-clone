// The wall behind the siding, pulled apart from the inside out: sheathing, house wrap, flashing
// around a window opening, insulated siding and trim. Drawn back to front so nearer layers overlap.
import type { ReactNode } from "react";
import { wallLayers, type WallLayer } from "@/lib/house/layers";
import { ExplodedLayer, IsoBox, LayerCallout, LayerFigure, Texture } from "./LayerDiagram";
import { collapseOffset, project, segments, wallRect, type Origin } from "./iso";

const ORIGIN: Origin = { ox: 270, oy: 320 };
const W = 250;
const H = 290;
const GAP = 58;
const STACKED = 12;
/** Window opening, in wall coordinates (x along the wall, z up). */
const OPENING = { x0: 80, x1: 170, z0: 120, z1: 230 };

const depth: Record<WallLayer, number> = {
  sheathing: 10,
  wrap: 2,
  flashing: 3,
  siding: 12,
  trim: 14,
};

type Line = [number, number, number, number, number, number];

function opening(y: number) {
  return (
    <polygon
      points={wallRect(ORIGIN, y, OPENING.x0, OPENING.x1, OPENING.z0, OPENING.z1)}
      className="fill-paper-2 stroke-charcoal"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  );
}

const art: Record<WallLayer, (y: number) => ReactNode> = {
  sheathing: (y) => {
    const face = y + depth.sheathing;
    const seams: Line[] = [
      [W / 2, face, 0, W / 2, face, H],
      [0, face, H / 2, W, face, H / 2],
    ];
    const nails: Line[] = [10, W / 2 - 6, W / 2 + 6, W - 10].map((x) => [x, face, 8, x, face, H - 8]);
    return (
      <>
        <IsoBox origin={ORIGIN} box={{ x: 0, y, z: 0, w: W, d: depth.sheathing, h: H }} top="paper3" sides="paper2" front="paper3" />
        <Texture d={segments(ORIGIN, seams)} tone="strong" />
        <path d={segments(ORIGIN, nails)} className="fill-none stroke-charcoal/50" strokeWidth={1} strokeDasharray="1 9" />
        {opening(face)}
      </>
    );
  },
  wrap: (y) => {
    const face = y + depth.wrap;
    const laps: Line[] = [
      [0, face, H / 3, W, face, H / 3],
      [0, face, (H * 2) / 3, W, face, (H * 2) / 3],
    ];
    const print: Line[] = [H / 6, H / 2, (H * 5) / 6].map((z) => [12, face, z, W - 12, face, z]);
    return (
      <>
        <IsoBox origin={ORIGIN} box={{ x: 0, y, z: 0, w: W, d: depth.wrap, h: H }} top="white" sides="paper2" front="white" />
        <Texture d={segments(ORIGIN, laps)} tone="strong" />
        <path d={segments(ORIGIN, print)} className="fill-none stroke-charcoal/30" strokeWidth={1} strokeDasharray="10 8" />
        {opening(face)}
      </>
    );
  },
  flashing: (y) => {
    const d = depth.flashing;
    const band = 14;
    return (
      <>
        <IsoBox
          origin={ORIGIN}
          box={{ x: OPENING.x0 - band, y, z: OPENING.z0 - band, w: OPENING.x1 - OPENING.x0 + band * 2, d, h: band }}
          top="glass"
          sides="glass"
        />
        <IsoBox
          origin={ORIGIN}
          box={{ x: OPENING.x0 - band, y, z: OPENING.z0, w: band, d, h: OPENING.z1 - OPENING.z0 }}
          top="glass"
          sides="glass"
        />
        <IsoBox
          origin={ORIGIN}
          box={{ x: OPENING.x1, y, z: OPENING.z0, w: band, d, h: OPENING.z1 - OPENING.z0 }}
          top="glass"
          sides="glass"
        />
        <IsoBox
          origin={ORIGIN}
          box={{ x: OPENING.x0 - band, y, z: OPENING.z1, w: OPENING.x1 - OPENING.x0 + band * 2, d, h: band }}
          top="glass"
          sides="glass"
        />
      </>
    );
  },
  siding: (y) => {
    const face = y + depth.siding;
    const laps: Line[] = [];
    for (let z = 18; z < H; z += 18) {
      laps.push([0, face, z, W, face, z]);
    }
    return (
      <>
        {/* The right face shows the rigid foam backing of insulated vinyl. */}
        <IsoBox origin={ORIGIN} box={{ x: 0, y, z: 0, w: W, d: depth.siding, h: H }} top="paper" sides="paper3" front="paper" />
        <Texture d={segments(ORIGIN, laps)} tone="strong" />
        {opening(face)}
      </>
    );
  },
  trim: (y) => {
    const d = depth.trim;
    return (
      <>
        <IsoBox origin={ORIGIN} box={{ x: 0, y, z: H - 26, w: W, d, h: 26 }} top="paper" sides="paper2" front="paper" />
        <IsoBox origin={ORIGIN} box={{ x: W - 16, y, z: 0, w: 16, d, h: H - 26 }} top="paper" sides="paper2" front="paper" />
        <IsoBox origin={ORIGIN} box={{ x: 0, y, z: 0, w: 16, d, h: H - 26 }} top="paper" sides="paper2" front="paper" />
      </>
    );
  },
};

export function WallLayersExploded() {
  return (
    <LayerFigure viewBox="40 10 580 580">
      {wallLayers.map((layer, i) => (
        <ExplodedLayer key={layer} collapse={collapseOffset(0, i * STACKED - i * GAP, 0)}>
          {art[layer](i * GAP)}
        </ExplodedLayer>
      ))}
      {wallLayers.map((layer, i) => {
        const y = i * GAP + depth[layer];
        const [fx, fy] = layer === "flashing" ? project(ORIGIN, OPENING.x1 + 10, y, OPENING.z1 + 7) : project(ORIGIN, W - 8, y, H - 40);
        return <LayerCallout key={layer} number={i + 1} from={{ x: fx, y: fy }} at={{ x: 580, y: 120 + i * 48 }} />;
      })}
    </LayerFigure>
  );
}
