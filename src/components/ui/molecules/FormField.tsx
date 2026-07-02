'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Label } from '@/components/ui/atoms/Label'
import { Input } from '@/components/ui/atoms/Input'
import { Toggle } from '@/components/ui/atoms/Toggle'
import { Icon } from '@/components/ui/atoms/Icon'

type FormFieldProps = {
  id: string
  label: string
  type: 'text' | 'email' | 'password'
  error?: string
}

export function FormField({ id, label, type, error }: FormFieldProps) {
  const [visible, setVisible] = useState(false)

  const resolvedType = type === 'password' && visible ? 'text' : type

  const suffix =
    type === 'password' ? (
      <Toggle
        checked={visible}
        onChange={setVisible}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        <Icon name={visible ? EyeOff : Eye} size={18} />
      </Toggle>
    ) : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={resolvedType}
        error={error}
        suffix={suffix}
      />
    </div>
  )
}
