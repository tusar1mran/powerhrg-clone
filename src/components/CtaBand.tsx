import Link from "next/link";
import { Phone } from "lucide-react";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

type Props = {
  id?: string;
  title: string[];
  label: string;
  href?: string;
  text?: string;
  tone?: "sand" | "white" | "brand";
  variant?: "button" | "link";
};

const tones = {
  sand: { panel: "bg-sand text-ink", text: "text-muted", roof: "text-accent/40", button: "btn-brand", ghost: "text-ink" },
  white: { panel: "border border-line bg-white text-ink", text: "text-muted", roof: "text-accent/30", button: "btn-brand", ghost: "text-ink" },
  brand: { panel: "on-dark bg-brand text-on-brand", text: "text-on-brand/75", roof: "text-accent/50", button: "btn-accent", ghost: "text-on-brand" },
};

export default function CtaBand({ id, title, label, href = "#", text, tone = "sand", variant = "button" }: Props) {
  const t = tones[tone];
  const external = !href.startsWith("/") && !href.startsWith("#");

  return (
    <section id={id} className="scroll-mt-24 py-4">
      <div className={`inset-panel relative isolate overflow-hidden ${t.panel}`}>
        <svg
          aria-hidden
          viewBox="0 0 400 260"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className={`pointer-events-none absolute -right-10 -bottom-16 -z-10 hidden w-[520px] md:block ${t.roof}`}
        >
          <path d="M20 150 200 20l180 130" />
          <path d="M70 120v140M330 120v140" />
          <path d="M60 200 200 100l140 100" opacity="0.5" />
        </svg>
        <Reveal className="container-page grid gap-8 py-16 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:py-24">
          <div>
            <h2 className="display-2 max-w-[720px]">{title.join(" ")}</h2>
            {text && <p className={`lead mt-5 max-w-[600px] whitespace-pre-line ${t.text}`}>{text}</p>}
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {variant === "button" ? (
              <>
                {external ? (
                  <a href={href} className={`btn ${t.button}`}>
                    {label}
                  </a>
                ) : (
                  <Link href={href} className={`btn ${t.button}`}>
                    {label}
                  </Link>
                )}
                <a href={site.phone.href} className={`btn btn-ghost ${t.ghost}`}>
                  <Phone aria-hidden className="h-4 w-4" />
                  {site.phone.display}
                </a>
              </>
            ) : (
              <Link href={href} className="link-underline">
                {label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
