"use client";

import { roofLayers } from "@/lib/roofing-content";
import { cn } from "@/lib/utils";
import { useRoofExplorerState } from "../RoofExplorerProvider";

/** Bar heights for the diagram, bottom layer first. Illustrative, like the 3D view. */
const barClass: Record<(typeof roofLayers)[number]["id"], string> = {
  deck: "h-8 bg-[#c9a46c]",
  iceWater: "h-3 bg-[#2d3134] ring-1 ring-white/20",
  underlayment: "h-3 bg-[#c6ced3]",
  dripEdge: "h-2 bg-[#d4d6d6]",
  shingles: "h-6 bg-[repeating-linear-gradient(90deg,#6f6b65_0_22px,#8f8a83_22px_44px)]",
  ridgeVent: "h-4 w-1/3 self-center bg-[#34383a]",
};

/**
 * Static stack of the roof layers, shown instead of the 3D section when WebGL isn't available.
 * The layer picked in the list is outlined in gold, like the highlight in the 3D view.
 */
export function RoofDiagram() {
  const { layer: selected, explode } = useRoofExplorerState();
  const gap = Math.round(4 + explode * 18);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <ol className="flex w-full max-w-md flex-col-reverse" style={{ gap }} aria-hidden>
        {roofLayers.map((layer) => (
          <li key={layer.id} className="flex flex-col gap-1.5">
            <span className={cn("block w-full rounded-sm transition-shadow", barClass[layer.id], selected === layer.id && "ring-2 ring-gold")} />
            <span className={cn("text-[12px] font-medium text-white/70", selected === layer.id && "text-gold")}>{layer.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
