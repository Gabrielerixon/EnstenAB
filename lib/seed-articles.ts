// lib/seed-articles.ts - Utility to seed Firebase with mock articles
import { BlogService } from './blog-service'
import { Article } from './types'

// Mock articles data that was in your education page
const seedArticles: Omit<Article, 'id'>[] = [
  {
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

// Function to seed articles to Firebase
export async function seedArticlesToFirebase(): Promise<void> {
  console.log('Starting to seed articles to Firebase...')
  
  try {
    // Get existing articles to avoid duplicates
    const existingArticles = await BlogService.getArticles()
    console.log(`Found ${existingArticles.length} existing articles`)
    
    for (const article of seedArticles) {
      // Check if article already exists by title
      const exists = existingArticles.some(existing => existing.title === article.title)
      
      if (!exists) {
        console.log(`Creating article: ${article.title}`)
        const articleId = await BlogService.createArticle(article)
        if (articleId) {
          console.log(`✅ Created article with ID: ${articleId}`)
        } else {
          console.log(`❌ Failed to create article: ${article.title}`)
        }
      } else {
        console.log(`⏭️  Article already exists: ${article.title}`)
      }
    }
    
    console.log('✅ Finished seeding articles!')
  } catch (error) {
    console.error('❌ Error seeding articles:', error)
    throw error
  }
}

// Function to clear all articles (use with caution!)
export async function clearAllArticles(): Promise<void> {
  console.log('⚠️  Starting to clear all articles...')
  
  try {
    const articles = await BlogService.getArticles()
    console.log(`Found ${articles.length} articles to delete`)
    
    for (const article of articles) {
      console.log(`Deleting article: ${article.title}`)
      const success = await BlogService.deleteArticle(article.id)
      if (success) {
        console.log(`✅ Deleted: ${article.title}`)
      } else {
        console.log(`❌ Failed to delete: ${article.title}`)
      }
    }
    
    console.log('✅ Finished clearing articles!')
  } catch (error) {
    console.error('❌ Error clearing articles:', error)
    throw error
  }
}