"use client";

import type { ReactNode } from "react";
import type { LayoutSections } from "@/lib/layouts";
import { useLayout } from "./useLayout";

type Props<K extends keyof LayoutSections> = {
  name: K;
  variants: Partial<Record<LayoutSections[K], ReactNode>>;
  fallback: LayoutSections[K];
};

export default function Slot<K extends keyof LayoutSections>({ name, variants, fallback }: Props<K>) {
  const layout = useLayout();
  const key = layout.sections[name];
  return <>{variants[key] ?? variants[fallback]}</>;
}
