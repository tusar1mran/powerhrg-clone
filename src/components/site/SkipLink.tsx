import { skipLink } from "@/lib/chrome-content";

// First focusable element on every page. Hidden until it receives keyboard focus.
export default function SkipLink() {
  return (
    <a
      href={skipLink.href}
      className="sr-only rounded-lg bg-gold px-4 py-3 font-semibold text-charcoal focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
    >
      {skipLink.label}
    </a>
  );
}
