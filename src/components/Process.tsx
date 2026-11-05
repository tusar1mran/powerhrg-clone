import Link from "next/link";
import Reveal from "./Reveal";

export type ProcessStep = { title: string; text?: string };

type Props = {
  id?: string;
  title: string;
  steps: ProcessStep[];
  cta?: { label: string; href: string };
};

// Charcoal band with numbered gold badges joined by a dashed line. Used on the homepage and /support.
export default function Process({ id = "process", title, steps, cta }: Props) {
  return (
    <section id={id} className="on-dark scroll-mt-24 bg-charcoal py-16 text-white lg:py-24">
      <Reveal className="mx-auto max-w-[1100px] px-6 text-center">
        <h2 className="font-display text-[36px] leading-tight font-medium tracking-display lg:text-[52px] xl:text-[60px]">{title}</h2>

        <ol className="mx-auto mt-14 grid max-w-[1030px] grid-cols-2 gap-x-6 gap-y-10 md:flex md:items-start md:justify-between">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-1 flex-col items-center">
              {/* dashed connector to the next badge */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[27px] left-[calc(50%+40px)] hidden w-[calc(100%-80px)] border-t-2 border-dashed border-white/30 md:block"
                />
              )}
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold font-display text-[26px] font-semibold text-charcoal"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-[16px] font-semibold lg:text-[17px]">{step.title}</h3>
              {step.text && <p className="mt-2 max-w-[220px] text-[14px] leading-[22px] text-white/80 lg:text-[15px]">{step.text}</p>}
            </li>
          ))}
        </ol>

        {cta && (
          <Link href={cta.href} className="link-underline mt-14">
            {cta.label}
          </Link>
        )}
      </Reveal>
    </section>
  );
}
