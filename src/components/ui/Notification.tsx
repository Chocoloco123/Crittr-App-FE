'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X, BookOpen, Heart } from 'lucide-react'

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'journal'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

interface NotificationProps {
  notification: Notification
  onRemove: (id: string) => void
}

const notificationConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700'
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700'
  },
  journal: {
    icon: BookOpen,
    bgColor: 'bg-gradient-to-r from-teal-50 to-emerald-50',
    borderColor: 'border-teal-200',
    iconColor: 'text-teal-600',
    titleColor: 'text-teal-800',
    messageColor: 'text-teal-700'
  }
}

function NotificationItem({ notification, onRemove }: NotificationProps) {
  const config = notificationConfig[notification.type]
  const Icon = config.icon

  useEffect(() => {
    const duration = notification.duration || 5000
    const timer = setTimeout(() => {
      onRemove(notification.id)
    }, duration)

    return () => clearTimeout(timer)
  }, [notification.id, notification.duration, onRemove])

  // Special styling for journal notifications
  if (notification.type === 'journal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative max-w-sm w-full bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 border-2 border-teal-200 rounded-xl shadow-xl p-5 backdrop-blur-sm"
      >
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 opacity-20">
          <Heart className="h-4 w-4 text-teal-400" />
        </div>
        <div className="absolute bottom-2 left-2 opacity-20">
          <BookOpen className="h-3 w-3 text-emerald-400" />
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-teal-800 mb-1">
              {notification.title}
            </h4>
            {notification.message && (
              <p className="text-sm text-teal-700 leading-relaxed">
                {notification.message}
              </p>
            )}
            {/* Success indicator */}
            <div className="flex items-center mt-2 space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 font-medium">Saved to journal</span>
            </div>
          </div>
          <button
            onClick={() => onRemove(notification.id)}
            className="text-teal-400 hover:text-teal-600 transition-colors flex-shrink-0 p-1 rounded-full hover:bg-teal-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    )
  }

  // Standard notification styling for other types
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative max-w-sm w-full ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${config.titleColor}`}>
            {notification.title}
          </h4>
          {notification.message && (
            <p className={`text-sm ${config.messageColor} mt-1`}>
              {notification.message}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(notification.id)}
          className={`${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

interface NotificationContainerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification: Notification = {
      ...notification,
      id
    }
    setNotifications(prev => [...prev, newNotification])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  }
}

// Convenience functions for different notification types
export function useNotificationHelpers() {
  const { addNotification } = useNotifications()

  const showSuccess = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration })
  }

  const showError = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration })
  }

  const showWarning = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'warning', title, message, duration })
  }

  const showInfo = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration })
  }

  const showJournal = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'journal', title, message, duration })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showJournal
  }
}
