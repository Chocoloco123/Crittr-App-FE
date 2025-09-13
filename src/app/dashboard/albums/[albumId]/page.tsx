'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft,
  Plus, 
  Camera, 
  Download,
  Share2,
  Edit,
  Trash2,
  X,
  Calendar,
  User,
  Tag,
  Heart,
  Eye
} from 'lucide-react'
import AppNavigation from '@/components/layout/AppNavigation'
import { useNotify } from '@/components/providers/NotificationProvider'
import './page.scss'

interface Photo {
  id: string
  filename: string
  original_filename: string
  file_path: string
  mime_type: string
  file_size: number
  width?: number
  height?: number
  caption?: string
  tags?: string[]
  created_at: string
}

interface PhotoAlbum {
  id: string
  name: string
  description?: string
  cover_photo_id?: string
  pet_id: string
  user_id: string
  is_public: boolean
  created_at: string
  updated_at: string
  photos: Photo[]
  photo_count: number
}

export default function AlbumPage() {
  const params = useParams()
  const router = useRouter()
  const { success, error } = useNotify()
  const [mounted, setMounted] = useState(false)
  const [album, setAlbum] = useState<PhotoAlbum | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [showPhotoViewer, setShowPhotoViewer] = useState(false)
  const [loading, setLoading] = useState(true)

  // Demo pets data
  const demoPets = [
    { id: '1', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', avatar: '🐕' },
    { id: '2', name: 'Luna', type: 'Cat', breed: 'Maine Coon', avatar: '🐱' },
    { id: '3', name: 'Max', type: 'Dog', breed: 'Labrador', avatar: '🐕' }
  ]

  // Mock album data
  const mockAlbums: PhotoAlbum[] = [
    {
      id: '1',
      name: 'Buddy\'s Adventures',
      description: 'All the fun times with Buddy',
      cover_photo_id: '1',
      pet_id: '1',
      user_id: 'demo',
      is_public: false,
      created_at: '2024-01-15T08:30:00Z',
      updated_at: '2024-01-15T08:30:00Z',
      photos: [
        {
          id: '1',
          filename: 'dog.png',
          original_filename: 'buddy_park.jpg',
          file_path: '/images/icons/dog.png',
          mime_type: 'image/png',
          file_size: 2048000,
          caption: 'Buddy at the park',
          tags: ['park', 'fun', 'outdoor'],
          created_at: '2024-01-15T08:30:00Z'
        },
        {
          id: '2',
          filename: 'goldenretriever.png',
          original_filename: 'buddy_sleeping.jpg',
          file_path: '/images/icons/goldenretriever.png',
          mime_type: 'image/png',
          file_size: 2048000,
          caption: 'Buddy taking a nap',
          tags: ['sleep', 'cute', 'indoor'],
          created_at: '2024-01-14T15:20:00Z'
        }
      ],
      photo_count: 2
    },
    {
      id: '2',
      name: 'Luna\'s Cute Moments',
      description: 'Luna being adorable',
      cover_photo_id: '3',
      pet_id: '2',
      user_id: 'demo',
      is_public: false,
      created_at: '2024-01-14T10:15:00Z',
      updated_at: '2024-01-14T10:15:00Z',
      photos: [
        {
          id: '3',
          filename: 'cat.png',
          original_filename: 'luna_window.jpg',
          file_path: '/images/icons/cat.png',
          mime_type: 'image/png',
          file_size: 2048000,
          caption: 'Luna watching birds',
          tags: ['window', 'birds', 'cute'],
          created_at: '2024-01-14T10:15:00Z'
        },
        {
          id: '4',
          filename: 'paw.png',
          original_filename: 'luna_paw.jpg',
          file_path: '/images/icons/paw.png',
          mime_type: 'image/png',
          file_size: 2048000,
          caption: 'Luna\'s cute paw',
          tags: ['paw', 'cute', 'close-up'],
          created_at: '2024-01-13T16:45:00Z'
        }
      ],
      photo_count: 2
    }
  ]

  useEffect(() => {
    setMounted(true)
    
    // Find the album by ID
    const albumId = params.albumId as string
    const foundAlbum = mockAlbums.find(a => a.id === albumId)
    
    if (foundAlbum) {
      console.log('Found album:', foundAlbum)
      console.log('Album photos:', foundAlbum.photos)
      setAlbum(foundAlbum)
    } else {
      error('Album Not Found', 'The album you\'re looking for doesn\'t exist.', 4000)
      router.push('/dashboard/albums')
    }
    
    setLoading(false)
  }, [params.albumId, router])

  const getPetName = (petId: string) => {
    const pet = demoPets.find(p => p.id === petId)
    return pet ? pet.name : 'Unknown Pet'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleViewPhoto = (photo: Photo) => {
    setSelectedPhoto(photo)
    setShowPhotoViewer(true)
  }

  const handleClosePhotoViewer = () => {
    setShowPhotoViewer(false)
    setSelectedPhoto(null)
  }

  const handleDownload = (photo: Photo) => {
    const link = document.createElement('a')
    link.href = photo.file_path
    link.download = photo.original_filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = (photo: Photo) => {
    if (navigator.share) {
      navigator.share({
        title: photo.caption || photo.original_filename,
        url: photo.file_path,
      }).catch(console.error)
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(photo.file_path)
      success('Link Copied', 'Photo link copied to clipboard', 2000)
    }
  }

  const handleDeleteAlbum = () => {
    if (confirm('Are you sure you want to delete this album? This action cannot be undone.')) {
      success('Album Deleted', `"${album?.name}" has been deleted`, 4000)
      router.push('/dashboard/albums')
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading album...</p>
        </div>
      </div>
    )
  }

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Album Not Found</h1>
          <p className="text-gray-600 mb-6">The album you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard/albums')}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Albums
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/dashboard/albums')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Albums</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add Photos</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Edit Album</span>
                </button>
                <button
                  onClick={handleDeleteAlbum}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Album</span>
                </button>
              </div>
            </div>
          </div>

          {/* Debug Test Image */}
          <div className="bg-yellow-100 border-2 border-yellow-400 p-4 mb-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Debug: Test Image</h3>
            <img 
              src="/images/icons/dog.png" 
              alt="Test Dog" 
              className="w-32 h-32 object-cover border-2 border-red-500"
              onLoad={() => console.log('✅ Test image loaded!')}
              onError={() => console.log('❌ Test image failed!')}
            />
            <p className="text-sm mt-2">Path: /images/icons/dog.png</p>
          </div>

          {/* Album Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{album.name}</h1>
                {album.description && (
                  <p className="text-gray-600 mb-4">{album.description}</p>
                )}
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Camera className="h-4 w-4" />
                    <span>{album.photo_count} photos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{getPetName(album.pet_id)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {formatDate(album.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          {album.photos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos yet</h3>
              <p className="text-gray-600 mb-6">Add photos to this album to get started.</p>
              <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors mx-auto">
                <Plus className="h-4 w-4" />
                <span>Add First Photo</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {album.photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group cursor-pointer"
                  onClick={() => handleViewPhoto(photo)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-white border-2 border-gray-300 shadow-lg">
                    <img
                      src={photo.file_path}
                      alt={photo.caption || photo.original_filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      style={{ 
                        backgroundColor: 'white',
                        display: 'block',
                        minHeight: '100%',
                        minWidth: '100%'
                      }}
                      onLoad={(e) => {
                        console.log('✅ Image loaded successfully:', photo.file_path)
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                      onError={(e) => {
                        console.log('❌ Image failed to load:', photo.file_path)
                        e.currentTarget.style.display = 'none'
                        // Show a placeholder
                        const placeholder = document.createElement('div')
                        placeholder.className = 'w-full h-full flex items-center justify-center bg-red-100 text-red-500 text-2xl'
                        placeholder.innerHTML = '❌'
                        e.currentTarget.parentNode?.appendChild(placeholder)
                      }}
                    />
                  </div>
                  
                  {/* Photo Info Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-end">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 text-white w-full">
                      <p className="text-sm font-medium truncate">{photo.caption || photo.original_filename}</p>
                      <p className="text-xs text-gray-200">{formatDate(photo.created_at)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Full-Screen Photo Viewer */}
      <AnimatePresence>
        {showPhotoViewer && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClosePhotoViewer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClosePhotoViewer}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="relative">
                  <img
                    src={selectedPhoto.file_path}
                    alt={selectedPhoto.caption || selectedPhoto.original_filename}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    style={{ maxHeight: '70vh' }}
                  />
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md text-white p-6 rounded-xl border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedPhoto.caption || selectedPhoto.original_filename}</h3>
                    <p className="text-sm text-gray-300">
                      {formatFileSize(selectedPhoto.file_size)} • {formatDate(selectedPhoto.created_at)}
                    </p>
                    {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Tag className="h-4 w-4" />
                        <div className="flex space-x-2">
                          {selectedPhoto.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium border border-white/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDownload(selectedPhoto)}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleShare(selectedPhoto)}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
                      title="Share"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
