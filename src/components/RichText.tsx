export type RichLink = { label: string; href: string };
export type Rich = string | (string | RichLink)[];

type Props = { value: Rich; linkClassName?: string };

export default function RichText({ value, linkClassName = "underline underline-offset-2 hover:no-underline" }: Props) {
  if (typeof value === "string") return <>{value}</>;
  return (
    <>
      {value.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <a key={i} href={part.href} className={linkClassName}>
            {part.label}
          </a>
        ),
      )}
    </>
  );
}
