import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

interface UseSoundProps {
  loop?: boolean;
}

export const useSound = (soundFile: any, { loop = false }: UseSoundProps = {}) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    return () => {
      if (sound && isLoaded) {
        console.log('Cleaning up sound...');
        sound.unloadAsync().catch(error => 
          console.log('Error unloading sound:', error)
        );
      }
    };
  }, [sound, isLoaded]);

  const playSound = async () => {
    try {
      if (sound && isLoaded) {
        // console.log('Playing sound...', sound);
        const status = await sound.getStatusAsync();
        console.log('Playing sound...', status);
        
        if (status.isLoaded) {
          await sound.replayAsync();
          return;
        }
        // await sound.playAsync();
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(soundFile, {
        isLooping: loop,
        volume: 0.5,
      });
      
      setSound(newSound);
      setIsLoaded(true);
      await newSound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    try {
      if (sound && isLoaded) {
        console.log('Stopping sound...');
        await sound.stopAsync();
      }
    } catch (error) {
      console.log('Error stopping sound:', error);
    }
  };

  return { playSound, stopSound };
};