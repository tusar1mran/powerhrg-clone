import Link from "next/link";
import Photo from "../Photo";
import Reveal from "../Reveal";

type Props = { eyebrow: string; title: string[]; text: string; cta: string; href: string; image: string };

// Photo on the left, warranty copy on the right.
export default function Guarantee({ eyebrow, title, text, cta, href, image }: Props) {
  return (
    <section className="bg-white py-20 text-navy lg:py-24">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 lg:grid-cols-[1.45fr_1fr] lg:gap-[120px]">
        <Reveal>
          <Photo src={image} label="Finished home exterior" className="aspect-[685/452] w-full" />
        </Reveal>
        <Reveal delay={150}>
          <p className="text-[12px] font-bold tracking-[3px] uppercase lg:text-[14px] lg:tracking-[4.2px]">{eyebrow}</p>
          <h2 className="mt-4 text-[30px] leading-[1.3] font-light tracking-[4px] uppercase lg:text-[47px] lg:tracking-card">
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[340px] text-[16px] leading-[24px]">{text}</p>
          <Link href={href} className="link-underline mt-8">
            {cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
