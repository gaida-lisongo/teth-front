import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useSound } from '@/hooks/useSound';

export default function AuthLayout() {
  const { playSound, stopSound } = useSound(require('@/assets/sounds/auth.wav'), { 
    loop: true 
  });

  useEffect(() => {
    playSound();
    return () => {
      stopSound();
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
    </Stack>
  );
}