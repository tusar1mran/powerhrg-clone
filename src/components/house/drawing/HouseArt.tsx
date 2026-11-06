// Line art for the front-elevation house drawing. These are plain presentational SVG fragments with
// no state, so the interactive homepage drawing and the small static "key plan" thumbnails can both
// compose them. Highlighting is driven by the `data-tone` / `data-picked` attributes of the nearest
// `group/part` ancestor (see HousePartGroup and the explorer controls).
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ServiceName } from "@/lib/links";
import {
  MARKER_RADIUS,
  atticFace,
  atticInsulation,
  atticJoist,
  atticSection,
  atticVent,
  atticVentLouvers,
  beltBoard,
  chimney,
  chimneyBricks,
  chimneyCap,
  chimneyFlashing,
  cornerBoards,
  door,
  downspouts,
  foundation,
  foundationJoints,
  gableRake,
  groundLine,
  groundTicks,
  gutter,
  gutterHangers,
  houseViewBox,
  lapLines,
  ridgeVent,
  ridgeVentTicks,
  roofOutline,
  shingleCourses,
  shingleTabs,
  shrubs,
  shutterLouvers,
  shutters,
  wall,
  windows,
  walkway,
  type HitShape,
} from "./geometry";

/** Visual state of one part. "picked" means it is in the visitor's quote. */
export type PartTone = "rest" | "highlight" | "picked" | "picked-highlight";

const fillStates =
  "transition-[fill] duration-200 motion-reduce:transition-none group-data-[tone=highlight]/part:fill-gold-100 group-data-[tone=picked]/part:fill-gold-200 group-data-[tone=picked-highlight]/part:fill-gold";

const surface = cn("fill-paper stroke-charcoal", fillStates);
const glass = cn("fill-glass stroke-charcoal", fillStates);
const shade = cn("fill-paper-2 stroke-charcoal", fillStates);
/** Fine detail lines; hidden on small thumbnails via the `house-detail` class. */
const detail = "house-detail fill-none stroke-charcoal/55";

const OUTLINE = 1.75;
const FINE = 1;

