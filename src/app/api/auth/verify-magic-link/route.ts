import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // Find and verify magic link
    const magicLink = await prisma.magicLink.findFirst({
      where: {
        token,
        isUsed: false,
        expiresAt: {
          gt: new Date()
        }
      }
    })

    if (!magicLink) {
      return NextResponse.json(
        { error: 'Invalid or expired magic link' },
        { status: 400 }
      )
    }

    // Mark magic link as used
    await prisma.magicLink.update({
      where: { id: magicLink.id },
      data: { isUsed: true }
    })

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: magicLink.email }
    })

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: magicLink.email,
          name: magicLink.email.split('@')[0]
        }
      })
    }

    // Generate JWT token for session
    const jwtToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    // Sync user data with backend (optional)
    await syncUserWithBackend(user)

    return NextResponse.json({
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token: jwtToken
    })

  } catch (error) {
    console.error('Magic link verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function syncUserWithBackend(user: any) {
  try {
    // Sync user data with your Python backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    
    await fetch(`${backendUrl}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name
      })
    })
    
    console.log(`✅ User ${user.email} synced with backend`)
  } catch (error) {
    console.error('Backend sync error:', error)
    // Don't fail the authentication if backend sync fails
  }
}
