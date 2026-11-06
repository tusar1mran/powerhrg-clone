"use client";

import Link from "next/link";
import { ArrowRightIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { buildQuoteHref } from "@/lib/quote/quote-params";
import { selectionTray } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import { useWalkaroundActions, useWalkaroundState } from "../WalkaroundProvider";

/**
 * The services picked during the tour, with a link that carries them to the quote form
 * (/support?service=...#quote). A polite live region reads out every change.
 */
export function SelectionTray() {
  const { selected, announcement } = useWalkaroundState();
  const { removeService, clearSelection } = useWalkaroundActions();
  const open = selected.length > 0;

  return (
    <>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <aside
        aria-label={selectionTray.label}
        inert={!open}
        className={cn(
          "dark fixed inset-x-3 top-[7.5rem] z-40 transition-all duration-300 lg:inset-x-auto lg:top-auto lg:right-10 lg:bottom-8 lg:w-[400px]",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0 lg:translate-y-2",
        )}
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-charcoal-950/80 p-3 shadow-2xl backdrop-blur-xl lg:p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-[12px] font-semibold tracking-label text-gold uppercase">
              {selectionTray.label}
              <span className="ml-2 text-white/50 tabular-nums">{selected.length}</span>
              {/* small screens list the names in one line instead of as removable chips */}
              <span className="ml-2 tracking-normal text-white/80 normal-case lg:hidden">{selected.join(", ")}</span>
            </p>
            <Button type="button" variant="ghost" size="sm" onClick={clearSelection} className="shrink-0 text-white/60">
              {selectionTray.clear}
            </Button>
          </div>
          <p className="hidden text-[13px] leading-snug text-white/60 lg:block">{selectionTray.hint}</p>
          <ul className="hidden flex-wrap gap-1.5 lg:flex">
            {selected.map((service) => (
              <li key={service}>
                <Badge variant="secondary" className="h-7 gap-1 rounded-full pr-1 pl-3 text-[13px]">
                  {service}
                  <button
                    type="button"
                    onClick={() => removeService(service)}
                    aria-label={selectionTray.remove(service)}
                    className="inline-flex size-5 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <XIcon aria-hidden className="size-3" />
                  </button>
                </Badge>
              </li>
            ))}
          </ul>
          <Link
            href={buildQuoteHref(selected)}
            className={cn(buttonVariants(), "h-11 rounded-full text-[14px] font-semibold")}
          >
            {selectionTray.cta}
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </div>
      </aside>
    </>
  );
}
