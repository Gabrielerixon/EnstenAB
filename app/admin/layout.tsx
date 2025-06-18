// app/admin/layout.tsx
'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { Loading } from '@/components/common/Loading'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const pathname = usePathname()

  // Redirect unauthenticated users to login (except on login page)
  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [user, loading, router, pathname])

  // Show loading during authentication check
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <Loading size="lg" text="Checking authentication..." />
      </div>
    )
  }

  // If not authenticated and not on login page, don't render anything
  // (redirect will happen via useEffect)
  if (!user && pathname !== '/admin/login') {
    return null
  }

  return <>{children}</>
}