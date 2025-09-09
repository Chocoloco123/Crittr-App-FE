'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, User, Eye, EyeOff, CheckCircle, ArrowLeft, Loader2, Heart } from 'lucide-react'
import { signIn } from 'next-auth/react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await signIn('email', {
        email: formData.email,
        redirect: false,
      })
      
      if (result?.error) {
        console.error('Sign in error:', result.error)
        // You could add a toast notification here to show the error to the user
      } else {
        setMagicLinkSent(true)
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setFormData({ email: '', name: '', password: '' })
    setMagicLinkSent(false)
  }

  const handleBackToSignIn = () => {
    setMagicLinkSent(false)
    setFormData({ email: '', name: '', password: '' })
  }

  if (!mounted || !isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl">🐾</span>
                <span className="text-2xl font-bold text-primary-600">Crittr</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {magicLinkSent ? 'Check Your Email' : (isSignUp ? 'Create Account' : 'Welcome Back')}
              </h2>
              <p className="text-gray-600">
                {magicLinkSent 
                  ? 'We\'ve sent you a magic link to sign in'
                  : (isSignUp 
                    ? 'Start tracking your pet\'s health journey' 
                    : 'Sign in to continue your pet\'s care'
                  )
                }
              </p>
            </div>

            {/* Magic Link Sent Success State */}
            {magicLinkSent ? (
              <div className="space-y-6">
                {/* Success Icon */}
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-secondary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Magic Link Sent!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We've sent a secure sign-in link to <strong>{formData.email}</strong>
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <h4 className="font-medium text-primary-900 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the magic link to sign in</li>
                    <li>• The link expires in 15 minutes</li>
                    <li>• You can close this window</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBackToSignIn}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Send Another Link
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-gray-900 placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Name (Sign Up only) */}
                {isSignUp && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                )}

                {/* Password (Sign Up only) */}
                {isSignUp && (
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn btn-primary py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      {isSignUp ? 'Creating Account...' : 'Sending Magic Link...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Heart className="h-5 w-5 mr-2" />
                      {isSignUp ? 'Create Account' : 'Send Magic Link'}
                    </div>
                  )}
                </button>
              </form>
            )}

            {/* Toggle Mode - Only show when not in magic link sent state */}
            {!magicLinkSent && (
              <>
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button
                      onClick={toggleMode}
                      className="ml-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>

                {/* Magic Link Info */}
                {!isSignUp && (
                  <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="text-sm text-primary-800">
                      <strong>Magic Link Authentication:</strong> We'll send you a secure link to sign in without a password.
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}
