/**
 * Client-side reader for the public subscription-plan catalogue.
 *
 * WHY A RUNTIME FETCH IN A STATIC EXPORT
 * --------------------------------------
 * Prices and per-plan features are admin-editable at runtime, so anything
 * baked in at build time is stale as soon as somebody edits a plan. The
 * catalogue is therefore read in the BROWSER, which `output: "export"` allows
 * — the ban is on server-only Next APIs (`cookies()`, route handlers,
 * `revalidate`), not on `fetch` from a client component.
 *
 * WHY A RELATIVE URL
 * ------------------
 * The API gateway serves this static export at the ORIGIN ROOT and mounts it
 * BEFORE `setGlobalPrefix('api')` with `fallthrough: true`, so `/api/*` falls
 * past the static handler into the NestJS controller tree
 * (`zira-server/apps/api-gateway/src/main.ts`). On `https://zira.top` the page
 * and the API are the same origin: no CORS, no preflight, no absolute URL to
 * keep in sync with an environment.
 *
 * The optional Firebase Hosting mirror of this site has no `/api` at all, so
 * the request 404s there and returns HTML. That is not a special case to code
 * around — it lands in the same `null` result as any other failure, and the
 * section shows its fallback copy. The gateway mount stays canonical.
 *
 * The endpoint is anonymous, IP rate-limited (60/min) and cached
 * (`Cache-Control: public, max-age=60, stale-while-revalidate=300`), so one
 * request per page load is well inside budget.
 */

/** Same-origin path. See the module docblock for why it is relative. */
export const PUBLIC_PLANS_ENDPOINT = "/api/v1/subscription-plans/public";

/**
 * Give up rather than hold the section on a hanging gateway. The fallback is
 * already on screen, so an abort costs the visitor nothing.
 */
export const PUBLIC_PLANS_TIMEOUT_MS = 8000;

/**
 * One plan, mirroring `PublicSubscriptionPlanResponse` on the gateway.
 *
 * `featureKeys` is typed `string[]`, not a local enum copy: the server owns
 * that vocabulary and adds to it, and a stale union here would turn a new
 * server flag into a TYPE error instead of the graceful skip
 * `pricingFeatureLabels` already gives it.
 */
export interface PublicPlan {
  planCode: string;
  displayName: string;
  description: string | null;
  /**
   * Price in the SMALLEST currency unit. VND has no minor unit, so 99000 is
   * 99.000 ₫ — never divide it. See `formatPlanPrice`.
   */
  priceAmount: number;
  priceCurrency: string;
  defaultDurationMonths: number | null;
  featureKeys: string[];
}

/** The `{ visible, items }` envelope the endpoint returns. */
export interface PublicPlanCatalogue {
  /**
   * Whether IN-APP purchasing is currently switched on. The server reports it
   * rather than acting on it; this page uses it to pick which note to show
   * under the grid, and never to hide the catalogue.
   */
  visible: boolean;
  /** Active, publicly-listed plans in display order. */
  items: PublicPlan[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parsePlan(raw: unknown): PublicPlan | null {
  if (!isRecord(raw)) {
    return null;
  }
  const planCode = raw["planCode"];
  const displayName = raw["displayName"];
  const priceAmount = raw["priceAmount"];
  const priceCurrency = raw["priceCurrency"];
  if (
    typeof planCode !== "string" ||
    typeof displayName !== "string" ||
    typeof priceAmount !== "number" ||
    !Number.isFinite(priceAmount) ||
    typeof priceCurrency !== "string"
  ) {
    return null;
  }

  const description = raw["description"];
  const months = raw["defaultDurationMonths"];
  const featureKeys = raw["featureKeys"];

  return {
    planCode,
    displayName,
    description: typeof description === "string" ? description : null,
    priceAmount,
    priceCurrency,
    defaultDurationMonths:
      typeof months === "number" && Number.isFinite(months) ? months : null,
    featureKeys: Array.isArray(featureKeys)
      ? featureKeys.filter((key): key is string => typeof key === "string")
      : [],
  };
}

/**
 * Validates the response shape instead of trusting it.
 *
 * The gateway wraps every handler's return value in
 * `{ success, data }` (`ResponseInterceptor`), so the catalogue normally
 * arrives one level down. We accept the bare `{ visible, items }` object too:
 * it costs three lines and means an envelope change on the server degrades to
 * a working page rather than the fallback.
 *
 * Anything that does not parse returns `null` — a marketing page must show
 * prose, not a half-built table.
 */
export function parsePlanCatalogue(raw: unknown): PublicPlanCatalogue | null {
  if (!isRecord(raw)) {
    return null;
  }
  const body = isRecord(raw["data"]) ? raw["data"] : raw;
  const items = body["items"];
  if (!Array.isArray(items)) {
    return null;
  }

  const parsed = items
    .map(parsePlan)
    .filter((plan): plan is PublicPlan => plan !== null);
  if (parsed.length === 0) {
    return null;
  }

  return { visible: body["visible"] === true, items: parsed };
}

/**
 * Reads the catalogue, or resolves `null` for EVERY failure mode — network
 * error, non-2xx (including a 429 from the rate limiter), non-JSON body, an
 * abort, or a payload that does not match the contract. The caller has exactly
 * one branch to handle and can never be handed a partial catalogue.
 */
export async function fetchPublicPlans(
  signal?: AbortSignal,
): Promise<PublicPlanCatalogue | null> {
  try {
    const response = await fetch(PUBLIC_PLANS_ENDPOINT, {
      signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      return null;
    }

    return parsePlanCatalogue(await response.json());
  } catch {
    return null;
  }
}

/**
 * Currencies with no minor unit. For these the smallest unit IS the major
 * unit, so the integer goes to the formatter untouched — dividing VND by 100
 * would advertise 990 ₫ for a 99.000 ₫ plan.
 *
 * Every seeded plan is VND today; the rest of the list is here so a future
 * non-VND plan is formatted correctly rather than by accident.
 */
const ZERO_DECIMAL_CURRENCIES = new Set([
  "VND",
  "JPY",
  "KRW",
  "CLP",
  "ISK",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
]);

/**
 * Formats a smallest-unit amount as Vietnamese currency text.
 *
 * `Intl` throws a `RangeError` on a currency code it does not know, which
 * would take the whole section down over a typo in an admin field, so the
 * fallback prints the grouped number followed by the raw code.
 */
export function formatPlanPrice(amount: number, currency: string): string {
  const code = currency.toUpperCase();
  const major = ZERO_DECIMAL_CURRENCIES.has(code) ? amount : amount / 100;

  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: code,
    }).format(major);
  } catch {
    return `${new Intl.NumberFormat("vi-VN").format(major)} ${code}`;
  }
}
