'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { LazyCurrentOne3DShowcase } from '@/components/3d/LazyCurrentOne3DShowcase'
import Link from 'next/link'

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon"
    >
      {/* Simplified Background Grid */}
      <div className="absolute inset-0 tech-grid opacity-30" />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-32 pb-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          
          {/* Main Heading with Animation - FIXED MOBILE TEXT HIERARCHY */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="font-racing font-black text-white mb-4">
              {/* ENSTEN AB - Always the dominant/larger text */}
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                ENSTEN AB
              </span>
              {/* RACING TECHNOLOGY - Always smaller than ENSTEN AB */}
              <span className="block text-gradient text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                RACING TECHNOLOGY
              </span>
            </h1>
            <div className="h-1 w-32 bg-solar-gradient mx-auto mb-8 rounded-full" />
          </motion.div>

          {/* Tagline - UPPDATERAD: Car -> Vehicles */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 mb-12 max-w-4xl mx-auto font-tech"
          >
            Control Your
            <span className="text-solar-electric font-semibold"> Solar-Powered Vehicles </span>
            <br className="hidden md:block" />
            <span className="text-solar-gold">for Championship Performance</span>
          </motion.p>

          {/* Lazy-Loading 3D Model Container */}
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative mx-auto mb-16 w-full"
          >
            {/* UPDATED: Using lazy-loading 3D showcase */}
            <LazyCurrentOne3DShowcase />

            {/* Performance Indicators */}
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

          {/* STATISTIKER BORTTAGNA - Tidigare 1000Hz, IP67, 3000km */}

          {/* NEW: Performance Achievement Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-16"
          >
            <div className="text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-green-600/20 to-solar-electric/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-400/30">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
                <span className="text-white font-tech text-sm">
                  Optimized for <span className="text-green-400 font-bold">95+ Performance Score</span> • 
                  Interactive 3D on demand
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simplified Scroll Indicator */}
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