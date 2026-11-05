type Props = { title: string; text: string };

export default function PageIntro({ title, text }: Props) {
  return (
    <section className="bg-white px-6 pt-44 pb-14 text-center text-charcoal">
      <div className="mx-auto max-w-[1150px]">
        {/* short gold rule above the title, matching the hero */}
        <span aria-hidden className="mx-auto mb-6 block h-1 w-14 rounded-full bg-gold" />
        <h1 className="mb-5 font-display text-[44px] leading-[1.08] font-medium tracking-display lg:text-[64px] xl:text-[80px]">{title}</h1>
        <p className="mx-auto max-w-2xl text-[16px] leading-[1.55] text-charcoal/85 xl:text-[19px]">{text}</p>
      </div>
    </section>
  );
}
