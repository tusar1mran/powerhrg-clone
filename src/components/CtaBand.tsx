import type { ReactNode } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import Reveal from "./Reveal";
import Slot from "./layout/Slot";
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

function MainLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function PhoneButton({ className }: { className: string }) {
  return (
    <a href={site.phone.href} className={`btn btn-ghost ${className}`}>
      <Phone aria-hidden className="h-4 w-4" />
      {site.phone.display}
    </a>
  );
}

function CtaPanel({ id, title, label, href = "#", text, tone = "sand", variant = "button" }: Props) {
  const t = tones[tone];
  return (
    <section id={id} className="panel-wrap scroll-mt-24">
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
                <MainLink href={href} className={`btn ${t.button}`}>
                  {label}
                </MainLink>
                <PhoneButton className={t.ghost} />
              </>
            ) : (
              <MainLink href={href} className="link-underline">
                {label}
              </MainLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CtaBandFull({ id, title, label, href = "#", text }: Props) {
  return (
    <section id={id} className="panel-wrap scroll-mt-24">
      <div className="inset-panel bg-accent text-ink">
        <Reveal className="container-page flex flex-col items-center py-16 text-center lg:py-24">
          <h2 className="display-1 max-w-[900px]">{title.join(" ")}</h2>
          {text && <p className="lead mt-5 max-w-[620px] whitespace-pre-line text-ink/80">{text}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <MainLink href={href} className="btn btn-brand">
              {label}
            </MainLink>
            <PhoneButton className="text-ink" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CtaSplit({ id, title, label, href = "#", text }: Props) {
  return (
    <section id={id} className="panel-wrap scroll-mt-24">
      <div className="on-dark inset-panel grid overflow-hidden bg-brand text-on-brand lg:grid-cols-2">
        <div aria-hidden className="min-h-[280px] bg-brand-soft bg-cover bg-center" style={{ backgroundImage: "url(/assets/photos/crew.jpg)" }} />
        <Reveal className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <h2 className="display-2">{title.join(" ")}</h2>
          {text && <p className="lead mt-5 max-w-[520px] whitespace-pre-line text-on-brand/75">{text}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <MainLink href={href} className="btn btn-accent">
              {label}
            </MainLink>
            <PhoneButton className="text-on-brand" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CtaMinimal({ id, title, label, href = "#", text }: Props) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-20 lg:py-32">
      <Reveal className="container-page text-center">
        <h2 className="display-1 mx-auto max-w-[1000px] text-brand">{title.join(" ")}</h2>
        {text && <p className="lead mx-auto mt-6 max-w-[620px] whitespace-pre-line text-muted">{text}</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <MainLink href={href} className="btn btn-accent">
            {label}
          </MainLink>
          <PhoneButton className="text-ink" />
        </div>
      </Reveal>
    </section>
  );
}

export default function CtaBand(props: Props) {
  return (
    <Slot
      name="cta"
      fallback="panel"
      variants={{
        panel: <CtaPanel {...props} />,
        band: <CtaBandFull {...props} />,
        split: <CtaSplit {...props} />,
        minimal: <CtaMinimal {...props} />,
      }}
    />
  );
}
