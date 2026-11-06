"use client";

import { createContext, use, useCallback, useMemo, useState, type ReactNode } from "react";
import { roofExplorer, roofLayers, type RoofLayerId } from "@/lib/roofing-content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type RoofViewId = (typeof roofExplorer.views)[number]["id"];
export type RoofSceneStatus = "idle" | "loading" | "ready" | "failed";

export type RoofExplorerState = {
  /** How far apart the layers are drawn, 0 (installed) to 1 (fully separated). */
  explode: number;
  /** The layer being explained, or null for the whole system. */
  layer: RoofLayerId | null;
  /** Camera preset. Dragging the model leaves the preset until another one is picked. */
  view: RoofViewId;
  /** Increases every time a view is picked, so picking the same view again re-centres the camera. */
  viewRequest: number;
  sceneStatus: RoofSceneStatus;
};

export type RoofExplorerActions = {
  setExplode: (value: number) => void;
  selectLayer: (layer: RoofLayerId | null) => void;
  setView: (view: RoofViewId) => void;
  setSceneStatus: (status: RoofSceneStatus) => void;
};

export type RoofExplorerMeta = { reducedMotion: boolean };

type ContextValue = { state: RoofExplorerState; actions: RoofExplorerActions; meta: RoofExplorerMeta };

const RoofExplorerContext = createContext<ContextValue | null>(null);

function useRoofExplorerContext(): ContextValue {
  const value = use(RoofExplorerContext);
  if (!value) {
    throw new Error("Roof explorer hooks must be used inside <RoofExplorerProvider>");
  }
  return value;
}

export function useRoofExplorerState(): RoofExplorerState {
  return useRoofExplorerContext().state;
}

export function useRoofExplorerActions(): RoofExplorerActions {
  return useRoofExplorerContext().actions;
}

export function useRoofExplorerMeta(): RoofExplorerMeta {
  return useRoofExplorerContext().meta;
}

const layerIds = new Set<string>(roofLayers.map((layer) => layer.id));
const viewIds = new Set<string>(roofExplorer.views.map((view) => view.id));

export function isRoofLayerId(value: string): value is RoofLayerId {
  return layerIds.has(value);
}

export function isRoofViewId(value: string): value is RoofViewId {
  return viewIds.has(value);
}

/** Starts slightly separated, so it is obvious at a glance that the roof is made of layers. */
const INITIAL_EXPLODE = 0.35;

/**
 * Owns the roof explorer state: separation, selected layer, camera preset. The HTML controls and
 * the 3D scene both read and change it through the hooks above, so every action in the canvas
 * also exists as a control on the page.
 */
export function RoofExplorerProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [explode, setExplodeState] = useState(INITIAL_EXPLODE);
  const [layer, setLayer] = useState<RoofLayerId | null>(null);
  const [view, setViewState] = useState<RoofViewId>(roofExplorer.views[0].id);
  const [viewRequest, setViewRequest] = useState(0);
  const [sceneStatus, setSceneStatus] = useState<RoofSceneStatus>("idle");

  const setExplode = useCallback((value: number) => {
    setExplodeState(Math.min(Math.max(value, 0), 1));
  }, []);

  const setView = useCallback((next: RoofViewId) => {
    setViewState(next);
    setViewRequest((count) => count + 1);
  }, []);

  const value = useMemo<ContextValue>(
    () => ({
      state: { explode, layer, view, viewRequest, sceneStatus },
      actions: { setExplode, selectLayer: setLayer, setView, setSceneStatus },
      meta: { reducedMotion },
    }),
    [explode, layer, view, viewRequest, sceneStatus, setExplode, setView, reducedMotion],
  );

  return <RoofExplorerContext value={value}>{children}</RoofExplorerContext>;
}
