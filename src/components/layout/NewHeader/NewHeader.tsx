'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import AuthModal from '@/components/auth/AuthModal'
import './NewHeader.scss'

export default function NewHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { data: session, status } = useSession()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleNavDropdown = () => setIsNavDropdownOpen(!isNavDropdownOpen)
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen)
  
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNavDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#about', label: 'About' },
    { href: '/dashboard', label: 'Dashboard' }
  ]

  return (
    <>
      <header className="header-container" role="banner">
        <div className="header-content">
          <div className="header-inner">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="/" 
                className="logo-link"
                aria-label="Crittr - Home"
              >
                <span className="text-4xl">🐾</span>
                <div className="flex flex-col">
                  <span className="logo-text">Crittr</span>
                  <span className="logo-subtitle">Pet Wellness Simplified</span>
                </div>
              </a>
            </div>

            {/* Desktop Auth Button and Navigation Dropdown */}
            <div className="desktop-auth-container">
              {/* Desktop Auth Button */}
              <div>
                {status === 'loading' ? (
                  <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                ) : session ? (
                  <div className="flex items-center space-x-3">
                    <span className="welcome-text">Welcome, {session.user?.name}</span>
                    <button
                      onClick={handleSignOut}
                      className="auth-button"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={toggleAuthModal}
                    className="auth-button"
                  >
                    Login
                  </button>
                )}
              </div>

              {/* Desktop Navigation Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleNavDropdown}
                  className="nav-dropdown-button"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="h-10 w-10" />
                </button>
                
                <AnimatePresence>
                  {isNavDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="nav-dropdown-menu"
                    >
                      {navItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="nav-dropdown-item"
                          onClick={() => setIsNavDropdownOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="mobile-menu-button"
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
              className="mobile-menu"
            >
              <div className="mobile-menu-content">
                {navItems.map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className="mobile-nav-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mobile-auth-section">
                  {session ? (
                    <div className="space-y-3">
                      <p className="welcome-text">Welcome, {session.user?.name}</p>
                      <button
                        onClick={handleSignOut}
                        className="mobile-auth-button"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={toggleAuthModal}
                      className="mobile-auth-button"
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
