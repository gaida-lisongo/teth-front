export interface User {
    id: string;
    pseudo: string;
    email: string;
    phone: string;
    balance: number;
    pieces: number;
    stats: {
        gamesPlayed: number;
        correctAnswers: number;
        wrongAnswers: number;
    };
}

export interface LoginCredentials {
    pseudo: string;
    password: string;
}

export interface RegisterData {
    pseudo: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}