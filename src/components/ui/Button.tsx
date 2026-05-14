import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "accent" | "ghost" | "outline" | "dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
  children: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-bold tracking-tight transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-brand-400)]";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm sm:text-base",
  lg: "h-14 px-7 text-base sm:text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--color-brand-400)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-brand-500)]",
  accent:
    "bg-[color:var(--color-accent-500)] text-white hover:bg-[color:var(--color-accent-600)]",
  ghost:
    "text-[color:var(--color-ink)] hover:text-[color:var(--color-brand-500)]",
  outline:
    "border border-[color:var(--color-line)] bg-white text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)]",
  dark:
    "bg-[color:var(--color-ink)] text-white hover:bg-[color:var(--color-ink-strong)]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    >
      {children}
    </a>
  );
}
