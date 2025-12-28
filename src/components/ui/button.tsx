import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:shadow-card hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground shadow-soft hover:shadow-card hover:bg-destructive/90",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:shadow-card hover:scale-[1.02]",
        ghost: "text-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        calm: "bg-sage-light text-foreground border-2 border-sage/20 shadow-soft hover:shadow-card hover:border-sage/40 hover:scale-[1.02] active:scale-[0.98]",
        warm: "bg-gradient-to-r from-amber-light to-rose-light text-foreground border-2 border-amber/20 shadow-soft hover:shadow-card hover:scale-[1.02] active:scale-[0.98]",
        today: "bg-gradient-to-r from-amber to-accent text-accent-foreground shadow-card hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-11 rounded-lg px-5 text-base",
        lg: "h-16 rounded-xl px-10 text-xl",
        xl: "h-20 rounded-2xl px-12 text-2xl",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
