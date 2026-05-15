import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

import fifthImage from "@/assets/images/005.png";
import qrCode from "@/assets/images/qr-app-landing.png";

export function DownloadCTA() {
  return (
    <section id="download" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-[color:var(--color-brand-400)] px-8 py-12 sm:px-14 sm:py-14 lg:px-20">
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Mở Zira ngay trong Zalo
              </h2>

              <p className="mx-auto max-w-md text-sm leading-relaxed text-white/85 lg:mx-0">
                Zira là Zalo Mini App — bạn không cần tải từ App Store hay Google Play. Quét mã QR bằng Zalo để mở Zira ngay trên điện thoại trong vài giây.
              </p>

              <div className="flex items-center justify-center gap-5 lg:justify-start">
                <div className="rounded-2xl bg-white p-3 shadow-[var(--shadow-card)]">
                  <Image
                    src={qrCode}
                    alt="Mã QR mở Zira Mini App trên Zalo"
                    width={140}
                    height={140}
                    className="object-contain"
                  />
                </div>
                {/* <div className="flex flex-col gap-1 text-left text-white">
                  <span className="text-xs font-bold uppercase tracking-[0.18em]">
                    Mở bằng Zalo
                  </span>
                  <span className="font-display text-base font-semibold leading-snug">
                    Quét mã QR để khởi chạy
                    <br /> Zira Mini App
                  </span>
                </div> */}
              </div>
            </div>

            <div className="relative mx-auto flex h-[360px] w-full max-w-sm items-center justify-center">
              <div className="absolute right-4 top-0 -rotate-3">
                <PhoneMockup
                  src={fifthImage}
                  alt="Báo cáo dự án Zira hiển thị tiến độ và biểu đồ trực quan"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
