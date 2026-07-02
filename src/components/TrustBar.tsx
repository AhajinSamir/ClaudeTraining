import { Fragment } from 'react'
import { Container } from '@/components/layout/Container'
import { StatTile } from '@/components/ui/molecules/StatTile'

const STATS = [
  { value: '99.8%', label: 'Network uptime' },
  { value: '4.2M+', label: 'Customers' },
  { value: '★ 4.8', label: 'Award-winning support' },
]

export function TrustBar() {
  return (
    <section className="bg-surface-tint border-y border-border-neutral">
      <Container>
        <div className="flex items-stretch py-8">
          {STATS.map(({ value, label }, i) => (
            <Fragment key={value}>
              <div className="flex-1">
                <StatTile value={value} label={label} background="white" />
              </div>
              {i < STATS.length - 1 && (
                <div className="w-px self-stretch bg-border-neutral mx-6" />
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  )
}
