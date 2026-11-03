/* eslint-disable @next/next/no-img-element */
import Reveal from "../Reveal";

type Props = {
  heading: string;
  items: { title: string; text: string; icon: string; image: string; imageAlt: string }[];
};

export default function FeatureRows({ heading, items }: Props) {
  return (
    <section className="text-navy">
      <div className="bg-[#dbe6fb] px-6 pt-16">
        <h2 className="mx-auto mb-5 max-w-[1150px] text-center text-[29px] leading-[1.3] font-light tracking-[2px] uppercase lg:text-left lg:text-[46px] lg:tracking-[5px] xl:text-[63px] xl:tracking-[10px]">
          {heading}
        </h2>
      </div>
      {items.map((item, i) => (
        <div key={item.title} className={i % 2 === 0 ? "bg-sky-soft" : "bg-white"}>
          <div className="mx-auto grid max-w-[1150px] items-center gap-10 px-6 py-16 lg:grid-cols-[5fr_6fr]">
            <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <img src={item.icon} alt={`Number ${i + 1}`} className="mb-6 h-[85px] w-[70px] object-contain" />
              <h3 className="mb-2 text-[22px] leading-[1.3] font-light tracking-[2px] uppercase lg:text-[30px] lg:tracking-[3px] xl:text-[47px] xl:tracking-[5px]">
                {item.title}
              </h3>
              <p className="text-[16px] leading-[1.45] xl:text-[20px]">{item.text}</p>
            </Reveal>
            <Reveal delay={150} className="flex items-center justify-center px-6 lg:justify-end lg:p-10">
              <img src={item.image} alt={item.imageAlt} className="w-full object-contain" />
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  );
}
