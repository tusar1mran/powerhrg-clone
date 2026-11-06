type Props = { eyebrow?: string; title: string; text: string };

export default function PageIntro({ eyebrow = "Support", title, text }: Props) {
  return (
    <section className="pt-14 pb-12 lg:pt-24 lg:pb-16">
      <div className="container-page grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="fade-in-up eyebrow text-accent-ink">{eyebrow}</p>
          <h1 className="fade-in-up display-1 mt-5 text-brand">{title}</h1>
        </div>
        <p className="fade-in-up-delay lead max-w-[520px] text-muted lg:pb-3">{text}</p>
      </div>
    </section>
  );
}
