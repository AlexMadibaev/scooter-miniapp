import { Scooter, Trip, User, Payment, FAQ } from '../types';

// Моковые данные для демонстрации
const mockScooters: Scooter[] = [
  {
    id: '1',
    name: 'Самокат №12',
    mileage: 1200,
    battery: 85,
    distance: 200,
    image: '/scooter1.jpg',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Самокат №7',
    mileage: 800,
    battery: 60,
    distance: 350,
    image: '/scooter2.jpg',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Самокат №15',
    mileage: 1500,
    battery: 45,
    distance: 500,
    image: '/scooter3.jpg',
    isAvailable: false,
  },
];

const mockTrips: Trip[] = [
  {
    id: '1',
    scooterId: '1',
    startTime: new Date('2024-05-12T14:10:00'),
    endTime: new Date('2024-05-12T14:45:00'),
    duration: 35,
    cost: 120,
    status: 'completed',
  },
  {
    id: '2',
    scooterId: '2',
    startTime: new Date('2024-05-10T18:00:00'),
    endTime: new Date('2024-05-10T18:25:00'),
    duration: 25,
    cost: 90,
    status: 'completed',
  },
];

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Как начать аренду?',
    answer: 'Отправьте фото водительского удостоверения, дождитесь подтверждения и выберите доступный самокат.',
  },
  {
    id: '2',
    question: 'Как оплатить поездку?',
    answer: 'Оплата производится через СБП или банковскую карту после завершения поездки.',
  },
  {
    id: '3',
    question: 'Что делать, если самокат не включается?',
    answer: 'Проверьте заряд батареи. Если проблема не решается, обратитесь в поддержку.',
  },
];

// Функция для отправки данных в Telegram бота
const sendToTelegramBot = async (action: string, data: any) => {
  try {
    const initData = window.Telegram?.WebApp?.initData || '';
    
    const response = await fetch('http://localhost:3001/api/bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Telegram-Init-Data': initData,
      },
      body: JSON.stringify({ action, data }),
    });
    
    if (!response.ok) {
      throw new Error('Ошибка отправки данных в бота');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка отправки в бота:', error);
    // В демо-режиме просто логируем
    console.log('Отправка в бота:', action, data);
    return { success: true };
  }
};

// Получение информации о пользователе из Telegram
const getTelegramUser = () => {
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

// API функции
export const api = {
  // Самокаты
  getScooters: async (): Promise<Scooter[]> => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockScooters.filter(scooter => scooter.isAvailable);
  },

  rentScooter: async (scooterId: string): Promise<{ success: boolean; tripId?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const scooter = mockScooters.find(s => s.id === scooterId);
    if (scooter && scooter.isAvailable) {
      const tripId = `trip_${Date.now()}`;
      
      // Отправляем уведомление в бота
      const user = getTelegramUser();
      await sendToTelegramBot('rent_scooter', {
        scooterId,
        userId: user?.id || 'unknown',
        scooterName: scooter.name
      });
      
      return { success: true, tripId };
    }
    return { success: false };
  },

  endRent: async (tripId: string): Promise<{ success: boolean; cost?: number }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const cost = Math.floor(Math.random() * 100) + 50;
    
    // Отправляем уведомление в бота
    const user = getTelegramUser();
    await sendToTelegramBot('end_rent', {
      tripId,
      cost,
      userId: user?.id || 'unknown'
    });
    
    return { success: true, cost };
  },

  // Поездки
  getTrips: async (): Promise<Trip[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockTrips;
  },

  // Пользователь
  getUser: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const telegramUser = getTelegramUser();
    
    return {
      id: telegramUser?.id?.toString() || '1',
      name: telegramUser?.first_name || 'Пользователь',
      licenseStatus: 'approved',
    };
  },

  uploadLicense: async (frontImage: File, backImage: File): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Отправляем уведомление в бота
    const user = getTelegramUser();
    await sendToTelegramBot('upload_license', {
      userId: user?.id || 'unknown',
      hasFrontImage: !!frontImage,
      hasBackImage: !!backImage
    });
    
    return { success: true };
  },

  // Оплата
  createPayment: async (tripId: string, amount: number, method: 'card' | 'sbp'): Promise<{ success: boolean; paymentId?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const paymentId = `payment_${Date.now()}`;
    
    // Отправляем уведомление в бота
    const user = getTelegramUser();
    await sendToTelegramBot('payment_completed', {
      tripId,
      amount,
      method,
      paymentId,
      userId: user?.id || 'unknown'
    });
    
    return { success: true, paymentId };
  },

  // FAQ
  getFAQs: async (): Promise<FAQ[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFAQs;
  },

  // Поддержка
  contactSupport: async (message: string): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Отправляем сообщение в бота
    const user = getTelegramUser();
    await sendToTelegramBot('contact_support', {
      message,
      userId: user?.id || 'unknown',
      userName: user?.first_name || 'Unknown'
    });
    
    return { success: true };
  },

  // Telegram WebApp функции
  telegram: {
    // Получение пользователя
    getUser: getTelegramUser,
    
    // Отправка данных в бота
    sendData: (data: string) => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.sendData(data);
      }
    },
    
    // Закрытие WebApp
    close: () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.close();
      }
    },
    
    // Готовность WebApp
    ready: () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
      }
    },
    
    // Получение темы
    getTheme: () => {
      if (window.Telegram?.WebApp) {
        return window.Telegram.WebApp.colorScheme;
      }
      return 'light';
    }
  }
}; 