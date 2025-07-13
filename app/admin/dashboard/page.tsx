// app/admin/dashboard/page.tsx - CLEAN VERSION - bara Quick Actions
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { BlogService } from '@/lib/blog-service'
import { ProductsService } from '@/lib/products-service'
import { 
  BookOpen, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Database,
  RefreshCw,
  Package,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

interface DashboardStats {
  totalArticles: number
  totalProducts: number
}

export default function AdminDashboardPage() {
  const [user, loading] = useAuthState(auth)
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    totalProducts: 0
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  // Load basic stats from Firebase
  useEffect(() => {
    if (user) {
      loadDashboardStats()
    }
  }, [user])

  const loadDashboardStats = async () => {
    try {
      setIsLoadingStats(true)
      console.log('📊 Loading dashboard stats...')
      
      // Get real data from Firebase
      const [articles, products] = await Promise.all([
        BlogService.getArticles(),
        ProductsService.getProducts()
      ])
      
      console.log('📚 Found', articles.length, 'articles')
      console.log('📦 Found', products.length, 'products')
      
      // Update stats with real data
      setStats({
        totalArticles: articles.length,
        totalProducts: products.length
      })
      
      console.log('✅ Dashboard stats loaded')
    } catch (error) {
      console.error('❌ Error loading dashboard stats:', error)
    } finally {
      setIsLoadingStats(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleRefreshStats = () => {
    loadDashboardStats()
  }

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
      title: 'Manage Products',
      description: 'Update product availability and info',
      icon: Package,
      href: '/admin/products',
      color: 'solar-racing'
    },
    {
      title: 'Database Utilities',
      description: 'Seed articles and manage database',
      icon: Database,
      href: '/admin/utilities',
      color: 'solar-gold'
    },
    {
      title: 'Site Settings',
      description: 'Configure website settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'solar-electric'
    },
    {
      title: 'View Live Site',
      description: 'See the public website',
      icon: Eye,
      href: '/',
      color: 'solar-racing'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Header */}
      <header className="relative z-10 bg-solar-carbon/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-racing font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-white/70 font-tech">
                Welcome back, {user?.email?.split('@')[0] || 'Admin'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button onClick={handleRefreshStats} variant="outline" size="sm">
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingStats ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
              
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        
        {/* Quick Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-racing font-bold text-white mb-1">
                  {isLoadingStats ? (
                    <div className="w-8 h-8 bg-white/20 animate-pulse rounded" />
                  ) : (
                    stats.totalArticles
                  )}
                </div>
                <div className="text-white/80 font-tech text-sm">
                  Published Articles
                </div>
                <div className="text-green-400 font-tech text-xs mt-1">
                  From Firebase
                </div>
              </div>
              <BookOpen className="w-8 h-8 text-solar-electric" />
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-racing font-bold text-white mb-1">
                  {isLoadingStats ? (
                    <div className="w-8 h-8 bg-white/20 animate-pulse rounded" />
                  ) : (
                    stats.totalProducts
                  )}
                </div>
                <div className="text-white/80 font-tech text-sm">
                  Products Listed
                </div>
                <div className="text-green-400 font-tech text-xs mt-1">
                  From Firebase
                </div>
              </div>
              <Package className="w-8 h-8 text-solar-gold" />
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-racing font-bold text-white mb-1">
                  Ready
                </div>
                <div className="text-white/80 font-tech text-sm">
                  System Status
                </div>
                <div className="text-green-400 font-tech text-xs mt-1">
                  All systems operational
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-solar-racing" />
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-racing font-bold text-white mb-1">
                  Live
                </div>
                <div className="text-white/80 font-tech text-sm">
                  Website Status
                </div>
                <div className="text-green-400 font-tech text-xs mt-1">
                  Connected to Firebase
                </div>
              </div>
              <Eye className="w-8 h-8 text-solar-electric" />
            </div>
          </div>
        </motion.div>

        {/* Content & Product Management */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-racing font-bold text-white">
              Content & Product Management
            </h2>
            <div className="text-white/60 font-tech text-sm">
              Manage educational content, product information, and customer communications for Ensten AB
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-xl font-racing font-bold text-white mb-6">Quick Actions</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      </main>
    </div>
  )
}