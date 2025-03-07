export interface RegisterData {
    email: string;
    pseudo: string;
    phone: string;
    mdp: string;
}

export interface User {
    _id: string;
    pseudo: string;
    mdp?: string;
    password?: string;
    solde: number;
    phone: string;
    pieces: number;
    porteMonnaie: number;
    email: string;
    parties: any[];
    retraits: any[];
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    status: number;
    data: T;
    message: string;
    timestamp: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface RegisterResponse {
  status: number;
  data: {
    user: User;
    token: string;
  };
  message: string;
  timestamp: string;
}

export interface ForgotPasswordResponse {
    status: number;
    data: {
        message: string;
    };
    message: string;
    timestamp: string;
}
export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: { pseudo: string; password: string }) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}