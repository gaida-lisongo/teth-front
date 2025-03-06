import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthContextType, LoginCredentials, RegisterData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            // TODO: Remplacer avec un vrai appel API
            const mockUser: User = {
                id: '1',
                pseudo: credentials.pseudo,
                email: 'user@example.com',
                phone: '+243123456789',
                balance: 0,
                pieces: 3,
                stats: {
                    gamesPlayed: 0,
                    correctAnswers: 0,
                    wrongAnswers: 0
                }
            };

            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error('Échec de la connexion');
        }
    };

    const register = async (data: RegisterData) => {
        try {
            // TODO: Remplacer avec un vrai appel API
            const newUser: User = {
                id: Date.now().toString(),
                pseudo: data.pseudo,
                email: data.email,
                phone: data.phone,
                balance: 0,
                pieces: 3, // 3 pièces offertes à l'inscription
                stats: {
                    gamesPlayed: 0,
                    correctAnswers: 0,
                    wrongAnswers: 0
                }
            };

            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error("Échec de l'inscription");
        }
    };

    const forgotPassword = async (email: string) => {
        // TODO: Implémenter la récupération du mot de passe
        throw new Error('Not implemented');
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
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
                logout 
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