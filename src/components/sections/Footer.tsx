import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-white py-10">
      <Container className="flex flex-col items-start justify-between gap-4 text-xs text-[color:var(--color-ink-soft)] sm:flex-row sm:items-center">
        <Reveal direction="fade">
          <Logo />
        </Reveal>
        <Reveal as="span" direction="fade" delay={0.1}>
          © 2026 Zira. Quản lý công việc, dự án và nhóm trên Zalo Mini App.
        </Reveal>
        <div className="flex gap-5">
          {/* <a href="#" className="hover:text-[color:var(--color-brand-500)]">
            Quyền riêng tư
          </a>
          <a href="#" className="hover:text-[color:var(--color-brand-500)]">
            Điều khoản
          </a>
          <a href="#" className="hover:text-[color:var(--color-brand-500)]">
            Cookie
          </a> */}
        </div>
      </Container>
    </footer>
  );
}
