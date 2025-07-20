const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3001;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

// Создаем экземпляр бота
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Middleware
app.use(cors());
app.use(express.json());

// Валидация данных от Telegram
function validateTelegramData(initData) {
  if (!initData) return false;
  
  try {
    const secret = crypto.createHmac('sha256', 'WebAppData')
      .update(BOT_TOKEN)
      .digest();
    
    const hash = crypto.createHmac('sha256', secret)
      .update(initData)
      .digest('hex');
    
    const dataHash = initData.split('&').find(p => p.startsWith('hash='))?.split('=')[1];
    return hash === dataHash;
  } catch (error) {
    console.error('Ошибка валидации:', error);
    return false;
  }
}

// API для обработки данных от WebApp
app.post('/api/bot', (req, res) => {
  const initData = req.headers['x-telegram-init-data'];
  
  if (!validateTelegramData(initData)) {
    console.log('Неавторизованный запрос');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { action, data } = req.body;
  console.log('Получен запрос:', action, data);
  
  switch (action) {
    case 'rent_scooter':
      // Обработка аренды
      bot.sendMessage(data.userId, `🛴 Самокат ${data.scooterId} забронирован!`);
      break;
      
    case 'upload_license':
      // Обработка загрузки ВУ
      bot.sendMessage(data.userId, '📄 ВУ получено и отправлено на проверку. Статус: 🟡 ВУ на проверке');
      break;
      
    case 'payment_completed':
      // Обработка оплаты
      bot.sendMessage(data.userId, `💸 Оплата ${data.amount}₽ прошла успешно!`);
      break;
      
    case 'end_rent':
      // Завершение аренды
      bot.sendMessage(data.userId, `✅ Аренда завершена! Стоимость: ${data.cost}₽`);
      break;
      
    default:
      console.log('Неизвестное действие:', action);
  }
  
  res.json({ success: true });
});

// Команды бота
bot.onText(/\/start/, (msg) => {
  const keyboard = {
    inline_keyboard: [[
      { 
        text: '🛴 Открыть приложение', 
        web_app: { url: WEBAPP_URL } 
      }
    ]]
  };
  
  bot.sendMessage(msg.chat.id, 
    'Добро пожаловать в сервис аренды электросамокатов! 🛴\n\n' +
    'Экологично. Быстро. Удобно.\n\n' +
    'Нажмите кнопку ниже, чтобы открыть приложение:', 
    {
      reply_markup: keyboard
    }
  );
});

bot.onText(/\/help/, (msg) => {
  const helpText = `
🤖 Команды бота:

/start - Открыть приложение аренды
/help - Показать эту справку

📱 Основные функции:
• Аренда электросамокатов
• Загрузка водительского удостоверения
• История поездок
• Оплата через СБП/карту
• Поддержка и FAQ

🛴 Для начала работы нажмите /start
  `;
  
  bot.sendMessage(msg.chat.id, helpText);
});

// Обработка ошибок
bot.on('error', (error) => {
  console.error('Ошибка бота:', error);
});

bot.on('polling_error', (error) => {
  console.error('Ошибка polling:', error);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`🤖 Бот запущен с токеном: ${BOT_TOKEN.substring(0, 10)}...`);
  console.log(`🌐 WebApp URL: ${WEBAPP_URL}`);
  console.log(`📱 Для тестирования отправьте /start боту`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка сервера...');
  bot.stopPolling();
  process.exit(0);
}); 