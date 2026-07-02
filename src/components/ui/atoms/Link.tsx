import NextLink from 'next/link'
import { ReactNode } from 'react'

type LinkVariant = 'default' | 'nav' | 'footer'

type LinkProps = {
  variant: LinkVariant
  href: string
  children: ReactNode
}

const variantClasses: Record<LinkVariant, string> = {
  default: 'text-brand-purple hover:text-brand-purple-dark underline text-[15px] transition-colors',
  nav: 'text-white/80 hover:text-white text-[15px] font-medium transition-colors',
  footer: 'text-neutral-500 hover:text-neutral-900 text-sm transition-colors',
}

export function Link({ variant, href, children }: LinkProps) {
  return (
    <NextLink href={href} className={variantClasses[variant]}>
      {children}
    </NextLink>
  )
}
