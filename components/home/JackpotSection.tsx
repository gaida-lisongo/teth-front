import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CustomButton } from '@/components/buttons';

interface JackpotSectionProps {
  value: number | { status: number; data: { amount: number }; message: string; timestamp: string };
  onPlay: () => void;
}

export const JackpotSection: React.FC<JackpotSectionProps> = ({ value, onPlay }) => {
  // Mémoriser la valeur à afficher
  const displayValue = useMemo(() => {
    return typeof value === 'number' ? value : value?.data?.amount || 0;
  }, [value]); // Ne recalcule que si value change

  return (
    <Animatable.View animation="fadeInUp" delay={600} style={styles.container}>
      <Text style={styles.cagnotteTitle}>Cagnotte du jour</Text>
      <Animatable.Text 
        animation="pulse" 
        iterationCount="infinite" 
        duration={2000} 
        style={styles.cagnotteValue}
      >
        {displayValue.toLocaleString()} FC
      </Animatable.Text>
      <CustomButton
        title="Commencer une partie"
        onPress={onPlay}
        variant="primary"
        size="large"
        style={styles.playButton}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    margin: 15,
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
  cagnotteTitle: {
    fontSize: 18,
    color: '#8892b0',
    marginBottom: 10,
  },
  cagnotteValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#041cd7',
    marginBottom: 20,
  },
  playButton: {
    width: '100%',
  },
});