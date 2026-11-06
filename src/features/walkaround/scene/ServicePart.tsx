"use client";

import { useCallback, type ReactNode } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import type { ServiceName } from "@/lib/links";
import { useWalkaroundActions } from "../WalkaroundProvider";

type Props = {
  service: ServiceName;
  children: ReactNode;
};

/**
 * Makes everything inside it a clickable part of the house. Pointer events from any mesh inside
 * bubble up here, so a part made of many meshes still behaves as one target. The same actions are
 * available as HTML buttons and links in the chapter panels.
 */
export function ServicePart({ service, children }: Props) {
  const { setHovered, activatePart } = useWalkaroundActions();

  const onPointerOver = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      // Only the nearest part under the pointer reacts.
      event.stopPropagation();
      setHovered(service);
    },
    [service, setHovered],
  );

  const onPointerOut = useCallback(() => {
    setHovered((current) => (current === service ? null : current));
  }, [service, setHovered]);

  const onClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      activatePart(service);
    },
    [service, activatePart],
  );

  return (
    <group onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
      {children}
    </group>
  );
}
