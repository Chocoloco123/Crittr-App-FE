import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'

// Lazy load sections to improve initial page load
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 animate-pulse rounded-2xl" />
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})

const PricingSection = dynamic(() => import('@/components/sections/PricingSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <AboutSection />
    </>
  )
}
