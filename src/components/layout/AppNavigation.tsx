'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Bell, 
  User,
  LogOut,
  Home,
  Shield,
  LogIn
} from 'lucide-react'
import NavigationDropdown from './NavigationDropdown'
import AuthModal from '@/components/auth/AuthModal'

interface AppNavigationProps {
  currentPage: string
}

export default function AppNavigation({ currentPage }: AppNavigationProps) {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen)

  // Don't show navigation dropdown on home page
  const isHomePage = pathname === '/'

  if (!mounted || status === 'loading') {
    return (
      <header className="bg-blue-50 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xl font-bold text-primary-600">
                <span className="text-3xl">🐾</span>
                <div className="flex flex-col">
                  <span className="text-primary-600">Crittr</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
    <header className="bg-blue-50 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors group"
              aria-label="Crittr - Home"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">🐾</span>
              <div className="flex flex-col">
                <span className="text-primary-600">Crittr</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{currentPage}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href="/reminders"
              className="relative p-2 text-primary-700 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-all duration-200"
              aria-label="Reminders and notifications"
            >
              <Bell className="h-5 w-5" />
              {/* Notification indicator - only show when there are due reminders */}
              {/* TODO: Add logic to check for due reminders and show this conditionally */}
              {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> */}
            </Link>
            {session ? (
              <>
                {/* Check if user is a demo user (no email or demo email) */}
                {session.user?.email && !session.user.email.includes('demo') ? (
                  <Link
                    href="/settings"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-700 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-all duration-200 cursor-pointer"
                    aria-label="Account settings"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="hidden sm:block">{session.user?.name || session.user?.email}</span>
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg">
                      <Shield className="h-4 w-4" />
                      <span className="hidden sm:block">Demo Mode</span>
                    </div>
                    <button
                      onClick={toggleAuthModal}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      aria-label="Sign in"
                    >
                      <LogIn className="h-4 w-4" />
                      <span className="hidden sm:block">Sign In</span>
                    </button>
                  </>
                )}
                <button 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:block">Demo Mode</span>
                </div>
                <button
                  onClick={toggleAuthModal}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  aria-label="Sign in"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:block">Sign In</span>
                </button>
              </>
            )}
            
            {/* Navigation Dropdown - only show on non-home pages, positioned at the far right */}
            {!isHomePage && <NavigationDropdown currentPage={currentPage} />}
          </div>
        </div>
      </div>
    </header>

    {/* Auth Modal */}
    <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
  </>
  )
}
