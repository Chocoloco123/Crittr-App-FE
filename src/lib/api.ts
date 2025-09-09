const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface Pet {
  id: string
  name: string
  species: 'dog' | 'cat' | 'bird' | 'fish' | 'reptile' | 'small_mammal' | 'other'
  breed?: string
  birthDate?: string
  weight?: number
  color?: string
  microchipId?: string
  avatar?: string
  image?: string
  imagePosition?: { x: number; y: number }
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface PetCreate {
  name: string
  species: 'dog' | 'cat' | 'bird' | 'fish' | 'reptile' | 'small_mammal' | 'other'
  breed?: string
  birthDate?: string
  weight?: number
  color?: string
  microchipId?: string
  avatar?: string
  image?: string
  imagePosition?: { x: number; y: number }
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      // Handle specific authentication errors
      if (response.status === 401 || response.status === 403) {
        throw new ApiError(response.status, 'Not authenticated')
      }
      
      throw new ApiError(response.status, errorData.detail || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network error - please check your connection')
  }
}

export const petApi = {
  // Get all pets for the current user
  async getPets(): Promise<Pet[]> {
    return apiRequest<Pet[]>('/pets/')
  },

  // Get a specific pet by ID
  async getPet(id: string): Promise<Pet> {
    return apiRequest<Pet>(`/pets/${id}`)
  },

  // Create a new pet
  async createPet(petData: PetCreate): Promise<Pet> {
    return apiRequest<Pet>('/pets/', {
      method: 'POST',
      body: JSON.stringify(petData),
    })
  },

  // Update an existing pet
  async updatePet(id: string, petData: PetCreate): Promise<Pet> {
    return apiRequest<Pet>(`/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(petData),
    })
  },

  // Delete a pet
  async deletePet(id: string): Promise<void> {
    return apiRequest<void>(`/pets/${id}`, {
      method: 'DELETE',
    })
  },
}

export { ApiError }
