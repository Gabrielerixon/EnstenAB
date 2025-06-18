// app/products/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Zap, Shield, Cpu, Star, ArrowRight, Filter, Grid, List, Search } from 'lucide-react'
import { ProductCategory } from '@/lib/types'
import { productsData } from '@/lib/products-data'

const categoryLabels: Record<ProductCategory, string> = {
  'control-unit': 'Control Units',
  'solar-panel': 'Solar Systems',
  'accessory': 'Accessories'
}

const availabilityLabels = {
  'available': 'Available Now',
  'pre-order': 'Pre-Order',
  'coming-soon': 'Coming Soon'
}

const availabilityColors = {
  'available': 'text-green-400',
  'pre-order': 'text-solar-gold',
  'coming-soon': 'text-solar-electric'
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.highlights.some(highlight => highlight.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const categories: ProductCategory[] = ['control-unit', 'solar-panel', 'accessory']

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-solar-electric mr-3" />
              <span className="text-solar-electric font-tech font-semibold tracking-wider uppercase">
                Product Catalog
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-racing font-bold text-white mb-6">
              RACING
              <span className="block text-gradient">TECHNOLOGY</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto font-tech leading-relaxed">
              Professional-grade components and systems designed for championship solar racing performance. 
              Each product is engineered to the highest standards and tested in competition conditions.
            </p>
            
            <div className="mt-8 h-px w-64 bg-solar-gradient mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="relative pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
              
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-tech font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-solar-electric text-white'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:border-white/40'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-tech font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-solar-electric text-white'
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:border-white/40'
                    }`}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>

              {/* View Mode */}
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-solar-electric text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-solar-electric text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-white/70 font-tech">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="relative pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={
                  viewMode === 'grid' 
                    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                }
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={
                      viewMode === 'grid'
                        ? 'group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300 card-hover'
                        : 'group bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300 card-hover'
                    }
                  >
                    <div className={viewMode === 'grid' ? '' : 'flex items-center'}>
                      
                      {/* Product Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'grid' 
                          ? 'aspect-video' 
                          : 'w-64 h-48 flex-shrink-0'
                      }`}>
                        <div className="w-full h-full bg-gradient-to-br from-solar-carbon to-solar-slate flex items-center justify-center p-6">
                          <Image
                            src={product.thumbnailPath}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-16 h-16 bg-solar-gradient rounded-lg mx-auto flex items-center justify-center">
                                    <span class="text-white font-racing font-bold text-lg">
                                      ${product.name.substring(0, 2)}
                                    </span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 bg-solar-electric text-white px-3 py-1 rounded-full text-xs font-tech font-semibold">
                          {categoryLabels[product.category]}
                        </div>
                        
                        {/* Availability Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-tech font-semibold ${availabilityColors[product.availability]} bg-black/50 backdrop-blur-sm`}>
                          {availabilityLabels[product.availability]}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="mb-4">
                          <h3 className="text-xl md:text-2xl font-racing font-bold text-white mb-2 group-hover:text-solar-electric transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-solar-gold font-tech font-medium mb-3">
                            {product.tagline}
                          </p>
                          <p className="text-white/80 font-tech leading-relaxed line-clamp-3">
                            {product.shortDescription}
                          </p>
                        </div>

                        {/* Key Features */}
                        <div className="mb-6">
                          <div className="grid grid-cols-1 gap-2">
                            {product.highlights.slice(0, 3).map((highlight, i) => (
                              <div key={i} className="flex items-center text-white/70 font-tech text-sm">
                                <div className="w-1.5 h-1.5 bg-solar-electric rounded-full mr-3" />
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-racing font-bold text-white mb-1">
                              {product.price}
                            </div>
                          </div>
                          
                          <Link href={`/products/${product.id}`}>
                            <button className="flex items-center text-solar-electric hover:text-solar-gold transition-colors font-tech font-semibold group-hover:translate-x-2 transition-transform">
                              Learn More
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-white/60" />
                </div>
                <h3 className="text-xl font-racing font-bold text-white mb-3">No Products Found</h3>
                <p className="text-white/60 font-tech">Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-solar-electric/20 via-solar-gold/20 to-solar-racing/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-racing font-bold text-white mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-tech">
              Our engineering team can develop custom products tailored to your specific 
              racing requirements. Get in touch to discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
              <button className="btn-primary px-8 py-4 rounded-lg font-racing font-semibold">
                Contact Engineering
              </button>
              </Link>
              <Link href="/contact">
              <button className="btn-secondary px-8 py-4 rounded-lg font-racing font-semibold">
                Request Quote
              </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}