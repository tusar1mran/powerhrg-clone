/* eslint-disable @next/next/no-img-element -- static SVG logo, no optimisation needed */
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { footerChrome } from "@/lib/chrome-content";
import { links } from "@/lib/links";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const headingClass = "text-[12px] font-semibold tracking-label text-gold uppercase";
const linkClass =
  "inline-flex min-h-8 items-center text-[15px] text-white/75 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:outline-none";

// The current year is time-based, so with Cache Components it is cached (refreshed daily) instead of
// making every page dynamic.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

// Global footer for every page, in the redesign's dark chrome.
export default function SiteFooter() {
  return (
    <footer className="dark relative overflow-hidden bg-charcoal-950 text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-10 sm:px-6 lg:px-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col items-start gap-8">
            <p className="font-heading text-[44px] leading-[0.95] font-semibold tracking-tightest sm:text-[64px] lg:text-[88px]">
              {footerChrome.statement.map((line, index) => (
                <span key={line} className={cn("block", index === footerChrome.statement.length - 1 && "text-gold")}>
                  {line}
                </span>
              ))}
            </p>
            <p className="max-w-sm text-[16px] leading-relaxed text-white/70">{footerChrome.blurb}</p>
            <Link
              href={footerChrome.quote.href}
              className={cn(buttonVariants(), "h-12 rounded-full px-6 text-[15px] font-semibold")}
            >
              {footerChrome.quote.label}
              <ArrowUpRightIcon data-icon="inline-end" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
            {footerChrome.columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-4">
                <p className={headingClass}>{column.heading}</p>
                <ul className="flex flex-col gap-1">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
              <p className={headingClass}>{footerChrome.contactHeading}</p>
              <ul className="flex flex-col gap-1">
                <li>
                  <a href={site.phone.href} className={cn(linkClass, "tabular-nums")}>
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
                <address className="text-[15px] leading-6 text-white/60 not-italic">
                  {site.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              ) : null}
              {site.hours.length > 0 ? (
                <p className="text-[15px] leading-6 text-white/60">
                  {site.hours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <Separator className="mt-16 mb-8 bg-white/10" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <Link
              href={links.home}
              aria-label={`${site.name}, back to the homepage`}
              className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <img src="/assets/logo/shah-crew-white.svg" alt="" width={86} height={32} className="h-8 w-auto" />
            </Link>
            <p className="text-[13px] leading-5 text-white/50">{footerChrome.licenseLine}</p>
          </div>

          <div className="flex flex-col gap-3 text-[13px] text-white/50 sm:flex-row sm:items-center sm:gap-6">
            {site.socials.length > 0 ? (
              <ul className="flex gap-4">
                {site.socials.map((social) => (
                  <li key={social.name}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <ul className="flex gap-5">
              {footerChrome.legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white hover:underline focus-visible:text-white focus-visible:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              © <CopyrightYear /> {site.legalName}. {footerChrome.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
