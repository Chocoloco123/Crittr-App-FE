'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown,
  Home, 
  Calendar, 
  Activity, 
  Bell, 
  BarChart3, 
  Bot, 
  Users, 
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
    {
      href: '/ai-assistant',
      icon: Bot,
      label: 'AI Assistant',
      color: 'text-purple-700',
      bgColor: 'bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100',
      description: 'AI Help'
    },
    {
      href: '/social',
      icon: Users,
      label: 'Community',
      color: 'text-pink-700',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
      description: 'Social'
    },
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
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-700 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-all duration-200"
        aria-label="Navigation menu"
      >
        <span>Navigate</span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Navigation</h3>
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isCurrentPage = pathname === item.href
                  
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3 rounded-lg ${item.bgColor} ${item.color} transition-all duration-200 flex flex-col items-center space-y-2 ${
                          isCurrentPage ? 'ring-2 ring-indigo-500 ring-offset-1' : ''
                        }`}
                        title={item.description}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-medium text-center">{item.label}</span>
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
