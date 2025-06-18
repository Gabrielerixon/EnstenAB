// ===== FIXED BLOG SERVICE =====
// lib/blog-service.ts - FIXED VERSION

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'
import { Article } from './types'

const COLLECTION_NAME = 'articles'

export class BlogService {
  
  // Get all articles
  static async getArticles(): Promise<Article[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        orderBy('publishedAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          // Fix the Timestamp conversion
          publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : data.publishedAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Article
      })
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  }

  // Get article by ID
  static async getArticle(id: string): Promise<Article | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          ...data,
          // Fix the Timestamp conversion
          publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : data.publishedAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Article
      }
      
      return null
    } catch (error) {
      console.error('Error fetching article:', error)
      return null
    }
  }

  // Create new article
  static async createArticle(article: Omit<Article, 'id'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...article,
        publishedAt: article.publishedAt ? Timestamp.fromDate(new Date(article.publishedAt)) : serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      
      return docRef.id
    } catch (error) {
      console.error('Error creating article:', error)
      return null
    }
  }

  // Update article
  static async updateArticle(id: string, updates: Partial<Article>): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      
      const updateData: any = {
        ...updates,
        updatedAt: serverTimestamp(),
      }
      
      if (updates.publishedAt) {
        updateData.publishedAt = Timestamp.fromDate(new Date(updates.publishedAt))
      }
      
      await updateDoc(docRef, updateData)
      return true
    } catch (error) {
      console.error('Error updating article:', error)
      return false
    }
  }

  // Delete article
  static async deleteArticle(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id))
      return true
    } catch (error) {
      console.error('Error deleting article:', error)
      return false
    }
  }

  // Get articles by category
  static async getArticlesByCategory(category: string): Promise<Article[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', category),
        orderBy('publishedAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : data.publishedAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Article
      })
    } catch (error) {
      console.error('Error fetching articles by category:', error)
      return []
    }
  }
}