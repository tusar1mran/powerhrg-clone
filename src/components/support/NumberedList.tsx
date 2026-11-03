/* eslint-disable @next/next/no-img-element */
import Reveal from "../Reveal";

type Props = { items: { title: string; text: string; icon: string }[] };

export default function NumberedList({ items }: Props) {
  return (
    <section className="bg-white py-12 text-navy lg:py-24">
      <div className="mx-auto max-w-[1150px] px-6">
        <ol className="mx-auto lg:max-w-[640px]">
          {items.map((item, i) => (
            <li key={item.title} className="mb-20">
              <Reveal className="grid grid-cols-6">
                <img src={item.icon} alt={`Number ${i + 1}`} className="w-10 xl:w-20" />
                <div className="col-span-5">
                  <h3 className="mb-5 text-[22px] leading-[1.3] font-light tracking-[2px] uppercase lg:text-[30px] lg:tracking-[3px] xl:text-[47px] xl:tracking-[5px]">
                    {item.title}
                  </h3>
                  <p className="text-[16px] leading-[1.45] xl:text-[20px]">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
