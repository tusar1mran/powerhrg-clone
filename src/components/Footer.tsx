import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Slot from "./layout/Slot";
import Logo from "./Logo";
import { footerColumns } from "@/lib/content";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

const heading = "mb-5 text-[12px] font-bold tracking-[0.16em] text-on-brand/60 uppercase";
const linkClass = "block py-1.5 text-[16px] text-on-brand/85 transition-colors hover:text-accent";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function Contact() {
  return (
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
  );
}

function Columns() {
  return (
    <>
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
    </>
  );
}

function Legal() {
  return (
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
  );
}

function FooterColumns() {
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
          <Columns />
          <div className="col-span-2 sm:col-span-1">
            <p className={heading}>Contact</p>
            <Contact />
          </div>
        </div>
      </div>
      <Legal />
    </footer>
  );
}

function FooterWordmark() {
  return (
    <footer className="mt-4 overflow-hidden bg-brand-deep text-on-brand">
      <div className="container-page pt-16 lg:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="display-2 max-w-[640px]">Have a project in mind? Let’s take a look.</p>
          <Link href={links.quote} className="group inline-flex items-center gap-3 text-[18px] font-bold text-accent">
            Get a free quote
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-ink transition-transform group-hover:rotate-45">
              <ArrowUpRight aria-hidden className="h-5 w-5" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-3">
          <Columns />
          <div className="col-span-2 sm:col-span-1">
            <p className={heading}>Contact</p>
            <Contact />
          </div>
        </div>
      </div>
      <p
        aria-hidden
        className="font-display pointer-events-none -mb-[0.22em] text-center text-[19vw] leading-none font-[number:var(--display-weight)] tracking-[var(--display-tracking)] whitespace-nowrap text-on-brand/10 uppercase select-none"
      >
        {site.name}
      </p>
      <Legal />
    </footer>
  );
}

export default function Footer() {
  return <Slot name="footer" fallback="columns" variants={{ columns: <FooterColumns />, wordmark: <FooterWordmark /> }} />;
}
