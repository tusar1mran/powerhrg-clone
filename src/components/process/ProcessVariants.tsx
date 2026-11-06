import Link from "next/link";
import Reveal from "../Reveal";

export type ProcessStep = { title: string; text?: string };

export type ProcessProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  image?: string;
  steps: ProcessStep[];
  cta?: { label: string; href: string };
};

const num = (i: number) => String(i + 1).padStart(2, "0");

export function ProcessSplit({ id = "process", eyebrow = "How it works", title, text, image, steps, cta }: ProcessProps) {
  return (
    <section id={id} className="panel-wrap scroll-mt-24">
      <div className="on-dark inset-panel overflow-hidden bg-brand text-on-brand">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
          <Reveal className="flex flex-col">
            <p className="eyebrow text-on-brand/80">{eyebrow}</p>
            <h2 className="display-2 mt-4">{title}</h2>
            {text && <p className="lead mt-5 max-w-[460px] text-on-brand/75">{text}</p>}
            {cta && (
              <Link href={cta.href} className="btn btn-accent mt-8 self-start">
                {cta.label}
              </Link>
            )}
            {image && (
              <div
                aria-hidden
                className="mt-10 hidden min-h-[260px] flex-1 rounded-[var(--radius-card)] bg-brand-soft bg-cover bg-center lg:block"
                style={{ backgroundImage: `url(${image})` }}
              />
            )}
          </Reveal>
          <ol>
            {steps.map((step, i) => (
              <li key={step.title} className="border-t border-white/15 first:border-t-0">
                <Reveal delay={i * 100} className="grid grid-cols-[auto_1fr] gap-6 py-8 lg:gap-10 lg:py-10">
                  <span aria-hidden className="w-[2ch] font-display text-[44px] leading-none text-accent lg:text-[64px]">
                    {num(i)}
                  </span>
                  <div className="pt-1 lg:pt-3">
                    <h3 className="text-[20px] font-bold lg:text-[22px]">{step.title}</h3>
                    {step.text && <p className="mt-2 max-w-[440px] text-[16px] leading-relaxed text-on-brand/75">{step.text}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline({ id = "process", eyebrow = "How it works", title, text, steps, cta }: ProcessProps) {
  return (
    <section id={id} className="scroll-mt-24 border-y border-line py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <p className="eyebrow text-accent-ink">{eyebrow}</p>
          <h2 className="display-2 mt-4 text-brand">{title}</h2>
          {text && <p className="lead mt-5 text-muted">{text}</p>}
        </Reveal>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-line lg:block" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i * 110} className="flex flex-col items-center text-center">
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand font-display text-[20px] text-on-brand ring-8 ring-paper">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[19px] font-bold text-ink">{step.title}</h3>
                {step.text && <p className="mt-2 max-w-[260px] text-[15.5px] leading-relaxed text-muted">{step.text}</p>}
              </Reveal>
            </li>
          ))}
        </ol>
        {cta && (
          <div className="mt-14 text-center">
            <Link href={cta.href} className="btn btn-brand">
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function ProcessCards({ id = "process", eyebrow = "How it works", title, text, steps, cta }: ProcessProps) {
  return (
    <section id={id} className="panel-wrap scroll-mt-24">
      <div className="inset-panel bg-cream">
        <div className="container-page py-16 lg:py-24">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[620px]">
              <p className="eyebrow text-accent-ink">{eyebrow}</p>
              <h2 className="display-2 mt-4 text-brand">{title}</h2>
              {text && <p className="lead mt-5 text-muted">{text}</p>}
            </div>
            {cta && (
              <Link href={cta.href} className="btn btn-brand shrink-0 self-start lg:self-end">
                {cta.label}
              </Link>
            )}
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 90} className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7">
                  <span aria-hidden className="display-1 text-accent">
                    {num(i)}
                  </span>
                  <h3 className="mt-8 text-[19px] font-bold text-ink">{step.title}</h3>
                  {step.text && <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{step.text}</p>}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
