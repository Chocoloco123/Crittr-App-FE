'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Camera, 
  Bell, 
  Share2, 
  BarChart3, 
  Zap,
  Search,
  Users,
  Calendar,
  Heart,
  Pill,
  Weight,
  Phone,
  CheckCircle,
  Monitor,
  Sparkles
} from 'lucide-react'

export default function FeaturesSection() {
  const mainFeatures = [
    {
      icon: BookOpen,
      title: 'Digital Journal',
      description: 'Record daily activities, health notes, and memorable moments with rich text editing and media attachments.',
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      emoji: '📖'
    },
    {
      icon: Zap,
      title: 'One-Tap Logging',
      description: 'Quickly log feeding, walks, medication, grooming, and other routine activities with a single tap.',
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      emoji: '⚡'
    },
    {
      icon: Camera,
      title: 'Media Attachments',
      description: 'Add photos and videos to your entries to capture precious moments and track visual changes.',
      color: 'text-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100',
      emoji: '📸'
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Set up custom reminders for feeding times, medication schedules, vet appointments, and more.',
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      emoji: '🔔'
    },
    {
      icon: BarChart3,
      title: 'Health Trends',
      description: 'Visualize weight trends, medication adherence, and symptom patterns with interactive charts.',
      color: 'text-primary-600',
      bgColor: 'bg-gradient-to-br from-primary-50 to-primary-100',
      emoji: '📊'
    },
    {
      icon: Share2,
      title: 'Export & Share',
      description: 'Generate comprehensive reports for your vet with CSV exports and date-range filtering.',
      color: 'text-teal-600',
      bgColor: 'bg-gradient-to-br from-teal-50 to-teal-100',
      emoji: '📤'
    }
  ]

  const quickActions = [
    { icon: Heart, label: 'Feeding', color: 'bg-gradient-to-br from-red-100 to-red-200 text-red-700' },
    { icon: Weight, label: 'Water', color: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700' },
    { icon: Calendar, label: 'Walk', color: 'bg-gradient-to-br from-green-100 to-green-200 text-green-700' },
    { icon: Pill, label: 'Medication', color: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700' },
    { icon: Users, label: 'Training', color: 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700' },
    { icon: Heart, label: 'Grooming', color: 'bg-gradient-to-br from-pink-100 to-pink-200 text-pink-700' },
  ]

  const additionalFeatures = [
    { icon: Search, title: 'Smart Search', description: 'Find entries quickly with intelligent search across all your pet\'s data.' },
    { icon: Users, title: 'Multi-Pet Support', description: 'Manage multiple pets with separate profiles and shared insights.' },
    { icon: BarChart3, title: 'AI-Powered Insights', description: 'Get personalized health summaries and care recommendations.' }
  ]

  return (
    <section id="features" className="section-padding bg-white relative overflow-hidden">
      {/* Minimal pet-themed background */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 right-20 text-6xl">🐾</div>
      </div>
      
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col justify-center items-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🐾</span>
            <span className="text-sm font-semibold text-primary-600 bg-primary-100 px-4 py-2 rounded-full">
              Everything you need
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            <span className="text-gradient-primary">Complete Pet Care</span> Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
            From daily logging to health insights, Crittr helps you provide 
            the best care for your beloved pets.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-interactive p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <span className="text-3xl">{feature.emoji}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-3xl p-8 mb-16 shadow-lg border border-blue-200"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl">⚡</span>
              <h3 className="text-2xl font-bold text-gray-900">
                One-Tap Logging
              </h3>
            </div>
            <p className="text-gray-600">
              Log common activities instantly with our quick action buttons
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl ${action.color} hover:shadow-lg transition-all flex flex-col items-center space-y-3`}
              >
                <action.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Advanced Features
            </h3>
            <div className="space-y-4">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <feature.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50 rounded-3xl p-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Mobile Optimized
              </h3>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Access your pet's journal anywhere with our responsive design.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <Monitor className="h-6 w-6 text-accent-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-2xl text-gray-900">Responsive Design</p>
                <p className="text-lg text-gray-600">Works perfectly on all devices and screen sizes</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
