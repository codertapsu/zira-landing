import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { privacyPolicy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chính sách quyền riêng tư",
  description:
    "Chính sách quyền riêng tư của Zira: dữ liệu chúng tôi thu thập, cách sử dụng, chia sẻ, lưu trữ và quyền của bạn.",
  alternates: { canonical: "https://zira.top/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
