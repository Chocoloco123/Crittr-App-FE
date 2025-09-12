'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'
import './PricingSection.scss'

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
      buttonClass: 'teal'
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
      buttonClass: 'orange'
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
      buttonClass: 'teal'
    }
  ]

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pricing-header"
        >
          <h2 className="pricing-title">
            Simple, Transparent Pricing
          </h2>
          <p className="pricing-description">
            Choose the plan that's right for you and your pets. No hidden fees, cancel anytime.
          </p>
        </motion.div>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="pricing-badge">
                  <div className="pricing-badge-content">
                    <div className="pricing-badge-icon">
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
              
              <div className="pricing-card-content">
                <div className="pricing-card-header">
                  <h3 className="pricing-plan-name">
                    {plan.name}
                  </h3>
                  <div className="pricing-price-container">
                    <span className="pricing-price">
                      {plan.price}
                    </span>
                    <span className="pricing-period">/{plan.period}</span>
                  </div>
                  <p className="pricing-plan-description">{plan.description}</p>
                </div>
                
                <ul className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="pricing-feature">
                      <Check className="pricing-feature-icon" />
                      <span className="pricing-feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`pricing-button ${plan.buttonClass}`}>
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
          className="pricing-footer"
        >
          <p className="pricing-footer-text">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="pricing-footer-link">
            Questions? <a href="#contact">Contact our support team</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
