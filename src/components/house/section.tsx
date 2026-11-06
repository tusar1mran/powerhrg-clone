// Layout primitives shared by the redesigned pages: the page container and the section heading,
// which reads like the lettering on a drawing sheet (a small annotation above a serif title).
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-10", className)} {...props} />;
}

/** Small uppercase label with a short rule in front, used above section titles. */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("annotation flex items-center gap-3 text-gold-800", className)}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  /** Element id for the title, so the section can be labelled by it. */
  titleId?: string;
  className?: string;
  children?: ReactNode;
};

/** Eyebrow, serif title and optional intro (passed as children). */
export function SectionHeader({ eyebrow, title, titleId, className, children }: SectionHeaderProps) {
  return (
    <div className={cn("flex max-w-[52rem] flex-col gap-4", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={titleId} className="font-display text-[40px] leading-[1.02] tracking-display sm:text-[52px] lg:text-[64px]">
        {title}
      </h2>
      {children ? <div className="max-w-[60ch] text-[17px] leading-7 text-charcoal-700">{children}</div> : null}
    </div>
  );
}
