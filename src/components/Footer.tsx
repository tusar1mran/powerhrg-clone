/* eslint-disable @next/next/no-img-element -- static SVG logo */
import Link from "next/link";
import { cacheLife } from "next/cache";
import { footerColumns } from "@/lib/content";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

const container = "mx-auto w-full px-6 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 3xl:max-w-[1728px]";
const legal = "mr-2 block py-2 hover:text-white hover:underline focus:text-white focus:underline focus:outline-none lg:mb-0 lg:inline-block lg:py-0";
const heading = "mb-5 block text-[14px] leading-7 font-bold tracking-[0.3em] uppercase";
const linkClass = "mb-5 block text-[18px] leading-7 hover:underline focus:text-white focus:underline focus:outline-none";

// The current year is time-based, so with Cache Components it is cached (refreshed daily) instead of
// making every page dynamic.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="z-40 bg-navy pt-12 pb-10 text-white lg:pt-20">
      <div className={`${container} grid grid-cols-1 gap-y-12 pb-12 lg:grid-cols-12`}>
        <div className="col-span-1 lg:col-span-3 lg:col-start-2">
          <Link href={links.home} aria-label="Return to homepage" className="inline-block">
            <img src="/assets/logo/shah-crew-white.svg" alt="" width={186} height={70} className="h-[70px] w-[186px]" />
          </Link>
          <p className="mt-6 max-w-[260px] text-[16px] leading-6 text-white/80">
            {site.tagline} for homeowners across {site.serviceArea}.
          </p>
        </div>

        <div className="col-span-1 grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-7 lg:grid-cols-3">
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className={heading}>{col.heading}</p>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <p className={heading}>Contact</p>
            <a href={site.phone.href} className={linkClass}>
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
              {site.email}
            </a>
            {site.address.length > 0 && (
              <address className="mb-5 text-[16px] leading-6 not-italic text-white/80">
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            )}
            {site.hours.length > 0 && (
              <p className="mb-5 text-[16px] leading-6 text-white/80">
                {site.hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}
            <Link
              href={links.quote}
              className="mt-2 inline-block bg-lime px-6 py-4 text-[12px] font-bold tracking-[3px] text-navy uppercase transition-colors hover:bg-white focus:bg-white"
            >
              Get a free quote
            </Link>
          </div>
        </div>
      </div>

      <div className={`${container} grid grid-cols-1 gap-y-6 border-t border-white/30 pt-8 lg:grid-cols-12`}>
        <div className="col-span-1 lg:col-span-3 lg:col-start-2">
          {site.socials.length > 0 && (
            <ul className="flex gap-4">
              {site.socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[14px] hover:underline">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-span-1 lg:col-span-7">
          <p className="text-[14px] leading-6 text-white/60">
            {site.license.state} {site.license.type} License {site.license.number}. Licensed and insured.
          </p>
          <p className="mt-2 text-[16px] leading-6 text-white/60">
            <span>
              © <CopyrightYear /> {site.legalName}. All rights reserved.
            </span>{" "}
            <Link href={links.privacy} className={legal}>
              Privacy Notice
            </Link>{" "}
            <Link href={links.terms} className={legal}>
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
