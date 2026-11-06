// State for the homepage house: which part is highlighted (hover / focus), whether picking a part
// opens its page or adds it to a quote, and which parts are in the quote. Kept apart from the
// drawing components so the UI only renders what this returns.
import { useCallback, useMemo, useState } from "react";
import type { ServiceName } from "@/lib/links";
import { sortByPaintOrder } from "@/lib/house/order";
import { buildQuoteHref } from "@/lib/quote/href";

export const explorerModes = ["explore", "select"] as const;
export type ExplorerMode = (typeof explorerModes)[number];

export function isExplorerMode(value: string): value is ExplorerMode {
  return (explorerModes as readonly string[]).includes(value);
}

export function useQuoteSelection() {
  const [selected, setSelected] = useState<readonly ServiceName[]>([]);

  const toggle = useCallback((id: ServiceName) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : sortByPaintOrder([...prev, id])));
  }, []);

  const remove = useCallback((id: ServiceName) => {
    setSelected((prev) => prev.filter((item) => item !== id));
  }, []);

  const clear = useCallback(() => {
    setSelected([]);
  }, []);

  const quoteHref = useMemo(() => buildQuoteHref(selected), [selected]);

  return { selected, toggle, remove, clear, quoteHref };
}

export function usePartHighlight() {
  const [highlighted, setHighlighted] = useState<ServiceName | null>(null);

  const highlight = useCallback((id: ServiceName) => {
    setHighlighted(id);
  }, []);

  // Only clear when leaving the part that is currently highlighted, so moving quickly from one
  // part to the next never blanks the caption.
  const unhighlight = useCallback((id: ServiceName) => {
    setHighlighted((current) => (current === id ? null : current));
  }, []);

  return { highlighted, highlight, unhighlight };
}

export function useHouseExplorerState() {
  const [mode, setMode] = useState<ExplorerMode>("explore");
  const selection = useQuoteSelection();
  const highlight = usePartHighlight();

  return { mode, setMode, ...selection, ...highlight };
}
