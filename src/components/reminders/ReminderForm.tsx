'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Bell, 
  Clock, 
  Calendar, 
  Repeat, 
  Heart, 
  Pill, 
  Activity, 
  Stethoscope, 
  Scissors, 
  Weight, 
  PawPrint,
  Edit,
  Trash2,
  Check,
  X,
  Settings,
  Sun,
  Moon,
  Coffee
} from 'lucide-react'
import { useNotify } from '@/components/providers/NotificationProvider'

interface Reminder {
  id: string
  title: string
  description?: string
  petId: string
  petName: string
  reminderType: 'feeding' | 'medication' | 'exercise' | 'vet_visit' | 'grooming' | 'weight' | 'general'
  time: string
  frequency: 'once' | 'daily' | 'weekly' | 'monthly'
  isActive: boolean
  createdAt: string
  lastTriggered?: string
}

interface ReminderFormProps {
  petId?: string
  petName?: string
  onSave: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void
  onCancel: () => void
  initialData?: Partial<Reminder>
}

const reminderTypes = [
  { value: 'feeding', label: 'Feeding', icon: Heart, color: 'text-green-600', bgColor: 'bg-green-100' },
  { value: 'medication', label: 'Medication', icon: Pill, color: 'text-red-600', bgColor: 'bg-red-100' },
  { value: 'exercise', label: 'Exercise', icon: Activity, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { value: 'vet_visit', label: 'Vet Visit', icon: Stethoscope, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { value: 'grooming', label: 'Grooming', icon: Scissors, color: 'text-pink-600', bgColor: 'bg-pink-100' },
  { value: 'weight', label: 'Weight Check', icon: Weight, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { value: 'general', label: 'General', icon: Bell, color: 'text-gray-600', bgColor: 'bg-gray-100' }
]

const frequencies = [
  { value: 'once', label: 'Once', icon: Calendar },
  { value: 'daily', label: 'Daily', icon: Sun },
  { value: 'weekly', label: 'Weekly', icon: Repeat },
  { value: 'monthly', label: 'Monthly', icon: Moon }
]


// Helper function to convert 24-hour to 12-hour format
const formatTime12Hour = (time24: string) => {
  const [hours, minutes] = time24.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export default function ReminderForm({ petId, petName, onSave, onCancel, initialData }: ReminderFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [reminderType, setReminderType] = useState<Reminder['reminderType']>(
    initialData?.reminderType || 'general'
  )
  const [time, setTime] = useState(initialData?.time || '')
  const [frequency, setFrequency] = useState<Reminder['frequency']>(
    initialData?.frequency || 'daily'
  )
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true)
  const [timeError, setTimeError] = useState('')
  const { error } = useNotify()

  // Validate time input
  const validateTime = (timeValue: string) => {
    if (!timeValue) {
      setTimeError('Please select a time')
      return false
    }
    
    const [hours, minutes] = timeValue.split(':')
    const hour = parseInt(hours)
    const minute = parseInt(minutes)
    
    if (isNaN(hour) || isNaN(minute)) {
      setTimeError('Invalid time format')
      return false
    }
    
    if (hour < 0 || hour > 23) {
      setTimeError('Hour must be between 00 and 23')
      return false
    }
    
    if (minute < 0 || minute > 59) {
      setTimeError('Minutes must be between 00 and 59')
      return false
    }
    
    setTimeError('')
    return true
  }

  // Handle time change with validation
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value
    setTime(timeValue)
    validateTime(timeValue)
  }


  const handleSave = () => {
    if (!title.trim()) {
      error('Missing Information', 'Please fill in the title', 3000)
      return
    }

    if (!validateTime(time)) {
      error('Invalid Time', timeError || 'Please select a valid time', 3000)
      return
    }

    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      petId: petId || '',
      petName: petName || '',
      reminderType,
      time,
      frequency,
      isActive
    })
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Set Reminder</h2>
              {petName && (
                <p className="text-purple-100 mt-1">For {petName}</p>
              )}
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Reminder Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Reminder Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {reminderTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    onClick={() => setReminderType(type.value as Reminder['reminderType'])}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      reminderType === type.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mx-auto mb-1 ${type.color}`} />
                    <span className="text-xs font-medium text-gray-700">
                      {type.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter reminder title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Set Time *
            </label>
            
            {/* Custom Time Input */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-3 text-center">
                Enter the time for your reminder
              </div>
              <div className="flex items-center justify-center space-x-2">
                <input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    timeError 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300'
                  }`}
                />
                <span className="text-sm text-gray-500">(12-hour format)</span>
              </div>

              {/* Error Message */}
              {timeError && (
                <div className="mt-2 text-center">
                  <span className="text-sm text-red-600">{timeError}</span>
                </div>
              )}

              {/* Display Selected Time */}
              {time && !timeError && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-lg">
                    <Clock className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="text-sm font-semibold text-purple-700">
                      Selected: {formatTime12Hour(time)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frequency */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Frequency
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {frequencies.map((freq) => {
                const Icon = freq.icon
                return (
                  <button
                    key={freq.value}
                    onClick={() => setFrequency(freq.value as Reminder['frequency'])}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      frequency === freq.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700">
                      {freq.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Toggle */}
          <div className="mb-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Active (reminder will trigger)
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span>Set Reminder</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
