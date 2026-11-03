import Reveal from "./Reveal";

type Props = {
  title: string[];
  label: string;
  href?: string;
  text?: string;
  tone?: "sky" | "white" | "navy";
  variant?: "button" | "link";
};

export default function CtaBand({ title, label, href = "#", text, tone = "sky", variant = "button" }: Props) {
  const bg = { sky: "bg-sky text-navy", white: "bg-white text-navy", navy: "bg-navy text-white" }[tone];
  const button =
    tone === "navy" ? "bg-lime text-navy hover:bg-white" : "bg-navy text-white hover:bg-lime hover:text-navy";

  return (
    <section className={`${bg} px-6 py-20 text-center lg:py-24 ${text ? "xl:py-36" : ""}`}>
      <Reveal>
        <h2 className="text-[30px] leading-[1.3] font-light tracking-[5px] uppercase lg:text-[63px] lg:tracking-[10px]">
          {title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        {text && <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-[1.45] whitespace-pre-line xl:text-[20px]">{text}</p>}
        {variant === "button" ? (
          <a
            href={href}
            className={`mt-10 inline-block px-6 py-4 text-[12px] font-bold tracking-[3px] uppercase transition-colors lg:text-[14px] lg:tracking-[4.2px] ${button} ${
              text ? "lg:mt-[60px]" : ""
            }`}
          >
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
