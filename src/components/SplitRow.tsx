import Link from "next/link";
import Photo from "./Photo";
import Reveal from "./Reveal";

type Props = {
  /** Anchor id, so other pages can link straight to this row (e.g. /support#warranty). */
  id?: string;
  title: string[];
  paragraphs: string[];
  image: string;
  imageAlt?: string;
  /** Which side the photo sits on. */
  imageSide: "left" | "right";
  /** Text-side tone. */
  tone: "cream" | "white" | "sand" | "charcoal" | "oat";
  cta?: { label: string; href: string; external?: boolean };
  eyebrow?: string;
  bullets?: string[];
  bulletsLabel?: string;
  capsBullets?: boolean;
  /**
   * "bleed": 50/50 full-width row, photo fills its half.
   * "contained": photo + copy inside the 1150px column.
   */
  variant: "bleed" | "contained";
};

// One alternating image/text row. Pages stack several, flipping imageSide and tone each time.
export default function SplitRow({
  id,
  title,
  paragraphs,
  image,
  imageAlt = "",
  imageSide,
  tone,
  cta,
  variant,
  eyebrow,
  bullets,
  bulletsLabel,
  capsBullets = false,
}: Props) {
  const bg = { cream: "bg-[#fbf8f3]", white: "bg-white", sand: "bg-sand", charcoal: "bg-charcoal", oat: "bg-oat/40" }[tone];
  const ink = tone === "charcoal" ? "on-dark text-white" : "text-charcoal";

  const copy = (
    <Reveal className={`max-w-[420px] ${ink}`}>
      {eyebrow && <p className="mb-3 text-[12px] font-semibold tracking-label uppercase opacity-70">{eyebrow}</p>}
      <h2 className="font-display text-[34px] leading-[1.1] font-medium tracking-display lg:text-[48px]">
        {title.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h2>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 24)} className="mt-5 text-[16px] leading-[24px] lg:text-[17px] lg:leading-[26px]">
          {p}
        </p>
      ))}
      {bulletsLabel && <p className="mt-5 text-[16px] leading-[24px] lg:text-[17px] lg:leading-[26px]">{bulletsLabel}</p>}
      {bullets && (
        <ul className={`mt-5 space-y-3 ${capsBullets ? "" : "pl-1"}`}>
          {bullets.map((b) => (
            <li
              key={b}
              className={`flex gap-3 ${
                capsBullets ? "text-[15px] font-semibold lg:text-[16px]" : "text-[15px] leading-[24px] lg:text-[16px]"
              }`}
            >
              <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {cta &&
        (cta.external ? (
          <a href={cta.href} target="_blank" rel="noopener noreferrer" className="link-underline relative mt-6">
            {cta.label}
          </a>
        ) : (
          <Link href={cta.href} className="link-underline relative mt-6">
            {cta.label}
          </Link>
        ))}
    </Reveal>
  );

  if (variant === "bleed") {
    return (
      <section id={id} className={`grid scroll-mt-24 lg:grid-cols-2 ${bg}`}>
        <div className={`flex items-center px-6 py-16 lg:min-h-[36vw] lg:px-[10%] ${imageSide === "left" ? "lg:order-2" : ""}`}>{copy}</div>
        <Photo src={image} label={imageAlt} className={`aspect-[4/3] lg:aspect-auto lg:min-h-[36vw] ${imageSide === "left" ? "lg:order-1" : ""}`} />
      </section>
    );
  }

  return (
    <section id={id} className={`${bg} scroll-mt-24 py-16 lg:py-24`}>
      {/* the photo always takes the wider column, whichever side it is on */}
      <div
        className={`mx-auto grid max-w-[1150px] items-center gap-10 px-6 lg:gap-[110px] ${
          imageSide === "left" ? "lg:grid-cols-[1.3fr_1fr]" : "lg:grid-cols-[1fr_1.3fr]"
        }`}
      >
        <Reveal className={imageSide === "right" ? "lg:order-2" : ""}>
          <Photo src={image} label={imageAlt} className="aspect-[660/540] w-full rounded-2xl" />
        </Reveal>
        <div className={imageSide === "right" ? "lg:order-1" : ""}>{copy}</div>
      </div>
    </section>
  );
}
