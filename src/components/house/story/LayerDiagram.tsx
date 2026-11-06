// Building blocks for the exploded layer diagrams. Layers are drawn in their exploded position;
// globals.css animates them in from the stacked position (see "Take it apart" there), so with
// reduced motion or without scroll-driven animation support the finished diagram simply shows.
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { boxFaces, type Box, type Origin } from "./iso";

type CollapseStyle = CSSProperties & Record<"--collapse-x" | "--collapse-y", string>;

export function LayerFigure({
  viewBox,
  className,
  children,
}: {
  viewBox: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      aria-hidden
      className={cn("block h-auto w-full overflow-visible [&_*]:[vector-effect:non-scaling-stroke]", className)}
    >
      {children}
    </svg>
  );
}

/** One layer. `collapse` is the screen offset back to the stacked position. */
export function ExplodedLayer({ collapse, children }: { collapse: { x: number; y: number }; children: ReactNode }) {
  const style: CollapseStyle = {
    "--collapse-x": `${collapse.x}px`,
    "--collapse-y": `${collapse.y}px`,
  };
  return (
    <g className="story-layer" style={style}>
      {children}
    </g>
  );
}

/** Numbered bubble with a leader line back to the layer it labels. */
export function LayerCallout({
  number,
  at,
  from,
}: {
  number: number;
  at: { x: number; y: number };
  from: { x: number; y: number };
}) {
  return (
    <g className="story-note">
      <path d={`M${from.x} ${from.y}L${at.x} ${at.y}`} className="fill-none stroke-charcoal" strokeWidth={1} />
      <circle cx={from.x} cy={from.y} r={3} className="fill-charcoal" />
      <circle cx={at.x} cy={at.y} r={16} className="fill-gold stroke-charcoal" strokeWidth={1.5} />
      <text
        x={at.x}
        y={at.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={15}
        className="fill-charcoal font-mono font-medium"
      >
        {String(number).padStart(2, "0")}
      </text>
    </g>
  );
}

const faceClass = {
  paper: "fill-paper stroke-charcoal",
  paper2: "fill-paper-2 stroke-charcoal",
  paper3: "fill-paper-3 stroke-charcoal",
  glass: "fill-glass stroke-charcoal",
  dark: "fill-charcoal-700 stroke-charcoal",
  white: "fill-[#fdfcf8] stroke-charcoal",
} as const;

export type FaceTone = keyof typeof faceClass;

/**
 * A solid box. Side faces are drawn one shade darker than the top so the volume reads without
 * shading gradients.
 */
export function IsoBox({
  origin,
  box,
  top = "paper",
  sides = "paper2",
  front,
}: {
  origin: Origin;
  box: Box;
  top?: FaceTone;
  sides?: FaceTone;
  /** Front face tone when it should differ from the right face. */
  front?: FaceTone;
}) {
  const faces = boxFaces(origin, box);
  return (
    <>
      <polygon points={faces.right} className={faceClass[sides]} strokeWidth={1.5} strokeLinejoin="round" />
      <polygon points={faces.front} className={faceClass[front ?? sides]} strokeWidth={1.5} strokeLinejoin="round" />
      <polygon points={faces.top} className={faceClass[top]} strokeWidth={1.5} strokeLinejoin="round" />
    </>
  );
}

const textureClass = {
  faint: "fill-none stroke-charcoal/40",
  strong: "fill-none stroke-charcoal/70",
} as const;

/** Thin texture lines drawn on top of a face. */
export function Texture({ d, tone = "faint" }: { d: string; tone?: keyof typeof textureClass }) {
  return (
    <path
      d={d}
      className={textureClass[tone]}
      strokeWidth={1}
      strokeLinecap="round"
    />
  );
}
