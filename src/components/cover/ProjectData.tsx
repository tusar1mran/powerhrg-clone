type Row = { label: string; value: string };

type Props = {
  heading: string;
  rows: Row[];
};

// "Project data" box from a cover sheet: a ruled two-column table of labels and values.
export default function ProjectData({ heading, rows }: Props) {
  return (
    <div className="border border-charcoal bg-paper">
      <p className="type-mono border-b border-charcoal bg-paper-deep px-4 py-2 text-[11px] font-medium">{heading}</p>
      <dl>
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[7.5rem_minmax(0,1fr)] border-b border-charcoal/30 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)]"
          >
            <dt className="type-mono border-r border-charcoal/30 px-4 py-2.5 text-[11px] text-charcoal/80">{row.label}</dt>
            <dd className="px-4 py-2.5 text-[14px] leading-snug font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
