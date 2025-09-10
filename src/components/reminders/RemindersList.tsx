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
  Coffee,
  Filter,
  Search,
  Play,
  Pause
} from 'lucide-react'

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

interface RemindersListProps {
  petId?: string
  petName?: string
  reminders: Reminder[]
  onNewReminder: () => void
  onEditReminder: (reminder: Reminder) => void
  onDeleteReminder: (reminderId: string) => void
  onToggleReminder: (reminderId: string) => void
}

const reminderTypeConfig = {
  feeding: { icon: Heart, color: 'text-green-600', bgColor: 'bg-green-100' },
  medication: { icon: Pill, color: 'text-red-600', bgColor: 'bg-red-100' },
  exercise: { icon: Activity, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  vet_visit: { icon: Stethoscope, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  grooming: { icon: Scissors, color: 'text-pink-600', bgColor: 'bg-pink-100' },
  weight: { icon: Weight, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  general: { icon: Bell, color: 'text-gray-600', bgColor: 'bg-gray-100' }
}

const frequencyConfig = {
  once: { icon: Calendar, label: 'Once' },
  daily: { icon: Sun, label: 'Daily' },
  weekly: { icon: Repeat, label: 'Weekly' },
  monthly: { icon: Moon, label: 'Monthly' }
}

// Mock data for demonstration
const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Morning Feeding',
    description: 'Feed Buddy his breakfast',
    petId: '1',
    petName: 'Buddy',
    reminderType: 'feeding',
    time: '08:00',
    frequency: 'daily',
    isActive: true,
    createdAt: '2024-01-15T08:00:00Z',
    lastTriggered: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    title: 'Evening Medication',
    description: 'Give Luna her heart medication',
    petId: '2',
    petName: 'Luna',
    reminderType: 'medication',
    time: '20:00',
    frequency: 'daily',
    isActive: true,
    createdAt: '2024-01-14T20:00:00Z',
    lastTriggered: '2024-01-14T20:00:00Z'
  },
  {
    id: '3',
    title: 'Weekly Weight Check',
    description: 'Weigh Max and record in journal',
    petId: '3',
    petName: 'Max',
    reminderType: 'weight',
    time: '10:00',
    frequency: 'weekly',
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '4',
    title: 'Vet Appointment',
    description: 'Annual checkup with Dr. Smith',
    petId: '1',
    petName: 'Buddy',
    reminderType: 'vet_visit',
    time: '14:00',
    frequency: 'once',
    isActive: false,
    createdAt: '2024-01-05T14:00:00Z'
  }
]

export default function RemindersList({ 
  petId, 
  petName,
  reminders,
  onNewReminder, 
  onEditReminder, 
  onDeleteReminder, 
  onToggleReminder 
}: RemindersListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredReminders = reminders
    .filter(reminder => {
      if (petId && reminder.petId !== petId) return false
      if (searchTerm && !reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !reminder.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false
      if (filterType !== 'all' && reminder.reminderType !== filterType) return false
      if (filterStatus !== 'all') {
        if (filterStatus === 'active' && !reminder.isActive) return false
        if (filterStatus === 'inactive' && reminder.isActive) return false
      }
      return true
    })
    .sort((a, b) => {
      // Sort by active status first, then by creation date (newest first), then by time
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1
      if (a.createdAt !== b.createdAt) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return a.time.localeCompare(b.time)
    })

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getNextTrigger = (reminder: Reminder) => {
    if (!reminder.isActive) return 'Inactive'
    
    const now = new Date()
    const [hours, minutes] = reminder.time.split(':')
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes))
    
    // For 'once' frequency, use the createdAt date
    if (reminder.frequency === 'once') {
      const reminderDate = new Date(reminder.createdAt)
      const reminderDateTime = new Date(reminderDate.getFullYear(), reminderDate.getMonth(), reminderDate.getDate(), parseInt(hours), parseInt(minutes))
      
      if (reminderDateTime > now) {
        const diffDays = Math.ceil((reminderDateTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        if (diffDays === 0) return `Today at ${formatTime(reminder.time)}`
        if (diffDays === 1) return `Tomorrow at ${formatTime(reminder.time)}`
        return `${diffDays} days at ${formatTime(reminder.time)}`
      } else {
        return 'Past due'
      }
    }
    
    // For recurring frequencies (daily, weekly, monthly)
    let nextDate = new Date(today)
    
    if (reminder.frequency === 'daily') {
      if (today <= now) {
        nextDate.setDate(nextDate.getDate() + 1)
      }
    } else if (reminder.frequency === 'weekly') {
      // Find next occurrence on the same day of the week
      const reminderDay = new Date(reminder.createdAt).getDay()
      const currentDay = now.getDay()
      
      if (today > now) {
        // Today's time hasn't passed yet
        nextDate = today
      } else {
        // Find next week on the same day
        const daysUntilNextWeek = (reminderDay - currentDay + 7) % 7
        nextDate.setDate(nextDate.getDate() + (daysUntilNextWeek === 0 ? 7 : daysUntilNextWeek))
      }
    } else if (reminder.frequency === 'monthly') {
      // Find next occurrence on the same date next month
      if (today > now) {
        nextDate = today
      } else {
        nextDate.setMonth(nextDate.getMonth() + 1)
      }
    }
    
    // Format the result
    const diffDays = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return `Today at ${formatTime(reminder.time)}`
    if (diffDays === 1) return `Tomorrow at ${formatTime(reminder.time)}`
    if (diffDays < 7) return `In ${diffDays} days at ${formatTime(reminder.time)}`
    if (diffDays < 14) return `Next week at ${formatTime(reminder.time)}`
    if (diffDays < 30) return `In ${Math.ceil(diffDays / 7)} weeks at ${formatTime(reminder.time)}`
    return `In ${Math.ceil(diffDays / 30)} months at ${formatTime(reminder.time)}`
  }

  const getUpcomingReminders = () => {
    const now = new Date()
    const [currentHour, currentMinute] = [now.getHours(), now.getMinutes()]
    
    return filteredReminders.filter(reminder => {
      if (!reminder.isActive) return false
      const [reminderHour, reminderMinute] = reminder.time.split(':').map(Number)
      return reminderHour > currentHour || (reminderHour === currentHour && reminderMinute > currentMinute)
    }).slice(0, 3)
  }

  const upcomingReminders = getUpcomingReminders()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reminders</h2>
          <p className="text-gray-600">
            {petId && petName 
              ? `Showing reminders for ${petName}` 
              : 'Showing reminders for all pets'
            }
          </p>
        </div>
        <button
          onClick={onNewReminder}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
        >
          <Plus className="h-5 w-5" />
          <span>New Reminder</span>
        </button>
      </div>

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 text-purple-600 mr-2" />
            Upcoming Today
          </h3>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => {
              const typeConfig = reminderTypeConfig[reminder.reminderType]
              const Icon = typeConfig.icon
              
              return (
                <div key={reminder.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${typeConfig.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-4 w-4 ${typeConfig.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{reminder.title}</p>
                      <p className="text-sm text-gray-600">{reminder.petName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-purple-600">{formatTime(reminder.time)}</p>
                    <p className="text-sm text-gray-500">{frequencyConfig[reminder.frequency].label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search reminders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
            />
          </div>

          {/* Filter by Type */}
          <div className="sm:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-5 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer appearance-none bg-white"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1rem 1rem'
              }}
            >
              <option value="all">All Types</option>
              <option value="feeding">Feeding</option>
              <option value="medication">Medication</option>
              <option value="exercise">Exercise</option>
              <option value="vet_visit">Vet Visit</option>
              <option value="grooming">Grooming</option>
              <option value="weight">Weight</option>
              <option value="general">General</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div className="sm:w-36">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-5 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer appearance-none bg-white"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1rem 1rem'
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            All Reminders ({filteredReminders.length})
          </h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <div className="p-4 space-y-4">
            {filteredReminders.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first reminder to stay on top of pet care'
              }
            </p>
            {!searchTerm && filterType === 'all' && filterStatus === 'all' && (
              <button
                onClick={onNewReminder}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
              >
                Create First Reminder
              </button>
            )}
          </div>
        ) : (
          filteredReminders.map((reminder, index) => {
            const typeConfig = reminderTypeConfig[reminder.reminderType]
            const frequencyInfo = frequencyConfig[reminder.frequency]
            const Icon = typeConfig.icon
            const FrequencyIcon = frequencyInfo.icon
            
            return (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-lg border transition-all ${
                  reminder.isActive ? 'border-gray-200 hover:shadow-md' : 'border-gray-100 opacity-75'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${typeConfig.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${typeConfig.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{reminder.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(reminder.time)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FrequencyIcon className="h-4 w-4" />
                            <span>{frequencyInfo.label}</span>
                          </span>
                          <span>{reminder.petName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onToggleReminder(reminder.id)}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          reminder.isActive 
                            ? 'text-green-600 hover:text-green-800 hover:bg-green-50' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }`}
                        title={reminder.isActive ? 'Pause reminder' : 'Activate reminder'}
                      >
                        {reminder.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => onEditReminder(reminder)}
                        className="p-2 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                        title="Edit reminder"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteReminder(reminder.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete reminder"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {reminder.description && (
                    <div className="mb-4">
                      <p className="text-gray-700">{reminder.description}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <span className={reminder.isActive ? 'text-green-600 font-medium' : 'text-gray-400'}>
                        {getNextTrigger(reminder)}
                      </span>
                      {reminder.lastTriggered && (
                        <span className="ml-4">
                          Last triggered: {new Date(reminder.lastTriggered).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reminder.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {reminder.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
          </div>
        </div>
      </div>
    </div>
  )
}