/** The root <svg>. Strokes keep their pixel width at any size so the linework stays crisp. */
export function HouseCanvas({ className, children, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox={houseViewBox}
      className={cn("block h-auto w-full [&_*]:[vector-effect:non-scaling-stroke]", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

/** Wraps one part's art so its fills react to the tone. Used directly by the static thumbnails. */
export function HousePartGroup({
  tone = "rest",
  picked = false,
  children,
}: {
  tone?: PartTone;
  picked?: boolean;
  children: ReactNode;
}) {
  return (
    <g className="group/part" data-tone={tone} data-picked={picked || undefined}>
      {children}
    </g>
  );
}

export function RoofArt() {
  return (
    <>
      <rect {...chimney} className={shade} strokeWidth={OUTLINE} />
      <path d={chimneyBricks} className={detail} strokeWidth={FINE} />
      <rect {...chimneyCap} className={surface} strokeWidth={OUTLINE} />
      <polygon points={roofOutline} className={surface} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <path d={shingleCourses} className={detail} strokeWidth={FINE} />
      <path d={shingleTabs} className="house-detail fill-none stroke-charcoal/35" strokeWidth={FINE} />
      <path d={chimneyFlashing} className={shade} strokeWidth={FINE} />
      <rect {...ridgeVent} className={shade} strokeWidth={OUTLINE} />
      <path d={ridgeVentTicks} className={detail} strokeWidth={FINE} />
      <path d={gableRake} fillRule="evenodd" className={surface} strokeWidth={OUTLINE} strokeLinejoin="round" />
    </>
  );
}

export function AtticArt() {
  return (
    <>
      <polygon points={atticFace} className={shade} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <path d={atticSection} className="house-detail fill-none stroke-charcoal/60" strokeWidth={FINE} strokeDasharray="6 4" />
      <path d={atticJoist} className="fill-none stroke-charcoal" strokeWidth={OUTLINE} />
      <path d={atticInsulation} className="house-detail fill-none stroke-charcoal/70" strokeWidth={FINE} strokeLinecap="round" />
      <circle {...atticVent} className={surface} strokeWidth={OUTLINE} />
      <path d={atticVentLouvers} className={detail} strokeWidth={FINE} />
    </>
  );
}

export function SidingArt() {
  return (
    <>
      <rect {...wall} className={surface} strokeWidth={OUTLINE} />
      <path d={lapLines} className={detail} strokeWidth={FINE} />
      {cornerBoards.map((board) => (
        <rect key={board.x} {...board} className={surface} strokeWidth={FINE} />
      ))}
      <rect {...beltBoard} className={surface} strokeWidth={FINE} />
    </>
  );
}

export function WindowsArt() {
  return (
    <>
      {windows.map((w) => {
        const meet = w.y + w.height / 2;
        const mid = w.x + w.width / 2;
        return (
          <g key={`${w.x}-${w.y}`}>
            <rect x={w.x - 12} y={w.y - 18} width={w.width + 24} height={10} className={surface} strokeWidth={OUTLINE} />
            <rect x={w.x - 6} y={w.y - 6} width={w.width + 12} height={w.height + 12} className={surface} strokeWidth={OUTLINE} />
            <rect {...w} className={glass} strokeWidth={FINE} />
            <path
              d={`M${w.x} ${meet}H${w.x + w.width}M${mid} ${w.y}V${w.y + w.height}`}
              className="fill-none stroke-charcoal"
              strokeWidth={OUTLINE}
            />
            <path
              d={`M${w.x + w.width - 14} ${w.y + 10}l-16 22M${w.x + w.width - 10} ${w.y + 24}l-10 14M${w.x + w.width - 14} ${meet + 10}l-16 22`}
              className="house-detail fill-none stroke-charcoal/30"
              strokeWidth={FINE}
              strokeLinecap="round"
            />
            <rect x={w.x - 10} y={w.y + w.height + 6} width={w.width + 20} height={8} className={surface} strokeWidth={OUTLINE} />
          </g>
        );
      })}
    </>
  );
}

export function DoorArt() {
  return (
    <>
      <polygon points={door.pediment} className={surface} strokeWidth={OUTLINE} strokeLinejoin="round" />
      <rect {...door.pedimentBase} className={surface} strokeWidth={OUTLINE} />
      <rect {...door.casing} className={surface} strokeWidth={OUTLINE} />
      <rect {...door.slab} className={shade} strokeWidth={OUTLINE} />
      {door.panels.map((panel) => (
        <rect key={`${panel.x}-${panel.y}`} {...panel} className={surface} strokeWidth={FINE} />
      ))}
      <circle {...door.knob} className="fill-charcoal" />
      {door.steps.map((step) => (
        <rect key={step.y} {...step} className={surface} strokeWidth={OUTLINE} />
      ))}
    </>
  );
}

export function AccessoriesArt() {
  return (
    <>
      {shutters.map((s) => (
        <g key={`${s.x}-${s.y}`}>
          <rect {...s} className={shade} strokeWidth={FINE} />
          <path d={shutterLouvers(s)} className={detail} strokeWidth={FINE} />
        </g>
      ))}
      {downspouts.map((spout) => (
        <g key={spout.pipe.x}>
          <rect {...spout.pipe} className={surface} strokeWidth={OUTLINE} />
          <polygon points={spout.elbow} className={surface} strokeWidth={OUTLINE} strokeLinejoin="round" />
          {spout.brackets.map((b) => (
            <rect key={b.y} {...b} className={surface} strokeWidth={FINE} />
          ))}
        </g>
      ))}
      <rect {...gutter} rx={3} className={surface} strokeWidth={OUTLINE} />
      <path d={gutterHangers} className={detail} strokeWidth={FINE} />
    </>
  );
}

/** Ground, foundation, path and shrubs. Decoration only, drawn before and after the parts. */
export function GroundBelow() {
  return (
    <g aria-hidden className="pointer-events-none">
      <path d={groundLine} className="fill-none stroke-charcoal" strokeWidth={OUTLINE} />
      <path d={groundTicks} className={detail} strokeWidth={FINE} />
      <path d={walkway} className="house-detail fill-none stroke-charcoal/60" strokeWidth={FINE} />
      <rect {...foundation} className="fill-paper-3 stroke-charcoal" strokeWidth={OUTLINE} />
      <path d={foundationJoints} className={detail} strokeWidth={FINE} />
    </g>
  );
}

export function GroundAbove() {
  return (
    <g aria-hidden className="pointer-events-none">
      {shrubs.map((d) => (
        <path key={d} d={d} className="fill-paper-2 stroke-charcoal" strokeWidth={OUTLINE} strokeLinejoin="round" />
      ))}
    </g>
  );
}

export const partArt: Record<ServiceName, ReactNode> = {
  Roofing: <RoofArt />,
  Insulation: <AtticArt />,
  Siding: <SidingArt />,
  Windows: <WindowsArt />,
  Doors: <DoorArt />,
  Accessories: <AccessoriesArt />,
};

/** Transparent hit shapes. They also draw the dashed keyboard focus outline. */
export function PartHitArea({ shapes }: { shapes: readonly HitShape[] }) {
  const className =
    "fill-transparent stroke-transparent group-focus-visible/part:stroke-charcoal group-focus-visible/part:fill-charcoal/5";
  return (
    <>
      {shapes.map((shape) =>
        shape.kind === "rect" ? (
          <rect
            key={`r-${shape.rect.x}-${shape.rect.y}`}
            {...shape.rect}
            className={className}
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        ) : (
          <polygon
            key={`p-${shape.points}`}
            points={shape.points}
            className={className}
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        ),
      )}
    </>
  );
}

/** Numbered drawing bubble. Shows a check mark instead of the number once the part is picked. */
export function PartMarker({ x, y, number }: { x: number; y: number; number: string }) {
  return (
    <g aria-hidden className="pointer-events-none">
      <circle
        cx={x}
        cy={y}
        r={MARKER_RADIUS}
        className="fill-paper stroke-charcoal transition-[fill] duration-200 motion-reduce:transition-none group-data-[tone=highlight]/part:fill-gold group-data-picked/part:fill-charcoal"
        strokeWidth={1.5}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={15}
        className="fill-charcoal font-mono font-medium group-data-picked/part:hidden"
      >
        {number}
      </text>
      <path
        d={`M${x - 7} ${y}l5 5l9 -10`}
        className="hidden fill-none stroke-gold group-data-picked/part:inline"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
