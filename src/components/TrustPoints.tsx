import Link from "next/link";
import { BadgeCheck, ClipboardCheck, FileText, Handshake, ShieldCheck, Stamp, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

type Point = { icon: LucideIcon; title: string; text: string; link?: { label: string; href: string; external?: boolean } };

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

type Props = { eyebrow?: string; title: string; text: string };

export default function TrustPoints({ eyebrow = "Why homeowners choose us", title, text }: Props) {
  const points = buildPoints();

  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <p className="eyebrow text-accent-ink">{eyebrow}</p>
          <h2 className="display-2 mt-4 text-brand">{title}</h2>
          <p className="lead mt-5 text-muted">{text}</p>
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {points.map((p, i) => (
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
                {p.link &&
                  (p.link.external ? (
                    <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="link-underline mt-5 self-start text-ink">
                      {p.link.label}
                    </a>
                  ) : (
                    <Link href={p.link.href} className="link-underline mt-5 self-start text-ink">
                      {p.link.label}
                    </Link>
                  ))}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
