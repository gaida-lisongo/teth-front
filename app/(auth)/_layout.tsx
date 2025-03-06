import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="welcome" 
        options={{ 
          headerShown: false 
        }} 
      />
      {/* <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Connexion',
          headerBackTitle: 'Retour'
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Inscription',
          headerBackTitle: 'Retour'
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          title: 'Mot de passe oublié',
          headerBackTitle: 'Retour'
        }} 
      /> */}
    </Stack>
  );
}