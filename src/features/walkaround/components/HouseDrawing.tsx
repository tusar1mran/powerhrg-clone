"use client";

import type { ServiceName } from "@/lib/links";
import { walkaroundChrome } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import { chapters } from "../chapters";
import { useActiveChapter } from "../WalkaroundProvider";

const upperWindows = [105, 235, 365];
const lowerWindows = [105, 365];

/** Stroke and fill for a part of the drawing: gold while its chapter is on screen. */
function partClass(part: ServiceName, active: ServiceName | null) {
  if (active === null) {
    return "text-white/70";
  }
  return part === active ? "text-gold" : "text-white/25";
}

/**
 * Static front elevation of the house, shown instead of the 3D view when WebGL isn't available.
 * The part of the house for the chapter on screen is drawn in gold, matching the 3D highlight.
 */
export function HouseDrawing() {
  const activeIndex = useActiveChapter();
  const active = chapters[activeIndex]?.service ?? null;

  return (
    <div className="absolute inset-0 flex items-start justify-center px-6 pt-[18svh] lg:items-center lg:justify-end lg:pt-0 lg:pr-[10vw]">
      <svg
        role="img"
        aria-label={walkaroundChrome.stageDescription}
        viewBox="0 0 520 360"
        className="h-auto w-full max-w-[640px] lg:w-[48vw]"
        fill="none"
        strokeWidth={2}
        strokeLinejoin="round"
      >
        <g className={cn("transition-colors duration-500", partClass("Insulation", active))}>
          <path d="M84 138 L260 52 L436 138 Z" stroke="currentColor" strokeDasharray="5 6" fill="currentColor" fillOpacity={0.08} />
        </g>
        <g className={cn("transition-colors duration-500", partClass("Roofing", active))}>
          <path d="M36 146 L260 36 L484 146" stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
          <path d="M60 146 L260 48 L460 146" stroke="currentColor" />
          <rect x="300" y="44" width="26" height="54" stroke="currentColor" />
        </g>
        <g className={cn("transition-colors duration-500", partClass("Siding", active))}>
          <rect x="60" y="146" width="400" height="176" stroke="currentColor" />
          {[166, 186, 206, 226, 246, 266, 286, 306].map((y) => (
            <line key={y} x1="60" x2="460" y1={y} y2={y} stroke="currentColor" strokeOpacity={0.35} strokeWidth={1} />
          ))}
        </g>
        <g className={cn("transition-colors duration-500", partClass("Windows", active))}>
          {upperWindows.map((x) => (
            <g key={`u${x}`}>
              <rect x={x} y="166" width="50" height="62" stroke="currentColor" fill="var(--color-charcoal-950)" />
              <line x1={x} x2={x + 50} y1="197" y2="197" stroke="currentColor" />
            </g>
          ))}
          {lowerWindows.map((x) => (
            <g key={`l${x}`}>
              <rect x={x} y="246" width="50" height="62" stroke="currentColor" fill="var(--color-charcoal-950)" />
              <line x1={x} x2={x + 50} y1="277" y2="277" stroke="currentColor" />
            </g>
          ))}
        </g>
        <g className={cn("transition-colors duration-500", partClass("Doors", active))}>
          <rect x="238" y="240" width="44" height="82" stroke="currentColor" fill="currentColor" fillOpacity={0.15} />
          <circle cx="274" cy="284" r="2.5" fill="currentColor" />
          <path d="M222 232 H298" stroke="currentColor" strokeWidth={4} />
        </g>
        <g className={cn("transition-colors duration-500", partClass("Accessories", active))}>
          <path d="M40 150 H480" stroke="currentColor" strokeWidth={4} />
          <path d="M52 150 V322 M468 150 V322" stroke="currentColor" strokeWidth={3} />
          {[...upperWindows, ...lowerWindows].map((x, index) => {
            const y = index < upperWindows.length ? 166 : 246;
            return (
              <g key={`s${index}`}>
                <rect x={x - 16} y={y} width="12" height="62" stroke="currentColor" />
                <rect x={x + 54} y={y} width="12" height="62" stroke="currentColor" />
              </g>
            );
          })}
        </g>
        <rect x="52" y="322" width="416" height="12" className="text-white/30" stroke="currentColor" />
        <line x1="0" x2="520" y1="334" y2="334" className="text-white/20" stroke="currentColor" />
      </svg>
    </div>
  );
}
