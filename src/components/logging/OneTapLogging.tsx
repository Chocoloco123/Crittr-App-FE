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
  FileText,
  GraduationCap
} from 'lucide-react'
import { useNotify } from '@/components/providers/NotificationProvider'

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
  logs?: QuickLog[]
  onLogActivity: (log: Omit<QuickLog, 'id'>) => void
  onEditLog?: (logId: string, updatedLog: Omit<QuickLog, 'id'>) => void
  onDeleteLog?: (logId: string) => void
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
  },
  {
    id: 'training',
    label: 'Training',
    icon: GraduationCap,
    color: 'bg-teal-500',
    hoverColor: 'hover:bg-teal-600',
    description: 'Log training session'
  }
]

export default function OneTapLogging({ petId, petName, logs = [], onLogActivity, onEditLog, onDeleteLog }: OneTapLoggingProps) {
  const [selectedPetId, setSelectedPetId] = useState<string>(petId || '')
  const [selectedPetName, setSelectedPetName] = useState<string>(petName || '')
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [notes, setNotes] = useState('')
  const [customTime, setCustomTime] = useState('')
  const [editingLog, setEditingLog] = useState<QuickLog | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const { error } = useNotify()

  // Available pets for selection
  const availablePets = [
    { id: '1', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever' },
    { id: '2', name: 'Luna', type: 'Cat', breed: 'Maine Coon' },
    { id: '3', name: 'Max', type: 'Dog', breed: 'Labrador' }
  ]

  const handleQuickLog = (activityId: string) => {
    if (!selectedPetId) {
      error('Pet Required', 'Please select a pet first', 3000)
      return
    }

    const activity = quickActivities.find(a => a.id === activityId)
    if (!activity) return

    const now = new Date()
    const logData: Omit<QuickLog, 'id'> = {
      petId: selectedPetId,
      petName: selectedPetName,
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

  const handleEditLog = (log: QuickLog) => {
    setEditingLog(log)
    setShowEditModal(true)
  }

  const handleDeleteLog = (logId: string) => {
    if (confirm('Are you sure you want to delete this log entry?')) {
      onDeleteLog?.(logId)
    }
  }

  const handleSaveEdit = () => {
    if (!editingLog || !onEditLog) return

    const updatedLog: Omit<QuickLog, 'id'> = {
      petId: editingLog.petId,
      petName: editingLog.petName,
      activityType: editingLog.activityType,
      timestamp: editingLog.timestamp,
      notes: editingLog.notes
    }

    onEditLog(editingLog.id, updatedLog)
    setShowEditModal(false)
    setEditingLog(null)
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
          {selectedPetName ? (
            <span className="text-indigo-600 font-medium"> for {selectedPetName}</span>
          ) : (
            <span className="text-gray-500 font-medium"> for all pets</span>
          )}
        </p>
      </div>

      {/* Pet Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Pet</h3>
          <button
            onClick={() => {
              setSelectedPetId('')
              setSelectedPetName('')
            }}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              selectedPetId === ''
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availablePets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => {
                setSelectedPetId(pet.id)
                setSelectedPetName(pet.name)
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedPetId === pet.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {pet.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{pet.name}</h4>
                  <p className="text-sm text-gray-600">{pet.breed}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
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
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
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

              {/* Pet Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Pet</label>
                <div className="grid grid-cols-1 gap-3">
                  {availablePets.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => {
                        setSelectedPetId(pet.id)
                        setSelectedPetName(pet.name)
                      }}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        selectedPetId === pet.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {pet.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{pet.name}</h4>
                          <p className="text-sm text-gray-600">{pet.breed}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
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
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Recent Logs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {/* Show actual logged activities first */}
          {logs.map((log) => {
            const activity = quickActivities.find(a => a.id === log.activityType)
            const Icon = activity?.icon || Clock
            
            return (
              <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {log.activityType.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {log.petName} • {formatTime(log.timestamp)}
                    </p>
                    {log.notes && (
                      <p className="text-xs text-gray-500 mt-1 italic">"{log.notes}"</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEditLog(log)}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    title="Edit log"
                  >
                    <FileText className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteLog(log.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete log"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
          
          {/* Always show demo data below actual logs */}
          {[
            { activity: 'Feeding', time: '2 hours ago', pet: 'Buddy', notes: 'Ate all his kibble' },
            { activity: 'Walk', time: '4 hours ago', pet: 'Luna', notes: '30 minute walk in the park' },
            { activity: 'Medication', time: '6 hours ago', pet: 'Max', notes: 'Heartworm prevention' },
            { activity: 'Water', time: '1 day ago', pet: 'Buddy', notes: 'Refilled water bowl' }
          ].map((log, index) => {
            const activity = quickActivities.find(a => a.label === log.activity)
            const Icon = activity?.icon || Clock
            
            return (
              <div key={`demo-${index}`} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm opacity-75">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{log.activity}</p>
                    <p className="text-sm text-gray-600">{log.pet} • {log.time}</p>
                    {log.notes && (
                      <p className="text-xs text-gray-500 mt-1 italic">"{log.notes}"</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded font-medium">
                    Demo
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        {logs.length === 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              💡 This is demo data. Log your first activity above to see it here!
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingLog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Activity</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Pet Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet</label>
                <select
                  value={editingLog.petId}
                  onChange={(e) => {
                    const pet = availablePets.find(p => p.id === e.target.value)
                    if (pet) {
                      setEditingLog(prev => prev ? { ...prev, petId: pet.id, petName: pet.name } : null)
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {availablePets.map(pet => (
                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                  ))}
                </select>
              </div>

              {/* Activity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
                <select
                  value={editingLog.activityType}
                  onChange={(e) => setEditingLog(prev => prev ? { ...prev, activityType: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {quickActivities.map(activity => (
                    <option key={activity.id} value={activity.id}>{activity.label}</option>
                  ))}
                </select>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="datetime-local"
                  value={new Date(editingLog.timestamp).toISOString().slice(0, 16)}
                  onChange={(e) => setEditingLog(prev => prev ? { ...prev, timestamp: new Date(e.target.value).toISOString() } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={editingLog.notes || ''}
                  onChange={(e) => setEditingLog(prev => prev ? { ...prev, notes: e.target.value } : null)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Add notes..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
