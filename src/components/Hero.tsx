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
  buttonVariant?: "lime" | "outline";
  overlay?: boolean;
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
  buttonVariant = "lime",
  overlay = false,
}: Props) {
  const mobile = mobileImage ?? image;
  const base = "#7ba3e6";

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
      className={`relative flex items-start overflow-hidden [background:var(--hero-m)] lg:[background:var(--hero-d)] ${
        size === "full" ? "h-screen min-h-[640px]" : "h-[600px] lg:h-[700px]"
      }`}
    >
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,31,63,0.8)_15%,rgba(0,31,63,0.45)_55%,transparent_90%)] md:bg-[linear-gradient(to_right,rgba(0,31,63,0.6)_40%,rgba(0,31,63,0.25)_70%,transparent_100%)]"
        />
      )}
      <div className={`relative px-6 sm:px-12 lg:pl-[203px] ${size === "full" ? "pt-[180px] lg:pt-[215px]" : "pt-[150px] lg:pt-[190px]"}`}>
        <h1
          className={`text-[40px] leading-[1.3] font-light tracking-[5px] text-lime uppercase sm:text-[56px] ${
            // the short banner (about) uses a 60px title so four lines + CTA fit in 700px
            size === "full" ? "lg:text-[76px] lg:tracking-hero" : "lg:text-[60px]"
          }`}
        >
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        {/* long single-paragraph subtitles (community, belonging) are 20px and wrap at ~650px on the reference */}
        <p
          className={`mt-6 text-[18px] leading-[28px] text-white ${
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
                ? "mt-[35px] flex w-full items-center justify-center border-4 border-white px-8 py-6 text-[14px] leading-none font-bold tracking-[0.3em] text-white uppercase transition-colors hover:bg-white hover:text-navy sm:inline-flex sm:w-auto sm:min-w-[240px]"
                : "mt-10 inline-block bg-lime px-6 py-4 text-[12px] font-bold tracking-[3px] text-navy uppercase transition-colors hover:bg-white lg:mt-12 lg:text-[13px] lg:tracking-[3.5px]"
            }
          >
            {button.label}
          </a>
        )}
        <a
          href={ctaHref}
          className={`link-underline text-white ${button ? "mt-8 flex w-fit lg:mt-10" : size === "full" ? "mt-12 lg:mt-20" : "mt-8 lg:mt-10"}`}
        >
          {ctaLabel} <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}
