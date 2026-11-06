/* eslint-disable @next/next/no-img-element -- static SVG logo */
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { headerActions, headerNav, skipLinkLabel } from "@/lib/chrome-content";
import { links } from "@/lib/links";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

/**
 * Compact site-wide header: logo, main navigation, phone number and the quote button. Below the
 * lg breakpoint the navigation moves into a side sheet; below md the phone and quote actions move
 * to the sticky bar at the bottom of the screen (see MobileActionBar).
 */
export default function SiteHeader() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-60 bg-charcoal px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:rounded-md"
      >
        {skipLinkLabel}
      </a>
      <header className="sticky top-0 z-40 border-b border-charcoal/15 bg-paper/95 supports-backdrop-filter:bg-paper/85 supports-backdrop-filter:backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1360px] items-center gap-4 px-4 sm:px-6 lg:px-10">
          <Link
            href={links.home}
            aria-label={headerActions.homeLabel}
            className="-ml-1 flex shrink-0 items-center rounded-md p-1"
          >
            <img src="/assets/logo/shah-crew-dark.svg" alt="" width={128} height={48} className="h-10 w-auto" />
          </Link>

          <DesktopNav nav={headerNav} className="ml-4 hidden flex-none lg:flex" />

          <div className="ml-auto flex items-center gap-2">
            <a
              href={headerActions.call.href}
              aria-label={headerActions.call.label}
              className="hidden h-11 items-center gap-2 rounded-md px-3 text-[15px] font-semibold text-charcoal hover:bg-gold-100 md:inline-flex"
            >
              <Phone aria-hidden className="size-4" strokeWidth={1.75} />
              <span className="tabular-nums">{headerActions.call.display}</span>
            </a>
            <Button asChild size="touch" className="hidden md:inline-flex">
              <Link href={headerActions.quote.href}>
                {headerActions.quote.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <MobileNav nav={headerNav} actions={headerActions} className="lg:hidden" />
          </div>
        </div>
      </header>
    </>
  );
}
