"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        outline:
          "border border-input bg-transparent hover:bg-accent/10 hover:border-accent/50 rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg",
        ghost: "hover:bg-accent/10 hover:text-accent rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium variants
        hero: "bg-foreground text-background font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-foreground/10",
        heroOutline:
          "border border-border/60 bg-transparent text-foreground font-medium rounded-full hover:bg-foreground/5 hover:border-border hover:scale-[1.02] active:scale-[0.98]",
        glow: "bg-gradient-to-r from-primary to-accent text-foreground font-medium rounded-full shadow-lg glow-accent hover:scale-[1.02] active:scale-[0.98]",
        nav: "text-muted-foreground hover:text-foreground bg-transparent font-normal",
        pill: "bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 active:scale-[0.98]",
        pillOutline:
          "border border-foreground/20 bg-transparent text-foreground font-medium rounded-full hover:bg-foreground/5 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
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
