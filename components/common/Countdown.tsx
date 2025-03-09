import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface CountdownProps {
  duration: number;
  onComplete?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progressAnimationRef = useRef(new Animated.Value(1));
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    startTimer();
    return () => cleanup();
  }, []);

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          cleanup();
          onComplete?.();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // Initial animation
    startProgressAnimation();
  };

  const startProgressAnimation = () => {
    Animated.timing(progressAnimationRef.current, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressWidth = progressAnimationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  const colorInterpolation = progressAnimationRef.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#FF3B30', '#FFD700', '#041cd7']
  });

  return (
    <View style={styles.container}>
      <Animatable.View 
        animation={{
          0: { scale: 1 },
          0.5: { scale: 1.2 },
          1: { scale: 1 }
        }}
        iterationCount="infinite"
        duration={1000}
        style={styles.timeContainer}
      >
        <Text style={[
          styles.timeText,
          { color: timeLeft <= 10 ? '#FF3B30' : '#041cd7' }
        ]}>
          {formatTime(timeLeft)}
        </Text>
      </Animatable.View>

      <View style={styles.progressBar}>
        <Animated.View 
          style={[
            styles.progressFill,
            {
              width: progressWidth,
              backgroundColor: colorInterpolation,
            }
          ]}
        />
      </View>

      {timeLeft <= 10 && (
        <Animatable.Text 
          animation="flash"
          iterationCount="infinite"
          duration={500}
          style={styles.warningText}
        >
          Dépêchez-vous !
        </Animatable.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  timeContainer: {
    marginBottom: 15,
  },
  timeText: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  warningText: {
    color: '#FF3B30',
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  }
});