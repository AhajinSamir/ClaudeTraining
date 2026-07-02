import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { LoginPanel } from '@/components/LoginPanel'

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/dashboard')

  return <LoginPanel />
}
