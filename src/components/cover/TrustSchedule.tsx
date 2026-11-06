import Link from "next/link";
import type { TrustPoint } from "@/lib/trust";

type Props = {
  title: string;
  text: string;
  /** Prefix for the cell references, e.g. "T" gives T-01, T-02… */
  refPrefix: string;
  points: TrustPoint[];
};

const linkClass =
  "type-mono mt-4 inline-block text-[11px] underline decoration-gold decoration-2 underline-offset-4 hover:decoration-charcoal";

// The trust points laid out like an enlarged title block: ruled cells, each with a reference, the
// commitment and, where there is one, a link to check it.
export default function TrustSchedule({ title, text, refPrefix, points }: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-12">
      <div>
        <h3 className="type-heading text-[30px] sm:text-[38px]">{title}</h3>
        <p className="mt-4 max-w-[40ch] text-[16px] leading-[1.6]">{text}</p>
      </div>
      <ul className="grid border-t-[1.5px] border-l-[1.5px] border-charcoal bg-paper sm:grid-cols-2 xl:grid-cols-3">
        {points.map((point, i) => (
          <li key={point.id} className="flex flex-col border-r-[1.5px] border-b-[1.5px] border-charcoal">
            <p className="type-mono flex items-center justify-between border-b border-charcoal/40 px-4 py-2 text-[10.5px] text-charcoal/80">
              <span>{`${refPrefix}-${String(i + 1).padStart(2, "0")}`}</span>
              <span aria-hidden className="size-2 bg-gold" />
            </p>
            <div className="flex flex-1 flex-col px-4 py-4">
              <h4 className="type-sheet text-[17px] leading-tight">{point.title}</h4>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-charcoal/90">{point.text}</p>
              {point.link ? (
                point.link.external ? (
                  <a href={point.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {point.link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={point.link.href} className={linkClass}>
                    {point.link.label}
                  </Link>
                )
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
