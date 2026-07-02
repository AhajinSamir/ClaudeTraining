'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'
import { FormField } from '@/components/ui/molecules/FormField'
import { Button } from '@/components/ui/atoms/Button'
import { Label } from '@/components/ui/atoms/Label'
import { Input } from '@/components/ui/atoms/Input'
import { Icon } from '@/components/ui/atoms/Icon'
import { Toggle } from '@/components/ui/atoms/Toggle'
import Link from 'next/link'

const CHECK_BULLETS = ['View real-time usage', 'Manage your plan', 'Pay your bill']

export function LoginPanel() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | undefined>(undefined)
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    setEmailError(undefined)
    setPasswordError(undefined)

    const data = new FormData(e.currentTarget)
    const email = (data.get('email') as string).trim()
    const password = data.get('password') as string

    let invalid = false
    if (!email) {
      setEmailError('Email address is required.')
      invalid = true
    }
    if (!password) {
      setPasswordError('Password is required.')
      invalid = true
    }
    if (invalid) return

    setIsLoading(true)
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) {
        setFormError('Invalid email or password. Please try again.')
      } else {
        router.push('/dashboard')
      }
    } catch {
      setFormError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen min-h-[600px] overflow-hidden">

      {/* ── Left panel ───────────────────────────────────────── */}
      <div className="relative flex w-[45%] flex-shrink-0 flex-col overflow-hidden bg-brand-deep-purple">

        {/* Wordmark */}
        <div className="relative z-10 flex-shrink-0 px-9 py-8">
          <Link href="/" className="text-[20px] font-bold tracking-[-0.02em] text-white">
            Telco<span className="text-brand-purple-tint">Now</span>
          </Link>
        </div>

        {/* Centre content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center gap-8 px-12 pb-20">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-brand-purple-tint/70">
              Your account
            </p>
            <h2 className="text-[28px] font-semibold leading-[1.3] tracking-[-0.01em] text-white">
              Your account.<br />
              Your data.<br />
              Always in control.
            </h2>
          </div>

          <ul className="flex flex-col gap-4">
            {CHECK_BULLETS.map((label) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border border-brand-purple/60 bg-brand-purple/35">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="#E5CCFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[15px] leading-[1.5] text-white/90">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative SVG — bottom bleed */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0">
          <svg width="100%" viewBox="0 0 540 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="60" cy="320" r="120" stroke="rgba(161,0,255,0.2)" strokeWidth="1" fill="none" />
            <circle cx="60" cy="320" r="180" stroke="rgba(161,0,255,0.14)" strokeWidth="1" fill="none" />
            <circle cx="60" cy="320" r="240" stroke="rgba(161,0,255,0.09)" strokeWidth="1" fill="none" />
            <circle cx="60" cy="320" r="300" stroke="rgba(161,0,255,0.06)" strokeWidth="1" fill="none" />
            <circle cx="460" cy="300" r="80" stroke="rgba(229,204,255,0.08)" strokeWidth="1" fill="none" />
            <circle cx="460" cy="300" r="50" stroke="rgba(229,204,255,0.12)" strokeWidth="1" fill="none" />
            <g stroke="rgba(161,0,255,0.22)" strokeWidth="0.8" fill="none">
              <polygon points="300,200 326,215 326,245 300,260 274,245 274,215" />
              <polygon points="326,215 352,230 352,260 326,275 300,260 300,230" />
              <polygon points="274,215 300,230 300,260 274,275 248,260 248,230" />
              <polygon points="352,260 378,275 378,305 352,320 326,305 326,275" />
              <polygon points="300,260 326,275 326,305 300,320 274,305 274,275" />
              <polygon points="248,260 274,275 274,305 248,320 222,305 222,275" />
            </g>
            <path d="M 480 0 Q 480 80 400 120" stroke="rgba(161,0,255,0.3)" strokeWidth="1.5" fill="none" />
            <path d="M 540 0 Q 540 120 430 170" stroke="rgba(161,0,255,0.2)" strokeWidth="1.2" fill="none" />
            <path d="M 540 40 Q 520 140 450 195" stroke="rgba(161,0,255,0.15)" strokeWidth="1" fill="none" />
            <circle cx="400" cy="120" r="4" fill="#A100FF" opacity="0.7" />
            <circle cx="430" cy="170" r="3" fill="#7500C0" opacity="0.5" />
            <circle cx="352" cy="215" r="3" fill="#E5CCFF" opacity="0.4" />
            <circle cx="300" cy="200" r="4" fill="#A100FF" opacity="0.5" />
            <rect x="0" y="200" width="540" height="120" fill="url(#loginBottomFade)" />
            <defs>
              <linearGradient id="loginBottomFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#460073" stopOpacity="0" />
                <stop offset="100%" stopColor="#460073" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* ── Right panel ──────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center bg-white p-12">
        <div className="w-full max-w-[400px]">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="mb-2 text-[32px] font-bold tracking-[-0.02em] text-neutral-900">
              Welcome back.
            </h1>
            <p className="text-[15px] leading-[1.5] text-neutral-500">
              Sign in to your TelcoNow account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <fieldset disabled={isLoading} className="flex flex-col gap-5 border-0 p-0 m-0 min-w-0">

              {/* Email */}
              <FormField id="email" label="Email address" type="email" error={emailError} />

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-[13px] font-medium text-brand-purple transition-colors hover:text-brand-purple-dark hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={passwordError}
                  suffix={
                    <Toggle
                      checked={showPassword}
                      onChange={setShowPassword}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon name={showPassword ? EyeOff : Eye} size={18} />
                    </Toggle>
                  }
                />
              </div>

              {/* Form-level error */}
              {formError && (
                <p role="alert" className="text-sm text-error-text">
                  {formError}
                </p>
              )}

              {/* Submit */}
              <div className="mt-1">
                <Button type="submit" variant="primary" fullWidth>
                  {isLoading ? 'Signing in…' : 'Sign in'}
                </Button>
              </div>

            </fieldset>
          </form>

          {/* Sign-up link */}
          <p className="mt-8 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              className="font-semibold text-brand-purple transition-colors hover:text-brand-purple-dark"
            >
              Get started →
            </a>
          </p>

        </div>
      </div>

    </div>
  )
}
