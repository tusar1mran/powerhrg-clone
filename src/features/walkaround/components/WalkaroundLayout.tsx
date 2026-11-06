"use client";

import { useRef, type ReactNode } from "react";
import { WalkaroundProvider, useWalkaroundMeta } from "../WalkaroundProvider";
import { useTimelineScroll } from "../use-timeline-scroll";

/**
 * The walk-around is composed from parts, so the page decides what goes in it:
 *
 *   <WalkaroundRoot>
 *     <WalkaroundStage />          sticky 3D view (or drawing), pinned behind the text
 *     <WalkaroundTrack>            the scrolling HTML: hero, then one section per chapter
 *       ...
 *     </WalkaroundTrack>
 *     <SelectionTray />
 *   </WalkaroundRoot>
 */
export function WalkaroundRoot({ children }: { children: ReactNode }) {
  return (
    <WalkaroundProvider>
      <div className="relative isolate">{children}</div>
    </WalkaroundProvider>
  );
}

/**
 * Scrolls over the stage (pulled up by one screen so it starts on top of it) and drives the scroll
 * timeline. Empty areas let pointer events through to the 3D house; text and controls opt back in.
 */
export function WalkaroundTrack({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { timeline } = useWalkaroundMeta();
  useTimelineScroll(trackRef, timeline);

  return (
    <div ref={trackRef} className="pointer-events-none relative z-10 -mt-[100svh]">
      {children}
    </div>
  );
}
