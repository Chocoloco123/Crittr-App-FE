'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Droplets, 
  Activity, 
  Pill, 
  Weight, 
  Stethoscope, 
  Scissors, 
  PawPrint,
  Clock,
  Check,
  X,
  Plus,
  Calendar,
  Camera,
  FileText
} from 'lucide-react'

interface QuickLog {
  id: string
  petId: string
  petName: string
  activityType: string
  timestamp: string
  notes?: string
  attachments?: string[]
}

interface OneTapLoggingProps {
  petId?: string
  petName?: string
  onLogActivity: (log: Omit<QuickLog, 'id'>) => void
}

const quickActivities = [
  {
    id: 'feeding',
    label: 'Feeding',
    icon: Heart,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    description: 'Log feeding time'
  },
  {
    id: 'water',
    label: 'Water',
    icon: Droplets,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    description: 'Log water intake'
  },
  {
    id: 'walk',
    label: 'Walk',
    icon: Activity,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    description: 'Log exercise/walk'
  },
  {
    id: 'medication',
    label: 'Medication',
    icon: Pill,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    description: 'Log medication given'
  },
  {
    id: 'potty',
    label: 'Potty',
    icon: PawPrint,
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
    description: 'Log bathroom break'
  },
  {
    id: 'weight',
    label: 'Weight',
    icon: Weight,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    description: 'Log weight measurement'
  },
  {
    id: 'vet_visit',
    label: 'Vet Visit',
    icon: Stethoscope,
    color: 'bg-indigo-500',
    hoverColor: 'hover:bg-indigo-600',
    description: 'Log vet appointment'
  },
  {
    id: 'grooming',
    label: 'Grooming',
    icon: Scissors,
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-600',
    description: 'Log grooming session'
  }
]

export default function OneTapLogging({ petId, petName, onLogActivity }: OneTapLoggingProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [notes, setNotes] = useState('')
  const [customTime, setCustomTime] = useState('')

  const handleQuickLog = (activityId: string) => {
    const activity = quickActivities.find(a => a.id === activityId)
    if (!activity) return

    const now = new Date()
    const logData: Omit<QuickLog, 'id'> = {
      petId: petId || '',
      petName: petName || 'Unknown Pet',
      activityType: activityId,
      timestamp: customTime || now.toISOString(),
      notes: notes.trim() || undefined
    }

    onLogActivity(logData)
    
    // Reset form
    setSelectedActivity(null)
    setShowDetails(false)
    setNotes('')
    setCustomTime('')
  }

  const handleActivitySelect = (activityId: string) => {
    setSelectedActivity(activityId)
    setShowDetails(true)
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">One-Tap Logging</h2>
        <p className="text-gray-600">
          Quickly log your pet's daily activities
          {petName && <span className="text-indigo-600 font-medium"> for {petName}</span>}
        </p>
      </div>

      {/* Quick Activities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActivities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <motion.button
              key={activity.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleActivitySelect(activity.id)}
              className={`${activity.color} ${activity.hoverColor} text-white p-6 rounded-xl text-center transition-all shadow-lg hover:shadow-xl`}
            >
              <Icon className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">{activity.label}</h3>
              <p className="text-sm opacity-90">{activity.description}</p>
            </motion.button>
          )
        })}
      </div>

      {/* Activity Details Modal */}
      {showDetails && selectedActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const activity = quickActivities.find(a => a.id === selectedActivity)
                    if (!activity) return null
                    const Icon = activity.icon
                    return (
                      <>
                        <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{activity.label}</h3>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCustomTime('')}
                      className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                        !customTime 
                          ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Now ({formatTime(new Date().toISOString())})
                    </button>
                    <input
                      type="time"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="flex-1 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional notes..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Quick Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Notes
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'All good',
                      'Ate everything',
                      'Very active',
                      'Seemed tired',
                      'Good appetite',
                      'Normal behavior'
                    ].map((quickNote) => (
                      <button
                        key={quickNote}
                        onClick={() => setNotes(prev => prev ? `${prev}, ${quickNote}` : quickNote)}
                        className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {quickNote}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 py-2 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleQuickLog(selectedActivity)}
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Log Activity</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Recent Logs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {[
            { activity: 'Feeding', time: '2 hours ago', pet: 'Buddy' },
            { activity: 'Walk', time: '4 hours ago', pet: 'Luna' },
            { activity: 'Medication', time: '6 hours ago', pet: 'Max' },
            { activity: 'Water', time: '1 day ago', pet: 'Buddy' }
          ].map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{log.activity}</p>
                  <p className="text-sm text-gray-600">{log.pet}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
