import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MOCK_LEADERBOARD } from '@/constants/data';

export const LeaderboardSection = () => (
  <Animatable.View animation="fadeInUp" delay={1200} style={styles.container}>
        <Text style={styles.sectionTitle}>Classement</Text>
        {MOCK_LEADERBOARD.map((player, index) => (
            <View key={player.id} style={styles.leaderboardItem}>
                <Text style={styles.rank}>#{index + 1}</Text>
                <Text style={styles.playerName}>{player.pseudo}</Text>
                <Text style={styles.playerScore}>{player.score} FC</Text>
            </View>
        ))}
  </Animatable.View>
);

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 30,
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
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rank: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#041cd7',
  },
  playerName: {
    flex: 1,
    fontSize: 16,
  },
  playerScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#de8015',
  },
});