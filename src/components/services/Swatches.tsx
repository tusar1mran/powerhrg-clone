import Photo from "../Photo";
import Reveal from "../Reveal";

type Props = {
  title: string[];
  text: string;
  swatches: { name: string; image: string }[];
};

// "State-of-the-art shingle": heading left, copy right, then a row of colour swatches.
// On the reference site the swatches are static images, not a picker.
export default function Swatches({ title, text, swatches }: Props) {
  return (
    <div className="mt-20 lg:mt-36">
      <Reveal className="grid gap-6 lg:grid-cols-2 lg:gap-16">
        <h3 className="text-[26px] leading-[1.3] font-light tracking-[8px] uppercase lg:text-[35px] lg:tracking-[15px]">
          {title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h3>
        <p className="text-[16px] leading-[24px] lg:text-[17px] lg:leading-[26px]">{text}</p>
      </Reveal>

      {/* Bleeds slightly wider than the text column, like the reference */}
      <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:-mx-12">
        {swatches.map((s, i) => (
          <li key={s.name}>
            <Reveal delay={i * 80} className="text-center">
              <Photo src={s.image} contain label={`${s.name} shingle`} className="aspect-square w-full" />
              <p className="mt-5 text-[12px] font-bold tracking-[3px] text-black uppercase lg:text-[14px] lg:tracking-[4.2px]">{s.name}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
