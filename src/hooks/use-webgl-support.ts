"use client";

import { useSyncExternalStore } from "react";

export type WebGLSupport = "pending" | "supported" | "unsupported";

let cached: WebGLSupport | null = null;

/**
 * Creates a throwaway canvas once and asks for a WebGL context. The answer can't change while the
 * page is open, so it is cached for the session. Context creation can throw in locked-down
 * browsers, which counts as unsupported.
 */
function detect(): WebGLSupport {
  if (cached) {
    return cached;
  }
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    cached = context ? "supported" : "unsupported";
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cached = "unsupported";
  }
  return cached;
}

function subscribe(): () => void {
  return () => {};
}

function getServerSnapshot(): WebGLSupport {
  return "pending";
}

/** Whether this browser can render the 3D scenes. "pending" during prerender and hydration. */
export function useWebGLSupport(): WebGLSupport {
  return useSyncExternalStore(subscribe, detect, getServerSnapshot);
}
