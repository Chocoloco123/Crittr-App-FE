/**
 * Demo Storage Utility
 * Handles localStorage with 30-minute expiration for demo users
 */

const DEMO_STORAGE_PREFIX = 'crittr-demo-'
const EXPIRATION_TIME = 30 * 60 * 1000 // 30 minutes in milliseconds

interface StoredData<T> {
  data: T
  timestamp: number
  expiresAt: number
}

export class DemoStorage {
  /**
   * Check if we're in demo mode (no authenticated user)
   */
  static isDemoMode(): boolean {
    if (typeof window === 'undefined') return false
    
    // Check if there's a session in localStorage or if we're not authenticated
    const session = localStorage.getItem('next-auth.session-token')
    return !session
  }

  /**
   * Store data with 30-minute expiration
   */
  static setItem<T>(key: string, data: T): void {
    if (typeof window === 'undefined' || !this.isDemoMode()) return

    const now = Date.now()
    const storedData: StoredData<T> = {
      data,
      timestamp: now,
      expiresAt: now + EXPIRATION_TIME
    }

    try {
      localStorage.setItem(`${DEMO_STORAGE_PREFIX}${key}`, JSON.stringify(storedData))
    } catch (error) {
      console.error('Error storing demo data:', error)
    }
  }

  /**
   * Retrieve data if not expired
   */
  static getItem<T>(key: string): T | null {
    if (typeof window === 'undefined' || !this.isDemoMode()) return null

    try {
      const stored = localStorage.getItem(`${DEMO_STORAGE_PREFIX}${key}`)
      if (!stored) return null

      const storedData: StoredData<T> = JSON.parse(stored)
      const now = Date.now()

      // Check if data has expired
      if (now > storedData.expiresAt) {
        this.removeItem(key)
        return null
      }

      return storedData.data
    } catch (error) {
      console.error('Error retrieving demo data:', error)
      this.removeItem(key)
      return null
    }
  }

  /**
   * Remove specific item
   */
  static removeItem(key: string): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(`${DEMO_STORAGE_PREFIX}${key}`)
    } catch (error) {
      console.error('Error removing demo data:', error)
    }
  }

  /**
   * Clear all demo data
   */
  static clearAll(): void {
    if (typeof window === 'undefined') return

    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(DEMO_STORAGE_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Error clearing demo data:', error)
    }
  }

  /**
   * Get all demo data keys
   */
  static getAllKeys(): string[] {
    if (typeof window === 'undefined') return []

    try {
      const keys = Object.keys(localStorage)
      return keys
        .filter(key => key.startsWith(DEMO_STORAGE_PREFIX))
        .map(key => key.replace(DEMO_STORAGE_PREFIX, ''))
    } catch (error) {
      console.error('Error getting demo data keys:', error)
      return []
    }
  }

  /**
   * Check if data exists and is not expired
   */
  static hasItem(key: string): boolean {
    return this.getItem(key) !== null
  }

  /**
   * Get time remaining until expiration (in minutes)
   */
  static getTimeRemaining(key: string): number {
    if (typeof window === 'undefined' || !this.isDemoMode()) return 0

    try {
      const stored = localStorage.getItem(`${DEMO_STORAGE_PREFIX}${key}`)
      if (!stored) return 0

      const storedData: StoredData<any> = JSON.parse(stored)
      const now = Date.now()
      const remaining = storedData.expiresAt - now

      return remaining > 0 ? Math.ceil(remaining / (60 * 1000)) : 0
    } catch (error) {
      console.error('Error getting time remaining:', error)
      return 0
    }
  }
}

// Auto-cleanup expired data on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const keys = DemoStorage.getAllKeys()
    keys.forEach(key => {
      // This will automatically remove expired data
      DemoStorage.getItem(key)
    })
  })
}
