import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost-dark' | 'ghost-light'
type ButtonSize = 'default' | 'large'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  variant: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-purple text-white hover:bg-brand-purple-dark hover:shadow-[0_8px_24px_rgba(161,0,255,0.25)] transition-all',
  'ghost-dark':
    'bg-transparent text-white border-[1.5px] border-white/70 hover:bg-white/10 transition-colors',
  'ghost-light':
    'bg-transparent text-brand-purple border-[1.5px] border-brand-purple hover:bg-surface-tint transition-colors',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-11 px-6 text-sm font-semibold',
  large: 'h-[52px] px-8 text-base font-semibold',
}

export function Button({
  variant,
  size = 'default',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
