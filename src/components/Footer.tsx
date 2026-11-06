/* eslint-disable @next/next/no-img-element -- static SVG logo */
import Link from "next/link";
import type { ReactNode } from "react";
import { cacheLife } from "next/cache";
import { footerDetails, footerLabels } from "@/lib/sheet-content";
import { allSheets, legalSheets } from "@/lib/sheets";
import { site } from "@/lib/site";

const heading = "type-mono mb-4 block text-[11px] text-charcoal/75";
const linkClass =
  "underline decoration-charcoal/30 decoration-1 underline-offset-4 hover:decoration-gold hover:decoration-2";

// The current year is time-based, so with Cache Components it is cached (refreshed daily) instead of
// making every page dynamic.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-charcoal/40 px-4 py-8 sm:px-6 lg:border-r lg:border-b-0 lg:px-8 lg:last:border-r-0">
      <p className={heading}>{title}</p>
      {children}
    </div>
  );
}

// Footer printed as the bottom margin of the drawing set: the full sheet list (including the
// services overview and legal sheets), section links, office details and the legal strip.
export default function Footer() {
  const contentSheets = allSheets.filter((s) => !legalSheets.includes(s));

  return (
    <footer className="border-t border-charcoal bg-paper text-charcoal">
      <div className="mx-auto grid max-w-[1680px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1fr)]">
        <FooterColumn title={footerLabels.issuedBy}>
          <Link href="/" aria-label={`${site.name}, cover sheet`} className="inline-block">
            <img src="/assets/logo/shah-crew-dark.svg" alt="" width={118} height={44} className="h-11 w-auto" />
          </Link>
          <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.55]">
            {`${site.tagline} for homeowners across ${site.serviceArea}.`}
          </p>
          <p className="type-mono mt-4 text-[11px] leading-[1.6] text-charcoal/80">
            {`${site.license.state} ${site.license.type} license ${site.license.number}`}
          </p>
        </FooterColumn>

        <FooterColumn title={footerLabels.sheets}>
          <nav aria-label={footerLabels.sheets}>
            <ol className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6">
              {contentSheets.map((sheet) => (
                <li key={sheet.id} className="grid grid-cols-[3.75rem_minmax(0,1fr)] text-[14px]">
                  <span aria-hidden className="type-mono pt-0.5 text-[11px] text-charcoal/75">
                    {sheet.number}
                  </span>
                  <Link href={sheet.href} className={linkClass}>
                    {sheet.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </FooterColumn>

        <FooterColumn title={footerLabels.details}>
          <ul className="flex flex-col gap-2 text-[14px]">
            {footerDetails.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title={footerLabels.office}>
          <address className="flex flex-col gap-2 text-[14px] not-italic">
            <a href={site.phone.href} className={`type-mono text-[15px] font-semibold tracking-normal ${linkClass}`}>
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className={`break-all ${linkClass}`}>
              {site.email}
            </a>
            {site.address.length > 0 ? (
              <span className="mt-2 block leading-[1.5]">
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            ) : null}
          </address>
          {site.hours.length > 0 ? (
            <p className="type-mono mt-4 text-[11px] leading-[1.7] text-charcoal/80">
              {site.hours.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          ) : null}
          {site.socials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-4 text-[14px]">
              {site.socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </FooterColumn>
      </div>

      <div className="border-t border-charcoal bg-paper-deep">
        <div className="type-mono mx-auto flex max-w-[1680px] flex-col gap-3 px-4 py-4 text-[11px] text-charcoal/85 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
          <p>
            © <CopyrightYear /> {`${site.legalName}. ${footerLabels.rights}`}
          </p>
          <nav aria-label={footerLabels.legal}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalSheets.map((sheet) => (
                <li key={sheet.id}>
                  <Link href={sheet.href} className={linkClass}>
                    {`${sheet.number} ${sheet.title}`}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="lg:ml-auto">{footerLabels.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
