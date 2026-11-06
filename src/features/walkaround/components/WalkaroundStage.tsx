"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useDocumentVisible } from "@/hooks/use-document-visible";
import { useIdleMount } from "@/hooks/use-idle-mount";
import { useInView } from "@/hooks/use-in-view";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { walkaroundChrome } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import { useWalkaroundActions, useWalkaroundState } from "../WalkaroundProvider";
import { ChapterRail } from "./ChapterRail";
import { HouseDrawing } from "./HouseDrawing";
import { HoverHint } from "./HoverHint";
import { StageControls } from "./StageControls";

// three.js and the scene only download on the client, after the page is interactive.
const WalkaroundCanvas = dynamic(() => import("../scene/WalkaroundCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Picks what the stage shows: nothing extra while WebGL support is unknown, the 3D house when it
 * is available, or the static drawing when it isn't (or the GPU gives up). The canvas fades in over
 * the backdrop once its first frame is drawn, so the HTML hero always paints first.
 */
function StageView({ active }: { active: boolean }) {
  const webgl = useWebGLSupport();
  const { sceneStatus } = useWalkaroundState();
  const { setSceneStatus } = useWalkaroundActions();
  const supported = webgl === "supported";
  const ready = useIdleMount(supported);

  useEffect(() => {
    if (ready) {
      setSceneStatus("loading");
    }
  }, [ready, setSceneStatus]);

  if (webgl === "unsupported" || sceneStatus === "failed") {
    return <HouseDrawing />;
  }
  if (!supported || !ready) {
    return null;
  }

  return (
    <div
      role="img"
      aria-label={walkaroundChrome.stageDescription}
      className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none",
        sceneStatus === "ready" && "opacity-100",
      )}
    >
      <WalkaroundCanvas active={active} />
    </div>
  );
}

/** Live status for screen readers: loading, or why the drawing is shown instead of the 3D view. */
function StageStatus() {
  const webgl = useWebGLSupport();
  const { sceneStatus } = useWalkaroundState();

  let message = "";
  if (webgl === "unsupported" || sceneStatus === "failed") {
    message = walkaroundChrome.fallback;
  } else if (sceneStatus === "loading") {
    message = walkaroundChrome.loading;
  }

  return (
    <p role="status" className="sr-only">
      {message}
    </p>
  );
}

/**
 * The stage pinned behind the walk-around text: backdrop, 3D view, legibility scrims, and the
 * stage controls. It stops rendering while it is scrolled out of view or the tab is hidden.
 */
export function WalkaroundStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, "0px");
  const visible = useDocumentVisible();
  const { timeOfDay } = useWalkaroundState();

  return (
    <div
      ref={stageRef}
      data-time={timeOfDay}
      className="walkaround-backdrop sticky top-0 h-svh w-full overflow-hidden"
    >
      <StageView active={inView && visible} />

      {/* scrims keep the HTML readable over the brightest parts of the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-0 walkaround-scrim" />

      <StageControls />
      <ChapterRail />
      <HoverHint />
      <p className="pointer-events-none absolute bottom-4 left-5 hidden text-[11px] tracking-label text-white/45 uppercase lg:block">
        {walkaroundChrome.note}
      </p>
      <StageStatus />
    </div>
  );
}
