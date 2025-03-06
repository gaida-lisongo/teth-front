import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Link } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const fadeInDown = useRef(null);
  const fadeInUp = useRef(null);

  useEffect(() => {
    fadeInDown.current?.fadeInDown(1500);
    fadeInUp.current?.fadeInUp(1500);
  }, []);

  return (
    <LinearGradient
      colors={['#FFD700', '#4169E1']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Animatable.View ref={fadeInDown} style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </Animatable.View>
        <Animatable.Text 
          animation="fadeIn" 
          style={styles.title}
        >
          Bienvenue sur Teth
        </Animatable.Text>
        <Animatable.Text 
          animation="fadeIn" 
          delay={500} 
          style={styles.slogan}
        >
          Pariez sur vous même
        </Animatable.Text>
      </View>

      <Animatable.View 
        ref={fadeInUp} 
        style={styles.footer}
      >
        <Text style={styles.description}>
          Testez vos connaissances et gagnez de l'argent en même temps !
          Commencez dès maintenant avec 3 pièces offertes à l'inscription.
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => {}}
        >
          <Link href="/register" style={styles.buttonText}>
            Commencer l'aventure
          </Link>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Déjà un compte ?</Text>
          <Link href="/login" style={styles.signInLink}>
            Se connecter
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#333',
    marginRight: 5,
  },
  signInLink: {
    color: '#4169E1',
    fontWeight: 'bold',
  },
});