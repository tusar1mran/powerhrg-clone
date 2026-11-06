"use client";

import { useEffect, type RefObject } from "react";
import { computeTimeline, type SectionBox } from "./chapters";
import type { TimelineStore } from "./timeline-store";

/** Attribute that marks the service chapter sections inside the track, in order. */
export const CHAPTER_SECTION_ATTRIBUTE = "data-walkaround-chapter";

/**
 * Keeps the timeline store in sync with the page scroll. Section positions are measured on
 * layout changes only; scroll events just do arithmetic, throttled to one update per frame.
 */
export function useTimelineScroll(trackRef: RefObject<HTMLElement | null>, store: TimelineStore): void {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    let sections: SectionBox[] = [];
    let frame = 0;

    const update = () => {
      frame = 0;
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

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [trackRef, store]);
}
