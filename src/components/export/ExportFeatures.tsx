'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  FileText, 
  Calendar, 
  Filter, 
  Search, 
  Heart, 
  Pill, 
  Activity, 
  Stethoscope, 
  Scissors, 
  Weight, 
  PawPrint,
  FileSpreadsheet,
  FileImage,
  Mail,
  Share2,
  CheckCircle,
  Clock,
  User,
  MapPin
} from 'lucide-react'

interface ExportData {
  petId: string
  petName: string
  startDate: string
  endDate: string
  dataTypes: string[]
  format: 'csv' | 'pdf' | 'excel'
}

interface ExportFeaturesProps {
  petId?: string
  petName?: string
}

const dataTypes = [
  { id: 'journal', label: 'Journal Entries', icon: FileText, description: 'All journal entries with notes' },
  { id: 'feeding', label: 'Feeding Records', icon: Heart, description: 'Feeding times and amounts' },
  { id: 'medication', label: 'Medication Log', icon: Pill, description: 'Medication schedule and doses' },
  { id: 'exercise', label: 'Exercise Log', icon: Activity, description: 'Walks, playtime, and activities' },
  { id: 'vet_visits', label: 'Vet Visits', icon: Stethoscope, description: 'Appointments and medical records' },
  { id: 'weight', label: 'Weight Tracking', icon: Weight, description: 'Weight measurements over time' },
  { id: 'reminders', label: 'Reminders', icon: Clock, description: 'Scheduled reminders and alerts' },
  { id: 'quick_logs', label: 'Quick Logs', icon: PawPrint, description: 'One-tap activity logs' }
]

const exportFormats = [
  { id: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Spreadsheet format', color: 'text-green-600' },
  { id: 'pdf', label: 'PDF Report', icon: FileText, description: 'Professional report', color: 'text-red-600' },
  { id: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Excel workbook', color: 'text-blue-600' }
]

const quickReports = [
  {
    id: 'vet_summary',
    title: 'Vet Visit Summary',
    description: 'Complete health summary for vet appointments',
    icon: Stethoscope,
    color: 'bg-purple-500',
    includes: ['journal', 'medication', 'weight', 'vet_visits']
  },
  {
    id: 'monthly_report',
    title: 'Monthly Health Report',
    description: 'Comprehensive monthly health overview',
    icon: Calendar,
    color: 'bg-blue-500',
    includes: ['journal', 'feeding', 'medication', 'exercise', 'weight']
  },
  {
    id: 'feeding_log',
    title: 'Feeding Log',
    description: 'Detailed feeding schedule and amounts',
    icon: Heart,
    color: 'bg-green-500',
    includes: ['feeding', 'quick_logs']
  },
  {
    id: 'medication_tracker',
    title: 'Medication Tracker',
    description: 'Medication adherence and schedule',
    icon: Pill,
    color: 'bg-red-500',
    includes: ['medication', 'reminders']
  }
]

export default function ExportFeatures({ petId, petName }: ExportFeaturesProps) {
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([])
  const [selectedFormat, setSelectedFormat] = useState<string>('csv')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [exportHistory, setExportHistory] = useState<any[]>([])

  const handleDataTypeToggle = (dataType: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataType) 
        ? prev.filter(type => type !== dataType)
        : [...prev, dataType]
    )
  }

  const handleQuickReport = (report: typeof quickReports[0]) => {
    setSelectedDataTypes(report.includes)
    setSelectedFormat('pdf')
    
    // Set date range to last 30 days
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 30)
    
    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }

  const handleExport = async () => {
    if (selectedDataTypes.length === 0) {
      alert('Please select at least one data type to export')
      return
    }

    if (!startDate || !endDate) {
      alert('Please select a date range')
      return
    }

    setIsExporting(true)

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const exportData: ExportData = {
        petId: petId || '',
        petName: petName || 'All Pets',
        startDate,
        endDate,
        dataTypes: selectedDataTypes,
        format: selectedFormat as 'csv' | 'pdf' | 'excel'
      }

      // Mock export - in real app, this would call the backend
      console.log('Exporting data:', exportData)
      
      // Add to export history
      const newExport = {
        id: `export-${Date.now()}`,
        ...exportData,
        createdAt: new Date().toISOString(),
        status: 'completed'
      }
      
      setExportHistory(prev => [newExport, ...prev])
      
      alert(`Export completed! ${selectedDataTypes.length} data types exported as ${selectedFormat.toUpperCase()}`)
      
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
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
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Export & Reports</h2>
        <p className="text-gray-600">
          Export your pet's data for vet visits, records, or personal use
          {petName && <span className="text-indigo-600 font-medium"> for {petName}</span>}
        </p>
      </div>

      {/* Quick Reports */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickReports.map((report, index) => {
            const Icon = report.icon
            return (
              <motion.button
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleQuickReport(report)}
                className={`${report.color} text-white p-4 rounded-lg text-left hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className="h-6 w-6" />
                  <h4 className="font-semibold">{report.title}</h4>
                </div>
                <p className="text-sm opacity-90">{report.description}</p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Custom Export */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Export</h3>
        
        {/* Data Types Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Data Types
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {dataTypes.map((dataType) => {
              const Icon = dataType.icon
              const isSelected = selectedDataTypes.includes(dataType.id)
              
              return (
                <button
                  key={dataType.id}
                  onClick={() => handleDataTypeToggle(dataType.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{dataType.label}</span>
                  </div>
                  <p className="text-xs text-gray-600">{dataType.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Date Range
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Export Format */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {exportFormats.map((format) => {
              const Icon = format.icon
              const isSelected = selectedFormat === format.id
              
              return (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className={`h-4 w-4 ${format.color}`} />
                    <span className="text-sm font-medium text-gray-900">{format.label}</span>
                  </div>
                  <p className="text-xs text-gray-600">{format.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button
            onClick={handleExport}
            disabled={isExporting || selectedDataTypes.length === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Export History */}
      {exportHistory.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exports</h3>
          <div className="space-y-3">
            {exportHistory.slice(0, 5).map((exportItem) => (
              <div key={exportItem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {exportItem.dataTypes.length} data types exported
                    </p>
                    <p className="text-sm text-gray-600">
                      {exportItem.petName} • {exportItem.format.toUpperCase()} • {new Date(exportItem.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Tips */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Export Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
            <span>CSV format is best for data analysis and spreadsheet applications</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
            <span>PDF reports are perfect for sharing with veterinarians</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
            <span>Include weight tracking data for health trend analysis</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
            <span>Export medication logs to track adherence and effectiveness</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
