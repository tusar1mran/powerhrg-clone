import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mobileBar } from "@/lib/chrome-content";

/**
 * Sticky call / quote bar for phones. The root layout pads the bottom of <body> by the bar's
 * height so it never covers the end of the footer.
 */
export default function MobileActionBar() {
  return (
    <nav
      aria-label={mobileBar.label}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal bg-paper/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] supports-backdrop-filter:bg-paper/85 supports-backdrop-filter:backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-2 gap-2">
        <li>
          <Button asChild variant="outline" size="touch-lg" className="w-full bg-paper">
            <a href={mobileBar.call.href} aria-label={mobileBar.call.srLabel}>
              <Phone data-icon="inline-start" aria-hidden strokeWidth={1.75} />
              {mobileBar.call.label}
            </a>
          </Button>
        </li>
        <li>
          <Button asChild size="touch-lg" className="w-full">
            <Link href={mobileBar.quote.href}>
              {mobileBar.quote.label}
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
