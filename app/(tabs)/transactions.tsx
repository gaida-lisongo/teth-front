import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts';

type Transaction = {
  type: 'deposit' | 'withdrawal' | 'game';
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    type: 'deposit',
    amount: 5000,
    date: '2025-03-07T14:47:12.512Z',
    status: 'success',
  },
  {
    type: 'game',
    amount: -1000,
    date: '2025-03-07T14:30:00.000Z',
    status: 'success',
  },
  {
    type: 'withdrawal',
    amount: -2000,
    date: '2025-03-07T13:15:00.000Z',
    status: 'pending',
  },
];

export default function Transactions() {
  const { user } = useAuth();

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const isPositive = item.amount > 0;
    
    const getIcon = () => {
      switch (item.type) {
        case 'deposit': return 'arrow-down';
        case 'withdrawal': return 'arrow-up';
        case 'game': return 'gamepad';
      }
    };

    const getStatusColor = () => {
      switch (item.status) {
        case 'success': return '#4BB543';
        case 'pending': return '#FFA500';
        case 'failed': return '#FF3B30';
      }
    };

    return (
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: isPositive ? '#4BB543' : '#FF3B30' }]}>
          <FontAwesome5 name={getIcon()} size={16} color="#fff" />
        </View>
        
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionType}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
          <Text style={styles.transactionDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        
        <View style={styles.transactionAmount}>
          <Text style={[styles.amount, { color: isPositive ? '#4BB543' : '#FF3B30' }]}>
            {isPositive ? '+' : ''}{item.amount} FC
          </Text>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Solde actuel</Text>
          <Text style={styles.balance}>{user?.solde} FC</Text>
        </View>
      </View>

      <FlatList
        data={MOCK_TRANSACTIONS}
        renderItem={renderTransaction}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.transactionsList}
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
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  balanceContainer: {
    marginTop: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  transactionsList: {
    padding: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  transactionDate: {
    fontSize: 14,
    color: '#8892b0',
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
  },
});