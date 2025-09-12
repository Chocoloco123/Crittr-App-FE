'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AuthModal from '@/components/auth/AuthModal'
import './CTASection.scss'

export default function CTASection() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen)

  return (
    <section className="cta-section">
      {/* Decorative paw prints */}
      <div className="cta-decorative-paws">
        <div className="cta-paw-1">🐾</div>
        <div className="cta-paw-2">🐾</div>
        <div className="cta-paw-3">🐾</div>
        <div className="cta-paw-4">🐾</div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="cta-content"
      >
        <h2 className="cta-title">Ready to start your pet's journey?</h2>
        <p className="cta-subtitle">
          Join thousands of pet parents who trust Crittr to keep their furry family members healthy and happy.
        </p>
        <button 
          onClick={toggleAuthModal}
          className="cta-button"
        >
          Create Your Free Journal Today
        </button>
      </motion.div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  )
}
