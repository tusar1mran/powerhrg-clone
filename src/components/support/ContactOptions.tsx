import Link from "next/link";
import { ClipboardCheck, Mail, Phone, type LucideIcon } from "lucide-react";
import Reveal from "../Reveal";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

type Copy = { title: string; text: string };
type Props = { phone: Copy; email: Copy; quote: Copy & { label: string } };

type Option = { icon: LucideIcon; title: string; text: string; action: { label: string; href: string }; featured?: boolean };

export default function ContactOptions({ phone, email, quote }: Props) {
  const options: Option[] = [
    { icon: Phone, title: phone.title, text: phone.text, action: { label: site.phone.display, href: site.phone.href } },
    { icon: Mail, title: email.title, text: email.text, action: { label: site.email, href: `mailto:${site.email}` } },
    { icon: ClipboardCheck, title: quote.title, text: quote.text, action: { label: quote.label, href: links.quote }, featured: true },
  ];

  return (
    <section className="pb-8">
      <ul className="container-page grid gap-4 md:grid-cols-3 lg:gap-5">
        {options.map((o, i) => (
          <li key={o.title}>
            <Reveal
              delay={i * 90}
              className={`flex h-full flex-col rounded-[var(--radius-card)] p-7 lg:p-8 ${
                o.featured ? "on-dark bg-brand text-on-brand" : "border border-line bg-white text-ink"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${o.featured ? "bg-accent text-ink" : "bg-accent-soft text-accent-ink"}`}
              >
                <o.icon aria-hidden strokeWidth={1.75} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-[19px] font-bold">{o.title}</h2>
              <p className={`mt-2 flex-1 text-[15.5px] leading-relaxed ${o.featured ? "text-on-brand/75" : "text-muted"}`}>{o.text}</p>
              {o.action.href.startsWith("/") ? (
                <Link href={o.action.href} className="link-underline mt-6 self-start break-all">
                  {o.action.label}
                </Link>
              ) : (
                <a href={o.action.href} className="link-underline mt-6 self-start break-all">
                  {o.action.label}
                </a>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
