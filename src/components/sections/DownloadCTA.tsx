import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Reveal } from "@/components/ui/Reveal";

import brandLogo from "@/assets/images/brand_logo.png";
import fifthImage from "@/assets/images/005.png";
import qrCode from "@/assets/images/qr-app-landing.png";

export function DownloadCTA() {
  return (
    <section id="download" className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal direction="scale" duration={0.7} className="relative overflow-hidden rounded-[28px] bg-[color:var(--color-brand-400)] px-8 py-12 sm:px-14 sm:py-14 lg:px-20">
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <Reveal as="h2" delay={0.15} className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Bắt đầu sử dụng Zira ngay
              </Reveal>

              <Reveal as="p" delay={0.25} className="mx-auto max-w-md text-sm leading-relaxed text-white/85 lg:mx-0">
                Hai cách dễ nhất để dùng Zira: quét mã QR mở trong Zalo Mini App, hoặc truy cập trực tiếp trên trình duyệt — cả hai đều miễn phí và không cần cài đặt.
              </Reveal>

              <Reveal delay={0.35} className="mx-auto grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none">
                {/* Zalo Mini App access — scan to launch */}
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-[var(--shadow-card)]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                    Mở trong Zalo
                  </span>
                  <Image
                    src={qrCode}
                    alt="Mã QR mở Zira Mini App trên Zalo"
                    width={140}
                    height={140}
                    className="h-[140px] w-[140px] object-contain"
                  />
                  <span className="text-sm font-semibold text-[color:var(--color-ink)]">
                    Quét bằng điện thoại
                  </span>
                </div>

                {/* Web access — go to zira.top/app */}
                <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-white p-5 shadow-[var(--shadow-card)]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                    Mở trên trình duyệt
                  </span>
                  <div
                    aria-hidden="true"
                    className="grid h-[140px] w-[140px] place-items-center rounded-2xl bg-[color:var(--color-brand-100)]"
                  >
                    <Image
                      src={brandLogo}
                      alt=""
                      aria-hidden="true"
                      width={88}
                      height={88}
                      className="h-22 w-22 object-contain"
                    />
                  </div>
                  <Button href="https://zira.top/app/" variant="primary" size="sm">
                    zira.top/app
                    <Icon name="arrow-up-right" width={14} height={14} />
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.2} duration={0.7} className="relative mx-auto hidden h-[360px] w-full max-w-sm items-center justify-center lg:flex">
              <div className="absolute right-4 top-0 -rotate-3">
                <PhoneMockup
                  src={fifthImage}
                  alt="Báo cáo dự án Zira hiển thị tiến độ và biểu đồ trực quan"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
