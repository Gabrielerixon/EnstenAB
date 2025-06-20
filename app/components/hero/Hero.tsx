'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CurrentOne3DShowcase } from '@/components/3d/CurrentOne3DShowcase'
import Link from 'next/link'

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      {/* Dynamic Energy Lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-solar-electric to-transparent"
            style={{
              top: `${20 + i * 10}%`,
              width: '100%',
              transform: `translateX(${mousePosition.x * 20 - 10}px)`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Solar Burst Effect */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-solar-burst opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-32 pb-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          
          {/* Main Heading with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-racing font-black text-white mb-4">
              <span className="block">ENSTEN AB</span>
              <span className="block text-gradient text-3xl md:text-4xl lg:text-5xl xl:text-6xl">RACING TECHNOLOGY</span>
            </h1>
            <div className="h-1 w-32 bg-solar-gradient mx-auto mb-8 rounded-full" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 mb-12 max-w-4xl mx-auto font-tech"
          >
            Control Your
            <span className="text-solar-electric font-semibold"> Solar-Powered Car</span>
            <br className="hidden md:block" />
            <span className="text-solar-gold">for Championship Performance</span>
          </motion.p>

          {/* --- MODIFICATION START --- */}
          {/* Interactive 3D Model Container - Simplified to allow child to control size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mx-auto mb-16 w-full" // REMOVED: max-w-[...] h-[...] classes
          >
            <CurrentOne3DShowcase />
          {/* --- MODIFICATION END --- */}

            {/* Performance Indicators - made more responsive */}
            <div className="absolute -right-1 md:-right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-20">
              <div className="space-y-2">
                <div className="text-right text-xs text-white/60">PERFORMANCE</div>
                <div className="w-12 md:w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-solar-electric"
                    initial={{ width: 0 }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </div>
                <div className="w-12 md:w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-solar-gold"
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 2, delay: 1.2 }}
                  />
                </div>
                <div className="w-12 md:w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-solar-racing"
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 2, delay: 1.4 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/products">
            <button className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform">
              Explore Products
            </button>
            </Link>
            <Link href="/products/current-one">
            <button className="btn-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform">
              View Specifications
            </button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto mb-24"
          >
            {[
              { value: "1000Hz", label: "Processing Rate" },
              { value: "IP67", label: "Protection Rating" },
              { value: "3000km", label: "BWSC Distance" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-racing font-bold text-solar-electric mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 font-tech">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Fixed Centered Scroll Indicator - positioned in the breathing room */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-solar-electric rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <p className="text-xs text-white/60 mt-2 font-tech tracking-wider">SCROLL</p>
      </motion.div>
    </div>
  )
}