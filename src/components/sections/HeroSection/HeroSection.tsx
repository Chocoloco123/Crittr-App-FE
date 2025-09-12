'use client'

import { useState } from 'react'
import { FadeInUp, FadeIn, ScaleIn } from '@/components/ui/OptimizedMotion'
import { ArrowRight, PawPrint } from 'lucide-react'
import Image from 'next/image'
import AuthModal from '@/components/auth/AuthModal'
import './HeroSection.scss'

export default function HeroSection() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen)

  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-container">
        <div className="hero-grid">
          {/* Left side - Content */}
          <FadeInUp className="hero-content">
            <h1 className="hero-title">
              A Healthier, Happier Life for Your Pets
            </h1>
            
            {/* Mobile Image - appears below heading */}
            <div className="hero-image-mobile">
              <div className="hero-image-wrapper">
                <Image 
                  src="/images/icons/catdog.png" 
                  alt="Happy Cat and Dog" 
                  fill 
                  className="hero-image" 
                  priority
                />
              </div>
            </div>

            <p className="hero-description">
              Track health, log memories, and keep your pets thriving — all in one place.
            </p>
            <div className="hero-buttons">
              <button 
                onClick={toggleAuthModal}
                className="hero-primary-button"
              >
                Start Free Journal
              </button>
              <button 
                onClick={toggleAuthModal}
                className="hero-secondary-button"
              >
                See How It Works
              </button>
            </div>
          </FadeInUp>

          {/* Right side - Pet Illustrations */}
          <FadeInUp delay={0.3} className="hero-image-container">
            <div className="hero-image-wrapper">
              <Image 
                src="/images/icons/catdog.png" 
                alt="Happy Cat and Dog" 
                fill 
                className="hero-image" 
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
