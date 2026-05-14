interface LogoProps {
  className?: string;
  tone?: "ink" | "light";
}

export function Logo({ className = "", tone = "ink" }: LogoProps) {
  const textColor =
    tone === "light"
      ? "text-white"
      : "text-[color:var(--color-ink)]";

  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight ${textColor} ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--color-brand-400)] text-[color:var(--color-ink)] shadow-[var(--shadow-soft)]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 16l1.5-5h11L19 16M5 16h14M5 16v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1m11 1v-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="16" r="1.4" fill="currentColor" />
          <circle cx="16" cy="16" r="1.4" fill="currentColor" />
        </svg>
      </span>
      RideEasy
    </span>
  );
}
