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
import './page.scss'

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
    <div className="journal-page">
      {/* Header */}
      <AppNavigation currentPage="Journal" />

      <main className="journal-container">
        {/* Journal Header */}
        <div className="journal-header">
          <h1 className="journal-title">📝 Pet Journal</h1>
          <p className="journal-subtitle">Capture precious moments and track your pet's health journey</p>
        </div>

        {/* Pet Selection */}
        <div className="journal-pet-selection">
          <div className="journal-pet-selection-header">
            <h3 className="journal-pet-selection-title">Select Pet</h3>
            <button
              onClick={() => {
                setSelectedPetId('')
                setSelectedPetName('')
              }}
              className={`journal-pet-selection-button ${
                selectedPetId === '' ? 'active' : 'inactive'
              }`}
            >
              See All
            </button>
          </div>
          <div className="journal-pet-selection-content">
            <div className="journal-pet-grid">
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
                  className={`journal-pet-card ${
                    selectedPetId === pet.id ? 'selected' : ''
                  }`}
                >
                  <div className="journal-pet-avatar">
                    {pet.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="journal-pet-name">{pet.name}</h4>
                    <p className="journal-pet-breed">{pet.breed}</p>
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
          className="journal-content"
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
