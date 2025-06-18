'use client'

import Link from 'next/link'
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants'
import { Shield } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-ensten-black text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Ensten AB</h3>
            <address className="not-italic">
              <p>{SITE_CONFIG.address.street}</p>
              <p>{SITE_CONFIG.address.postalCode} {SITE_CONFIG.address.city}</p>
              <p>{SITE_CONFIG.address.country}</p>
            </address>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              {SITE_CONFIG.social.linkedin && (
                <li>
                  <a 
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Join Our Journey</h3>
            <p className="text-gray-300 mb-4">
              Stay updated on solar racing innovations and Ensten's latest developments.
            </p>
            <Link 
              href="/contact"
              className="bg-ensten-orange text-white px-4 py-2 rounded-md inline-block hover:bg-orange-600 transition-colors mb-4"
            >
              Contact Us
            </Link>
            
            {/* Admin Login Button */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <Link 
                href="/admin/login"
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm group"
              >
                <Shield className="w-4 h-4 mr-2 group-hover:text-solar-electric transition-colors" />
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Ensten AB. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link href="/privacy" className="mr-4 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}