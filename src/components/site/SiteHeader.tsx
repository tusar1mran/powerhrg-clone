/* eslint-disable @next/next/no-img-element -- static SVG logo, no optimisation needed */
import Link from "next/link";
import { PhoneIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { headerChrome, primaryNav } from "@/lib/chrome-content";
import { links } from "@/lib/links";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import HeaderNav from "./HeaderNav";
import MobileNav from "./MobileNav";

// Global header for every page: a slim bar of dark glass that floats over the page, so the 3D
// stage on the homepage runs edge to edge underneath it. Server component; only the current-page
// marker and the mobile sheet hydrate.
export default function SiteHeader() {
  return (
    <header className="dark fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-charcoal-950/72">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:gap-8 lg:px-10">
        <Link
          href={links.home}
          aria-label={headerChrome.homeLabel}
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <img src="/assets/logo/shah-crew-white.svg" alt="" width={96} height={36} className="h-9 w-auto" />
        </Link>

        <HeaderNav label={headerChrome.navLabel} items={primaryNav} />

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <a
            href={site.phone.href}
            aria-label={headerChrome.callLabel}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-10 gap-2 px-3 text-[15px] font-medium text-white/85 hover:bg-white/10 hover:text-white",
            )}
          >
            <PhoneIcon data-icon="inline-start" />
            <span className="hidden tabular-nums md:inline">{site.phone.display}</span>
          </a>
          <Link
            href={headerChrome.quote.href}
            className={cn(buttonVariants(), "hidden h-10 rounded-full px-5 text-[15px] font-semibold sm:inline-flex")}
          >
            {headerChrome.quote.label}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
