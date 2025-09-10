// Performance monitoring utilities
'use client'

import { useEffect } from 'react'

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
            // Send to analytics service
            if (entry.startTime > 2500) {
              console.warn('LCP is slow:', entry.startTime)
            }
          }
        }
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      
      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
          // Send to analytics service
        }
      })
      
      fidObserver.observe({ entryTypes: ['first-input'] })
      
      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        console.log('CLS:', clsValue)
        // Send to analytics service
      })
      
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      
      return () => {
        observer.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])
}

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.href = '/fonts/geist-sans.woff2'
    fontLink.as = 'font'
    fontLink.type = 'font/woff2'
    fontLink.crossOrigin = 'anonymous'
    document.head.appendChild(fontLink)
    
    // Preload critical images
    const imageLink = document.createElement('link')
    imageLink.rel = 'preload'
    imageLink.href = '/images/pets/hero/shiba.jpg'
    imageLink.as = 'image'
    document.head.appendChild(imageLink)
  }
}

// Resource hints for better performance
export const addResourceHints = () => {
  if (typeof window !== 'undefined') {
    // DNS prefetch for external domains
    const dnsPrefetch = document.createElement('link')
    dnsPrefetch.rel = 'dns-prefetch'
    dnsPrefetch.href = '//fonts.googleapis.com'
    document.head.appendChild(dnsPrefetch)
    
    // Preconnect to critical origins
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://fonts.gstatic.com'
    preconnect.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect)
  }
}
