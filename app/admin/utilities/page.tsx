// app/admin/utilities/page.tsx - ENHANCED with product management
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
  Eye,
  Package,
  BookOpen
} from 'lucide-react'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/common/Button'
import { seedArticlesToFirebase, clearAllArticles } from '@/lib/seed-articles'
import { seedProductsToFirebase, clearAllProducts, debugProductDatabase } from '@/lib/seed-products'
import { BlogService } from '@/lib/blog-service'
import { ProductsService } from '@/lib/products-service'
import Link from 'next/link'

export default function AdminUtilitiesPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  // Article states
  const [isSeeding, setIsSeeding] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [isDebugging, setIsDebugging] = useState(false)
  const [articleCount, setArticleCount] = useState<number>(0)
  const [isLoadingCount, setIsLoadingCount] = useState(true)

  // Product states
  const [isSeedingProducts, setIsSeedingProducts] = useState(false)
  const [isClearingProducts, setIsClearingProducts] = useState(false)
  const [isDebuggingProducts, setIsDebuggingProducts] = useState(false)
  const [productCount, setProductCount] = useState<number>(0)
  const [isLoadingProductCount, setIsLoadingProductCount] = useState(true)

  // Shared states
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  // Load current counts
  useEffect(() => {
    if (user) {
      loadCounts()
    }
  }, [user])

  const loadCounts = async () => {
    try {
      setIsLoadingCount(true)
      setIsLoadingProductCount(true)

      const [articles, products] = await Promise.all([
        BlogService.getArticleCount(),
        ProductsService.getProductCount()
      ])

      setArticleCount(articles)
      setProductCount(products)
    } catch (err) {
      console.error('Error loading counts:', err)
      setMessage({ type: 'error', text: 'Failed to load counts' })
    } finally {
      setIsLoadingCount(false)
      setIsLoadingProductCount(false)
    }
  }

  const refreshCounts = async () => {
    setIsLoadingCount(true)
    setIsLoadingProductCount(true)
    try {
      const [articles, products] = await Promise.all([
        BlogService.getArticleCount(),
        ProductsService.getProductCount()
      ])
      setArticleCount(articles)
      setProductCount(products)
      setMessage({ type: 'success', text: `Refreshed: Found ${articles} articles, ${products} products` })
    } catch (err) {
      console.error('Error refreshing counts:', err)
      setMessage({ type: 'error', text: 'Failed to refresh counts' })
    } finally {
      setIsLoadingCount(false)
      setIsLoadingProductCount(false)
    }
  }

  // ===== ARTICLE HANDLERS =====
  const handleSeedArticles = async () => {
    setIsSeeding(true)
    setMessage(null)

    try {
      await seedArticlesToFirebase()
      setMessage({ type: 'success', text: 'Articles seeded successfully!' })
      await loadCounts()
    } catch (err) {
      console.error('Seeding error:', err)
      setMessage({ type: 'error', text: `Failed to seed articles: ${err}` })
    } finally {
      setIsSeeding(false)
    }
  }

  const handleClearArticles = async () => {
    if (!window.confirm('⚠️ WARNING: This will delete ALL articles from the database. This cannot be undone! Are you sure?')) {
      return
    }

    setIsClearing(true)
    setMessage(null)

    try {
      await clearAllArticles()
      setMessage({ type: 'success', text: 'All articles cleared successfully!' })
      await loadCounts()
    } catch (err) {
      console.error('Clearing error:', err)
      setMessage({ type: 'error', text: `Failed to clear articles: ${err}` })
    } finally {
      setIsClearing(false)
    }
  }

  // ===== PRODUCT HANDLERS =====
  const handleSeedProducts = async () => {
    setIsSeedingProducts(true)
    setMessage(null)

    try {
      await seedProductsToFirebase()
      setMessage({ type: 'success', text: 'Products seeded successfully!' })
      await loadCounts()
    } catch (err) {
      console.error('Product seeding error:', err)
      setMessage({ type: 'error', text: `Failed to seed products: ${err}` })
    } finally {
      setIsSeedingProducts(false)
    }
  }

  const handleClearProducts = async () => {
    if (!window.confirm('⚠️ WARNING: This will delete ALL products from the database. This cannot be undone! Are you sure?')) {
      return
    }

    setIsClearingProducts(true)
    setMessage(null)

    try {
      await clearAllProducts()
      setMessage({ type: 'success', text: 'All products cleared successfully!' })
      await loadCounts()
    } catch (err) {
      console.error('Product clearing error:', err)
      setMessage({ type: 'error', text: `Failed to clear products: ${err}` })
    } finally {
      setIsClearingProducts(false)
    }
  }

  const handleDebugProducts = async () => {
    setIsDebuggingProducts(true)
    try {
      const debugOutput = await debugProductDatabase()
      setDebugInfo(debugOutput)
      setMessage({ type: 'info', text: 'Product debug completed - check console and debug section below' })
    } catch (err) {
      console.error('Debug error:', err)
      setMessage({ type: 'error', text: `Debug failed: ${err}` })
    } finally {
      setIsDebuggingProducts(false)
    }
  }

  const handleDebugDatabase = async () => {
    setIsDebugging(true)
    try {
      // Debug both articles and products
      console.log('=== DEBUGGING FULL DATABASE ===')
      await BlogService.debugListAllArticles()
      const productDebug = await debugProductDatabase()
      setDebugInfo(productDebug)
      setMessage({ type: 'info', text: 'Database debug completed - check console for full output' })
    } catch (err) {
      console.error('Debug error:', err)
      setMessage({ type: 'error', text: `Debug failed: ${err}` })
    } finally {
      setIsDebugging(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-solar-electric" />
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      <main className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Link href="/admin/dashboard" className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <h1 className="text-4xl font-racing font-bold text-white mb-2">
            Admin Utilities
          </h1>
          <p className="text-white/70 font-tech">
            Database management tools and utilities
          </p>
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 p-4 rounded-lg border flex items-center ${
              message.type === 'success' 
                ? 'bg-green-500/20 border-green-500/40 text-green-300'
                : message.type === 'error'
                ? 'bg-red-500/20 border-red-500/40 text-red-300'
                : 'bg-blue-500/20 border-blue-500/40 text-blue-300'
            }`}
          >
            {message.type === 'success' && <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />}
            {message.type === 'error' && <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />}
            {message.type === 'info' && <Eye className="w-5 h-5 mr-2 flex-shrink-0" />}
            <span className="font-tech">{message.text}</span>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Database Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Database className="w-6 h-6 text-solar-electric mr-3" />
                <h2 className="text-xl font-racing font-bold text-white">Database Status</h2>
              </div>
              <Button onClick={refreshCounts} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white font-tech">Articles:</span>
                <span className="text-solar-electric font-tech font-bold text-lg">
                  {isLoadingCount ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    articleCount
                  )}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white font-tech">Products:</span>
                <span className="text-solar-gold font-tech font-bold text-lg">
                  {isLoadingProductCount ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    productCount
                  )}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white font-tech">Database Status:</span>
                <span className={`font-tech font-semibold ${
                  (articleCount > 0 || productCount > 0) ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {(articleCount > 0 || productCount > 0) ? 'Ready' : 'Empty'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white font-tech">Connection:</span>
                <span className="text-green-400 font-tech font-semibold">Connected</span>
              </div>
            </div>
          </motion.div>

          {/* Operations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-solar-gold mr-3" />
              <h2 className="text-xl font-racing font-bold text-white">Operations</h2>
            </div>
            
            <div className="space-y-4">
              
              {/* === ARTICLE OPERATIONS === */}
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-white font-tech font-semibold mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Article Management
                </h3>
                
                <div className="space-y-3">
                  {/* Seed Articles */}
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-tech font-semibold text-sm">Seed Sample Articles</h4>
                        <p className="text-blue-300 text-xs font-tech">
                          Add sample articles to get started
                        </p>
                      </div>
                      <Upload className="w-4 h-4 text-blue-400 mt-0.5" />
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

                  {/* Clear Articles */}
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-tech font-semibold text-sm">Clear All Articles</h4>
                        <p className="text-red-300 text-xs font-tech">
                          ⚠️ Permanently deletes all articles
                        </p>
                      </div>
                      <Trash2 className="w-4 h-4 text-red-400 mt-0.5" />
                    </div>
                    <Button
                      onClick={handleClearArticles}
                      loading={isClearing}
                      variant="racing"
                      size="sm"
                      fullWidth
                      disabled={isClearing || articleCount === 0}
                    >
                      {isClearing ? 'Clearing...' : 'Clear Articles'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* === PRODUCT OPERATIONS === */}
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-white font-tech font-semibold mb-3 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Product Management
                </h3>
                
                <div className="space-y-3">
                  {/* Seed Products */}
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-tech font-semibold text-sm">Seed Sample Products</h4>
                        <p className="text-green-300 text-xs font-tech">
                          Add sample products to get started
                        </p>
                      </div>
                      <Upload className="w-4 h-4 text-green-400 mt-0.5" />
                    </div>
                    <Button
                      onClick={handleSeedProducts}
                      loading={isSeedingProducts}
                      variant="primary"
                      size="sm"
                      fullWidth
                      disabled={isSeedingProducts}
                    >
                      {isSeedingProducts ? 'Seeding...' : 'Seed Products'}
                    </Button>
                  </div>

                  {/* Clear Products */}
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-tech font-semibold text-sm">Clear All Products</h4>
                        <p className="text-red-300 text-xs font-tech">
                          ⚠️ Permanently deletes all products
                        </p>
                      </div>
                      <Trash2 className="w-4 h-4 text-red-400 mt-0.5" />
                    </div>
                    <Button
                      onClick={handleClearProducts}
                      loading={isClearingProducts}
                      variant="racing"
                      size="sm"
                      fullWidth
                      disabled={isClearingProducts || productCount === 0}
                    >
                      {isClearingProducts ? 'Clearing...' : 'Clear Products'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* === DEBUG OPERATIONS === */}
              <div>
                <h3 className="text-white font-tech font-semibold mb-3 flex items-center">
                  <Bug className="w-4 h-4 mr-2" />
                  Debug Tools
                </h3>
                
                <div className="space-y-3">
                  {/* Debug Full Database */}
                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-tech font-semibold text-sm">Debug Full Database</h4>
                        <p className="text-purple-300 text-xs font-tech">
                          See all data in Firestore
                        </p>
                      </div>
                      <Bug className="w-4 h-4 text-purple-400 mt-0.5" />
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

                  {/* Debug Products Only */}
                  <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-tech font-semibold text-sm">Debug Products Only</h4>
                        <p className="text-yellow-300 text-xs font-tech">
                          See product collection details
                        </p>
                      </div>
                      <Package className="w-4 h-4 text-yellow-400 mt-0.5" />
                    </div>
                    <Button
                      onClick={handleDebugProducts}
                      loading={isDebuggingProducts}
                      variant="outline"
                      size="sm"
                      fullWidth
                      disabled={isDebuggingProducts}
                    >
                      {isDebuggingProducts ? 'Debugging...' : 'Debug Products'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Debug Output */}
        {debugInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center mb-4">
              <Bug className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-xl font-racing font-bold text-white">Debug Output</h2>
            </div>
            <pre className="bg-black/50 p-4 rounded-lg text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
              {debugInfo}
            </pre>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6"
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-solar-gold mr-3" />
            <h2 className="text-xl font-racing font-bold text-white">Usage Guide</h2>
          </div>
          
          <div className="text-white/80 font-tech space-y-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-solar-electric/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-solar-electric font-bold text-xs">1</span>
                </div>
                <p>
                  <strong>For new installations:</strong> Use &quot;Seed Sample Articles&quot; and &quot;Seed Sample Products&quot; 
                  to populate your database with example content.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-solar-electric/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-solar-electric font-bold text-xs">2</span>
                </div>
                <p>
                  <strong>If you have broken data:</strong> Use &quot;Clear All&quot; followed by &quot;Seed&quot; 
                  to start fresh with working content.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-solar-electric/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-solar-electric font-bold text-xs">3</span>
                </div>
                <p>
                  <strong>For troubleshooting:</strong> Use debug tools to see exactly what&apos;s in your database. 
                  Check the browser console for detailed logging.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  )
}