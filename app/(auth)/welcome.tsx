import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Teth</Text>
      <Text style={styles.slogan}>Pariez sur vous même</Text>
      <Link href="/login" style={styles.link}>Se connecter</Link>
      <Link href="/register" style={styles.link}>S'inscrire</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 18,
    marginBottom: 30,
  },
  link: {
    fontSize: 16,
    color: '#0000FF',
    marginVertical: 10,
  },
});