import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { StoryChapter as StoryChapterContent } from "@/lib/house-content";
import { cn } from "@/lib/utils";
import { Eyebrow } from "../section";
import { LayerNotes } from "./LayerNotes";

type Props<K extends string> = {
  chapter: StoryChapterContent<K>;
  order: readonly K[];
  /** The exploded diagram. It is decorative; the numbered notes carry the same information. */
  figure: ReactNode;
  /** Which side the diagram sits on from the lg breakpoint up. */
  figureSide: "start" | "end";
};

/**
 * One chapter of "Take the house apart". On large screens the diagram stays pinned while the
 * notes scroll past it, and globals.css separates the layers over that scroll (`story-chapter`,
 * `story-figure`). With reduced motion the diagram is simply shown exploded.
 */
export function StoryChapter<K extends string>({ chapter, order, figure, figureSide }: Props<K>) {
  const titleId = `story-${chapter.service.toLowerCase()}`;

  return (
    <article
      aria-labelledby={titleId}
      className="story-chapter grid gap-10 border-t border-charcoal py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
    >
      <div className={cn("lg:sticky lg:top-24 lg:self-start", figureSide === "end" && "lg:order-2")}>
        <div className="story-figure border border-charcoal bg-paper drafting-grid">
          <div className="px-4 pt-6 pb-2 sm:px-8 sm:pt-8">{figure}</div>
          <p className="annotation border-t border-charcoal/20 px-4 py-2 text-charcoal-700 sm:px-6">{chapter.figureLabel}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Eyebrow>{chapter.eyebrow}</Eyebrow>
        <h3 id={titleId} className="font-display text-[32px] leading-[1.05] tracking-display sm:text-[40px]">
          {chapter.title}
        </h3>
        <p className="max-w-[60ch] text-[16px] leading-7 text-charcoal-700">{chapter.text}</p>
        <LayerNotes order={order} notes={chapter.notes} className="mt-3" />
        <Link href={chapter.href} className="inline-flex w-fit items-center gap-2 py-2 text-charcoal">
          <span className="link-underline">{chapter.linkLabel}</span>
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </article>
  );
}
