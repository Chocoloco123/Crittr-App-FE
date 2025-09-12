'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Camera, 
  Calendar, 
  Weight, 
  Heart,
  MapPin,
  Tag,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Palette,
  Hash
} from 'lucide-react'
import { petApi, Pet as ApiPet, PetCreate, ApiError } from '@/lib/api'
import './PetProfiles.scss'

interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  sex?: string
  birthDate?: string
  weight?: number
  color?: string
  microchipId?: string
  avatar?: string
  image?: string
  imagePosition?: { x: number; y: number }
}

interface Toast {
  id: string
  type: 'success' | 'error'
  message: string
}

interface PetProfilesProps {
  isDemoMode?: boolean
}

export default function PetProfiles({ isDemoMode = false }: PetProfilesProps) {
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [petsPerPage] = useState(3) // Show 3 pets per page

  // Demo pets for demo mode
  const demoPets: Pet[] = [
    {
      id: 'demo-1',
      name: 'Buddy',
      species: 'dog',
      breed: 'Golden Retriever',
      sex: 'male',
      birthDate: '2020-03-15',
      weight: 65.5,
      color: 'Golden',
      microchipId: '123456789',
      avatar: '🐕'
    },
    {
      id: 'demo-2',
      name: 'Luna',
      species: 'cat',
      breed: 'Maine Coon',
      sex: 'female',
      birthDate: '2021-07-22',
      weight: 8.2,
      color: 'Black & White',
      microchipId: '987654321',
      avatar: '🐱'
    },
    {
      id: 'demo-3',
      name: 'Max',
      species: 'dog',
      breed: 'German Shepherd',
      sex: 'male',
      birthDate: '2019-08-10',
      weight: 75.0,
      color: 'Black & Tan',
      microchipId: '456789123',
      avatar: '🐕'
    }
  ]

  const speciesOptions = [
    { value: 'dog', label: 'Dog', emoji: '🐕' },
    { value: 'cat', label: 'Cat', emoji: '🐱' },
    { value: 'bird', label: 'Bird', emoji: '🐦' },
    { value: 'fish', label: 'Fish', emoji: '🐠' },
    { value: 'reptile', label: 'Reptile', emoji: '🦎' },
    { value: 'small_mammal', label: 'Small Mammal', emoji: '🐰' },
    { value: 'other', label: 'Other', emoji: '🐾' }
  ]

  const sexOptions = [
    { value: 'male', label: 'Male', emoji: '♂️' },
    { value: 'female', label: 'Female', emoji: '♀️' },
    { value: 'unknown', label: 'Unknown', emoji: '❓' }
  ]

  // Toast management
  const addToast = (type: 'success' | 'error', message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
  }

  // Load pets on component mount
  useEffect(() => {
    loadPets()
  }, [isDemoMode])

  const loadPets = async () => {
    setIsLoading(true)
    try {
      if (isDemoMode) {
        // Use demo pets for demo mode
        setPets(demoPets)
      } else {
        // Try to load from API first
        const apiPets = await petApi.getPets()
        setPets(apiPets.map(apiPet => ({
          id: apiPet.id,
          name: apiPet.name,
          species: apiPet.species,
          breed: apiPet.breed,
          sex: apiPet.sex,
          birthDate: apiPet.birthDate,
          weight: apiPet.weight,
          color: apiPet.color,
          microchipId: apiPet.microchipId,
          avatar: apiPet.avatar
        })))
      }
      // Pets loaded silently
    } catch (error) {
      console.warn('API not available, showing empty state:', error)
      // Show empty state instead of mock data
      setPets([])
    } finally {
      setIsLoading(false)
    }
  }

  const addPet = async (petData: Omit<Pet, 'id'>) => {
    try {
      if (isDemoMode) {
        // Demo mode: add to local state only
        const newPet = {
          id: `demo-${Date.now()}`,
          name: petData.name,
          species: petData.species,
          breed: petData.breed,
          sex: petData.sex,
          birthDate: petData.birthDate,
          weight: petData.weight,
          color: petData.color,
          microchipId: petData.microchipId,
          avatar: petData.avatar,
          image: petData.image
        }
        setPets(prev => [...prev, newPet])
        setIsAddModalOpen(false)
        addToast('success', 'Pet added to demo! (Changes are local only)')
        return
      }

      // Real mode: send to backend
      const petCreate: PetCreate = {
        name: petData.name,
        species: petData.species as any,
        breed: petData.breed,
        sex: petData.sex,
        birthDate: petData.birthDate,
        weight: petData.weight,
        color: petData.color,
        microchipId: petData.microchipId,
        avatar: petData.avatar,
        image: petData.image
      }
      
      const newPet = await petApi.createPet(petCreate)
      setPets(prev => [...prev, {
        id: newPet.id,
        name: newPet.name,
        species: newPet.species,
        breed: newPet.breed,
        birthDate: newPet.birthDate,
        weight: newPet.weight,
        color: newPet.color,
        microchipId: newPet.microchipId,
        avatar: newPet.avatar,
        image: newPet.image
      }])
      setIsAddModalOpen(false)
      addToast('success', 'Pet added successfully!')
    } catch (error) {
      console.error('Failed to add pet:', error)
      addToast('error', `Failed to add pet: ${error instanceof ApiError ? error.message : 'Unknown error'}`)
    }
  }

  const updatePet = async (petData: Pet) => {
    try {
      if (isDemoMode) {
        // Demo mode: update local state only
        setPets(prev => prev.map(pet => 
          pet.id === petData.id ? petData : pet
        ))
        setEditingPet(null)
        addToast('success', 'Pet updated in demo! (Changes are local only)')
        return
      }

      // Real mode: send to backend
      const petUpdate: PetCreate = {
        name: petData.name,
        species: petData.species as any,
        breed: petData.breed,
        sex: petData.sex,
        birthDate: petData.birthDate,
        weight: petData.weight,
        color: petData.color,
        microchipId: petData.microchipId,
        avatar: petData.avatar,
        image: petData.image
      }
      
      const updatedPet = await petApi.updatePet(petData.id, petUpdate)
      setPets(prev => prev.map(pet => 
        pet.id === petData.id 
          ? {
              id: updatedPet.id,
              name: updatedPet.name,
              species: updatedPet.species,
              breed: updatedPet.breed,
              birthDate: updatedPet.birthDate,
              weight: updatedPet.weight,
              color: updatedPet.color,
              microchipId: updatedPet.microchipId,
              avatar: updatedPet.avatar,
              image: updatedPet.image
            }
          : pet
      ))
      setEditingPet(null)
      addToast('success', 'Pet updated successfully!')
    } catch (error) {
      console.error('Failed to update pet:', error)
      addToast('error', `Failed to update pet: ${error instanceof ApiError ? error.message : 'Unknown error'}`)
    }
  }

  const deletePet = async (petId: string) => {
    try {
      if (isDemoMode) {
        // Demo mode: remove from local state only
        setPets(prev => prev.filter(pet => pet.id !== petId))
        addToast('success', 'Pet removed from demo! (Changes are local only)')
        return
      }

      // Real mode: send to backend
      await petApi.deletePet(petId)
      setPets(prev => prev.filter(pet => pet.id !== petId))
      addToast('success', 'Pet deleted successfully!')
    } catch (error) {
      console.error('Failed to delete pet:', error)
      addToast('error', `Failed to delete pet: ${error instanceof ApiError ? error.message : 'Unknown error'}`)
    }
  }

  const getSpeciesEmoji = (species: string) => {
    return speciesOptions.find(s => s.value === species)?.emoji || '🐾'
  }

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate)
    const today = new Date()
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + 
                       (today.getMonth() - birth.getMonth())
    
    if (ageInMonths < 12) {
      return `${ageInMonths} months old`
    } else {
      const years = Math.floor(ageInMonths / 12)
      const months = ageInMonths % 12
      return months > 0 ? `${years} years ${months} months old` : `${years} years old`
    }
  }

  // Carousel logic
  const totalPages = Math.ceil(pets.length / petsPerPage)
  const currentPets = pets.slice(currentPage * petsPerPage, (currentPage + 1) * petsPerPage)
  
  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }
  
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  // Reset to first page when pets change
  useEffect(() => {
    setCurrentPage(0)
  }, [pets.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPreviousPage()
      } else if (event.key === 'ArrowRight') {
        goToNextPage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="ml-2 text-secondary">Loading pets...</span>
      </div>
    )
  }

  return (
    <div className="pet-profiles-container">
      {/* Toast Notifications */}
      <div className="pet-toast-container">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`pet-toast ${toast.type}`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span className="font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="pet-profiles-header">
        <h2 className="pet-profiles-title">My Pets</h2>
        {!isDemoMode && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="pet-profiles-add-button"
          >
            <Plus className="h-4 w-4" />
            <span>Add Pet</span>
          </button>
        )}
      </div>

      {/* Pets Content */}
      <div className="pet-profiles-content">
        {pets.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl">🐾</span>
          </div>
          <h3 className="text-gray-900 text-xl font-semibold mb-3">
            {isDemoMode ? "No demo pets yet" : "Welcome to your pet family!"}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {isDemoMode 
              ? "Add some demo pets to explore the app's features. Changes are local only and won't be saved."
              : "Start building your pet's digital profile to track their health, activities, and create lasting memories."
            }
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className={`inline-flex items-center px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
              isDemoMode 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            <Plus className="h-5 w-5 mr-2" />
            {isDemoMode ? "Add Demo Pet" : "Add Your First Pet"}
          </button>
        </div>
      ) : (
        <div className="pet-profiles-carousel-wrapper">
          {/* Left Arrow */}
          {totalPages > 1 && (
            <button
              onClick={goToPreviousPage}
              className="pet-carousel-nav-button left"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
          )}

          {/* Pet Cards */}
          <div className="pet-profiles-carousel">
            <div className="pet-profiles-grid">
            {currentPets.map((pet) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pet-card"
              >
                {/* Pet Avatar */}
                <div className="pet-card-avatar">
                  {pet.image ? (
                    <img 
                      src={pet.image} 
                      alt={`${pet.name} photo`}
                      className="pet-card-avatar-image"
                      style={{ 
                        objectPosition: pet.imagePosition 
                          ? `${pet.imagePosition.x}% ${pet.imagePosition.y}%`
                          : '50% 50%'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                  ) : null}
                  <span className={`pet-card-avatar-emoji ${pet.image ? 'hidden' : ''}`}>
                    {pet.avatar || getSpeciesEmoji(pet.species)}
                  </span>
                </div>

                {/* Pet Info */}
                <div className="pet-card-info">
                  <div className="pet-card-header">
                    <h3 className="pet-card-name">{pet.name}</h3>
                    <div className="pet-card-actions">
                      <button
                        onClick={() => setEditingPet(pet)}
                        className="pet-card-action-button edit"
                        title={isDemoMode ? "Edit demo pet (local only)" : "Edit pet"}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deletePet(pet.id)}
                        className="pet-card-action-button delete"
                        title={isDemoMode ? "Delete demo pet (local only)" : "Delete pet"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pet-card-details">
                    <div className="pet-card-detail">
                      <Tag className="pet-card-detail-icon" />
                      <span className="pet-card-detail-text capitalize">{pet.species}</span>
                      {pet.breed && <span className="pet-card-detail-text">• {pet.breed}</span>}
                    </div>

                    {pet.sex && (
                      <div className="pet-card-detail">
                        <Heart className="pet-card-detail-icon" />
                        <span className="pet-card-detail-text capitalize">{pet.sex}</span>
                      </div>
                    )}

                    {pet.birthDate && (
                      <div className="pet-card-detail">
                        <Calendar className="pet-card-detail-icon" />
                        <span className="pet-card-detail-text">{calculateAge(pet.birthDate)}</span>
                      </div>
                    )}

                    {pet.weight && (
                      <div className="pet-card-detail">
                        <Weight className="pet-card-detail-icon" />
                        <span className="pet-card-detail-text">{pet.weight} lbs</span>
                      </div>
                    )}

                    {pet.color && (
                      <div className="pet-card-detail">
                        <Palette className="pet-card-detail-icon" />
                        <span className="pet-card-detail-text">{pet.color}</span>
                      </div>
                    )}

                    {pet.microchipId && (
                      <div className="pet-card-detail">
                        <Hash className="pet-card-detail-icon" />
                        <span className="pet-card-detail-text text-sm">{pet.microchipId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Page Indicators */}
          {totalPages > 1 && (
            <div className="pet-card-pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`pet-card-pagination-dot ${
                    i === currentPage ? 'active' : ''
                  }`}
                />
              ))}
            </div>
          )}
          </div>

          {/* Right Arrow */}
          {totalPages > 1 && (
            <button
              onClick={goToNextPage}
              className="pet-carousel-nav-button right"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          )}
        </div>
        )}
      </div>

      {/* Add Pet Modal */}
      {isAddModalOpen && (
        <PetModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={addPet}
          speciesOptions={speciesOptions}
          isDemoMode={isDemoMode}
        />
      )}

      {/* Edit Pet Modal */}
      {editingPet && (
        <PetModal
          isOpen={!!editingPet}
          onClose={() => setEditingPet(null)}
          onSave={updatePet}
          pet={editingPet}
          speciesOptions={speciesOptions}
          isDemoMode={isDemoMode}
        />
      )}
    </div>
  )
}

// Pet Modal Component
interface PetModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (petData: Pet) => void
  pet?: Pet | null
  speciesOptions: Array<{ value: string; label: string; emoji: string }>
  isDemoMode?: boolean
}

function PetModal({ isOpen, onClose, onSave, pet, speciesOptions, isDemoMode = false }: PetModalProps) {
  const [formData, setFormData] = useState({
    name: pet?.name || '',
    species: pet?.species || 'dog',
    breed: pet?.breed || '',
    sex: pet?.sex || '',
    birthDate: pet?.birthDate || '',
    weight: pet?.weight?.toString() || '',
    color: pet?.color || '',
    microchipId: pet?.microchipId || '',
    image: pet?.image || '',
    imagePosition: pet?.imagePosition || { x: 50, y: 50 }
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 }) // Percentage values for object-position

  // Initialize image preview when pet data changes
  useEffect(() => {
    if (pet?.image) {
      setImagePreview(pet.image)
    } else {
      setImagePreview(null)
    }
    setUploadedFile(null)
    setImagePosition(pet?.imagePosition || { x: 50, y: 50 })
  }, [pet])

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      setUploadedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle URL input change
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData({ ...formData, image: url })
    setImagePreview(url)
    setUploadedFile(null) // Clear uploaded file when using URL
  }

  // Handle position change
  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    const newPosition = { ...imagePosition, [axis]: value }
    setImagePosition(newPosition)
    setFormData({ ...formData, imagePosition: newPosition })
  }

  // Get the CSS object-position value
  const getObjectPosition = () => {
    return `${imagePosition.x}% ${imagePosition.y}%`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const petData = {
      ...formData,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      avatar: speciesOptions.find(s => s.value === formData.species)?.emoji
    }
    
    if (pet) {
      onSave({ ...petData, id: pet.id })
    } else {
      onSave({ ...petData, id: Date.now().toString() })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {pet ? (isDemoMode ? 'Edit Demo Pet' : 'Edit Pet') : (isDemoMode ? 'Add Demo Pet' : 'Add New Pet')}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pet Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter pet name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Species
              </label>
              <div className="relative">
                <select
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 appearance-none cursor-pointer"
                >
                  {speciesOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.emoji} {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Breed
              </label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter breed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sex
              </label>
              <div className="relative">
                <select
                  value={formData.sex}
                  onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Select sex</option>
                  <option value="male">♂️ Male</option>
                  <option value="female">♀️ Female</option>
                  <option value="unknown">❓ Unknown</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 date-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Weight (lbs)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                placeholder="Enter weight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Color
              </label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter color/pattern"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Microchip ID
              </label>
              <input
                type="text"
                value={formData.microchipId}
                onChange={(e) => setFormData({ ...formData, microchipId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter microchip ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pet Photo
              </label>
              
              {/* File Upload */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Upload from device
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                </p>
              </div>

              {/* OR Divider */}
              <div className="flex items-center mb-3">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-sm text-gray-500 dark:text-gray-400">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Enter image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
                  placeholder="https://example.com/pet-photo.jpg"
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Preview & Position
                  </label>
                  
                  {/* Pet Card Preview */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">How it will appear in the pet card:</div>
                    <div className="h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg overflow-hidden relative">
                      <img 
                        src={imagePreview} 
                        alt="Pet preview" 
                        className="w-full h-full object-cover"
                        style={{ objectPosition: getObjectPosition() }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {uploadedFile && (
                        <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Uploaded
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Position Controls */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Horizontal Position: {imagePosition.x}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={imagePosition.x}
                        onChange={(e) => handlePositionChange('x', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Left</span>
                        <span>Center</span>
                        <span>Right</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Vertical Position: {imagePosition.y}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={imagePosition.y}
                        onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Top</span>
                        <span>Center</span>
                        <span>Bottom</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Position Presets */}
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Quick Presets:
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          const pos = { x: 50, y: 30 }
                          setImagePosition(pos)
                          setFormData({ ...formData, imagePosition: pos })
                        }}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                      >
                        Face Focus
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const pos = { x: 50, y: 50 }
                          setImagePosition(pos)
                          setFormData({ ...formData, imagePosition: pos })
                        }}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                      >
                        Center
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const pos = { x: 50, y: 70 }
                          setImagePosition(pos)
                          setFormData({ ...formData, imagePosition: pos })
                        }}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                      >
                        Full Body
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  isDemoMode 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-sm hover:shadow-md' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {pet ? (isDemoMode ? 'Update Demo Pet' : 'Update Pet') : (isDemoMode ? 'Add Demo Pet' : 'Add Pet')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}