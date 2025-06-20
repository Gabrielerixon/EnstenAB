'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronDown, ChevronUp, Award, Trophy } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 'ju-solar',
    quote: "Current One was a game-changer for our 2025 solar car—reliable, easy to use, and let us focus on key systems. Ensten's support made integration smooth and tailored for the World Solar Challenge.",
    fullQuote: "Integrating the Current One control unit into our 2025 solar car project has been a game-changer. Its cutting-edge technology, combined with reliability and ease of use, has significantly reduced the time we need to spend managing core electrical functions. As a result, we've been able to focus more on developing other critical systems such as aerodynamics, telemetry, and energy optimization. By handling essential control tasks with precision and stability, Current One has streamlined our workflow and enhanced overall system efficiency. It's a valuable addition to any team preparing for the Bridgestone World Solar Challenge. We also want to highlight Ensten's role in our success. Their professional service and support have ensured that the software is always up to date and tailored to our specific needs. Their responsiveness and adaptability have made the integration process smooth and efficient—making the system an excellent fit for our solar car.",
    author: "Christopher Eriksson",
    title: "Electrical Team Lead",
    company: "JU Solar Team",
    university: "Jönköping University",
    achievement: "7th Place Globally - BWSC 2023",
    logo: "/images/logos/ju-logo.svg",
    date: "2025-05-09"
  },
  {
    id: 'hust',
    quote: "ENSTEN har bidragit med god expertis och ett proffsigt bemötande. Alltid varit snabba med hjälp när det uppstått frågor.",
    fullQuote: "ENSTEN har bidragit med god expertis och ett proffsigt bemötande. Alltid varit snabba med hjälp när det uppstått frågor.",
    author: "Oscar Pålsson",
    title: "Head of Electrical",
    company: "HUST",
    university: "Halmstad University Solar Team",
    achievement: "BWSC 2025 Competitor",
    logo: "/images/logos/hust-logo.svg",
    date: "2025-05-12"
  }
]

export default function TestimonialsSection() {
  const [expandedTestimonial, setExpandedTestimonial] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedTestimonial(expandedTestimonial === id ? null : id)
  }

  return (
    <section className="relative py-24 bg-gradient-to-br from-solar-slate to-solar-carbon overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-solar-gradient" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-solar-electric/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-solar-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Trophy className="w-6 h-6 text-solar-gold mr-3" />
            <span className="text-solar-gold font-tech font-semibold tracking-wider uppercase">
              Championship Teams
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-racing font-bold text-white mb-6">
            PROVEN IN <span className="text-gradient">COMPETITION</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-tech">
            Trusted by elite university teams competing at the highest levels of solar racing
          </p>
          <div className="mt-8 h-px w-64 bg-solar-gradient mx-auto" />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="h-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 hover:border-white/40 transition-all duration-300 card-hover">
                
                {/* Achievement Badge */}
                <div className="absolute top-4 right-4 bg-solar-racing text-white px-3 py-1 rounded-full text-xs font-tech font-semibold flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  {testimonial.achievement}
                </div>

                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-solar-electric" />
                </div>

                {/* Quote Text */}
                <div className="mb-6">
                  <blockquote className="text-white/90 font-tech text-lg leading-relaxed mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  
                  {/* Read More/Less Button */}
                  {testimonial.fullQuote !== testimonial.quote && (
                    <button
                      onClick={() => toggleExpanded(testimonial.id)}
                      className="text-solar-electric hover:text-solar-gold transition-colors font-tech text-sm flex items-center group-hover:scale-105 transition-transform"
                    >
                      {expandedTestimonial === testimonial.id ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <span>Read Full Review</span>
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Expanded Quote */}
                <AnimatePresence>
                  {expandedTestimonial === testimonial.id && testimonial.fullQuote !== testimonial.quote && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/20 pt-4 mb-6">
                        <blockquote className="text-white/80 font-tech leading-relaxed">
                          &ldquo;{testimonial.fullQuote}&rdquo;
                        </blockquote>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Author Info */}
                <div className="flex items-center">
                  {/* Clickable Logo Images */}
                  <a 
                    href={testimonial.company === 'JU Solar Team' ? 'https://www.jusolarteam.se/' : 'https://husolarteam.com/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 hover:scale-105 transition-transform overflow-hidden cursor-pointer relative"
                  >
                    <Image
                      src={testimonial.company === 'JU Solar Team' ? '/images/logos/JU.avif' : '/images/logos/HUST.png'}
                      alt={`${testimonial.company} logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <span class="text-solar-carbon font-racing font-bold text-sm">
                              ${testimonial.company === 'JU Solar Team' ? 'JU' : 'HUST'}
                            </span>
                          `;
                        }
                      }}
                    />
                  </a>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="font-tech font-semibold text-white">
                        {testimonial.author}
                      </span>
                      {/* Swedish Flag CSS */}
                      <div className="ml-2 w-6 h-4 relative overflow-hidden rounded-sm border border-white/20 flex-shrink-0">
                        <div className="absolute inset-0 bg-blue-500"></div>
                        <div className="absolute top-0 left-2 w-1 h-full bg-yellow-400"></div>
                        <div className="absolute top-1.5 left-0 w-full h-1 bg-yellow-400"></div>
                      </div>
                    </div>
                    <div className="text-solar-electric font-tech text-sm">
                      {testimonial.title}
                    </div>
                    <div className="text-white/60 font-tech text-sm">
                      <a 
                        href={testimonial.company === 'JU Solar Team' ? 'https://www.jusolarteam.se/' : 'https://husolarteam.com/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-solar-electric transition-colors cursor-pointer"
                      >
                        {testimonial.company}
                      </a>
                      {' • '}
                      {testimonial.university}
                    </div>
                  </div>
                </div>

                {/* Tech accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-solar-gradient group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60 font-tech text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-solar-electric rounded-full mr-3" />
              <span>Official BWSC 2025 Participants</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-solar-gold rounded-full mr-3" />
              <span>Swedish University Champions</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-solar-racing rounded-full mr-3" />
              <span>Active Sponsorship Partners</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}