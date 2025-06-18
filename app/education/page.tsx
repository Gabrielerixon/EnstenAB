// app/education/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Star } from 'lucide-react'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogFilters } from '@/components/blog/BlogFilters'
import { Article, ArticleCategory } from '@/lib/types'
import Link from 'next/link'

// Mock data - replace with Firebase data
const mockArticles: Article[] = [
  {
    id: 'getting-started-solar-racing',
    title: 'Getting Started with Solar Racing: A Complete Guide for New Teams',
    excerpt: 'Everything you need to know to start your solar racing journey, from team formation to your first competition.',
    content: `# Getting Started with Solar Racing

Solar racing represents the ultimate intersection of engineering innovation, sustainable technology, and competitive motorsport. For university teams looking to enter this exciting field, the journey can seem overwhelming at first. This comprehensive guide will walk you through everything you need to know to get started.

## Understanding Solar Racing

Solar racing is more than just building a car with solar panels. It's about creating the most efficient vehicle possible that can harness energy from the sun and use it to travel long distances at competitive speeds. The Bridgestone World Solar Challenge (BWSC) in Australia is the premier event, where teams race 3,000 kilometers across the continent.

## Building Your Team

The most successful solar racing teams are interdisciplinary, combining expertise from:

- **Electrical Engineering**: Battery management, motor control, solar array optimization
- **Mechanical Engineering**: Chassis design, aerodynamics, suspension systems
- **Computer Science**: Telemetry systems, strategy algorithms, real-time optimization
- **Business/Management**: Sponsorship, project management, logistics

## Key Technologies

Modern solar racing cars incorporate cutting-edge technologies:

1. **High-efficiency solar cells** (often over 22% efficiency)
2. **Advanced battery management systems**
3. **Lightweight composite materials** (carbon fiber, fiberglass)
4. **Sophisticated control systems** like the Current One from Ensten AB

## Your First Steps

1. **Research existing teams** and learn from their experiences
2. **Secure university support** and workshop access
3. **Start with a smaller project** before attempting a full car
4. **Connect with the solar racing community** through forums and events
5. **Begin fundraising early** - a competitive car requires significant investment

The journey is challenging but incredibly rewarding. Every year, student teams push the boundaries of what's possible with solar technology, contributing to advances that benefit the entire automotive industry.`,
    author: {
      id: 'erik-andersson',
      name: 'Erik Andersson',
      role: 'Chief Technology Officer',
      bio: 'Solar racing expert with 10+ years experience in the field',
      image: '/images/team/erik.jpg',
      email: 'erik@ensten.org'
    },
    publishedAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
    category: 'tutorial',
    tags: ['beginner', 'solar racing', 'team building', 'bwsc'],
    featuredImage: '/images/blog/getting-started-hero.jpg',
    readingTime: 8
  },
  {
    id: 'current-one-integration-guide',
    title: 'Integrating Current One: Advanced Control Systems for Solar Cars',
    excerpt: 'Learn how to integrate the Current One control unit into your solar racing vehicle for optimal performance.',
    content: `# Current One Integration Guide

The Current One control unit represents a significant advancement in solar racing technology. This guide covers the complete integration process for teams looking to implement this system in their vehicles.

## Pre-Integration Planning

Before beginning the integration process, ensure your team has:

- Completed electrical system design
- Identified mounting locations
- Prepared wiring harnesses
- Reviewed safety protocols

## Hardware Installation

The Current One unit should be mounted in a vibration-isolated enclosure within the vehicle's protected zone. Key considerations include:

### Mounting Requirements
- Secure mounting with anti-vibration dampeners
- Easy access for maintenance and diagnostics
- Protection from environmental factors
- Adequate ventilation for cooling

### Electrical Connections
The Current One interfaces with multiple vehicle systems:

1. **Power Input**: 12-48V DC from main battery pack
2. **CAN Bus**: Primary communication with all vehicle systems
3. **Analog Inputs**: Sensor readings (temperature, pressure, etc.)
4. **Digital I/O**: Control signals for various subsystems

## Software Configuration

The Current One comes with comprehensive software that can be customized for your specific vehicle requirements:

### Initial Setup
1. Connect to the unit via USB or CAN
2. Load your vehicle-specific configuration
3. Calibrate sensor inputs
4. Test all communication links

### Advanced Features
- Real-time telemetry streaming
- Predictive power management
- Automated fault detection
- Race strategy optimization

## Testing and Validation

Before competition, extensive testing is essential:

1. **Bench testing** with simulated inputs
2. **Static vehicle testing** with all systems connected
3. **Low-speed validation** in controlled environment
4. **Full-speed testing** on closed course

## Troubleshooting Common Issues

Most integration issues fall into these categories:

- **Communication errors**: Check CAN bus termination and wiring
- **Power supply issues**: Verify voltage levels and current capacity
- **Sensor calibration**: Ensure all inputs are properly scaled
- **Software conflicts**: Update firmware and check compatibility

The Current One system is designed to integrate seamlessly with existing solar car architectures while providing the advanced features needed for competitive racing.`,
    author: {
      id: 'erik-andersson',
      name: 'Erik Andersson',
      role: 'Chief Technology Officer',
      bio: 'Solar racing expert with 10+ years experience in the field',
      image: '/images/team/erik.jpg',
      email: 'erik@ensten.org'
    },
    publishedAt: '2024-12-10T14:30:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
    category: 'technical-guide',
    tags: ['current one', 'integration', 'control systems', 'technical'],
    featuredImage: '/images/blog/current-one-integration.jpg',
    readingTime: 12
  },
  {
    id: 'bwsc-2025-preparation',
    title: 'BWSC 2025: What Teams Need to Know',
    excerpt: 'Essential information for teams preparing for the Bridgestone World Solar Challenge 2025, including rule changes and key dates.',
    content: `# BWSC 2025: Preparation Guide

The Bridgestone World Solar Challenge 2025 promises to be the most competitive event yet. With new regulations and advanced technologies, teams need to prepare thoroughly.

## Key Rule Changes for 2025

Several important changes have been announced:

### Safety Requirements
- Enhanced driver protection systems
- Improved battery safety protocols
- Updated electrical safety standards

### Technical Regulations
- New aerodynamic restrictions
- Updated solar array specifications
- Modified battery capacity limits

## Important Dates

- **Registration Opens**: January 15, 2025
- **Scrutineering Begins**: October 8, 2025
- **Race Start**: October 12, 2025
- **Finish Deadline**: October 19, 2025

## Preparation Timeline

### 12 Months Before (Now)
- Finalize team organization
- Secure primary funding
- Begin preliminary design work
- Order long-lead-time components

### 9 Months Before
- Complete detailed design
- Begin manufacturing major components
- Conduct initial testing
- Secure additional sponsorship

### 6 Months Before
- Complete vehicle assembly
- Begin comprehensive testing
- Develop race strategy
- Train drivers

### 3 Months Before
- Final vehicle optimization
- Complete documentation
- Logistics planning
- Team preparation

## Success Strategies

The most successful teams focus on:

1. **Reliability over speed** - finish the race first
2. **Comprehensive testing** - identify issues early
3. **Team coordination** - practice makes perfect
4. **Weather adaptation** - be ready for anything
5. **Strategic thinking** - when to push, when to conserve

Start your preparation now to give your team the best chance of success in this ultimate solar racing challenge.`,
    author: {
      id: 'erik-andersson',
      name: 'Erik Andersson',
      role: 'Chief Technology Officer',
      bio: 'Solar racing expert with 10+ years experience in the field',
      image: '/images/team/erik.jpg',
      email: 'erik@ensten.org'
    },
    publishedAt: '2024-12-08T16:45:00Z',
    updatedAt: '2024-12-08T16:45:00Z',
    category: 'news',
    tags: ['bwsc', '2025', 'competition', 'preparation'],
    featuredImage: '/images/blog/bwsc-2025-prep.jpg',
    readingTime: 6
  }
]

export default function EducationPage() {
  const [articles] = useState<Article[]>(mockArticles)
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(mockArticles)
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

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
          {filteredArticles.length === 0 && (
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