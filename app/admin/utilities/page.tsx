// app/admin/utilities/page.tsx - ENHANCED with debug functions
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Database, 
  Upload, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Loader,
  Settings,
  Bug,
  RefreshCw,
  Eye
} from 'lucide-react'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/common/Button'
import { seedArticlesToFirebase, clearAllArticles } from '@/lib/seed-articles'
import { BlogService } from '@/lib/blog-service'
import Link from 'next/link'

export default function AdminUtilitiesPage() {
  const [user, loading] = useAuthState(auth)
  const [isSeeding, setIsSeeding] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [isDebugging, setIsDebugging] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [articleCount, setArticleCount] = useState<number>(0)
  const [isLoadingCount, setIsLoadingCount] = useState(true)
  const [debugInfo, setDebugInfo] = useState<string>('')
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  // Load current article count
  useEffect(() => {
    const loadArticleCount = async () => {
      try {
        setIsLoadingCount(true)
        const count = await BlogService.getArticleCount()
        setArticleCount(count)
      } catch (error) {
        console.error('Error loading article count:', error)
        setMessage({ type: 'error', text: 'Failed to load article count' })
      } finally {
        setIsLoadingCount(false)
      }
    }

    if (user) {
      loadArticleCount()
    }
  }, [user])

  const refreshCount = async () => {
    setIsLoadingCount(true)
    try {
      const count = await BlogService.getArticleCount()
      setArticleCount(count)
      setMessage({ type: 'success', text: `Refreshed: Found ${count} articles` })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to refresh count' })
    } finally {
      setIsLoadingCount(false)
    }
  }

  const handleSeedArticles = async () => {
    setIsSeeding(true)
    setMessage(null)

    try {
      await seedArticlesToFirebase()
      setMessage({ type: 'success', text: 'Articles seeded successfully!' })
      
      // Refresh article count
      await refreshCount()
    } catch (error) {
      console.error('Seeding error:', error)
      setMessage({ type: 'error', text: `Failed to seed articles: ${error}` })
    } finally {
      setIsSeeding(false)
    }
  }

  const handleClearArticles = async () => {
    if (!window.confirm('⚠️ WARNING: This will delete ALL articles from the database. This action cannot be undone. Are you sure?')) {
      return
    }

    const confirmText = prompt('Type "DELETE ALL" to confirm:')
    if (confirmText !== 'DELETE ALL') {
      setMessage({ type: 'info', text: 'Deletion cancelled' })
      return
    }

    setIsClearing(true)
    setMessage(null)

    try {
      await clearAllArticles()
      setMessage({ type: 'success', text: 'All articles cleared successfully!' })
      setArticleCount(0)
    } catch (error) {
      console.error('Clearing error:', error)
      setMessage({ type: 'error', text: `Failed to clear articles: ${error}` })
    } finally {
      setIsClearing(false)
    }
  }

  const handleDebugDatabase = async () => {
    setIsDebugging(true)
    setDebugInfo('')
    setMessage(null)

    try {
      // Capture console output
      const originalLog = console.log
      let debugOutput = ''
      console.log = (...args) => {
        debugOutput += args.join(' ') + '\n'
        originalLog(...args)
      }

      await BlogService.debugListAllDocuments()
      
      // Restore console.log
      console.log = originalLog
      
      setDebugInfo(debugOutput)
      setMessage({ type: 'success', text: 'Debug information collected. Check the output below.' })
    } catch (error) {
      console.error('Debug error:', error)
      setMessage({ type: 'error', text: `Debug failed: ${error}` })
    } finally {
      setIsDebugging(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech">Loading utilities...</p>
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
                  Database Utilities
                </h1>
                <p className="text-white/70 text-sm font-tech">
                  Manage database content and debug operations
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        
        {/* Status Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-500/20 border-green-500/40 text-green-200'
                : message.type === 'error'
                ? 'bg-red-500/20 border-red-500/40 text-red-200'
                : 'bg-blue-500/20 border-blue-500/40 text-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {message.type === 'success' && <CheckCircle className="w-5 h-5 mr-3" />}
                {message.type === 'error' && <AlertTriangle className="w-5 h-5 mr-3" />}
                <span className="font-tech text-sm">{message.text}</span>
              </div>
              <button 
                onClick={() => setMessage(null)}
                className="text-current hover:opacity-70"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Database Status */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Database className="w-6 h-6 text-solar-electric mr-3" />
                <h2 className="text-xl font-racing font-bold text-white">Database Status</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={refreshCount}
                loading={isLoadingCount}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white font-tech">Articles in Database:</span>
                <span className="text-solar-electric font-racing font-bold text-lg">
                  {isLoadingCount ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    articleCount
                  )}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white font-tech">Database Status:</span>
                <span className={`font-tech font-semibold ${
                  articleCount > 0 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {articleCount > 0 ? 'Ready' : 'Empty'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white font-tech">Connection:</span>
                <span className="text-green-400 font-tech font-semibold">Connected</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white font-tech">Firebase Project:</span>
                <span className="text-white/80 font-tech text-sm">ensten-website</span>
              </div>
            </div>
          </div>

          {/* Operations */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-solar-gold mr-3" />
              <h2 className="text-xl font-racing font-bold text-white">Operations</h2>
            </div>
            
            <div className="space-y-4">
              
              {/* Seed Articles */}
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-tech font-semibold mb-1">Seed Sample Articles</h3>
                    <p className="text-white/70 text-sm font-tech">
                      Add 3 sample articles to get started. Safe to run multiple times.
                    </p>
                  </div>
                  <Upload className="w-5 h-5 text-solar-electric mt-1" />
                </div>
                <Button
                  onClick={handleSeedArticles}
                  loading={isSeeding}
                  variant="primary"
                  size="sm"
                  fullWidth
                  disabled={isSeeding}
                >
                  {isSeeding ? 'Seeding...' : 'Seed Articles'}
                </Button>
              </div>

              {/* Debug Database */}
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-tech font-semibold mb-1">Debug Database</h3>
                    <p className="text-blue-300 text-sm font-tech">
                      See what's actually in your Firestore database
                    </p>
                  </div>
                  <Bug className="w-5 h-5 text-blue-400 mt-1" />
                </div>
                <Button
                  onClick={handleDebugDatabase}
                  loading={isDebugging}
                  variant="outline"
                  size="sm"
                  fullWidth
                  disabled={isDebugging}
                >
                  {isDebugging ? 'Debugging...' : 'Debug Database'}
                </Button>
              </div>

              {/* Clear Articles */}
              <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-tech font-semibold mb-1">Clear All Articles</h3>
                    <p className="text-red-300 text-sm font-tech">
                      ⚠️ Permanently deletes all articles. Cannot be undone!
                    </p>
                  </div>
                  <Trash2 className="w-5 h-5 text-red-400 mt-1" />
                </div>
                <Button
                  onClick={handleClearArticles}
                  loading={isClearing}
                  variant="racing"
                  size="sm"
                  fullWidth
                  disabled={isClearing || articleCount === 0}
                >
                  {isClearing ? 'Clearing...' : 'Clear All Articles'}
                </Button>
              </div>

            </div>
          </div>
        </div>

        {/* Debug Output */}
        {debugInfo && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-6xl mx-auto"
          >
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Eye className="w-5 h-5 text-solar-electric mr-3" />
                <h2 className="text-lg font-racing font-bold text-white">Debug Output</h2>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                  {debugInfo}
                </pre>
              </div>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h2 className="text-lg font-racing font-bold text-white mb-4">Troubleshooting Steps</h2>
            <div className="space-y-3 text-white/80 font-tech text-sm">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-solar-electric/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-solar-electric font-bold text-xs">1</span>
                </div>
                <p>
                  <strong>If articles won't delete/edit:</strong> Click "Debug Database" to see what's actually stored, 
                  then compare the IDs shown in the admin panel.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-solar-electric/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-solar-electric font-bold text-xs">2</span>
                </div>
                <p>
                  <strong>If you have broken articles:</strong> Use "Clear All Articles" and then "Seed Articles" 
                  to start fresh with working content.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-solar-electric/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-solar-electric font-bold text-xs">3</span>
                </div>
                <p>
                  <strong>Check the browser console:</strong> All operations now have detailed logging 
                  to help identify Firebase issues.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  )
}