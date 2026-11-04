import Link from "next/link";
import Reveal from "./Reveal";

export type ProcessStep = { title: string; text?: string };

type Props = {
  id?: string;
  title: string;
  steps: ProcessStep[];
  cta?: { label: string; href: string };
};

// Navy band with numbered lime circles joined by a line. Used on the homepage and /support.
export default function Process({ id = "process", title, steps, cta }: Props) {
  return (
    <section id={id} className="on-dark scroll-mt-24 bg-navy py-16 text-white lg:py-20">
      <Reveal className="mx-auto max-w-[1100px] px-6 text-center">
        <h2 className="text-[34px] leading-tight font-light tracking-[8px] uppercase lg:text-[48px] lg:tracking-[12px] xl:text-[63px] xl:tracking-section">
          {title}
        </h2>

        <ol className="mx-auto mt-14 grid max-w-[1030px] grid-cols-2 gap-x-6 gap-y-10 md:flex md:items-start md:justify-between">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-1 flex-col items-center">
              {/* connecting line to the next circle */}
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute top-[33px] left-[calc(50%+46px)] hidden h-[6px] w-[calc(100%-92px)] bg-[#d5dde8] md:block" />
              )}
              <span
                aria-hidden
                className="flex h-[66px] w-[66px] items-center justify-center rounded-full border-2 border-lime text-[34px] font-light text-lime"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-[13px] font-bold tracking-card uppercase lg:text-[15px]">{step.title}</h3>
              {step.text && <p className="mt-3 max-w-[220px] text-[14px] leading-[22px] text-white/85 lg:text-[15px]">{step.text}</p>}
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
