import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

interface UseSoundProps {
  loop?: boolean;
}

export const useSound = (soundFile: any, { loop = false }: UseSoundProps = {}) => {
  const [sound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile, {
        isLooping: loop,
        volume: 1.0,
      });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.log('Error stopping sound:', error);
    }
  };

  return { playSound, stopSound };
};