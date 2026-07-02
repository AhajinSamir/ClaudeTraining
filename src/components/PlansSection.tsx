import Link from 'next/link'
import { Check } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/molecules/SectionHeader'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { ErrorState } from '@/components/ui/ErrorState'
import { getPlans, type Plan } from '@/lib/contentful'

// ── Skeleton ────────────────────────────────────────────────────────────────

export function PlansSectionSkeleton() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="mb-12 flex flex-col items-center gap-3">
          <SkeletonBlock width="80px" height="12px" />
          <SkeletonBlock width="260px" height="36px" />
        </div>
        <div className="flex gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 rounded-xl border border-border-neutral p-8 flex flex-col gap-4"
            >
              <SkeletonBlock width="60px" height="12px" />
              <SkeletonBlock width="100px" height="48px" />
              <SkeletonBlock width="140px" height="14px" />
              <div className="h-px bg-border-neutral my-2" />
              {[0, 1, 2, 3, 4].map((j) => (
                <SkeletonBlock key={j} height="20px" />
              ))}
              <SkeletonBlock height="44px" rounded />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ── Plan card ────────────────────────────────────────────────────────────────

function PlanCard({ plan }: { plan: Plan }) {
  const featured = plan.featured

  return (
    <div
      className={`flex-1 flex flex-col rounded-xl p-8 relative transition-all hover:-translate-y-[3px] ${
        featured
          ? '-mt-2 -mb-2 border-2 border-brand-purple shadow-[0_4px_24px_rgba(161,0,255,0.14)] hover:shadow-[0_12px_40px_rgba(161,0,255,0.22)]'
          : 'border border-border-neutral shadow-card hover:shadow-[0_8px_32px_rgba(70,0,115,0.13)]'
      } bg-white`}
    >
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-purple-tint px-4 py-1 text-[12px] font-semibold tracking-[0.04em] text-brand-deep-purple">
          Most popular
        </span>
      )}

      <p
        className={`text-xs font-medium tracking-[0.06em] uppercase mb-2 ${
          featured ? 'text-brand-purple' : 'text-neutral-500'
        }`}
      >
        {plan.name}
      </p>

      <div className="flex items-end gap-1 mb-1">
        <span className="text-[48px] font-bold text-brand-deep-purple tracking-[-0.03em] leading-none">
          ${plan.price}
        </span>
        <span className="text-base font-medium text-neutral-500 pb-2">/month</span>
      </div>

      <p className="text-sm text-neutral-500 mb-8">{plan.tagline}</p>

      <div className="h-px bg-border-neutral mb-7" />

      <ul className="flex flex-col gap-3.5 mb-9 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span
              className={`w-[18px] h-[18px] flex-shrink-0 rounded-full flex items-center justify-center ${
                featured ? 'bg-brand-purple' : 'bg-surface-tint'
              }`}
            >
              <Check
                size={10}
                className={featured ? 'text-white' : 'text-brand-purple'}
                strokeWidth={2.5}
              />
            </span>
            <span
              className={`text-[15px] text-neutral-900 ${featured ? 'font-medium' : ''}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="#"
        className={`w-full h-11 flex items-center justify-center rounded-lg text-[15px] font-semibold transition-all ${
          featured
            ? 'bg-brand-purple text-white hover:bg-brand-purple-dark hover:shadow-[0_4px_16px_rgba(161,0,255,0.35)]'
            : 'bg-transparent text-brand-purple border-[1.5px] border-brand-purple hover:bg-surface-tint'
        }`}
      >
        {plan.ctaLabel}
      </Link>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export async function PlansSection() {
  let plans: Plan[]

  try {
    plans = await getPlans()
  } catch {
    return (
      <section className="bg-white py-20">
        <Container>
          <ErrorState message="Unable to load plans. Please try again." />
        </Container>
      </section>
    )
  }

  const displayPlans = plans.slice(0, 3)

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="mb-12">
          <SectionHeader
            eyebrow="Pricing"
            heading="Simple, honest pricing."
            align="center"
          />
        </div>
        <div className="flex gap-6 items-stretch">
          {displayPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  )
}
