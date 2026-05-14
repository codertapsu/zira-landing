import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/content";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-24 items-center justify-between gap-6">
        <a href="#top" className="inline-flex" aria-label="RideEasy home">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10 font-ui text-base font-medium text-[color:var(--color-ink)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-[color:var(--color-brand-500)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="#login"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Log In
          </Button>
          <Button href="#download" variant="primary" size="sm">
            Get Started
          </Button>
        </div>
      </Container>
    </header>
  );
}
