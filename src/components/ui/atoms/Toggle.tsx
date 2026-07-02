'use client'

import { ReactNode } from 'react'

type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  'aria-label': string
  children?: ReactNode
}

export function Toggle({ checked, onChange, 'aria-label': ariaLabel, children }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
    >
      {children ?? <span className="sr-only">{ariaLabel}</span>}
    </button>
  )
}
