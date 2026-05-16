import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WatchVideo() {
  return (
    <section
      id="watch-video"
      aria-labelledby="watch-video-heading"
      className="bg-white py-20 sm:py-24"
    >
      <Container className="flex flex-col gap-14">
        <Reveal>
          <SectionHeader
            title={<span id="watch-video-heading">Xem Zira hoạt động trong thực tế</span>}
            description="Một video ngắn cho bạn thấy cách đội nhóm dùng Zira để lên kế hoạch tuần, theo dõi công việc và phối hợp mà không bị quá tải."
          />
        </Reveal>

        <Reveal direction="scale" duration={0.7} className="relative mx-auto w-full max-w-5xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-[color:var(--color-brand-400)]/15 blur-3xl"
          />

          <div className="relative overflow-hidden rounded-[16px] border border-[color:var(--color-line)] bg-[color:var(--color-ink)] shadow-[var(--shadow-card)]">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/-FESLtPez7A"
                title="Zira — Quản lý công việc"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
