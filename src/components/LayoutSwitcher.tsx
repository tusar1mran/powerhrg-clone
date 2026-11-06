"use client";

import { useEffect, useRef, useState } from "react";
import { Check, LayoutTemplate, RotateCcw, X } from "lucide-react";
import { defaultLayout, layouts, type LayoutPreset } from "@/lib/layouts";
import { selectLayout, useLayoutId } from "./layout/useLayout";

const typeLabel: Record<LayoutPreset["tokens"]["type"], string> = {
  serif: "Serif",
  editorial: "Editorial serif",
  sans: "Heavy sans",
  grotesk: "Grotesk",
  condensed: "Condensed caps",
  light: "Light sans",
  caps: "Serif caps",
  tech: "Tech sans",
};

const cornerLabel: Record<LayoutPreset["tokens"]["corners"], string> = {
  round: "Round",
  soft: "Soft",
  sharp: "Sharp",
  xl: "Extra round",
};

function Thumb({ preset }: { preset: LayoutPreset }) {
  const r = { round: "6px", soft: "3px", sharp: "0", xl: "9px" }[preset.tokens.corners];
  const { hero, services } = preset.sections;
  const block = "bg-brand";
  const soft = "bg-sand";
  return (
    <span aria-hidden className="flex h-14 w-16 shrink-0 flex-col gap-[3px] overflow-hidden border border-black/10 bg-paper p-[3px]" style={{ borderRadius: r }}>
      <span className="h-[3px] w-full bg-ink/20" />
      <span className="flex h-[24px] gap-[3px]">
        {hero === "split" || hero === "fullsplit" ? (
          <>
            <span className={`flex-1 ${hero === "fullsplit" ? block : "bg-ink/10"}`} style={{ borderRadius: r }} />
            <span className={`flex-1 ${soft}`} style={{ borderRadius: r }} />
          </>
        ) : hero === "editorial" ? (
          <span className="flex flex-1 flex-col gap-[2px]">
            <span className="h-[6px] w-3/4 bg-ink/40" />
            <span className={`flex-1 ${soft}`} style={{ borderRadius: r }} />
          </span>
        ) : hero === "card" ? (
          <span className={`flex flex-1 items-center justify-end p-[3px] ${block}`} style={{ borderRadius: r }}>
            <span className="h-full w-1/3 bg-white" style={{ borderRadius: r }} />
          </span>
        ) : (
          <span className={`flex flex-1 items-center ${hero === "centered" ? "justify-center" : "justify-start pl-[4px]"} ${block}`} style={{ borderRadius: r }}>
            <span className="h-[4px] w-1/2 bg-accent" />
          </span>
        )}
      </span>
      <span className="flex flex-1 gap-[3px]">
        {services === "list" ? (
          <span className="flex flex-1 flex-col justify-between">
            <span className="h-px bg-ink/30" />
            <span className="h-px bg-ink/30" />
            <span className="h-px bg-ink/30" />
          </span>
        ) : services === "bento" ? (
          <>
            <span className={`w-[60%] ${soft}`} style={{ borderRadius: r }} />
            <span className={`flex-1 ${soft}`} style={{ borderRadius: r }} />
          </>
        ) : (
          [0, 1, 2].map((i) => <span key={i} className={`flex-1 ${services === "tiles" ? "border border-ink/20" : soft}`} style={{ borderRadius: r }} />)
        )}
      </span>
    </span>
  );
}

export default function LayoutSwitcher() {
  const [open, setOpen] = useState(false);
  const active = useLayoutId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = layouts.find((l) => l.id === active) ?? defaultLayout;

  return (
    <div ref={rootRef} className="relative">
      {open && (
        <div
          id="layout-panel"
          role="dialog"
          aria-label="Choose a layout"
          className="fixed right-4 bottom-20 flex max-h-[min(680px,calc(100svh-120px))] w-[min(400px,calc(100vw-32px))] animate-[dropdown-in_180ms_ease-out] flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-[var(--shadow-float)] sm:right-6 sm:bottom-24"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="text-[16px] font-bold">Layout</p>
              <p className="text-[13px] text-muted">{layouts.length} layouts · combine with any colour theme</p>
            </div>
            <button type="button" aria-label="Close layout picker" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream">
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>

          <ul role="radiogroup" aria-label="Layouts" className="flex-1 overflow-y-auto p-2">
            {layouts.map((l) => {
              const selected = l.id === active;
              return (
                <li key={l.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => selectLayout(l)}
                    className={`flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors ${selected ? "bg-cream" : "hover:bg-cream/60"}`}
                  >
                    <Thumb preset={l} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold">{l.name}</span>
                      <span className="block text-[12.5px] leading-snug text-muted">{l.description}</span>
                      <span className="mt-1.5 flex flex-wrap gap-1">
                        {[typeLabel[l.tokens.type], cornerLabel[l.tokens.corners], l.tokens.panels === "bleed" ? "Full width" : "Panels"].map((tag) => (
                          <span key={tag} className="rounded-full bg-paper px-2 py-0.5 text-[11px] font-semibold text-muted ring-1 ring-line">
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                    {selected && <Check aria-hidden className="h-5 w-5 shrink-0 text-accent-ink" strokeWidth={2.5} />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-line p-3">
            <button
              type="button"
              onClick={() => selectLayout(defaultLayout)}
              className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[14px] font-semibold text-muted hover:bg-cream hover:text-ink"
            >
              <RotateCcw aria-hidden className="h-4 w-4" />
              Reset to default
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="layout-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-ink pr-5 pl-2 text-[14px] font-bold text-paper shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5"
      >
        <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink">
          <LayoutTemplate className="h-4 w-4" />
        </span>
        <span>
          Layout
          <span className="sr-only">: {current.name}</span>
        </span>
      </button>
    </div>
  );
}
