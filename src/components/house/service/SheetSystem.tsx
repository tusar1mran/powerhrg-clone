import type { ServiceSheet } from "@/lib/house-content";
import { LayerNotes } from "../story/LayerNotes";
import { Container, SectionHeader } from "../section";

type Props<K extends string> = {
  sheet: ServiceSheet<K>;
  /** Layer keys in installation order, matching the callout numbers on the hero drawing. */
  order: readonly K[];
};

/** The text key to the hero drawing: what each numbered layer is and why it is there. */
export function SheetSystem<K extends string>({ sheet, order }: Props<K>) {
  return (
    <section aria-labelledby="sheet-system-title" className="py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <SectionHeader
          eyebrow={sheet.systemEyebrow}
          title={sheet.system.title}
          titleId="sheet-system-title"
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <p>{sheet.system.text}</p>
        </SectionHeader>
        <LayerNotes order={order} notes={sheet.system.notes} titleAs="h3" />
      </Container>
    </section>
  );
}
