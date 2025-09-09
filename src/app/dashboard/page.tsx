'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Plus, 
  Calendar, 
  BarChart3, 
  Bell, 
  Settings, 
  User,
  Heart,
  Activity,
  TrendingUp,
  Clock,
  Home,
  LogOut,
  Bot,
  Users,
  Shield,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import PetProfiles from '@/components/pets/PetProfiles'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  // Demo data for unauthenticated users
  const demoStats = [
    { label: 'Total Pets', value: '3', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50' },
    { label: 'Journal Entries', value: '12', icon: Calendar, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { label: 'Quick Logs', value: '28', icon: Activity, color: 'text-green-500', bgColor: 'bg-green-50' },
    { label: 'Active Reminders', value: '5', icon: Bell, color: 'text-purple-500', bgColor: 'bg-purple-50' }
  ]

  const demoRecentActivities = [
    { id: 1, activity: 'Morning walk', pet: 'Buddy', time: '2 hours ago', type: 'Exercise' },
    { id: 2, activity: 'Fed breakfast', pet: 'Luna', time: '3 hours ago', type: 'Feeding' },
    { id: 3, activity: 'Vet checkup', pet: 'Max', time: '1 day ago', type: 'Health' },
    { id: 4, activity: 'Playtime', pet: 'Buddy', time: '2 days ago', type: 'Activity' }
  ]

  const demoUpcomingReminders = [
    { id: 1, title: 'Feed Luna', pet: 'Luna', time: 'In 2 hours' },
    { id: 2, title: 'Walk Buddy', pet: 'Buddy', time: 'Tomorrow 8 AM' },
    { id: 3, title: 'Grooming appointment', pet: 'Max', time: 'Friday 2 PM' }
  ]

  // Real user data - will be fetched from API in the future
  const userStats = [
    { label: 'Total Pets', value: '0', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50' },
    { label: 'Journal Entries', value: '0', icon: Calendar, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { label: 'Quick Logs', value: '0', icon: Activity, color: 'text-green-500', bgColor: 'bg-green-50' },
    { label: 'Active Reminders', value: '0', icon: Bell, color: 'text-purple-500', bgColor: 'bg-purple-50' }
  ]

  const userRecentActivities: any[] = []
  const userUpcomingReminders: any[] = []

  // Use demo data if not authenticated, user data if authenticated
  const stats = session ? userStats : demoStats
  const recentActivities = session ? userRecentActivities : demoRecentActivities
  const upcomingReminders = session ? userUpcomingReminders : demoUpcomingReminders
  const isDemoMode = !session

  const quickActions = [
    { 
      title: 'Journal Entry', 
      description: 'Record daily activities', 
      icon: Calendar, 
      href: '/journal',
      color: 'bg-sky-500',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-700'
    },
    { 
      title: 'Quick Log', 
      description: 'Fast activity logging', 
      icon: Activity, 
      href: '/quick-log',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    { 
      title: 'Add Pet', 
      description: 'Register new pet', 
      icon: Plus, 
      href: '#',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    { 
      title: 'AI Assistant', 
      description: 'Get health insights', 
      icon: Bot, 
      href: '/ai-assistant',
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      bgColor: 'bg-gradient-to-r from-purple-50 to-indigo-50',
      textColor: 'text-purple-700'
    }
  ]

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-secondary">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
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
                <span className="text-gray-900 font-medium">Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                className="p-2 text-primary-700 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-all duration-200"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button 
                className="p-2 text-primary-700 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-all duration-200"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              {session ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-700 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-all duration-200">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="hidden sm:block">{session.user?.name || session.user?.email}</span>
                  </div>
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
                  <Link 
                    href="/"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    aria-label="Sign in"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:block">Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="dashboard-container">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-gray-900 text-4xl font-bold mb-3">
            {isDemoMode ? (
              <>Welcome to Crittr! 👋 <span className="text-blue-600">(Demo Mode)</span></>
            ) : (
              <>Welcome back, {session.user?.name || session.user?.email || 'there'}! 👋</>
            )}
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            {isDemoMode ? (
              <>Explore the dashboard with sample data. <Link href="/" className="text-blue-600 hover:text-blue-700 underline">Sign in</Link> to create your own pet profiles and start tracking!</>
            ) : (
              <>Here's what's happening with your pets today.</>
            )}
          </p>
        </motion.div>

        {/* Pet Profiles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <PetProfiles isDemoMode={isDemoMode} />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 text-center"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-sm`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-gray-900 text-3xl font-bold mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-700 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900 text-2xl font-bold">
                    Recent Activities
                  </h2>
                  <Link href="/journal" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-8 pt-0">
                <div className="space-y-6">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className="flex items-center space-x-6 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                          <Activity className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">
                            {activity.activity} - {activity.pet}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            {activity.time}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-full border border-blue-100">
                          {activity.type}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
                      <p className="text-gray-500 mb-4">Start tracking your pet's activities to see them here.</p>
                      <Link 
                        href="/quick-log" 
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        Log First Activity
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Reminders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card">
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900 text-2xl font-bold">
                    Upcoming Reminders
                  </h2>
                  <Link href="/reminders" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                    Manage
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-8 pt-0">
                <div className="space-y-6">
                  {upcomingReminders.length > 0 ? (
                    upcomingReminders.map((reminder, index) => (
                      <motion.div
                        key={reminder.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
                      >
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shadow-sm">
                          <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">
                            {reminder.title}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            {reminder.pet} • {reminder.time}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders set</h3>
                      <p className="text-gray-500 mb-4">Set up reminders to keep track of your pet's schedule.</p>
                      <Link 
                        href="/reminders" 
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Create First Reminder
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="card p-8">
            <h2 className="text-gray-900 text-2xl font-bold mb-8 text-center">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-8 rounded-xl ${action.bgColor} hover:shadow-lg transition-all duration-200 cursor-pointer group text-center`}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                        <action.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${action.textColor} mb-2`}>
                          {action.title}
                        </h3>
                        <p className="text-gray-700 text-sm">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
        </div>
      </main>
    </div>
  )
}
