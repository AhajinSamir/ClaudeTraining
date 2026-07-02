import { ReactNode } from 'react'

type StackGap = 'sm' | 'md' | 'lg'

type StackProps = {
  children: ReactNode
  gap?: StackGap
}

const gapClasses: Record<StackGap, string> = {
  sm: 'gap-3',
  md: 'gap-5',
  lg: 'gap-8',
}

export function Stack({ children, gap = 'md' }: StackProps) {
  return (
    <div className={`flex flex-col ${gapClasses[gap]}`}>
      {children}
    </div>
  )
}
