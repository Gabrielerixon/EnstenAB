'use client'

import { Hero } from '@/components/hero/Hero'
import { motion } from 'framer-motion'
import { ArrowRight, Ship, Car } from 'lucide-react'
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
      

      {/* NY SEKTION: Solar Vehicles Showcase - Ersätter BWSC */}
      <section className="relative py-24 bg-gradient-to-r from-solar-slate via-solar-carbon to-solar-slate">
        <div className="absolute inset-0 solar-pattern opacity-10" />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, ...(isMobile ? {} : { x: -50 }) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <Car className="w-6 h-6 text-solar-gold mr-3" />
                <span className="text-solar-gold font-tech font-semibold tracking-wider uppercase">
                  Solar Vehicles
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-racing font-bold text-white mb-6">
                POWERING THE
                <span className="block text-gradient">FUTURE OF RACING</span>
              </h2>
              
              <p className="text-xl text-white/80 mb-8 font-tech leading-relaxed">
                From high-speed solar cars to innovative solar boats, our control systems 
                power the next generation of sustainable racing vehicles. Advanced technology 
                that drives innovation across multiple racing disciplines.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Advanced vehicle control systems for all solar racing types",
                  "Proven technology across cars, boats, and experimental vehicles", 
                  "Precision engineering for championship performance"
                ].map((point, i) => (
                  <div key={i} className="flex items-center text-white/90 font-tech">
                    <div className="w-2 h-2 bg-solar-electric rounded-full mr-3" />
                    {point}
                  </div>
                ))}
              </div>
              <Link href="/products">
              <button className="btn-primary px-8 py-4 rounded-lg font-semibold">
                Explore Our Technology
              </button>
              </Link>
            </motion.div>

            {/* Solar Vehicles Showcase */}
            <motion.div
              initial={{ opacity: 0, ...(isMobile ? {} : { x: 50 }) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
                <div className="grid grid-cols-2 gap-4">
                  {/* Solar Car */}
                  <div className="aspect-square bg-gradient-to-br from-solar-electric/20 to-solar-gold/20 rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="w-16 h-16 text-solar-electric" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white font-tech text-sm font-semibold">Solar Cars</p>
                    </div>
                  </div>
                  
                  {/* Solar Boat */}
                  <div className="aspect-square bg-gradient-to-br from-solar-gold/20 to-solar-racing/20 rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Ship className="w-16 h-16 text-solar-gold" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white font-tech text-sm font-semibold">Solar Boats</p>
                    </div>
                  </div>
                  
                  {/* Combined showcase */}
                  <div className="col-span-2 bg-gradient-to-r from-solar-racing/20 to-solar-electric/20 rounded-lg p-4">
                    <div className="text-center">
                      <h3 className="text-white font-racing font-bold mb-2">Universal Control Systems</h3>
                      <p className="text-white/80 font-tech text-sm">
                        One platform, multiple vehicle types. Our systems adapt to your racing needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Showcase - ÄNDRAD: RACE-WINNING -> RACE-PROVEN */}
      <section className="relative py-24 bg-gradient-to-b from-solar-carbon to-solar-slate">
        <div className="absolute inset-0 tech-grid opacity-20" />
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            {...(isMobile ? fadeOnlyAnimation : desktopSlideAnimation)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-racing font-bold text-white mb-6">
              RACE-PROVEN <span className="text-gradient">PRODUCTS</span>
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
                features: ["Real-time Processing", "CAN Bus Integration", "Data Logging", "Multi-Vehicle Ready"],
                price: "Launching Early 2025",
                highlight: "Flagship Product"
              },
              {
                name: "Solar Module",
                category: "Energy Optimization",
                features: ["Solar Array Control", "Battery Management", "Efficiency Monitoring", "Weather Adaptive"],
                price: "Integrated Solution",
                highlight: "Smart Control"
              },
              {
                name: "Cansuba Converter",
                category: "Communication",
                features: ["Multi-Protocol Support", "Real-time Data", "Easy Integration", "Compact Design"],
                price: "Complete Package",
                highlight: "Universal Interface"
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
                          : product.name === "Solar Module"
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

      {/* Testimonials - ÄNDRAT från "PROVEN IN COMPETITION" till "Trusted by Solar Teams" */}
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