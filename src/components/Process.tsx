import Reveal from "./Reveal";
import { processSteps } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="on-dark bg-navy py-16 text-white">
      <Reveal className="mx-auto max-w-[1100px] px-6 text-center">
        <h2 className="text-[34px] leading-tight font-light tracking-[8px] uppercase lg:text-[48px] lg:tracking-[12px] xl:text-[63px] xl:tracking-section">
          Your vision. Our process.
        </h2>

        <ol className="mx-auto mt-14 grid max-w-[1030px] grid-cols-2 gap-y-10 md:flex md:items-start md:justify-between">
          {processSteps.map((step, i) => (
            <li key={step} className="relative flex flex-1 flex-col items-center">
              {/* connecting line to the next circle */}
              {i < processSteps.length - 1 && (
                <span className="absolute top-[33px] left-[calc(50%+46px)] hidden h-[6px] w-[calc(100%-92px)] bg-[#d5dde8] md:block" />
              )}
              <span className="flex h-[66px] w-[66px] items-center justify-center rounded-full border-2 border-lime text-[34px] font-light text-lime">
                {i + 1}
              </span>
              <h4 className="mt-4 text-[13px] font-bold tracking-card uppercase lg:text-[15px]">{step}</h4>
            </li>
          ))}
        </ol>

        <a href="#" className="link-underline mt-14">
          Explore how it works
        </a>
      </Reveal>
    </section>
  );
}
