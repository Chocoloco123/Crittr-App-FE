import dynamic from 'next/dynamic'
import NewHeader from '@/components/layout/NewHeader/NewHeader'
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
  return (
    <div className="home-page">
      <NewHeader />
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
