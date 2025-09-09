import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import petReducer from '../features/pets/petSlice'
import journalReducer from '../features/journal/journalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
    journal: journalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
