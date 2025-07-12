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
          {/* Logo - UPPDATERAD med ny styling */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="hidden sm:block">
              {/* ÄNDRAD: Nu med "ensten" i lowercase och biome w04 italic stil */}
              <div className="text-4xl font-bold text-white group-hover:text-solar-electric transition-colors" style={{ fontFamily: 'italic', fontStyle: 'italic' }}>
                ensten
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - CONTACT US-KNAPPEN BORTTAGEN */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
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
            
            {/* CONTACT US-KNAPPEN BORTTAGEN */}
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

        {/* Mobile Menu - CONTACT US BORTTAGEN ÄVEN HÄR */}
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
                  
                  {/* CONTACT US-KNAPPEN BORTTAGEN FRÅN MOBILE OCKSÅ */}
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