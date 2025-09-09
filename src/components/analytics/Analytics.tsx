'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Heart, 
  Pill, 
  Weight, 
  Calendar, 
  BarChart3, 
  PieChart, 
  LineChart,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

interface AnalyticsData {
  weightTrend: { date: string; weight: number }[]
  feedingFrequency: { date: string; count: number }[]
  medicationAdherence: { date: string; taken: boolean }[]
  exerciseMinutes: { date: string; minutes: number }[]
  symptomsCount: { week: string; count: number }[]
}

interface AnalyticsProps {
  petId?: string
  petName?: string
}

const mockAnalyticsData: AnalyticsData = {
  weightTrend: [
    { date: '2024-01-01', weight: 24.5 },
    { date: '2024-01-08', weight: 24.8 },
    { date: '2024-01-15', weight: 25.1 },
    { date: '2024-01-22', weight: 24.9 },
    { date: '2024-01-29', weight: 25.3 },
    { date: '2024-02-05', weight: 25.0 },
    { date: '2024-02-12', weight: 24.7 }
  ],
  feedingFrequency: [
    { date: '2024-01-01', count: 3 },
    { date: '2024-01-02', count: 2 },
    { date: '2024-01-03', count: 3 },
    { date: '2024-01-04', count: 3 },
    { date: '2024-01-05', count: 2 },
    { date: '2024-01-06', count: 3 },
    { date: '2024-01-07', count: 3 }
  ],
  medicationAdherence: [
    { date: '2024-01-01', taken: true },
    { date: '2024-01-02', taken: true },
    { date: '2024-01-03', taken: false },
    { date: '2024-01-04', taken: true },
    { date: '2024-01-05', taken: true },
    { date: '2024-01-06', taken: true },
    { date: '2024-01-07', taken: true }
  ],
  exerciseMinutes: [
    { date: '2024-01-01', minutes: 45 },
    { date: '2024-01-02', minutes: 30 },
    { date: '2024-01-03', minutes: 60 },
    { date: '2024-01-04', minutes: 40 },
    { date: '2024-01-05', minutes: 35 },
    { date: '2024-01-06', minutes: 50 },
    { date: '2024-01-07', minutes: 45 }
  ],
  symptomsCount: [
    { week: 'Week 1', count: 2 },
    { week: 'Week 2', count: 1 },
    { week: 'Week 3', count: 0 },
    { week: 'Week 4', count: 1 }
  ]
}

