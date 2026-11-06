import type { Feature } from "@/components/services/FeatureIcons";

type Props = { id?: string; title: string; features: Feature[] };

// What's included in a roof replacement, as a numbered grid of glass cards.
export default function RoofingFeatures({ id = "included", title, features }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 bg-charcoal-900 px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 lg:gap-16">
        <h2
          id={`${id}-title`}
          className="max-w-[18ch] font-heading text-[40px] leading-[0.98] font-semibold tracking-tightest text-white sm:text-[56px] lg:text-[72px]"
        >
          {title}
        </h2>
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li key={feature.title} className="flex flex-col gap-4 bg-charcoal-900 p-7 lg:p-9">
              <span aria-hidden className="text-[13px] font-semibold text-gold tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-[22px] leading-tight font-semibold text-white lg:text-[24px]">{feature.title}</h3>
              <p className="text-[15px] leading-relaxed text-white/70">{feature.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
