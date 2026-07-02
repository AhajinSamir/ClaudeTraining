import { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> & {
  type: 'text' | 'email' | 'password'
  placeholder?: string
  error?: string
  suffix?: ReactNode
}

export function Input({ type, placeholder, error, suffix, id, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`h-11 w-full rounded-lg border px-4 text-[15px] text-neutral-900 placeholder:text-neutral-500 outline-none transition-shadow ${
          error
            ? 'border-error-text focus:ring-[3px] focus:ring-error-text/15'
            : 'border-border-neutral focus:ring-[3px] focus:ring-brand-purple/15'
        } ${suffix ? 'pr-11' : ''}`}
        {...props}
      />
      {suffix && (
        <div className="absolute right-3 flex items-center">
          {suffix}
        </div>
      )}
      {error && (
        <p className="absolute -bottom-5 left-0 text-xs text-error-text">{error}</p>
      )}
    </div>
  )
}
