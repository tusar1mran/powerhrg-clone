import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callAction, quoteAction } from "@/lib/sheet-content";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Overrides the quote button, e.g. with a page's own CTA copy ("Get a free quote"). */
  quote?: { label: string; href: string };
};

// The two actions every sheet offers: request a quote (gold) and call the office (outline).
export default function SheetActions({ className, quote = quoteAction }: Props) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild size="lg">
        <Link href={quote.href}>
          {quote.label}
          <ArrowRight data-icon="inline-end" aria-hidden />
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href={callAction.href} aria-label={`${callAction.label} ${callAction.display}`}>
          <Phone data-icon="inline-start" aria-hidden />
          {callAction.display}
        </a>
      </Button>
    </div>
  );
}
