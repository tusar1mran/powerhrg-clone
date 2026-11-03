type Props = { title: string; text: string };

export default function PageIntro({ title, text }: Props) {
  return (
    <section className="bg-white px-6 pt-44 pb-14 text-center text-navy">
      <div className="mx-auto max-w-[1150px]">
        <h1 className="mb-5 text-[38px] leading-[1.3] font-light tracking-[2px] uppercase lg:text-[60px] lg:tracking-[5px] xl:text-[76px] xl:tracking-[10px] 2xl:tracking-[15px]">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-[16px] leading-[1.45] xl:text-[20px]">{text}</p>
      </div>
    </section>
  );
}
