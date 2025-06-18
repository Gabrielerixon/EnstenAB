// components/blog/BlogCard.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock,  ArrowRight } from 'lucide-react'
import { Article } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  article: Article
  featured?: boolean
  index?: number
}

export const BlogCard = ({ article, featured = false, index = 0 }: BlogCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 }
    }
  }

  if (featured) {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="group relative col-span-full lg:col-span-2 h-96 lg:h-[500px] overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-solar-electric/20 to-solar-racing/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Featured badge */}
        <div className="absolute top-6 left-6 z-10 bg-solar-racing text-white px-4 py-2 rounded-full text-sm font-tech font-semibold">
          Featured Article
        </div>
        
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <div className="mb-4">
            <div className="flex items-center gap-4 text-sm text-white/80 mb-3">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readingTime} min read
              </span>
              <span className="px-3 py-1 bg-solar-electric/20 rounded-full text-xs font-semibold">
                {article.category.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-racing font-bold mb-4 group-hover:text-solar-electric transition-colors">
              {article.title}
            </h2>
            
            <p className="text-lg text-white/90 font-tech leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-solar-gradient rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-racing font-bold text-sm">
                    {article.author.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-tech font-semibold">{article.author.name}</p>
                  <p className="text-sm text-white/70">{article.author.role}</p>
                </div>
              </div>
              
              <Link href={`/education/${article.id}`}>
                <button className="flex items-center text-solar-electric hover:text-solar-gold transition-colors group-hover:translate-x-2 transition-transform font-tech font-semibold">
                  Read More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300 card-hover"
    >
      <div className="aspect-video bg-gradient-to-br from-solar-electric/20 to-solar-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-solar-electric/90 text-white rounded-full text-xs font-tech font-semibold">
            {article.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-white/60 mb-3 font-tech">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {article.readingTime} min
          </span>
        </div>
        
        <h3 className="text-xl font-racing font-bold text-white mb-3 group-hover:text-solar-electric transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-white/80 font-tech leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-solar-gradient rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-racing font-bold text-xs">
                {article.author.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-white font-tech text-sm font-semibold">{article.author.name}</p>
              <p className="text-white/60 text-xs">{article.author.role}</p>
            </div>
          </div>
          
          <Link href={`/education/${article.id}`}>
            <button className="text-solar-electric hover:text-solar-gold transition-colors group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}