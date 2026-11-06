import Reveal from "../Reveal";
import { sameAddress } from "@/lib/services-content";

type Props = {
  eyebrow?: string;
  title?: string[];
  text?: string;
  image?: string;
};

export default function SameAddress({
  eyebrow = "The whole house",
  title = sameAddress.title,
  text = sameAddress.text,
  image = sameAddress.image,
}: Props) {
  return (
    <section className="py-4">
      <div
        className="inset-panel relative isolate flex min-h-[560px] items-end overflow-hidden bg-brand bg-cover bg-center text-on-brand lg:min-h-[680px]"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div aria-hidden className="absolute inset-0 -z-10 scrim-band" />
        <Reveal className="container-page grid gap-8 py-14 lg:grid-cols-2 lg:items-end lg:py-20">
          <div>
            <p className="eyebrow text-on-brand/85">{eyebrow}</p>
            <h2 className="display-1 mt-5">
              {title.map((l, i) => (
                <span key={l} className={`block ${i === title.length - 1 ? "text-accent italic" : ""}`}>
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <p className="lead max-w-[560px] text-on-brand/85 lg:justify-self-end">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}
