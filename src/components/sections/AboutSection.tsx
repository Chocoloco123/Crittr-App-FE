'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Shield, Zap } from 'lucide-react'

export default function AboutSection() {
  const stats = [
    { number: '10,000+', label: 'Happy Pet Owners' },
    { number: '50,000+', label: 'Journal Entries' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Pet-First Approach',
      description: 'Every feature is designed with your pet\'s wellbeing in mind. We understand that pets are family, and their health and happiness matter most.',
      iconColor: 'bg-primary-200 text-primary-700'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your pet\'s data is encrypted and secure. We never share your information without consent and follow strict privacy standards.',
      iconColor: 'bg-secondary-200 text-secondary-700'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by pet owners, for pet owners. Our features are inspired by real user feedback and the needs of the pet care community.',
      iconColor: 'bg-accent-200 text-accent-700'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI and technology to provide insights that help you make better decisions for your pet\'s health.',
      iconColor: 'bg-primary-300 text-primary-800'
    }
  ]

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 text-6xl">🐾</div>
        <div className="absolute bottom-20 left-20 text-5xl">❤️</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">🐾</span>
            <span className="text-sm font-semibold text-accent-600 bg-accent-100 px-4 py-2 rounded-full">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Crittr
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about helping pet owners provide the best possible care 
            for their beloved companions through technology and innovation.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Story
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Crittr was born from a simple observation: pet owners everywhere 
                struggle to keep track of their pets' health, daily routines, and important 
                milestones. As pet parents ourselves, we experienced this challenge firsthand.
              </p>
              <p>
                We noticed that while there were many apps for human health tracking, 
                there was no comprehensive solution for pet care that combined journaling, 
                health monitoring, and intelligent insights in one beautiful, easy-to-use platform.
              </p>
              <p>
                Today, Crittr serves thousands of pet owners worldwide, helping them 
                maintain detailed health records, track important trends, and ensure their pets 
                receive the best possible care throughout their lives.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg border border-blue-200">
            <div className="text-center">
              <div className="text-6xl mb-4">🐾</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Mission Statement
              </h4>
              <p className="text-gray-700 italic">
                "To empower pet owners with the tools and insights they need to provide 
                exceptional care for their beloved companions, ensuring every pet lives 
                a healthy, happy, and well-documented life."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const colors = [
              'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
              'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300',
              'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
              'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300'
            ]
            const colorClass = colors[index % colors.length]
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`text-center ${colorClass} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${value.iconColor} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg border border-blue-200 flex flex-col justify-center items-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-center leading-relaxed">
            We're a team of pet lovers, developers, and designers who are passionate 
            about creating tools that make pet care easier and more effective.
          </p>
          <div className="flex justify-center items-center space-x-4 text-gray-600">
            <div className="text-2xl">👨‍💻</div>
            <div className="text-2xl">👩‍💻</div>
            <div className="text-2xl">🐕</div>
            <div className="text-2xl">🐱</div>
            <div className="text-2xl">👨‍💻</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
