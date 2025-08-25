// API Service for communicating with ASP.NET backend
import { config } from '@/config/environment';

const API_BASE_URL = config.apiUrl;

class ApiService {
  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        mode: 'cors', // Enable CORS for ASP.NET backend
        credentials: 'omit', // Don't send cookies for API calls
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      // Handle different response types
      const contentType = response.headers.get('content-type');
      let responseData;
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        const errorMessage = typeof responseData === 'object' 
          ? responseData.message || responseData.error || `HTTP ${response.status}`
          : responseData || `HTTP ${response.status}`;
        
        throw new Error(`API Error: ${response.status} - ${errorMessage}`);
      }

      return responseData;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to backend server. Please ensure your ASP.NET API is running on https://localhost:7000');
      }
      throw error;
    }
  }

  // Auth endpoints
  async signIn(email: string, password: string) {
    return this.fetchWithAuth('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.fetchWithAuth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
  }

  async testSignIn(userId: number) {
    return this.fetchWithAuth('/auth/test-signin', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async getTestUsers() {
    return this.fetchWithAuth('/auth/test-users');
  }

  // Pet listings endpoints
  async getPetListings(filters?: any) {
    const queryParams = filters ? new URLSearchParams(filters).toString() : '';
    return this.fetchWithAuth(`/pets${queryParams ? `?${queryParams}` : ''}`);
  }

  async getPetById(petId: number) {
    return this.fetchWithAuth(`/pets/${petId}`);
  }

  async createPetListing(petData: any) {
    return this.fetchWithAuth('/pets', {
      method: 'POST',
      body: JSON.stringify(petData),
    });
  }

  async updatePetListing(petId: number, petData: any) {
    return this.fetchWithAuth(`/pets/${petId}`, {
      method: 'PUT',
      body: JSON.stringify(petData),
    });
  }

  async deletePetListing(petId: number) {
    return this.fetchWithAuth(`/pets/${petId}`, {
      method: 'DELETE',
    });
  }

  async getUserPetListings(userId: number) {
    return this.fetchWithAuth(`/users/${userId}/pets`);
  }

  // Categories endpoints
  async getCategories() {
    return this.fetchWithAuth('/categories');
  }

  async getBreeds(categoryId?: number) {
    const queryParams = categoryId ? `?categoryId=${categoryId}` : '';
    return this.fetchWithAuth(`/breeds${queryParams}`);
  }

  // User endpoints
  async getUserProfile(userId: number) {
    return this.fetchWithAuth(`/users/${userId}`);
  }

  async updateUserProfile(userId: number, userData: any) {
    return this.fetchWithAuth(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Favorites endpoints
  async getFavorites(userId: number) {
    return this.fetchWithAuth(`/users/${userId}/favorites`);
  }

  async addToFavorites(userId: number, petId: number) {
    return this.fetchWithAuth(`/users/${userId}/favorites`, {
      method: 'POST',
      body: JSON.stringify({ petId }),
    });
  }

  async removeFromFavorites(userId: number, petId: number) {
    return this.fetchWithAuth(`/users/${userId}/favorites/${petId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
