import type { ComponentType } from "react";
import type { ServiceName } from "@/lib/links";
import { cn } from "@/lib/utils";

// Small elevation drawings for the sheet index, one per service, drawn on a 64-unit grid in the same
// line weights as the large details. Decorative: the sheet title next to each glyph names the service.

function WindowsGlyph() {
  return (
    <>
      {/* frame and double-hung sashes */}
      <rect x="14" y="6" width="36" height="48" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x="18" y="10" width="28" height="20" fill="none" stroke="currentColor" className="lw-light" />
      <rect x="18" y="30" width="28" height="20" fill="none" stroke="currentColor" className="lw-light" />
      <line x1="18" y1="30" x2="46" y2="30" stroke="currentColor" className="lw-heavy" />
      {/* glass reflection */}
      <path d="M24 24L32 16M24 44L32 36" stroke="currentColor" className="lw-hair" />
      {/* sill */}
      <rect x="10" y="54" width="44" height="4" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
    </>
  );
}

function RoofingGlyph() {
  return (
    <>
      {/* gable with shingle courses */}
      <path d="M4 40L32 12L60 40Z" fill="var(--color-paper)" stroke="currentColor" strokeLinejoin="round" className="lw-medium" />
      <path
        d="M26 18H38M20 24H44M14 30H50M8 36H56M30 18V24M36 24V30M24 24V30M42 30V36M30 30V36M18 30V36"
        stroke="currentColor"
        className="lw-hair"
      />
      <line x1="2" y1="40" x2="62" y2="40" stroke="currentColor" className="lw-heavy" />
      {/* wall below, for reference */}
      <path d="M10 40V58H54V40" fill="none" stroke="currentColor" strokeDasharray="3 3" className="lw-hair" />
    </>
  );
}

function SidingGlyph() {
  return (
    <>
      <rect x="8" y="6" width="48" height="52" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      {/* lap courses with their shadow lines */}
      <path
        d="M16 13H56M16 20H56M16 27H56M16 34H56M16 41H56M16 48H56M16 55H56"
        stroke="currentColor"
        className="lw-light"
      />
      <path d="M16 14.5H56M16 21.5H56M16 28.5H56M16 35.5H56M16 42.5H56M16 49.5H56" stroke="currentColor" className="lw-hair" />
      {/* corner board */}
      <rect x="8" y="6" width="8" height="52" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
    </>
  );
}

function DoorsGlyph() {
  return (
    <>
      <rect x="18" y="6" width="28" height="52" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <rect x="21" y="9" width="22" height="49" fill="none" stroke="currentColor" className="lw-light" />
      <rect x="24" y="13" width="16" height="16" fill="none" stroke="currentColor" className="lw-hair" />
      <rect x="24" y="33" width="16" height="20" fill="none" stroke="currentColor" className="lw-hair" />
      <circle cx="39" cy="33" r="1.6" fill="currentColor" />
      {/* swing: dashed lines meet on the hinge side */}
      <path d="M43 9L21 33.5L43 58" fill="none" stroke="currentColor" strokeDasharray="3 3" className="lw-hair" />
      <line x1="12" y1="58" x2="52" y2="58" stroke="currentColor" className="lw-heavy" />
    </>
  );
}

function InsulationGlyph() {
  return (
    <>
      <path d="M4 36L32 10L60 36" fill="none" stroke="currentColor" strokeLinejoin="round" className="lw-medium" />
      <line x1="8" y1="44" x2="56" y2="44" stroke="currentColor" className="lw-medium" />
      {/* batt symbol on the attic floor */}
      <path
        d="M10 44C8 34 18 34 16 44C14 34 24 34 22 44C20 34 30 34 28 44C26 34 36 34 34 44C32 34 42 34 40 44C38 34 48 34 46 44C44 34 54 34 52 44"
        fill="none"
        stroke="currentColor"
        className="lw-light"
      />
      <path d="M8 48H56" stroke="currentColor" strokeDasharray="3 3" className="lw-hair" />
    </>
  );
}

function AccessoriesGlyph() {
  return (
    <>
      {/* fascia, gutter run and downspout with its kick-out */}
      <rect x="4" y="8" width="56" height="6" fill="var(--color-paper)" stroke="currentColor" className="lw-light" />
      <rect x="4" y="14" width="56" height="8" fill="var(--color-paper)" stroke="currentColor" className="lw-medium" />
      <path d="M12 14V22M28 14V22M44 14V22" stroke="currentColor" className="lw-hair" />
      <path
        d="M38 22V48L44 56H58V50H47L44 46V22"
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeLinejoin="round"
        className="lw-medium"
      />
      <path d="M38 34H44M38 40H44" stroke="currentColor" className="lw-hair" />
      <line x1="2" y1="60" x2="62" y2="60" stroke="currentColor" className="lw-heavy" />
    </>
  );
}

const glyphs: Record<ServiceName, ComponentType> = {
  Windows: WindowsGlyph,
  Roofing: RoofingGlyph,
  Siding: SidingGlyph,
  Doors: DoorsGlyph,
  Insulation: InsulationGlyph,
  Accessories: AccessoriesGlyph,
};

export default function ServiceGlyph({ service, className }: { service: ServiceName; className?: string }) {
  const Glyph = glyphs[service];

  return (
    <svg viewBox="0 0 64 64" aria-hidden focusable="false" className={cn("drawing block", className)}>
      <Glyph />
    </svg>
  );
}
