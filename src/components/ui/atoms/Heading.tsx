import { ReactNode } from 'react'

type HeadingLevel = 1 | 2 | 3
type HeadingVariant = 'hero' | 'page' | 'auth' | 'section' | 'card'
type HeadingColor = 'default' | 'white' | 'brand-purple'

type HeadingProps = {
  level: HeadingLevel
  variant: HeadingVariant
  color?: HeadingColor
  children: ReactNode
}

const variantClasses: Record<HeadingVariant, string> = {
  hero: 'text-[52px] font-bold tracking-[-0.025em] leading-[1.08]',
  page: 'text-[28px] font-bold leading-tight',
  auth: 'text-[32px] font-bold leading-tight',
  section: 'text-[32px] font-bold leading-tight',
  card: 'text-lg font-semibold leading-snug',
}

const colorClasses: Record<HeadingColor, string> = {
  default: 'text-neutral-900',
  white: 'text-white',
  'brand-purple': 'text-brand-purple',
}

export function Heading({ level, variant, color = 'default', children }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  return (
    <Tag className={`${variantClasses[variant]} ${colorClasses[color]}`}>
      {children}
    </Tag>
  )
}
