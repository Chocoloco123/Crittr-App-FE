'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Loader2, 
  User,
  X,
  Minimize2,
  Maximize2,
  RefreshCw
} from 'lucide-react'
import Image from 'next/image'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  modelUsed?: string
}

interface FloatingChatbotProps {
  petId?: string
  petName?: string
}

const suggestedQuestions = [
  "What features does Crittr offer?",
  "How can I track my pet's health?",
  "Does Crittr have a mobile app?",
  "What is the AI assistant feature?",
  "How do I add a new pet?",
  "Can I export my pet's data?"
]

export default function FloatingChatbot({ petId, petName }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastAssistantMessageRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToLastAssistantMessage = () => {
    lastAssistantMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.role === 'assistant') {
      // Scroll to the beginning of the assistant's message
      setTimeout(() => scrollToLastAssistantMessage(), 100)
    } else {
      // For user messages, scroll to bottom as usual
      scrollToBottom()
    }
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: content.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot')
      }

      const data = await response.json()
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        modelUsed: data.model_used
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      console.error('Chatbot error:', err)
      setError('Sorry, I encountered an error. Please try again.')
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
    setIsLoading(false)
    setInputValue('')
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
        >
          <div className="w-10 h-10 relative">
            <Image
              src="/clio-chatbot-icon.svg"
              alt="Clio AI Assistant"
              fill
              className="brightness-0 invert group-hover:scale-110 transition-transform duration-200"
            />
          </div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? 'w-80 h-20' : 'w-96 h-[450px]'
            } bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden`}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 flex items-center justify-between ${isMinimized ? 'h-full' : ''}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-2">
                  <div className="w-6 h-6 relative">
                    <Image
                      src="/clio-chatbot-icon.svg"
                      alt="Clio"
                      fill
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Clio</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <p className="text-sm opacity-90">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={clearChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Restart chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 h-[280px]">
                  {messages.length === 0 ? (
                    <div className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 p-1">
                          <div className="w-5 h-5 relative">
                            <Image
                              src="/clio-chatbot-icon.svg"
                              alt="Clio"
                              fill
                              className="brightness-0 invert"
                            />
                          </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-3 rounded-lg max-w-[80%]">
                          <p className="text-sm text-gray-900 leading-relaxed">
                            Hi! I'm Clio, your AI chatbot assistant for Crittr. I can help you learn about Crittr's features, pet care tracking, and how to use the app. What would you like to know? 🤖
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            {formatTime(new Date())}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          ref={message.role === 'assistant' && index === messages.length - 1 ? lastAssistantMessageRef : null}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-2 max-w-[80%] ${
                            message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.role === 'user' 
                                ? 'bg-gray-500' 
                                : 'bg-gradient-to-r from-purple-500 to-blue-500'
                            }`}>
                              {message.role === 'user' ? (
                                <User className="h-4 w-4 text-white" />
                              ) : (
                                <div className="w-5 h-5 relative">
                                  <Image
                                    src="/clio-chatbot-icon.svg"
                                    alt="Clio"
                                    fill
                                    className="brightness-0 invert"
                                  />
                                </div>
                              )}
                            </div>
                            
                            {/* Message Content */}
                            <div className={`px-3 py-2 rounded-lg text-sm ${
                              message.role === 'user'
                                ? 'bg-gray-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              <div className={`text-xs mt-1 ${
                                message.role === 'user' ? 'text-gray-200' : 'text-gray-500'
                              }`}>
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </>
                  )}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center p-1">
                          <div className="w-5 h-5 relative">
                            <Image
                              src="/clio-chatbot-icon.svg"
                              alt="Clio"
                              fill
                              className="brightness-0 invert"
                            />
                          </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                            <span className="text-sm text-gray-600">Clio is typing...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSubmit} className="flex space-x-3">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask Clio about Crittr's features..."
                      className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}
