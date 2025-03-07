import { api } from './client';
import { API_ENDPOINTS } from './config';

export const gameApi = {
  getCategories: () => 
    api.private.get(API_ENDPOINTS.GAME.CATEGORIES),

  getQuestions: (categoryId: string) => 
    api.private.get(`${API_ENDPOINTS.GAME.QUESTIONS}/${categoryId}`),

  submitAnswer: (data: {
    questionId: string;
    answer: string;
    timeSpent: number;
  }) => 
    api.private.post(API_ENDPOINTS.GAME.SUBMIT_ANSWER, data),
};