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
// `zira.unicloud.me/landing/`. Keep this in sync with the `basePath`
// declared in `next.config.ts` and the `/landing` mount in
// `zira-server/apps/api-gateway/src/main.ts`.
const siteUrl = 'https://zira.unicloud.me/landing';
const title = 'Zira — Quản lý công việc, dự án và nhóm trên Zalo Mini App';
const description =
  'Zira là Zalo Mini App giúp bạn quản lý công việc, dự án, nhiệm vụ, lịch, ghi chú và báo cáo trực quan ngay trên di động. Đơn giản, nhanh, mở ngay trong Zalo — không cần cài đặt.';

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
  // Absolute URLs (not just `'/'`) because `new URL('/', metadataBase)` would
  // resolve to the origin and drop the `/landing` path segment, emitting a
  // wrong canonical on a subpath deploy.
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
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
    icon: '/favicon.ico',
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
      <body className="min-h-screen bg-white text-[color:var(--color-ink)] antialiased">{children}</body>
    </html>
  );
}
