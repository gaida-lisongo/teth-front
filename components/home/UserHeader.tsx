import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

interface UserHeaderProps {
  pseudo: string;
  balance: number;
  pieces: number;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ pseudo, balance, pieces }) => (
  <LinearGradient
    colors={['#041cd7', '#de8015']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.header}
  >
    <View style={styles.userInfo}>
      <View style={styles.avatarContainer}>
        <FontAwesome5 name="user-circle" size={60} color="#fff" />
      </View>
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{pseudo}</Text>
        <Text style={styles.userBalance}>{balance} FC</Text>
      </View>
      <View style={styles.piecesContainer}>
        <FontAwesome5 name="coins" size={24} color="#FFD700" />
        <Text style={styles.piecesText}>{pieces}</Text>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
    header: {
      padding: 20,
      paddingTop: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarContainer: {
      marginRight: 15,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    userBalance: {
      fontSize: 18,
      color: '#fff',
    },
    piecesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      padding: 10,
      borderRadius: 15,
    },
    piecesText: {
      color: '#fff',
      fontSize: 18,
      marginLeft: 5,
    }
});