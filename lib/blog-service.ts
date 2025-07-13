// lib/blog-service.ts - FIXED VERSION with better error handling - FIXED ESLint errors
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { db } from './firebase'
import { Article } from './types'

const COLLECTION_NAME = 'articles'

// Interface for update data to replace 'any' type
interface UpdateData {
  [key: string]: unknown
  updatedAt?: ReturnType<typeof serverTimestamp>
  publishedAt?: Timestamp | string
}

export class BlogService {
  
  // Get all articles
  static async getArticles(): Promise<Article[]> {
    try {
      console.log('📖 Fetching all articles from Firestore...')
      const q = query(
        collection(db, COLLECTION_NAME), 
        orderBy('publishedAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      
      const articles = querySnapshot.docs.map(doc => {
        const data = doc.data()
        console.log('📄 Processing article:', doc.id, data.title)
        return {
          id: doc.id,
          ...data,
          // Fix the Timestamp conversion
          publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : data.publishedAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Article
      })
      
      console.log('✅ Successfully loaded', articles.length, 'articles')
      return articles
    } catch (error) {
      console.error('❌ Error fetching articles:', error)
      return []
    }
  }

  // Get article by ID
  static async getArticle(id: string): Promise<Article | null> {
    try {
      console.log('🔍 Fetching article with ID:', id)
      const docRef = doc(db, COLLECTION_NAME, id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        console.log('✅ Found article:', data.title)
        return {
          id: docSnap.id,
          ...data,
          // Fix the Timestamp conversion
          publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : data.publishedAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Article
      } else {
        console.log('❌ Article not found with ID:', id)
        return null
      }
    } catch (error) {
      console.error('❌ Error fetching article:', error)
      return null
    }
  }

  // Create new article - FIXED to use setDoc instead of addDoc for custom IDs
  static async createArticle(article: Omit<Article, 'id'>): Promise<string | null> {
    try {
      // Generate a clean ID
      const articleId = `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      console.log('📝 Creating article with ID:', articleId)
      
      const articleData = {
        ...article,
        publishedAt: article.publishedAt ? Timestamp.fromDate(new Date(article.publishedAt)) : serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
      
      console.log('💾 Article data to save:', articleData)
      
      // Use setDoc with custom ID instead of addDoc
      const docRef = doc(db, COLLECTION_NAME, articleId)
      await setDoc(docRef, articleData)
      
      console.log('✅ Article created successfully with ID:', articleId)
      return articleId
    } catch (error) {
      console.error('❌ Error creating article:', error)
      return null
    }
  }

  // Update article - FIXED with better error handling and type safety
  static async updateArticle(id: string, updates: Partial<Article>): Promise<boolean> {
    try {
      console.log('✏️ Updating article with ID:', id)
      console.log('📝 Updates to apply:', updates)
      
      const docRef = doc(db, COLLECTION_NAME, id)
      
      // First check if document exists
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        console.error('❌ Document does not exist:', id)
        throw new Error(`Article with ID ${id} does not exist`)
      }
      
      // Prepare update data with proper typing
      const updateData: UpdateData = {
        ...updates,
        updatedAt: serverTimestamp(),
      }
      
      // Handle publishedAt conversion if needed
      if (updates.publishedAt && typeof updates.publishedAt === 'string') {
        updateData.publishedAt = Timestamp.fromDate(new Date(updates.publishedAt))
      }
      
      // Remove undefined values and id field
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined || key === 'id') {
          delete updateData[key]
        }
      })
      
      console.log('💾 Final update data:', updateData)
      
      await updateDoc(docRef, updateData)
      console.log('✅ Article updated successfully')
      return true
    } catch (error) {
      console.error('❌ Error updating article:', error)
      throw error // Re-throw to handle in UI
    }
  }

  // Delete article - FIXED with better error handling
  static async deleteArticle(id: string): Promise<boolean> {
    try {
      console.log('🗑️ Deleting article with ID:', id)
      
      const docRef = doc(db, COLLECTION_NAME, id)
      
      // First check if document exists
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        console.error('❌ Document does not exist for deletion:', id)
        throw new Error(`Article with ID ${id} does not exist`)
      }
      
      await deleteDoc(docRef)
      console.log('✅ Article deleted successfully')
      return true
    } catch (error) {
      console.error('❌ Error deleting article:', error)
      throw error // Re-throw to handle in UI
    }
  }

  // Get articles by category
  static async getArticlesByCategory(category: string): Promise<Article[]> {
    try {
      console.log('🏷️ Fetching articles by category:', category)
      const q = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', category),
        orderBy('publishedAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      
      const articles = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : data.publishedAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Article
      })
      
      console.log('✅ Found', articles.length, 'articles in category:', category)
      return articles
    } catch (error) {
      console.error('❌ Error fetching articles by category:', error)
      return []
    }
  }

  
// lib/blog-service.ts - Add missing debugListAllArticles function
// Add this to the existing BlogService class:

// Debug function to list all articles (alias for debugListAllDocuments)
static async debugListAllArticles(): Promise<void> {
  try {
    console.log('🔍 DEBUG: Listing all articles in collection...')
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
    console.log('📊 Total articles:', querySnapshot.size)
    
    if (querySnapshot.empty) {
      console.log('❌ No articles found in Firebase collection')
      console.log('💡 Try seeding articles first')
      return
    }
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log('📄 Article ID:', doc.id)
      console.log('📝 Article data:', {
        title: data.title,
        category: data.category,
        author: data.author?.name || 'Unknown',
        publishedAt: data.publishedAt ? new Date(data.publishedAt.seconds * 1000).toLocaleString() : 'No date',
        tags: data.tags || []
      })
      console.log('---')
    })
  } catch (error) {
    console.error('❌ Debug error:', error)
  }
}

  // Get article count (for dashboard stats)
  static async getArticleCount(): Promise<number> {
    try {
      const articles = await this.getArticles()
      return articles.length
    } catch (error) {
      console.error('❌ Error getting article count:', error)
      return 0
    }
  }

  // Debug function to list all documents
  static async debugListAllDocuments(): Promise<void> {
    try {
      console.log('🔍 DEBUG: Listing all documents in collection...')
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
      console.log('📊 Total documents:', querySnapshot.size)
      
      querySnapshot.forEach((doc) => {
        console.log('📄 Document ID:', doc.id)
        console.log('📝 Document data:', doc.data())
        console.log('---')
      })
    } catch (error) {
      console.error('❌ Debug error:', error)
    }
  }
}