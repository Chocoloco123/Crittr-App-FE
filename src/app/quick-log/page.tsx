'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import OneTapLogging from '@/components/logging/OneTapLogging'
import AppNavigation from '@/components/layout/AppNavigation'
import { DemoStorage } from '@/lib/demoStorage'

interface QuickLog {
  id: string
  petId: string
  petName: string
  activityType: string
  timestamp: string
  notes?: string
  attachments?: string[]
}

export default function QuickLogPage() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)
  const [selectedPetId, setSelectedPetId] = useState<string>('')
  const [selectedPetName, setSelectedPetName] = useState<string>('')
  const [logs, setLogs] = useState<QuickLog[]>([])

  useEffect(() => {
    setMounted(true)
    
    // Load logs from demo storage on component mount
    const savedLogs = DemoStorage.getItem<QuickLog[]>('quick-logs')
    if (savedLogs) {
      setLogs(savedLogs)
    }
  }, [])

  // Save logs to demo storage whenever logs change
  useEffect(() => {
    if (mounted) {
      DemoStorage.setItem('quick-logs', logs)
    }
  }, [logs, mounted])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const handleLogActivity = (logData: Omit<QuickLog, 'id'>) => {
    const newLog: QuickLog = {
      ...logData,
      id: `log-${Date.now()}`
    }
    
    setLogs(prev => [newLog, ...prev])
    
    // Show success message
    const activityName = logData.activityType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    alert(`${activityName} logged successfully for ${logData.petName}!`)
  }

  const handleEditLog = (logId: string, updatedLog: Omit<QuickLog, 'id'>) => {
    setLogs(prev => prev.map(log => 
      log.id === logId 
        ? { ...updatedLog, id: logId }
        : log
    ))
    alert('Log updated successfully!')
  }

  const handleDeleteLog = (logId: string) => {
    setLogs(prev => prev.filter(log => log.id !== logId))
    alert('Log deleted successfully!')
  }

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-secondary">Loading quick log...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <AppNavigation currentPage="Quick Log" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* One-Tap Logging Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <OneTapLogging
            logs={logs}
            onLogActivity={handleLogActivity}
            onEditLog={handleEditLog}
            onDeleteLog={handleDeleteLog}
          />
        </motion.div>

        {/* Today's Summary */}
        {logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Activity Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {logs.slice(0, 6).map((log) => (
                  <div key={log.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 capitalize">
                        {log.activityType.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{log.petName}</p>
                    {log.notes && (
                      <p className="text-sm text-gray-500 mt-1 italic">"{log.notes}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
