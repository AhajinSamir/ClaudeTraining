import { Fragment } from 'react'
import { Container } from '@/components/layout/Container'
import { StatTile } from '@/components/ui/molecules/StatTile'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { getTrustStats, type TrustStat } from '@/lib/contentful'

const DEFAULTS: TrustStat[] = [
  { id: '1', statValue: '99.8%', statLabel: 'Network uptime', sortOrder: 1 },
  { id: '2', statValue: '4.2M+', statLabel: 'Customers', sortOrder: 2 },
  { id: '3', statValue: '★ 4.8', statLabel: 'Award-winning support', sortOrder: 3 },
]

export function TrustBarSkeleton() {
  return (
    <section className="bg-surface-tint border-y border-border-neutral">
      <Container>
        <div className="flex items-stretch py-8">
          {[0, 1, 2].map((i) => (
            <Fragment key={i}>
              <div className="flex-1 flex flex-col gap-2 px-4">
                <SkeletonBlock width="80px" height="32px" />
                <SkeletonBlock width="120px" height="14px" />
              </div>
              {i < 2 && <div className="w-px self-stretch bg-border-neutral mx-6" />}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  )
}

export async function TrustBar() {
  let stats: TrustStat[]
  try {
    const fetched = await getTrustStats()
    stats = fetched.length > 0 ? fetched : DEFAULTS
  } catch {
    stats = DEFAULTS
  }

  return (
    <section className="bg-surface-tint border-y border-border-neutral">
      <Container>
        <div className="flex items-stretch py-8">
          {stats.map(({ id, statValue, statLabel }, i) => (
            <Fragment key={id}>
              <div className="flex-1">
                <StatTile value={statValue} label={statLabel} background="white" />
              </div>
              {i < stats.length - 1 && (
                <div className="w-px self-stretch bg-border-neutral mx-6" />
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  )
}
