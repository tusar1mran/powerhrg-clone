import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string[];
  text: string;
  cta: string;
  href: string;
};

// The workmanship warranty in the redesign: a large statement with a gold rule, no photo.
export default function RoofingGuarantee({ eyebrow, title, text, cta, href }: Props) {
  return (
    <section aria-labelledby="guarantee-title" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-10 border-t border-gold/40 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:pt-16">
        <div className="flex flex-col gap-5">
          <p className="text-[12px] font-semibold tracking-label text-gold uppercase">{eyebrow}</p>
          <h2
            id="guarantee-title"
            className="font-heading text-[48px] leading-[0.92] font-semibold tracking-tightest text-white sm:text-[72px] lg:text-[96px]"
          >
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className="flex flex-col items-start gap-8 lg:justify-end lg:pb-4">
          <p className="max-w-xl text-[18px] leading-relaxed text-white/80 lg:text-[21px]">{text}</p>
          <Link
            href={href}
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-gold hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <span className="underline decoration-gold/40 decoration-2 underline-offset-8 group-hover:decoration-white">{cta}</span>
            <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
