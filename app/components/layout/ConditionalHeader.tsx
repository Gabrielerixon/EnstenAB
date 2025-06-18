// components/layout/ConditionalHeader.tsx
'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'

export const ConditionalHeader = () => {
  const pathname = usePathname()
  
  // Don't show the main header on admin routes
  const isAdminRoute = pathname?.startsWith('/admin')
  
  // Also hide on any other special routes where you don't want the header
  const hideHeader = isAdminRoute
  
  if (hideHeader) {
    return null
  }
  
  return <Header />
}