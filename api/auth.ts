import { RegisterData } from '@/types';
import { api } from './client';
import { API_ENDPOINTS } from './config';

export interface LoginCredentials {
  pseudo: string;
  password: string;
}

export const authApi = {
  login: (credentials: LoginCredentials) => 
    api.public.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (data: RegisterData) => 
    api.public.post(API_ENDPOINTS.AUTH.REGISTER, data),

  forgotPassword: (email: string) => 
    api.public.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),
};