import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '@/contexts';
import { StatusBar } from 'expo-status-bar';
import  { DepositModal } from '@/components/modals/DepositModal';
import { API_URL } from '@/api/config';
import { socketService } from '@/services/socket';

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const [depositModalVisible, setDepositModalVisible] = React.useState(false);

  const menuItems = [
    { icon: 'user-edit', title: 'Modifier le profil', action: () => {} },
    { icon: 'lock', title: 'Changer le mot de passe', action: () => {} },
    { icon: 'bell', title: 'Notifications', action: () => {} },
    { icon: 'question-circle', title: 'Aide & Support', action: () => {} },
    { icon: 'shield-alt', title: 'Confidentialité', action: () => {} },
    { icon: 'sign-out-alt', title: 'Déconnexion', action: logout },
  ];

  const handleDeposit = () => {
    console.log('Déposer de l\'argent');
    setDepositModalVisible(true);
  }
  
  const handleConfirmDeposit = async (phone: string, amount: number) => {
    if (!user?._id || !user?.pseudo) {
      return;
    }

    const payload = {
      phone,
      amount,
      userId: user._id,
      pseudo: user.pseudo,
    };

    socketService.emitDeposit(payload);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <FontAwesome5 name="user-circle" size={80} color="#fff" />
        <Text style={styles.name}>{user?.pseudo}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statItem} onPress={() => handleDeposit()}>
            <Text style={styles.statValue}>{user?.porteMonnaie} FC</Text>
            <Text style={styles.statLabel}>Porte Monnaie</Text>
          </TouchableOpacity>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user?.pieces}</Text>
            <Text style={styles.statLabel}>Pièces</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <FontAwesome5 name={item.icon} size={20} color="#041cd7" />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <FontAwesome5 name="chevron-right" size={16} color="#8892b0" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <DepositModal 
        visible={depositModalVisible}
        onClose={() => setDepositModalVisible(false)}
        onConfirm={handleConfirmDeposit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#041cd7',
    padding: 20,
    alignItems: 'center',
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#041cd7',
  },
  statLabel: {
    fontSize: 12,
    color: '#8892b0',
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#2d3748',
  },
  errorText: {
    color: '#FF3B30',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});