// utils/mobile-animations.ts
// Utility functions for mobile-optimized animations

import { useState, useEffect } from 'react'

/**
 * Hook to detect mobile devices for animation optimization
 */
export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

/**
 * Animation configurations optimized for performance
 */
export const animationConfigs = {
  // Mobile: Simple fade only
  mobileOptimized: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  },
  
  // Desktop: Full slide animation
  desktopSlide: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8 }
  },
  
  // Light animation for both
  universalFade: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  }
}

/**
 * Get appropriate animation config based on device
 */
export function getAnimationConfig(isMobile: boolean, type: 'slide' | 'fade' = 'slide') {
  if (type === 'fade') {
    return animationConfigs.universalFade
  }
  
  return isMobile ? animationConfigs.mobileOptimized : animationConfigs.desktopSlide
}

/**
 * Performance-conscious animation props
 */
export function getMobileAnimationProps(isMobile: boolean) {
  return {
    // Remove expensive transforms on mobile
    slideX: isMobile ? {} : { x: 50 },
    slideY: isMobile ? { y: 20 } : { y: 50 },
    
    // Shorter durations on mobile
    duration: isMobile ? 0.4 : 0.8,
    
    // Less stagger on mobile
    stagger: isMobile ? 0.05 : 0.1
  }
}

/**
 * Example usage in components:
 * 
 * const isMobile = useMobileDetection()
 * const animProps = getAnimationConfig(isMobile, 'slide')
 * 
 * <motion.div {...animProps}>
 *   Content here
 * </motion.div>
 */