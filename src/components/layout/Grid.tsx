import { ReactNode } from 'react'

type GridCols = 1 | 2 | 3 | 4
type GridGap = 'sm' | 'md' | 'lg'

type GridProps = {
  children: ReactNode
  cols?: GridCols
  gap?: GridGap
}

const colsClasses: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

const gapClasses: Record<GridGap, string> = {
  sm: 'gap-5',
  md: 'gap-6',
  lg: 'gap-8',
}

export function Grid({ children, cols = 3, gap = 'md' }: GridProps) {
  return (
    <div className={`grid ${colsClasses[cols]} ${gapClasses[gap]}`}>
      {children}
    </div>
  )
}