export default function Analytics({ petId, petName }: AnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(mockAnalyticsData)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [isLoading, setIsLoading] = useState(false)

  const calculateStats = () => {
    const weightData = analyticsData.weightTrend
    const medicationData = analyticsData.medicationAdherence
    const exerciseData = analyticsData.exerciseMinutes
    const feedingData = analyticsData.feedingFrequency

    const currentWeight = weightData[weightData.length - 1]?.weight || 0
    const previousWeight = weightData[weightData.length - 2]?.weight || 0
    const weightChange = currentWeight - previousWeight

    const medicationAdherenceRate = (medicationData.filter(d => d.taken).length / medicationData.length) * 100

    const avgExerciseMinutes = exerciseData.reduce((sum, d) => sum + d.minutes, 0) / exerciseData.length

    const avgFeedingFrequency = feedingData.reduce((sum, d) => sum + d.count, 0) / feedingData.length

    return {
      currentWeight,
      weightChange,
      medicationAdherenceRate,
      avgExerciseMinutes,
      avgFeedingFrequency
    }
  }

  const stats = calculateStats()

  const SimpleLineChart = ({ data, color = 'blue', height = 200 }: { data: any[], color?: string, height?: number }) => {
    if (!data || data.length === 0) return <div className="h-48 flex items-center justify-center text-gray-500">No data available</div>

    const maxValue = Math.max(...data.map(d => d.weight || d.count || d.minutes || 0))
    const minValue = Math.min(...data.map(d => d.weight || d.count || d.minutes || 0))
    const range = maxValue - minValue || 1

    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((point.weight || point.count || point.minutes || 0) - minValue) / range * 100
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="relative" style={{ height }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={`var(--color-${color}-500)`}
            strokeWidth="2"
            points={points}
          />
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - ((point.weight || point.count || point.minutes || 0) - minValue) / range * 100
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={`var(--color-${color}-500)`}
              />
            )
          })}
        </svg>
      </div>
    )
  }

  const SimpleBarChart = ({ data, color = 'green', height = 200 }: { data: any[], color?: string, height?: number }) => {
    if (!data || data.length === 0) return <div className="h-48 flex items-center justify-center text-gray-500">No data available</div>

    const maxValue = Math.max(...data.map(d => d.count || 0))
    const barWidth = 100 / data.length

    return (
      <div className="relative" style={{ height }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {data.map((point, index) => {
            const barHeight = (point.count / maxValue) * 100
            const x = index * barWidth
            return (
              <rect
                key={index}
                x={x + 2}
                y={100 - barHeight}
                width={barWidth - 4}
                height={barHeight}
                fill={`var(--color-${color}-500)`}
                opacity="0.7"
              />
            )
          })}
        </svg>
      </div>
    )
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Trends</h2>
          <p className="text-gray-600">
            Track your pet's health trends and patterns
            {petName && <span className="text-indigo-600 font-medium"> for {petName}</span>}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Weight className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`flex items-center space-x-1 ${
              stats.weightChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.weightChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {stats.weightChange >= 0 ? '+' : ''}{stats.weightChange.toFixed(1)}kg
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.currentWeight}kg</h3>
          <p className="text-sm text-gray-600">Current Weight</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Pill className="h-6 w-6 text-green-600" />
            </div>
            <div className={`flex items-center space-x-1 ${
              stats.medicationAdherenceRate >= 90 ? 'text-green-600' : 'text-yellow-600'
            }`}>
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">{stats.medicationAdherenceRate.toFixed(0)}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.medicationAdherenceRate.toFixed(1)}%</h3>
          <p className="text-sm text-gray-600">Medication Adherence</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Good</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.avgExerciseMinutes.toFixed(0)}min</h3>
          <p className="text-sm text-gray-600">Avg Daily Exercise</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Regular</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.avgFeedingFrequency.toFixed(1)}</h3>
          <p className="text-sm text-gray-600">Avg Daily Feedings</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weight Trend</h3>
            <div className="flex items-center space-x-2">
              <LineChart className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Last 7 weeks</span>
            </div>
          </div>
          <div className="h-48">
            <SimpleLineChart data={analyticsData.weightTrend} color="blue" />
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>{analyticsData.weightTrend[0]?.date}</span>
            <span>{analyticsData.weightTrend[analyticsData.weightTrend.length - 1]?.date}</span>
          </div>
        </motion.div>

        {/* Exercise Minutes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Exercise</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-600">Last 7 days</span>
            </div>
          </div>
          <div className="h-48">
            <SimpleBarChart data={analyticsData.exerciseMinutes} color="purple" />
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </motion.div>

        {/* Medication Adherence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Medication Adherence</h3>
            <div className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Last 7 days</span>
            </div>
          </div>
          <div className="space-y-3">
            {analyticsData.medicationAdherence.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <div className="flex items-center space-x-2">
                  {day.taken ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${day.taken ? 'text-green-600' : 'text-red-600'}`}>
                    {day.taken ? 'Taken' : 'Missed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Symptoms Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Symptoms Tracking</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Last 4 weeks</span>
            </div>
          </div>
          <div className="h-48">
            <SimpleBarChart data={analyticsData.symptomsCount} color="yellow" />
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            {analyticsData.symptomsCount.map((week, index) => (
              <span key={index}>{week.week}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Health Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="h-5 w-5 text-indigo-600 mr-2" />
          Health Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Weight Management</p>
                <p className="text-sm text-gray-600">Your pet's weight is stable and within healthy range</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Exercise Routine</p>
                <p className="text-sm text-gray-600">Consistent daily exercise with good activity levels</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Medication Adherence</p>
                <p className="text-sm text-gray-600">Consider setting more reminders for medication times</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Feeding Schedule</p>
                <p className="text-sm text-gray-600">Regular feeding pattern maintained consistently</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
