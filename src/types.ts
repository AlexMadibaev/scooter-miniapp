export interface Scooter {
  id: string;
  name: string;
  mileage: number;
  battery: number;
  distance: number;
  image: string;
  isAvailable: boolean;
}

export interface Trip {
  id: string;
  scooterId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // в минутах
  cost: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  licenseStatus: 'pending' | 'approved' | 'rejected';
  licenseImages?: {
    front: string;
    back: string;
  };
}

export interface Payment {
  id: string;
  tripId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'card' | 'sbp';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export type AppTheme = 'light' | 'dark'; 