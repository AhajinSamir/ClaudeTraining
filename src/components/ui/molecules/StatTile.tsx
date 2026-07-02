type StatTileBackground = 'white' | 'surface-tint'

type StatTileProps = {
  label: string
  value: string
  background?: StatTileBackground
}

const backgroundClasses: Record<StatTileBackground, string> = {
  white: 'bg-white',
  'surface-tint': 'bg-surface-tint',
}

export function StatTile({ label, value, background = 'white' }: StatTileProps) {
  return (
    <div
      className={`flex flex-col gap-1 rounded-xl border border-border-neutral p-6 ${backgroundClasses[background]}`}
    >
      <span className="text-[28px] font-bold text-neutral-900">{value}</span>
      <span className="text-[13px] text-neutral-500">{label}</span>
    </div>
  )
}
