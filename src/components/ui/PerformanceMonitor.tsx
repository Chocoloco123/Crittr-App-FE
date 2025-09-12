'use client'

import { usePerformanceMonitoring, addResourceHints } from '@/lib/performance'
import { useEffect } from 'react'

export function PerformanceMonitor() {
  usePerformanceMonitoring()
  
  useEffect(() => {
    addResourceHints()
  }, [])
  
  return null
}
