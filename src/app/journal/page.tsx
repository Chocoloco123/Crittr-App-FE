'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
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
  Plus,
  Settings,
  User,
  LogOut
} from 'lucide-react'
import JournalList from '@/components/journal/JournalList'
import JournalEditor from '@/components/journal/JournalEditor'
import AppNavigation from '@/components/layout/AppNavigation'
import QuickNavigation from '@/components/layout/QuickNavigation'
import { useDemoStorageArray } from '@/lib/hooks/useDemoStorage'

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
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [selectedPetId, setSelectedPetId] = useState<string>('')
  const [selectedPetName, setSelectedPetName] = useState<string>('')
  
  // Use optimized demo storage hook
  const { data: entries, addItem: addEntry, updateItem: updateEntry, removeItem: removeEntry } = useDemoStorageArray<JournalEntry>('journal-entries')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const handleNewEntry = () => {
    setEditingEntry(null)
    setShowEditor(true)
  }

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry)
    setShowEditor(true)
  }

  const handleSaveEntry = (entryData: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: editingEntry?.id || `entry-${Date.now()}`,
      createdAt: editingEntry?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    if (editingEntry) {
      // Update existing entry
      updateEntry(editingEntry.id, newEntry)
    } else {
      // Add new entry
      addEntry(newEntry)
    }
    
    alert(`Entry "${entryData.title}" saved successfully!`)
    setShowEditor(false)
    setEditingEntry(null)
  }

  const handleDeleteEntry = (entryId: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      removeEntry(entryId)
      alert('Entry deleted successfully!')
    }
  }

  const handleCancelEditor = () => {
    setShowEditor(false)
    setEditingEntry(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <AppNavigation currentPage="Journal" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Journal Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <JournalList
            entries={entries}
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
          onPetChange={(petId, petName) => {
            setSelectedPetId(petId)
            setSelectedPetName(petName)
          }}
        />
      )}
    </div>
  )
}
