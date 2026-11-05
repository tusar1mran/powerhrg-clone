import Photo from "./Photo";
import Reveal from "./Reveal";

export type ImageCard = { title: string; image: string; text: string; cta: string; href?: string };

type Props = {
  heading: string;
  cards: ImageCard[];
  /** White title over the bottom of the photo. */
  overlayTitle?: boolean;
  tone?: "white" | "sand";
};

// Two photo cards - "Reasons to relax" on /services, "Where to next" on the homepage.
export default function ImageCardPair({ heading, cards, overlayTitle = true, tone = "white" }: Props) {
  return (
    <section className={`${tone === "sand" ? "bg-sand" : "bg-white"} py-20 lg:py-24`}>
      <div className="mx-auto max-w-[1150px] px-6">
        <Reveal>
          <h2 className="font-display text-[32px] leading-tight font-medium tracking-display text-charcoal lg:text-[44px]">{heading}</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 150}>
              <a href={c.href ?? "#"} aria-label={c.title} className="group relative block aspect-[565/338] overflow-hidden rounded-2xl">
                <Photo src={c.image} className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-105 group-focus:scale-105" />
                {overlayTitle && (
                  <>
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/75 to-transparent" />
                    <h3 className="absolute bottom-5 left-6 font-display text-[28px] leading-none font-medium tracking-display text-white lg:text-[36px]">
                      {c.title}
                    </h3>
                  </>
                )}
              </a>
              <p className="mt-4 text-[16px] leading-[26px] whitespace-pre-line text-charcoal/85">{c.text}</p>
              <a href={c.href ?? "#"} className="link-underline mt-3 text-charcoal">
                {c.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
