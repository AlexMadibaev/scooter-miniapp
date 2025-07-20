# 🔗 Интеграция с Telegram Bot API

## 📋 Пошаговое руководство

### 1. Создание бота

1. **Найдите @BotFather в Telegram**
2. **Отправьте команду `/newbot`**
3. **Следуйте инструкциям:**
   - Введите имя бота (например, "Scooter Rental Bot")
   - Введите username (например, "scooter_rental_bot")
4. **Сохраните токен бота** - он понадобится для API

### 2. Настройка WebApp

1. **Отправьте команду `/newapp` BotFather**
2. **Выберите вашего бота**
3. **Введите название приложения** (например, "Scooter Rental")
4. **Введите описание** (например, "Аренда электросамокатов")
5. **Загрузите иконку** (512x512px, PNG)
6. **Введите URL приложения** (после деплоя)

### 3. Установка Telegram WebApp SDK

```bash
npm install @vkruglikov/react-telegram-web-app
```

### 4. Обновление App.tsx

```typescript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useTelegram } from '@vkruglikov/react-telegram-web-app';
import { lightTheme, darkTheme } from './theme/theme';

// ... импорты страниц

function App() {
  const { themeParams, user, initData } = useTelegram();
  
  // Получаем тему из Telegram
  const isDarkMode = themeParams?.color_scheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* ... роуты */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

### 5. Интеграция с ботом

#### Обновление utils/api.ts:

```typescript
import { useTelegram } from '@vkruglikov/react-telegram-web-app';

export const api = {
  // Отправка данных в бота
  sendToBot: async (data: any) => {
    const { initData } = useTelegram();
    
    const response = await fetch('/api/bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Telegram-Init-Data': initData,
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  },

  // Получение информации о пользователе
  getUserInfo: () => {
    const { user } = useTelegram();
    return user;
  },

  // Закрытие WebApp
  closeApp: () => {
    const { close } = useTelegram();
    close();
  },

  // ... остальные методы API
};
```

### 6. Backend для бота (Node.js/Express)

```javascript
const express = require('express');
const crypto = require('crypto');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Валидация данных от Telegram
function validateTelegramData(initData) {
  const secret = crypto.createHmac('sha256', 'WebAppData')
    .update(process.env.BOT_TOKEN)
    .digest();
  
  const hash = crypto.createHmac('sha256', secret)
    .update(initData)
    .digest('hex');
  
  return hash === initData.split('&').find(p => p.startsWith('hash=')).split('=')[1];
}

// Обработка данных от WebApp
app.post('/api/bot', (req, res) => {
  const initData = req.headers['x-telegram-init-data'];
  
  if (!validateTelegramData(initData)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { action, data } = req.body;
  
  switch (action) {
    case 'rent_scooter':
      // Обработка аренды
      bot.sendMessage(data.userId, `Самокат ${data.scooterId} забронирован!`);
      break;
      
    case 'upload_license':
      // Обработка загрузки ВУ
      bot.sendMessage(data.userId, 'ВУ получено и отправлено на проверку');
      break;
      
    case 'payment_completed':
      // Обработка оплаты
      bot.sendMessage(data.userId, `Оплата ${data.amount}₽ прошла успешно!`);
      break;
  }
  
  res.json({ success: true });
});

// Команды бота
bot.onText(/\/start/, (msg) => {
  const keyboard = {
    inline_keyboard: [[
      { text: '🛴 Открыть приложение', web_app: { url: process.env.WEBAPP_URL } }
    ]]
  };
  
  bot.sendMessage(msg.chat.id, 'Добро пожаловать в сервис аренды самокатов!', {
    reply_markup: keyboard
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

### 7. Обработка событий в компонентах

#### Пример в RentPage.tsx:

```typescript
import { useTelegram } from '@vkruglikov/react-telegram-web-app';

export const RentPage: React.FC = () => {
  const { user, sendData } = useTelegram();
  
  const handleRent = async (scooterId: string) => {
    // Отправляем данные в бота
    sendData(JSON.stringify({
      action: 'rent_scooter',
      scooterId,
      userId: user?.id
    }));
    
    // ... остальная логика
  };
  
  // ... остальной код
};
```

### 8. Настройка деплоя

#### Для Vercel:

1. **Создайте файл `vercel.json`:**
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://web.telegram.org;"
        }
      ]
    }
  ]
}
```

2. **Деплой:**
```bash
npm install -g vercel
vercel
```

### 9. Тестирование

1. **Локальное тестирование:**
   - Используйте ngrok для создания HTTPS туннеля
   - Укажите ngrok URL в BotFather

2. **Продакшн тестирование:**
   - Задеплойте на Vercel/Netlify
   - Обновите URL в BotFather
   - Протестируйте через бота

### 10. Полезные команды BotFather

- `/myapps` - список ваших WebApp
- `/deleteapp` - удаление WebApp
- `/appsettings` - настройки WebApp
- `/appicon` - изменение иконки
- `/appdescription` - изменение описания

### 11. Безопасность

- **Всегда валидируйте initData** от Telegram
- **Используйте HTTPS** в продакшене
- **Не храните токен бота** в клиентском коде
- **Ограничьте доступ** к API через CORS

### 12. Мониторинг

- **Логируйте все действия** пользователей
- **Отслеживайте ошибки** через Sentry
- **Мониторьте производительность** через Google Analytics
- **Настройте уведомления** о критических ошибках

---

**Готово! Ваш MiniApp интегрирован с Telegram Bot API** 🚀 