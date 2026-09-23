import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-body font-medium transition-all duration-hover ease-smooth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Solid yellow with a hard bottom edge — the shadow reads as weight
        // rather than a glow, which suits the flat editorial system. Do not use
        // `primary` on a yellow background; use `onYellow` instead.
        primary:
          "bg-brand-yellow text-[#000] hover:bg-brand-yellow-hover hover:-translate-y-px shadow-[0_2px_0_0_rgba(0,0,0,0.22)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.28)]",
        // For CTAs placed ON a yellow panel (CTABanner, DiagnosticIntake).
        // Yellow-on-yellow has no contrast; emerald is the strongest pairing.
        onYellow:
          "bg-emerald-900 text-white hover:bg-ink-headline hover:-translate-y-px shadow-[0_2px_0_0_rgba(0,0,0,0.18)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.22)]",
        secondary:
          "text-brand-blue underline underline-offset-4 decoration-1 decoration-brand-blue/40 hover:opacity-70 after:content-['_→']",
        ghost:
          "text-ink-headline hover:bg-bg-secondary",
        // Heavier border than the default hairline so it holds its own as an
        // action rather than reading as a container.
        outline:
          "border-[1.5px] border-ink-headline/70 text-ink-headline hover:bg-ink-headline hover:text-white hover:border-ink-headline",
      },
      size: {
        default: "px-[42px] py-[18px] rounded text-button",
        sm: "px-6 py-3 rounded text-body-sm",
        lg: "px-12 py-5 rounded text-body-lg",
        icon: "h-10 w-10 rounded",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
