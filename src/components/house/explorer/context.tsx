"use client";

import { createContext, use, useMemo, type ReactNode } from "react";
import type { ExplorerCopy } from "@/lib/house-content";
import type { HousePart } from "@/lib/house/parts";
import type { ServiceName } from "@/lib/links";
import { useHouseExplorerState, type ExplorerMode } from "@/hooks/use-house-explorer";
import type { PartTone } from "../drawing/HouseArt";

type HouseExplorerContextValue = {
  state: {
    mode: ExplorerMode;
    highlighted: ServiceName | null;
    selected: readonly ServiceName[];
    quoteHref: string;
  };
  actions: {
    setMode: (mode: ExplorerMode) => void;
    highlight: (id: ServiceName) => void;
    unhighlight: (id: ServiceName) => void;
    toggle: (id: ServiceName) => void;
    remove: (id: ServiceName) => void;
    clear: () => void;
  };
  meta: {
    parts: readonly HousePart[];
    copy: ExplorerCopy;
    /** id of the hidden element holding a part's one-line summary, for aria-describedby. */
    descriptionId: (id: ServiceName) => string;
  };
};

const HouseExplorerContext = createContext<HouseExplorerContextValue | null>(null);

export function useHouseExplorer(): HouseExplorerContextValue {
  const context = use(HouseExplorerContext);
  if (!context) {
    throw new Error("HouseExplorer parts must be rendered inside <HouseExplorer>.");
  }
  return context;
}

const descriptionId = (id: ServiceName): string => `house-part-${id.toLowerCase()}-summary`;

type Props = {
  parts: readonly HousePart[];
  copy: ExplorerCopy;
  children: ReactNode;
};

/**
 * Root of the interactive house. Owns the explorer state and shares it with the drawing, legend,
 * mode switch, caption and quote tray, which can be laid out anywhere inside it.
 */
export function HouseExplorer({ parts, copy, children }: Props) {
  const explorer = useHouseExplorerState();
  const { mode, highlighted, selected, quoteHref, setMode, highlight, unhighlight, toggle, remove, clear } = explorer;

  const value = useMemo<HouseExplorerContextValue>(
    () => ({
      state: { mode, highlighted, selected, quoteHref },
      actions: { setMode, highlight, unhighlight, toggle, remove, clear },
      meta: { parts, copy, descriptionId },
    }),
    [mode, highlighted, selected, quoteHref, setMode, highlight, unhighlight, toggle, remove, clear, parts, copy],
  );

  return (
    <HouseExplorerContext value={value}>
      {children}
      {/* One summary per part, referenced by aria-describedby from the drawing and the legend. */}
      <div hidden>
        {parts.map((part) => (
          <p key={part.id} id={descriptionId(part.id)}>
            {part.summary}
          </p>
        ))}
      </div>
    </HouseExplorerContext>
  );
}

export function toneFor(id: ServiceName, highlighted: ServiceName | null, selected: readonly ServiceName[]): PartTone {
  const picked = selected.includes(id);
  const lit = highlighted === id;
  if (picked) {
    return lit ? "picked-highlight" : "picked";
  }
  return lit ? "highlight" : "rest";
}

/** Pointer and focus handlers that keep the highlighted part in sync across drawing and legend. */
export function usePartHighlightHandlers(id: ServiceName) {
  const { actions } = useHouseExplorer();
  const { highlight, unhighlight } = actions;

  return useMemo(
    () => ({
      onPointerEnter: () => highlight(id),
      onPointerLeave: () => unhighlight(id),
      onFocus: () => highlight(id),
      onBlur: () => unhighlight(id),
    }),
    [highlight, unhighlight, id],
  );
}
