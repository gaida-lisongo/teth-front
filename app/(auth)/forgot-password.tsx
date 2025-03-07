import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '@/components/buttons';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/contexts';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide');
      return;
    }
    

    try {
      setIsLoading(true);
      await forgotPassword(email);
      Alert.alert(
        'Succès',
        'Un mot de passe a été envoyé à votre adresse email.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/login')
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible de réinitialiser le mot de passe. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#041cd7', '#de8015']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animatable.View 
        animation="fadeInDown" 
        style={styles.header}
      >
        <Text style={styles.headerText}>Mot de passe oublié ?</Text>
        <Text style={styles.subHeaderText}>
          Pas de panique ! Nous allons vous aider à récupérer votre compte.
        </Text>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUp"
        style={styles.formContainer}
      >
        <Text style={styles.instruction}>
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#041cd7" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Votre email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <CustomButton
          title="Envoyer le lien"
          onPress={handleSubmit}
          variant="primary"
          size="large"
          style={styles.submitButton}
          isLoading={isLoading}
        />

        <CustomButton
          title="Retour à la connexion"
          onPress={() => router.back()}
          variant="outline"
          size="medium"
          style={styles.backButton}
        />
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  formContainer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  instruction: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: '#495057',
    flex: 1,
  },
  submitButton: {
    marginBottom: 20,
  },
  backButton: {
    marginTop: 10,
  },
});