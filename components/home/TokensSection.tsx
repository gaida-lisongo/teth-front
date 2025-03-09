import { View, Text, ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';
import { MOCK_TOKENS } from '@/constants/data';
import { useAuth } from '@/contexts';
import { useState } from 'react';
import { BuyTokenModal } from '@/components/modals/BuyTokenModal';
import { router } from 'expo-router';
import { API_URL } from '@/api/config';

const { width } = Dimensions.get('window');

interface Token {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  pieces: number;
  bonus: number;
}

export const TokensSection = () => {
  const { user, setUser } = useAuth();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleBuyToken = (token: Token): void => {
    setSelectedToken(token);
    setModalVisible(true);
  };

  const handleConfirmPurchase = async () => {
    // Ici viendra la logique d'achat avec l'API
    if (!selectedToken) return;
    const payload = {
      amount: selectedToken?.price,
      pieces: selectedToken?.pieces + selectedToken?.bonus,
      userId: user?._id,
    }
    console.log("Endoint: ", `${API_URL}/transactions/buyTokens`);

    const request = await fetch(`${API_URL}/transactions/buyTokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const response = await request.json();
    console.log(response);
    if (response.status === 200) {
      setUser(prev => ({ ...prev, porteMonnaie: response.data.porteMonnaie, pieces: response.data.pieces }));
      setModalVisible(false);
    }
  };

  const handleRecharge = () => {
    setModalVisible(false);
    router.push('/(tabs)/profile');
  };

  return (
    <Animatable.View animation="fadeInUp" delay={900} style={styles.container}>
      <Text style={styles.sectionTitle}>Acheter des jetons</Text>
      <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.tokensList}
      >
      {MOCK_TOKENS.map((token) => (
          <TouchableOpacity key={token.id} style={styles.tokenCard} onPress={() => handleBuyToken(token)}>
            <FontAwesome5 name={token.icon} size={24} color="#041cd7" />
            <Text style={styles.tokenName}>{token.name}</Text>
            <Text style={styles.tokenDescription}>{token.description}</Text>
            <Text style={styles.tokenPrice}>{token.price} FC</Text>
          </TouchableOpacity>
      ))}
      </ScrollView>
      {selectedToken && (
        <BuyTokenModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirmPurchase}
          onRecharge={handleRecharge}
          token={selectedToken}
          userBalance={user?.porteMonnaie || 0}
        />
      )}
    </Animatable.View>
  );
};

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