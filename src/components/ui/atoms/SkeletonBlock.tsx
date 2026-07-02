type SkeletonBlockProps = {
  width?: string
  height?: string
  rounded?: boolean
}

export function SkeletonBlock({ width, height = '1rem', rounded = false }: SkeletonBlockProps) {
  return (
    <div
      className={`animate-pulse bg-neutral-badge-bg ${rounded ? 'rounded-full' : 'rounded'}`}
      style={{ width: width ?? '100%', height }}
    />
  )
}
