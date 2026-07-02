type AnnouncementPillProps = {
  label: string
  variant?: 'light' | 'dark'
}

export function AnnouncementPill({ label, variant = 'light' }: AnnouncementPillProps) {
  if (variant === 'dark') {
    return (
      <span className="inline-flex items-center gap-2 w-fit rounded-full border border-brand-purple/40 bg-brand-purple/25 px-[14px] py-[5px]">
        <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-brand-purple shadow-[0_0_8px_#A100FF]" />
        <span className="text-brand-purple-tint text-xs font-medium tracking-[0.06em] uppercase">
          {label}
        </span>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full border border-brand-purple-tint bg-surface-tint px-4 py-1.5 text-sm font-medium text-brand-purple">
      {label}
    </span>
  )
}
