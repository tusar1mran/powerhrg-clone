"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Palette, RotateCcw, X } from "lucide-react";
import { defaultThemeId, themeStorageKey, themes, themeTokens, type Theme } from "@/lib/themes";

const swatchTokens = ["brand", "accent", "sand", "cream", "ink"] as const;

function applyTheme(theme: Theme) {
  const style = document.documentElement.style;
  for (const token of themeTokens) style.setProperty(`--color-${token}`, theme.colors[token]);
}

const changeEvent = "sc-theme-change";

function readStored() {
  try {
    const id = localStorage.getItem(themeStorageKey);
    return id && themes.some((t) => t.id === id) ? id : defaultThemeId;
  } catch {
    return defaultThemeId;
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

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const active = useSyncExternalStore(subscribe, readStored, () => defaultThemeId);
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

  const choose = (theme: Theme) => {
    applyTheme(theme);
    try {
      localStorage.setItem(themeStorageKey, theme.id);
    } catch {}
    window.dispatchEvent(new Event(changeEvent));
  };

  const current = themes.find((t) => t.id === active) ?? themes[0];

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-[90] sm:right-6 sm:bottom-6">
      {open && (
        <div
          id="theme-panel"
          role="dialog"
          aria-label="Choose a colour theme"
          className="absolute right-0 bottom-[calc(100%+12px)] flex max-h-[min(640px,calc(100svh-120px))] w-[min(360px,calc(100vw-32px))] animate-[dropdown-in_180ms_ease-out] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white text-ink shadow-[var(--shadow-float)]"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="text-[16px] font-bold">Colour theme</p>
              <p className="text-[13px] text-muted">{themes.length} palettes · preview across the site</p>
            </div>
            <button
              type="button"
              aria-label="Close theme picker"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>

          <ul role="radiogroup" aria-label="Themes" className="flex-1 overflow-y-auto p-2">
            {themes.map((t) => {
              const selected = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => choose(t)}
                    className={`flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors ${selected ? "bg-cream" : "hover:bg-cream/60"}`}
                  >
                    <span aria-hidden className="flex shrink-0 overflow-hidden rounded-lg border border-black/10">
                      {swatchTokens.map((k) => (
                        <span key={k} className="h-10 w-5" style={{ background: t.colors[k] }} />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold">{t.name}</span>
                      <span className="block text-[12.5px] leading-snug text-muted">{t.inspiration}</span>
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
              onClick={() => choose(themes[0])}
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
        aria-controls="theme-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-ink pr-5 pl-2 text-[14px] font-bold text-paper shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5"
      >
        <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: current.colors.accent }}>
          <Palette className="h-4 w-4" style={{ color: current.colors.ink }} />
        </span>
        Theme
      </button>
    </div>
  );
}
