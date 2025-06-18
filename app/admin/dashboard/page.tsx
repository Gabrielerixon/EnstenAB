// app/admin/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { 
  BookOpen, 
  Users, 
  Settings, 
  Mail, 
  TrendingUp,
  LogOut,
  Plus,
  Eye,
  Edit
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

interface DashboardStats {
  totalArticles: number
  totalContacts: number
  totalViews: number
  lastLogin: string
}

export default function AdminDashboardPage() {
  const [user, loading] = useAuthState(auth)
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    totalContacts: 0,
    totalViews: 0,
    lastLogin: new Date().toISOString()
  })
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Mock stats - replace with real data from Firestore
  useEffect(() => {
    // TODO: Fetch real stats from Firestore
    setStats({
      totalArticles: 3,
      totalContacts: 12,
      totalViews: 1250,
      lastLogin: new Date().toISOString()
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  const quickActions = [
    {
      title: 'Create New Article',
      description: 'Write a new blog post or guide',
      icon: Plus,
      href: '/admin/blog?create=true',
      color: 'solar-electric'
    },
    {
      title: 'Manage Articles',
      description: 'Edit existing content',
      icon: Edit,
      href: '/admin/blog',
      color: 'solar-gold'
    },
    {
      title: 'View Contact Forms',
      description: 'Check customer inquiries',
      icon: Mail,
      href: '/admin/contacts',
      color: 'solar-racing'
    },
    {
      title: 'Site Settings',
      description: 'Configure website settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'solar-electric'
    }
  ]

  const statsCards = [
    {
      title: 'Published Articles',
      value: stats.totalArticles,
      icon: BookOpen,
      color: 'solar-electric',
      change: '+2 this month'
    },
    {
      title: 'Contact Inquiries',
      value: stats.totalContacts,
      icon: Mail,
      color: 'solar-gold',
      change: '+5 this week'
    },
    {
      title: 'Total Page Views',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'solar-racing',
      change: '+15% this month'
    },
    {
      title: 'Active Users',
      value: '5',
      icon: Users,
      color: 'solar-electric',
      change: 'All team members'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Header */}
      <header className="relative z-10 bg-solar-carbon/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-racing font-bold text-white">
                Admin Dashboard
              </h1>
              <p className="text-white/70 text-sm font-tech">
                Welcome back, {user.email?.split('@')[0]}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8 pt-24">
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-solar-electric/20 via-solar-gold/20 to-solar-racing/20 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
            <h2 className="text-3xl font-racing font-bold text-white mb-4">
              Content Management System
            </h2>
            <p className="text-white/90 font-tech text-lg max-w-3xl">
              Manage educational content, blog posts, and customer communications for Ensten AB. 
              Create engaging technical guides and share solar racing expertise with teams worldwide.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-white/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              
              <div className="text-2xl font-racing font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/80 font-tech text-sm mb-2">
                {stat.title}
              </div>
              <div className="text-green-400 font-tech text-xs">
                {stat.change}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-xl font-racing font-bold text-white mb-6">Quick Actions</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-white/40 transition-all duration-300 card-hover cursor-pointer group">
                  <div className={`w-12 h-12 bg-${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-racing font-bold text-white mb-2 group-hover:text-solar-electric transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-white/70 font-tech text-sm">
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Recent Articles */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-racing font-bold text-white">Recent Articles</h3>
              <Link href="/admin/blog">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: 'Getting Started with Current One Control Unit',
                  status: 'Published',
                  date: '2 days ago'
                },
                {
                  title: 'BWSC 2025: What Teams Need to Know',
                  status: 'Published', 
                  date: '5 days ago'
                },
                {
                  title: 'Integrating Current One: Advanced Guide',
                  status: 'Draft',
                  date: '1 week ago'
                }
              ].map((article, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <h4 className="text-white font-tech font-semibold text-sm">
                      {article.title}
                    </h4>
                    <p className="text-white/60 text-xs font-tech">
                      {article.date}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-tech ${
                    article.status === 'Published' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {article.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-racing font-bold text-white mb-6">System Status</h3>
            
            <div className="space-y-4">
              {[
                { service: 'Website', status: 'Operational', uptime: '99.9%' },
                { service: 'Database', status: 'Operational', uptime: '99.8%' },
                { service: 'Email Service', status: 'Operational', uptime: '100%' },
                { service: 'CDN', status: 'Operational', uptime: '99.9%' }
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3" />
                    <span className="text-white font-tech text-sm">{service.service}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-xs font-tech">{service.status}</div>
                    <div className="text-white/60 text-xs font-tech">{service.uptime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}