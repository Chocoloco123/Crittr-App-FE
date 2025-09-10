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
import AppNavigation from '@/components/layout/AppNavigation'
import { DemoStorage } from '@/lib/demoStorage'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    
    // Load dashboard data from demo storage
    const savedData = DemoStorage.getItem<any>('dashboard-data')
    if (savedData) {
      setDashboardData(savedData)
    }
  }, [])

  // Save dashboard data to demo storage whenever data changes
  useEffect(() => {
    if (mounted && dashboardData) {
      DemoStorage.setItem('dashboard-data', dashboardData)
    }
  }, [dashboardData, mounted])

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
      <AppNavigation currentPage="Dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="dashboard-container">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100/50">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-indigo-400 rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-400 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-400 rounded-full"></div>
            </div>
            
            <div className="relative z-10 text-center">
              {/* Main Heading */}
              <div className="mb-6">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  {isDemoMode ? (
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Welcome to Crittr! 
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Welcome back, {session.user?.name || session.user?.email || 'there'}!
                    </span>
                  )}
                </h1>
                <div className="text-6xl mb-4">🐾</div>
                {isDemoMode && (
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    Demo Mode
                  </div>
                )}
              </div>

              {/* Subtitle */}
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
                  {isDemoMode ? (
                    <>Explore our pet care platform with sample data. Experience the full features before creating your account!</>
                  ) : (
                    <>Here's what's happening with your pets today. Let's keep them happy and healthy together!</>
                  )}
                </p>
                
                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {isDemoMode ? (
                    <>
                      <Link 
                        href="/" 
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <span>Get Started</span>
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                      <Link 
                        href="/auth/signin" 
                        className="inline-flex items-center px-8 py-4 text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
                      >
                        Sign In
                      </Link>
                    </>
                  ) : (
                    <Link 
                      href="/quick-log" 
                      className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <span>Log Activity</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="card p-6">
            <h2 className="text-gray-900 text-xl font-bold mb-6 text-center">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg ${action.bgColor} hover:shadow-md transition-all duration-200 cursor-pointer group text-center`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-sm ${action.textColor} mb-1`}>
                          {action.title}
                        </h3>
                        <p className="text-gray-600 text-xs">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pet Profiles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="card">
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900 text-2xl font-bold">
                    Recent Activities
                  </h2>
                  <Link href="/journal" className="group inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200 whitespace-nowrap">
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
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
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900 text-2xl font-bold">
                    Upcoming Reminders
                  </h2>
                  <Link href="/reminders" className="group inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200 whitespace-nowrap">
                    <span>Manage</span>
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
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

        </div>
      </main>
    </div>
  )
}
