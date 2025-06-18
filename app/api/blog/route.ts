// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/lib/blog-service'
import { verifyAdminUser } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let articles
    if (category && category !== 'all') {
      articles = await BlogService.getArticlesByCategory(category)
    } else {
      articles = await BlogService.getArticles()
    }
    
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.split('Bearer ')[1]
    // You'll need to verify the token and get uid
    // const decodedToken = await adminAuth.verifyIdToken(token)
    // const isAdmin = await verifyAdminUser(decodedToken.uid)
    
    // if (!isAdmin) {
    //   return NextResponse.json(
    //     { error: 'Insufficient permissions' },
    //     { status: 403 }
    //   )
    // }

    const articleData = await request.json()
    const articleId = await BlogService.createArticle(articleData)
    
    return NextResponse.json({ id: articleId })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}