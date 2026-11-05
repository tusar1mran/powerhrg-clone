import Reveal from "./Reveal";

type Props = {
  /** Anchor id, so other pages can link to this band (e.g. /about#service-area). */
  id?: string;
  title: string[];
  label: string;
  href?: string;
  text?: string;
  tone?: "oat" | "white" | "charcoal";
  variant?: "button" | "link";
};

export default function CtaBand({ id, title, label, href = "#", text, tone = "oat", variant = "button" }: Props) {
  const bg = { oat: "bg-oat text-charcoal", white: "bg-white text-charcoal", charcoal: "on-dark bg-charcoal text-white" }[tone];
  const button =
    tone === "charcoal"
      ? "bg-gold text-charcoal hover:bg-white focus-visible:bg-white"
      : "bg-charcoal text-white hover:bg-gold hover:text-charcoal focus-visible:bg-gold focus-visible:text-charcoal";

  return (
    <section id={id} className={`${bg} scroll-mt-24 px-6 py-20 text-center lg:py-24 ${text ? "xl:py-32" : ""}`}>
      <Reveal>
        <h2 className="font-display text-[36px] leading-[1.1] font-medium tracking-display lg:text-[60px]">
          {title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        {text && <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[1.55] whitespace-pre-line xl:text-[19px]">{text}</p>}
        {variant === "button" ? (
          <a href={href} className={`btn-pill mt-10 ${button} ${text ? "lg:mt-12" : ""}`}>
            {label}
          </a>
        ) : (
          <a href={href} className="link-underline mt-10">
            {label}
          </a>
        )}
      </Reveal>
    </section>
  );
}
