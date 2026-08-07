import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-body font-medium transition-all duration-hover ease-smooth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-yellow text-[#000] hover:bg-brand-yellow-hover hover:-translate-y-px",
        secondary:
          "text-brand-blue hover:opacity-70 after:content-['_→']",
        ghost:
          "text-ink-headline hover:bg-bg-secondary",
        outline:
          "border border-rule text-ink-headline hover:border-ink-headline",
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
