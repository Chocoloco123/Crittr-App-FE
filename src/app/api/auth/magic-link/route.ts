import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Store magic link in database
    await prisma.magicLink.create({
      data: {
        email: email.toLowerCase().trim(),
        token,
        expiresAt,
      }
    })

    // Send email (we'll implement this next)
    const emailSent = await sendMagicLinkEmail(email, token)
    
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send magic link email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Magic link sent successfully',
      email: email
    })

  } catch (error) {
    console.error('Magic link error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendMagicLinkEmail(email: string, token: string): Promise<boolean> {
  try {
    // For now, we'll use a simple console log
    // In production, you'd use Resend, SendGrid, or another email service
    const magicLinkUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify?token=${token}`
    
    console.log(`📧 Magic Link for ${email}: ${magicLinkUrl}`)
    
    // TODO: Replace with actual email service
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'Crittr <noreply@crittr.app>',
    //   to: [email],
    //   subject: '🐾 Sign in to Crittr',
    //   html: generateMagicLinkEmailHTML(magicLinkUrl)
    // })
    
    return true
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

function generateMagicLinkEmailHTML(magicLinkUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Sign in to Crittr</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0ea5e9, #22c55e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #0ea5e9; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🐾 Welcome to Crittr!</h1>
          <p>Your pet's health journey starts here</p>
        </div>
        <div class="content">
          <h2>Sign in to your account</h2>
          <p>Click the button below to securely sign in to your Crittr account:</p>
          <a href="${magicLinkUrl}" class="button">Sign In to Crittr</a>
          <p><strong>This link expires in 15 minutes for security.</strong></p>
          <p>If you didn't request this sign-in link, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>© 2024 Crittr - The journaling and tracking app for pet parents</p>
        </div>
      </div>
    </body>
    </html>
  `
}
