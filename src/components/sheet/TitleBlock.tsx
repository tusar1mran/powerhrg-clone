/* eslint-disable @next/next/no-img-element -- static SVG logo from /public */
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceAreaBar } from "@/lib/content";
import {
  callAction,
  quoteAction,
  titleBlockLabels,
  titleBlockLicenseLink,
  titleBlockWarranty,
} from "@/lib/sheet-content";
import { sheetCount, sheetPosition, type SheetEntry } from "@/lib/sheets";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// The title block printed on every sheet: who drew it (the contractor and how to check them), what
// the sheet is, and how to reach the office. Right-hand column on desktop, bottom of the sheet on
// mobile. Every business detail comes from site.ts.

const cellLink =
  "type-mono text-[11px] underline decoration-gold decoration-2 underline-offset-4 hover:decoration-charcoal";

function TitleBlockCell({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("border-b border-charcoal/40 px-4 py-3", className)}>
      <dt className="type-mono text-[10.5px] text-charcoal/75">{label}</dt>
      <dd className="mt-1 text-[13.5px] leading-snug">{children}</dd>
    </div>
  );
}

export default function TitleBlock({ sheet }: { sheet: SheetEntry }) {
  const position = sheetPosition(sheet.id);

  return (
    <div className="flex flex-col bg-paper">
      <dl className="grid sm:grid-cols-2 lg:grid-cols-1">
        <TitleBlockCell label={titleBlockLabels.contractor} className="sm:col-span-2 lg:col-span-1">
          <img
            src="/assets/logo/shah-crew-dark.svg"
            alt={site.name}
            width={118}
            height={44}
            className="mt-1 h-9 w-auto"
          />
          <span className="type-mono mt-2 block text-[11px] text-charcoal/80">{site.tagline}</span>
        </TitleBlockCell>

        <TitleBlockCell label={titleBlockLabels.project}>
          {serviceAreaBar.text}{" "}
          <Link href={serviceAreaBar.link.href} className={cellLink}>
            {serviceAreaBar.link.label}
          </Link>
        </TitleBlockCell>

        <TitleBlockCell label={titleBlockLabels.license}>
          {`${site.license.state} ${site.license.type}`}
          <span className="type-mono mt-1 block text-[12px]">
            {`${titleBlockLabels.licenseNumber} ${site.license.number}`}
          </span>
          {titleBlockLicenseLink.external ? (
            <a href={titleBlockLicenseLink.href} target="_blank" rel="noopener noreferrer" className={cn(cellLink, "mt-1 inline-block")}>
              {titleBlockLicenseLink.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link href={titleBlockLicenseLink.href} className={cn(cellLink, "mt-1 inline-block")}>
              {titleBlockLicenseLink.label}
            </Link>
          )}
        </TitleBlockCell>

        <TitleBlockCell label={titleBlockLabels.insurance}>{site.insurance}</TitleBlockCell>

        <TitleBlockCell label={titleBlockLabels.warranty}>
          {titleBlockWarranty.text}{" "}
          <Link href={titleBlockWarranty.link.href} className={cellLink}>
            {titleBlockWarranty.link.label}
          </Link>
        </TitleBlockCell>

        <TitleBlockCell label={titleBlockLabels.contact} className="sm:col-span-2 lg:col-span-1">
          <a
            href={callAction.href}
            className="type-mono block text-[19px] font-semibold tracking-normal underline decoration-gold decoration-2 underline-offset-4 hover:decoration-charcoal"
          >
            {callAction.display}
          </a>
          {site.hours.length > 0 ? (
            <span className="type-mono mt-1 block text-[11px] text-charcoal/80">{site.hours.join(" · ")}</span>
          ) : null}
        </TitleBlockCell>
      </dl>

      <div className="border-b border-charcoal/40 p-3">
        <Button asChild size="lg" className="w-full justify-between">
          <Link href={quoteAction.href}>
            {quoteAction.label}
            <ArrowRight data-icon="inline-end" aria-hidden />
          </Link>
        </Button>
      </div>

      <dl className="grid grid-cols-[minmax(0,1fr)_auto] border-charcoal">
        <div className="col-span-2 border-b border-charcoal/40 px-4 py-3">
          <dt className="type-mono text-[10.5px] text-charcoal/75">{titleBlockLabels.sheetTitle}</dt>
          <dd className="type-sheet mt-1 text-[22px] leading-none">{sheet.title}</dd>
        </div>
        <div className="border-r border-charcoal/40 px-4 py-3">
          <dt className="type-mono text-[10.5px] text-charcoal/75">{titleBlockLabels.sheetNumber}</dt>
          <dd className="mt-1 flex items-baseline gap-3">
            <span className="type-display text-[40px] leading-none">{sheet.number}</span>
            <span className="type-mono text-[11px] text-charcoal/80">
              {titleBlockLabels.position(position, sheetCount)}
            </span>
          </dd>
        </div>
        <div className="px-4 py-3">
          <dt className="type-mono text-[10.5px] text-charcoal/75">{titleBlockLabels.scale}</dt>
          <dd className="type-mono mt-1 text-[15px] font-semibold">
            <abbr title={titleBlockLabels.scaleTitle} className="no-underline">
              {titleBlockLabels.scaleValue}
            </abbr>
          </dd>
        </div>
      </dl>
    </div>
  );
}
