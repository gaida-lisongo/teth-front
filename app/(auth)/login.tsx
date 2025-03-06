import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '@/components/buttons';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        <Text style={styles.headerText}>Connectez-vous</Text>
        <Text style={styles.subHeaderText}>
          Et commencez à gagner avec vos connaissances !
        </Text>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUp"
        style={styles.formContainer}
      >
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#041cd7" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Pseudo"
            value={pseudo}
            onChangeText={setPseudo}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#041cd7" style={styles.icon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
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

        <Link href="/forgot-password" style={styles.forgotPassword}>
          Mot de passe oublié ?
        </Link>

        <CustomButton
          title="Se connecter"
          onPress={() => {}}
          variant="primary"
          size="large"
          style={styles.loginButton}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Pas encore de compte ?</Text>
          <Link href="/register" style={styles.registerLink}>
            S'inscrire
          </Link>
        </View>
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
  forgotPassword: {
    color: '#041cd7',
    textAlign: 'right',
    marginBottom: 30,
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#495057',
    marginRight: 5,
  },
  registerLink: {
    fontSize: 16,
    color: '#041cd7',
    fontWeight: 'bold',
  },
});