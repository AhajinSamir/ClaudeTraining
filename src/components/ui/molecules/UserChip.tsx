import { Avatar } from '@/components/ui/atoms/Avatar'

type UserChipProps = {
  name: string
  planName: string
  initials: string
}

export function UserChip({ name, planName, initials }: UserChipProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar initials={initials} size="sm" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs text-white/60">{planName}</span>
      </div>
    </div>
  )
}
