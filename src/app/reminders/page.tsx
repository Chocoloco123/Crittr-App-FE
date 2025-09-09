'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import RemindersList from '@/components/reminders/RemindersList'
import ReminderForm from '@/components/reminders/ReminderForm'
import Header from '@/components/layout/Header'

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

export default function RemindersPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)
  const [selectedPetId, setSelectedPetId] = useState<string>('')
  const [selectedPetName, setSelectedPetName] = useState<string>('')
  const [reminders, setReminders] = useState<Reminder[]>([])

  const handleNewReminder = () => {
    setEditingReminder(null)
    setShowForm(true)
  }

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder)
    setShowForm(true)
  }

  const handleSaveReminder = (reminderData: Omit<Reminder, 'id' | 'createdAt'>) => {
    // In a real app, this would save to the backend
    console.log('Saving reminder:', reminderData)
    
    // Mock save - generate ID and timestamp
    const newReminder: Reminder = {
      ...reminderData,
      id: editingReminder?.id || `reminder-${Date.now()}`,
      createdAt: editingReminder?.createdAt || new Date().toISOString()
    }
    
    if (editingReminder) {
      // Update existing reminder
      setReminders(prev => prev.map(r => r.id === editingReminder.id ? newReminder : r))
    } else {
      // Add new reminder
      setReminders(prev => [newReminder, ...prev])
    }
    
    alert(`Reminder "${reminderData.title}" saved successfully!`)
    
    setShowForm(false)
    setEditingReminder(null)
  }

  const handleDeleteReminder = (reminderId: string) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      // In a real app, this would delete from the backend
      console.log('Deleting reminder:', reminderId)
      setReminders(prev => prev.filter(r => r.id !== reminderId))
      alert('Reminder deleted successfully!')
    }
  }

  const handleToggleReminder = (reminderId: string) => {
    // In a real app, this would update the backend
    console.log('Toggling reminder:', reminderId)
    setReminders(prev => prev.map(r => 
      r.id === reminderId ? { ...r, isActive: !r.isActive } : r
    ))
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingReminder(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">🔔 Reminders</h1>
          <p className="text-gray-600">Never miss important pet care tasks</p>
        </div>

        {/* Pet Selection */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Pet</h3>
              <button
                onClick={() => {
                  setSelectedPetId('')
                  setSelectedPetName('')
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  selectedPetId === ''
                    ? 'bg-primary-600 text-white'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                View All Pets
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: '1', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever' },
                { id: '2', name: 'Luna', type: 'Cat', breed: 'Maine Coon' },
                { id: '3', name: 'Max', type: 'Dog', breed: 'Labrador' }
              ].map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => {
                    setSelectedPetId(pet.id)
                    setSelectedPetName(pet.name)
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
                    selectedPetId === pet.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
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
        </div>

        {/* Reminders Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <RemindersList
            petId={selectedPetId || undefined}
            petName={selectedPetName || undefined}
            onNewReminder={handleNewReminder}
            onEditReminder={handleEditReminder}
            onDeleteReminder={handleDeleteReminder}
            onToggleReminder={handleToggleReminder}
          />
        </motion.div>
      </main>

      {/* Reminder Form Modal */}
      {showForm && (
        <ReminderForm
          petId={selectedPetId}
          petName={selectedPetName}
          onSave={handleSaveReminder}
          onCancel={handleCancelForm}
          initialData={editingReminder || undefined}
        />
      )}
    </div>
  )
}
