import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Photo from "../Photo";
import Reveal from "../Reveal";

type Props = { eyebrow: string; title: string[]; text: string; cta: string; href: string; image: string };

export default function Guarantee({ eyebrow, title, text, cta, href, image }: Props) {
  return (
    <section className="py-4">
      <div className="inset-panel bg-cream">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:py-24">
          <Reveal className="relative">
            <Photo src={image} label="Finished home exterior" className="aspect-[4/3] w-full rounded-[var(--radius-card)]" />
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-brand px-5 py-4 text-on-brand shadow-[var(--shadow-float)] sm:left-auto sm:-right-6">
              <ShieldCheck aria-hidden className="h-8 w-8 text-accent" strokeWidth={1.75} />
              <span className="text-[14px] leading-tight font-bold">
                Written
                <br />
                workmanship warranty
              </span>
            </div>
          </Reveal>
          <Reveal delay={120} className="pt-6 lg:pt-0">
            <p className="eyebrow text-accent-ink">{eyebrow}</p>
            <h2 className="display-2 mt-4 text-brand">{title.join(" ")}</h2>
            <p className="lead mt-5 max-w-[440px] text-muted">{text}</p>
            <Link href={href} className="btn btn-brand mt-8">
              {cta}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
