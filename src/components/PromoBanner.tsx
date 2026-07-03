import { Gift } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { getPromoBanner, type PromoBanner as PromoBannerData } from '@/lib/contentful'

const DEFAULTS: PromoBannerData = {
  headline: 'Refer a friend, get one month free.',
  description: 'Share your code. When they sign up, you both win.',
  ctaLabel: 'Refer now',
  ctaUrl: '#',
}

export function PromoBannerSkeleton() {
  return (
    <section className="bg-surface-tint border-y border-brand-purple-tint">
      <Container>
        <div className="flex items-center justify-between gap-8 h-[120px]">
          <div className="flex items-center gap-5">
            <SkeletonBlock width="48px" height="48px" rounded />
            <div className="flex flex-col gap-2">
              <SkeletonBlock width="280px" height="22px" />
              <SkeletonBlock width="220px" height="16px" />
            </div>
          </div>
          <SkeletonBlock width="110px" height="44px" rounded />
        </div>
      </Container>
    </section>
  )
}

export async function PromoBanner() {
  let data: PromoBannerData
  try {
    data = (await getPromoBanner()) ?? DEFAULTS
  } catch {
    data = DEFAULTS
  }

  return (
    <section className="bg-surface-tint border-y border-brand-purple-tint">
      <Container>
        <div className="flex items-center justify-between gap-8 h-[120px]">

          <div className="flex items-center gap-5">
            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-brand-purple-tint flex items-center justify-center">
              <Gift size={24} className="text-brand-deep-purple" />
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-neutral-900 tracking-[-0.01em] mb-1">
                {data.headline}
              </h2>
              <p className="text-[15px] text-neutral-500">
                {data.description}
              </p>
            </div>
          </div>

          <a
            href={data.ctaUrl}
            className="flex-shrink-0 inline-flex items-center justify-center h-11 px-7 rounded-lg text-[15px] font-semibold text-white bg-brand-purple hover:bg-brand-purple-dark hover:shadow-[0_4px_16px_rgba(161,0,255,0.32)] transition-all whitespace-nowrap"
          >
            {data.ctaLabel}
          </a>

        </div>
      </Container>
    </section>
  )
}
