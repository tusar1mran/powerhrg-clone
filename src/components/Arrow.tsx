type Props = { dir: "left" | "right"; onClick: () => void; className?: string; label: string; tone?: "light" | "dark" };

export default function Arrow({ dir, onClick, className = "", label, tone = "light" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-[66px] w-[66px] items-center justify-center ${
        tone === "dark" ? "bg-navy text-lime" : "bg-white text-navy"
      } ${className}`}
    >
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        {dir === "left" ? <path d="M39 12H2M12 1 1 12l11 11" /> : <path d="M1 12h37M28 1l11 11-11 11" />}
      </svg>
    </button>
  );
}
