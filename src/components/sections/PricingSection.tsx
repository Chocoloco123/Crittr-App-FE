'use client'

import { motion } from 'framer-motion'
import { Check, Star, ArrowRight, Shield, Zap, Users, Crown, Heart, Award } from 'lucide-react'

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with basic pet tracking',
      features: [
        'Up to 2 pets',
        'Basic journal entries',
        'Photo attachments',
        'Simple reminders',
        'Basic export (CSV)',
        'Community support'
      ],
      cta: 'Get Started Free',
      popular: false,
      icon: Heart,
      color: 'blue'
    },
    {
      name: 'Professional',
      price: '$9.99',
      period: 'per month',
      description: 'Advanced features for serious pet owners',
      features: [
        'Unlimited pets',
        'Advanced journal with rich text',
        'Video attachments',
        'Smart reminders & notifications',
        'AI-powered health insights',
        'Advanced analytics & trends',
        'Vet report generation',
        'Priority support',
        'Data backup & sync'
      ],
      cta: 'Start Free Trial',
      popular: true,
      icon: Crown,
      color: 'purple'
    },
    {
      name: 'Enterprise',
      price: '$19.99',
      period: 'per month',
      description: 'Perfect for families with multiple pets',
      features: [
        'Everything in Professional',
        'Up to 10 pets',
        'Family sharing & collaboration',
        'Multi-user access',
        'Custom branding',
        'Advanced integrations',
        'White-label options',
        'Dedicated support',
        'Custom analytics'
      ],
      cta: 'Contact Sales',
      popular: false,
      icon: Award,
      color: 'green'
    }
  ]

  const benefits = [
    { 
      icon: Zap, 
      title: 'Lightning Fast Setup', 
      description: 'Get started in under 2 minutes with our intuitive onboarding' 
    },
    { 
      icon: Shield, 
      title: 'Bank-Level Security', 
      description: 'Your pet data is encrypted and protected with enterprise-grade security' 
    },
    { 
      icon: Users, 
      title: 'Trusted by 50K+ Users', 
      description: 'Join thousands of pet parents who trust us with their furry family' 
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
            Choose the perfect plan for your pet care needs. Start free, upgrade anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'scale-105 shadow-xl' 
                  : ''
              }`}
              style={{
                background: plan.popular 
                  ? 'linear-gradient(135deg, #0ea5e9, #0284c7)'
                  : plan.name === 'Starter'
                  ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                  : plan.name === 'Enterprise'
                  ? 'linear-gradient(135deg, #14b8a6, #0d9488)'
                  : 'linear-gradient(135deg, #e5e5e5, #d4d4d4)',
                padding: '3px'
              }}
            >
              <div className="bg-white rounded-2xl h-full">
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg border-2 border-gray-200" style={{ background: 'white' }}>
                    <Star className="h-4 w-4 fill-current text-gray-900" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

                <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    plan.color === 'blue' ? 'bg-primary-100' :
                    plan.color === 'purple' ? 'bg-secondary-100' :
                    'bg-accent-100'
                  }`}>
                    <plan.icon className={`h-6 w-6 ${
                      plan.color === 'blue' ? 'text-primary-600' :
                      plan.color === 'purple' ? 'text-secondary-600' :
                      'text-accent-600'
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-600">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {plan.name === 'Starter' ? (
                  <a 
                    href="/auth/signin" 
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 bg-primary-500 text-white hover:bg-primary-600`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-secondary-500 text-white hover:bg-secondary-600'
                      : plan.name === 'Enterprise'
                      ? 'bg-accent-500 text-white hover:bg-accent-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why pet parents choose Crittr
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <h4 className="text-2xl font-bold text-gray-900">
                30-day money-back guarantee
              </h4>
            </div>
            <p className="text-gray-600 text-lg">
              Not satisfied? Get a full refund, no questions asked.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}