/* eslint-disable @next/next/no-img-element -- static logos and badges */
import Link from "next/link";
import { footerBadges, footerColumns } from "@/lib/content";

const socials = [
  { name: "YouTube", icon: "/assets/social/youtube.svg" },
  { name: "LinkedIn", icon: "/assets/social/linkedin.svg" },
  { name: "Instagram", icon: "/assets/social/instagram.svg" },
  { name: "TikTok", icon: "/assets/social/tiktok.svg" },
  { name: "Facebook", icon: "/assets/social/facebook.svg" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pt-20 pb-10 lg:grid-cols-[1fr_3fr] lg:px-12 2xl:px-[200px]">
        <div className="flex flex-col items-start gap-12 lg:items-center">
          <img src="/assets/logo/power-lime.svg" alt="Power" className="h-[160px] w-auto" />
          {/* the saved Pledge 1% mark is black; invert it to white like the reference footer */}
          <img src="/assets/logo/pledge1.svg" alt="Pledge 1%" className="h-[62px] w-auto brightness-0 invert" />
          <ul className="flex gap-4">
            {socials.map((s) => (
              <li key={s.name}>
                <a href="#" aria-label={s.name} className="block opacity-100 transition-opacity hover:opacity-70">
                  <img src={s.icon} alt="" className="h-[13px] w-auto" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-[11px] font-bold tracking-[2.8px] uppercase">{col.heading}</h4>
                <ul className="mt-5 space-y-[18px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[14px] hover:text-lime">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[12px] text-white/70">
            © 2026 Power Home Remodeling. All Rights Reserved.{" "}
            <a href="#" className="hover:text-white">Privacy Notice</a>{" "}
            <a href="#" className="ml-2 hover:text-white">Terms of Service</a>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-[85px]">
        <ul className="flex flex-wrap items-center justify-center gap-10 border-t border-white/10 py-8">
          {footerBadges.map((b) => (
            <li key={b.src}>
              <img src={b.src} alt={b.alt} className="h-[66px] w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
