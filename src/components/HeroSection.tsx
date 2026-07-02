import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { AnnouncementPill } from '@/components/ui/molecules/AnnouncementPill'

export function HeroSection() {
  return (
    <section className="bg-brand-deep-purple w-full overflow-hidden">
      <Container>
        <div className="relative flex items-center h-[440px]">

          {/* Left content — 55% */}
          <div className="w-[55%] flex flex-col gap-6 relative z-[2]">
            <AnnouncementPill label="5G Now Live Nationwide" variant="dark" />

            <h1 className="text-[52px] font-bold text-white tracking-[-0.025em] leading-[1.08]">
              Australia&apos;s fastest<br />5G network.
            </h1>

            <p className="text-[18px] text-brand-purple-tint leading-[1.6] max-w-[480px]">
              Flexible plans. No lock-in contracts.<br />Cancel any time.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/plans"
                className="inline-flex items-center justify-center h-[52px] px-8 rounded-lg text-base font-semibold text-white bg-brand-purple hover:bg-brand-purple-dark hover:shadow-[0_4px_20px_rgba(161,0,255,0.4)] transition-all"
              >
                View plans
              </Link>
              <Link
                href="/coverage"
                className="inline-flex items-center justify-center h-[52px] px-7 rounded-lg text-base font-semibold text-white bg-transparent border-[1.5px] border-white/60 hover:border-white hover:bg-white/10 transition-colors"
              >
                Check coverage
              </Link>
            </div>
          </div>

          {/* Right — SVG network illustration, inline per story spec */}
          <div className="absolute right-0 top-0 w-[45%] h-full flex items-center justify-end">
            <svg
              width="580"
              height="440"
              viewBox="0 0 580 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A100FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#460073" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="centreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A100FF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#A100FF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background glow */}
              <ellipse cx="340" cy="220" rx="240" ry="200" fill="url(#heroGlow)" />

              {/* Concentric rings */}
              <circle cx="340" cy="220" r="180" stroke="rgba(161,0,255,0.18)" strokeWidth="1" fill="none" />
              <circle cx="340" cy="220" r="140" stroke="rgba(161,0,255,0.22)" strokeWidth="1" fill="none" />
              <circle cx="340" cy="220" r="100" stroke="rgba(161,0,255,0.28)" strokeWidth="1.5" fill="none" />
              <circle cx="340" cy="220" r="60" stroke="rgba(161,0,255,0.4)" strokeWidth="2" fill="none" />

              {/* Hexagonal grid */}
              <g opacity="0.12" stroke="#E5CCFF" strokeWidth="0.8">
                <polygon points="340,80 370,96 370,128 340,144 310,128 310,96" fill="none" />
                <polygon points="400,112 430,128 430,160 400,176 370,160 370,128" fill="none" />
                <polygon points="280,112 310,128 310,160 280,176 250,160 250,128" fill="none" />
                <polygon points="340,144 370,160 370,192 340,208 310,192 310,160" fill="none" />
                <polygon points="400,176 430,192 430,224 400,240 370,224 370,192" fill="none" />
                <polygon points="280,176 310,192 310,224 280,240 250,224 250,192" fill="none" />
                <polygon points="340,208 370,224 370,256 340,272 310,256 310,224" fill="none" />
                <polygon points="400,240 430,256 430,288 400,304 370,288 370,256" fill="none" />
                <polygon points="280,240 310,256 310,288 280,304 250,288 250,256" fill="none" />
                <polygon points="460,144 490,160 490,192 460,208 430,192 430,160" fill="none" />
                <polygon points="460,208 490,224 490,256 460,272 430,256 430,224" fill="none" />
                <polygon points="220,144 250,160 250,192 220,208 190,192 190,160" fill="none" />
              </g>

              {/* Signal arcs */}
              <path d="M 340 220 Q 290 160 340 80" stroke="rgba(161,0,255,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="4 6" />
              <path d="M 340 220 Q 410 160 480 100" stroke="rgba(161,0,255,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="4 6" />
              <path d="M 340 220 Q 200 180 120 130" stroke="rgba(161,0,255,0.35)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
              <path d="M 340 220 Q 380 300 420 360" stroke="rgba(161,0,255,0.35)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
              <path d="M 340 220 Q 260 310 200 380" stroke="rgba(161,0,255,0.3)" strokeWidth="1" fill="none" strokeDasharray="4 6" />

              {/* Node dots */}
              <circle cx="340" cy="80" r="5" fill="#A100FF" opacity="0.9" />
              <circle cx="480" cy="100" r="4" fill="#7500C0" opacity="0.8" />
              <circle cx="120" cy="130" r="4" fill="#7500C0" opacity="0.7" />
              <circle cx="420" cy="360" r="4" fill="#A100FF" opacity="0.7" />
              <circle cx="200" cy="380" r="3" fill="#7500C0" opacity="0.6" />
              <circle cx="510" cy="230" r="3" fill="#E5CCFF" opacity="0.5" />
              <circle cx="150" cy="250" r="3" fill="#E5CCFF" opacity="0.5" />
              <circle cx="450" cy="150" r="3" fill="#E5CCFF" opacity="0.6" />

              {/* Central tower */}
              <g transform="translate(316,188)">
                <rect x="21" y="40" width="6" height="24" rx="1" fill="#A100FF" opacity="0.9" />
                <rect x="14" y="37" width="20" height="5" rx="2" fill="#A100FF" />
                <rect x="16" y="47" width="16" height="2" rx="1" fill="#7500C0" />
                <rect x="18" y="54" width="12" height="2" rx="1" fill="#7500C0" />
                <path d="M 14 28 Q 24 18 34 28" stroke="#A100FF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
                <path d="M 8 22 Q 24 8 40 22" stroke="#A100FF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
                <path d="M 2 16 Q 24 -2 46 16" stroke="#A100FF" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45" />
                <rect x="28" y="5" width="24" height="14" rx="4" fill="#A100FF" />
                <text x="40" y="15.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">5G</text>
              </g>

              {/* Central glow */}
              <circle cx="340" cy="220" r="28" fill="url(#centreGlow)" />
              <circle cx="340" cy="220" r="8" fill="#A100FF" />
              <circle cx="340" cy="220" r="4" fill="#fff" opacity="0.9" />
            </svg>
          </div>

        </div>
      </Container>
    </section>
  )
}
