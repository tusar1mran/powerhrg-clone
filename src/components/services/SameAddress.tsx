import Reveal from "../Reveal";
import { sameAddress } from "@/lib/services-content";

type Props = {
  title?: string[];
  text?: string;
  image?: string;
  /** "tall" = /services "Same house"; "short" = /about story band. */
  size?: "tall" | "short";
  /** Body copy alignment: left on /services, centred on /about. */
  align?: "left" | "center";
  /** Body copy weight: 400 on /services, 300 on /about. */
  light?: boolean;
};

// Full-bleed sky photo with houses at the bottom, lime heading and white copy near the top.
export default function SameAddress({
  title = sameAddress.title,
  text = sameAddress.text,
  image = sameAddress.image,
  size = "tall",
  align = "left",
  light = false,
}: Props) {
  // "short" grows with the viewport, which keeps the rooflines below the copy at every desktop width.
  const height = size === "tall" ? "min-h-[760px] lg:min-h-[1000px]" : "min-h-[560px] lg:min-h-[calc(414px+21.1vw)]";
  const pad = size === "tall" ? "pt-24 lg:pt-32" : "pt-20 lg:pt-32";

  return (
    <section
      className={`flex justify-center bg-[#4a78b5] bg-cover bg-bottom px-6 text-center ${height} ${pad}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <Reveal className="max-w-[1100px]">
        <h2 className="text-[34px] leading-[1.35] font-light tracking-[8px] text-lime uppercase lg:text-[63px] lg:tracking-section">
          {title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        <p
          className={`mx-auto mt-8 text-[16px] leading-[26px] text-white lg:text-[20px] lg:leading-[30px] ${
            align === "left" ? "max-w-[580px] text-left" : "max-w-[700px] text-center"
          } ${light ? "font-light" : ""}`}
        >
          {text}
        </p>
      </Reveal>
    </section>
  );
}
