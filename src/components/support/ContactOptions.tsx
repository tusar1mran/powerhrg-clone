import Link from "next/link";
import { ClipboardCheck, Mail, Phone, type LucideIcon } from "lucide-react";
import Reveal from "../Reveal";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

type Copy = { title: string; text: string };
type Props = { phone: Copy; email: Copy; quote: Copy & { label: string } };

type Option = { icon: LucideIcon; title: string; text: string; action: { label: string; href: string } };

// Three ways to reach us, right under the /support intro.
export default function ContactOptions({ phone, email, quote }: Props) {
  const options: Option[] = [
    { icon: Phone, title: phone.title, text: phone.text, action: { label: site.phone.display, href: site.phone.href } },
    { icon: Mail, title: email.title, text: email.text, action: { label: site.email, href: `mailto:${site.email}` } },
    { icon: ClipboardCheck, title: quote.title, text: quote.text, action: { label: quote.label, href: links.quote } },
  ];

  return (
    <section className="bg-white px-6 pb-16 text-navy">
      <ul className="mx-auto grid max-w-[1150px] gap-4 md:grid-cols-3">
        {options.map((o, i) => (
          <li key={o.title}>
            <Reveal delay={i * 100} className="h-full bg-sky-soft px-8 py-10">
              <o.icon aria-hidden strokeWidth={1.5} className="h-9 w-9" />
              <h2 className="mt-4 text-[13px] font-bold tracking-[3px] uppercase lg:text-[14px] lg:tracking-[4.2px]">{o.title}</h2>
              <p className="mt-3 text-[15px] leading-[24px]">{o.text}</p>
              {o.action.href.startsWith("/") ? (
                <Link href={o.action.href} className="link-underline mt-5 break-all">
                  {o.action.label}
                </Link>
              ) : (
                <a href={o.action.href} className="link-underline mt-5 break-all">
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
