'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu,
  X,
  Home, 
  Calendar, 
  Activity, 
  Bell, 
  BarChart3, 
  Bot, 
  ArrowRight
} from 'lucide-react'

interface NavigationDropdownProps {
  currentPage?: string
}

export default function NavigationDropdown({ currentPage }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const navigationItems = [
    {
      href: '/dashboard',
      icon: Home,
      label: 'Dashboard',
      color: 'text-gray-700',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      description: 'Overview'
    },
    {
      href: '/journal',
      icon: Calendar,
      label: 'Journal',
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      description: 'Entries'
    },
    {
      href: '/quick-log',
      icon: Activity,
      label: 'Quick Log',
      color: 'text-green-700',
      bgColor: 'bg-green-50 hover:bg-green-100',
      description: 'Fast Log'
    },
    {
      href: '/reminders',
      icon: Bell,
      label: 'Reminders',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      description: 'Alerts'
    },
    {
      href: '/analytics',
      icon: BarChart3,
      label: 'Analytics',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      description: 'Insights'
    },
    // TODO: Re-enable when AI Assistant is ready
    // {
    //   href: '/ai-assistant',
    //   icon: Bot,
    //   label: 'AI Assistant',
    //   color: 'text-purple-700',
    //   bgColor: 'bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100',
    //   description: 'AI Help'
    // },
    {
      href: '/export',
      icon: ArrowRight,
      label: 'Export',
      color: 'text-red-700',
      bgColor: 'bg-red-50 hover:bg-red-100',
      description: 'Data'
    }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
        aria-label="Navigation menu"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden backdrop-blur-sm"
          >
            <div className="p-6">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isCurrentPage = pathname === item.href
                  
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative p-4 rounded-xl transition-all duration-300 flex items-center space-x-4 ${
                          isCurrentPage 
                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 shadow-sm' 
                            : 'hover:bg-gray-50 hover:shadow-sm'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          isCurrentPage 
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' 
                            : 'bg-gray-100 group-hover:bg-gray-200 text-gray-600 group-hover:text-gray-800'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold transition-colors duration-200 ${
                            isCurrentPage ? 'text-indigo-900' : 'text-gray-900 group-hover:text-gray-800'
                          }`}>
                            {item.label}
                          </p>
                          <p className={`text-xs transition-colors duration-200 ${
                            isCurrentPage ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-600'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                        
                        {isCurrentPage && (
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          </div>
                        )}
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
