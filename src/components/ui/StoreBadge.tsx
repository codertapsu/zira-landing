import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type Store = "apple" | "google";

interface StoreBadgeProps {
  store: Store;
  href: string;
  className?: string;
  variant?: "dark" | "light";
}

const labels: Record<Store, { eyebrow: string; main: string }> = {
  apple: { eyebrow: "Download on the", main: "App Store" },
  google: { eyebrow: "GET IT ON", main: "Google Play" },
};

export function StoreBadge({
  store,
  href,
  className = "",
  variant = "dark",
}: StoreBadgeProps) {
  const palette =
    variant === "dark"
      ? "bg-[color:var(--color-ink)] text-white hover:bg-[color:var(--color-ink-strong)]"
      : "bg-white text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface-soft)]";

  return (
    <Link
      href={href}
      className={`inline-flex h-14 items-center gap-3 rounded-xl px-5 transition-colors ${palette} ${className}`}
      aria-label={`Download on ${labels[store].main}`}
    >
      <Icon
        name={store === "apple" ? "apple" : "google-play"}
        width={26}
        height={26}
      />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[10px] uppercase tracking-[0.16em] opacity-80">
          {labels[store].eyebrow}
        </span>
        <span className="font-display text-base font-bold">
          {labels[store].main}
        </span>
      </span>
    </Link>
  );
}
