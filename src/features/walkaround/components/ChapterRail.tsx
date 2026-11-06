"use client";

import type { MouseEvent } from "react";
import { serviceLinks, type ServiceName } from "@/lib/links";
import { walkaroundChrome } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import { chapterDomId, chapterIndexOf } from "../chapters";
import { useActiveChapter, useWalkaroundActions, useWalkaroundState } from "../WalkaroundProvider";

/**
 * Index of the chapters down the right edge on large screens. The HTML equivalent of clicking a
 * part of the house: each entry is a real in-page link that also works without JavaScript.
 */
export function ChapterRail() {
  const active = useActiveChapter();
  const { selected } = useWalkaroundState();
  const { goToChapter } = useWalkaroundActions();

  const onClick = (service: ServiceName) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    goToChapter(service);
  };

  return (
    <nav
      aria-label={walkaroundChrome.railLabel}
      className={cn(
        "pointer-events-auto absolute top-1/2 right-6 hidden -translate-y-1/2 transition-opacity duration-500 lg:block xl:right-10",
        active === 0 && "opacity-0 focus-within:opacity-100",
      )}
    >
      <ol className="flex flex-col items-end gap-1">
        {serviceLinks.map((service) => {
          const index = chapterIndexOf(service.name);
          const current = index === active;
          const inQuote = selected.includes(service.name);
          return (
            <li key={service.name}>
              <a
                href={`#${chapterDomId(service.name)}`}
                onClick={onClick(service.name)}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "group flex h-9 items-center gap-3 rounded-full pr-1 pl-3 text-[13px] font-medium text-white/55 transition-colors",
                  "hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-gold",
                  current && "text-white",
                )}
              >
                <span className={cn("transition-opacity", current ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")}>
                  {service.name}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "block h-0.5 rounded-full bg-white/40 transition-all duration-300",
                    current ? "w-8 bg-gold" : "w-4 group-hover:w-6",
                    inQuote && !current && "bg-gold/70",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
