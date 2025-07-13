// app/admin/products/page.tsx - COMPLETE version for editing products
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Package, 
  Edit, 
  Save, 
  X, 
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  Tag,
  Loader,
  Monitor
} from 'lucide-react'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/common/Button'
import { ProductsService } from '@/lib/products-service'
import { Product } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'



const availabilityLabels = {
  'available': 'In Stock',
  'pre-order': 'Pre-Order',
  'coming-soon': 'Coming Soon',
  'discontinued': 'Discontinued'
}

const availabilityColors = {
  'available': 'bg-green-500/20 text-green-300 border-green-500/40',
  'pre-order': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  'coming-soon': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  'discontinued': 'bg-red-500/20 text-red-300 border-red-500/40'
}

export default function AdminProductsPage() {
  const [user, loading] = useAuthState(auth)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  // Load products
  useEffect(() => {
    if (user) {
      loadProducts()
    }
  }, [user])

  const loadProducts = async () => {
    try {
      setIsLoadingProducts(true)
      const fetchedProducts = await ProductsService.getProducts()
      setProducts(fetchedProducts)
    } catch (error) {
      console.error('Error loading products:', error)
      setMessage({ type: 'error', text: 'Failed to load products' })
    } finally {
      setIsLoadingProducts(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product })
  }

  const handleSave = async () => {
    if (!editingProduct) return

    setIsSaving(true)
    try {
      const success = await ProductsService.updateProduct(editingProduct.id, editingProduct)
      if (success) {
        // Update local state
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id ? editingProduct : p
        ))
        
        setMessage({ type: 'success', text: 'Product updated successfully!' })
        setEditingProduct(null)
      }
    } catch (error) {
      console.error('Error updating product:', error)
      setMessage({ type: 'error', text: 'Failed to update product' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
  }

  const handleInputChange = (field: keyof Product, value: string) => {
    if (!editingProduct) return
    
    setEditingProduct(prev => prev ? {
      ...prev,
      [field]: value
    } : null)
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="mr-4">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button onClick={loadProducts} variant="outline" size="sm" disabled={isLoadingProducts}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingProducts ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Link href="/products">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Live
                </Button>
              </Link>
            </div>
          </div>
          
          <h1 className="text-4xl font-racing font-bold text-white mb-2">
            Product Management
          </h1>
          <p className="text-white/70 font-tech">
            Edit product information and availability status
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
                : 'bg-red-500/20 border-red-500/40 text-red-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            )}
            <span className="font-tech">{message.text}</span>
            <button 
              onClick={() => setMessage(null)}
              className="ml-auto text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Products Loading */}
        {isLoadingProducts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-12"
          >
            <Loader className="w-8 h-8 animate-spin text-solar-electric mr-3" />
            <span className="text-white font-tech">Loading products...</span>
          </motion.div>
        )}

        {/* Products List */}
        {!isLoadingProducts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-tech font-semibold text-white mb-2">No Products Found</h3>
                <p className="text-white/60 font-tech mb-6">
                  There are no products in the database. Try seeding some sample products first.
                </p>
                <Link href="/admin/utilities">
                  <Button variant="primary">
                    <Monitor className="w-4 h-4 mr-2" />
                    Go to Utilities
                  </Button>
                </Link>
              </div>
            ) : (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                        {product.thumbnailPath ? (
                          <Image
                            src={product.thumbnailPath}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-white/40" />
                          </div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div>
                        <h3 className="text-xl font-tech font-bold text-white mb-1">
                          {product.name}
                        </h3>
                        <p className="text-white/60 font-tech text-sm mb-2">
                          {product.tagline}
                        </p>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-tech text-white/50">
                            ID: {product.id}
                          </span>
                          <span className="text-xs font-tech text-white/50">
                            Category: {product.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-tech font-semibold border ${
                        availabilityColors[product.availability]
                      }`}>
                        {availabilityLabels[product.availability]}
                      </span>
                      
                      {editingProduct?.id === product.id ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={handleSave}
                            loading={isSaving}
                            variant="primary"
                            size="sm"
                            disabled={isSaving}
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            size="sm"
                            disabled={isSaving}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleEdit(product)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Edit Form */}
                  <AnimatePresence>
                    {editingProduct?.id === product.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/10 pt-4 mt-4"
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          
                          {/* Basic Info */}
                          <div className="space-y-4">
                            <h4 className="text-white font-tech font-semibold mb-3 flex items-center">
                              <Tag className="w-4 h-4 mr-2" />
                              Basic Information
                            </h4>
                            
                            <div>
                              <label className="block text-white/70 font-tech text-sm mb-1">
                                Product Name
                              </label>
                              <input
                                type="text"
                                value={editingProduct.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white font-tech focus:outline-none focus:border-solar-electric"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-white/70 font-tech text-sm mb-1">
                                Tagline
                              </label>
                              <input
                                type="text"
                                value={editingProduct.tagline}
                                onChange={(e) => handleInputChange('tagline', e.target.value)}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white font-tech focus:outline-none focus:border-solar-electric"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-white/70 font-tech text-sm mb-1">
                                Price
                              </label>
                              <input
                                type="text"
                                value={editingProduct.price || ''}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                placeholder="e.g. Contact for Pricing"
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white font-tech focus:outline-none focus:border-solar-electric"
                              />
                            </div>
                          </div>

                          {/* Status & Category */}
                          <div className="space-y-4">
                            <h4 className="text-white font-tech font-semibold mb-3 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Status & Category
                            </h4>
                            
                            <div>
                              <label className="block text-white/70 font-tech text-sm mb-1">
                                Availability Status
                              </label>
                              <select
                                value={editingProduct.availability}
                                onChange={(e) => handleInputChange('availability', e.target.value)}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white font-tech focus:outline-none focus:border-solar-electric"
                              >
                                <option value="available" className="bg-solar-carbon text-white">Available</option>
                                <option value="pre-order" className="bg-solar-carbon text-white">Pre-Order</option>
                                <option value="coming-soon" className="bg-solar-carbon text-white">Coming Soon</option>
                                <option value="discontinued" className="bg-solar-carbon text-white">Discontinued</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-white/70 font-tech text-sm mb-1">
                                Category
                              </label>
                              <select
                                value={editingProduct.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white font-tech focus:outline-none focus:border-solar-electric"
                              >
                                <option value="control-unit" className="bg-solar-carbon text-white">Control Unit</option>
                                <option value="solar-panel" className="bg-solar-carbon text-white">Solar Panel</option>
                                <option value="accessory" className="bg-solar-carbon text-white">Accessory</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-white/70 font-tech text-sm mb-1">
                                Short Description
                              </label>
                              <textarea
                                value={editingProduct.shortDescription}
                                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                rows={3}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white font-tech focus:outline-none focus:border-solar-electric resize-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Save/Cancel Actions */}
                        <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-white/10">
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            size="sm"
                            disabled={isSaving}
                          >
                            Cancel Changes
                          </Button>
                          <Button
                            onClick={handleSave}
                            loading={isSaving}
                            variant="primary"
                            size="sm"
                          >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Help Section */}
        {!isLoadingProducts && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-solar-gold mr-3" />
              <h2 className="text-xl font-racing font-bold text-white">Product Management Guide</h2>
            </div>
            
            <div className="text-white/80 font-tech space-y-2">
              <p>• <strong>Availability Status:</strong> Controls how products appear on the public site</p>
              <p>• <strong>Available:</strong> Product is in stock and ready to purchase</p>
              <p>• <strong>Pre-Order:</strong> Product can be pre-ordered</p>
              <p>• <strong>Coming Soon:</strong> Product is announced but not yet available</p>
              <p>• <strong>Discontinued:</strong> Product is no longer available</p>
              <p>• Changes are saved immediately to Firebase and reflected on the live site</p>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  )
}