/* eslint-disable @next/next/no-img-element -- static files from /public; the Worker has no image optimization binding */
import { cn } from "@/lib/utils";

export type SitePhotoData = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

type Props = SitePhotoData & {
  className?: string;
  /** CSS aspect ratio for the crop, e.g. "4 / 3". Defaults to the photo's own ratio. */
  aspect?: string;
  loading?: "eager" | "lazy";
  /** Raise to "high" for a photo in the first viewport. */
  fetchPriority?: "high" | "low" | "auto";
};

// A photo clipped onto the sheet: thin ink frame, paper mat, and a monospaced reference caption.
export default function SitePhoto({
  src,
  width,
  height,
  alt,
  caption,
  className,
  aspect,
  loading = "lazy",
  fetchPriority = "auto",
}: Props) {
  return (
    <figure className={cn("border border-charcoal bg-paper p-2", className)}>
      <div className="relative overflow-hidden bg-slate" style={{ aspectRatio: aspect ?? `${width} / ${height}` }}>
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <figcaption className="type-mono flex items-center gap-2 pt-2 text-[11px] text-charcoal/80">
        <span aria-hidden className="size-1.5 shrink-0 bg-gold" />
        {caption}
      </figcaption>
    </figure>
  );
}
