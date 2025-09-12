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
import './FloatingChatbot.scss'

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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Clio, your Crittr AI assistant. I can help you learn about Crittr's features, pet care tracking, and how to use the app. What would you like to know?",
      timestamp: new Date()
    }
  ])
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
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm Clio, your Crittr AI assistant. I can help you learn about Crittr's features, pet care tracking, and how to use the app. What would you like to know?",
        timestamp: new Date()
      }
    ])
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
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="floating-chat-button"
          >
            <div className="floating-chat-icon">
              <Image
                src="/images/icons/robot.png"
                alt="Crittr AI Assistant"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`chat-window ${isMinimized ? 'minimized' : ''}`}
          >
            {/* Header */}
            <div className={`chat-header ${isMinimized ? 'minimized' : ''}`}>
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <div className="chat-avatar-icon">
                    <Image
                      src="/images/icons/robot.png"
                      alt="Crittr AI"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="chat-title">Clio</h3>
                  <div className="chat-status">
                    <div className="status-dot"></div>
                    <p className="status-text">Online</p>
                  </div>
                </div>
              </div>
              <div className="chat-controls">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="control-button"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={clearChat}
                  className="control-button"
                  title="Restart chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="control-button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="messages-container">
                  {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          ref={message.role === 'assistant' && index === messages.length - 1 ? lastAssistantMessageRef : null}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`message ${message.role}`}
                        >
                          <div className={`message-content ${message.role}`}>
                            {/* Avatar */}
                            <div className={`message-avatar ${message.role}`}>
                              {message.role === 'user' ? (
                                <User className="message-avatar-icon" />
                              ) : (
                                <div className={`message-avatar-icon ${message.role}`}>
                                  <Image
                                    src="/images/icons/robot.png"
                                    alt="Crittr AI"
                                    fill
                                    className="object-contain brightness-0 invert"
                                  />
                                </div>
                              )}
                            </div>
                            
                            {/* Message Content */}
                            <div className={`message-bubble ${message.role}`}>
                              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              <div className="message-time">
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="loading-message"
                    >
                      <div className="loading-content">
                        <div className="loading-avatar">
                          <div className="w-8 h-8 relative">
                            <Image
                              src="/images/icons/robot.png"
                              alt="Crittr AI"
                              fill
                              className="object-contain brightness-0 invert"
                            />
                          </div>
                        </div>
                        <div className="loading-bubble">
                          <Loader2 className="loading-spinner" />
                          <span className="loading-text">Crittr AI is typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="input-container">
                  <form onSubmit={handleSubmit} className="input-form">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask Clio about Crittr's features..."
                      className="input-field"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className="send-button"
                    >
                      {isLoading ? (
                        <Loader2 className="send-icon animate-spin" />
                      ) : (
                        <Send className="send-icon" />
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
