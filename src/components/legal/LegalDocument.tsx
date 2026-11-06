import RichText, { type Rich } from "../RichText";

export type LegalBlock = { h: string; center?: boolean } | { p: Rich } | { list: Rich[] } | { pre: string };

type Props = { title: string; blocks: LegalBlock[] };

const text = "mb-5 text-[16.5px] leading-relaxed text-ink/85";
const link = "font-semibold text-accent-ink underline underline-offset-2 hover:no-underline";

function Block({ block }: { block: LegalBlock }) {
  if ("h" in block) {
    return (
      <p className={`mt-10 mb-4 font-display text-[24px] leading-tight text-brand ${block.center ? "text-center" : ""}`}>
        <strong role="heading" aria-level={2} className="font-normal">
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
      <ul className="mb-5 list-outside list-disc space-y-1 pl-5 text-[16.5px] leading-relaxed text-ink/85 marker:text-accent">
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
      <pre className="overflow-x-auto rounded-xl bg-cream p-5 font-mono text-[14px] leading-6 whitespace-pre text-ink">{block.pre}</pre>
      <p className="mb-5" />
    </>
  );
}

export default function LegalDocument({ title, blocks }: Props) {
  return (
    <>
      <section className="pt-14 pb-10 lg:pt-24">
        <div className="container-page">
          <p className="eyebrow text-accent-ink">Legal</p>
          <h1 className="display-1 mt-5 max-w-[900px] text-brand">{title}</h1>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-page max-w-[880px]! rounded-[var(--radius-card)] border border-line bg-white px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          {blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </section>
    </>
  );
}
