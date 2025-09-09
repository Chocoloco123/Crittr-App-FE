'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Camera,
  Video,
  FileText,
  Save,
  X,
  Plus,
  Calendar,
  Clock,
  Heart,
  Activity,
  Pill,
  Weight,
  Stethoscope,
  Scissors,
  PawPrint
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

interface JournalEditorProps {
  petId?: string
  petName?: string
  onSave: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
  initialData?: Partial<JournalEntry>
  onPetChange?: (petId: string, petName: string) => void
}

const entryTypes = [
  { value: 'general', label: 'General', icon: FileText, color: 'text-gray-600' },
  { value: 'feeding', label: 'Feeding', icon: Heart, color: 'text-green-600' },
  { value: 'medication', label: 'Medication', icon: Pill, color: 'text-red-600' },
  { value: 'exercise', label: 'Exercise', icon: Activity, color: 'text-blue-600' },
  { value: 'vet_visit', label: 'Vet Visit', icon: Stethoscope, color: 'text-purple-600' },
  { value: 'grooming', label: 'Grooming', icon: Scissors, color: 'text-pink-600' },
  { value: 'weight', label: 'Weight', icon: Weight, color: 'text-orange-600' },
  { value: 'symptoms', label: 'Symptoms', icon: PawPrint, color: 'text-yellow-600' }
]

export default function JournalEditor({ 
  petId, 
  petName, 
  onSave, 
  onCancel, 
  initialData,
  onPetChange 
}: JournalEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [entryType, setEntryType] = useState<JournalEntry['entryType']>(
    initialData?.entryType || 'general'
  )
  const [attachments, setAttachments] = useState<Attachment[]>(
    initialData?.attachments || []
  )
  const [isUploading, setIsUploading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedPetId, setSelectedPetId] = useState(petId || '')
  const [selectedPetName, setSelectedPetName] = useState(petName || '')
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content
    }
  }, [content])

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content')
      return
    }

    if (!selectedPetId) {
      alert('Please select a pet for this journal entry')
      return
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      petId: selectedPetId,
      petName: selectedPetName,
      entryType,
      attachments
    })
  }

  const handleFileUpload = useCallback(async (files: FileList) => {
    setIsUploading(true)
    
    try {
      const newAttachments: Attachment[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileType = file.type.startsWith('image/') ? 'image' : 
                        file.type.startsWith('video/') ? 'video' : 'document'
        
        // In a real app, you'd upload to a cloud service like AWS S3, Cloudinary, etc.
        // For now, we'll create a mock URL
        const mockUrl = URL.createObjectURL(file)
        
        newAttachments.push({
          id: `attachment-${Date.now()}-${i}`,
          type: fileType,
          url: mockUrl,
          name: file.name,
          size: file.size
        })
      }
      
      setAttachments(prev => [...prev, ...newAttachments])
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Error uploading files. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }, [])

  const removeAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const insertText = (text: string) => {
    if (editorRef.current && typeof window !== 'undefined') {
      editorRef.current.focus()
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        range.deleteContents()
        range.insertNode(document.createTextNode(text))
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        // If no selection, append to end
        editorRef.current.innerHTML += text
      }
      // Update content state
      setContent(editorRef.current.innerHTML)
    }
  }

  const toggleFormat = (command: string) => {
    if (typeof document !== 'undefined') {
      document.execCommand(command, false)
      editorRef.current?.focus()
      // Update content state after formatting
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML)
      }
    }
  }

  const insertList = (type: 'ul' | 'ol') => {
    console.log('insertList called with type:', type)
    if (editorRef.current && typeof window !== 'undefined') {
      editorRef.current.focus()
      
      // Try execCommand first (more reliable in some browsers)
      const command = type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList'
      console.log('Trying execCommand:', command)
      const success = document.execCommand(command, false, null)
      console.log('execCommand success:', success)
      
      if (success) {
        // execCommand worked, update content
        console.log('execCommand worked, updating content')
        setContent(editorRef.current.innerHTML)
        return
      }
      
      // Fallback: manual insertion
      console.log('Using fallback manual insertion')
      const selection = window.getSelection()
      console.log('Selection:', selection, 'Range count:', selection?.rangeCount)
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        console.log('Range:', range)
        
        // Insert a line break first to ensure we're on a new line
        const br = document.createElement('br')
        range.insertNode(br)
        range.setStartAfter(br)
        range.setEndAfter(br)
        
        // Create list element
        const list = document.createElement(type)
        const item = document.createElement('li')
        item.innerHTML = '&nbsp;' // Non-breaking space to make it editable
        list.appendChild(item)
        
        // Insert after the line break
        range.insertNode(list)
        
        // Position cursor in the list item
        range.setStart(item, 0)
        range.setEnd(item, 0)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        // No selection, append to end
        const list = document.createElement(type)
        const item = document.createElement('li')
        item.innerHTML = '&nbsp;'
        list.appendChild(item)
        editorRef.current.appendChild(list)
        
        // Focus on the new item
        const range = document.createRange()
        range.setStart(item, 0)
        range.setEnd(item, 0)
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      
      // Update content state
      setContent(editorRef.current.innerHTML)
    }
  }

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    setContent(target.innerHTML)
  }

  if (!mounted) {
    return null
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">New Journal Entry</h2>
              {petName && (
                <p className="text-indigo-100 mt-1">For {petName}</p>
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
          {/* Pet Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Pet
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                    onPetChange?.(pet.id, pet.name)
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

          {/* Entry Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Entry Type
            </label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {entryTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    onClick={() => setEntryType(type.value as JournalEntry['entryType'])}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      entryType === type.value
                        ? 'border-indigo-500 bg-indigo-50'
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

          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter entry title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            
            {/* Toolbar */}
            <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-2">
              <button
                onClick={() => toggleFormat('bold')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleFormat('italic')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleFormat('underline')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </button>
              <div className="w-px h-8 bg-gray-300 mx-1" />
              <button
                onClick={() => insertList('ul')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => insertList('ol')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </button>
              <div className="w-px h-8 bg-gray-300 mx-1" />
              <button
                onClick={() => insertText('📅 ')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Insert Date"
              >
                <Calendar className="h-4 w-4" />
              </button>
              <button
                onClick={() => insertText('⏰ ')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Insert Time"
              >
                <Clock className="h-4 w-4" />
              </button>
              <button
                onClick={() => insertText('❤️ ')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Insert Heart"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                onClick={() => insertText('🐾 ')}
                className="p-2 hover:bg-gray-200 rounded"
                title="Insert Paw Print"
              >
                <PawPrint className="h-4 w-4" />
              </button>
            </div>

            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable
              onInput={handleEditorInput}
              className="border border-gray-300 border-t-0 rounded-b-lg p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-500 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
              data-placeholder="Write your journal entry here..."
              suppressContentEditableWarning={true}
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
              />
              
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <Image className="h-4 w-4" />
                    <span>Add Images</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    <Video className="h-4 w-4" />
                    <span>Add Videos</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Add Documents</span>
                  </button>
                </div>
                
                {isUploading && (
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                    <span>Uploading files...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Attachments List */}
            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {attachment.type === 'image' && <Image className="h-5 w-5 text-green-600" />}
                      {attachment.type === 'video' && <Video className="h-5 w-5 text-purple-600" />}
                      {attachment.type === 'document' && <FileText className="h-5 w-5 text-blue-600" />}
                      <div>
                        <p className="font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(attachment.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Entry</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
