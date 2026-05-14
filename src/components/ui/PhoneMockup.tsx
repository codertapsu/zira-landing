import { Icon } from "@/components/ui/Icon";

type Variant = "ride" | "payment" | "rating";

interface PhoneMockupProps {
  variant?: Variant;
  className?: string;
}

export function PhoneMockup({
  variant = "ride",
  className = "",
}: PhoneMockupProps) {
  return (
    <div
      className={`relative h-[520px] w-[260px] rounded-[44px] border border-[color:var(--color-line)] bg-[color:var(--color-ink)] p-3 shadow-[var(--shadow-card)] ${className}`}
      aria-hidden="true"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-white">
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-20 -translate-x-1/2 rounded-full bg-[color:var(--color-ink)]" />

        {variant === "ride" ? <RideScreen /> : null}
        {variant === "payment" ? <PaymentScreen /> : null}
        {variant === "rating" ? <RatingScreen /> : null}
      </div>
    </div>
  );
}

function RideScreen() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-[58%] bg-[color:var(--color-brand-100)]">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute left-6 top-10 h-px w-32 rotate-12 bg-[color:var(--color-brand-500)]/40" />
          <div className="absolute right-4 top-20 h-px w-36 -rotate-6 bg-[color:var(--color-brand-500)]/40" />
          <div className="absolute left-12 bottom-16 h-px w-24 rotate-3 bg-[color:var(--color-brand-500)]/30" />
          <div className="absolute right-10 bottom-10 h-2 w-2 rounded-full bg-[color:var(--color-ink)]" />
          <div className="absolute left-10 top-24 h-2 w-2 rounded-full bg-[color:var(--color-accent-500)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-[var(--shadow-soft)]">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-brand-400)] text-[color:var(--color-ink)]">
            <Icon name="map-pin" width={20} height={20} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
            Arriving in
          </span>
          <span className="font-display text-2xl font-bold text-[color:var(--color-ink)]">
            3 min
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[color:var(--color-surface-soft)] p-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-ink)] text-white font-bold">
            JM
          </span>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-bold text-[color:var(--color-ink)]">
              Jordan M.
            </span>
            <span className="text-xs text-[color:var(--color-ink-soft)]">
              Toyota Prius · KX9 218
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-brand-100)] px-2 py-1 text-xs font-bold text-[color:var(--color-ink)]">
            <Icon name="star" width={12} height={12} />
            4.9
          </span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pb-4">
          <span className="rounded-lg bg-[color:var(--color-ink)] py-2 text-center text-xs font-bold text-white">
            Message
          </span>
          <span className="rounded-lg bg-[color:var(--color-brand-400)] py-2 text-center text-xs font-bold text-[color:var(--color-ink)]">
            Call
          </span>
        </div>
      </div>
    </div>
  );
}

function PaymentScreen() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="px-4 pt-8 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
          Trip total
        </span>
        <div className="mt-1 font-display text-3xl font-bold text-[color:var(--color-ink)]">
          $14.20
        </div>
        <span className="text-xs text-[color:var(--color-ink-soft)]">
          Paid with Visa · 4912
        </span>
      </div>

      <div className="mx-4 rounded-2xl bg-[color:var(--color-ink)] p-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.16em] opacity-80">
            RideEasy Wallet
          </span>
          <Icon name="wallet" width={18} height={18} />
        </div>
        <div className="mt-3 font-display text-2xl font-bold">$48.00</div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-2/3 rounded-full bg-[color:var(--color-brand-400)]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-4">
        {[
          { label: "Base fare", value: "$8.50" },
          { label: "Distance", value: "$4.20" },
          { label: "Service fee", value: "$1.50" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-xs"
          >
            <span className="text-[color:var(--color-ink-soft)]">
              {row.label}
            </span>
            <span className="font-bold text-[color:var(--color-ink)]">
              {row.value}
            </span>
          </div>
        ))}
        <div className="mt-auto rounded-lg bg-[color:var(--color-brand-400)] py-2 text-center text-xs font-bold text-[color:var(--color-ink)]">
          Pay & Confirm
        </div>
      </div>
    </div>
  );
}

function RatingScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center px-5 pt-10">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-[color:var(--color-ink)] font-bold text-white">
        JM
      </span>
      <span className="mt-3 font-display text-lg font-bold text-[color:var(--color-ink)]">
        Jordan M.
      </span>
      <span className="text-xs text-[color:var(--color-ink-soft)]">
        Trip · 12 min
      </span>

      <div className="mt-5 flex gap-1.5 text-[color:var(--color-brand-400)]">
        {[0, 1, 2, 3].map((s) => (
          <Icon key={s} name="star" width={22} height={22} />
        ))}
        <Icon
          name="star"
          width={22}
          height={22}
          className="text-[color:var(--color-line)]"
        />
      </div>

      <p className="mt-4 text-center text-xs text-[color:var(--color-ink-soft)]">
        How was your ride with Jordan today?
      </p>

      <div className="mt-4 grid w-full grid-cols-2 gap-2">
        {["Friendly", "Smooth ride", "On time", "Clean car"].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-[color:var(--color-line)] px-2 py-1.5 text-center text-[11px] font-bold text-[color:var(--color-ink)]"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-auto mb-5 w-full rounded-lg bg-[color:var(--color-brand-400)] py-2 text-center text-xs font-bold text-[color:var(--color-ink)]">
        Submit rating
      </div>
    </div>
  );
}
