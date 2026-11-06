"use client";

import { useEffect, useMemo, type DependencyList } from "react";

type Disposable = { dispose: () => void };

/** Calls `dispose()` on everything in `value`: a single object, an array, or a record of them. */
export function disposeAll(value: Disposable | readonly Disposable[] | Record<string, Disposable>): void {
  if ("dispose" in value && typeof value.dispose === "function") {
    value.dispose();
    return;
  }
  for (const item of Object.values(value)) {
    item.dispose();
  }
}

/**
 * Creates three.js resources (geometries, materials, textures) once and frees their GPU memory
 * when the component unmounts. R3F only disposes objects it created from JSX, so anything built by
 * hand in a factory must be released here.
 *
 * In development Strict Mode the cleanup can run before the component is used again; three.js
 * re-uploads disposed resources on their next render, so that is safe.
 */
export function useDisposable<T extends Disposable | readonly Disposable[] | Record<string, Disposable>>(
  factory: () => T,
  deps: DependencyList,
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- the caller controls when the resource is rebuilt
  const value = useMemo(factory, deps);

  useEffect(() => {
    return () => disposeAll(value);
  }, [value]);

  return value;
}
