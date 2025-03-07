import { View, Text, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';
import { MOCK_TOKENS } from '@/constants/data';

const { width } = Dimensions.get('window');

export const TokensSection = () => (
  <Animatable.View animation="fadeInUp" delay={900} style={styles.container}>
    <Text style={styles.sectionTitle}>Acheter des jetons</Text>
    <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    style={styles.tokensList}
    >
    {MOCK_TOKENS.map((token) => (
        <View key={token.id} style={styles.tokenCard}>
        <FontAwesome5 name={token.icon} size={24} color="#041cd7" />
        <Text style={styles.tokenName}>{token.name}</Text>
        <Text style={styles.tokenDescription}>{token.description}</Text>
        <Text style={styles.tokenPrice}>{token.price} FC</Text>
        </View>
    ))}
    </ScrollView>
  </Animatable.View>
);

const styles = StyleSheet.create({
    container: {
      margin: 15,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#041cd7',
      marginBottom: 15,
    },
    tokensList: {
      flexDirection: 'row',
  
    },
    tokenCard: {
      width: width * 0.4,
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 15,
      marginRight: 15,
      marginLeft: 10,
      marginBottom: 20,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    tokenName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    tokenDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
    },
    tokenPrice: {
      fontSize: 18,
      color: '#041cd7',
      fontWeight: 'bold',
      marginTop: 10,
    }
  });