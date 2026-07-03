import { Suspense } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { HeroSection, HeroSectionSkeleton } from '@/components/HeroSection'
import { TrustBar, TrustBarSkeleton } from '@/components/TrustBar'
import { PlansSection, PlansSectionSkeleton } from '@/components/PlansSection'
import { PromoBanner, PromoBannerSkeleton } from '@/components/PromoBanner'
import { BlogSection, BlogSectionSkeleton } from '@/components/BlogSection'
import { SiteFooter } from '@/components/SiteFooter'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Suspense fallback={<HeroSectionSkeleton />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<TrustBarSkeleton />}>
          <TrustBar />
        </Suspense>
        <Suspense fallback={<PlansSectionSkeleton />}>
          <PlansSection />
        </Suspense>
        <Suspense fallback={<PromoBannerSkeleton />}>
          <PromoBanner />
        </Suspense>
        <Suspense fallback={<BlogSectionSkeleton />}>
          <BlogSection />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
