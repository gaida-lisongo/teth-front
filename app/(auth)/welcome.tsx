import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Link } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '@/components/buttons';

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
      colors={['#041cd7', '#de8015']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Animatable.View ref={fadeInDown} style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <View style={styles.logoShadow} />
        </Animatable.View>
        
        <Animatable.View animation="fadeIn" delay={300}>
          <Text style={styles.title}>Bienvenue sur Teth</Text>
          <Text style={styles.slogan}>Pariez sur vous même</Text>
        </Animatable.View>
      </View>

      <Animatable.View ref={fadeInUp} style={styles.footer}>
        <View style={styles.contentContainer}>
          <Text style={styles.description}>
            Transformez vos connaissances en gains ! {'\n'}
            Commencez avec <Text style={styles.highlight}>3 pièces offertes</Text> à l'inscription.
          </Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Commencer l'aventure"
              onPress={() => {}}
              variant="primary"
              size="large"
              style={styles.mainButton}
            />
            
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Déjà un compte ?</Text>
              <Link href="/login" style={styles.signInLink}>
                Se connecter
              </Link>
            </View>
          </View>
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
    marginBottom: 30,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
    zIndex: 2,
  },
  logoShadow: {
    position: 'absolute',
    top: 10,
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: width * 0.2,
    transform: [{ scale: 0.95 }],
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  slogan: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    flex: 1.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  highlight: {
    color: '#041cd7',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainButton: {
    width: '100%',
    marginBottom: 20,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signInText: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  signInLink: {
    fontSize: 16,
    color: '#041cd7',
    fontWeight: 'bold',
  },
});