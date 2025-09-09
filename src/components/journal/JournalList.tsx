'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Heart, 
  Pill, 
  Activity, 
  Stethoscope, 
  Scissors, 
  Weight, 
  PawPrint,
  FileText,
  Image,
  Video,
  Download,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'

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

interface JournalListProps {
  petId?: string
  onNewEntry: () => void
  onEditEntry: (entry: JournalEntry) => void
  onDeleteEntry: (entryId: string) => void
}

const entryTypeConfig = {
  general: { icon: FileText, color: 'text-gray-600', bgColor: 'bg-gray-100' },
  feeding: { icon: Heart, color: 'text-green-600', bgColor: 'bg-green-100' },
  medication: { icon: Pill, color: 'text-red-600', bgColor: 'bg-red-100' },
  exercise: { icon: Activity, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  vet_visit: { icon: Stethoscope, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  grooming: { icon: Scissors, color: 'text-pink-600', bgColor: 'bg-pink-100' },
  weight: { icon: Weight, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  symptoms: { icon: PawPrint, color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
}

// Mock data for demonstration
const mockEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'Morning Feeding',
    content: 'Fed Buddy his regular breakfast. He ate everything and seemed very happy!',
    petId: '1',
    petName: 'Buddy',
    entryType: 'feeding',
    attachments: [],
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z'
  },
  {
    id: '2',
    title: 'Vet Checkup',
    content: 'Annual checkup went well. Dr. Smith said Buddy is in excellent health. Weight is stable at 25kg.',
    petId: '1',
    petName: 'Buddy',
    entryType: 'vet_visit',
    attachments: [
      {
        id: 'att1',
        type: 'document',
        url: '/mock-vet-report.pdf',
        name: 'Vet Report.pdf',
        size: 1024000
      }
    ],
    createdAt: '2024-01-14T14:00:00Z',
    updatedAt: '2024-01-14T14:00:00Z'
  },
  {
    id: '3',
    title: 'Evening Walk',
    content: 'Took Luna for a 30-minute walk around the park. She was very energetic and met some new dog friends.',
    petId: '2',
    petName: 'Luna',
    entryType: 'exercise',
    attachments: [
      {
        id: 'att2',
        type: 'image',
        url: '/mock-walk-photo.jpg',
        name: 'Walk Photo.jpg',
        size: 2048000
      }
    ],
    createdAt: '2024-01-14T18:00:00Z',
    updatedAt: '2024-01-14T18:00:00Z'
  }
]

export default function JournalList({ petId, onNewEntry, onEditEntry, onDeleteEntry }: JournalListProps) {
  const [entries] = useState<JournalEntry[]>(mockEntries)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  const filteredEntries = entries
    .filter(entry => {
      if (petId && entry.petId !== petId) return false
      if (searchTerm && !entry.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !entry.content.toLowerCase().includes(searchTerm.toLowerCase())) return false
      if (filterType !== 'all' && entry.entryType !== filterType) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return a.title.localeCompare(b.title)
    })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Journal Entries</h2>
          <p className="text-gray-600">Track your pet's daily activities and health</p>
        </div>
        <button
          onClick={onNewEntry}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter by Type */}
          <div className="sm:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="general">General</option>
              <option value="feeding">Feeding</option>
              <option value="medication">Medication</option>
              <option value="exercise">Exercise</option>
              <option value="vet_visit">Vet Visit</option>
              <option value="grooming">Grooming</option>
              <option value="weight">Weight</option>
              <option value="symptoms">Symptoms</option>
            </select>
          </div>

          {/* Sort */}
          <div className="sm:w-32">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No entries found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start documenting your pet\'s activities and health'
              }
            </p>
            {!searchTerm && filterType === 'all' && (
              <button
                onClick={onNewEntry}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create First Entry
              </button>
            )}
          </div>
        ) : (
          filteredEntries.map((entry, index) => {
            const typeConfig = entryTypeConfig[entry.entryType]
            const Icon = typeConfig.icon
            
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${typeConfig.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${typeConfig.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(entry.createdAt)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="capitalize">{entry.entryType.replace('_', ' ')}</span>
                          </span>
                          <span>{entry.petName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEditEntry(entry)}
                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        title="Edit entry"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 line-clamp-3">
                      {entry.content.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>

                  {/* Attachments */}
                  {entry.attachments.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">Attachments:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {entry.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg"
                          >
                            {attachment.type === 'image' && <Image className="h-4 w-4 text-green-600" />}
                            {attachment.type === 'video' && <Video className="h-4 w-4 text-purple-600" />}
                            {attachment.type === 'document' && <FileText className="h-4 w-4 text-blue-600" />}
                            <span className="text-sm text-gray-700">{attachment.name}</span>
                            <span className="text-xs text-gray-500">({formatFileSize(attachment.size)})</span>
                            <button className="text-indigo-600 hover:text-indigo-800">
                              <Download className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Created {formatDate(entry.createdAt)}</span>
                      {entry.updatedAt !== entry.createdAt && (
                        <span>Updated {formatDate(entry.updatedAt)}</span>
                      )}
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}
