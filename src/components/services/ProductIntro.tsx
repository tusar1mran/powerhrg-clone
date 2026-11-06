import type { ReactNode } from "react";
import Photo from "../Photo";
import Reveal from "../Reveal";
import FeatureIconSvg, { type FeatureIcon } from "./FeatureIcons";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  logo?: { src: string; alt: string };
  children?: ReactNode;
  features: { icon: FeatureIcon; title: string; text: string }[];
};

export default function ProductIntro({ eyebrow, title, text, logo, children, features }: Props) {
  return (
    <section id="product" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page">
        <Reveal className={logo ? "grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]" : "grid gap-6 lg:grid-cols-2 lg:items-end"}>
          <div>
            <p className="eyebrow text-accent-ink">{eyebrow}</p>
            <h2 className="display-2 mt-4 text-brand">{title}</h2>
          </div>
          {logo ? (
            <Photo src={logo.src} contain label={logo.alt} className="mx-auto h-[200px] w-[200px] lg:h-[246px] lg:w-[246px]" />
          ) : (
            text && <p className="lead text-muted lg:pb-2">{text}</p>
          )}
        </Reveal>
        {logo && text && <p className="lead mt-6 max-w-[620px] text-muted">{text}</p>}

        {children}

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((f, i) => (
            <li key={f.title}>
              <Reveal
                delay={(i % 3) * 90}
                className="group h-full rounded-[var(--radius-card)] border border-line bg-white p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft transition-colors duration-300 group-hover:bg-accent">
                  <FeatureIconSvg name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[18px] font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{f.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
