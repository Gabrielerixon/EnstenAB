// app/terms/page.tsx
'use client'

import { motion } from 'framer-motion'
import { FileText, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfServicePage() {
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
              <FileText className="w-8 h-8 text-solar-electric mr-3" />
              <span className="text-solar-electric font-tech font-semibold tracking-wider uppercase">
                Terms of Service
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-racing font-bold text-white mb-6">
              TERMS OF
              <span className="block text-gradient">SERVICE</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-tech leading-relaxed">
              Please read these terms carefully before using our website and services.
            </p>
            
            <div className="mt-8 h-px w-64 bg-solar-gradient mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
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
                      These Terms of Service (&quot;Terms&quot;) govern your use of the Ensten AB website and services. By accessing or using our services, you agree to be bound by these Terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p>
                      By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">2. Company Information</h2>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <p className="mb-2"><strong>Company:</strong> Ensten AB</p>
                      <p className="mb-2"><strong>Address:</strong> Thorildsgatan 10, 553 13 Jönköping, Sweden</p>
                      <p className="mb-2"><strong>Email:</strong> info@ensten.org</p>
                      <p><strong>Registration:</strong> Swedish Aktiebolag (Limited Company)</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">3. Use of Website</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-solar-electric mb-2">Permitted Use:</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Browse and access information about our products and services</li>
                          <li>Contact us for legitimate business inquiries</li>
                          <li>Download publicly available resources and documentation</li>
                          <li>Use our contact forms and communication tools</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-solar-electric mb-2">Prohibited Use:</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Any unlawful purpose or in violation of applicable laws</li>
                          <li>Transmitting viruses, malware, or harmful code</li>
                          <li>Attempting to gain unauthorized access to our systems</li>
                          <li>Copying, reproducing, or distributing copyrighted materials</li>
                          <li>Using automated tools to scrape or harvest data</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">4. Intellectual Property Rights</h2>
                    <p className="mb-4">
                      All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Ensten AB or its content suppliers and protected by Swedish and international copyright laws.
                    </p>
                    <p>
                      The compilation of all content on this site is the exclusive property of Ensten AB and is protected by Swedish and international copyright laws.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">5. Product Information and Availability</h2>
                    <p className="mb-4">
                      We strive to provide accurate product information, but we cannot guarantee that all product descriptions, specifications, or other content is accurate, complete, reliable, current, or error-free.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Product specifications may change without notice</li>
                      <li>Availability is subject to change</li>
                      <li>Pricing is provided upon request and may vary</li>
                      <li>Custom solutions require separate agreements</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">6. User Submissions</h2>
                    <p className="mb-4">
                      By submitting content through our contact forms or communication channels, you grant Ensten AB a non-exclusive right to use, reproduce, modify, and distribute such content for business purposes related to your inquiry.
                    </p>
                    <p>
                      You represent that any information you provide is accurate and that you have the right to submit such information.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">7. Privacy and Data Protection</h2>
                    <p>
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices regarding the collection and use of your personal information.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">8. Disclaimers and Limitations of Liability</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-solar-electric mb-2">Service Disclaimer:</h3>
                        <p>
                          The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, Ensten AB disclaims all warranties, either express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-solar-electric mb-2">Limitation of Liability:</h3>
                        <p>
                          Ensten AB shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of, or inability to use, this website or any information provided on this website.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">9. Third-Party Links</h2>
                    <p>
                      Our website may contain links to third-party websites. These links are provided for your convenience only. We do not endorse, control, or assume responsibility for the content or practices of any third-party websites.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">10. Governing Law and Jurisdiction</h2>
                    <p className="mb-4">
                      These Terms of Service are governed by and construed in accordance with the laws of Sweden. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the Swedish courts.
                    </p>
                    <p>
                      The European Union&apos;s Online Dispute Resolution platform is available at: http://ec.europa.eu/consumers/odr/
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">11. Modifications to Terms</h2>
                    <p>
                      Ensten AB reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the new terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">12. Termination</h2>
                    <p>
                      We may terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">13. Severability</h2>
                    <p>
                      If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                    </p>
                  </div>

                  <div className="border-t border-white/20 pt-8">
                    <h2 className="text-2xl font-racing font-bold text-white mb-4">14. Contact Information</h2>
                    <p className="mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <Mail className="w-5 h-5 text-solar-electric mr-3" />
                        <span className="text-white font-semibold">Legal Contact</span>
                      </div>
                      <div className="space-y-2 text-white/80">
                        <p><strong>Email:</strong> legal@ensten.org</p>
                        <p><strong>Business Inquiries:</strong> info@ensten.org</p>
                        <p><strong>Address:</strong> Ensten AB, Thorildsgatan 10, 553 13 Jönköping, Sweden</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-solar-electric/10 border border-solar-electric/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-solar-electric mb-2">Important Note:</h3>
                    <p className="text-sm">
                      These terms supplement any separate agreements you may have with Ensten AB regarding specific products or services. In case of conflict, the specific product or service agreement will take precedence over these general terms.
                    </p>
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