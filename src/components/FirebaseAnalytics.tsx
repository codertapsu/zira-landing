"use client";

import { useEffect } from "react";

// Firebase web-app config for the `zira-landing` app in project `zira-7439c`.
// These values are public client identifiers (not secrets) — the same config
// ships in every browser bundle that uses Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyDwf4SCVdMNYw0G3Vz2rfbqh2vFNRiCrZg",
  authDomain: "zira-7439c.firebaseapp.com",
  projectId: "zira-7439c",
  storageBucket: "zira-7439c.firebasestorage.app",
  messagingSenderId: "917567574705",
  appId: "1:917567574705:web:6f4910675569997540c890",
  measurementId: "G-C5MGB7D0XY",
};

/**
 * Initializes Firebase Analytics (GA4) on the client. Renders nothing.
 *
 * The SDK is loaded via dynamic import inside an effect so it stays out of
 * the initial JS payload and never runs during `next dev`, static export, or
 * in browsers where analytics is unsupported (`isSupported()` guards e.g.
 * cookie-less webviews). Works identically on both deployments — the API
 * gateway origin (zira.top) and Firebase Hosting.
 */
export function FirebaseAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    void (async () => {
      try {
        const [{ initializeApp }, { getAnalytics, isSupported }] =
          await Promise.all([
            import("firebase/app"),
            import("firebase/analytics"),
          ]);
        if (await isSupported()) {
          getAnalytics(initializeApp(firebaseConfig));
        }
      } catch {
        // Analytics must never break the page — ad blockers commonly reject
        // the GA request; ignore.
      }
    })();
  }, []);

  return null;
}
