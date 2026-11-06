import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callAction, mobileBarLabels, quoteAction } from "@/lib/sheet-content";

// Sticky call / quote bar on phones and tablets, so both actions are one tap away on every sheet.
// SheetFrame pads the bottom of the page by the bar's height so it never covers the footer.
export default function MobileActionBar() {
  return (
    <nav
      aria-label={mobileBarLabels.region}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-charcoal bg-paper pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <Button asChild variant="outline" size="lg" className="h-14 border-0 border-r border-charcoal">
        <a href={callAction.href}>
          <Phone data-icon="inline-start" aria-hidden />
          {callAction.label}
          <span className="sr-only">{` ${callAction.display}`}</span>
        </a>
      </Button>
      <Button asChild size="lg" className="h-14 border-0">
        <Link href={quoteAction.href}>
          {mobileBarLabels.quote}
          <ArrowRight data-icon="inline-end" aria-hidden />
        </Link>
      </Button>
    </nav>
  );
}
