import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '@/components/buttons';
import { FontAwesome } from '@expo/vector-icons';
import { TermsModal } from '@/components/modals/TermsModal';
import { useAuth } from '@/contexts';

export default function Register() {
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.pseudo || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return false;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Erreur', "Format d'email invalide");
      return false;
    }

    if (!formData.phone.startsWith('+243')) {
      Alert.alert('Erreur', 'Le numéro doit commencer par +243');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      await register({
        pseudo: formData.pseudo,
        email: formData.email,
        phone: formData.phone,
        mdp: formData.password,
      });

      Alert.alert(
        'Succès', 
        'Inscription réussie ! Vous avez reçu 3 pièces gratuites.',
        [{ text: 'OK' }]
      );
        
      // Redirection vers les tabs après connexion réussie
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert(
        'Erreur',
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
      console.error('Register error:', error);
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
        <Text style={styles.headerText}>Créez votre compte</Text>
        <Text style={styles.subHeaderText}>
          3 pièces offertes à l'inscription !
        </Text>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUp"
        style={styles.formContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#041cd7" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Pseudo"
              value={formData.pseudo}
              onChangeText={(value) => handleChange('pseudo', value)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#041cd7" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="phone" size={20} color="#041cd7" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#041cd7" style={styles.icon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Mot de passe"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <FontAwesome 
                name={showPassword ? "eye" : "eye-slash"} 
                size={20} 
                color="#041cd7" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#041cd7" style={styles.icon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              secureTextEntry={!showPassword}
            />
          </View>

          <TouchableOpacity 
            onPress={() => setTermsModalVisible(true)}
            style={styles.termsButton}
          >
            <Text style={styles.termsText}>
              En vous inscrivant, vous acceptez nos{' '}
              <Text style={styles.termsLink}>conditions d'utilisation</Text>
            </Text>
          </TouchableOpacity>

          <TermsModal 
            visible={termsModalVisible}
            onClose={() => setTermsModalVisible(false)}
          />

          <CustomButton
            title="S'inscrire"
            onPress={handleRegister}
            variant="primary"
            size="large"
            style={styles.registerButton}
            isLoading={isLoading}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Déjà un compte ?</Text>
            <Link href="/login" style={styles.loginLink}>
              Se connecter
            </Link>
          </View>
        </ScrollView>
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
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
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 20,
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
  eyeIcon: {
    padding: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
    marginBottom: 20,
  },
  termsLink: {
    color: '#041cd7',
    textDecorationLine: 'underline',
  },
  registerButton: {
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    fontSize: 16,
    color: '#495057',
    marginRight: 5,
  },
  loginLink: {
    fontSize: 16,
    color: '#041cd7',
    fontWeight: 'bold',
  },
});