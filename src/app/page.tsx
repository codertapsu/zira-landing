import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { FeatureTour } from "@/components/sections/FeatureTour";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReadyToRide } from "@/components/sections/ReadyToRide";
import { WatchVideo } from "@/components/sections/WatchVideo";
import { downloadCta } from "@/lib/content";

// The landing is served at `https://zira.top/` — the static export is
// mounted at the origin root by the API gateway.
const siteUrl = "https://zira.top";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zira",
  alternateName: [
    "Zira Mini App",
    "Zira Zalo Mini App",
    "Zira Telegram Mini App",
    "Zira Web App",
  ],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "ProjectManagementApplication",
  operatingSystem: "Zalo Mini App, Telegram Mini App, Web",
  inLanguage: "vi-VN",
  url: siteUrl,
  // Direct entry points users can click from search results / rich previews.
  // Taken straight from the download row so the structured data can never
  // drift from the links (and QR codes) the page actually ships.
  sameAs: downloadCta.channels.map((channel) => channel.href),
  image: `${siteUrl}/og-image.png`,
  description:
    "Zira giúp quản lý công việc, dự án, nhiệm vụ, lịch, ghi chú và báo cáo. Dùng trên Zalo Mini App, Telegram Mini App hoặc trên trình duyệt tại zira.top/app — dành cho đội nhóm vừa và nhỏ.",
  featureList: [
    "Quản lý dự án và sprint",
    "Quản lý nhiệm vụ",
    "Lịch và sự kiện",
    "Ghi chú và retro",
    "Bản vẽ Excalidraw cộng tác",
    "Báo cáo dự án và cá nhân",
    "Thông báo qua bot Zalo và Telegram",
    "Đồng bộ giữa Zalo Mini App, Telegram Mini App và trình duyệt",
  ],
  // Zira is free to start and has paid plans on top, so a single `Offer` at
  // price 0 would misstate the catalogue. The bounds mirror the seeded
  // `subscription_plans` rows (Free 0 → Business 499000 VND); the internal
  // `custom` backfill tier is deliberately excluded — it is not a public plan.
  // NOTE: admins can change prices at runtime and this is a static export, so
  // nothing keeps these bounds in sync automatically. Re-check on price changes.
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "VND",
    lowPrice: "0",
    highPrice: "499000",
    offerCount: 4,
    availability: "https://schema.org/InStock",
  },
  publisher: {
    "@type": "Organization",
    name: "Zira",
    url: siteUrl,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zira",
  url: siteUrl,
  // Brand logo lives at the SPA root, not under the landing basePath.
  logo: "https://zira.top/app/assets/images/brand_logo_full.png",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zira",
  url: siteUrl,
  inLanguage: "vi-VN",
  description:
    "Trang giới thiệu Zira — Mini App trên Zalo và Telegram giúp quản lý công việc, dự án, lịch và báo cáo dành cho đội nhóm.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <WatchVideo />
        <HowItWorks />
        <ReadyToRide />
        <FeatureTour />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
