'use client'

import { usePerformanceMonitoring, preloadCriticalResources, addResourceHints } from '@/lib/performance'
import { useEffect } from 'react'

export function PerformanceMonitor() {
  usePerformanceMonitoring()
  
  useEffect(() => {
    preloadCriticalResources()
    addResourceHints()
  }, [])
  
  return null
}
