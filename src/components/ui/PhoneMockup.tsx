import Image, { type StaticImageData } from 'next/image';

interface PhoneMockupProps {
  src?: StaticImageData | string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function PhoneMockup({ src, alt = '', className = '', priority = false }: PhoneMockupProps) {
  const decorative = alt === '';

  return (
    <div
      className={`relative h-[520px] w-[260px] rounded-[44px] border border-[color:var(--color-line)] bg-[color:var(--color-ink)] p-3 shadow-[var(--shadow-card)] ${className}`}
      aria-hidden={decorative ? 'true' : undefined}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[color:var(--color-brand-100)]">
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-20 -translate-x-1/2 rounded-full bg-[color:var(--color-ink)]" />

        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="260px"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <PhonePlaceholder />
        )}
      </div>
    </div>
  );
}

function PhonePlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color:var(--color-brand-100)] text-[color:var(--color-ink-soft)]">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M4 16l4-4 3 3 4-5 5 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="10" r="1.4" fill="currentColor" />
      </svg>
      <span className="font-display text-xs font-semibold uppercase tracking-[0.18em]">Add image</span>
    </div>
  );
}
