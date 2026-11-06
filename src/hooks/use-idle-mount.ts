"use client";

import { useEffect, useState } from "react";

/**
 * Becomes true once the browser has been idle for a moment after hydration (or after `timeout` ms
 * at the latest). Used to start downloading the 3D bundle without competing with first paint.
 */
export function useIdleMount(enabled: boolean, timeout = 1200): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(() => setReady(true), { timeout });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = window.setTimeout(() => setReady(true), Math.min(timeout, 300));
    return () => window.clearTimeout(handle);
  }, [enabled, timeout]);

  return ready;
}
