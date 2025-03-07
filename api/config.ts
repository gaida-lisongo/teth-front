export const API_URL = 'http://172.20.10.5:5000/api/v1'; // À remplacer par votre URL réelle

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  GAME: {
    CATEGORIES: '/game/categories',
    QUESTIONS: '/game/questions',
    SUBMIT_ANSWER: '/game/submit',
    LEADERBOARD: '/game/leaderboard',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update',
    TRANSACTIONS: '/user/transactions',
  },
  WALLET: {
    BALANCE: '/wallet/balance',
    DEPOSIT: '/wallet/deposit',
    WITHDRAW: '/wallet/withdraw',
    BUY_TOKENS: '/wallet/buy-tokens',
  },
};