"use client";

import Link from "next/link";
import type { KeyboardEvent, ReactNode } from "react";
import type { HousePart } from "@/lib/house/parts";
import { cn } from "@/lib/utils";
import { hitAreas, markers } from "../drawing/geometry";
import { GroundAbove, GroundBelow, HouseCanvas, PartHitArea, PartMarker, partArt } from "../drawing/HouseArt";
import { toneFor, useHouseExplorer, usePartHighlightHandlers } from "./context";

const partClass = "group/part cursor-pointer outline-none";

type PartControlProps = { part: HousePart; children: ReactNode };

/** "Explore" mode: the part is a link to its service page. */
function PartLink({ part, children }: PartControlProps) {
  const { state, meta } = useHouseExplorer();
  const handlers = usePartHighlightHandlers(part.id);

  return (
    <Link
      href={part.href}
      aria-label={part.name}
      aria-describedby={meta.descriptionId(part.id)}
      className={partClass}
      data-tone={toneFor(part.id, state.highlighted, state.selected)}
      data-picked={state.selected.includes(part.id) || undefined}
      {...handlers}
    >
      {children}
    </Link>
  );
}

/** "Build a quote" mode: the part is a toggle button that adds it to, or removes it from, the quote. */
function PartToggle({ part, children }: PartControlProps) {
  const { state, actions, meta } = useHouseExplorer();
  const handlers = usePartHighlightHandlers(part.id);
  const picked = state.selected.includes(part.id);

  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      actions.toggle(part.id);
    }
  };

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={picked}
      aria-label={part.name}
      aria-describedby={meta.descriptionId(part.id)}
      className={partClass}
      data-tone={toneFor(part.id, state.highlighted, state.selected)}
      data-picked={picked || undefined}
      onClick={() => actions.toggle(part.id)}
      onKeyDown={onKeyDown}
      {...handlers}
    >
      {children}
    </g>
  );
}

/** The interactive front elevation. Every part is a link or a toggle, depending on the mode. */
export function ExplorerDrawing({ className }: { className?: string }) {
  const { state, meta } = useHouseExplorer();
  const Control = state.mode === "select" ? PartToggle : PartLink;

  return (
    <HouseCanvas role="group" aria-label={meta.copy.drawingLabel[state.mode]} className={cn("select-none", className)}>
      <GroundBelow />
      {meta.parts.map((part) => (
        <Control key={part.id} part={part}>
          {partArt[part.id]}
          <PartHitArea shapes={hitAreas[part.id]} />
          <PartMarker {...markers[part.id]} number={part.number} />
        </Control>
      ))}
      <GroundAbove />
    </HouseCanvas>
  );
}
