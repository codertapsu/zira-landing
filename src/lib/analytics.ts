import type { Analytics } from "firebase/analytics";

// Firebase web-app config for the `zira-landing` app in project `zira-7439c`.
// These values are public client identifiers (not secrets) — the same config
// ships in every browser bundle that uses Firebase.
export const firebaseConfig = {
  apiKey: "AIzaSyDwf4SCVdMNYw0G3Vz2rfbqh2vFNRiCrZg",
  authDomain: "zira-7439c.firebaseapp.com",
  projectId: "zira-7439c",
  storageBucket: "zira-7439c.firebasestorage.app",
  messagingSenderId: "917567574705",
  appId: "1:917567574705:web:6f4910675569997540c890",
  measurementId: "G-C5MGB7D0XY",
};

// Memoized so the SDK is imported and initialized at most once per page load,
// no matter how many callers ask for it. `null` is a normal, expected result —
// see `getAnalyticsInstance` for every case that produces it.
let analyticsPromise: Promise<Analytics | null> | null = null;

/**
 * Resolves the GA4 `Analytics` instance, or `null` when analytics is not
 * available. It is `null` — never a throw — when:
 *   - running on the server (static export / build time),
 *   - `NODE_ENV !== "production"` (dev must not pollute the property),
 *   - `isSupported()` is false (cookie-less webviews, unsupported browsers),
 *   - the SDK import or init fails (ad blockers commonly reject it).
 *
 * The `firebase/*` imports are dynamic so the SDK stays out of the initial JS
 * payload, exactly as the original inline init did.
 */
export function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (process.env.NODE_ENV !== "production") {
    return Promise.resolve(null);
  }
  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      try {
        const [{ getApp, getApps, initializeApp }, { getAnalytics, isSupported }] =
          await Promise.all([
            import("firebase/app"),
            import("firebase/analytics"),
          ]);
        if (!(await isSupported())) {
          return null;
        }
        // Reuse the already-initialized app if there is one; a second
        // `initializeApp` with the default name throws `duplicate-app`.
        const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        return getAnalytics(app);
      } catch {
        // Analytics must never break the page.
        return null;
      }
    })();
  }
  return analyticsPromise;
}

/**
 * Fire-and-forget GA4 event. Never throws, never blocks navigation, and is a
 * silent no-op wherever `getAnalyticsInstance()` resolves to `null`.
 *
 * `name` must satisfy GA4 custom-event naming: letters/digits/underscores,
 * <= 40 chars, not a reserved name.
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number>,
): void {
  void getAnalyticsInstance()
    .then(async (analytics) => {
      if (!analytics) {
        return;
      }
      const { logEvent } = await import("firebase/analytics");
      logEvent(analytics, name, params);
    })
    .catch(() => {
      // Swallowed on purpose — see above.
    });
}
