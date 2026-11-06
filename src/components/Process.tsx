import Link from "next/link";
import Reveal from "./Reveal";

export type ProcessStep = { title: string; text?: string };

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  image?: string;
  steps: ProcessStep[];
  cta?: { label: string; href: string };
};

export default function Process({ id = "process", eyebrow = "How it works", title, text, image, steps, cta }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-4">
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
                role="img"
                aria-label="Crew framing a house"
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
                    {String(i + 1).padStart(2, "0")}
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
