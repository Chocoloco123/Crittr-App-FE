'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with basic pet tracking',
      features: [
        'Up to 2 pets',
        'Basic health tracking',
        'Simple journal entries',
        'Basic reminders',
        'Community support'
      ],
      popular: false,
      buttonText: 'Get Started Free',
      buttonColor: '#2c8d9b'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Advanced features for dedicated pet parents',
      features: [
        'Unlimited pets',
        'Advanced health analytics',
        'Rich media journal entries',
        'Smart AI recommendations',
        'Vet appointment scheduling',
        'Priority support',
        'Data export'
      ],
      popular: true,
      buttonText: 'Start Pro Trial',
      buttonColor: '#FE9F72'
    },
    {
      name: 'Family',
      price: '$19.99',
      period: 'per month',
      description: 'Complete solution for multi-pet households',
      features: [
        'Everything in Pro',
        'Family sharing (up to 5 users)',
        'Multi-pet health comparisons',
        'Bulk operations',
        'Advanced reporting',
        'White-label options',
        '24/7 phone support'
      ],
      popular: false,
      buttonText: 'Choose Family',
      buttonColor: '#2c8d9b'
    }
  ]

  return (
    <section id="pricing" className="px-8 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#14504E' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you and your pets. No hidden fees, cancel anytime.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 relative ${
                plan.popular ? 'ring-2 ring-teal-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <div className="w-4 h-4 relative">
                      <Image 
                        src="/images/icons/heart-pink.png" 
                        alt="Star" 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#14504E' }}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#14504E' }}>
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-teal-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="w-full text-white px-5 py-2.5 rounded-2xl shadow-md transition-colors font-semibold text-sm font-poppins"
                  style={{ backgroundColor: plan.buttonColor }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Questions? <a href="#contact" className="text-teal-600 hover:text-teal-700">Contact our support team</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}