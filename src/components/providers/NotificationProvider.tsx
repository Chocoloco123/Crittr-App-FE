'use client'

import { createContext, useContext, ReactNode } from 'react'
import { NotificationContainer, useNotifications, Notification } from '@/components/ui/Notification'

interface NotificationContextType {
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { notifications, addNotification, removeNotification, clearAllNotifications } = useNotifications()

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, clearAllNotifications }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider')
  }
  return context
}

// Convenience hook for easy notification usage
export function useNotify() {
  const { addNotification } = useNotificationContext()

  const success = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration })
  }

  const error = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'warning', title, message, duration })
  }

  const info = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration })
  }

  return { success, error, warning, info }
}
