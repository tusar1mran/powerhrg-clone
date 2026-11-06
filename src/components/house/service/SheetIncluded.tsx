import FeatureIconSvg from "@/components/services/FeatureIcons";
import type { ServiceSheet } from "@/lib/house-content";
import { Container, SectionHeader } from "../section";

/** The rest of the included work, set as a numbered specification schedule. */
export function SheetIncluded<K extends string>({ sheet }: { sheet: ServiceSheet<K> }) {
  const { included } = sheet;

  return (
    <section aria-labelledby="sheet-included-title" className="border-y border-charcoal bg-paper-2 py-16 lg:py-24">
      <Container>
        <SectionHeader eyebrow={included.eyebrow} title={included.title} titleId="sheet-included-title" className="mb-12">
          <p>{included.text}</p>
        </SectionHeader>

        <ol className="grid border-t border-l border-charcoal md:grid-cols-3">
          {included.items.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-3 border-r border-b border-charcoal bg-paper p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <span aria-hidden className="flex size-11 items-center justify-center rounded-md border border-charcoal bg-gold-100">
                  <FeatureIconSvg name={item.icon} className="size-5" />
                </span>
                <span aria-hidden className="annotation text-gold-800">
                  Item {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-[28px] leading-8 tracking-display">{item.title}</h3>
              <p className="text-[15px] leading-6 text-charcoal-700">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
