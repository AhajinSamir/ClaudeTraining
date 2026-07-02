import { Suspense } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { HeroSection } from '@/components/HeroSection'
import { TrustBar } from '@/components/TrustBar'
import { PlansSection, PlansSectionSkeleton } from '@/components/PlansSection'
import { PromoBanner } from '@/components/PromoBanner'
import { SiteFooter } from '@/components/SiteFooter'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustBar />
        <Suspense fallback={<PlansSectionSkeleton />}>
          <PlansSection />
        </Suspense>
        <PromoBanner />
      </main>
      <SiteFooter />
    </>
  )
}
