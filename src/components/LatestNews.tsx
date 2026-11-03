import Reveal from "./Reveal";
import { news } from "@/lib/content";

export default function LatestNews() {
  return (
    <section className="bg-sky py-14 text-navy lg:pb-20">
      <Reveal className="mx-auto max-w-[1150px] px-6">
        <h2 className="text-[28px] font-light tracking-[4px] uppercase lg:text-[37px]">Latest news</h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {news.map((n) => (
            <li key={n.title} className="border-t border-navy/40 pt-5">
              <p className="text-[11px] font-bold tracking-[1.5px]">{n.date}</p>
              <a href="#" className="group mt-2 block text-[14px] leading-[22px]">
                <span className="align-middle">{n.title}</span>{" "}
                <span aria-hidden className="inline-block align-middle transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#" className="link-underline mt-12">
          All news
        </a>
      </Reveal>
    </section>
  );
}
