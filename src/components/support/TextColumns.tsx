/* eslint-disable @next/next/no-img-element */
import Reveal from "../Reveal";
import VideoPoster from "../VideoPoster";
import RichText, { type Rich, type RichLink } from "../RichText";

export type TextBlock =
  | { h3: string[]; lead?: boolean }
  | { p: Rich }
  | { b: string }
  | { label: string }
  | { list: string[] }
  | { link: RichLink; file?: boolean }
  | { video: { title: string; poster: string; aspect?: string } };

type Props = {
  columns: TextBlock[][];
  id?: string;
  padTop?: boolean;
  padBottom?: boolean;
  centerFirst?: boolean;
};

const inlineLink = "text-[14px] font-bold tracking-[0.3em] uppercase hover:underline";

function Block({ block }: { block: TextBlock }) {
  if ("h3" in block) {
    return block.lead ? (
      <h3 className="mb-5 text-[12px] leading-[1.3] font-light whitespace-nowrap sm:text-[14px] md:text-[16px] lg:text-[18px]">
        {block.h3.join(" ")}
      </h3>
    ) : (
      <h3 className="mb-5 text-[22px] leading-[1.3] font-light lg:text-[30px] xl:text-[47px]">
        {block.h3.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h3>
    );
  }
  if ("p" in block) {
    return (
      <p className="mb-5 text-[16px] leading-[1.45] last:mb-0 xl:text-[20px]">
        <RichText value={block.p} linkClassName={inlineLink} />
      </p>
    );
  }
  if ("b" in block) {
    return <p className="mb-5 text-[16px] leading-[1.45] font-bold xl:text-[20px]">{block.b}</p>;
  }
  if ("label" in block) {
    return <p className="mb-5 text-[16px] leading-[1.45] font-bold tracking-[5px] xl:text-[20px]">{block.label}</p>;
  }
  if ("list" in block) {
    return (
      <ul className="mb-6 list-outside list-disc space-y-3 px-4 text-[16px] leading-[1.45] xl:text-[20px]">
        {block.list.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    );
  }
  if ("link" in block) {
    return (
      <p className="mb-5 last:mb-0">
        <a href={block.link.href} className="link-underline relative lg:text-[14px] lg:tracking-[0.3em]">
          {block.link.label}
          {block.file && (
            <img src="/assets/support/warranties/open-file-icon.png" alt="" className="absolute top-[40%] -right-6 h-3 w-3 -translate-y-1/2" />
          )}
        </a>
      </p>
    );
  }
  return <VideoPoster title={block.video.title} poster={block.video.poster} className={block.video.aspect ?? "aspect-video"} />;
}

export default function TextColumns({ columns, id, padTop = false, padBottom = false, centerFirst = false }: Props) {
  return (
    <section id={id} className={`bg-white py-12 text-navy ${padTop ? "lg:pt-36" : ""} ${padBottom ? "lg:pb-36" : ""}`}>
      <div className="mx-auto grid max-w-[1150px] gap-10 px-6 lg:grid-cols-2">
        {columns.map((col, i) => (
          <Reveal key={i} delay={i * 150} className={centerFirst && i === 0 ? "flex flex-col justify-center" : ""}>
            {col.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
