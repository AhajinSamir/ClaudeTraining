import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { NavLink } from "@/components/ui/molecules/NavLink"

const NAV_LINKS = [
  { href: "/plans", label: "Plans" },
  { href: "/coverage", label: "Coverage" },
  { href: "/business", label: "Business" },
  { href: "/support", label: "Support" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] bg-brand-deep-purple border-b border-white/[0.08]">
      <Container>
        <div className="flex items-center h-16">
          <Link
            href="/"
            className="flex-shrink-0 text-[20px] font-bold tracking-[-0.02em] text-white no-underline"
          >
            Telco<span className="text-brand-purple-tint">Now</span>
          </Link>

          <nav className="flex items-center gap-1 mx-auto" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 px-5 rounded-lg text-sm font-semibold text-white bg-transparent border-[1.5px] border-white/70 hover:border-white hover:bg-white/[0.12] transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:bg-brand-purple-dark hover:shadow-[0_4px_16px_rgba(161,0,255,0.35)] transition-all"
            >
              Get started
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
