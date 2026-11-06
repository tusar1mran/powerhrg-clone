// Turns a service page's feature list into the parts of its drawing sheet: the numbered callouts on
// the detail drawing, the written notes, and the specification schedule that cross-references both.
// Every feature appears exactly once, either as a callout or as a note, so nothing is dropped or
// repeated. Mistakes fail the build instead of shipping a sheet with a missing item.
import type { Feature } from "@/components/services/FeatureIcons";

/** One numbered callout on a detail drawing. `part` is the drawing's anchor for the leader line. */
export type CalloutPlan<Title extends string, Part extends string> = {
  mark: number;
  part: Part;
  /** Printed part name next to the number, e.g. "Roof deck". */
  label: string;
  feature: Title;
};

export type ServiceSheetPlan<Title extends string, Part extends string> = {
  /** Sheet number the detail is drawn on, e.g. "A-200". */
  sheetNumber: string;
  /** Detail number on that sheet, e.g. "1". */
  detailNumber: string;
  callouts: CalloutPlan<Title, Part>[];
  /** Features written up as notes instead of being drawn. */
  notes: Title[];
  /** Schedule category for every feature, e.g. "Roof layer" or "Workmanship". */
  kinds: Record<Title, string>;
};

export type ResolvedCallout<Part extends string> = {
  mark: number;
  part: Part;
  label: string;
  title: string;
  text: string;
  /** Anchor id of the legend entry, used by the schedule's cross-reference. */
  anchor: string;
};

export type ResolvedNote = { mark: number; title: string; text: string; anchor: string };

export type ScheduleRow = {
  mark: string;
  item: string;
  kind: string;
  ref: { label: string; href: string };
};

export type ServiceSheetModel<Part extends string> = {
  callouts: ResolvedCallout<Part>[];
  notes: ResolvedNote[];
  schedule: ScheduleRow[];
};

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function buildServiceSheet<const F extends readonly Feature[], Part extends string>(
  features: F,
  plan: ServiceSheetPlan<F[number]["title"], Part>,
): ServiceSheetModel<Part> {
  const byTitle = new Map<string, Feature>(features.map((f) => [f.title, f]));

  const find = (title: string): Feature => {
    const feature = byTitle.get(title);
    if (!feature) {
      throw new Error(`Service sheet ${plan.sheetNumber}: no feature titled "${title}".`);
    }
    return feature;
  };

  const callouts: ResolvedCallout<Part>[] = plan.callouts
    .toSorted((a, b) => a.mark - b.mark)
    .map((c) => {
      const feature = find(c.feature);
      return {
        mark: c.mark,
        part: c.part,
        label: c.label,
        title: feature.title,
        text: feature.text,
        anchor: `callout-${c.mark}`,
      };
    });

  const notes: ResolvedNote[] = plan.notes.map((title, i) => {
    const feature = find(title);
    return { mark: i + 1, title: feature.title, text: feature.text, anchor: `note-${slug(feature.title)}` };
  });

  const calloutByTitle = new Map(callouts.map((c) => [c.title, c]));
  const noteByTitle = new Map(notes.map((n) => [n.title, n]));

  const schedule: ScheduleRow[] = features.map((feature: F[number], i) => {
    // Read the title through the feature list's own type, so it can index the typed `kinds` record.
    const title: F[number]["title"] = feature.title;
    const callout = calloutByTitle.get(title);
    const note = noteByTitle.get(title);

    if (callout && note) {
      throw new Error(`Service sheet ${plan.sheetNumber}: "${feature.title}" is both a callout and a note.`);
    }

    let ref: ScheduleRow["ref"];
    if (callout) {
      ref = {
        label: `Detail ${plan.detailNumber} / ${plan.sheetNumber}, callout ${callout.mark}`,
        href: `#${callout.anchor}`,
      };
    } else if (note) {
      ref = { label: `Note ${note.mark}`, href: `#${note.anchor}` };
    } else {
      throw new Error(`Service sheet ${plan.sheetNumber}: "${feature.title}" is neither drawn nor noted.`);
    }

    return {
      mark: `S-${String(i + 1).padStart(2, "0")}`,
      item: feature.title,
      kind: plan.kinds[title],
      ref,
    };
  });

  return { callouts, notes, schedule };
}
