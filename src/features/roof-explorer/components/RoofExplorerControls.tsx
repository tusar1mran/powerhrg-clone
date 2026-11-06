"use client";

import { useId } from "react";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { roofExplorer, roofLayers } from "@/lib/roofing-content";
import {
  isRoofLayerId,
  isRoofViewId,
  useRoofExplorerActions,
  useRoofExplorerState,
} from "../RoofExplorerProvider";

const ALL_LAYERS = "all";

const pillGroupClass = "rounded-full border border-white/10 bg-white/[0.04] p-1";
const pillItemClass =
  "h-9 rounded-full px-4 text-[13px] text-white/70 aria-pressed:bg-white/12 aria-pressed:text-white";

/** "Separate the layers": a slider from installed (0) to fully separated (100). */
export function ExplodeSlider() {
  const labelId = useId();
  const { explode } = useRoofExplorerState();
  const { setExplode } = useRoofExplorerActions();
  const percent = Math.round(explode * 100);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span id={labelId} className="text-[13px] font-semibold text-white">
          {roofExplorer.explodeLabel}
        </span>
        <span aria-hidden className="text-[12px] text-white/50 tabular-nums">
          {percent}%
        </span>
      </div>
      <Slider
        aria-labelledby={labelId}
        min={0}
        max={100}
        step={1}
        value={[percent]}
        onValueChange={(value) => {
          const next = Array.isArray(value) ? value[0] : value;
          if (typeof next === "number") {
            setExplode(next / 100);
          }
        }}
        className="py-2"
      />
    </div>
  );
}

/** Pick one layer to highlight and explain, or show the whole system. */
export function LayerList() {
  const labelId = useId();
  const { layer } = useRoofExplorerState();
  const { selectLayer } = useRoofExplorerActions();

  return (
    <div className="flex flex-col gap-3">
      <span id={labelId} className="sr-only">
        {roofExplorer.layersLabel}
      </span>
      <ToggleGroup
        aria-labelledby={labelId}
        orientation="vertical"
        spacing={0}
        value={[layer ?? ALL_LAYERS]}
        onValueChange={(value) => {
          const next = value[0];
          if (next === undefined || next === ALL_LAYERS) {
            selectLayer(null);
          } else if (isRoofLayerId(next)) {
            selectLayer(next);
          }
        }}
        className="w-full overflow-hidden rounded-2xl border border-white/10"
      >
        <ToggleGroupItem
          value={ALL_LAYERS}
          className="h-11 justify-start rounded-none px-4 text-[14px] text-white/70 aria-pressed:bg-white/10 aria-pressed:text-white"
        >
          {roofExplorer.allLayersLabel}
        </ToggleGroupItem>
        {roofLayers.map((item, index) => (
          <ToggleGroupItem
            key={item.id}
            value={item.id}
            className="h-11 justify-start gap-3 rounded-none border-t border-white/10 px-4 text-[14px] text-white/70 aria-pressed:bg-white/10 aria-pressed:text-white"
          >
            <span aria-hidden className="w-5 text-[12px] text-gold tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

/** Camera presets. The same as dragging the model to that angle. */
export function ViewPicker() {
  const labelId = useId();
  const { view } = useRoofExplorerState();
  const { setView } = useRoofExplorerActions();

  return (
    <div className="flex items-center gap-3">
      <span id={labelId} className="text-[13px] font-semibold text-white">
        {roofExplorer.viewsLabel}
      </span>
      <ToggleGroup
        aria-labelledby={labelId}
        spacing={1}
        value={[view]}
        onValueChange={(value) => {
          const next = value[0];
          if (next !== undefined && isRoofViewId(next)) {
            setView(next);
          }
        }}
        className={pillGroupClass}
      >
        {roofExplorer.views.map((item) => (
          <ToggleGroupItem key={item.id} value={item.id} className={pillItemClass}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

/** What the selected layer does, read out politely when the selection changes. */
export function LayerDetail() {
  const { layer } = useRoofExplorerState();
  const detail = roofLayers.find((item) => item.id === layer);

  return (
    <div aria-live="polite" className="min-h-[8.5rem] rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      {detail ? (
        <>
          <p className="text-[12px] font-semibold tracking-label text-gold uppercase">{detail.label}</p>
          <h3 className="mt-2 font-heading text-[22px] leading-tight font-semibold text-white">{detail.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-white/75">{detail.text}</p>
        </>
      ) : (
        <>
          <p className="text-[12px] font-semibold tracking-label text-gold uppercase">{roofExplorer.allLayersLabel}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/75">{roofExplorer.text}</p>
        </>
      )}
    </div>
  );
}
