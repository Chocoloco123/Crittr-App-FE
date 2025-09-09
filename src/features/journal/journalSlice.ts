import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface JournalEntry {
  id: string
  petId: string
  userId: string
  title: string
  content: string
  entryType: 'general' | 'feeding' | 'water' | 'walk' | 'potty' | 'symptoms' | 'medication' | 'training' | 'grooming' | 'weight' | 'vet_visit'
  date: string
  time?: string
  attachments?: string[]
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface QuickLog {
  id: string
  petId: string
  userId: string
  activity: 'feeding' | 'water' | 'walk' | 'potty' | 'symptoms' | 'medication' | 'training' | 'grooming' | 'weight'
  notes?: string
  timestamp: string
}

interface JournalState {
  entries: JournalEntry[]
  quickLogs: QuickLog[]
  isLoading: boolean
  searchQuery: string
  selectedDateRange: { start: string; end: string } | null
}

const initialState: JournalState = {
  entries: [],
  quickLogs: [],
  isLoading: false,
  searchQuery: '',
  selectedDateRange: null,
}

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setEntries: (state, action: PayloadAction<JournalEntry[]>) => {
      state.entries = action.payload
    },
    addEntry: (state, action: PayloadAction<JournalEntry>) => {
      state.entries.push(action.payload)
    },
    updateEntry: (state, action: PayloadAction<JournalEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id)
      if (index !== -1) {
        state.entries[index] = action.payload
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload)
    },
    setQuickLogs: (state, action: PayloadAction<QuickLog[]>) => {
      state.quickLogs = action.payload
    },
    addQuickLog: (state, action: PayloadAction<QuickLog>) => {
      state.quickLogs.push(action.payload)
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setDateRange: (state, action: PayloadAction<{ start: string; end: string } | null>) => {
      state.selectedDateRange = action.payload
    },
  },
})

export const { 
  setLoading, 
  setEntries, 
  addEntry, 
  updateEntry, 
  deleteEntry, 
  setQuickLogs, 
  addQuickLog, 
  setSearchQuery, 
  setDateRange 
} = journalSlice.actions
export default journalSlice.reducer
