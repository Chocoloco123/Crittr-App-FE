import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Pet {
  id: string
  name: string
  species: 'dog' | 'cat' | 'bird' | 'fish' | 'reptile' | 'small_mammal' | 'other'
  breed?: string
  sex?: string
  birthDate?: string
  weight?: number
  color?: string
  microchipId?: string
  avatar?: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

interface PetState {
  pets: Pet[]
  selectedPet: Pet | null
  isLoading: boolean
}

const initialState: PetState = {
  pets: [],
  selectedPet: null,
  isLoading: false,
}

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setPets: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload
    },
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload)
    },
    updatePet: (state, action: PayloadAction<Pet>) => {
      const index = state.pets.findIndex(pet => pet.id === action.payload.id)
      if (index !== -1) {
        state.pets[index] = action.payload
      }
    },
    deletePet: (state, action: PayloadAction<string>) => {
      state.pets = state.pets.filter(pet => pet.id !== action.payload)
      if (state.selectedPet?.id === action.payload) {
        state.selectedPet = null
      }
    },
    setSelectedPet: (state, action: PayloadAction<Pet | null>) => {
      state.selectedPet = action.payload
    },
  },
})

export const { setLoading, setPets, addPet, updatePet, deletePet, setSelectedPet } = petSlice.actions
export default petSlice.reducer
