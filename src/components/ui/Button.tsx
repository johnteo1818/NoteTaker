import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[#2383E2] focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#191919] text-white hover:bg-[#383838]": variant === "primary",
            "border border-[#E8E8E8] text-[#191919] hover:bg-[#F7F6F3]":
              variant === "secondary",
            "text-[#6B6B6B] hover:text-[#191919] hover:bg-[#F7F6F3]":
              variant === "ghost",
            "bg-[#EB5757] text-white hover:bg-[#d14d4d]": variant === "danger",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-11 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };