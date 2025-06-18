// components/layout/ConditionalFooter.tsx
'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './Footer'

export const ConditionalFooter = () => {
  const pathname = usePathname()
  
  // Don't show the main footer on admin routes
  const isAdminRoute = pathname?.startsWith('/admin')
  
  // Also hide on any other special routes where you don't want the footer
  const hideFooter = isAdminRoute
  
  if (hideFooter) {
    return null
  }
  
  return <Footer />
}