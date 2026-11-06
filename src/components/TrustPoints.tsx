import Link from "next/link";
import { BadgeCheck, ClipboardCheck, FileText, Handshake, ShieldCheck, Stamp, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { trustPoints, type TrustPointId } from "@/lib/trust";

// Verifiable commitments in place of reviews or awards. The copy lives in src/lib/trust.ts so the
// title-block style trust panel on the cover sheet uses the same wording; this component adds icons.
const icons: Record<TrustPointId, LucideIcon> = {
  licensed: BadgeCheck,
  insured: ShieldCheck,
  permitted: Stamp,
  quoted: FileText,
  warranted: ClipboardCheck,
  signedOff: Handshake,
};

type Props = { title: string; text: string };

export default function TrustPoints({ title, text }: Props) {
  const points = trustPoints.map((p) => ({ ...p, icon: icons[p.id] }));

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
