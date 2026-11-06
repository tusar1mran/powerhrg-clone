import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { headerCta } from "@/lib/content";
import { roofExplorer, roofingHero } from "@/lib/roofing-content";
import { cn } from "@/lib/utils";

// Opening of /services/roofing in the redesign: type only, so the 3D section below is the image.
export default function RoofingHero() {
  return (
    <section aria-labelledby="roofing-title" className="px-5 pt-32 pb-14 sm:px-8 lg:px-10 lg:pt-44 lg:pb-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h1
          id="roofing-title"
          className="font-heading text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-semibold tracking-tightest text-white"
        >
          {roofingHero.title.map((line, index) => (
            <span key={line} className={cn("block", index === roofingHero.title.length - 1 && "text-gold")}>
              {line}
            </span>
          ))}
        </h1>
        <div className="flex max-w-md flex-col items-start gap-6 lg:pb-3">
          <p className="text-[17px] leading-relaxed text-white/75 lg:text-[19px]">{roofingHero.subtitle.join(" ")}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#roof-explorer" className={cn(buttonVariants(), "h-12 rounded-full px-6 text-[15px] font-semibold")}>
              {roofExplorer.title}
              <ArrowDownIcon data-icon="inline-end" />
            </a>
            <Link
              href={headerCta.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full border-white/20 bg-white/5 px-6 text-[15px] font-semibold",
              )}
            >
              {headerCta.label}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
