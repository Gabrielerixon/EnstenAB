// app/admin/blog/page.tsx - Enhanced Blog Management Interface
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  Calendar, 
  Tag,
  Search,
  Filter,
  MoreHorizontal,
  ArrowLeft,
  Clock,
  User,
  FileText
} from 'lucide-react'
import { auth } from '@/lib/firebase'
import { BlogService } from '@/lib/blog-service'
import { Article, ArticleCategory } from '@/lib/types'
import { Button } from '@/components/common/Button'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function BlogAdminPage() {
  const [user, loading] = useAuthState(auth)
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all')
  const [isCreating, setIsCreating] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'technical-guide',
    tags: [],
    featuredImage: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  // Load articles
  useEffect(() => {
    if (user) {
      loadArticles()
    }
  }, [user])

  // Filter articles
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

  const loadArticles = async () => {
    try {
      setIsLoading(true)
      const fetchedArticles = await BlogService.getArticles()
      setArticles(fetchedArticles)
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'technical-guide',
      tags: [],
      featuredImage: ''
    })
    setIsCreating(false)
    setEditingArticle(null)
  }

  const handleSave = async () => {
    if (!user) return

    try {
      setIsSaving(true)
      
      const articleData: Partial<Article> = {
        ...formData,
        author: {
          id: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'Unknown',
          role: getAuthorRole(user.email || ''),
          bio: 'Solar racing expert and engineer',
          image: '/images/team/default.jpg',
          email: user.email || ''
        },
        id: editingArticle?.id || `article-${Date.now()}`,
        publishedAt: editingArticle?.publishedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readingTime: Math.ceil((formData.content?.split(' ').length || 0) / 200),
        featuredImage: formData.featuredImage || '/images/blog/default.jpg'
      }

      if (editingArticle) {
        await BlogService.updateArticle(editingArticle.id, articleData)
      } else {
        await BlogService.createArticle(articleData as Omit<Article, 'id'>)
      }

      await loadArticles()
      resetForm()
    } catch (error) {
      console.error('Error saving article:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await BlogService.deleteArticle(id)
        await loadArticles()
      } catch (error) {
        console.error('Error deleting article:', error)
      }
    }
  }

  const startEdit = (article: Article) => {
    setEditingArticle(article)
    setFormData(article)
    setIsCreating(true)
  }

  const getAuthorRole = (email: string): string => {
    switch (email) {
      case 'oskar@ensten.org': return 'System Administrator'
      case 'erik@ensten.org': return 'Chief Operating Officer'
      case 'goncalo@ensten.org': return 'Chief Product Officer'
      case 'daniel@ensten.org': return 'Technical Engineer'
      case 'linus@ensten.org': return 'Technical Engineer'
      default: return 'Content Manager'
    }
  }

  const handleTagAdd = (tag: string) => {
    if (tag.trim() && !formData.tags?.includes(tag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag.trim()]
      })
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove) || []
    })
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech">Loading blog management...</p>
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
                  Blog Management
                </h1>
                <p className="text-white/70 text-sm font-tech">
                  Create and manage educational content
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsCreating(true)}
              variant="primary"
              icon={<Plus className="w-5 h-5" />}
            >
              New Article
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Articles List - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Filters */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ArticleCategory | 'all')}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                >
                  <option value="all">All Categories</option>
                  <option value="technical-guide">Technical Guides</option>
                  <option value="solar-racing">Solar Racing</option>
                  <option value="news">News</option>
                  <option value="case-study">Case Studies</option>
                  <option value="tutorial">Tutorials</option>
                </select>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-white/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-solar-electric text-white rounded-full text-xs font-tech font-semibold">
                          {article.category.replace('-', ' ').toUpperCase()}
                        </span>
                        <div className="flex items-center text-xs text-white/60 font-tech">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <div className="flex items-center text-xs text-white/60 font-tech">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readingTime} min read
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-racing font-bold text-white mb-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-white/70 font-tech text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-white/60 font-tech">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {article.author.name}
                        </div>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            {article.tags.slice(0, 2).join(', ')}
                            {article.tags.length > 2 && ` +${article.tags.length - 2}`}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/education/${article.id}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => startEdit(article)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(article.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <h3 className="text-lg font-racing font-bold text-white mb-2">No Articles Found</h3>
                  <p className="text-white/60 font-tech">
                    {searchQuery || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Create your first article to get started.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Create/Edit Form - 1 column */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="lg:col-span-1"
              >
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 sticky top-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-racing font-bold text-white">
                      {editingArticle ? 'Edit Article' : 'New Article'}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={resetForm}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Title */}
                    <div>
                      <label className="block text-white font-tech font-semibold mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                        placeholder="Article title..."
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-white font-tech font-semibold mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as ArticleCategory })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                      >
                        <option value="technical-guide">Technical Guide</option>
                        <option value="solar-racing">Solar Racing</option>
                        <option value="news">News</option>
                        <option value="case-study">Case Study</option>
                        <option value="tutorial">Tutorial</option>
                      </select>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-white font-tech font-semibold mb-2">
                        Excerpt *
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric resize-none"
                        placeholder="Brief description..."
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-white font-tech font-semibold mb-2">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-solar-electric/20 text-solar-electric rounded text-xs font-tech flex items-center"
                          >
                            {tag}
                            <button
                              onClick={() => handleTagRemove(tag)}
                              className="ml-1 hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add tag and press Enter"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleTagAdd(e.currentTarget.value)
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-white font-tech font-semibold mb-2">
                        Content *
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={12}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric resize-none"
                        placeholder="Article content in Markdown format..."
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-white/20">
                      <Button
                        onClick={handleSave}
                        variant="primary"
                        fullWidth
                        loading={isSaving}
                        icon={<Save className="w-4 h-4" />}
                      >
                        {isSaving ? 'Saving...' : 'Save Article'}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}