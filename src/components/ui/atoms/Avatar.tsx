type AvatarSize = 'sm' | 'md'

type AvatarProps = {
  initials: string
  size?: AvatarSize
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
}

export function Avatar({ initials, size = 'md' }: AvatarProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-brand-deep-purple font-semibold text-white ${sizeClasses[size]}`}
    >
      {initials.slice(0, 2).toUpperCase()}
    </span>
  )
}
