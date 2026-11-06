"use client";

import { HighlightDirector } from "./HighlightDirector";
import { useHouseMaterials } from "./materials";
import { Accessories } from "./parts/Accessories";
import { Attic } from "./parts/Attic";
import { EntryDoor } from "./parts/EntryDoor";
import { Grounds } from "./parts/Grounds";
import { Roof } from "./parts/Roof";
import { Shell } from "./parts/Shell";
import { SidingWall } from "./parts/SidingWall";
import { Windows } from "./parts/Windows";

/**
 * The procedural house: every part is built from boxes and extruded outlines at runtime, merged
 * per material and instanced where it repeats. Nothing is downloaded.
 */
export function HouseModel() {
  const { materials, registry } = useHouseMaterials();

  return (
    <>
      <Shell materials={materials} />
      <SidingWall materials={materials} />
      <Roof materials={materials} />
      <Attic materials={materials} />
      <Windows materials={materials} />
      <EntryDoor materials={materials} />
      <Accessories materials={materials} />
      <Grounds materials={materials} />
      <HighlightDirector registry={registry} />
    </>
  );
}
