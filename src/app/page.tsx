'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Navigation from '@/components/layout/Navigation/Navigation'
import './page.scss'

// Lazy load sections to improve initial page load
const HeroSection = dynamic(() => import('@/components/sections/HeroSection/HeroSection'), {
  loading: () => <div className="h-96 bg-gradient-to-r from-teal-50 to-orange-50 animate-pulse rounded-2xl" />
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection/FeaturesSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})

const TestimonialSection = dynamic(() => import('@/components/sections/TestimonialSection/TestimonialSection'), {
  loading: () => <div className="h-32 bg-orange-50 animate-pulse rounded-xl" />
})

const CTASection = dynamic(() => import('@/components/sections/CTASection/CTASection'), {
  loading: () => <div className="h-32 bg-teal-600 animate-pulse rounded-xl" />
})

const PricingSection = dynamic(() => import('@/components/sections/PricingSection/PricingSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})

const AboutSection = dynamic(() => import('@/components/sections/AboutSection/AboutSection'), {
  loading: () => <div className="h-64 bg-orange-50 animate-pulse rounded-xl" />
})

const FAQSection = dynamic(() => import('@/components/sections/FAQSection/FAQSection'), {
  loading: () => <div className="h-64 bg-teal-50 animate-pulse rounded-xl" />
})

const FloatingChatbot = dynamic(() => import('@/components/ai/FloatingChatbot'), {
  loading: () => null
})

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (status === 'authenticated' && session) {
      router.push('/dashboard')
    }
  }, [session, status, router])

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="home-page">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
        </div>
      </div>
    )
  }

  // If user is authenticated, don't render the landing page (they'll be redirected)
  if (status === 'authenticated' && session) {
    return null
  }

  // Show landing page for unauthenticated users
  return (
    <div className="home-page">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
      <FloatingChatbot />
    </div>
  )
}
