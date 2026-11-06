import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { Container } from "./section";

type Props = {
  title: string;
  text: string;
  quote: { label: string; href: string };
  callLabel: string;
  /** Extra link under the buttons, e.g. back to the house drawing. */
  children?: ReactNode;
  /** Drawing beside the text. Decorative. */
  aside?: ReactNode;
};

/** Last call to action on a page: book the free estimate or call. */
export function ClosingPanel({ title, text, quote, callLabel, children, aside }: Props) {
  return (
    <section aria-labelledby="closing-title" className="border-t border-charcoal py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-6">
          <h2 id="closing-title" className="font-display text-[48px] leading-[0.95] tracking-display sm:text-[72px] lg:text-[96px]">
            {title}
          </h2>
          <p className="max-w-[48ch] text-[17px] leading-7 text-charcoal-700">{text}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="touch-lg">
              <Link href={quote.href}>
                {quote.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="touch-lg">
              <a href={site.phone.href}>
                <Phone data-icon="inline-start" aria-hidden strokeWidth={1.75} />
                {callLabel}
              </a>
            </Button>
          </div>
          {children}
        </div>
        {aside}
      </Container>
    </section>
  );
}
