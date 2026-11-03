import Photo from "./Photo";

type Props = { title: string; poster: string; className?: string };

export default function VideoPoster({ title, poster, className = "aspect-video" }: Props) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#3b4a57] ${className}`}>
      <Photo src={poster} label={title} className="absolute inset-0 bg-[#3b4a57]" />
      <span className="absolute top-3 left-3 flex flex-col items-start gap-1">
        <span className="bg-navy/90 px-2 py-[2px] text-[13px] font-bold text-lime">{title}</span>
        <span className="bg-navy/90 px-2 py-[2px] text-[10px] font-bold text-lime">Power Home Remodeling</span>
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-[56px] w-[88px] items-center justify-center rounded-md bg-navy/90" aria-hidden>
          <svg width="22" height="26" viewBox="0 0 26 30" fill="#fff">
            <path d="M0 0v30l26-15z" />
          </svg>
        </span>
      </span>
    </div>
  );
}
