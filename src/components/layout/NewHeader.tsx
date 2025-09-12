'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import AuthModal from '@/components/auth/AuthModal'

export default function NewHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { data: session, status } = useSession()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen)
  
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/journal', label: 'Journal' },
    { href: '/analytics', label: 'Health' },
    { href: '#about', label: 'About' }
  ]

  return (
    <>
      <header className="bg-background shadow-sm sticky top-0 z-50 backdrop-blur-md w-full" role="banner">
        <div className="w-full px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="/" 
                className="flex items-center space-x-2 text-xl font-bold hover:text-teal-600 transition-colors group"
                aria-label="Crittr - Home"
              >
                <span className="text-2xl">🐾</span>
                <span className="text-2xl font-bold leading-none" style={{ color: '#14504E' }}>Crittr</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              {status === 'loading' ? (
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : session ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Welcome, {session.user?.name}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-white px-5 py-2.5 rounded-2xl shadow-md transition-colors font-semibold text-sm font-poppins"
                    style={{ backgroundColor: '#2c8d9b' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#247a85'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#2c8d9b'}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={toggleAuthModal}
                  className="text-white px-5 py-2.5 rounded-2xl shadow-md transition-colors font-semibold text-sm font-poppins"
                  style={{ backgroundColor: '#2c8d9b' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#247a85'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2c8d9b'}
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-teal-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-8 py-4 space-y-4">
                {navItems.map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className="block text-gray-700 hover:text-teal-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  {session ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Welcome, {session.user?.name}</p>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-white px-5 py-2.5 rounded-2xl shadow-md transition-colors font-semibold text-sm font-poppins"
                        style={{ backgroundColor: '#2c8d9b' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#247a85'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2c8d9b'}
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={toggleAuthModal}
                      className="w-full text-white px-5 py-2.5 rounded-2xl shadow-md transition-colors font-semibold text-sm font-poppins"
                      style={{ backgroundColor: '#2c8d9b' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#247a85'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#2c8d9b'}
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
