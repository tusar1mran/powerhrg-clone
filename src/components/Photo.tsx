// Background-image block with a solid fallback colour, so the layout still reads
// before the real image has been saved into /public/assets.
type Props = { src: string; className?: string; contain?: boolean; label?: string };

export default function Photo({ src, className = "", contain = false, label }: Props) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className={`bg-center bg-no-repeat ${contain ? "bg-contain" : "bg-cover bg-sand"} ${className}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}
