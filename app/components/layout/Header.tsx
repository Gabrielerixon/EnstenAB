'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { NAVIGATION_ITEMS } from '@/lib/constants'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-solar-carbon/90 backdrop-blur-md border-b border-white/10 shadow-lg" 
        : "bg-transparent"
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-solar-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              {/* Energy pulse effect */}
              <div className="absolute inset-0 bg-solar-electric/20 rounded-lg animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-racing font-bold text-white group-hover:text-solar-electric transition-colors">
                ENSTEN AB
              </div>
              <div className="text-xs text-white/60 font-tech tracking-wider -mt-1">
                RACING TECHNOLOGY
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group py-2"
              >
                <span className="text-white/90 hover:text-white font-tech font-medium tracking-wide transition-colors">
                  {item.label}
                </span>
                {/* Hover underline effect */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-solar-gradient group-hover:w-full transition-all duration-300" />
                
                {/* Tech accent */}
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-solar-electric rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            
            {/* CTA Button - Fixed with proper navigation */}
            <Link href="/contact">
              <button className="btn-primary px-6 py-3 rounded-lg font-tech font-semibold tracking-wide ml-4">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-solar-electric transition-colors"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 bg-solar-carbon/95 backdrop-blur-md border-t border-white/10">
                <div className="space-y-4">
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        href={item.href}
                        className="block py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center text-white/90 hover:text-white transition-colors font-tech font-medium">
                          <div className="w-1 h-1 bg-solar-electric rounded-full mr-3 opacity-60" />
                          {item.label}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: NAVIGATION_ITEMS.length * 0.1 }}
                    className="pt-4 border-t border-white/10"
                  >
                    <Link href="/contact">
                      <button 
                        className="btn-primary w-full py-3 rounded-lg font-tech font-semibold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact Us
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Progress Bar - shows scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-solar-gradient origin-left"
        style={{
          scaleX: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </header>
  )
}