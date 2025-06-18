// components/blog/BlogFilters.tsx
'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { ArticleCategory } from '@/lib/types'

interface BlogFiltersProps {
  categories: ArticleCategory[]
  selectedCategory: ArticleCategory | 'all'
  onCategoryChange: (category: ArticleCategory | 'all') => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const BlogFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: BlogFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categoryLabels: Record<ArticleCategory | 'all', string> = {
    'all': 'All Articles',
    'solar-racing': 'Solar Racing',
    'technical-guide': 'Technical Guides',
    'news': 'News & Updates',
    'case-study': 'Case Studies',
    'tutorial': 'Tutorials'
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-tech font-medium hover:border-white/40 transition-colors lg:hidden"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>

        <div className={`flex flex-wrap gap-3 ${isFilterOpen ? 'flex' : 'hidden lg:flex'}`}>
          {(['all', ...categories] as const).map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
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
      </div>
    </div>
  )
}