import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  FlatList, 
  Image,
  TouchableOpacity 
} from 'react-native';
import { router } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '@/components/buttons';
import { ONBOARDING_SLIDES } from '@/constants/data';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Animatable.View 
          animation="fadeIn" 
          delay={500} 
          style={styles.imageContainer}
        >
          <Image source={item.image} style={styles.image} />
        </Animatable.View>
        
        <Animatable.View 
          animation="fadeInUp" 
          delay={700} 
          style={styles.textContainer}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animatable.View>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/register');
    }
  };

  const handleSkip = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[ONBOARDING_SLIDES[currentIndex].color, '#fff']}
        style={styles.gradient}
      >
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setCurrentIndex(index);
          }}
        />

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {ONBOARDING_SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            {currentIndex < ONBOARDING_SLIDES.length - 1 ? (
              <>
                <TouchableOpacity 
                  onPress={handleSkip}
                  style={styles.skipButton}
                >
                  <Text style={styles.skipText}>Passer</Text>
                </TouchableOpacity>

                <CustomButton
                  title="Suivant"
                  onPress={handleNext}
                  variant="primary"
                  size="large"
                  style={styles.nextButton}
                />
              </>
            ) : (
              <CustomButton
                title="Commencer maintenant"
                onPress={handleNext}
                variant="primary"
                size="large"
                style={styles.startButton}
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    marginLeft: 20,
  },
  startButton: {
    width: '100%',
  },
});