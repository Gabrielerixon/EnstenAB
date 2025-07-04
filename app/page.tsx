'use client'

import { Hero } from '@/components/hero/Hero'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Cpu, Sun } from 'lucide-react'
import TestimonialsSection from '@/components/sections/TestimonialsSection' 
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  
  // Detect mobile for performance optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // MOBILE-OPTIMIZED: Simple fade animations instead of slide-ins
  const fadeOnlyAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  }

  const desktopSlideAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8 }
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Advanced Technology Section */}
      <section className="relative py-24 bg-gradient-to-b from-solar-carbon to-solar-slate overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute top-0 left-0 w-full h-px bg-solar-gradient" />
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            {...(isMobile ? fadeOnlyAnimation : desktopSlideAnimation)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-racing font-bold text-white mb-6">
              PRECISION <span className="text-gradient">ENGINEERING</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-tech">
              Our control systems represent the pinnacle of solar racing technology, 
              engineered for teams that demand absolute performance and reliability.
            </p>
            <div className="mt-8 h-px w-64 bg-solar-gradient mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "Real-Time Processing",
                stat: "1000Hz",
                description: "Lightning-fast data processing ensures instantaneous response to changing race conditions.",
                color: "solar-electric"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Military-Grade Protection", 
                stat: "IP67",
                description: "Engineered to withstand the harshest racing environments with complete dust and water protection.",
                color: "solar-gold"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Energy Optimization",
                stat: "98.5%",
                description: "Maximum efficiency power management systems that squeeze every watt from your solar array.",
                color: "solar-racing"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="h-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 hover:border-white/40 transition-all duration-300 card-hover">
                  {/* Feature Icon */}
                  <div className={`inline-flex p-3 rounded-lg bg-${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Stat Display */}
                  <div className="mb-4">
                    <div className={`text-3xl font-racing font-bold text-${feature.color} mb-2`}>
                      {feature.stat}
                    </div>
                    <h3 className="text-xl font-semibold text-white font-racing">
                      {feature.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/70 font-tech leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className="flex items-center text-solar-electric hover:text-solar-gold transition-colors cursor-pointer group-hover:translate-x-2 transition-transform">
                    <Link href="/products">
                    <span className="font-tech font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BWSC Challenge Section - STATIC ROUTE */}
      <section className="relative py-24 bg-gradient-to-r from-solar-slate via-solar-carbon to-solar-slate">
        <div className="absolute inset-0 solar-pattern opacity-10" />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text content - Mobile optimized animations */}
            <motion.div
              initial={{ opacity: 0, ...(isMobile ? {} : { x: -50 }) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <Sun className="w-6 h-6 text-solar-gold mr-3" />
                <span className="text-solar-gold font-tech font-semibold tracking-wider uppercase">
                  Bridgestone World Solar Challenge
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-racing font-bold text-white mb-6">
                CONQUER THE
                <span className="block text-gradient">OUTBACK</span>
              </h2>
              
              <p className="text-xl text-white/80 mb-8 font-tech leading-relaxed">
                3,000 kilometers of unforgiving Australian terrain. Only the most advanced 
                control systems survive the ultimate solar racing challenge. Our technology 
                has powered championship teams to victory.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Real-time telemetry and race strategy optimization",
                  "Predictive weather-based power management",
                  "Advanced battery and motor control algorithms"
                ].map((point, i) => (
                  <div key={i} className="flex items-center text-white/90 font-tech">
                    <div className="w-2 h-2 bg-solar-electric rounded-full mr-3" />
                    {point}
                  </div>
                ))}
              </div>
              <Link href="/products">
              <button className="btn-primary px-8 py-4 rounded-lg font-semibold">
                Explore BWSC Solutions
              </button>
              </Link>
            </motion.div>

            {/* STATIC BWSC Route - NO ANIMATION */}
            <motion.div
              initial={{ opacity: 0, ...(isMobile ? {} : { x: 50 }) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
                <div className="aspect-video bg-gradient-to-br from-solar-carbon to-solar-slate rounded-lg overflow-hidden relative">
                  
                  {/* STATIC ROUTE - Final state without animations */}
                  <div className="w-full h-full">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgb(0, 212, 255)" />
                          <stop offset="25%" stopColor="rgb(0, 255, 170)" />
                          <stop offset="50%" stopColor="rgb(255, 184, 0)" />
                          <stop offset="75%" stopColor="rgb(255, 120, 0)" />
                          <stop offset="100%" stopColor="rgb(255, 0, 64)" />
                        </linearGradient>
                        
                        <filter id="electricGlow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        
                        <pattern id="cleanGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(0, 212, 255, 0.12)" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      
                      <rect width="400" height="200" fill="url(#cleanGrid)" />
                      
                      {/* STATIC route - fully drawn, no animation */}
                      <path
                        d="M 50 50 C 100 30, 150 20, 200 80 C 250 140, 300 160, 350 130"
                        stroke="url(#routeGradient)"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="12,6"
                        strokeLinecap="round"
                        filter="url(#electricGlow)"
                      />
                      
                      {/* Static waypoints */}
                      <circle cx="120" cy="35" r="3" fill="rgb(255, 184, 0)" />
                      <circle cx="200" cy="80" r="3" fill="rgb(255, 184, 0)" />
                      <circle cx="280" cy="140" r="3" fill="rgb(255, 184, 0)" />
                      
                      {/* Darwin marker */}
                      <g>
                        <circle cx="50" cy="50" r="8" fill="rgb(0, 212, 255)" filter="url(#electricGlow)" />
                        <circle cx="50" cy="50" r="4" fill="white" />
                        <text x="50" y="32" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Orbitron">Darwin</text>
                      </g>
                      
                      {/* Adelaide marker */}
                      <g>
                        <circle cx="350" cy="130" r="8" fill="rgb(255, 0, 64)" />
                        <circle cx="350" cy="130" r="4" fill="white" />
                        <text x="350" y="150" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Orbitron">Adelaide</text>
                      </g>
                      
                      {/* Distance display */}
                      <g>
                        <rect 
                          x="75" y="95" width="110" height="50" rx="12" 
                          fill="rgba(13, 17, 23, 0.95)" stroke="rgba(255, 184, 0, 0.4)" strokeWidth="1.5"
                        />
                        <text x="130" y="117" textAnchor="middle" fill="rgb(255, 184, 0)" fontSize="18" fontWeight="bold" fontFamily="Orbitron">3,000km</text>
                        <text x="130" y="135" textAnchor="middle" fill="rgba(255, 255, 255, 0.9)" fontSize="11" fontFamily="Inter">Race Distance</text>
                      </g>
                      
                      {/* NO MOVING CAR - removed as requested */}
                    </svg>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: "Teams", value: "40+" },
                    { label: "Countries", value: "20+" },
                    { label: "Days", value: "7" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xl font-racing font-bold text-solar-electric">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/60 font-tech">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="relative py-24 bg-gradient-to-b from-solar-carbon to-solar-slate">
        <div className="absolute inset-0 tech-grid opacity-20" />
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            {...(isMobile ? fadeOnlyAnimation : desktopSlideAnimation)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-racing font-bold text-white mb-6">
              RACE-WINNING <span className="text-gradient">PRODUCTS</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-tech">
              Engineered for champions. Tested in the world&apos;s most demanding solar racing conditions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Current One",
                category: "Control Unit",
                features: ["1000Hz Processing", "CAN Bus Integration", "Real-time Telemetry", "BWSC 2025 Ready"],
                price: "Launching Early 2025",
                highlight: "Flagship Product"
              },
              {
                name: "Solar Panel",
                category: "Energy Optimization",
                features: ["Solar Array Control", "Battery Management", "Efficiency Monitoring", "Weather Adaptive"],
                price: "Integrated Solution",
                highlight: "Smart Control"
              },
              {
                name: "Telemetry System",
                category: "Data & Analytics",
                features: ["Live Race Data", "Performance Analytics", "Remote Monitoring", "Strategy Optimization"],
                price: "Complete Package",
                highlight: "Race Intelligence"
              }
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="h-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300 card-hover">
                  {/* Product Badge */}
                  <div className="absolute top-4 right-4 bg-solar-racing text-white px-3 py-1 rounded-full text-xs font-tech font-semibold">
                    {product.highlight}
                  </div>
                  
                  {/* Product Image */}
                  <div className="h-48 bg-gradient-to-br from-solar-electric/10 to-solar-gold/10 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={
                        product.name === "Current One" 
                          ? "/images/products/current-one/currentOne.png"
                          : product.name === "Solar Panel"
                          ? "/images/products/solar-panel/Solpanel/solarmodule.jpg"
                          : "/images/products/cansuba/cansuba.png"
                      }
                      alt={product.name}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-24 h-24 bg-solar-gradient rounded-lg flex items-center justify-center">
                              <span class="text-white font-racing font-bold text-lg">
                                ${product.name.substring(0, 2)}
                              </span>
                            </div>
                          `;
                        }
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-racing font-bold text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-solar-electric font-tech text-sm">
                        {product.category}
                      </p>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-white/80 font-tech text-sm">
                          <div className="w-1.5 h-1.5 bg-solar-gold rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-solar-gold font-tech font-semibold">
                        {product.price}
                      </span>
                      <Link href="/products">
                      <button className="text-solar-electric hover:text-solar-gold transition-colors font-tech font-medium">
                        Learn More →
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add testimonials here  */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-solar-electric via-solar-gold to-solar-racing">
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            {...(isMobile ? fadeOnlyAnimation : desktopSlideAnimation)}
          >
            <h2 className="text-4xl md:text-5xl font-racing font-bold text-white mb-6">
              READY TO DOMINATE THE RACE?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-tech">
              Join the elite teams that trust Ensten technology to power their solar racing success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
              <button className="bg-white text-solar-carbon px-8 py-4 rounded-lg font-racing font-semibold hover:scale-105 transition-transform">
                Contact Our Engineers
              </button>
              </Link>
              <Link href="/products">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-racing font-semibold hover:bg-white hover:text-black transition-colors">
                Download Specifications
              </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}