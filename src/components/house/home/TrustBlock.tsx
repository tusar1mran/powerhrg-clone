import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { houseTrust } from "@/lib/house-content";
import { trustPoints, type TrustPoint } from "@/lib/trust-content";
import { Container, SectionHeader } from "../section";

function TrustLink({ link }: { link: NonNullable<TrustPoint["link"]> }) {
  const className = "mt-auto inline-flex w-fit items-center gap-2 pt-4 text-charcoal";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        <span className="link-underline">{link.label}</span>
        <ArrowUpRight aria-hidden className="size-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      <span className="link-underline">{link.label}</span>
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}

/**
 * Verifiable commitments in place of reviews, laid out like the ruled sign-off boxes of a drawing's
 * title block.
 */
export default function TrustBlock() {
  return (
    <section aria-labelledby="trust-title" className="border-t border-charcoal bg-paper-2 py-16 lg:py-24">
      <Container>
        <SectionHeader eyebrow={houseTrust.eyebrow} title={houseTrust.title} titleId="trust-title" className="mb-12">
          <p>{houseTrust.text}</p>
        </SectionHeader>

        <ul className="grid border-t border-l border-charcoal sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map(({ icon: Icon, title, text, link }) => (
            <li key={title} className="flex flex-col gap-3 border-r border-b border-charcoal bg-paper p-6 lg:p-8">
              <span aria-hidden className="flex size-11 items-center justify-center rounded-md border border-charcoal bg-gold-100">
                <Icon className="size-5" strokeWidth={1.5} />
              </span>
              <h3 className="font-display text-[28px] leading-8 tracking-display">{title}</h3>
              <p className="text-[15px] leading-6 text-charcoal-700">{text}</p>
              {link ? <TrustLink link={link} /> : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
