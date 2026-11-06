/* eslint-disable @next/next/no-img-element -- static SVG logo */
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { footerContent } from "@/lib/chrome-content";
import { links } from "@/lib/links";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const headingClass = "annotation mb-4 text-charcoal-700";
const linkClass =
  "inline-flex min-h-11 items-center text-[16px] text-charcoal underline-offset-4 hover:underline focus-visible:underline sm:min-h-9";

// The current year is time-based, so with Cache Components it is cached (refreshed daily) instead of
// making every page dynamic.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

/**
 * Site-wide footer, laid out like the title block in the corner of a drawing sheet: ruled cells
 * for the company, the site map and contact details, with the license and legal line underneath.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-charcoal bg-paper-2 text-charcoal">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid border-x border-charcoal/20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="border-b border-charcoal/20 p-6 sm:border-r lg:border-b-0 lg:py-10">
            <Link href={links.home} aria-label={`${site.name}, back to the homepage`} className="inline-block rounded-md">
              <img src="/assets/logo/shah-crew-dark.svg" alt="" width={128} height={48} className="h-12 w-auto" />
            </Link>
            <p className="mt-5 max-w-[30ch] text-[16px] leading-6 text-charcoal-700">{footerContent.tagline}</p>
          </div>

          {footerContent.columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="border-b border-charcoal/20 p-6 sm:odd:border-r lg:border-r lg:border-b-0 lg:py-10"
            >
              <h2 className={headingClass}>{column.heading}</h2>
              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="p-6 lg:py-10">
            <h2 className={headingClass}>{footerContent.contactHeading}</h2>
            <ul className="flex flex-col">
              <li>
                <a href={site.phone.href} className={cn(linkClass, "font-semibold tabular-nums")}>
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={cn(linkClass, "break-all")}>
                  {site.email}
                </a>
              </li>
            </ul>
            {site.address.length > 0 ? (
              <address className="mt-3 text-[15px] leading-6 text-charcoal-700 not-italic">
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            ) : null}
            {site.hours.length > 0 ? (
              <p className="mt-3 text-[15px] leading-6 text-charcoal-700">
                {site.hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ) : null}
            <Button asChild size="touch" className="mt-5">
              <Link href={footerContent.quote.href}>
                {footerContent.quote.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-x border-t border-charcoal/20 px-6 py-5 text-[14px] leading-6 text-charcoal-700 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[60ch]">{footerContent.license}</p>
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
            <p>
              © <CopyrightYear /> {site.legalName}. {footerContent.rights}
            </p>
            <ul className="flex flex-wrap gap-x-5">
              {footerContent.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={cn(linkClass, "text-[14px]")}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {site.socials.length > 0 ? (
              <ul className="flex flex-wrap gap-x-5">
                {site.socials.map((social) => (
                  <li key={social.name}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
