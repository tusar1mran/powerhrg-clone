import Link from "next/link";
import { FileTextIcon, PhoneIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { mobileActionBar } from "@/lib/chrome-content";
import { cn } from "@/lib/utils";

/** Height of the bar, so other fixed elements (e.g. the quote tray) can sit above it. */
export const MOBILE_ACTION_BAR_CLASS = "h-[4.5rem]";

// Call / Quote bar pinned to the bottom of small screens. A spacer of the same height keeps the
// end of the page (the footer) from hiding under it.
export default function MobileActionBar() {
  return (
    <>
      <div aria-hidden className={cn(MOBILE_ACTION_BAR_CLASS, "bg-charcoal-950 lg:hidden")} />
      <nav
        aria-label={mobileActionBar.label}
        className={cn(
          MOBILE_ACTION_BAR_CLASS,
          "dark fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 text-foreground border-t border-white/10 bg-charcoal-950/85 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden",
        )}
      >
        <a
          href={mobileActionBar.call.href}
          aria-label={mobileActionBar.call.srLabel}
          className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full text-[15px] font-semibold")}
        >
          <PhoneIcon data-icon="inline-start" />
          {mobileActionBar.call.label}
        </a>
        <Link
          href={mobileActionBar.quote.href}
          className={cn(buttonVariants(), "h-12 rounded-full text-[15px] font-semibold")}
        >
          <FileTextIcon data-icon="inline-start" />
          {mobileActionBar.quote.label}
        </Link>
      </nav>
    </>
  );
}
