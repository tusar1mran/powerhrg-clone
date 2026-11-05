import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";

/**
 * How to lay the mobile image out on desktop when the desktop file is not in /public yet:
 * the portrait render is pinned to the right and the sides are filled with a gradient that
 * matches the image's own edge colours, so there is no visible seam.
 */
export type DesktopFallback = { size: string; position: string; gradient: string };

type Props = {
  title: string[]; // one entry per line
  subtitle: string[];
  /** Desktop (landscape) image. */
  image: string;
  /** Mobile (portrait) image, used below the lg breakpoint. */
  mobileImage?: string;
  desktopFallback?: DesktopFallback;
  /** "full" = viewport-height hero (home, services). "short" = ~700px banner (about). */
  size?: "full" | "short";
  ctaHref?: string;
  ctaLabel?: string;
  button?: { label: string; href: string };
  buttonVariant?: "solid" | "outline";
  overlay?: boolean;
  ink?: "light" | "dark";
  onDark?: boolean;
};

// Server component: checks the file system so a missing desktop image falls back cleanly,
// and the real image takes over automatically once it is dropped into /public.
const inPublic = (src: string) => existsSync(path.join(process.cwd(), "public", src));

export default function Hero({
  title,
  subtitle,
  image,
  mobileImage,
  desktopFallback,
  size = "full",
  ctaHref = "#services",
  ctaLabel = "Explore services",
  button,
  buttonVariant = "solid",
  overlay = false,
  ink = "light",
  onDark = false,
}: Props) {
  const dark = ink === "dark";
  const mobile = mobileImage ?? image;
  // shown behind the photo while it loads (charcoal-700)
  const base = "#33454d";

  let desktopBg = `url(${image}) center / cover no-repeat, ${base}`;
  if (!inPublic(image) && mobileImage) {
    desktopBg = desktopFallback
      ? `url(${mobile}) ${desktopFallback.position} / ${desktopFallback.size} no-repeat, ${desktopFallback.gradient}`
      : `url(${mobile}) center / cover no-repeat, ${base}`;
  }

  const style = {
    "--hero-d": desktopBg,
    "--hero-m": `url(${mobile}) center / cover no-repeat, ${base}`,
  } as CSSProperties;

  return (
    <section
      style={style}
      className={`relative flex items-start overflow-hidden ${onDark ? "on-dark" : ""} [background:var(--hero-m)] lg:[background:var(--hero-d)] ${
        size === "full" ? "h-screen min-h-[640px]" : "h-[600px] lg:h-[700px]"
      }`}
    >
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(30,43,49,0.82)_15%,rgba(30,43,49,0.45)_55%,transparent_90%)] md:bg-[linear-gradient(to_right,rgba(30,43,49,0.7)_35%,rgba(30,43,49,0.3)_65%,transparent_100%)]"
        />
      )}
      {/* light copy gets a soft shadow so it stays readable on bright photos without an overlay */}
      <div
        className={`relative px-6 sm:px-12 lg:pl-[160px] ${dark ? "" : "[text-shadow:0_2px_16px_rgba(30,43,49,0.45)]"} ${
          size === "full" ? "pt-[170px] lg:pt-[205px]" : "pt-[140px] lg:pt-[180px]"
        }`}
      >
        {/* short gold rule above the title */}
        <span aria-hidden className="fade-in-up mb-6 block h-1 w-14 rounded-full bg-gold lg:mb-8" />
        <h1
          className={`fade-in-up font-display text-[44px] leading-[1.08] font-medium tracking-display sm:text-[60px] ${dark ? "text-charcoal" : "text-white"} ${
            // the short banner (about) uses a 64px title so four lines + CTA fit in 700px
            size === "full" ? "lg:text-[84px]" : "lg:text-[64px]"
          }`}
        >
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        {/* long single-paragraph subtitles are 20px and wrap at ~650px */}
        <p
          className={`fade-in-up-delay mt-6 text-[18px] leading-[28px] ${dark ? "max-w-[680px] text-charcoal" : "text-white/90"} ${
            subtitle.length === 1 && subtitle[0].length > 110 ? "max-w-[650px] lg:text-[20px] lg:leading-[30px]" : ""
          }`}
        >
          {subtitle.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        {button && (
          <a
            href={button.href}
            className={
              buttonVariant === "outline"
                ? "btn-pill fade-in-up mt-[35px] flex w-full border-2 border-white text-white hover:bg-white hover:text-charcoal focus-visible:bg-white focus-visible:text-charcoal sm:inline-flex sm:w-auto sm:min-w-[220px]"
                : "btn-pill mt-10 bg-gold text-charcoal hover:bg-gold-600 focus-visible:bg-gold-600 lg:mt-12"
            }
          >
            {button.label}
          </a>
        )}
        <a
          href={ctaHref}
          className={`group relative inline-block pr-6 ${dark ? "text-charcoal" : "text-white"} ${button ? "mt-8 flex w-fit lg:mt-10" : size === "full" ? "mt-12 lg:mt-16" : "mt-8 lg:mt-10"}`}
        >
          <span className="link-underline">{ctaLabel}</span>
          <span aria-hidden className="absolute top-0 right-0 inline-block text-[15px] leading-6 font-semibold transition-transform duration-500 group-hover:translate-y-1.5">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
