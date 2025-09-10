'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Send, 
  Loader2, 
  User,
  MessageSquare,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  modelUsed?: string
}

interface ChatbotProps {
  petId?: string
  petName?: string
}

const suggestedQuestions = [
  "What features does Crittr offer?",
  "How can I track my pet's health?",
  "Does Crittr have a mobile app?",
  "What is the AI assistant feature?",
  "How do I add a new pet to my account?",
  "Can I export my pet's data?"
]

export default function Chatbot({ petId, petName }: ChatbotProps) {
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
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Crittr Assistant</h3>
            <p className="text-sm text-gray-600">
              Ask me anything about Crittr's features
              {petName && <span className="text-indigo-600"> for {petName}</span>}
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          title="Clear chat"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Welcome to Crittr Assistant!</h4>
            <p className="text-gray-600 mb-6">
              I'm here to help you learn about Crittr's features and answer any questions you have.
            </p>
            
            {/* Suggested Questions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-3">Try asking:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="p-3 text-left text-sm bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 border border-gray-200 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                ref={message.role === 'assistant' && index === messages.length - 1 ? lastAssistantMessageRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-indigo-500' 
                      : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  {/* Message Content */}
                  <div className={`px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <div className={`flex items-center justify-between mt-2 text-xs ${
                      message.role === 'user' ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.modelUsed && (
                        <span className="flex items-center space-x-1">
                          <Sparkles className="h-3 w-3" />
                          <span>{message.modelUsed}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <div className="bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about Crittr..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  )
}
