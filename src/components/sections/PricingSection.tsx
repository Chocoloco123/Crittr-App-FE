'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Shield, ArrowRight, Heart } from 'lucide-react'

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
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
      color: 'border-blue-300',
      buttonColor: 'btn-secondary',
      bgColor: 'bg-white'
    },
    {
      name: 'Pro',
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
      color: 'border-purple-500',
      buttonColor: 'btn-primary',
      bgColor: 'bg-white'
    },
    {
      name: 'Family',
      price: '$19.99',
      period: 'per month',
      description: 'Perfect for families with multiple pets',
      features: [
        'Everything in Pro',
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
      color: 'border-pink-500',
      buttonColor: 'btn-primary',
      bgColor: 'bg-white'
    }
  ]

  const benefits = [
    { icon: Zap, title: 'Fast Setup', description: 'Get started in minutes' },
    { icon: Check, title: 'No Contracts', description: 'Cancel anytime' },
    { icon: Star, title: 'Trusted', description: 'Used by thousands' }
  ]

  return (
    <section id="pricing" className="section-padding bg-gradient-to-br from-purple-50 via-white to-orange-50/20 relative overflow-hidden">
      {/* Minimal pet-themed background */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 text-6xl gentle-float">💕</div>
      </div>
      
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">💝</span>
            <span className="text-sm font-medium text-secondary-600 bg-secondary-100 px-4 py-2 rounded-full">
              Affordable for every pet parent
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-gradient-primary">Simple, Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All Crittr plans include our core features 
            with no hidden fees or long-term contracts.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.bgColor} rounded-3xl shadow-lg border-2 ${plan.color} ${
                plan.popular ? 'scale-105 ring-2 ring-primary-200' : ''
              } group hover:shadow-xl transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg border-2 border-primary-600">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-secondary-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full ${plan.buttonColor} py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center`}>
                  <Heart className="h-4 w-4 mr-2" />
                  {plan.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Choose Crittr?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Shield className="h-5 w-5 text-secondary-600" />
            <p>
              <strong>30-day money-back guarantee</strong> on all paid plans. 
              Not satisfied? Get a full refund, no questions asked.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
