"use client";

import { ListChecks, MousePointerClick } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isExplorerMode } from "@/hooks/use-house-explorer";
import { cn } from "@/lib/utils";
import { useHouseExplorer } from "./context";

/** Switches what picking a part does: open its page, or add it to the quote. */
export function ExplorerModeSwitch({ className }: { className?: string }) {
  const { state, actions, meta } = useHouseExplorer();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <ToggleGroup
        type="single"
        variant="segment"
        size="touch"
        spacing={0}
        value={state.mode}
        aria-label={meta.copy.modeLabel}
        onValueChange={(value) => {
          // Radix sends "" when the active item is pressed again; keep one mode selected.
          if (isExplorerMode(value)) {
            actions.setMode(value);
          }
        }}
      >
        <ToggleGroupItem value="explore">
          <MousePointerClick data-icon="inline-start" strokeWidth={1.75} />
          {meta.copy.modes.explore}
        </ToggleGroupItem>
        <ToggleGroupItem value="select">
          <ListChecks data-icon="inline-start" strokeWidth={1.75} />
          {meta.copy.modes.select}
        </ToggleGroupItem>
      </ToggleGroup>
      <p aria-live="polite" className="max-w-[46ch] text-[15px] leading-6 text-charcoal-700">
        {meta.copy.hint[state.mode]}
      </p>
    </div>
  );
}
