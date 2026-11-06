"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useReducer,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { ServiceName } from "@/lib/links";
import { orderServices } from "@/lib/quote/quote-params";
import { selectionTray } from "@/lib/walkaround-content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { activeChapterIndex, chapterDomId, INTRO_DOM_ID } from "./chapters";
import { createTimelineStore, type TimelineStore } from "./timeline-store";

export type InteractionMode = "explore" | "select";
export type TimeOfDay = "day" | "dusk";
export type SceneStatus = "idle" | "loading" | "ready" | "failed";

export type WalkaroundState = {
  /** Services picked for the quote, in navigation order. */
  selected: readonly ServiceName[];
  /** What a click on the 3D house does: jump to that chapter, or toggle it in the quote. */
  mode: InteractionMode;
  timeOfDay: TimeOfDay;
  /** Part of the house under the pointer, if any. */
  hovered: ServiceName | null;
  sceneStatus: SceneStatus;
  /** Last change to the selection, read out by a live region. */
  announcement: string;
};

export type WalkaroundActions = {
  toggleService: (service: ServiceName) => void;
  removeService: (service: ServiceName) => void;
  clearSelection: () => void;
  setMode: (mode: InteractionMode) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  setHovered: Dispatch<SetStateAction<ServiceName | null>>;
  /** Handles a click on a part of the 3D house, according to the current mode. */
  activatePart: (service: ServiceName) => void;
  goToChapter: (service: ServiceName | null) => void;
  setSceneStatus: (status: SceneStatus) => void;
};

export type WalkaroundMeta = {
  timeline: TimelineStore;
  reducedMotion: boolean;
};

const StateContext = createContext<WalkaroundState | null>(null);
const ActionsContext = createContext<WalkaroundActions | null>(null);
const MetaContext = createContext<WalkaroundMeta | null>(null);

function required<T>(value: T | null, hook: string): T {
  if (value === null) {
    throw new Error(`${hook} must be used inside <WalkaroundProvider>`);
  }
  return value;
}

export function useWalkaroundState(): WalkaroundState {
  return required(use(StateContext), "useWalkaroundState");
}

export function useWalkaroundActions(): WalkaroundActions {
  return required(use(ActionsContext), "useWalkaroundActions");
}

export function useWalkaroundMeta(): WalkaroundMeta {
  return required(use(MetaContext), "useWalkaroundMeta");
}

/** Index of the chapter on screen. Re-renders only when the chapter changes, not on every scroll. */
export function useActiveChapter(): number {
  const { timeline } = useWalkaroundMeta();
  return useSyncExternalStore(
    timeline.subscribe,
    () => activeChapterIndex(timeline.get()),
    () => 0,
  );
}

function scrollToElement(id: string, reducedMotion: boolean): void {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }
  element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  // Move keyboard and screen-reader focus to the chapter that was opened from the 3D view.
  element.focus({ preventScroll: true });
}

type SelectionState = { selected: readonly ServiceName[]; announcement: string };

type SelectionAction =
  | { type: "toggle"; service: ServiceName }
  | { type: "remove"; service: ServiceName }
  | { type: "clear" };

const initialSelection: SelectionState = { selected: [], announcement: "" };

function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case "toggle": {
      if (state.selected.includes(action.service)) {
        return {
          selected: state.selected.filter((s) => s !== action.service),
          announcement: selectionTray.removed(action.service),
        };
      }
      return {
        selected: orderServices([...state.selected, action.service]),
        announcement: selectionTray.added(action.service),
      };
    }
    case "remove":
      return {
        selected: state.selected.filter((s) => s !== action.service),
        announcement: selectionTray.removed(action.service),
      };
    case "clear":
      return { selected: [], announcement: selectionTray.cleared };
  }
}

/**
 * Owns the walk-around state: the scroll timeline, the quote selection and the scene settings.
 * It is the only place that knows how this state is stored; components use the hooks above.
 */
export function WalkaroundProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [timeline] = useState(() => createTimelineStore());
  const [{ selected, announcement }, dispatch] = useReducer(selectionReducer, initialSelection);
  const [mode, setMode] = useState<InteractionMode>("explore");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [hovered, setHovered] = useState<ServiceName | null>(null);
  const [sceneStatus, setSceneStatus] = useState<SceneStatus>("idle");

  const toggleService = useCallback((service: ServiceName) => {
    dispatch({ type: "toggle", service });
  }, []);

  const removeService = useCallback((service: ServiceName) => {
    dispatch({ type: "remove", service });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const goToChapter = useCallback(
    (service: ServiceName | null) => {
      scrollToElement(service ? chapterDomId(service) : INTRO_DOM_ID, reducedMotion);
    },
    [reducedMotion],
  );

  const activatePart = useCallback(
    (service: ServiceName) => {
      if (mode === "select") {
        toggleService(service);
        return;
      }
      goToChapter(service);
    },
    [mode, toggleService, goToChapter],
  );

  const state = useMemo<WalkaroundState>(
    () => ({ selected, mode, timeOfDay, hovered, sceneStatus, announcement }),
    [selected, mode, timeOfDay, hovered, sceneStatus, announcement],
  );

  const actions = useMemo<WalkaroundActions>(
    () => ({
      toggleService,
      removeService,
      clearSelection,
      setMode,
      setTimeOfDay,
      setHovered,
      activatePart,
      goToChapter,
      setSceneStatus,
    }),
    [toggleService, removeService, clearSelection, activatePart, goToChapter],
  );

  const meta = useMemo<WalkaroundMeta>(() => ({ timeline, reducedMotion }), [timeline, reducedMotion]);

  return (
    <MetaContext value={meta}>
      <ActionsContext value={actions}>
        <StateContext value={state}>{children}</StateContext>
      </ActionsContext>
    </MetaContext>
  );
}
