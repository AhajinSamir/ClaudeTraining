import { Gift } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export function PromoBanner() {
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
                Refer a friend, get one month free.
              </h2>
              <p className="text-[15px] text-neutral-500">
                Share your code. When they sign up, you both win.
              </p>
            </div>
          </div>

          <a
            href="#"
            className="flex-shrink-0 inline-flex items-center justify-center h-11 px-7 rounded-lg text-[15px] font-semibold text-white bg-brand-purple hover:bg-brand-purple-dark hover:shadow-[0_4px_16px_rgba(161,0,255,0.32)] transition-all whitespace-nowrap"
          >
            Refer now
          </a>

        </div>
      </Container>
    </section>
  )
}
