'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowRight, Twitter, Facebook, Instagram, Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'FAQ', href: '/faq' },
      { name: 'About', href: '/about' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' }
  ]

  return (
    <footer className="bg-blue-50 pt-20 pb-16 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 text-8xl">🐾</div>
        <div className="absolute bottom-20 left-20 text-6xl gentle-float" style={{ animationDelay: '2s' }}>💕</div>
      </div>
      
      <div className="container relative">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="mb-6">
                <h3 className="text-4xl font-bold text-primary-600 mb-3">
                  🐾 Crittr
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                  Pet health tracking & journaling. Monitor your pet's health, track daily activities, and maintain detailed records for better veterinary care.
                </p>
              </div>

              {/* Tagline */}
              <div className="mb-8">
                <p className="text-primary-600 font-semibold text-lg">
                  Made with love for pet parents! 💕
                </p>
              </div>
              
              {/* Newsletter Signup */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold mb-6 text-gray-800">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-4 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
                  />
                  <button className="btn btn-primary px-8 py-4 text-base font-semibold whitespace-nowrap">
                    Subscribe
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center hover:bg-primary-100 transition-colors shadow-sm hover:shadow-md"
                  >
                    <social.icon className="h-5 w-5 text-primary-600" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gray-800">Product</h4>
              <ul className="space-y-4">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-colors text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gray-800">Support</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-colors text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gray-800">Legal</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-colors text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-600 mb-4 md:mb-0 text-base">
              <span>Made with</span>
              <Heart className="h-5 w-5 text-primary-500" />
              <span>for pet lovers worldwide</span>
            </div>
            
            <div className="text-gray-500 text-base">
              © {currentYear} <span className="text-primary-600 font-semibold">Crittr</span>. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}