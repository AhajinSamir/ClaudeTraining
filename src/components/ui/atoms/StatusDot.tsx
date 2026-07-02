type StatusDotColor = 'success' | 'warning' | 'error' | 'neutral'

type StatusDotProps = {
  color: StatusDotColor
}

const colorClasses: Record<StatusDotColor, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error-text',
  neutral: 'bg-neutral-500',
}

export function StatusDot({ color }: StatusDotProps) {
  return (
    <span className={`inline-block h-2 w-2 rounded-full ${colorClasses[color]}`} />
  )
}
