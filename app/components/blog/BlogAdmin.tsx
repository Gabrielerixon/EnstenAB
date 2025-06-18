// components/blog/BlogAdmin.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, Eye, Calendar, Tag } from 'lucide-react'
import { Article, ArticleCategory, TeamMember } from '@/lib/types'
import { Button } from '@/components/common/Button'

// Mock data - replace with Firebase
const mockAuthors: TeamMember[] = [
  {
    id: 'author-1',
    name: 'Erik Andersson',
    role: 'Chief Technology Officer',
    bio: 'Solar racing expert with 10+ years experience',
    image: '/images/team/erik.jpg',
    email: 'erik@ensten.org'
  }
]

interface BlogAdminProps {
  articles: Article[]
  onSave: (article: Partial<Article>) => void
  onDelete: (id: string) => void
}

export const BlogAdmin = ({ articles, onSave, onDelete }: BlogAdminProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'technical-guide',
    tags: [],
    author: mockAuthors[0]
  })

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'technical-guide',
      tags: [],
      author: mockAuthors[0]
    })
    setIsCreating(false)
    setEditingArticle(null)
  }

  const handleSave = () => {
    const article: Partial<Article> = {
      ...formData,
      id: editingArticle?.id || `article-${Date.now()}`,
      publishedAt: editingArticle?.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readingTime: Math.ceil((formData.content?.split(' ').length || 0) / 200),
      featuredImage: formData.featuredImage || '/images/blog/default.jpg'
    }
    
    onSave(article)
    resetForm()
  }

  const startEdit = (article: Article) => {
    setEditingArticle(article)
    setFormData(article)
    setIsCreating(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-racing font-bold text-white mb-2">Blog Management</h1>
            <p className="text-white/70 font-tech">Create and manage educational content</p>
          </div>
          
          <Button
            onClick={() => setIsCreating(true)}
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
          >
            New Article
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Articles List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-racing font-bold text-white mb-4">Published Articles</h2>
            
            {articles.map((article) => (
              <motion.div
                key={article.id}
                layout
                className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-racing font-bold text-white mb-2">{article.title}</h3>
                    <p className="text-white/70 font-tech text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-white/60 font-tech">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {article.category}
                      </span>
                      <span>{article.readingTime} min read</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => startEdit(article)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(article.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Create/Edit Form */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="lg:col-span-1"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 sticky top-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-racing font-bold text-white">
                      {editingArticle ? 'Edit Article' : 'New Article'}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={resetForm}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-white font-tech font-semibold mb-2">Title</label>
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
                      <label className="block text-white font-tech font-semibold mb-2">Category</label>
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
                      <label className="block text-white font-tech font-semibold mb-2">Excerpt</label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric resize-none"
                        placeholder="Brief description..."
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-white font-tech font-semibold mb-2">Content</label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={8}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric resize-none"
                        placeholder="Article content in Markdown..."
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSave}
                        variant="primary"
                        fullWidth
                        icon={<Save className="w-4 h-4" />}
                      >
                        Save Article
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}