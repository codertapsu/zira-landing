import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { termsOfService } from "@/lib/content";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description:
    "Điều khoản sử dụng dịch vụ Zira: tài khoản, sử dụng hợp lệ, sở hữu trí tuệ, giới hạn trách nhiệm và luật áp dụng.",
  // Trailing slash is explicit: `trailingSlash: true` emits `/terms/`, and
  // the sitemap advertises the same string.
  alternates: { canonical: "https://zira.top/terms/" },
};

export default function TermsPage() {
  return <LegalPage doc={termsOfService} />;
}
