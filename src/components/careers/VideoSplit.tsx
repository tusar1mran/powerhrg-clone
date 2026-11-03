import VideoPoster from "../VideoPoster";
import Reveal from "../Reveal";

type Props = {
  title: string[];
  paragraphs: string[];
  cta: { label: string; href: string };
  video: { title: string; poster: string };
};

export default function VideoSplit({ title, paragraphs, cta, video }: Props) {
  return (
    <section className="bg-[#edf3fd] py-20 text-navy lg:py-28">
      <div className="mx-auto grid max-w-[1150px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-6">
        <Reveal className="max-w-[540px]">
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
          <a href={cta.href} className="link-underline mt-8">
            {cta.label}
          </a>
        </Reveal>

        <Reveal delay={150}>
          <VideoPoster {...video} />
        </Reveal>
      </div>
    </section>
  );
}
