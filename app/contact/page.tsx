// app/contact/page.tsx - UPDATED WITH OSKAR OGARP
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Linkedin,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'
import Image from 'next/image'

// Team members data - UPDATED WITH OSKAR OGARP
const teamMembers = [
  {
    id: 'oskar-ogarp',
    name: 'Oskar Ogarp',
    role: 'Client Relations Manager',
    bio: 'Leading client communications and business development initiatives. Connects teams with the perfect technology solutions for their solar racing projects.',
    image: '/images/team/oskar-ogarp.jpg',
    email: 'oskar@ensten.org',
    linkedin: 'https://www.linkedin.com/in/oskarogarp/'
  },
  {
    id: 'erik-tornqvist',
    name: 'Erik Törnqvist',
    role: 'Chief Operating Officer',
    bio: 'Led the development of innovative solutions to meet future industry demands and regulations.',
    image: '/images/team/erik-tornqvist.png',
    email: 'erik@ensten.org',
    linkedin: 'https://www.linkedin.com/in/erik-t%C3%B6rnqvist-249481198/'
  },
  {
    id: 'goncalo-marques',
    name: 'Gonçalo De Sousa Carvalho Bernardes Marques',
    role: 'Chief Product Officer',
    bio: 'Led the development of innovative solutions to meet future industry demands and regulations.',
    image: '/images/team/goncalo-marques.png',
    email: 'goncalo@ensten.org',
    linkedin: 'https://www.linkedin.com/in/goncalo-de-sousa-carvalho-bernardes-marques-a1bb8b256/'
  },
  {
    id: 'daniel-pito',
    name: 'Daniel Pito',
    role: 'Technical Engineer',
    bio: 'Led the development of innovative solutions to meet future industry demands and regulations.',
    image: '/images/team/daniel-pito.png',
    email: 'daniel@ensten.org',
    linkedin: 'https://www.linkedin.com/in/daniel-pito-1b2453235/'
  },
  {
    id: 'linus-andersson',
    name: 'Linus Andersson',
    role: 'Technical Engineer',
    bio: 'Led the development of innovative solutions to meet future industry demands and regulations.',
    image: '/images/team/linus-andersson.jpg',
    email: 'linus@ensten.org',
    linkedin: 'https://www.linkedin.com/in/linus-andersson-395032117/'
  }
]

// Contact form types
const inquiryTypes = [
  { value: 'product', label: 'Product Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'general', label: 'General Question' }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'product',
    subject: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to send message')
      }

      setFormStatus('success')
      setStatusMessage('Message sent successfully! We&apos;ll get back to you within 24 hours.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: 'product',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Contact form error:', error)
      setFormStatus('error')
      setStatusMessage('Failed to send message. Please try again or contact us directly.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-solar-electric mr-3" />
              <span className="text-solar-electric font-tech font-semibold tracking-wider uppercase">
                Get In Touch
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-racing font-bold text-white mb-6">
              CONTACT OUR
              <span className="block text-gradient">ENGINEERING TEAM</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto font-tech leading-relaxed">
              Ready to take your solar racing project to the next level? Our expert engineers 
              are here to help you achieve championship performance with cutting-edge control systems.
            </p>
            
            <div className="mt-8 h-px w-64 bg-solar-gradient mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8"
            >
              <h2 className="text-2xl font-racing font-bold text-white mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-tech font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-tech font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Company & Inquiry Type Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-tech font-semibold mb-2">
                      Company/University
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
                      placeholder="Your organization"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-tech font-semibold mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value} className="bg-solar-carbon text-white">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20 resize-none"
                    placeholder="Tell us about your project, requirements, or questions..."
                  />
                </div>

                {/* Status Message */}
                {formStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center p-4 rounded-lg ${
                      formStatus === 'success' 
                        ? 'bg-green-500/20 border border-green-500/40 text-green-200'
                        : formStatus === 'error'
                        ? 'bg-red-500/20 border border-red-500/40 text-red-200'
                        : 'bg-blue-500/20 border border-blue-500/40 text-blue-200'
                    }`}
                  >
                    {formStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-3" />
                    ) : formStatus === 'error' ? (
                      <AlertCircle className="w-5 h-5 mr-3" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
                    )}
                    <span className="font-tech text-sm">{statusMessage}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={formStatus === 'sending'}
                  icon={<Send className="w-5 h-5" />}
                  className="text-lg py-4"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Direct Contact */}
              <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
                <h3 className="text-xl font-racing font-bold text-white mb-6">Direct Contact</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-solar-gradient rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-tech font-semibold">Email</p>
                      <a href="mailto:info@ensten.org" className="text-solar-electric hover:text-solar-gold transition-colors font-tech">
                        info@ensten.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-solar-gradient rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-tech font-semibold">Phone</p>
                      <a href="tel:+46123456789" className="text-solar-electric hover:text-solar-gold transition-colors font-tech">
                        +46 762 972 180
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-solar-gradient rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-tech font-semibold">Address</p>
                      <p className="text-white/80 font-tech">
                        Thorildsgatan 10<br />
                        553 13 Jönköping<br />
                        Sweden
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-solar-electric/20 to-solar-gold/20 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <h4 className="text-lg font-racing font-bold text-white mb-3">Quick Response</h4>
                <p className="text-white/90 font-tech">
                  We typically respond to all inquiries within <span className="text-solar-electric font-semibold">24 hours</span> during business days.
                </p>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <h4 className="text-lg font-racing font-bold text-white mb-4">Business Hours</h4>
                <div className="space-y-2 text-white/80 font-tech">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 - 17:00 CET</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend:</span>
                    <span>Emergency support only</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section - WITH OSKAR OGARP ADDED */}
      <section className="relative py-24 bg-gradient-to-r from-solar-slate/50 to-solar-carbon/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-racing font-bold text-white mb-6">
              MEET OUR <span className="text-gradient">ENGINEERING TEAM</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-tech">
              World-class engineers and client relations experts dedicated to advancing solar racing technology
            </p>
          </motion.div>

          {/* Updated grid to handle 5 members better */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center hover:border-white/40 transition-all duration-300 card-hover"
              >
                {/* Profile Images */}
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-2 border-solar-electric/50 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-solar-gradient rounded-full flex items-center justify-center">
                            <span class="text-white font-racing font-bold text-2xl">
                              ${member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>

                <h3 className="text-lg font-racing font-bold text-white mb-2">
                  {member.name}
                </h3>
                
                <p className="text-solar-electric font-tech font-semibold mb-3 text-sm">
                  {member.role}
                </p>
                
                <p className="text-white/80 font-tech text-xs mb-6 leading-relaxed">
                  {member.bio}
                </p>

                {/* Contact Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center w-8 h-8 bg-white/10 hover:bg-solar-electric rounded-lg transition-colors group"
                  >
                    <Mail className="w-3 h-3 text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 bg-white/10 hover:bg-solar-electric rounded-lg transition-colors group"
                  >
                    <Linkedin className="w-3 h-3 text-white group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-solar-electric via-solar-gold to-solar-racing">
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-racing font-bold text-white mb-6">
              Ready to Accelerate Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-tech">
              Let&apos;s discuss how Ensten&apos;s cutting-edge technology can power your solar racing success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-solar-carbon hover:scale-105"
              >
                Schedule Consultation
              </Button>
              <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Explore Products
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}