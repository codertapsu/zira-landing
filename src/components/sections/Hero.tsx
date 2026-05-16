import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Reveal } from "@/components/ui/Reveal";

import firstImage from "@/assets/images/001.png";
import subFirstImage from "@/assets/images/sub_001.png";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <Container className="relative grid gap-14 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:py-24">
        <div className="flex flex-col gap-7 text-center lg:text-left">
          <Reveal as="h1" delay={0} className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[color:var(--color-ink)] sm:text-5xl lg:text-[48px]">
            Quản lý công việc và dự án
            <br className="hidden sm:inline" /> ngay trong Zalo
          </Reveal>

          <Reveal as="p" delay={0.1} className="mx-auto max-w-md text-sm leading-relaxed text-[color:var(--color-ink-soft)] lg:mx-0">
            Zira là Zalo Mini App giúp bạn tổ chức nhiệm vụ, dự án, lịch họp, ghi chú và báo cáo — tất cả trên di động, không cần cài đặt thêm ứng dụng nào.
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
            <Button href="#download" variant="primary" size="lg">
              Mở ngay trong Zalo
              <Icon name="arrow-right" width={18} height={18} />
            </Button>
            <Button
              href="#watch-video"
              variant="ghost"
              size="lg"
              className="!px-3 text-[color:var(--color-brand-500)] hover:text-[color:var(--color-brand-600)]"
            >
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-brand-50)] text-[color:var(--color-brand-500)]"
              >
                <Icon name="play" width={14} height={14} />
              </span>
              Xem giới thiệu
            </Button>
          </Reveal>
        </div>

        <Reveal direction="scale" delay={0.15} duration={0.7} className="relative mx-auto flex h-[560px] w-full max-w-md items-center justify-center">
          <HeroShine />

          <PhoneMockup
            className="relative"
            src={firstImage}
            alt="Trang chủ Zira hiển thị tổng quan công việc và dự án trong ngày"
            priority
          />

          <div className="absolute bottom-12 left-0 z-10 flex w-[220px] flex-col gap-3 overflow-hidden rounded-xl sm:left-2">
            <Image src={subFirstImage} alt="Đội nhóm cộng tác trên Zira Mini App" priority />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function HeroShine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div className="relative h-[440px] w-[440px]">
        <div className="absolute inset-0 rounded-[44%] bg-[color:var(--color-brand-400)]/55 blur-3xl" />
        <div className="absolute inset-6 rounded-[42%] bg-[color:var(--color-brand-400)]/70 blur-2xl" />
        <div className="absolute inset-14 rounded-[40%] bg-[color:var(--color-brand-400)]/80 blur-xl" />
        <div className="absolute inset-0 rounded-[44%] border-none border-dashed border-[color:var(--color-ink-soft)]/30" />
        <span className="absolute right-6 top-16 h-3.5 w-3.5 rounded-full bg-[color:var(--color-accent-500)]" />
        <span className="absolute bottom-16 right-12 h-2 w-2 rounded-full bg-[color:var(--color-brand-500)]" />
        <span className="absolute left-6 top-1/2 h-2.5 w-2.5 rounded-full bg-[color:var(--color-brand-600)]/60" />
      </div>
    </div>
  );
}
