import Photo from "./Photo";
import Reveal from "./Reveal";

export type ImageCard = { title: string; image: string; text: string; cta: string; href?: string };

type Props = {
  heading: string;
  cards: ImageCard[];
  /** Vertical white title over the photo. The community page's cards have none. */
  verticalTitle?: boolean;
  tone?: "white" | "sky";
};

// Two photo cards - "Power is our people", "Reasons to relax", "Improvement never ends".
export default function ImageCardPair({ heading, cards, verticalTitle = true, tone = "white" }: Props) {
  return (
    <section className={`${tone === "sky" ? "bg-sky-soft" : "bg-white"} py-20 lg:py-24`}>
      <div className="mx-auto max-w-[1150px] px-6">
        <Reveal>
          <h2 className="text-[28px] font-light tracking-[4px] text-navy uppercase lg:text-[37px] lg:tracking-card">{heading}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 150}>
              <a href={c.href ?? "#"} aria-label={c.title} className="group relative block aspect-[565/338] overflow-hidden">
                <Photo src={c.image} className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-110 group-focus:scale-110" />
                {verticalTitle && (
                  <h3
                    className="absolute top-6 left-5 text-[32px] font-light tracking-card text-white uppercase lg:text-[40px]"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {c.title}
                  </h3>
                )}
              </a>
              <p className="mt-4 text-[16px] whitespace-pre-line text-navy">{c.text}</p>
              <a href={c.href ?? "#"} className="link-underline mt-3 text-navy">
                {c.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
