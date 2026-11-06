import Link from "next/link";
import { BadgeCheck, ClipboardCheck, FileText, Handshake, ShieldCheck, Stamp, type LucideIcon } from "lucide-react";
import Reveal from "../Reveal";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

type Point = { icon: LucideIcon; title: string; text: string; link?: { label: string; href: string; external?: boolean } };

export type TrustProps = { eyebrow?: string; title: string; text: string };

function buildPoints(): Point[] {
  return [
    {
      icon: BadgeCheck,
      title: "Licensed",
      text: `${site.license.state} ${site.license.type} license ${site.license.number}. It’s printed on every quote and contract.`,
      link: site.license.lookupUrl
        ? { label: "Look it up", href: site.license.lookupUrl, external: true }
        : { label: "License details", href: links.licenses },
    },
    {
      icon: ShieldCheck,
      title: "Insured",
      text: `${site.insurance}. Ask for a certificate of insurance before work starts and we’ll send it.`,
      link: { label: "Insurance details", href: links.licenses },
    },
    {
      icon: Stamp,
      title: "Permitted",
      text: "We pull the permits your job requires and schedule the inspections, so the work is on record with your town.",
    },
    {
      icon: FileText,
      title: "Quoted in writing",
      text: "An itemized quote with products, scope and schedule. The price on paper is the price you pay unless you change the scope.",
    },
    {
      icon: ClipboardCheck,
      title: "Warranted in writing",
      text: "Manufacturer warranties on products, plus our own written workmanship warranty on the installation.",
      link: { label: "How our warranty works", href: links.warranty },
    },
    {
      icon: Handshake,
      title: "Signed off by you",
      text: "You walk the finished job with your crew lead before the final payment. Anything that isn’t right gets fixed first.",
    },
  ];
}

function PointLink({ link, className = "" }: { link: NonNullable<Point["link"]>; className?: string }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={`link-underline ${className}`}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={`link-underline ${className}`}>
      {link.label}
    </Link>
  );
}

export function TrustCards({ eyebrow = "Why homeowners choose us", title, text }: TrustProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <p className="eyebrow text-accent-ink">{eyebrow}</p>
          <h2 className="display-2 mt-4 text-brand">{title}</h2>
          <p className="lead mt-5 text-muted">{text}</p>
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {buildPoints().map((p, i) => (
            <li key={p.title}>
              <Reveal
                delay={(i % 3) * 90}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-card)] lg:p-8"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                  <p.icon aria-hidden strokeWidth={1.75} className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-[19px] font-bold text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-[15.5px] leading-relaxed text-muted">{p.text}</p>
                {p.link && <PointLink link={p.link} className="mt-5 self-start text-ink" />}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TrustList({ eyebrow = "Why homeowners choose us", title, text }: TrustProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal className="lg:sticky lg:top-32">
            <p className="eyebrow text-accent-ink">{eyebrow}</p>
            <h2 className="display-2 mt-4 text-brand">{title}</h2>
            <p className="lead mt-5 text-muted">{text}</p>
          </Reveal>
        </div>
        <ul className="border-b border-line">
          {buildPoints().map((p, i) => (
            <li key={p.title} className="border-t border-line">
              <Reveal delay={(i % 2) * 80} className="grid grid-cols-[auto_1fr] gap-5 py-7 lg:gap-7">
                <p.icon aria-hidden strokeWidth={1.5} className="h-8 w-8 text-accent-ink" />
                <div>
                  <h3 className="text-[19px] font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 max-w-[560px] text-[15.5px] leading-relaxed text-muted">{p.text}</p>
                  {p.link && <PointLink link={p.link} className="mt-4 text-ink" />}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TrustStrip({ eyebrow = "Why homeowners choose us", title, text }: TrustProps) {
  return (
    <section className="panel-wrap">
      <div className="on-dark inset-panel bg-brand-deep text-on-brand">
        <div className="container-page py-16 lg:py-24">
          <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow text-on-brand/80">{eyebrow}</p>
              <h2 className="display-2 mt-4">{title}</h2>
            </div>
            <p className="lead text-on-brand/75 lg:pb-2">{text}</p>
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {buildPoints().map((p) => (
              <li key={p.title} className="bg-brand-deep p-7 lg:p-8">
                <p.icon aria-hidden strokeWidth={1.5} className="h-8 w-8 text-accent" />
                <h3 className="mt-5 text-[18px] font-bold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-on-brand/70">{p.text}</p>
                {p.link && <PointLink link={p.link} className="mt-4" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
