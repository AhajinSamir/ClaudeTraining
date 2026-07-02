import { ReactNode } from 'react'

type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'purple' | 'info'

type BadgeProps = {
  variant: BadgeVariant
  dot?: boolean
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'text-success-text bg-success-bg',
  warning: 'text-warning-text bg-warning-bg',
  error: 'text-error-text bg-error-bg',
  neutral: 'text-neutral-badge-text bg-neutral-badge-bg',
  purple: 'text-brand-deep-purple bg-brand-purple-tint',
  info: 'text-info-text bg-info-bg',
}

const dotColorClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-text',
  warning: 'bg-warning-text',
  error: 'bg-error-text',
  neutral: 'bg-neutral-badge-text',
  purple: 'bg-brand-deep-purple',
  info: 'bg-info-text',
}

export function Badge({ variant, dot = false, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full py-1 px-3 text-[12px] font-semibold ${variantClasses[variant]}`}
    >
      {dot && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotColorClasses[variant]}`} />
      )}
      {children}
    </span>
  )
}
