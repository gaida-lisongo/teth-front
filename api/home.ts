import { api } from './client';
import { API_ENDPOINTS } from './config';

export const homeApi = {
    getCagnote: () => api.public.get(API_ENDPOINTS.HOME.CAGNOTE),
}