type Props = { dir: "left" | "right"; onClick: () => void; className?: string; label: string; tone?: "light" | "dark" };

// Round previous/next button used by the carousels.
export default function Arrow({ dir, onClick, className = "", label, tone = "light" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-11 w-11 items-center justify-center rounded-full shadow-[0_6px_20px_rgba(30,43,49,0.18)] transition-colors duration-150 lg:h-14 lg:w-14 ${
        tone === "dark" ? "bg-charcoal text-gold hover:bg-charcoal-700" : "bg-white text-charcoal hover:bg-gold"
      } ${className}`}
    >
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === "left" ? <path d="M21 8H2M8 1 1 8l7 7" /> : <path d="M1 8h19M14 1l7 7-7 7" />}
      </svg>
    </button>
  );
}
