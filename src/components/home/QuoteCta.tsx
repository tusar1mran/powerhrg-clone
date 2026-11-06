import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  title: string[];
  text: string;
  label: string;
  href: string;
};

// Closing call to action for the redesigned pages: very large type, the quote button and the phone.
export default function QuoteCta({ id = "get-a-quote", title, text, label, href }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative isolate overflow-hidden bg-charcoal-950 px-5 py-28 sm:px-8 lg:px-10 lg:py-44">
      {/* a soft gold glow from below, the only decoration */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgb(240_173_60/0.22),transparent_70%)]"
      />
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-10 lg:items-center lg:text-center">
        <h2
          id={`${id}-title`}
          className="font-heading text-[52px] leading-[0.92] font-semibold tracking-tightest text-white sm:text-[80px] lg:text-[128px]"
        >
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="max-w-xl text-[17px] leading-relaxed text-white/75 lg:text-[19px]">{text}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={href} className={cn(buttonVariants(), "h-14 rounded-full px-8 text-[16px] font-semibold")}>
            {label}
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <a
            href={site.phone.href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-14 rounded-full border-white/20 bg-white/5 px-7 text-[16px] font-semibold tabular-nums",
            )}
          >
            <PhoneIcon data-icon="inline-start" />
            {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
