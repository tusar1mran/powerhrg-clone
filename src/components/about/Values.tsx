import { Eye, HardHat, HeartHandshake, MessageSquare, Scale, type LucideIcon } from "lucide-react";
import Reveal from "../Reveal";

export type ValueIcon = "honesty" | "care" | "craft" | "communication" | "fairness";

const icons: Record<ValueIcon, LucideIcon> = {
  honesty: Eye,
  care: HeartHandshake,
  craft: HardHat,
  communication: MessageSquare,
  fairness: Scale,
};

export type Value = { title: string; text: string; icon: ValueIcon };
type Props = { id?: string; eyebrow?: string; title: string[]; text: string; values: Value[] };

export default function Values({ id, eyebrow = "Our values", title, text, values }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-accent-ink">{eyebrow}</p>
            <h2 className="display-2 mt-4 text-brand">{title.join(" ")}</h2>
          </div>
          <p className="lead text-muted lg:pb-2">{text}</p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {values.map((v, i) => {
            const Icon = icons[v.icon];
            return (
              <li key={v.title} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                <Reveal delay={(i % 3) * 90} className="h-full rounded-[var(--radius-card)] border border-line bg-white p-7 lg:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
                    <Icon aria-hidden strokeWidth={1.75} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-[19px] font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{v.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
