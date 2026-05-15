import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { FeatureTour } from "@/components/sections/FeatureTour";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReadyToRide } from "@/components/sections/ReadyToRide";
import { WatchVideo } from "@/components/sections/WatchVideo";

// The landing is served at `https://zira.unicloud.me/landing/` — keep this
// constant aligned with `basePath` in `next.config.ts` and `layout.tsx`.
const siteUrl = "https://zira.unicloud.me/landing";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zira",
  alternateName: "Zira Mini App",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "ProjectManagementApplication",
  operatingSystem: "Zalo Mini App, Web",
  inLanguage: "vi-VN",
  url: siteUrl,
  description:
    "Zira là Zalo Mini App giúp quản lý công việc, dự án, nhiệm vụ, lịch, ghi chú và báo cáo trên di động. Dành cho đội nhóm vừa và nhỏ, dùng ngay trong Zalo.",
  featureList: [
    "Quản lý dự án và sprint",
    "Quản lý nhiệm vụ",
    "Lịch và sự kiện",
    "Ghi chú và retro",
    "Bản vẽ Excalidraw cộng tác",
    "Báo cáo dự án và cá nhân",
    "Thông báo qua Zalo bot",
    "Đồng bộ giữa Zalo Mini App và trình duyệt",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "VND",
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
  logo: "https://zira.unicloud.me/app/assets/images/brand_logo_full.png",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zira",
  url: siteUrl,
  inLanguage: "vi-VN",
  description:
    "Trang giới thiệu Zira — Zalo Mini App quản lý công việc, dự án, lịch và báo cáo dành cho đội nhóm.",
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
