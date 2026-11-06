import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { ServiceName } from "@/lib/links";
import { chapterDetails, walkaroundChrome } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import { chapterDomId, chapterIndexOf, SERVICE_CHAPTER_COUNT } from "../chapters";
import { QuoteToggle } from "./QuoteToggle";

type Props = {
  service: { name: ServiceName; href: string; text: string };
};

/**
 * One stop on the tour. The section is two screens tall: while it scrolls past, its panel stays
 * pinned and the camera holds on that part of the house. Everything the 3D view shows for the
 * chapter (the part's name, what it does, its layers) is in this HTML too.
 */
export function ChapterSection({ service }: Props) {
  const id = chapterDomId(service.name);
  const details = chapterDetails[service.name];
  const index = chapterIndexOf(service.name);

  return (
    <section
      id={id}
      // Must match CHAPTER_SECTION_ATTRIBUTE, which the scroll timeline uses to find the chapters.
      data-walkaround-chapter=""
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className="relative h-[220svh] outline-none"
    >
      <div className="sticky top-0 flex h-svh items-end px-3 pt-24 pb-[5.5rem] sm:px-6 lg:items-center lg:px-10 lg:py-24">
        <article className="pointer-events-auto mx-auto flex w-full max-w-[1440px]">
          <div className="flex w-full max-w-[30rem] flex-col gap-4 rounded-3xl border border-white/10 bg-charcoal-950/65 p-5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-2xl sm:p-7 lg:gap-5 lg:p-9">
            <p className="flex items-center gap-3 text-[12px] font-semibold tracking-label text-gold uppercase">
              <span className="tabular-nums">{walkaroundChrome.chapterOf(index, SERVICE_CHAPTER_COUNT)}</span>
              <span aria-hidden className="h-px flex-1 bg-white/15" />
            </p>
            <div className="flex flex-col gap-2">
              <h2
                id={`${id}-title`}
                className="font-heading text-[40px] leading-[0.95] font-semibold tracking-tightest text-white sm:text-[52px] lg:text-[64px]"
              >
                {service.name}
              </h2>
              <p className="text-[15px] font-medium text-white/60 lg:text-[16px]">{details.moment}</p>
            </div>
            <p className="text-[15px] leading-relaxed text-white/85 lg:text-[17px]">{service.text}</p>

            {details.layers.length > 0 ? (
              <ol className="flex flex-wrap gap-1.5" aria-label={`${service.name}: ${details.moment}`}>
                {details.layers.map((layer, layerIndex) => (
                  <li
                    key={layer}
                    className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-[12px] font-medium text-white/80"
                  >
                    <span aria-hidden className="text-gold tabular-nums">
                      {layerIndex + 1}
                    </span>
                    {layer}
                  </li>
                ))}
              </ol>
            ) : null}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <QuoteToggle service={service.name} />
              <Link
                href={service.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 rounded-full px-4 text-[14px] font-semibold text-white hover:bg-white/10",
                )}
              >
                {walkaroundChrome.learnMore(service.name)}
                <ArrowUpRightIcon data-icon="inline-end" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
