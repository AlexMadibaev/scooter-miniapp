# 🤖 Настройка Telegram бота

## 📋 Пошаговое руководство

### 1. Создание WebApp в BotFather

1. **Откройте @BotFather в Telegram**
2. **Отправьте команду `/newapp`**
3. **Выберите вашего бота** (если у вас несколько)
4. **Введите название приложения:** `Scooter Rental`
5. **Введите описание:** `Сервис аренды электросамокатов в России`
6. **Загрузите иконку** (512x512px, PNG) - можно использовать эмодзи 🛴
7. **Введите URL приложения:** `http://localhost:3000` (для локального тестирования)

### 2. Команды BotFather для управления

```bash
/myapps - список ваших WebApp
/appsettings - настройки WebApp
/appicon - изменение иконки
/appdescription - изменение описания
/deleteapp - удаление WebApp
```

### 3. Запуск проекта

#### Вариант 1: Через batch файл (Windows)
```bash
# В папке scooter-miniapp
start.bat
```

#### Вариант 2: Ручной запуск
```bash
# Терминал 1 - Backend
cd backend
npm start

# Терминал 2 - Frontend  
cd scooter-miniapp
npm start
```

### 4. Тестирование

1. **Отправьте `/start` вашему боту**
2. **Нажмите кнопку "🛴 Открыть приложение"**
3. **Протестируйте все функции:**
   - Загрузка ВУ
   - Аренда самоката
   - Таймер аренды
   - Оплата
   - История поездок

### 5. Настройка для продакшена

#### Для деплоя на Vercel:

1. **Создайте аккаунт на [vercel.com](https://vercel.com)**
2. **Подключите GitHub репозиторий**
3. **Настройте переменные окружения:**
   ```
   BOT_TOKEN=7238839338:AAGB92aeeykGotOxEytSaDyr6P_4hrGqgRI
   ```
4. **Деплойте приложение**
5. **Обновите URL в BotFather на продакшн URL**

#### Для деплоя на Netlify:

1. **Создайте аккаунт на [netlify.com](https://netlify.com)**
2. **Загрузите папку `build` из frontend**
3. **Настройте переменные окружения**
4. **Обновите URL в BotFather**

### 6. Структура проекта

```
scooter-miniapp/
├── src/                    # Frontend (React)
│   ├── components/         # UI компоненты
│   ├── pages/             # Страницы приложения
│   ├── utils/             # API и интеграция с Telegram
│   └── theme/             # Стили и темы
├── backend/               # Backend (Node.js)
│   ├── server.js          # Основной сервер
│   ├── config.env         # Конфигурация
│   └── package.json       # Зависимости
├── start.bat              # Скрипт запуска (Windows)
├── README.md              # Документация
└── BOT_SETUP.md           # Эта инструкция
```

### 7. Токен бота

**Ваш токен:** `7238839338:AAGB92aeeykGotOxEytSaDyr6P_4hrGqgRI`

⚠️ **Важно:** Не публикуйте токен в публичных репозиториях!

### 8. Команды бота

- `/start` - Открыть приложение аренды
- `/help` - Показать справку

### 9. Отладка

#### Проверка backend:
```bash
curl http://localhost:3001/api/bot
```

#### Проверка frontend:
```bash
curl http://localhost:3000
```

#### Логи backend:
- Откройте консоль backend сервера
- Следите за логами при взаимодействии с ботом

### 10. Полезные ссылки

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Web Apps](https://core.telegram.org/bots/webapps)
- [BotFather](https://t.me/botfather)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)

---

**Готово! Ваш бот настроен и готов к работе!** 🚀 