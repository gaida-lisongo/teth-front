import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CustomButton } from '@/components/buttons';

interface JackpotSectionProps {
  value: number;
  onPlay: () => void;
}

export const JackpotSection: React.FC<JackpotSectionProps> = ({ value, onPlay }) => (
  <Animatable.View animation="fadeInUp" delay={600} style={styles.container}>
    <Text style={styles.cagnotteTitle}>Cagnotte du jour</Text>
    <Text style={styles.cagnotteValue}>{value} FC</Text>
    <CustomButton
    title="Commencer une partie"
    onPress={() => onPlay()}
    variant="primary"
    size="large"
    style={styles.playButton}
    />
  </Animatable.View>
);

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 20,
    backgroundColor: '#041cd7',
    borderRadius: 15,
    alignItems: 'center',
  },
  cagnotteTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  cagnotteValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  playButton: {
    width: '100%',
  }
});