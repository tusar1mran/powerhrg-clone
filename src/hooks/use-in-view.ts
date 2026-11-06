"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks whether an element is on screen (plus a margin), so 3D scenes can stop rendering when
 * they are scrolled away. Starts as `false` and turns true after the first observation.
 */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "200px 0px"): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) {
          setInView(entry.isIntersecting);
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
