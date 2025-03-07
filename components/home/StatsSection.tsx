import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';

interface StatsSectionProps {
  gamesPlayed: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  gamesPlayed,
  correctAnswers,
  wrongAnswers,
}) => (
  <Animatable.View animation="fadeInUp" delay={300} style={styles.container}>
        <Text style={styles.sectionTitle}>Vos Statistiques</Text>
        <View style={styles.statsGrid}>
        <View style={[styles.statItem, styles.statItemGames]}>
            <FontAwesome5 name="gamepad" size={24} color="#fff" />
            <Text style={styles.statValue}>{gamesPlayed}</Text>
            <Text style={styles.statLabel}>Parties jouées</Text>
        </View>
        <View style={[styles.statItem, styles.statItemCorrect]}>
            <FontAwesome5 name="check-circle" size={24} color="#fff" />
            <Text style={styles.statValue}>{correctAnswers}</Text>
            <Text style={styles.statLabel}>Bonnes réponses</Text>
        </View>
        <View style={[styles.statItem, styles.statItemWrong]}>
            <FontAwesome5 name="times-circle" size={24} color="#fff" />
            <Text style={styles.statValue}>{wrongAnswers}</Text>
            <Text style={styles.statLabel}>Mauvaises réponses</Text>
        </View>
        </View>
  </Animatable.View>
);


const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#041cd7',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  statItemGames: {
    backgroundColor: '#041cd7',
  },
  statItemCorrect: {
    backgroundColor: '#4BB543',
  },
  statItemWrong: {
    backgroundColor: '#FF3B30',
  }
});