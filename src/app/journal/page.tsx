'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Home, 
  Calendar, 
  Activity, 
  Bell, 
  BarChart3, 
  Bot, 
  Users, 
  Shield,
  ArrowLeft,
  Plus
} from 'lucide-react'
import JournalList from '@/components/journal/JournalList'
import JournalEditor from '@/components/journal/JournalEditor'

interface JournalEntry {
  id: string
  title: string
  content: string
  petId: string
  petName: string
  entryType: 'general' | 'feeding' | 'medication' | 'exercise' | 'vet_visit' | 'grooming' | 'weight' | 'symptoms'
  attachments: Attachment[]
  createdAt: string
  updatedAt: string
}

interface Attachment {
  id: string
  type: 'image' | 'video' | 'document'
  url: string
  name: string
  size: number
}

export default function JournalPage() {
  const [showEditor, setShowEditor] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [selectedPetId, setSelectedPetId] = useState<string>('')
  const [selectedPetName, setSelectedPetName] = useState<string>('')

  const handleNewEntry = () => {
    setEditingEntry(null)
    setShowEditor(true)
  }

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry)
    setShowEditor(true)
  }

  const handleSaveEntry = (entryData: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    // In a real app, this would save to the backend
    console.log('Saving entry:', entryData)
    
    // Mock save - generate ID and timestamps
    const newEntry: JournalEntry = {
      ...entryData,
      id: editingEntry?.id || `entry-${Date.now()}`,
      createdAt: editingEntry?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Here you would typically update the Redux store or call an API
    alert(`Entry "${entryData.title}" saved successfully!`)
    
    setShowEditor(false)
    setEditingEntry(null)
  }

  const handleDeleteEntry = (entryId: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      // In a real app, this would delete from the backend
      console.log('Deleting entry:', entryId)
      alert('Entry deleted successfully!')
    }
  }

  const handleCancelEditor = () => {
    setShowEditor(false)
    setEditingEntry(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-blue-600">
                📝 Crittr Journal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Track your pet's health and activities
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pet Selection */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Pet</h3>
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
        </div>

        {/* Quick Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg text-center transition-colors flex flex-col items-center space-y-2"
                >
                  <Home className="h-5 w-5" />
                  <span className="text-xs font-medium">Dashboard</span>
                </motion.button>
              </Link>
              <Link href="/journal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-3 rounded-lg text-center transition-colors flex flex-col items-center space-y-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs font-medium">Journal</span>
                </motion.button>
              </Link>
              <Link href="/quick-log">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-lg text-center transition-colors flex flex-col items-center space-y-2"
                >
                  <Activity className="h-5 w-5" />
                  <span className="text-xs font-medium">Quick Log</span>
                </motion.button>
              </Link>
              <Link href="/reminders">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 p-3 rounded-lg text-center transition-colors flex flex-col items-center space-y-2"
                >
                  <Bell className="h-5 w-5" />
                  <span className="text-xs font-medium">Reminders</span>
                </motion.button>
              </Link>
              <Link href="/analytics">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 p-3 rounded-lg text-center transition-colors flex flex-col items-center space-y-2"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-xs font-medium">Analytics</span>
                </motion.button>
              </Link>
              <Link href="/ai-assistant">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-purple-700 p-3 rounded-lg text-center transition-colors flex flex-col items-center space-y-2"
                >
                  <Bot className="h-5 w-5" />
                  <span className="text-xs font-medium">AI Assistant</span>
                </motion.button>
              </Link>
              <Link href="/social">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-pink-100 hover:bg-pink-200 text-pink-700 p-3 rounded-lg text-center transition-colors flex flex-col items-center space-y-2"
                >
                  <Users className="h-5 w-5" />
                  <span className="text-xs font-medium">Community</span>
                </motion.button>
              </Link>
              <Link href="/export">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg text-center transition-colors flex flex-col items-center space-y-2"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-xs font-medium">Export</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Journal Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <JournalList
            petId={selectedPetId || undefined}
            onNewEntry={handleNewEntry}
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        </motion.div>
      </main>

      {/* Journal Editor Modal */}
      {showEditor && (
        <JournalEditor
          petId={selectedPetId}
          petName={selectedPetName}
          onSave={handleSaveEntry}
          onCancel={handleCancelEditor}
          initialData={editingEntry || undefined}
        />
      )}
    </div>
  )
}
