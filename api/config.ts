export const API_URL = 'https://teth-server-latest.onrender.com/api/v1'; // À remplacer par votre URL réelle
export const SOCKET_URL = 'wss://teth-server-latest.onrender.com'; // À remplacer par votre URL réelle
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  GAME: {
    QUESTIONS: '/categories/',
    WIN_GAME: '/transactions/creditSolde'
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update',
    TRANSACTIONS: '/user/transactions',
  },
  WALLET: {
    DEPOSIT: '/home/deposit',
    WITHDRAW: '/transactions/debitSolde',
    BUY_TOKENS: '/transactions/buyTokens',
  },
  HOME : {
    CAGNOTE: '/home',
    CATEGORIES: '/home/categories',
    LEADERS: '/home'
  },
};