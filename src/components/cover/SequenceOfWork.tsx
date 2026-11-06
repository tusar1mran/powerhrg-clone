import Link from "next/link";

type Step = { title: string; text: string };

type Props = {
  title: string;
  steps: Step[];
  stepLabel: string;
  cta: { label: string; href: string };
};

// "Sequence of work": the project steps as a numbered chain of bubbles joined by a leader line,
// across the sheet on desktop and down it on mobile. The line is decorative; the list order carries
// the sequence for screen readers.
export default function SequenceOfWork({ title, steps, stepLabel, cta }: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="type-heading text-[30px] sm:text-[38px]">{title}</h3>
        <Link
          href={cta.href}
          className="text-[15px] font-semibold underline decoration-gold decoration-2 underline-offset-[6px] hover:decoration-charcoal"
        >
          {cta.label}
        </Link>
      </div>

      <ol className="mt-10 grid gap-0 md:grid-cols-4">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step.title} className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 pb-10 md:block md:pr-8 md:pb-0">
              {/* leader to the next step: vertical on mobile, horizontal on desktop */}
              {last ? null : (
                <>
                  <span aria-hidden className="absolute top-14 bottom-0 left-7 w-px bg-charcoal md:hidden" />
                  <span aria-hidden className="absolute top-7 right-0 left-14 hidden h-px bg-charcoal md:block">
                    <span className="absolute -top-[4.5px] right-0 size-0 border-y-[5px] border-l-[9px] border-y-transparent border-l-charcoal" />
                  </span>
                </>
              )}
              <span
                aria-hidden
                className="type-mono relative flex size-14 items-center justify-center rounded-full border-[1.5px] border-charcoal bg-paper text-[15px] font-semibold"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-5">
                <p className="type-mono text-[10.5px] text-charcoal/75">{`${stepLabel} ${i + 1}`}</p>
                <h4 className="type-sheet mt-1 text-[18px] leading-tight">{step.title}</h4>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.6] text-charcoal/90">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
