type ProgressBarProps = {
  percent: number
  showThreshold?: boolean
}

export function ProgressBar({ percent, showThreshold = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  const isWarning = showThreshold && clamped >= 75

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-badge-bg">
      <div
        className={`h-full rounded-full transition-all ${isWarning ? 'bg-warning' : 'bg-brand-purple'}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
