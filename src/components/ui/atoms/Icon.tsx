import type { LucideIcon } from 'lucide-react'

type IconProps = {
  name: LucideIcon
  size?: number
  color?: string
}

export function Icon({ name: IconComponent, size = 16, color }: IconProps) {
  return <IconComponent size={size} color={color} aria-hidden="true" />
}
