import { ReactNode } from 'react'

type SectionBackground = 'white' | 'surface-tint' | 'brand-deep-purple'

type SectionProps = {
  children: ReactNode
  background?: SectionBackground
}

const backgroundClasses: Record<SectionBackground, string> = {
  'white': 'bg-white',
  'surface-tint': 'bg-surface-tint',
  'brand-deep-purple': 'bg-brand-deep-purple',
}

export function Section({ children, background = 'white' }: SectionProps) {
  return (
    <section className={`py-20 ${backgroundClasses[background]}`}>
      {children}
    </section>
  )
}
