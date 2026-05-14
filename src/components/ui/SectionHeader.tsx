import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[color:var(--color-ink)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
