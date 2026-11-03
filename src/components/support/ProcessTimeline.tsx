/* eslint-disable @next/next/no-img-element */
import Photo from "../Photo";
import Reveal from "../Reveal";
import RichText, { type Rich } from "../RichText";

type Step = { title: string[]; points: Rich[]; image: string; imageAlt: string };
type Props = { labels: string[]; steps: Step[] };

const icon = "/assets/support/our-process/icons";

function Timeline({ labels, current, dark }: { labels: string[]; current: number; dark: boolean }) {
  return (
    <div className="mb-12 flex w-full items-center">
      {labels.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === labels.length - 1;
        const src = done || active ? `${icon}/${dark ? "dark" : "light"}-check.svg` : `${icon}/step-${i + 1}.svg`;
        return (
          <div key={label} className={`${last ? "mr-[13px]" : "flex grow items-center"} ${i === 0 && !active ? "ml-[13px]" : ""}`}>
            <div className="relative">
              <img
                src={src}
                alt=""
                className={active ? "h-12 w-12 min-w-12 min-[800px]:h-[60px] min-[800px]:w-[60px] min-[800px]:min-w-[60px]" : "h-[30px] w-[30px] min-w-[30px]"}
              />
              <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[12px] whitespace-nowrap ${dark ? "text-lime" : "text-navy"}`}>
                {label}
              </span>
            </div>
            {!last && <span aria-hidden className={`mx-[10px] inline-block h-1 w-full min-w-[30px] ${done ? (dark ? "bg-lime" : "bg-navy") : "bg-sky"}`} />}
          </div>
        );
      })}
    </div>
  );
}

export default function ProcessTimeline({ labels, steps }: Props) {
  return (
    <div id="content">
      {steps.map((step, i) => {
        const dark = i % 2 === 1;
        return (
          <section key={step.title.join(" ")} className={dark ? "bg-navy text-white" : "bg-white text-navy"}>
            <div className="flex flex-col md:flex-row">
              <Photo src={step.image} label={step.imageAlt} className="min-h-[300px] md:order-last md:flex-[1.5]" />
              <div className="flex items-center justify-center px-6 py-6 md:order-first md:flex-[2] lg:py-12 xl:px-[200px]">
                <Reveal className="w-full">
                  <Timeline labels={labels} current={i} dark={dark} />
                  <h2 className="mb-5 text-[28px] leading-[1.3] font-light tracking-[2px] uppercase lg:tracking-[3px] min-[1000px]:text-[47px] xl:tracking-[5px]">
                    {step.title.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </h2>
                  <ul className="list-disc pl-3">
                    {step.points.map((p, j) => (
                      <li key={j} className="mb-6 text-[16px] min-[1000px]:text-[20px]">
                        <RichText value={p} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
