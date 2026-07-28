import Image from "next/image";
import type { StaticImageData } from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Reveal } from "@/components/ui/Reveal";
import { downloadCta, type DownloadChannelKey } from "@/lib/content";

import fifthImage from "@/assets/images/005.png";
import telegramQr from "@/assets/images/qr-telegram-landing.png";
import webQr from "@/assets/images/qr-web-landing.png";
import zaloQr from "@/assets/images/qr-app-landing.png";

// Statically imported so `next/image` gets the intrinsic 300x300 size at build
// time — `images.unoptimized` means there is no loader to resolve dimensions at
// runtime. Each PNG encodes exactly the `href` of its channel in `content.ts`.
const qrByKey: Record<DownloadChannelKey, StaticImageData> = {
  zalo: zaloQr,
  web: webQr,
  telegram: telegramQr,
};

export function DownloadCTA() {
  return (
    <section id="download" className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal direction="scale" duration={0.7} className="relative overflow-hidden rounded-[28px] bg-[color:var(--color-brand-400)] px-8 py-12 sm:px-14 sm:py-14 lg:px-20">
          <div className="relative flex flex-col gap-10">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="flex flex-col gap-6 text-center lg:text-left">
                <Reveal as="h2" delay={0.15} className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {downloadCta.heading}
                </Reveal>

                <Reveal as="p" delay={0.25} className="mx-auto max-w-md text-sm leading-relaxed text-white/85 lg:mx-0">
                  {downloadCta.description}
                </Reveal>
              </div>

              {/* h-[540px] must stay >= PhoneMockup's own h-[520px] plus the
                  bounding-box growth from -rotate-3 (~14px). The mockup is
                  absolutely positioned, so a shorter container does not clip
                  it — it silently overflows DOWNWARD and paints on top of the
                  tile row below, which occluded the third QR and made it
                  unscannable at every width >= lg. */}
              <Reveal direction="left" delay={0.2} duration={0.7} className="relative mx-auto hidden h-[540px] w-full max-w-sm items-center justify-center lg:flex">
                <div className="absolute right-4 top-0 -rotate-3">
                  <PhoneMockup
                    src={fifthImage}
                    alt="Báo cáo dự án Zira hiển thị tiến độ và biểu đồ trực quan"
                    priority
                  />
                </div>
              </Reveal>
            </div>

            {/* The three ways in. Each tile carries the same pair — a QR code to
                scan and a link to tap — so the row reads identically across
                channels. The row spans the full card width: inside the 1.2fr
                text column a tile was too narrow to hold a scannable QR at lg. */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {downloadCta.channels.map((channel, i) => (
                <Reveal
                  key={channel.key}
                  delay={0.35 + i * 0.08}
                  className="flex h-full flex-col items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-[var(--shadow-card)]"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                    {channel.eyebrow}
                  </span>

                  <Image
                    src={qrByKey[channel.key]}
                    alt={channel.qrAlt}
                    width={140}
                    height={140}
                    className="aspect-square h-auto w-full max-w-[140px] object-contain"
                  />

                  <Button href={channel.href} variant="primary" size="sm" className="w-full">
                    {channel.action}
                    <Icon name="arrow-up-right" width={14} height={14} />
                  </Button>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
