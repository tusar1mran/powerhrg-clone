"use client";

import { useEffect, type RefObject } from "react";
import { computeTimeline, type SectionBox } from "./chapters";
import type { TimelineStore } from "./timeline-store";

/** Attribute that marks the service chapter sections inside the track, in order. */
export const CHAPTER_SECTION_ATTRIBUTE = "data-walkaround-chapter";

/**
 * Keeps the timeline store in sync with the page scroll. Section positions are measured on
 * layout changes only; scroll events just do a little arithmetic and write the store. The store
 * ignores unchanged values, the 3D scene batches its redraws into the next animation frame, and
 * React only re-renders when the active chapter changes, so no extra throttling is needed (and
 * none that depends on animation frames, which browsers may pause while nothing is animating).
 */
export function useTimelineScroll(trackRef: RefObject<HTMLElement | null>, store: TimelineStore): void {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    let sections: SectionBox[] = [];

    const update = () => {
      store.set(computeTimeline(sections, window.scrollY, window.innerHeight));
    };

    const measure = () => {
      const scrollY = window.scrollY;
      sections = Array.from(track.querySelectorAll<HTMLElement>(`[${CHAPTER_SECTION_ATTRIBUTE}]`), (element) => {
        const rect = element.getBoundingClientRect();
        return { top: rect.top + scrollY, height: rect.height };
      });
      update();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", update, { passive: true });
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
    };
  }, [trackRef, store]);
}
