import { Container } from '@/components/ui/Container';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { howItWorksFeatures } from '@/lib/content';

import secondImage from '@/assets/images/002.png';

export function HowItWorks() {
  const leftFeatures = [howItWorksFeatures[0], howItWorksFeatures[2]];
  const rightFeatures = [howItWorksFeatures[1], howItWorksFeatures[3]];

  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          title="Zira hoạt động thế nào"
          description="Một nơi để lên kế hoạch, giao việc, theo dõi tiến độ và báo cáo. Đơn giản, đủ dùng cho cả nhóm vừa bắt đầu lẫn nhóm đã chạy nhiều dự án."
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <ul className="flex flex-col gap-12 text-center">
            {leftFeatures.map((feature) => (
              <FeatureItem key={feature.title} feature={feature} />
            ))}
          </ul>

          <div className="relative mx-auto flex items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute h-[340px] w-[340px] rounded-full bg-[color:var(--color-brand-400)]"
            />
            <PhoneMockup
              className="relative"
              src={secondImage}
              alt="Màn hình chào mừng Zira giúp người dùng mới bắt đầu quản lý công việc"
              priority
            />
          </div>

          <ul className="flex flex-col gap-12 text-center">
            {rightFeatures.map((feature) => (
              <FeatureItem key={feature.title} feature={feature} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function FeatureItem({ feature }: { feature: { number: string; title: string; description: string } }) {
  return (
    <li className="flex flex-col items-center gap-3">
      <span
        aria-hidden="true"
        className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--color-brand-50)] font-display text-lg font-semibold text-[color:var(--color-brand-500)]"
      >
        {feature.number}
      </span>
      <h3 className="font-display text-base font-bold text-[color:var(--color-ink)]">{feature.title}</h3>
      <p className="max-w-[200px] text-sm leading-relaxed text-[color:var(--color-ink-soft)]">{feature.description}</p>
    </li>
  );
}
