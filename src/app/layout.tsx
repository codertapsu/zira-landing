import type { Metadata, Viewport } from "next";
import { Cabin, Roboto } from "next/font/google";
import "./globals.css";

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://rideeasy.example.com";
const title = "RideEasy — Your smooth ride, just a tap away";
const description =
  "RideEasy is the friendly ride-hailing app for everyday trips. Track your driver in real time, pay securely, and choose from ride options that fit your day.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · RideEasy",
  },
  description,
  applicationName: "RideEasy",
  keywords: [
    "ride hailing",
    "rideshare",
    "RideEasy",
    "transportation app",
    "book a ride",
    "driver app",
  ],
  authors: [{ name: "RideEasy" }],
  creator: "RideEasy",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "RideEasy",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@rideeasy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabin.variable} ${roboto.variable}`}>
      <body className="min-h-screen bg-white text-[color:var(--color-ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
