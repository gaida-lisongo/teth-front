import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { CustomButton } from '@/components/buttons/CustomButton';
import { Countdown } from '@/components/common/Countdown';

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (phone: string, amount: number) => Promise<void>;
  userBalance: number;
}

export const WithdrawModal = ({ visible, onClose, onConfirm, userBalance }: WithdrawModalProps) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '').slice(-9);
    return digits.length === 9 ? `243${digits}` : '';
  };

  const handleSubmit = async () => {
    const formattedPhone = formatPhoneNumber(phone);
    const parsedAmount = parseInt(amount);

    if (!formattedPhone || formattedPhone.length !== 12) {
      Alert.alert('Erreur', 'Numéro de téléphone invalide');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount < 1000) {
      Alert.alert('Erreur', 'Le montant minimum est de 1000 FC');
      return;
    }

    if (parsedAmount > userBalance) {
      Alert.alert('Erreur', 'Solde insuffisant');
      return;
    }

    try {
      setIsLoading(true);
      await onConfirm(formattedPhone, parsedAmount);
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors du retrait');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => !isLoading && onClose()}
    >
      <BlurView intensity={80} style={styles.overlay}>
        <View style={styles.modal}>
            <ScrollView style={{ paddingBottom: 50 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Retrait d'argent</Text>
                    {!isLoading && (
                    <FontAwesome5 
                        name="times" 
                        size={20} 
                        color="#8892b0" 
                        onPress={onClose}
                    />
                    )}
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                    <Countdown 
                        duration={60} 
                        onComplete={() => {
                        setIsLoading(false);
                        onClose();
                        }}
                    />
                    <Text style={styles.loadingText}>
                        Retrait en cours...
                    </Text>
                    <Text style={styles.processingText}>
                        Ne fermez pas l'application
                    </Text>
                    </View>
                ) : (
                    <>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceLabel}>Solde disponible:</Text>
                        <Text style={styles.balance}>{userBalance} FC</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <FontAwesome5 
                        name="phone" 
                        size={20} 
                        color="#8892b0"
                        style={styles.inputIcon}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder="Numéro de téléphone"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <FontAwesome5 
                        name="money-bill" 
                        size={20} 
                        color="#8892b0"
                        style={styles.inputIcon}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder="Montant (FC)"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        />
                    </View>

                    <CustomButton
                        title="Confirmer le retrait"
                        onPress={handleSubmit}
                        variant="primary"
                        size="large"
                        style={styles.button}
                    />
                    </>
                )}

            </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#8892b0',
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#041cd7',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#2d3748',
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#2d3748',
  },
  processingText: {
    marginTop: 5,
    fontSize: 14,
    color: '#8892b0',
  },
});