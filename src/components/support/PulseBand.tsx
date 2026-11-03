/* eslint-disable @next/next/no-img-element */
import Reveal from "../Reveal";
import RichText, { type Rich } from "../RichText";

type Props = {
  background: string;
  logo: string;
  title: string;
  paragraphs: Rich[];
  image: string;
  imageAlt: string;
  bar: { label: string; href: string };
};

export default function PulseBand({ background, logo, title, paragraphs, image, imageAlt, bar }: Props) {
  return (
    <section>
      <div className="bg-[#c9daf6] bg-cover bg-center pt-8 text-navy md:pt-16" style={{ backgroundImage: `url(${background})` }}>
        <div className="mx-auto grid gap-y-8 px-5 md:grid-cols-2">
          <Reveal className="flex items-center text-center md:text-left xl:px-[168px]">
            <div>
              <img src={logo} alt="PROJECT PULSE" className="mb-5 inline-block pt-5" />
              <h2 className="mb-5 text-[28px] leading-[1.3] font-light tracking-[2px] uppercase lg:tracking-[3px] min-[1000px]:text-[47px] xl:tracking-[5px]">
                {title}
              </h2>
              {paragraphs.map((p, i) => (
                <p key={i} className="mb-5 text-[16px] leading-[1.45] min-[1000px]:text-[20px]">
                  <RichText value={p} />
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="mt-8 flex">
            <img src={image} alt={imageAlt} className="max-w-full self-center" />
          </Reveal>
        </div>
      </div>
      <a href={bar.href} className="group flex items-center justify-center gap-4 px-6 py-4 text-center text-[16px] text-navy xl:text-[20px]">
        {bar.label}
        <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">
          →
        </span>
      </a>
    </section>
  );
}
