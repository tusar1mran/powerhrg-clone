import RichText, { type Rich } from "../RichText";

export type LegalBlock = { h: string; center?: boolean } | { p: Rich } | { list: Rich[] } | { pre: string };

type Props = { title: string; blocks: LegalBlock[] };

const container = "mx-auto w-full px-6 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 3xl:max-w-[1728px]";
const text = "mb-5 text-[16px] leading-[1.45] xl:text-[20px]";
const link = "mb-3 inline-block text-[15px] leading-6 font-semibold text-charcoal underline decoration-gold decoration-2 underline-offset-4";

function Block({ block }: { block: LegalBlock }) {
  if ("h" in block) {
    return (
      <p className={`${text} ${block.center ? "text-center" : ""}`}>
        <strong role="heading" aria-level={2}>
          {block.h}
        </strong>
      </p>
    );
  }
  if ("p" in block) {
    return (
      <p className={`${text} whitespace-pre-line`}>
        <RichText value={block.p} linkClassName={link} />
      </p>
    );
  }
  if ("list" in block) {
    return (
      <ul className="mb-4 list-outside list-disc px-4 text-[16px] leading-6">
        {block.list.map((item, i) => (
          <li key={i}>
            <RichText value={item} linkClassName={link} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <pre className="overflow-x-auto font-mono text-[16px] leading-6 whitespace-pre text-black">{block.pre}</pre>
      <p className="mb-5" />
    </>
  );
}

export default function LegalDocument({ title, blocks }: Props) {
  return (
    <>
      <section className="bg-white text-charcoal">
        <div className={`${container} pt-40 pb-6`}>
          <h1 className="mb-5 font-display text-[44px] leading-[1.08] font-medium tracking-display lg:text-[64px] xl:text-[80px]">
            {title}
          </h1>
        </div>
      </section>
      <section className="bg-white text-black antialiased">
        <div className={`${container} pt-6 pb-24`}>
          {blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </section>
    </>
  );
}
