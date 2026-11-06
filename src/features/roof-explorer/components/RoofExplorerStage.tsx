"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useDocumentVisible } from "@/hooks/use-document-visible";
import { useInView } from "@/hooks/use-in-view";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { roofExplorer } from "@/lib/roofing-content";
import { cn } from "@/lib/utils";
import { useRoofExplorerActions, useRoofExplorerState } from "../RoofExplorerProvider";
import { RoofDiagram } from "./RoofDiagram";

// three.js only loads on the client, and only once the section is close to the viewport.
const RoofSectionCanvas = dynamic(() => import("../scene/RoofSectionCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * The 3D roof section, or a diagram of the same layers where WebGL isn't available. The canvas
 * starts downloading when the section is about a screen away, and stops rendering off screen.
 */
export function RoofExplorerStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const near = useInView(stageRef, "100% 0px");
  const visible = useDocumentVisible();
  const webgl = useWebGLSupport();
  const { sceneStatus } = useRoofExplorerState();
  const { setSceneStatus } = useRoofExplorerActions();
  const started = sceneStatus !== "idle";
  const showCanvas = webgl === "supported" && sceneStatus !== "failed" && (near || started);

  useEffect(() => {
    if (showCanvas && sceneStatus === "idle") {
      setSceneStatus("loading");
    }
  }, [showCanvas, sceneStatus, setSceneStatus]);

  const fallback = webgl === "unsupported" || sceneStatus === "failed";

  return (
    <div
      ref={stageRef}
      className="roof-stage relative aspect-square w-full overflow-hidden rounded-[2rem] border border-white/10 sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[36rem]"
    >
      {fallback ? (
        <RoofDiagram />
      ) : (
        <div
          role="img"
          aria-label={`${roofExplorer.title}. ${roofExplorer.note}`}
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-700 motion-reduce:transition-none",
            sceneStatus === "ready" && "opacity-100",
          )}
        >
          {showCanvas ? <RoofSectionCanvas active={near && visible} /> : null}
        </div>
      )}
      <p className="pointer-events-none absolute right-5 bottom-4 left-5 text-[10px] tracking-label text-white/55 uppercase sm:text-[11px]">
        {roofExplorer.note}
      </p>
      <p role="status" className="sr-only">
        {fallback ? roofExplorer.fallback : ""}
      </p>
    </div>
  );
}
