import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Roboto } from 'next/font/google';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam-pro',
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

// `siteUrl` is the absolute URL where the landing page is reachable —
// `zira.top/`. The server mounts the static export at the origin root
// (see `zira-server/apps/api-gateway/src/main.ts`).
const siteUrl = 'https://zira.top';
const title = 'Zira — Quản lý công việc, dự án và nhóm trên Zalo Mini App';
const description =
  'Zira là Zalo Mini App giúp bạn quản lý công việc, dự án, nhiệm vụ, lịch, ghi chú và báo cáo trực quan ngay trên di động. Đơn giản, nhanh, mở ngay trong Zalo.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s · Zira',
  },
  description,
  applicationName: 'Zira',
  category: 'productivity',
  keywords: [
    'Zira',
    'Zalo Mini App',
    'quản lý công việc',
    'quản lý dự án',
    'quản lý nhiệm vụ',
    'quản lý sprint',
    'phần mềm quản lý công việc',
    'ứng dụng quản lý nhóm',
    'lịch công việc',
    'ghi chú nhóm',
    'báo cáo dự án',
    'cộng tác nhóm',
    'tăng năng suất',
    'Trello tiếng Việt',
    'Jira tiếng Việt',
    'quản lý đội nhóm trên Zalo',
  ],
  authors: [{ name: 'Zira' }],
  creator: 'Zira',
  publisher: 'Zira',
  alternates: {
    canonical: `${siteUrl}/`,
    languages: {
      'vi-VN': `${siteUrl}/`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/`,
    siteName: 'Zira',
    title,
    description,
    locale: 'vi_VN',
    alternateLocale: ['en_US'],
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        secureUrl: `${siteUrl}/og-image.png`,
        type: 'image/png',
        width: 1920,
        height: 1008,
        alt: 'Zira — Zalo Mini App quản lý công việc, dự án và nhóm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        alt: 'Zira — Zalo Mini App quản lý công việc, dự án và nhóm',
        width: 1920,
        height: 1008,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-icon-180x180.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-config': '/browserconfig.xml',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi-VN" className={`${beVietnamPro.variable} ${roboto.variable}`}>
      <head>
        {/* `og:logo` is not in the official OG spec but some validators
            and Vietnamese/Zalo tooling require it. Schema.org
            `Organization.logo` (see page.tsx JSON-LD) is the semantic
            equivalent and remains the canonical brand-logo source. */}
        <meta property="og:logo" content={`${siteUrl}/brand_logo_full.png`} />
        {/* Motion sets `style="opacity:0; transform:..."` on Reveal
            elements during SSR. Without JS those styles never animate
            away, so this no-JS override forces the rendered state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-white text-[color:var(--color-ink)] antialiased">{children}</body>
    </html>
  );
}
