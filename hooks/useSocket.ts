import { useEffect } from 'react';
import { socketService } from '@/services/socket';

export const useSocket = (userId: string | undefined) => {
  useEffect(() => {
    if (userId) {
      socketService.connect(userId);
      
      return () => {
        socketService.disconnect();
      };
    }
  }, [userId]);

  return socketService;
};