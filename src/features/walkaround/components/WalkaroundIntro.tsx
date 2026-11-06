import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { serviceLinks } from "@/lib/links";
import { walkaroundHero } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import { chapterDomId, INTRO_DOM_ID } from "../chapters";

const firstChapter = `#${chapterDomId(serviceLinks[0].name)}`;

/**
 * The hero: plain server-rendered HTML laid over the stage, so the headline paints before any
 * 3D code has loaded. Only the text and links take pointer events; the rest of the screen belongs
 * to the house behind it.
 */
export function WalkaroundIntro() {
  return (
    <section
      id={INTRO_DOM_ID}
      tabIndex={-1}
      aria-labelledby="walkaround-title"
      className="relative flex min-h-svh flex-col justify-start px-5 pt-24 pb-28 outline-none sm:px-8 lg:justify-end lg:px-10 lg:pt-28 lg:pb-16"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="pointer-events-auto flex max-w-[44rem] flex-col items-start gap-5 lg:gap-7">
          <p className="flex items-center gap-3 text-[12px] font-semibold tracking-label text-gold uppercase">
            <span aria-hidden className="h-px w-8 bg-gold" />
            {walkaroundHero.eyebrow}
          </p>
          <h1
            id="walkaround-title"
            className="font-heading text-[clamp(3.1rem,10.5vw,8.25rem)] leading-[0.9] font-semibold tracking-tightest text-white [text-shadow:0_2px_30px_rgb(11_17_20/0.45)]"
          >
            {walkaroundHero.title.map((line, index) => (
              <span key={line} className={cn("block", index === walkaroundHero.title.length - 1 && "text-white/80")}>
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[34rem] text-[17px] leading-relaxed text-white/80 lg:text-[19px]">
            {walkaroundHero.subtitle.join(" ")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={firstChapter} className={cn(buttonVariants(), "h-12 rounded-full px-6 text-[15px] font-semibold")}>
              {walkaroundHero.start}
              <ArrowDownIcon data-icon="inline-end" />
            </a>
            <Link
              href={walkaroundHero.quote.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full border-white/25 bg-white/5 px-6 text-[15px] font-semibold backdrop-blur-md",
              )}
            >
              {walkaroundHero.quote.label}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </div>
        </div>

        <nav aria-label={walkaroundHero.indexLabel} className="pointer-events-auto mt-10 hidden lg:block">
          <p className="mb-3 text-[12px] font-semibold tracking-label text-white/50 uppercase">{walkaroundHero.indexLabel}</p>
          <ol className="flex flex-wrap gap-2">
            {serviceLinks.map((service, index) => (
              <li key={service.name}>
                <a
                  href={`#${chapterDomId(service.name)}`}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-white/12 bg-charcoal-950/40 px-4 text-[13px] font-medium text-white/80 backdrop-blur-md transition-colors hover:border-gold/60 hover:text-white focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <span className="text-white/40 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  {service.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <p aria-hidden className="absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[12px] tracking-label text-white/55 uppercase lg:bottom-8">
        <span className="h-6 w-px animate-pulse bg-white/40 motion-reduce:animate-none" />
        {walkaroundHero.scrollHint}
      </p>
    </section>
  );
}
