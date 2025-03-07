import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CategoryModal } from '@/components/modals/CategoryModal';
import { UserHeader } from '@/components/home/UserHeader';
import { StatsSection } from '@/components/home/StatsSection';
import { JackpotSection } from '@/components/home/JackpotSection';
import { TokensSection } from '@/components/home/TokensSection';
import { LeaderboardSection } from '@/components/home/LeaderboardSection';
import { MOCK_USER } from '@/constants/data';
import { useAuth } from '@/contexts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View } from '@/components/Themed';

export default function Home() {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const { user } = useAuth();

  const handleSelectCategory = (categoryId: string) => {
    setCategoryModalVisible(false);
    console.log('Catégorie sélectionnée:', categoryId);
  };

  useEffect(() => {
    console.log('User:', user);
  }, [user]);
  return (
    <View 
    style={styles.container}
    >
      <StatusBar 
        style="dark" 
        backgroundColor='#000'
        translucent={false}
      />
      <UserHeader
        pseudo={user ? user.pseudo : ""}
        balance={user ? user.solde : 0}
        pieces={user ? user.pieces : 0}
      />
      <JackpotSection
        value={25000}
        onPlay={() => setCategoryModalVisible(true)}
      />
      <ScrollView>

        <StatsSection
          gamesPlayed={MOCK_USER.stats.gamesPlayed}
          correctAnswers={MOCK_USER.stats.correctAnswers}
          wrongAnswers={MOCK_USER.stats.wrongAnswers}
        />

        <TokensSection />

        <LeaderboardSection />
      </ScrollView>

      <CategoryModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onSelectCategory={handleSelectCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
