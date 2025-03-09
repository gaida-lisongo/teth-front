import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

async function fetchClient(endpoint: string, options: FetchOptions = {}) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Ajouter le token seulement si requiresAuth est true
  if (options.requiresAuth) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (response.status === 401 && options.requiresAuth) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // Gérer la déconnexion ici
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export const api = {
  // Requêtes publiques (sans token)
  public: {
    post: (endpoint: string, body: any) => 
      fetchClient(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        requiresAuth: false,
      }),
    get: (endpoint: string) => 
      fetchClient(endpoint, { 
        method: 'GET',
      }),
  },

  // Requêtes authentifiées (avec token)
  private: {
    get: (endpoint: string) => 
      fetchClient(endpoint, { 
        method: 'GET',
        requiresAuth: true,
      }),

    post: (endpoint: string, body: any) => 
      fetchClient(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        requiresAuth: true,
      }),

    put: (endpoint: string, body: any) => 
      fetchClient(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
        requiresAuth: true,
      }),

    delete: (endpoint: string) => 
      fetchClient(endpoint, { 
        method: 'DELETE',
        requiresAuth: true,
      }),
  }
};