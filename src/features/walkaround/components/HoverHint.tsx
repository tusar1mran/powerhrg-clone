"use client";

import { walkaroundChrome } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import { useWalkaroundState } from "../WalkaroundProvider";

/**
 * Says what a click on the part under the pointer will do. Pointer-only feedback: keyboard and
 * screen-reader users get the same actions as buttons and links in the chapter panels.
 */
export function HoverHint() {
  const { hovered, mode } = useWalkaroundState();
  const text = hovered
    ? mode === "select"
      ? walkaroundChrome.hoverSelect(hovered)
      : walkaroundChrome.hoverExplore(hovered)
    : "";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-charcoal-950/70 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-xl transition-opacity duration-200 lg:bottom-10",
        hovered ? "opacity-100" : "opacity-0",
      )}
    >
      {text}
    </div>
  );
}
