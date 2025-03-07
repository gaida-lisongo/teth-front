import { useSound } from '@/hooks/useSound';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout() {
    const { playSound, stopSound } = useSound(require('@/assets/sounds/auth.wav'), { 
        loop: false 
    });

    useEffect(() => {
        playSound();
        console.log('Auth sound started');
        
        return () => {
            console.log('Auth sound stopped');
            stopSound().catch(console.error);
        };
    }, []);

    return (
        <Stack>
            <Stack.Screen 
                name="welcome" 
                options={{ 
                headerShown: false 
                }} 
            />
            <Stack.Screen 
                name="login" 
                options={{ 
                title: 'Connexion',
                headerBackTitle: 'Retour',
                headerShown: false
                }} 
            />
            <Stack.Screen 
                name="register" 
                options={{ 
                title: 'Inscription',
                headerBackTitle: 'Retour',
                headerShown: false
                }} 
            />
            <Stack.Screen 
                name="forgot-password" 
                options={{ 
                title: 'Mot de passe oublié',
                headerBackTitle: 'Retour',
                headerShown: false
                }} 
            />
            <Stack.Screen 
                name="onboarding" 
                options={{ 
                headerShown: false 
                }} 
            />
        </Stack>
    );
}