import { ReactNode } from 'react'

type TextVariant = 'body' | 'small' | 'caption'
type TextColor = 'default' | 'secondary' | 'white'

type TextProps = {
  variant: TextVariant
  color?: TextColor
  children: ReactNode
}

const variantClasses: Record<TextVariant, string> = {
  body: 'text-[15px] font-normal leading-relaxed',
  small: 'text-[13px] font-normal leading-normal',
  caption: 'text-xs font-normal leading-normal',
}

const colorClasses: Record<TextColor, string> = {
  default: 'text-neutral-900',
  secondary: 'text-neutral-500',
  white: 'text-white',
}

export function Text({ variant, color = 'default', children }: TextProps) {
  return (
    <p className={`${variantClasses[variant]} ${colorClasses[color]}`}>
      {children}
    </p>
  )
}
