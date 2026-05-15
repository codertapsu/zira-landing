import Image from "next/image";
import brandLogo from "@/assets/images/brand_logo.png";

interface LogoProps {
  className?: string;
  tone?: "ink" | "light";
}

export function Logo({ className = "", tone = "ink" }: LogoProps) {
  const textColor =
    tone === "light" ? "text-white" : "text-[color:var(--color-ink)]";

  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight ${textColor} ${className}`}
    >
      <Image
        src={brandLogo}
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="object-contain"
        priority
      />
      Zira
    </span>
  );
}
