'use client'

import { motion } from 'framer-motion'
import { Calendar, Heart, BarChart3, Phone, Users, Shield, ArrowRight, Play, PawPrint, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const features = [
    { icon: Calendar, text: 'Daily Journal Entries', emoji: '📝' },
    { icon: Heart, text: 'Health Monitoring', emoji: '❤️' },
    { icon: BarChart3, text: 'Trend Analysis', emoji: '📊' },
    { icon: Phone, text: 'Mobile Friendly', emoji: '📱' },
    { icon: Users, text: 'Multi-pet household-friendly', emoji: '🐕🐱' },
    { icon: Shield, text: 'Secure & Private', emoji: '🔒' },
  ]

  return (
    <section className="relative bg-white section-padding overflow-hidden" aria-labelledby="hero-heading">
      {/* Minimal pet-themed background decoration */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-40 right-20 text-4xl gentle-float">💕</div>
        <div className="absolute bottom-20 left-20 text-5xl gentle-float" style={{ animationDelay: '1s' }}>⭐</div>
      </div>
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center lg:gap-16">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="text-center lg:text-left mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <span className="text-4xl">🐾</span>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="h-4 w-4" />
                  <span>Trusted by 10,000+ Pet Parents</span>
                </div>
              </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                  <span className="text-gradient-primary">Crittr</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 font-medium mb-6">Your pet's health companion</p>
              </div>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Track your furry friend's daily activities, monitor their health, and create 
                beautiful memories with our comprehensive pet care platform. 
                <span className="text-primary-600 font-semibold"> Because every pet deserves the best care!</span>
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="text-lg">{feature.emoji}</span>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
            >
              <button className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold group">
                <PawPrint className="h-5 w-5" />
                Start Your Pet's Journal
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn btn-secondary btn-lg px-8 py-4 text-lg font-semibold border-2 border-primary-200 hover:border-primary-300">
                <Play className="h-5 w-5" />
                Watch Demo
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent-500" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-secondary-500" />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary-500" />
                <span>Loved by pet parents</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Pet Photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center lg:justify-start lg:-ml-4"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-accent-600 text-lg">💕</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-secondary-600 text-lg">⭐</span>
              </div>
              
              <div className="rounded-3xl p-3 bg-gradient-to-br from-primary-100 to-secondary-100 shadow-lg">
                <Image
                  src="/images/pets/hero/shiba.jpg"
                  alt="Happy Shiba Inu - representing healthy, joyful pet care"
                  width={400}
                  height={300}
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
              
              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-8 -left-8 bg-white rounded-2xl p-4 shadow-lg border border-primary-200"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">10K+</div>
                  <div className="text-xs text-gray-600 font-medium">Happy Pets</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-secondary-200"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600">4.9★</div>
                  <div className="text-xs text-gray-600 font-medium">App Rating</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
