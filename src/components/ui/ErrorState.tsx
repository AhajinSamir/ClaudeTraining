'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/atoms/Button'

type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}: ErrorStateProps) {
  const router = useRouter()
  const handleRetry = onRetry ?? (() => router.refresh())

  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <p className="text-neutral-500">{message}</p>
      <Button variant="ghost-light" onClick={handleRetry}>
        Try again
      </Button>
    </div>
  )
}
