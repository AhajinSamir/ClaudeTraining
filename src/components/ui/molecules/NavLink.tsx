import NextLink from 'next/link'

type NavLinkProps = {
  href: string
  label: string
  active?: boolean
}

export function NavLink({ href, label, active = false }: NavLinkProps) {
  return (
    <NextLink
      href={href}
      className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
        active
          ? 'text-white bg-white/10'
          : 'text-white/85 hover:text-white hover:bg-white/10'
      }`}
    >
      {label}
    </NextLink>
  )
}
