// The attic floor, pulled apart from the bottom up: the sealed ceiling, the blown-in insulation on
// top of it and the baffles that keep the eaves open to the soffit vents.
import type { ReactNode } from "react";
import { atticLayers, type AtticLayer } from "@/lib/house/layers";
import { ExplodedLayer, IsoBox, LayerCallout, LayerFigure, Texture } from "./LayerDiagram";
import { collapseOffset, isoEllipse, project, segments, type Origin } from "./iso";

const ORIGIN: Origin = { ox: 250, oy: 250 };
const W = 300;
const D = 200;
const GAP = 70;
const STACKED = 6;

const thickness: Record<AtticLayer, number> = {
  airSeal: 8,
  insulation: 34,
  baffles: 8,
};

type Line = [number, number, number, number, number, number];

/** A soft, wavy line across the top of the insulation, built from short world-space segments. */
function fluffRow(y: number, z: number, phase: number): Line[] {
  const lines: Line[] = [];
  for (let x = 6; x < W - 10; x += 10) {
    const up = (Math.round(x / 10) + phase) % 2 === 0 ? 3 : 0;
    const down = up === 3 ? 0 : 3;
    lines.push([x, y, z + up, x + 10, y, z + down]);
  }
  return lines;
}

const art: Record<AtticLayer, (z: number) => ReactNode> = {
  airSeal: (z) => {
    const top = z + thickness.airSeal;
    const joists: Line[] = [];
    for (let x = 50; x < W; x += 50) {
      joists.push([x, 0, top, x, D, top]);
    }
    // Sealant beads along the top plate and around a ceiling light, where warm air leaks out.
    const beads: Line[] = [
      [0, D - 6, top, W, D - 6, top],
      [0, 6, top, W, 6, top],
    ];
    const [cx, cy] = project(ORIGIN, 125, 100, top);
    const ring = isoEllipse(14);
    return (
      <>
        <IsoBox origin={ORIGIN} box={{ x: 0, y: 0, z, w: W, d: D, h: thickness.airSeal }} top="paper3" sides="paper2" />
        <Texture d={segments(ORIGIN, joists)} tone="strong" />
        <path d={segments(ORIGIN, beads)} className="fill-none stroke-charcoal" strokeWidth={1.5} strokeDasharray="2 5" />
        <ellipse cx={cx} cy={cy} rx={ring.rx} ry={ring.ry} className="fill-paper stroke-charcoal" strokeWidth={1.5} />
        <ellipse
          cx={cx}
          cy={cy}
          rx={ring.rx + 6}
          ry={ring.ry + 4}
          className="fill-none stroke-charcoal"
          strokeWidth={1}
          strokeDasharray="2 4"
        />
      </>
    );
  },
  insulation: (z) => {
    const top = z + thickness.insulation;
    const rows: Line[] = [];
    for (let y = 18; y < D - 4; y += 22) {
      rows.push(...fluffRow(y, top, Math.round(y / 22)));
    }
    return (
      <>
        <IsoBox origin={ORIGIN} box={{ x: 0, y: 0, z, w: W, d: D, h: thickness.insulation }} top="paper2" sides="paper3" />
        <Texture d={segments(ORIGIN, rows)} />
      </>
    );
  },
  baffles: (z) => {
    // Channels along the eave (the front edge), one per rafter bay.
    const boxes: ReactNode[] = [];
    for (let x = 6; x + 44 <= W; x += 58) {
      boxes.push(
        <IsoBox
          key={x}
          origin={ORIGIN}
          box={{ x, y: D - 70, z, w: 44, d: 70, h: thickness.baffles }}
          top="white"
          sides="paper2"
        />,
      );
    }
    const ribs: Line[] = [];
    for (let x = 6; x + 44 <= W; x += 58) {
      ribs.push([x + 22, D - 66, z + thickness.baffles, x + 22, D - 4, z + thickness.baffles]);
    }
    return (
      <>
        {boxes}
        <Texture d={segments(ORIGIN, ribs)} tone="strong" />
      </>
    );
  },
};

export function AtticLayersExploded() {
  return (
    <LayerFigure viewBox="40 70 580 460">
      {atticLayers.map((layer, i) => (
        <ExplodedLayer key={layer} collapse={collapseOffset(0, 0, i * STACKED - i * GAP)}>
          {art[layer](i * GAP)}
        </ExplodedLayer>
      ))}
      {atticLayers.map((layer, i) => {
        const z = i * GAP + thickness[layer];
        const anchorY = layer === "baffles" ? D - 35 : D * 0.5;
        const [fx, fy] = project(ORIGIN, W, anchorY, z);
        const [, ay] = project(ORIGIN, W, D * 0.5, z);
        return <LayerCallout key={layer} number={i + 1} from={{ x: fx, y: fy }} at={{ x: 580, y: ay }} />;
      })}
    </LayerFigure>
  );
}
