import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Restyled for the Field Manual sheets: square corners, ink outlines, gold reserved for the main
// call to action. Focus uses the global ink outline from globals.css.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border bg-clip-padding font-sans font-semibold whitespace-nowrap transition-colors duration-150 select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Gold work-order button: "Request a free quote".
        default: "border-charcoal bg-gold text-charcoal hover:bg-charcoal hover:text-paper",
        // Ink outline on paper: secondary actions such as "Call".
        outline: "border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-paper",
        // Solid ink, for use on paper where gold would compete with another gold element.
        secondary: "border-charcoal bg-charcoal text-paper hover:bg-gold hover:text-charcoal",
        ghost: "border-transparent text-charcoal hover:bg-paper-deep",
        destructive: "border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "border-transparent px-0 text-charcoal underline decoration-gold decoration-2 underline-offset-4 hover:decoration-charcoal",
      },
      size: {
        default: "h-11 gap-2 px-4 text-[15px] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-5 text-[15px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-11",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
