'use client'

import { useState } from 'react'
import { FadeInUp, FadeIn, ScaleIn } from '@/components/ui/OptimizedMotion'
import { ArrowRight, PawPrint } from 'lucide-react'
import Image from 'next/image'
import AuthModal from '@/components/auth/AuthModal'

export default function HeroSection() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen)

  return (
    <section className="relative py-8 px-8 h-[700px]" style={{ backgroundColor: '#FEFBEE' }} aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Content */}
          <FadeInUp className="text-center md:text-left h-full min-h-[700px] flex flex-col justify-center py-12 md:max-w-[480px]">
            <h1 className="text-5xl md:text-6xl font-bold !mb-8 font-poppins" style={{ color: '#14504E' }}>
              A Healthier, Happier Life for Your Pets
            </h1>
            <p className="text-xl text-gray-600 !mb-8 leading-relaxed font-inter">
              Track health, log memories, and keep your pets thriving — all in one place.
            </p>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={toggleAuthModal}
                className="text-white px-6 py-3 rounded-2xl shadow-md transition-colors font-semibold text-base font-poppins"
                style={{ backgroundColor: '#2c8d9b', color: 'white' }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#247a85'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2c8d9b'}
              >
                Start Free Journal
              </button>
              <button 
                onClick={toggleAuthModal}
                className="px-6 py-3 rounded-2xl shadow-md transition-colors font-semibold text-base font-poppins border-2"
                style={{ backgroundColor: '#FEFBEE', color: '#2c8d9b', borderColor: '#FE9F72' }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#F5F0E8'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FEFBEE'}
              >
                See How It Works
              </button>
            </div>
          </FadeInUp>

          {/* Right side - Pet Illustrations */}
          <FadeInUp delay={0.3} className="flex justify-center items-center relative h-full">
            <div className="relative w-full h-full min-h-[700px] max-w-[600px] mx-auto">
              <Image 
                src="/images/icons/catdog.png" 
                alt="Happy Cat and Dog" 
                fill 
                className="object-contain drop-shadow-lg scale-110" 
                priority
              />
            </div>
          </FadeInUp>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  )
}
