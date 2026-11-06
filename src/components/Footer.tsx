import Link from "next/link";
import { cacheLife } from "next/cache";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerColumns } from "@/lib/content";
import { links } from "@/lib/links";
import { site } from "@/lib/site";
import Logo from "./Logo";

const heading = "mb-5 text-[12px] font-bold tracking-[0.16em] text-on-brand/60 uppercase";
const linkClass = "block py-1.5 text-[16px] text-on-brand/85 transition-colors hover:text-accent";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="mt-4 bg-brand-deep text-on-brand">
      <div className="container-page grid gap-12 pt-16 pb-12 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-4">
          <Link href={links.home} aria-label="Return to homepage" className="inline-block">
            <Logo variant="light" className="h-[60px] w-auto" />
          </Link>
          <p className="mt-6 max-w-[320px] text-[16px] leading-relaxed text-on-brand/70">
            {site.tagline} for homeowners across {site.serviceArea}.
          </p>
          <Link href={links.quote} className="btn btn-accent mt-8">
            Get a free quote
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
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

          <div className="col-span-2 sm:col-span-1">
            <p className={heading}>Contact</p>
            <ul className="space-y-4 text-[16px]">
              <li>
                <a href={site.phone.href} className="flex items-center gap-3 text-on-brand/85 hover:text-accent">
                  <Phone aria-hidden className="h-4 w-4 shrink-0 text-accent" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all text-on-brand/85 hover:text-accent">
                  <Mail aria-hidden className="h-4 w-4 shrink-0 text-accent" />
                  {site.email}
                </a>
              </li>
              {site.address.length > 0 && (
                <li className="flex gap-3 text-on-brand/70">
                  <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <address className="not-italic">
                    {site.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              )}
              {site.hours.length > 0 && (
                <li className="flex gap-3 text-on-brand/70">
                  <Clock aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {site.hours.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-white/10 py-8 text-[14px] text-on-brand/55 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p>
            {site.license.state} {site.license.type} License {site.license.number}. Licensed and insured.
          </p>
          <p className="mt-1">
            © <CopyrightYear /> {site.legalName}. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {site.socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {s.name}
            </a>
          ))}
          <Link href={links.privacy} className="hover:text-accent">
            Privacy Notice
          </Link>
          <Link href={links.terms} className="hover:text-accent">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
