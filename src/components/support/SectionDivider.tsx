import Reveal from "../Reveal";

export default function SectionDivider({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1150px] px-5 text-navy">
      <Reveal>
        <h3 className="mb-[50px] text-center text-[22px] leading-[1.3] font-light tracking-[5px] uppercase lg:text-[30px] xl:text-[47px]">{title}</h3>
        <hr className="border-[#8ed1fc]" />
      </Reveal>
    </div>
  );
}
