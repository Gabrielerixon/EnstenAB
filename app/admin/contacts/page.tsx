// app/admin/contacts/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  User, 
  Building, 
  MessageSquare,
  Phone,
  Globe,
  Filter,
  Search,
  Eye,
  Trash2
} from 'lucide-react'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

interface ContactForm {
  id: string
  name: string
  email: string
  company?: string
  inquiryType: string
  subject: string
  message: string
  submittedAt: string
  status: 'new' | 'read' | 'replied'
}

// Mock data - replace with Firestore data
const mockContacts: ContactForm[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@university.edu',
    company: 'Stanford Solar Racing',
    inquiryType: 'Product Inquiry',
    subject: 'Current One for BWSC 2025',
    message: 'Hi, we are interested in the Current One control unit for our BWSC 2025 campaign. Could you provide more details about pricing and availability?',
    submittedAt: '2025-06-14T10:30:00Z',
    status: 'new'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@mit.edu',
    company: 'MIT Solar Electric Vehicle Team',
    inquiryType: 'Technical Support',
    subject: 'Integration question',
    message: 'We are having some issues with the CAN bus integration. Could you help us with the configuration?',
    submittedAt: '2025-06-13T14:20:00Z',
    status: 'read'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@berkeley.edu',
    company: 'UC Berkeley Solar Vehicle Team',
    inquiryType: 'Partnership',
    subject: 'Sponsorship opportunity',
    message: 'Hello, we would like to discuss potential partnership opportunities for our solar racing team.',
    submittedAt: '2025-06-12T09:15:00Z',
    status: 'replied'
  }
]

export default function AdminContactsPage() {
  const [user, loading] = useAuthState(auth)
  const [contacts, setContacts] = useState<ContactForm[]>(mockContacts)
  const [filteredContacts, setFilteredContacts] = useState<ContactForm[]>(mockContacts)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  // Filter contacts
  useEffect(() => {
    let filtered = contacts

    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredContacts(filtered)
  }, [contacts, statusFilter, searchQuery])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-300'
      case 'read': return 'bg-yellow-500/20 text-yellow-300'
      case 'replied': return 'bg-green-500/20 text-green-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech">Loading contacts...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Header */}
      <header className="relative z-10 bg-solar-carbon/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-racing font-bold text-white">
                  Contact Forms
                </h1>
                <p className="text-white/70 text-sm font-tech">
                  Manage customer inquiries and communications
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8 pt-24">
        
        {/* Filters */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
            <p className="text-white/70 font-tech text-sm">
              {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex gap-2">
              {['new', 'read', 'replied'].map(status => {
                const count = contacts.filter(c => c.status === status).length
                return (
                  <span key={status} className={`px-2 py-1 rounded text-xs font-tech ${getStatusColor(status)}`}>
                    {count} {status}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-white/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-tech font-semibold ${getStatusColor(contact.status)}`}>
                      {contact.status.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 bg-solar-electric/20 text-solar-electric rounded-full text-xs font-tech font-semibold">
                      {contact.inquiryType}
                    </span>
                    <div className="flex items-center text-xs text-white/60 font-tech">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(contact.submittedAt)}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center text-white font-tech font-semibold mb-2">
                        <User className="w-4 h-4 mr-2" />
                        {contact.name}
                      </div>
                      <div className="flex items-center text-white/80 font-tech text-sm mb-1">
                        <Mail className="w-4 h-4 mr-2" />
                        {contact.email}
                      </div>
                      {contact.company && (
                        <div className="flex items-center text-white/80 font-tech text-sm">
                          <Building className="w-4 h-4 mr-2" />
                          {contact.company}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-tech font-semibold mb-2">
                        {contact.subject}
                      </h4>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div className="bg-black/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center text-white/80 font-tech text-sm mb-2">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </div>
                    <p className="text-white/90 font-tech text-sm leading-relaxed line-clamp-3">
                      {contact.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-racing font-bold text-white mb-2">No Contacts Found</h3>
              <p className="text-white/60 font-tech">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No contact forms have been submitted yet.'
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}