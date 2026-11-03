import Reveal from "../Reveal";

type Props = { title: string; paragraphs: string[] };

export default function Notice({ title, paragraphs }: Props) {
  return (
    <section className="bg-white px-6 py-12 text-navy sm:px-10 lg:px-0 lg:py-24">
      <Reveal className="mx-auto max-w-[960px]">
        <p className="mb-5 text-[16px] leading-[1.45] font-bold xl:text-[20px]">{title}</p>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="mb-5 text-[16px] leading-[1.45] last:mb-0 xl:text-[20px]">
            {p}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
