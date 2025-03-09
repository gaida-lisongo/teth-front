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
import { homeApi } from '../../api';
import { API_URL } from '@/api/config';
import { socketService } from '@/services/socket';

export default function Home() {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const { user } = useAuth();
  const [cagnote, setCagnote] = useState(0);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [leaderboard, setLeaderboard] = useState([]);

  const handleSelectCategory = (categoryId: string) => {
    setCategoryModalVisible(false);
    console.log('Catégorie sélectionnée:', categoryId);
  };

  useEffect(() => {
    
    const gamesPlayed = user?.parties.length || 0;
    const total = gamesPlayed * 3;

    setStats(prev => ({ ...prev, gamesPlayed }));
    let correctAnswers = 0;
    let wrongAnswers = 0;

    if (user?.parties) {
      user.parties.map( async (partie) => {
        const request = await fetch (`${API_URL}/home/partie/${partie.partieId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const response = await request.json();

        if(response.status === 200 && total > 0) {
          correctAnswers += response.data.score;
          wrongAnswers += (3 - response.data.score);
          setStats(prev => ({ ...prev, correctAnswers: parseFloat((correctAnswers * 100 / total).toFixed(2)), wrongAnswers : parseFloat((wrongAnswers * 100 / total).toFixed(2)) }));
        }
      });
      
    }
    
  }, [user]);

  useEffect(() => {
    // Initial data fetch
    const fetchInitialData = async () => {
      try {
        // Fetch cagnote
        const cagnoteReq = await fetch(`${API_URL}/home`);
        const cagnoteRes = await cagnoteReq.json();
        if (cagnoteRes.status === 200) {
          setCagnote(cagnoteRes.data.amount);
        }

        // Fetch leaderboard
        const leaderboardReq = await fetch(`${API_URL}/home`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const leaderboardRes = await leaderboardReq.json();
        if (leaderboardRes.status === 200) {
          const ranking = leaderboardRes.data.map((item: any, index: number) => ({
            id: index + 1,
            pseudo: item.pseudo,
            score: item.score
          }));
          setLeaderboard(ranking);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    // Socket connection and listeners
    if (user?._id) {
      socketService.connect(user._id);

      socketService.onCagnoteUpdate((amount: number) => {
        setCagnote(amount);
      });

      socketService.onLeaderboardUpdate((newLeaderboard: any[]) => {
        const ranking = newLeaderboard.map((item, index) => ({
          id: index + 1,
          pseudo: item.pseudo,
          score: item.score
        }));
        setLeaderboard(ranking);
      });

      // Fetch initial data
      fetchInitialData();
    }

    // Cleanup
    return () => {
      socketService.disconnect();
    };
  }, [user?._id]);

  useEffect(() => {
    socketService.onCagnoteUpdate((resp) => {
      if (resp.status == 200) {
        console.log("Cagnote: ", parseFloat(resp.data.amount));
        setCagnote(parseFloat(resp.data.amount));
        
      }
    });

    return () => {
      socketService.offCagnoteUpdate();
    };
  }, []);
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
        value={cagnote}
        onPlay={() => setCategoryModalVisible(true)}
      />
      <ScrollView>

        <StatsSection
          gamesPlayed={stats.gamesPlayed}
          correctAnswers={stats.correctAnswers}
          wrongAnswers={stats.wrongAnswers}
        />

        <TokensSection />

        {leaderboard && <LeaderboardSection ranking={leaderboard} />}
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
