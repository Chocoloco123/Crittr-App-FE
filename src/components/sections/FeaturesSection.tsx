'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FeaturesSection() {
  const mainFeatures = [
    {
      title: 'Health Tracking',
      description: 'Monitor vet visits, vaccinations, weight, and medications with clean charts.',
      icon: '/images/icons/stethescope.png',
      iconColor: '#FEFBEE'
    },
    {
      title: 'Pet Journal',
      description: 'Capture daily moments, milestones, and memories.',
      icon: '/images/icons/journal.png',
      iconColor: '#FE9F72'
    },
    {
      title: 'AI Assistant',
      description: 'Get reminders, tips, and answers tailored to your pet.',
      icon: '/images/icons/robot.png',
      iconColor: '#FEFBEE'
    }
  ]

  return (
    <section id="features" className="px-8 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-12" style={{ color: '#14504E' }}>Why Crittr?</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6 text-center">
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: feature.iconColor }}
                >
                  <div className="w-16 h-16 relative">
                    <Image 
                      src={feature.icon} 
                      alt={feature.title}
                      fill 
                      className="object-contain drop-shadow-sm" 
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2" style={{ color: '#14504E' }}>{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}