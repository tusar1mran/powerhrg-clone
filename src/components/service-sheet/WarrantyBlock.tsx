import { useId } from "react";
import Link from "next/link";
import SitePhoto, { type SitePhotoData } from "@/components/drawing/SitePhoto";
import { site } from "@/lib/site";

type Props = {
  eyebrow: string;
  title: string[];
  text: string;
  cta: string;
  href: string;
  photo: SitePhotoData;
};

/** Round approval stamp, the way a reviewed sheet is stamped. Decorative: the copy says the same thing. */
function WarrantyStamp() {
  const pathId = `stamp-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ring = `${site.name} · Written workmanship warranty · `.toUpperCase();

  return (
    <svg viewBox="0 0 160 160" aria-hidden className="drawing size-32 shrink-0 -rotate-6 sm:size-36">
      <defs>
        <path id={pathId} d="M80 80m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" />
      </defs>
      <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" className="lw-heavy" />
      <circle cx="80" cy="80" r="45" fill="var(--color-gold)" stroke="currentColor" className="lw-medium" />
      <text fontSize="11.5" fontWeight="500">
        <textPath href={`#${pathId}`} textLength="356" lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      <path d="M62 81l12 12 25-27" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
    </svg>
  );
}

// Warranty block for service sheets: the written warranty as a stamped approval, with a site photo.
export default function WarrantyBlock({ eyebrow, title, text, cta, href, photo }: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
      <div className="border border-charcoal bg-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="type-mono text-[12px] text-charcoal/80">{eyebrow}</p>
            <h3 className="type-heading mt-3 text-[36px] sm:text-[44px]">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
          </div>
          <WarrantyStamp />
        </div>
        <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.6]">{text}</p>
        <Link
          href={href}
          className="mt-6 inline-block text-[15px] font-semibold underline decoration-gold decoration-2 underline-offset-[6px] hover:decoration-charcoal"
        >
          {cta}
        </Link>
      </div>
      <SitePhoto {...photo} aspect="3 / 2" />
    </div>
  );
}
