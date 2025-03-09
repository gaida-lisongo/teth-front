import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts';
import { socketService } from '@/services/socket';
import { DepositModal } from '@/components/modals/DepositModal';
import { WithdrawModal } from '@/components/modals/WithdrawModal';
import { CustomButton } from '@/components/buttons';
import { API_URL } from '@/api/config';
import { COLORS } from '@/constants/theme';

type Transaction = {
  type: string;
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
  const { user, setUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);

  useEffect(() => {
    console.log("getting data from server")
    if (user?._id) {
      socketService.emitDeposits({ userId: user._id });
    }
    
    // Fetch user transactions
    socketService.onDeposits((response) => {
      console.log('Transactions:', response);
      if (response.status == 200) {
        const allDeposits = response.deposits.map((deposit: any) => ({
          type: "Dépot",
          amount: deposit.montant,
          date: deposit.createdAt,
          status: deposit.status == 'accepté' ? 'success' : 'pending',
          })
        );

        const allWithdrawals = user?.retraits?.map((retrait: any) => ({
          type: "Rétrait",
          amount: retrait.montant,
          date: retrait.dateCreated,
          status: retrait.refTransaction ? 'success' : 'pending',
        })) || [];
        
        setTransactions([...allWithdrawals]);
        console.log("allRetry", allWithdrawals)
        setTransactions(prev => [...prev, ...allDeposits]);
        
      }
    });

    console.log(user)
    return () => {
      socketService.offDeposits();
      
    };
  }, [socketService]);

  /* 
  1. ordre des transactions par date
  */
  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const isPositive = item.amount > 0;
    
    const getIcon = () => {
      switch (item.type) {
        case 'Dépot': return 'arrow-down';
        case 'Rétrait': return 'arrow-up';
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

    const formatDateTime = (dateString: string) => {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${formattedDate} à ${formattedTime}`;
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
            {formatDateTime(item.date)}
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

  const handleDeposit = () => {
    setDepositModalVisible(true);
  };

  const handleWithdraw = () => {
    setWithdrawModalVisible(true);
  };

  const handleConfirmDeposit = async (phone: string, amount: number) => {
    try {
      const response = await fetch(`${API_URL}/home/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          amount,
          pseudo: user?.pseudo,
          userId: user?._id
        }),
      });

      const result = await response.json();

      if (result.status === 200) {
        setUser(prev => prev ? { ...prev, porteMonnaie: result.data.porteMonnaie } : prev);
        return result.data;
      } else {
        throw new Error(result.message || 'Échec du dépôt');
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error("Une erreur est survenue lors du dépôt");
    }
  };

  const handleConfirmWithdraw = async (phone: string, amount: number) => {
    try {
      const response = await fetch(`${API_URL}/home/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          amount,
          pseudo: user?.pseudo,
          userId: user?._id
        }),
      });

      const result = await response.json();

      if (result.status === 200) {
        setUser(prev => prev ? { ...prev, porteMonnaie: result.data.porteMonnaie } : prev);
        return result.data;
      } else {
        throw new Error(result.message || 'Échec du retrait');
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error("Une erreur est survenue lors du retrait");
    }
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
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.depositButton]} 
            onPress={() => handleDeposit()}
          >
            <FontAwesome5 name="arrow-down" size={20} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Dépôt</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.withdrawButton]} 
            onPress={() => handleWithdraw()}
          >
            <FontAwesome5 name="arrow-up" size={20} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Retrait</Text>
          </TouchableOpacity>
        </View>
      </View>

      {sortedTransactions && <FlatList
        data={sortedTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.transactionsList}
      />}

      <DepositModal
        visible={depositModalVisible}
        onClose={() => setDepositModalVisible(false)}
        onConfirm={handleConfirmDeposit}
      />

      <WithdrawModal
        visible={withdrawModalVisible}
        onClose={() => setWithdrawModalVisible(false)}
        onConfirm={handleConfirmWithdraw}
        userBalance={user?.solde || 0}
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
    fontSize: 13,
    color: '#8892b0',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  depositButton: {
    backgroundColor: '#4BB543',  // Green color for deposit
  },
  withdrawButton: {
    backgroundColor: '#FF3B30',  // Red color for withdraw
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});