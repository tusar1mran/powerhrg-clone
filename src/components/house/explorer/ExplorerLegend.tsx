"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import type { ReactNode } from "react";
import type { HousePart } from "@/lib/house/parts";
import { cn } from "@/lib/utils";
import { toneFor, useHouseExplorer, usePartHighlightHandlers } from "./context";

// Rows share one look in both modes; only the element (link or toggle button) changes.
const rowClass = cn(
  "group/row grid min-h-14 w-full grid-cols-[2.25rem_1fr_auto] items-start gap-x-3 rounded-md border border-transparent px-3 py-2.5 text-left transition-colors motion-reduce:transition-none",
  "hover:border-charcoal/20 focus-visible:border-charcoal focus-visible:outline-none",
  "data-[tone=highlight]:bg-gold-100 data-[tone=picked]:bg-gold-200 data-[tone=picked-highlight]:bg-gold",
);

function RowBody({ part, trailing }: { part: HousePart; trailing: ReactNode }) {
  return (
    <>
      <span
        aria-hidden
        className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-charcoal font-mono text-[12px] font-medium"
      >
        {part.number}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[16px] leading-6 font-semibold">{part.name}</span>
        <span className="annotation text-charcoal-700">{part.location}</span>
        {/* The summary is in the caption under the drawing on large screens. */}
        <span className="mt-1.5 text-[14px] leading-5 text-charcoal-700 lg:hidden">{part.summary}</span>
      </span>
      <span aria-hidden className="mt-1 flex size-6 items-center justify-center">
        {trailing}
      </span>
    </>
  );
}

function LegendLink({ part }: { part: HousePart }) {
  const { state } = useHouseExplorer();
  const handlers = usePartHighlightHandlers(part.id);

  return (
    <Link
      href={part.href}
      className={rowClass}
      data-tone={toneFor(part.id, state.highlighted, state.selected)}
      {...handlers}
    >
      <RowBody part={part} trailing={<ArrowUpRight className="size-4" strokeWidth={1.75} />} />
    </Link>
  );
}

function LegendToggle({ part }: { part: HousePart }) {
  const { state, actions } = useHouseExplorer();
  const handlers = usePartHighlightHandlers(part.id);
  const picked = state.selected.includes(part.id);

  return (
    <button
      type="button"
      aria-pressed={picked}
      className={rowClass}
      data-tone={toneFor(part.id, state.highlighted, state.selected)}
      onClick={() => actions.toggle(part.id)}
      {...handlers}
    >
      <RowBody
        part={part}
        trailing={
          picked ? (
            <span className="flex size-6 items-center justify-center rounded-full bg-charcoal text-gold">
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
          ) : (
            <span className="flex size-6 items-center justify-center rounded-full border border-charcoal">
              <Plus className="size-3.5" strokeWidth={2} />
            </span>
          )
        }
      />
    </button>
  );
}

/**
 * Numbered key to the drawing. It doubles as the accessible list alternative to the illustration:
 * every part can be opened (explore) or picked (build a quote) from here as well.
 */
export function ExplorerLegend({ className }: { className?: string }) {
  const { state, meta } = useHouseExplorer();
  const selecting = state.mode === "select";
  const Row = selecting ? LegendToggle : LegendLink;
  // A list of links is navigation; a list of toggle buttons is just a labelled group.
  const Wrapper = selecting ? "div" : "nav";
  const headingId = "house-legend-heading";

  return (
    <Wrapper role={selecting ? "group" : undefined} aria-labelledby={headingId} className={className}>
      <h2 id={headingId} className="annotation mb-3 text-charcoal-700">
        {meta.copy.legendTitle}
      </h2>
      <ol className="grid gap-1 sm:grid-cols-2 lg:gap-x-2">
        {meta.parts.map((part) => (
          <li key={part.id}>
            <Row part={part} />
          </li>
        ))}
      </ol>
    </Wrapper>
  );
}
