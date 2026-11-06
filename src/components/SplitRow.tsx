import Link from "next/link";
import { Check } from "lucide-react";
import Photo from "./Photo";
import Reveal from "./Reveal";

type Props = {
  id?: string;
  title: string[];
  paragraphs: string[];
  image: string;
  imageAlt?: string;
  imageSide: "left" | "right";
  tone: "white" | "cream" | "sand" | "brand";
  cta?: { label: string; href: string; external?: boolean };
  eyebrow?: string;
  bullets?: string[];
  bulletsLabel?: string;
};

const tones = {
  white: { wrap: "", ink: "text-ink", muted: "text-muted", heading: "text-brand" },
  cream: { wrap: "inset-panel bg-cream", ink: "text-ink", muted: "text-muted", heading: "text-brand" },
  sand: { wrap: "inset-panel bg-sand", ink: "text-ink", muted: "text-ink/70", heading: "text-brand" },
  brand: { wrap: "on-dark inset-panel bg-brand", ink: "text-on-brand", muted: "text-on-brand/75", heading: "text-on-brand" },
};

export default function SplitRow({ id, title, paragraphs, image, imageAlt = "", imageSide, tone, cta, eyebrow, bullets, bulletsLabel }: Props) {
  const t = tones[tone];

  return (
    <section id={id} className={`scroll-mt-24 ${tone === "white" ? "py-16 lg:py-24" : "py-4"}`}>
      <div className={t.wrap}>
        <div
          className={`container-page grid items-center gap-10 lg:gap-20 ${tone === "white" ? "" : "py-16 lg:py-24"} ${
            imageSide === "left" ? "lg:grid-cols-[1.1fr_1fr]" : "lg:grid-cols-[1fr_1.1fr]"
          }`}
        >
          <Reveal className={imageSide === "right" ? "lg:order-2" : ""}>
            <Photo src={image} label={imageAlt} className="aspect-[5/4] w-full rounded-[var(--radius-card)]" />
          </Reveal>

          <Reveal delay={120} className={`max-w-[520px] ${t.ink} ${imageSide === "right" ? "lg:order-1" : ""}`}>
            {eyebrow && <p className={`eyebrow ${tone === "brand" ? "text-on-brand/80" : "text-accent-ink"}`}>{eyebrow}</p>}
            <h2 className={`display-2 mt-4 ${t.heading}`}>{title.join(" ")}</h2>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className={`mt-5 text-[16.5px] leading-relaxed ${t.muted}`}>
                {p}
              </p>
            ))}
            {bulletsLabel && <p className="mt-6 text-[16px] font-bold">{bulletsLabel}</p>}
            {bullets && (
              <ul className="mt-4 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[16px] leading-relaxed">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                      <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {cta &&
              (cta.external ? (
                <a href={cta.href} target="_blank" rel="noopener noreferrer" className="link-underline mt-8">
                  {cta.label}
                </a>
              ) : (
                <Link href={cta.href} className="link-underline mt-8">
                  {cta.label}
                </Link>
              ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
