// app/education/[slug]/page.tsx - UPPDATERAD MED STRUCTURED DATA
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, BookOpen, Tag, AlertCircle } from 'lucide-react'
import { Article } from '@/lib/types'
import { BlogService } from '@/lib/blog-service'
import { ArticleStructuredData } from '@/components/seo/StructuredData' // NYTT: Import structured data
import { formatDate } from '@/lib/utils'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Loading article with slug:', slug) // Debug log
        
        const fetchedArticle = await BlogService.getArticle(slug)
        console.log('Fetched article:', fetchedArticle) // Debug log
        
        if (!fetchedArticle) {
          // Try to find article by searching all articles for matching title/id
          console.log('Article not found by ID, searching all articles...') // Debug log
          const allArticles = await BlogService.getArticles()
          console.log('All articles:', allArticles) // Debug log
          
          // Try to find by partial match on ID or title
          const foundArticle = allArticles.find(a => 
            a.id === slug || 
            a.id.includes(slug) || 
            a.title.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(slug.toLowerCase())
          )
          
          if (foundArticle) {
            console.log('Found article by search:', foundArticle) // Debug log
            setArticle(foundArticle)
          } else {
            throw new Error(`Article not found. Available articles: ${allArticles.map(a => a.id).join(', ')}`)
          }
        } else {
          setArticle(fetchedArticle)
        }

        if (fetchedArticle) {
          // Load related articles from same category
          try {
            const related = await BlogService.getArticlesByCategory(fetchedArticle.category)
            setRelatedArticles(related.filter(a => a.id !== fetchedArticle.id).slice(0, 3))
          } catch (relatedError) {
            console.error('Error loading related articles:', relatedError)
            // Don't fail the whole page for related articles
          }
        }
      } catch (error) {
        console.error('Error loading article:', error)
        setError(error instanceof Error ? error.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadArticle()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white max-w-2xl mx-auto px-6">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-racing font-bold mb-2">Error Loading Article</h1>
          <p className="text-white/70 font-tech mb-6">{error}</p>
          <div className="space-y-3">
            <Link href="/education">
              <button className="btn-primary px-6 py-3 rounded-lg font-tech font-semibold mr-4">
                Back to Education
              </button>
            </Link>
            <Link href="/admin/blog">
              <button className="btn-secondary px-6 py-3 rounded-lg font-tech font-semibold">
                Go to Admin
              </button>
            </Link>
          </div>
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20 text-left">
            <p className="text-white/60 font-tech text-sm">
              <strong>Debug info:</strong><br />
              Requested slug: <code>{slug}</code><br />
              This usually happens when the article ID doesn&apos;t match the URL format.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <BookOpen className="w-16 h-16 text-white/60 mx-auto mb-4" />
          <h1 className="text-2xl font-racing font-bold mb-2">Article Not Found</h1>
          <p className="text-white/70 font-tech mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/education">
            <button className="btn-primary px-6 py-3 rounded-lg font-tech font-semibold">
              Back to Education
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* NYTT: Article Structured Data - Lägg till detta längst upp */}
      <ArticleStructuredData 
        title={article.title}
        description={article.excerpt}
        image={`https://ensten.org${article.featuredImage}`}
        author={article.author.name}
        publishedDate={article.publishedAt}
        modifiedDate={article.updatedAt}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
        {/* Background Effects */}
        <div className="absolute inset-0 tech-grid opacity-20" />
        
        {/* Article Header */}
        <section className="relative pt-32 pb-16">
          <div className="container mx-auto px-6">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center mb-8"
            >
              <Link href="/education" className="flex items-center text-white/60 hover:text-solar-electric transition-colors font-tech">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Education
              </Link>
            </motion.div>

            {/* Article Meta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <span className="px-4 py-2 bg-solar-electric text-white rounded-full text-sm font-tech font-semibold">
                    {article.category.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-racing font-bold text-white mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <p className="text-xl text-white/80 font-tech leading-relaxed mb-8 max-w-3xl mx-auto">
                  {article.excerpt}
                </p>
                
                {/* Article Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 font-tech">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{article.readingTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
                  <Tag className="w-4 h-4 text-white/60" />
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm font-tech"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Article Content - REST OF YOUR EXISTING CODE... */}
        <section className="relative pb-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-12">
                
                {/* Article Body */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="text-white/90 font-tech leading-relaxed space-y-6">
                    {article.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h1 key={index} className="text-3xl font-racing font-bold text-white mt-12 mb-6 first:mt-0">
                            {paragraph.replace('# ', '')}
                          </h1>
                        )
                      }
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-2xl font-racing font-bold text-white mt-10 mb-4">
                            {paragraph.replace('## ', '')}
                          </h2>
                        )
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-xl font-racing font-bold text-white mt-8 mb-3">
                            {paragraph.replace('### ', '')}
                          </h3>
                        )
                      }
                      if (paragraph.trim() === '') {
                        return <div key={index} className="h-4" />
                      }
                      return (
                        <p key={index} className="text-lg leading-relaxed">
                          {paragraph}
                        </p>
                      )
                    })}
                  </div>
                </div>

                {/* Author Info */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-solar-gradient rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-racing font-bold text-lg">
                        {article.author.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-racing font-bold text-white mb-1">
                        {article.author.name}
                      </h4>
                      <p className="text-solar-electric font-tech font-semibold mb-2">
                        {article.author.role}
                      </p>
                      <p className="text-white/70 font-tech">
                        {article.author.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="relative py-24 bg-gradient-to-r from-solar-slate/50 to-solar-carbon/50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-3xl font-racing font-bold text-white mb-12 text-center">
                  Related Articles
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedArticles.map((relatedArticle, index) => (
                    <Link key={relatedArticle.id} href={`/education/${relatedArticle.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-white/40 transition-all duration-300 card-hover cursor-pointer"
                      >
                        <span className="inline-block px-3 py-1 bg-solar-electric text-white rounded-full text-xs font-tech font-semibold mb-4">
                          {relatedArticle.category.replace('-', ' ').toUpperCase()}
                        </span>
                        
                        <h3 className="text-lg font-racing font-bold text-white mb-3 line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        
                        <p className="text-white/70 font-tech text-sm line-clamp-3 mb-4">
                          {relatedArticle.excerpt}
                        </p>
                        
                        <div className="flex items-center text-xs text-white/60 font-tech">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{relatedArticle.readingTime} min read</span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}