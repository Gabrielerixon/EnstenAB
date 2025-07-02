// app/education/page.tsx - FIXED TO USE FIREBASE
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Star } from 'lucide-react'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogFilters } from '@/components/blog/BlogFilters'
import { Article, ArticleCategory } from '@/lib/types'
import { BlogService } from '@/lib/blog-service'
import Link from 'next/link'

export default function EducationPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load articles from Firebase
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedArticles = await BlogService.getArticles()
        console.log('Fetched articles:', fetchedArticles) // Debug log
        setArticles(fetchedArticles)
      } catch (error) {
        console.error('Error loading articles:', error)
        setError('Failed to load articles. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Get unique categories from articles
  const categories: ArticleCategory[] = Array.from(
    new Set(articles.map(article => article.category))
  ) as ArticleCategory[]

  // Filter articles based on category and search
  useEffect(() => {
    let filtered = articles

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredArticles(filtered)
  }, [articles, selectedCategory, searchQuery])

  // Get featured article (most recent)
  const featuredArticle = filteredArticles[0]
  const regularArticles = filteredArticles.slice(1)

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
              <BookOpen className="w-8 h-8 text-solar-electric mr-3" />
              <span className="text-solar-electric font-tech font-semibold tracking-wider uppercase">
                Education Center
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-racing font-bold text-white mb-6">
              SOLAR RACING
              <span className="block text-gradient">KNOWLEDGE BASE</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-4xl mx-auto font-tech leading-relaxed">
              Learn from experts, discover advanced techniques, and stay updated with the latest 
              developments in solar racing technology. Knowledge that powers championship performance.
            </p>
            
            <div className="mt-8 h-px w-64 bg-solar-gradient mx-auto" />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { icon: <BookOpen className="w-6 h-6" />, value: `${articles.length}+`, label: 'Articles' },
              { icon: <Users className="w-6 h-6" />, value: '500+', label: 'Students Helped' },
              { icon: <Star className="w-6 h-6" />, value: '15+', label: 'Racing Teams' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-solar-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-racing font-bold text-solar-electric mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 font-tech text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <BlogFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white font-tech">Loading articles...</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-red-400" />
              </div>
              <h3 className="text-xl font-racing font-bold text-white mb-3">Error Loading Articles</h3>
              <p className="text-white/60 font-tech mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-primary px-6 py-3 rounded-lg font-tech font-semibold"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Articles Content - Only show when not loading and no error */}
          {!loading && !error && (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-16"
                >
                  <h2 className="text-2xl font-racing font-bold text-white mb-8 flex items-center">
                    <Star className="w-6 h-6 text-solar-gold mr-3" />
                    Featured Article
                  </h2>
                  <div className="grid">
                    <BlogCard article={featuredArticle} featured />
                  </div>
                </motion.div>
              )}

              {/* Regular Articles */}
              {regularArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <h2 className="text-2xl font-racing font-bold text-white mb-8">
                    Latest Articles
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularArticles.map((article, index) => (
                      <BlogCard key={article.id} article={article} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* No Results */}
              {filteredArticles.length === 0 && articles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-white/60" />
                  </div>
                  <h3 className="text-xl font-racing font-bold text-white mb-3">No Articles Found</h3>
                  <p className="text-white/60 font-tech">Try adjusting your search or filter criteria.</p>
                </motion.div>
              )}

              {/* No Articles in Database */}
              {articles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-white/60" />
                  </div>
                  <h3 className="text-xl font-racing font-bold text-white mb-3">No Articles Yet</h3>
                  <p className="text-white/60 font-tech mb-6">
                    Articles haven&apos;t been added to the database yet. Check the admin panel to add content.
                  </p>
                  <Link href="/admin/blog">
                    <button className="btn-primary px-6 py-3 rounded-lg font-tech font-semibold">
                      Go to Admin Panel
                    </button>
                  </Link>
                </motion.div>
              )}
            </>
          )}
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
              Ready to Start Your Solar Racing Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-tech">
              Get in touch with our engineering team to discuss your project requirements 
              and learn how Ensten technology can power your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary px-8 py-4 rounded-lg font-racing font-semibold">
                  Contact Our Engineers
                </button>
              </Link>
              <Link href="/products">
                <button className="btn-secondary px-8 py-4 rounded-lg font-racing font-semibold">
                  View Products
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}