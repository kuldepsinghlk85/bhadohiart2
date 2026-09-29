import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    
    // Custom tailwind classes based on the variant and size
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-[var(--color-brand-burgundy)] text-white hover:bg-[var(--color-brand-burgundy-dark)]",
      outline: "border border-[var(--color-brand-border)] bg-transparent hover:bg-[var(--color-brand-cream)] text-[var(--color-brand-dark)]",
      ghost: "hover:bg-[var(--color-brand-cream)] text-[var(--color-brand-dark)]",
      link: "text-[var(--color-brand-burgundy)] underline-offset-4 hover:underline",
      destructive: "bg-rose-600 text-white hover:bg-rose-700",
    }
    
    const sizes = {
      default: "h-10 px-6 py-2 uppercase tracking-wide",
      sm: "h-9 rounded-sm px-3",
      lg: "h-12 rounded-sm px-8 uppercase tracking-widest text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
