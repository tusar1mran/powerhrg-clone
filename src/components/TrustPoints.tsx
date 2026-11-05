import Link from "next/link";
import { BadgeCheck, ClipboardCheck, FileText, Handshake, ShieldCheck, Stamp, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

type Point = { icon: LucideIcon; title: string; text: string; link?: { label: string; href: string; external?: boolean } };

// Verifiable commitments in place of reviews or awards: each one is something a homeowner can check
// or will see in writing. License details come from site.ts.
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

type Props = { title: string; text: string };

export default function TrustPoints({ title, text }: Props) {
  const points = buildPoints();

  return (
    <section className="bg-sand py-20 text-charcoal lg:py-28">
      <div className="mx-auto max-w-[1150px] px-6">
        <Reveal className="max-w-[760px]">
          <h2 className="font-display text-[34px] leading-tight font-medium tracking-display lg:text-[48px]">{title}</h2>
          <p className="mt-5 text-[16px] leading-[26px] lg:text-[18px] lg:leading-[28px]">{text}</p>
        </Reveal>
        <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={(i % 3) * 100}>
                {/* icon in a white tile */}
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_2px_10px_rgba(30,43,49,0.06)]">
                  <p.icon aria-hidden strokeWidth={1.75} className="h-7 w-7 text-gold-600" />
                </span>
                <h3 className="mt-5 text-[17px] font-semibold lg:text-[18px]">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-[24px] text-charcoal/85 lg:text-[16px]">{p.text}</p>
                {p.link &&
                  (p.link.external ? (
                    <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="link-underline mt-4">
                      {p.link.label}
                    </a>
                  ) : (
                    <Link href={p.link.href} className="link-underline mt-4">
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
