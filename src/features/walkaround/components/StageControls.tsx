"use client";

import { MousePointerClickIcon, MoonIcon, PlusSquareIcon, SunIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { walkaroundChrome } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import {
  useActiveChapter,
  useWalkaroundActions,
  useWalkaroundState,
  type InteractionMode,
  type TimeOfDay,
} from "../WalkaroundProvider";

const modes: readonly InteractionMode[] = ["explore", "select"];
const times: readonly TimeOfDay[] = ["day", "dusk"];

function isOneOf<T extends string>(options: readonly T[], value: string | undefined): value is T {
  return value !== undefined && (options as readonly string[]).includes(value);
}

const groupClass = "rounded-full border border-white/10 bg-charcoal-950/60 p-1 backdrop-blur-xl";
const itemClass =
  "h-8 rounded-full px-2.5 text-[12px] text-white/70 aria-pressed:bg-white/12 aria-pressed:text-white sm:px-3 sm:text-[13px]";

/**
 * What a click on the house does (jump to the chapter, or add it to the quote) and the light.
 * Shown once the tour has started, so it never covers the hero text on small screens.
 */
export function StageControls() {
  const { mode, timeOfDay, sceneStatus } = useWalkaroundState();
  const { setMode, setTimeOfDay } = useWalkaroundActions();
  const touring = useActiveChapter() > 0;
  const shown = touring && sceneStatus === "ready";

  return (
    <div
      inert={!shown}
      className={cn(
        "pointer-events-auto absolute inset-x-3 top-[4.75rem] flex items-center justify-between gap-2 transition-opacity duration-500 lg:inset-x-auto lg:top-20 lg:right-10 lg:justify-end",
        shown ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex items-center gap-2">
        <span id="walkaround-mode-label" className="sr-only">
          {walkaroundChrome.modeLabel}
        </span>
        <ToggleGroup
          aria-labelledby="walkaround-mode-label"
          value={[mode]}
          onValueChange={(value) => {
            const next = value[0];
            if (isOneOf(modes, next)) {
              setMode(next);
            }
          }}
          spacing={1}
          className={groupClass}
        >
          <ToggleGroupItem value="explore" className={itemClass}>
            <MousePointerClickIcon data-icon="inline-start" />
            {walkaroundChrome.modes.explore}
          </ToggleGroupItem>
          <ToggleGroupItem value="select" className={itemClass}>
            <PlusSquareIcon data-icon="inline-start" />
            {walkaroundChrome.modes.select}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-2">
        <span id="walkaround-time-label" className="sr-only">
          {walkaroundChrome.timeLabel}
        </span>
        <ToggleGroup
          aria-labelledby="walkaround-time-label"
          value={[timeOfDay]}
          onValueChange={(value) => {
            const next = value[0];
            if (isOneOf(times, next)) {
              setTimeOfDay(next);
            }
          }}
          spacing={1}
          className={groupClass}
        >
          <ToggleGroupItem value="day" className={itemClass}>
            <SunIcon data-icon="inline-start" />
            {walkaroundChrome.times.day}
          </ToggleGroupItem>
          <ToggleGroupItem value="dusk" className={itemClass}>
            <MoonIcon data-icon="inline-start" />
            {walkaroundChrome.times.dusk}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
