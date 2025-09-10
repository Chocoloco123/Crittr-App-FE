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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
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

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Google sign in error:', error)
      setIsGoogleLoading(false)
    }
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
              <div className="space-y-6">
                {/* Google Sign In Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-3"
                >
                  {isGoogleLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Signing in with Google...</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>

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
              </div>
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
