"use client";

import { useSyncExternalStore } from "react";
import { applyLayoutTokens, defaultLayout, layoutStorageKey, layouts, type LayoutPreset } from "@/lib/layouts";

const changeEvent = "sc-layout-change";

function readId() {
  try {
    const id = localStorage.getItem(layoutStorageKey);
    return id && layouts.some((l) => l.id === id) ? id : defaultLayout.id;
  } catch {
    return defaultLayout.id;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useLayoutId() {
  return useSyncExternalStore(subscribe, readId, () => defaultLayout.id);
}

export function useLayout(): LayoutPreset {
  const id = useLayoutId();
  return layouts.find((l) => l.id === id) ?? defaultLayout;
}

export function selectLayout(preset: LayoutPreset) {
  applyLayoutTokens(preset);
  try {
    localStorage.setItem(layoutStorageKey, preset.id);
  } catch {}
  window.dispatchEvent(new Event(changeEvent));
}
