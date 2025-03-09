import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthContextType, LoginCredentials, RegisterData, ApiResponse, AuthResponse, RegisterResponse, ForgotPasswordResponse } from '../types';
import { authApi } from '../api';
import { router } from 'expo-router';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Ajout de logs pour le debug
  useEffect(() => {
    console.log('=== AuthContext State ===');
    console.log('User:', user);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('isLoading:', isLoading);
  }, [user, isAuthenticated, isLoading]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    console.log('Checking auth status...');
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      
      console.log('Stored token:', token);
      console.log('Stored user data:', userData);

      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
        console.log('Auth status: Authenticated');
        // Redirection vers les tabs après connexion réussie
        router.replace('/(tabs)/home');
      } else {
        console.log('Auth status: Not authenticated');
        router.replace('/(auth)/welcome');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response: ApiResponse<AuthResponse> = await authApi.login(credentials);
      
      if (response.status === 200 && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

        console.log('User:', response.data.user);
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        // Redirection vers les tabs après connexion réussie
        router.replace('/(tabs)/home');
      } else {
        throw new Error(response.message || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: RegisterResponse = await authApi.register(data);
      console.log('Register response:', response);
      if (response.status === 201 && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

        console.log('User:', response.data.user);
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(response.message || 'Échec de la connexion');
      }
    } catch (error) {
      throw new Error("Échec de l'inscription");
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response: ForgotPasswordResponse = await authApi.forgotPassword(email);
      console.log('Forgot response:', response);
      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error(response.message || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error("Échec lors de la récupération du compte");
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/(auth)/welcome');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Échec de la déconnexion');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated, 
        login, 
        register, 
        forgotPassword, 
        logout ,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};