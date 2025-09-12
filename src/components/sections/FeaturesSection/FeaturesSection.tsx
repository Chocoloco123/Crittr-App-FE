'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import './FeaturesSection.scss'

export default function FeaturesSection() {
  const mainFeatures = [
    {
      title: 'Health Tracking',
      description: 'Monitor vet visits, vaccinations, weight, and medications with clean charts.',
      icon: '/images/icons/stethescope.png',
      iconColor: 'cream'
    },
    {
      title: 'Pet Journal',
      description: 'Capture daily moments, milestones, and memories.',
      icon: '/images/icons/journal.png',
      iconColor: 'orange'
    },
    {
      title: 'AI Assistant',
      description: 'Get reminders, tips, and answers tailored to your pet.',
      icon: '/images/icons/robot.png',
      iconColor: 'cream'
    }
  ]

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="features-header"
        >
          <h2 className="features-title">Why Crittr?</h2>
        </motion.div>
        
        <div className="features-grid">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="feature-content">
                <div className={`feature-icon-container ${feature.iconColor}`}>
                  <div className="feature-icon">
                    <Image 
                      src={feature.icon} 
                      alt={feature.title}
                      fill 
                      className="object-contain drop-shadow-sm" 
                    />
                  </div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
