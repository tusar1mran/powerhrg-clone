/* eslint-disable @next/next/no-img-element -- static logos and badges */
import Link from "next/link";
import { Fragment } from "react";
import { footerBadges, footerColumns } from "@/lib/content";

const socials = [
  { name: "YouTube", icon: "/assets/social/youtube.svg", href: "https://www.youtube.com/powerhrg" },
  { name: "LinkedIn", icon: "/assets/social/linkedin.svg", href: "https://www.linkedin.com/company/power-home-remodeling-group" },
  { name: "Instagram", icon: "/assets/social/instagram.svg", href: "https://www.instagram.com/powerhrg" },
  { name: "TikTok", icon: "/assets/social/tiktok.svg", href: "https://www.tiktok.com/@powerhrg" },
  { name: "Facebook", icon: "/assets/social/facebook.svg", href: "https://www.facebook.com/PowerHRG" },
];

const container = "mx-auto w-full px-6 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 3xl:max-w-[1728px]";
const legal = "mr-2 block py-2 hover:text-white hover:underline focus:text-white focus:underline focus:outline-none lg:mb-0 lg:inline-block lg:py-0";

export default function Footer() {
  return (
    <footer>
      <div className="z-40 bg-navy pt-12 pb-10 text-white lg:pt-20">
        <div className={`${container} grid grid-cols-1 pb-6 lg:grid-cols-12`}>
          <div className="col-span-1 mb-12 lg:col-span-7 lg:mb-0">
            <div className="grid grid-cols-2 gap-x-2 lg:order-last lg:grid-cols-4">
              {footerColumns.map((col) => (
                <div key={col.heading} className="col-span-1 mb-10 lg:mb-0">
                  <p className="mb-5 block text-[14px] leading-7 font-bold tracking-[0.3em] uppercase">{col.heading}</p>
                  {col.links.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="mb-5 block text-[18px] leading-7 hover:underline focus:text-white focus:underline focus:outline-none"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 mb-14 lg:order-first lg:col-span-3 lg:col-start-2">
            <Link href="/" aria-label="Return to homepage">
              <img src="/assets/logo/power-lime.svg" alt="" width={186} height={226} className="inline h-[226px] w-[186px]" />
            </Link>
            <div className="mt-14 ml-11 w-[72px] lg:w-[98px]">
              <img src="/assets/logo/pledge1-white.svg" alt="Pledge 1%" className="h-auto w-full" />
            </div>
          </div>
        </div>

        <div className={`${container} grid grid-cols-1 lg:grid-cols-12`}>
          <div className="col-span-1 mb-10 lg:col-span-3 lg:col-start-2 lg:mb-0">
            {socials.map((s) => (
              <Fragment key={s.name}>
                <a href={s.href} aria-label={`Link to Power's ${s.name}`} className="inline-block px-2">
                  <img src={s.icon} alt="" className="h-6 w-6 lg:h-4 lg:w-4" />
                </a>{" "}
              </Fragment>
            ))}
          </div>
          <div className="col-span-1 lg:col-span-7">
            <p className="text-[16px] leading-6 text-white/60">
              <span>© 2026 Power Home Remodeling. All Rights Reserved.</span>{" "}
              <Link href="/privacy-notice" className={legal}>
                Privacy Notice
              </Link>{" "}
              <Link href="/terms-of-service" className={legal}>
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full bg-navy py-10">
        <div className="mx-auto w-full px-6 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 3xl:max-w-[1728px]">
          <div className="border-t border-white pt-6 lg:pt-8">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 lg:gap-12 xl:gap-20">
              {footerBadges.map((b) => (
                <div key={b.src} className="flex items-center justify-center">
                  <a href={b.href}>
                    <img src={b.src} alt={b.alt} width={80} height={80} className="h-16 w-16 object-contain lg:h-20 lg:w-20" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
