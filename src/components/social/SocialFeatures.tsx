'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  UserPlus, 
  Search, 
  Share2, 
  Heart, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Camera, 
  Video, 
  FileText,
  Send,
  Check,
  X,
  MoreHorizontal,
  Settings,
  Bell,
  User,
  Shield,
  Star,
  ThumbsUp,
  Eye,
  Download
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  pets: Pet[]
  isOnline: boolean
  lastActive: string
  mutualConnections: number
}

interface Pet {
  id: string
  name: string
  breed: string
  age: number
  avatar?: string
}

interface Post {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  petId: string
  petName: string
  content: string
  images?: string[]
  type: 'achievement' | 'milestone' | 'photo' | 'tip' | 'question'
  likes: number
  comments: number
  isLiked: boolean
  createdAt: string
}

interface SocialFeaturesProps {
  petId?: string
  petName?: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    pets: [{ id: '1', name: 'Max', breed: 'Labrador', age: 3 }],
    isOnline: true,
    lastActive: '2 minutes ago',
    mutualConnections: 5
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    pets: [{ id: '2', name: 'Luna', breed: 'Maine Coon', age: 2 }],
    isOnline: false,
    lastActive: '1 hour ago',
    mutualConnections: 3
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    pets: [{ id: '3', name: 'Buddy', breed: 'Golden Retriever', age: 5 }],
    isOnline: true,
    lastActive: '5 minutes ago',
    mutualConnections: 8
  }
]

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    petId: '1',
    petName: 'Max',
    content: 'Max just completed his first 5K run! So proud of my little athlete 🏃‍♂️',
    type: 'achievement',
    likes: 12,
    comments: 3,
    isLiked: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Mike Chen',
    petId: '2',
    petName: 'Luna',
    content: 'Luna\'s weight has been stable for 3 months now. Here\'s what worked for us: regular exercise, portion control, and lots of love!',
    type: 'tip',
    likes: 8,
    comments: 5,
    isLiked: true,
    createdAt: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Emma Davis',
    petId: '3',
    petName: 'Buddy',
    content: 'Does anyone have experience with senior dog joint supplements? Buddy is 5 and I want to keep him active.',
    type: 'question',
    likes: 6,
    comments: 7,
    isLiked: false,
    createdAt: '2024-01-14T09:20:00Z'
  }
]

const postTypes = {
  achievement: { icon: Star, color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Achievement' },
  milestone: { icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Milestone' },
  photo: { icon: Camera, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Photo' },
  tip: { icon: Heart, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Tip' },
  question: { icon: MessageCircle, color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Question' }
}

export default function SocialFeatures({ petId, petName }: SocialFeaturesProps) {
  const [users] = useState<User[]>(mockUsers)
  const [posts] = useState<Post[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState<'feed' | 'connections' | 'discover'>('feed')
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareContent, setShareContent] = useState('')

  const handleLike = (postId: string) => {
    // In a real app, this would update the backend
  }

  const handleShare = () => {
    if (!shareContent.trim()) return
    
    // In a real app, this would create a new post
    setShowShareModal(false)
    setShareContent('')
    alert('Post shared successfully!')
  }

  const handleConnect = (userId: string) => {
    // In a real app, this would send a connection request
    alert('Connection request sent!')
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.pets.some(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.petName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pet Community</h2>
        <p className="text-gray-600">
          Connect with other pet owners and share your pet's journey
          {petName && <span className="text-indigo-600 font-medium"> for {petName}</span>}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-1">
        <div className="flex space-x-1">
          {[
            { id: 'feed', label: 'Feed', icon: MessageCircle },
            { id: 'connections', label: 'Connections', icon: Users },
            { id: 'discover', label: 'Discover', icon: Search }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts, pets, or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Share Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Update</span>
        </button>
      </div>

      {/* Content based on selected tab */}
      {selectedTab === 'feed' && (
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Be the first to share an update!'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowShareModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Share First Post
                </button>
              )}
            </div>
          ) : (
            filteredPosts.map((post, index) => {
              const typeConfig = postTypes[post.type]
              const TypeIcon = typeConfig.icon
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {post.userName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{post.petName}</span>
                            <span>•</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 ${typeConfig.bgColor} rounded-full`}>
                          <div className="flex items-center space-x-1">
                            <TypeIcon className={`h-3 w-3 ${typeConfig.color}`} />
                            <span className={`text-xs font-medium ${typeConfig.color}`}>
                              {typeConfig.label}
                            </span>
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-700">{post.content}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            post.isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm font-medium">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      )}

      {selectedTab === 'connections' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span>{user.isOnline ? 'Online' : user.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Pets:</p>
                  <div className="space-y-1">
                    {user.pets.map((pet) => (
                      <div key={pet.id} className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">{pet.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm text-gray-700">{pet.name} ({pet.breed})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {user.mutualConnections} mutual connections
                  </span>
                  <button
                    onClick={() => handleConnect(user.id)}
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'discover' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured Pet Stories</h3>
            <p className="text-gray-600 mb-4">Discover inspiring pet care stories from our community</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Max\'s Weight Loss Journey', author: 'Sarah Johnson', likes: 24 },
                { title: 'Luna\'s Training Success', author: 'Mike Chen', likes: 18 },
                { title: 'Buddy\'s Health Recovery', author: 'Emma Davis', likes: 31 }
              ].map((story, index) => (
                <div key={index} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-1">{story.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">by {story.author}</p>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-600">{story.likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Share Update</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's happening with {petName || 'your pet'}?
                  </label>
                  <textarea
                    value={shareContent}
                    onChange={(e) => setShareContent(e.target.value)}
                    placeholder="Share an update, achievement, or ask a question..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="flex-1 py-2 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleShare}
                    disabled={!shareContent.trim()}
                    className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
