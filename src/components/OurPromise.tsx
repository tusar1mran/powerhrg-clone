import Link from "next/link";
import Reveal from "./Reveal";
import Slot from "./layout/Slot";

export type PromiseItem = { title: string; text: string };

type Props = {
  id?: string;
  eyebrow: string;
  title: string[];
  paragraphs: string[];
  cta?: { label: string; href: string };
  items: PromiseItem[];
};

const num = (i: number) => String(i + 1).padStart(2, "0");

function PromiseGrid({ id = "promise", eyebrow, title, paragraphs, cta, items }: Props) {
  return (
    <section id={id} className="panel-wrap scroll-mt-24">
      <div className="inset-panel bg-cream">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <div>
            <Reveal className="lg:sticky lg:top-32">
              <p className="eyebrow text-accent-ink">{eyebrow}</p>
              <h2 className="display-2 mt-4 text-brand">{title.join(" ")}</h2>
              {paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="lead mt-5 max-w-[440px] text-muted">
                  {p}
                </p>
              ))}
              {cta && (
                <Link href={cta.href} className="btn btn-brand mt-8">
                  {cta.label}
                </Link>
              )}
            </Reveal>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 2) * 90} className="h-full rounded-[var(--radius-card)] bg-white p-7">
                  <span aria-hidden className="font-display text-[15px] text-accent-ink">
                    {num(i)}
                  </span>
                  <h3 className="mt-3 text-[19px] font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PromiseList({ id = "promise", eyebrow, title, paragraphs, cta, items }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-accent-ink">{eyebrow}</p>
            <h2 className="display-2 mt-4 text-brand">{title.join(" ")}</h2>
          </div>
          <div className="lg:pb-2">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="lead text-muted">
                {p}
              </p>
            ))}
            {cta && (
              <Link href={cta.href} className="link-underline mt-5 text-ink">
                {cta.label}
              </Link>
            )}
          </div>
        </Reveal>
        <ol className="mt-14 grid gap-x-16 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.title} className="border-t border-line">
              <Reveal delay={(i % 2) * 80} className="grid grid-cols-[3rem_1fr] gap-4 py-7">
                <span aria-hidden className="font-display text-[22px] leading-none text-accent-ink">
                  {num(i)}
                </span>
                <div>
                  <h3 className="text-[19px] font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function OurPromise(props: Props) {
  return <Slot name="promise" fallback="grid" variants={{ grid: <PromiseGrid {...props} />, list: <PromiseList {...props} /> }} />;
}
