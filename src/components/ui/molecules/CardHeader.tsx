import { ReactNode } from 'react'

type CardHeaderProps = {
  label: string
  action?: ReactNode
}

export function CardHeader({ label, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-neutral-900">{label}</span>
      {action && <div className="text-sm text-brand-purple">{action}</div>}
    </div>
  )
}
