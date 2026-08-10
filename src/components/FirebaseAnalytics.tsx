"use client";

import { useEffect } from "react";

import { getAnalyticsInstance } from "@/lib/analytics";

/**
 * Initializes Firebase Analytics (GA4) on the client. Renders nothing.
 *
 * All the guarding lives in `getAnalyticsInstance()` — browser-only,
 * production-only, `isSupported()`-checked, dynamic import, never throws — so
 * this component and `trackEvent()` share exactly one init path and one app
 * instance. Works identically on both deployments: the API gateway origin
 * (zira.top) and Firebase Hosting.
 */
export function FirebaseAnalytics() {
  useEffect(() => {
    void getAnalyticsInstance();
  }, []);

  return null;
}
