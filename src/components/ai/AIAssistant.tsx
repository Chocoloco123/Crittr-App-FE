'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Sparkles, 
  Brain, 
  MessageSquare, 
  Send, 
  Loader2, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  Heart, 
  Calendar, 
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

interface AIInsight {
  id: string
  type: 'summary' | 'recommendation' | 'alert' | 'trend'
  title: string
  content: string
  confidence: number
  category: 'health' | 'behavior' | 'nutrition' | 'exercise' | 'general'
  createdAt: string
  isHelpful?: boolean
}

interface AIAssistantProps {
  petId?: string
  petName?: string
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'summary',
    title: 'Weekly Health Summary',
    content: 'Based on your pet\'s data this week, Buddy shows excellent overall health. Weight is stable at 25kg, exercise levels are consistent with 45 minutes daily average, and feeding schedule is regular. The medication adherence rate of 85% could be improved with additional reminders.',
    confidence: 92,
    category: 'health',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Exercise Optimization',
    content: 'Consider increasing Buddy\'s exercise duration by 10-15 minutes during weekends. The current 45-minute average is good, but weekend activities could be enhanced with longer walks or play sessions to maintain optimal fitness levels.',
    confidence: 88,
    category: 'exercise',
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Medication Reminder',
    content: 'I noticed Buddy missed his evening medication on Tuesday. Consider setting up additional reminders or adjusting the timing to ensure better adherence. Missing doses can affect treatment effectiveness.',
    confidence: 95,
    category: 'health',
    createdAt: '2024-01-13T20:00:00Z'
  },
  {
    id: '4',
    type: 'trend',
    title: 'Weight Trend Analysis',
    content: 'Buddy\'s weight has been fluctuating slightly over the past month, ranging from 24.5kg to 25.3kg. This is within normal variation, but monitoring continues to be important. The trend suggests good weight management.',
    confidence: 90,
    category: 'health',
    createdAt: '2024-01-12T09:15:00Z'
  }
]

const insightCategories = {
  health: { icon: Heart, color: 'text-red-600', bgColor: 'bg-red-100' },
  behavior: { icon: Brain, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  nutrition: { icon: FileText, color: 'text-green-600', bgColor: 'bg-green-100' },
  exercise: { icon: TrendingUp, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  general: { icon: Lightbulb, color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
}

const insightTypes = {
  summary: { icon: FileText, label: 'Summary', color: 'text-blue-600' },
  recommendation: { icon: Lightbulb, label: 'Recommendation', color: 'text-green-600' },
  alert: { icon: AlertTriangle, label: 'Alert', color: 'text-red-600' },
  trend: { icon: TrendingUp, label: 'Trend', color: 'text-purple-600' }
}

export default function AIAssistant({ petId, petName }: AIAssistantProps) {
  const [insights, setInsights] = useState<AIInsight[]>(mockInsights)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userQuestion, setUserQuestion] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const handleGenerateInsights = async () => {
    setIsGenerating(true)
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock new insight generation
      const newInsight: AIInsight = {
        id: `insight-${Date.now()}`,
        type: 'summary',
        title: 'AI Health Analysis',
        content: `Based on ${petName || 'your pet'}'s recent data, I've analyzed patterns and trends. The overall health indicators are positive, with consistent activity levels and stable weight. I recommend maintaining the current routine while paying attention to medication timing.`,
        confidence: 89,
        category: 'health',
        createdAt: new Date().toISOString()
      }
      
      setInsights(prev => [newInsight, ...prev])
      
    } catch (error) {
      console.error('Error generating insights:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAskQuestion = async () => {
    if (!userQuestion.trim()) return
    
    setIsGenerating(true)
    
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const response: AIInsight = {
        id: `response-${Date.now()}`,
        type: 'recommendation',
        title: 'AI Response',
        content: `Based on your question "${userQuestion}", here's what I found: Your pet's data shows healthy patterns overall. I recommend continuing the current care routine while monitoring the specific areas you mentioned. Would you like me to elaborate on any particular aspect?`,
        confidence: 85,
        category: 'general',
        createdAt: new Date().toISOString()
      }
      
      setInsights(prev => [response, ...prev])
      setUserQuestion('')
      
    } catch (error) {
      console.error('Error processing question:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFeedback = (insightId: string, isHelpful: boolean) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, isHelpful } : insight
    ))
  }

  const filteredInsights = insights.filter(insight => {
    if (selectedCategory !== 'all' && insight.category !== selectedCategory) return false
    if (selectedType !== 'all' && insight.type !== selectedType) return false
    return true
  })

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 90) return 'High'
    if (confidence >= 80) return 'Medium'
    return 'Low'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Health Assistant</h2>
        <p className="text-gray-600">
          Get AI-powered insights and recommendations for your pet's health
          {petName && <span className="text-indigo-600 font-medium"> for {petName}</span>}
        </p>
      </div>

      {/* AI Chat Interface */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Ask AI Assistant</h3>
            <p className="text-sm text-gray-600">Get personalized insights about your pet's health</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Ask about your pet's health, behavior, or care routine..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
            />
            <button
              onClick={handleAskQuestion}
              disabled={isGenerating || !userQuestion.trim()}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>Ask</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[
              "How is my pet's overall health?",
              "Any recommendations for exercise?",
              "Should I be concerned about weight changes?",
              "How can I improve medication adherence?"
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setUserQuestion(suggestion)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Health Insights</h3>
            <p className="text-gray-600">Get comprehensive AI analysis of your pet's health data</p>
          </div>
          <button
            onClick={handleGenerateInsights}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Insights</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="health">Health</option>
              <option value="behavior">Behavior</option>
              <option value="nutrition">Nutrition</option>
              <option value="exercise">Exercise</option>
              <option value="general">General</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="summary">Summary</option>
              <option value="recommendation">Recommendation</option>
              <option value="alert">Alert</option>
              <option value="trend">Trend</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No insights yet</h3>
            <p className="text-gray-600 mb-4">
              Generate AI insights or ask a question to get started
            </p>
            <button
              onClick={handleGenerateInsights}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Generate First Insight
            </button>
          </div>
        ) : (
          filteredInsights.map((insight, index) => {
            const categoryConfig = insightCategories[insight.category]
            const typeConfig = insightTypes[insight.type]
            const CategoryIcon = categoryConfig.icon
            const TypeIcon = typeConfig.icon
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${categoryConfig.bgColor} rounded-lg flex items-center justify-center`}>
                        <CategoryIcon className={`h-5 w-5 ${categoryConfig.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <TypeIcon className={`h-4 w-4 ${typeConfig.color}`} />
                            <span>{typeConfig.label}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.confidence >= 90 ? 'bg-green-100 text-green-800' :
                        insight.confidence >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getConfidenceLabel(insight.confidence)} Confidence
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{insight.content}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        Confidence: <span className={`font-medium ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}%
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleFeedback(insight.id, true)}
                        className={`p-2 rounded-lg transition-colors ${
                          insight.isHelpful === true 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                        }`}
                        title="Helpful"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(insight.id, false)}
                        className={`p-2 rounded-lg transition-colors ${
                          insight.isHelpful === false 
                            ? 'text-red-600 bg-red-50' 
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                        }`}
                        title="Not helpful"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
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
