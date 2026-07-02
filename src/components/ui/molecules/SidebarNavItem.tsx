import NextLink from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/atoms/Icon'

type SidebarNavItemProps = {
  href: string
  label: string
  icon: LucideIcon
  active?: boolean
}

export function SidebarNavItem({ href, label, icon, active = false }: SidebarNavItemProps) {
  return (
    <NextLink
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-white/15 text-white'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon name={icon} size={16} />
      {label}
    </NextLink>
  )
}
