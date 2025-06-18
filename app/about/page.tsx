'use client'

import { motion } from 'framer-motion'
import { Zap, Target, Users, Award, MapPin, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Animated Background */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-solar-electric mr-3" />
              <span className="text-solar-electric font-tech font-semibold tracking-wider uppercase">
                About Ensten AB
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-racing font-bold text-white mb-6">
              ENGINEERING THE
              <span className="block text-gradient">FUTURE OF RACING</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto font-tech leading-relaxed">
              Swedish innovation meets solar racing excellence. We develop cutting-edge control systems 
              that empower teams to achieve championship performance in the world's most demanding 
              solar racing competitions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8"
            >
              <div className="flex items-center mb-6">
                <Target className="w-6 h-6 text-solar-racing mr-3" />
                <h2 className="text-2xl font-racing font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-white/90 font-tech text-lg leading-relaxed">
                To accelerate the development of sustainable transportation by providing world-class 
                control systems for solar racing teams. We believe that today's student engineers 
                are tomorrow's automotive innovators.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8"
            >
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-solar-gold mr-3" />
                <h2 className="text-2xl font-racing font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-white/90 font-tech text-lg leading-relaxed">
                To be the global leader in solar racing technology, enabling every team to focus on 
                innovation rather than integration. We envision a future where sustainable racing 
                drives mainstream automotive advancement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="relative py-24 bg-gradient-to-r from-solar-slate via-solar-carbon to-solar-slate">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-racing font-bold text-white mb-6">
              DRIVING <span className="text-gradient">INNOVATION</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-tech">
              Founded in Sweden with a passion for sustainable racing technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "2025", label: "Founded", icon: Calendar },
              { number: "2+", label: "Championship Teams", icon: Award },
              { number: "100%", label: "Swedish Engineering", icon: MapPin },
              { number: "1000Hz", label: "Processing Power", icon: Zap },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-solar-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-racing font-bold text-solar-electric mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-tech">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-racing font-bold text-white mb-6">
              OUR <span className="text-gradient">VALUES</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-tech">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Precision Engineering",
                description: "Every component is designed and tested to aerospace standards. We believe that racing demands perfection, and our products deliver exactly that.",
                icon: "🔬"
              },
              {
                title: "Student-First Approach",
                description: "University teams are the heart of solar racing. We design solutions that work within student budgets while delivering professional-grade performance.",
                icon: "🎓"
              },
              {
                title: "Open Innovation",
                description: "We share knowledge and collaborate with teams to advance the entire solar racing ecosystem. Competition drives innovation for everyone.",
                icon: "🤝"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center hover:border-white/40 transition-all duration-300 card-hover"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-racing font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-white/80 font-tech leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Swedish Heritage */}
      <section className="relative py-24 bg-gradient-to-r from-solar-electric/10 via-solar-gold/10 to-solar-racing/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              key="heritage-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <div className="flex items-center mb-6">
                {/* Swedish Flag CSS */}
                <div className="mr-4 w-10 h-6 relative overflow-hidden rounded border border-white/20 flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-500"></div>
                  <div className="absolute top-0 left-3 w-1.5 h-full bg-yellow-400"></div>
                  <div className="absolute top-2 left-0 w-full h-1.5 bg-yellow-400"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-racing font-bold text-white">
                  Swedish Innovation Heritage
                </h2>
              </div>
              
              <p className="text-white/90 font-tech text-lg leading-relaxed mb-6">
                Based in Jönköping, Sweden, Ensten AB combines Nordic engineering excellence 
                with cutting-edge technology. We're proud to continue Sweden's tradition of 
                automotive innovation in the sustainable racing space.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-white/80 font-tech">
                  <div className="w-2 h-2 bg-solar-electric rounded-full mr-3" />
                  <span>Registered Swedish Aktiebolag (AB)</span>
                </div>
                <div className="flex items-center text-white/80 font-tech">
                  <div className="w-2 h-2 bg-solar-gold rounded-full mr-3" />
                  <span>Located in Sweden's Technology Corridor</span>
                </div>
                <div className="flex items-center text-white/80 font-tech">
                  <div className="w-2 h-2 bg-solar-racing rounded-full mr-3" />
                  <span>Supporting Scandinavian University Teams</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              key="heritage-info"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8"
            >
              <h3 className="text-xl font-racing font-bold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-solar-electric mr-2" />
                Company Information
              </h3>
              
              <div className="space-y-3 text-white/80 font-tech">
                <div>
                  <span className="text-white font-semibold">Legal Name:</span><br />
                  Ensten AB
                </div>
                <div>
                  <span className="text-white font-semibold">Location:</span><br />
                  Thorildsgatan 10<br />
                  553 13 Jönköping, Sweden
                </div>
                <div>
                  <span className="text-white font-semibold">Industry:</span><br />
                  Solar Racing Technology & Control Systems
                </div>
                <div>
                  <span className="text-white font-semibold">Founded:</span><br />
                  2024
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-solar-electric via-solar-gold to-solar-racing">
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
          >
            <h2 className="text-4xl md:text-5xl font-racing font-bold text-white mb-6">
              READY TO RACE WITH US?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-tech">
              Join the teams that trust Ensten technology to power their solar racing success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
              <button className="bg-white text-solar-carbon px-8 py-4 rounded-lg font-racing font-semibold hover:scale-105 transition-transform flex items-center justify-center">
                Contact Our Engineers
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              </Link>
              <Link href="/products/current-one">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-racing font-semibold hover:bg-white hover:text-black transition-colors">
                Learn About Current One
              </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}