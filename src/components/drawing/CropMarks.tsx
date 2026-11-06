import { cn } from "@/lib/utils";

// Printer's crop marks at the four corners of the sheet and registration targets on the top and
// bottom edges. They sit in the plotter margin outside the sheet border (the layer extends 24px past
// the sheet on every side), the way trim marks sit outside a printed drawing. Purely decorative, so
// the whole layer is hidden from assistive technology. Desktop only: on phones the sheet runs edge
// to edge and there is no margin to print them in.

function CornerMark({ className }: { className: string }) {
  return (
    <svg className={cn("absolute size-6 text-charcoal/70", className)} viewBox="0 0 24 24" fill="none">
      <path d="M0 23.5H15M23.5 0V15" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function RegistrationTarget({ className }: { className: string }) {
  return (
    <svg
      className={cn("absolute left-1/2 size-4 -translate-x-1/2 text-charcoal/60", className)}
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1" />
      <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function CropMarks() {
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-6 hidden lg:block">
      <CornerMark className="top-0 left-0" />
      <CornerMark className="top-0 right-0 -scale-x-100" />
      <CornerMark className="bottom-0 left-0 -scale-y-100" />
      <CornerMark className="right-0 bottom-0 -scale-100" />
      <RegistrationTarget className="top-0.5" />
      <RegistrationTarget className="bottom-0.5" />
    </div>
  );
}
