import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import ServiceGlyph from "@/components/drawing/ServiceGlyph";
import type { ServiceName } from "@/lib/links";
import { cn } from "@/lib/utils";

type IndexSheet = { id: string; number: string; title: string; href: string; text: string };

type Props = {
  serviceHeading: string;
  generalHeading: string;
  openLabel: string;
  services: (IndexSheet & { service: ServiceName })[];
  general: IndexSheet[];
};

function SheetCell({ sheet, openLabel, children }: { sheet: IndexSheet; openLabel: string; children?: ReactNode }) {
  return (
    <li className="border-r border-b border-charcoal/40">
      <Link
        href={sheet.href}
        className="group grid h-full grid-cols-[5rem_minmax(0,1fr)] content-start gap-x-4 gap-y-4 bg-paper/70 p-5 transition-colors hover:bg-paper focus-visible:outline-offset-[-3px] sm:flex sm:flex-col sm:p-6"
      >
        <span className="col-span-2 flex items-center justify-between gap-3">
          <span className="type-mono border border-charcoal px-1.5 py-0.5 text-[11px] font-semibold">{sheet.number}</span>
          <span className="type-mono flex items-center gap-1 text-[10.5px] text-charcoal/75 group-hover:text-charcoal">
            {openLabel}
            <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
          </span>
        </span>
        {children}
        {/* Phones: glyph and text side by side; without a glyph the text takes the full row. */}
        <span className={cn("flex flex-col gap-2", children ? null : "col-span-2")}>
          <span className="type-sheet text-[20px] leading-none underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-gold">
            {sheet.title}
          </span>
          <span className="text-[14.5px] leading-[1.55] text-charcoal/90">{sheet.text}</span>
        </span>
      </Link>
    </li>
  );
}

// The cover sheet's index: one cell per service sheet with a small elevation glyph and the service's
// one-line description, then the general sheets. Each cell links to its sheet.
export default function CoverSheetIndex({ serviceHeading, generalHeading, openLabel, services, general }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="type-mono mb-3 text-[11px] text-charcoal/80">{serviceHeading}</h3>
        <ol className="grid border-t border-l border-charcoal/40 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((sheet) => (
            <SheetCell key={sheet.id} sheet={sheet} openLabel={openLabel}>
              <span className="flex h-20 items-center justify-center self-start border border-dashed border-charcoal/30 bg-paper sm:h-24 sm:self-auto">
                <ServiceGlyph service={sheet.service} className="size-16 text-charcoal sm:size-20" />
              </span>
            </SheetCell>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="type-mono mb-3 text-[11px] text-charcoal/80">{generalHeading}</h3>
        <ol className="grid border-t border-l border-charcoal/40 sm:grid-cols-3">
          {general.map((sheet) => (
            <SheetCell key={sheet.id} sheet={sheet} openLabel={openLabel} />
          ))}
        </ol>
      </div>
    </div>
  );
}
