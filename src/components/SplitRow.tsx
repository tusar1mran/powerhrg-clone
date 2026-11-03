import Photo from "./Photo";
import Reveal from "./Reveal";

type Props = {
  title: string[];
  paragraphs: string[];
  image: string;
  imageAlt?: string;
  /** Which side the photo sits on. */
  imageSide: "left" | "right";
  /** Text-side tone: pale blue or white. */
  tone: "blue" | "white" | "sky" | "navy" | "pale";
  cta?: { label: string; href?: string; file?: boolean };
  eyebrow?: string;
  badge?: string;
  bullets?: string[];
  bulletsLabel?: string;
  capsBullets?: boolean;
  /** Optional section background image (contained variant), e.g. the soft blue wave behind Nitro. */
  bgImage?: string;
  /**
   * "bleed": 50/50 full-width row, photo fills its half (community programs).
   * "contained": photo + copy inside the 1150px column (belonging).
   */
  variant: "bleed" | "contained";
};

// One alternating image/text row. Pages stack several, flipping imageSide and tone each time.
export default function SplitRow({
  title,
  paragraphs,
  image,
  imageAlt = "",
  imageSide,
  tone,
  cta,
  variant,
  eyebrow,
  badge,
  bullets,
  bulletsLabel,
  capsBullets = false,
  bgImage,
}: Props) {
  const bg = { blue: "bg-[#edf3fd]", white: "bg-white", sky: "bg-sky-soft", navy: "bg-navy", pale: "bg-sky/20" }[tone];
  const ink = tone === "navy" ? "text-white" : "text-navy";

  const copy = (
    <Reveal className={`max-w-[420px] ${ink}`}>
      {badge && (
        <div
          className="relative mb-[25px] flex h-[60px] w-[50px] items-center justify-center bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/assets/support/sash/number-bg.png)" }}
        >
          <span className="text-[18px] font-bold">{badge}</span>
        </div>
      )}
      {eyebrow && <p className="mb-3 text-[11px] font-bold tracking-[2.8px] uppercase">{eyebrow}</p>}
      <h2 className="text-[30px] leading-[1.3] font-light tracking-[4px] uppercase lg:text-[47px] lg:tracking-card">
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
                capsBullets ? "text-[12px] font-bold tracking-[3px] uppercase lg:text-[13px]" : "text-[15px] leading-[24px] lg:text-[16px]"
              }`}
            >
              <span aria-hidden>•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {cta && (
        <a href={cta.href ?? "#"} className="link-underline relative mt-6">
          {cta.label}
          {cta.file && (
            <span
              aria-hidden
              className="absolute top-[40%] -right-6 h-3 w-3 -translate-y-1/2 bg-contain bg-no-repeat"
              style={{ backgroundImage: "url(/assets/support/warranties/open-file-icon.png)" }}
            />
          )}
        </a>
      )}
    </Reveal>
  );

  if (variant === "bleed") {
    return (
      <section className={`grid lg:grid-cols-2 ${bg}`}>
        <div className={`flex items-center px-6 py-16 lg:min-h-[36vw] lg:px-[10%] ${imageSide === "left" ? "lg:order-2" : ""}`}>{copy}</div>
        <Photo src={image} label={imageAlt} className={`aspect-[4/3] lg:aspect-auto lg:min-h-[36vw] ${imageSide === "left" ? "lg:order-1" : ""}`} />
      </section>
    );
  }

  return (
    <section
      className={`${bg} bg-cover bg-center py-16 lg:py-24`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {/* the photo always takes the wider column, whichever side it is on */}
      <div
        className={`mx-auto grid max-w-[1150px] items-center gap-10 px-6 lg:gap-[110px] ${
          imageSide === "left" ? "lg:grid-cols-[1.3fr_1fr]" : "lg:grid-cols-[1fr_1.3fr]"
        }`}
      >
        <Reveal className={imageSide === "right" ? "lg:order-2" : ""}>
          <Photo src={image} label={imageAlt} className="aspect-[660/540] w-full" />
        </Reveal>
        <div className={imageSide === "right" ? "lg:order-1" : ""}>{copy}</div>
      </div>
    </section>
  );
}
