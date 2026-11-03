/* eslint-disable @next/next/no-img-element -- small static logo */
import Photo from "../Photo";
import Reveal from "../Reveal";
import { trackProject } from "@/lib/services-content";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <path d="M8 0 10 2.2 13 2l.4 3L16 8l-2.6 3-.4 3-3-.2L8 16l-2-2.2-3 .2-.4-3L0 8l2.6-3L3 2l3 .2z" fill="#3c6dc6" />
      <path d="m4.8 8.2 2.2 2.2 4.2-4.6" stroke="#fff" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export default function TrackProject() {
  return (
    <section id="track-project">
      {/* The reference uses a blurred white-to-blue image as the section background */}
      <div className="bg-[#c9daf6] bg-cover bg-center py-14 lg:py-8" style={{ backgroundImage: `url(${trackProject.background})` }}>
        <div className="mx-auto grid max-w-[1150px] items-center gap-10 px-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <img src={trackProject.logo} alt="Project Pulse" className="h-[36px] w-auto" />
            <h2 className="mt-3 text-[30px] leading-[1.3] font-light tracking-[4px] text-navy uppercase lg:text-[47px] lg:tracking-card">
              Track your
              <br />
              project
            </h2>
            <p className="mt-5 max-w-[340px] text-[14px] leading-[22px] text-navy lg:text-[16px]">{trackProject.text}</p>
            <ul className="mt-6 space-y-3">
              {trackProject.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[13px] text-navy lg:text-[16px]">
                  <Check />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            {/* The reference plays a Vimeo video here; a still image can be dropped in at trackProject.image */}
            <Photo src={trackProject.image} label="Project Pulse app on a phone" className="aspect-[590/332] w-full bg-[#5d6b7a]" />
          </Reveal>
        </div>
      </div>
      <Reveal speed="slower">
        <a href="#" className="group block bg-navy py-[14px] text-center text-[15px] text-white lg:text-[20px]">
          {trackProject.bar}{" "}
          <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
