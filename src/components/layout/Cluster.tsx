import { ReactNode } from 'react'

type ClusterGap = 'sm' | 'md' | 'lg'
type ClusterAlign = 'start' | 'center' | 'end'

type ClusterProps = {
  children: ReactNode
  gap?: ClusterGap
  align?: ClusterAlign
}

const gapClasses: Record<ClusterGap, string> = {
  sm: 'gap-3',
  md: 'gap-5',
  lg: 'gap-8',
}

const alignClasses: Record<ClusterAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
}

export function Cluster({ children, gap = 'md', align = 'center' }: ClusterProps) {
  return (
    <div className={`flex flex-wrap ${gapClasses[gap]} ${alignClasses[align]}`}>
      {children}
    </div>
  )
}
