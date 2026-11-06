"use client";

import { cn } from "@/lib/utils";
import { useHouseExplorer } from "./context";

/**
 * Note under the drawing that names the highlighted part and gives its one-line summary. It repeats
 * what the part's accessible name and description already say, so it is hidden from screen readers.
 */
export function ExplorerCaption({ className }: { className?: string }) {
  const { state, meta } = useHouseExplorer();
  const part = meta.parts.find((p) => p.id === state.highlighted);
  const picked = part ? state.selected.includes(part.id) : false;

  let action: string = meta.copy.action.explore;
  if (state.mode === "select") {
    action = picked ? meta.copy.action.selected : meta.copy.action.select;
  }

  return (
    <div aria-hidden className={cn("min-h-[6.5rem] border-t border-charcoal pt-3", className)}>
      {part ? (
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <span className="annotation pt-1.5 text-gold-800">{part.number}</span>
          <p className="flex flex-wrap items-baseline gap-x-3">
            <span className="font-display text-[28px] leading-8">{part.name}</span>
            <span className="annotation text-charcoal-700">{part.location}</span>
          </p>
          <p className="col-start-2 max-w-[60ch] text-[15px] leading-6">{part.summary}</p>
          <p className="annotation col-start-2 mt-1 text-charcoal-700">{action}</p>
        </div>
      ) : (
        <p className="annotation pt-1.5 text-charcoal-700">{meta.copy.figureNote}</p>
      )}
    </div>
  );
}
