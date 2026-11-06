"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHouseExplorer } from "./context";

/**
 * The visitor's quote list. Shown while building a quote, and afterwards whenever something is
 * still picked. The action carries the list to the quote form in the URL.
 */
export function ExplorerTray({ className }: { className?: string }) {
  const { state, actions, meta } = useHouseExplorer();
  const { tray } = meta.copy;
  const count = state.selected.length;

  if (state.mode !== "select" && count === 0) {
    return null;
  }

  const partsById = new Map(meta.parts.map((p) => [p.id, p]));

  return (
    <section
      aria-labelledby="house-tray-heading"
      className={cn("rounded-md border border-charcoal bg-paper-2 p-4 shadow-[3px_3px_0_0_var(--color-charcoal)]", className)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="house-tray-heading" className="font-display text-[26px] leading-8">
          {tray.title}
        </h2>
        <p aria-live="polite" className="annotation text-charcoal-700">
          {count} {count === 1 ? tray.countOne : tray.countOther}
        </p>
      </div>

      {count === 0 ? (
        <p className="mt-2 text-[15px] leading-6 text-charcoal-700">{tray.empty}</p>
      ) : (
        <ul className="mt-3 flex flex-wrap gap-2">
          {state.selected.map((id) => {
            const part = partsById.get(id);
            if (!part) {
              return null;
            }
            return (
              <li key={id}>
                <span className="inline-flex h-11 items-center gap-1 rounded-md border border-charcoal bg-gold-200 pl-3 text-[15px] font-semibold">
                  <span aria-hidden className="font-mono text-[12px] font-medium text-gold-800">
                    {part.number}
                  </span>
                  {part.name}
                  <button
                    type="button"
                    onClick={() => actions.remove(id)}
                    aria-label={`${tray.remove} ${part.name}`}
                    className="ml-1 flex size-11 items-center justify-center rounded-r-md hover:bg-gold focus-visible:outline-offset-[-2px]"
                  >
                    <X aria-hidden className="size-4" strokeWidth={2} />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button asChild size="touch">
          <Link href={state.quoteHref}>
            {tray.submit}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
        {count > 0 ? (
          <Button type="button" variant="ghost" size="touch" onClick={actions.clear}>
            {tray.clear}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
