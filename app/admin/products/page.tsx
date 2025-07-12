// app/admin/products/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
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
  Tag
} from 'lucide-react'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/common/Button'
import { ProductsService } from '@/lib/products-service'
import { Product } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'

type ProductAvailability = 'available' | 'pre-order' | 'coming-soon' | 'discontinued'

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
        
        // Auto-hide success message
        setTimeout(() => setMessage(null), 3000)
      } else {
        throw new Error('Update failed')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      setMessage({ type: 'error', text: 'Failed to update product. Changes saved locally only.' })
      
      // Still update local state as fallback
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ))
      setEditingProduct(null)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setMessage(null)
  }

  const updateEditingProduct = (field: keyof Product, value: any) => {
    if (!editingProduct) return
    setEditingProduct(prev => prev ? { ...prev, [field]: value } : null)
  }

  if (loading || isLoadingProducts) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech">{loading ? 'Loading...' : 'Loading products...'}</p>
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
                  Product Management
                </h1>
                <p className="text-white/70 text-sm font-tech">
                  Manage product availability and information
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
            className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-500/20 border-green-500/40 text-green-200'
                : 'bg-red-500/20 border-red-500/40 text-red-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-3" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-3" />
                )}
                <span className="font-tech text-sm">{message.text}</span>
              </div>
              <button 
                onClick={() => setMessage(null)}
                className="text-current hover:opacity-70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Products Overview */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Package className="w-6 h-6 text-solar-electric mr-3" />
              <h2 className="text-xl font-racing font-bold text-white">Product Catalog</h2>
            </div>
            <div className="text-white/70 font-tech text-sm">
              {products.length} products total
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-solar-electric/10 to-solar-gold/10 relative overflow-hidden">
                  <Image
                    src={product.thumbnailPath}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <div class="w-16 h-16 bg-solar-gradient rounded-lg flex items-center justify-center">
                              <span class="text-white font-racing font-bold text-lg">
                                ${product.name.substring(0, 2)}
                              </span>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                  
                  {/* Availability Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-tech font-semibold border ${availabilityColors[product.availability]}`}>
                    {availabilityLabels[product.availability]}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-racing font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="text-solar-electric font-tech text-sm">
                        {product.category === 'control-unit' ? 'Control Unit' :
                         product.category === 'solar-panel' ? 'Solar System' : 'Accessory'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/products/${product.id}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-white/70 font-tech text-sm mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-solar-gold font-tech font-semibold text-sm">
                      {product.price}
                    </span>
                    <span className="text-white/60 font-tech text-xs">
                      ID: {product.id}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {editingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={handleCancel}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-gradient-to-b from-solar-carbon to-solar-slate rounded-xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-racing font-bold text-white">
                  Edit Product: {editingProduct.name}
                </h3>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-tech font-semibold mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => updateEditingProduct('name', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-tech font-semibold mb-2">
                      Category
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => updateEditingProduct('category', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                    >
                      <option value="control-unit" className="bg-solar-carbon">Control Unit</option>
                      <option value="solar-panel" className="bg-solar-carbon">Solar Panel</option>
                      <option value="accessory" className="bg-solar-carbon">Accessory</option>
                    </select>
                  </div>
                </div>

                {/* Availability & Price */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-tech font-semibold mb-2">
                      Availability Status *
                    </label>
                    <select
                      value={editingProduct.availability}
                      onChange={(e) => updateEditingProduct('availability', e.target.value as ProductAvailability)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                    >
                      <option value="available" className="bg-solar-carbon">In Stock</option>
                      <option value="pre-order" className="bg-solar-carbon">Pre-Order</option>
                      <option value="coming-soon" className="bg-solar-carbon">Coming Soon</option>
                      <option value="discontinued" className="bg-solar-carbon">Discontinued</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-tech font-semibold mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      value={editingProduct.price}
                      onChange={(e) => updateEditingProduct('price', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                      placeholder="Contact for Pricing"
                    />
                  </div>
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={editingProduct.tagline}
                    onChange={(e) => updateEditingProduct('tagline', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Short Description
                  </label>
                  <textarea
                    value={editingProduct.shortDescription}
                    onChange={(e) => updateEditingProduct('shortDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric resize-none"
                  />
                </div>

                {/* Current Highlights */}
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Product Highlights
                  </label>
                  <div className="space-y-2">
                    {editingProduct.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-solar-electric" />
                        <span className="text-white/80 font-tech text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/20">
                  <Button
                    onClick={handleSave}
                    variant="primary"
                    loading={isSaving}
                    icon={<Save className="w-4 h-4" />}
                    className="flex-1"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="ghost"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}