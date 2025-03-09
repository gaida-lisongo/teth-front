import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { CustomButton } from '@/components/buttons';
import * as Progress from 'expo-progress';
import { Countdown } from '@/components/common/Countdown';
import { socketService } from '@/services/socket';
import { useAuth } from '@/contexts';

interface DepositModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (phone: string, amount: number) => Promise<void>;
}

export const DepositModal = ({ visible, onClose, onConfirm }: DepositModalProps) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user, setUser } = useAuth();

  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval>;
    if (isLoading) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 1) {
            clearInterval(progressInterval);
            return 1;
          }
          return prev + 0.0167; // Complete in 60 seconds (1/60)
        });
      }, 1000);
    }
    return () => clearInterval(progressInterval);
  }, [isLoading]);

  useEffect(() => {
       
    socketService.onDeposit((response) => {
        console.log('Dépôt confirmé', response);

        if (response.data.status == 400) {
            Alert.alert('Erreur', response.error);
        } else {
            console.log('Data depot', response.data);
            const transaction = response.data;
            setUser(prev => ({ ...prev, porteMonnaie: prev.porteMonnaie + parseFloat(transaction.amount) }));
            Alert.alert('Succès', 'Dépôt effectué avec succès');
        }
        setIsLoading(false);
        setProgress(0);
        onClose();
    });

    return () => {
        console.log('Dépôt annulé');
        socketService.offDeposit();
    };
  }, []);

  const formatPhoneNumber = (input: string): string => {
    // Extract last 9 digits
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

    if (isNaN(parsedAmount) || parsedAmount < 300) {
      Alert.alert('Erreur', 'Le montant minimum est de 300 FC');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    onConfirm(formattedPhone, parsedAmount);
    
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
          <View style={styles.header}>
            <Text style={styles.title}>Dépôt d'argent</Text>
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
                Transaction en cours...
              </Text>
              <Text style={styles.processingText}>
                Ne fermez pas l'application
              </Text>
            </View>
          ) : (
            <>
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
                title="Confirmer le dépôt"
                onPress={handleSubmit}
                variant="primary"
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