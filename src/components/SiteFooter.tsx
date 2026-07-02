import Link from 'next/link'
import { Container } from '@/components/layout/Container'

const PLANS_LINKS = [
  { label: 'Starter', href: '#' },
  { label: 'Plus', href: '#' },
  { label: 'Pro', href: '#' },
  { label: 'Business', href: '#' },
]

const SUPPORT_LINKS = [
  { label: 'Help centre', href: '#' },
  { label: 'Contact us', href: '#' },
  { label: 'Coverage map', href: '#' },
  { label: 'FAQs', href: '#' },
]

const LEGAL_LINKS = [
  { label: 'Privacy policy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Accessibility', href: '#' },
]

function FooterColHeading({ children }: { children: string }) {
  return (
    <p className="text-xs font-medium tracking-[0.06em] uppercase text-neutral-500 mb-3">
      {children}
    </p>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-sm text-neutral-500 leading-loose hover:text-white transition-colors"
    >
      {label}
    </Link>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-neutral-900 w-full pt-16">
      <Container>

        {/* Four-column grid */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-14">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-[20px] font-bold tracking-[-0.02em] text-white no-underline w-fit">
              Telco<span className="text-brand-purple-tint">Now</span>
            </Link>
            <p className="text-sm text-neutral-500 leading-[1.6]">Fast. Simple. Yours.</p>
            <p className="text-sm text-neutral-500 leading-[1.7] max-w-[240px]">
              Australia&apos;s fastest growing 5G network. Built for real people, priced fairly.
            </p>
          </div>

          {/* Col 2: Plans */}
          <div>
            <FooterColHeading>Plans</FooterColHeading>
            {PLANS_LINKS.map(({ label, href }) => (
              <FooterLink key={label} href={href} label={label} />
            ))}
          </div>

          {/* Col 3: Support */}
          <div>
            <FooterColHeading>Support</FooterColHeading>
            {SUPPORT_LINKS.map(({ label, href }) => (
              <FooterLink key={label} href={href} label={label} />
            ))}
          </div>

          {/* Col 4: Legal */}
          <div>
            <FooterColHeading>Legal</FooterColHeading>
            {LEGAL_LINKS.map(({ label, href }) => (
              <FooterLink key={label} href={href} label={label} />
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E1E2E] py-5 flex items-center justify-between">
          <span className="text-[13px] text-neutral-500">© 2026 TelcoNow Pty Ltd</span>
          <span className="text-[13px] text-neutral-500">All prices include GST</span>
        </div>

      </Container>
    </footer>
  )
}
