import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { CustomButton } from '@/components/buttons';

interface BuyTokenModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onRecharge: () => void;
  token: {
    name: string;
    description: string;
    price: number;
    icon: string;
    pieces: number;
    bonus: number;
  };
  userBalance: number;
}

export const BuyTokenModal = ({ 
  visible, 
  onClose, 
  onConfirm, 
  onRecharge,
  token, 
  userBalance 
}: BuyTokenModalProps) => {
  const canBuy = userBalance >= token.price;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={80} style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome5 name="times" size={20} color="#8892b0" />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <FontAwesome5 name={token.icon} size={40} color="#041cd7" />
          </View>

          <Text style={styles.title}>{token.name}</Text>
          <Text style={styles.description}>{token.description}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <FontAwesome5 name="coins" size={16} color="#FFD700" />
              <Text style={styles.detailText}>Pièces: {token.pieces}</Text>
            </View>
            {token.bonus > 0 && (
              <View style={styles.detail}>
                <FontAwesome5 name="gift" size={16} color="#4BB543" />
                <Text style={styles.detailText}>Bonus: +{token.bonus}</Text>
              </View>
            )}
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Prix:</Text>
            <Text style={styles.price}>{token.price} FC</Text>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Votre solde:</Text>
            <Text style={[
              styles.balance,
              { color: canBuy ? '#4BB543' : '#FF3B30' }
            ]}>
              {userBalance} FC
            </Text>
          </View>

          {canBuy ? (
            <CustomButton
              title="Confirmer l'achat"
              onPress={onConfirm}
              variant="primary"
              size="large"
              style={styles.button}
            />
          ) : (
            <>
              <Text style={styles.insufficientFunds}>
                Solde insuffisant pour cet achat
              </Text>
              <CustomButton
                title="Recharger mon compte"
                onPress={onRecharge}
                variant="secondary"
                size="large"
                style={styles.button}
              />
            </>
          )}
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(4, 28, 215, 0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#8892b0',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#2d3748',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 18,
    color: '#2d3748',
    marginRight: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#041cd7',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#8892b0',
    marginRight: 10,
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  insufficientFunds: {
    color: '#FF3B30',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
});