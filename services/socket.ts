import { io } from 'socket.io-client';
import { SOCKET_URL } from '@/api/config';

interface DepositPayload {
    amount: number;
    userId: string;
}

class SocketService {
  private socket: any;
  private static instance: SocketService;

  private constructor() {
    this.socket = io(SOCKET_URL);

    this.socket.on('connect', () => {
      console.log('Socket connected!');
    });

    this.socket.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error);
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(userId: string) {
    if (!this.socket.connected) {
      this.socket.auth = { userId };
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public onCagnoteUpdate(callback: (amount: number) => void) {
    this.socket.on('cagnote:update', callback);
  }

  public onLeaderboardUpdate(callback: (leaderboard: any[]) => void) {
    this.socket.on('leaderboard:update', callback);
  }

  public onDeposit(callback: (payload: DepositPayload) => void) {
    this.socket.on('deposit', callback);
  }

  public emitDeposit(payload: {amount: number; pseudo: string; phone: string; userId: string}) {
    this.socket.emit('deposit', payload);
  }

  public offDeposit() {
    this.socket.off('deposit');
  }

  public onDeposits(callback: (payload: {userId: string; montant: number; status: string; dateCreated: Date; refTransaction: string}) => void) {
    this.socket.on('deposits', callback);
  }

  public emitDeposits(payload: {userId: string}) {
    this.socket.emit('deposits', payload);  
}

  public offDeposits() {
    this.socket.off('deposits');
  }
}

export const socketService = SocketService.getInstance();