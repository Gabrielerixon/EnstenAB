// app/privacy/page.tsx
'use client'

import { motion } from 'framer-motion'
import { Shield, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center mb-8"
          >
            <Link href="/" className="flex items-center text-white/60 hover:text-solar-electric transition-colors font-tech">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-solar-electric mr-3" />
              <span className="text-solar-electric font-tech font-semibold tracking-wider uppercase">
                Privacy Policy
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-racing font-bold text-white mb-6">
              YOUR PRIVACY
              <span className="block text-gradient">MATTERS TO US</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-tech leading-relaxed">
              We are committed to protecting your personal information and your right to privacy.
            </p>
            
            <div className="mt-8 h-px w-64 bg-solar-gradient mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="relative pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-12">
              
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="text-white/90 font-tech leading-relaxed space-y-8">
                  
                  <div>
                    <p className="text-sm text-white/60 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-lg mb-6">
                      This Privacy Policy describes how Ensten AB ("we," "us," or "our") collects, uses, and protects your personal information when you visit our website or use our services.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">1. Information We Collect</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-solar-electric mb-2">Information you provide to us:</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Name, email address, and company information when you contact us</li>
                          <li>Technical inquiries and project requirements</li>
                          <li>Communication preferences</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-solar-electric mb-2">Information automatically collected:</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>IP address and browser information</li>
                          <li>Pages visited and time spent on our website</li>
                          <li>Referral sources and search terms</li>
                          <li>Device and operating system information</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">We use your information to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Respond to your inquiries and provide customer support</li>
                      <li>Improve our website and services</li>
                      <li>Send you technical updates and product information (with your consent)</li>
                      <li>Analyze website usage and optimize user experience</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">3. Data Protection & GDPR Rights</h2>
                    <p className="mb-4">
                      As a Swedish company, we comply with the General Data Protection Regulation (GDPR). You have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Access:</strong> Request copies of your personal data</li>
                      <li><strong>Rectification:</strong> Request correction of inaccurate information</li>
                      <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                      <li><strong>Portability:</strong> Request transfer of your data</li>
                      <li><strong>Object:</strong> Object to processing of your personal data</li>
                      <li><strong>Restrict:</strong> Request restriction of processing</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">4. Cookies and Tracking</h2>
                    <p className="mb-4">
                      We use cookies and similar technologies to enhance your browsing experience. These include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Essential cookies:</strong> Required for website functionality</li>
                      <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                      <li><strong>Performance cookies:</strong> Improve website loading and performance</li>
                    </ul>
                    <p className="mt-4">You can control cookie preferences through your browser settings.</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">5. Data Sharing and Third Parties</h2>
                    <p className="mb-4">
                      We do not sell, trade, or rent your personal information. We may share data with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Service providers who assist in website operation and email communications</li>
                      <li>Legal authorities when required by law</li>
                      <li>Business partners with your explicit consent</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">6. Data Security</h2>
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">7. Data Retention</h2>
                    <p>
                      We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law. Contact information is typically retained for 3 years unless you request deletion.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">8. International Data Transfers</h2>
                    <p>
                      Your information may be transferred to and processed in countries outside the European Economic Area. We ensure appropriate safeguards are in place for such transfers.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">9. Updates to This Policy</h2>
                    <p>
                      We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of the updated policy.
                    </p>
                  </div>

                  <div className="border-t border-white/20 pt-8">
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">10. Contact Us</h2>
                    <p className="mb-4">
                      If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                    </p>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <Mail className="w-5 h-5 text-solar-electric mr-3" />
                        <span className="text-white font-semibold">Data Protection Contact</span>
                      </div>
                      <div className="space-y-2 text-white/80">
                        <p><strong>Email:</strong> info@ensten.org</p>
                        <p><strong>Address:</strong> Ensten AB, Thorildsgatan 10, 553 13 Jönköping, Sweden</p>
                        <p><strong>Data Protection Officer:</strong> Available upon request</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}