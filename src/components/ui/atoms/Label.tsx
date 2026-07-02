import { ReactNode } from 'react'

type LabelProps = {
  htmlFor: string
  children: ReactNode
}

export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-[15px] font-medium text-neutral-900">
      {children}
    </label>
  )
}
