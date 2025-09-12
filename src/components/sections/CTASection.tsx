'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AuthModal from '@/components/auth/AuthModal'

export default function CTASection() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen)

  return (
    <section className="px-8 py-16 text-center bg-teal-600 text-white relative overflow-hidden">
      {/* Decorative paw prints */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 text-4xl">🐾</div>
        <div className="absolute top-8 right-8 text-3xl">🐾</div>
        <div className="absolute bottom-8 left-8 text-3xl">🐾</div>
        <div className="absolute bottom-4 right-4 text-4xl">🐾</div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-3xl font-bold !mb-5 text-white">Ready to start your pet's journey?</h2>
        <button 
          onClick={toggleAuthModal}
          className="text-white px-5 py-2.5 rounded-2xl shadow-md transition-colors font-semibold text-sm font-poppins"
          style={{ backgroundColor: '#FE9F72' }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e88a5a'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FE9F72'}
        >
          Create Your Free Journal Today
        </button>
      </motion.div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  )
}
