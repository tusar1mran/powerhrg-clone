"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

// The server can't know the visitor's setting, so prerendered HTML assumes reduced motion. That
// way nothing starts moving before the real preference is read on the client.
function getServerSnapshot(): boolean {
  return true;
}

/** True when the visitor has asked the operating system to minimise motion. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
