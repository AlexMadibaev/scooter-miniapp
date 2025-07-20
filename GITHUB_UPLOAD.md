# 📤 Загрузка проекта на GitHub

## 🚀 Пошаговое руководство

### 1. Создание репозитория на GitHub

1. **Откройте [GitHub](https://github.com)**
2. **Нажмите "New repository"** (зелёная кнопка)
3. **Заполните форму:**
   - **Repository name:** `scooter-miniapp`
   - **Description:** `Telegram MiniApp для аренды электросамокатов`
   - **Visibility:** Public (или Private по вашему выбору)
   - **НЕ ставьте галочки** на "Add a README file", "Add .gitignore", "Choose a license"
4. **Нажмите "Create repository"**

### 2. Подключение локального репозитория

После создания репозитория, GitHub покажет команды. Выполните их в терминале:

```bash
# Добавить удалённый репозиторий
git remote add origin https://github.com/YOUR_USERNAME/scooter-miniapp.git

# Переименовать ветку в main (если нужно)
git branch -M main

# Отправить код на GitHub
git push -u origin main
```

### 3. Альтернативный способ (если у вас есть GitHub CLI)

```bash
# Создать репозиторий через CLI
gh repo create scooter-miniapp --public --description "Telegram MiniApp для аренды электросамокатов"

# Отправить код
git push -u origin main
```

### 4. Проверка загрузки

После загрузки проверьте:
- ✅ Все файлы загружены
- ✅ README.md отображается корректно
- ✅ Структура папок правильная
- ✅ .gitignore работает (node_modules не загружены)

### 5. Настройка для продакшена

#### Для деплоя на Vercel:

1. **Подключите GitHub репозиторий к Vercel**
2. **Настройте переменные окружения:**
   ```
   BOT_TOKEN=7238839338:AAGB92aeeykGotOxEytSaDyr6P_4hrGqgRI
   ```
3. **Деплойте приложение**
4. **Обновите URL в BotFather**

#### Для деплоя на Netlify:

1. **Подключите GitHub репозиторий к Netlify**
2. **Настройте build команды:**
   - Build command: `npm run build`
   - Publish directory: `build`
3. **Настройте переменные окружения**
4. **Деплойте приложение**

### 6. Структура репозитория

```
scooter-miniapp/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # UI компоненты
│   ├── pages/             # Страницы приложения
│   ├── utils/             # API и интеграция с Telegram
│   ├── theme/             # Цвета и темы
│   └── types/             # TypeScript типы
├── backend/               # Backend (Node.js + Express)
│   ├── server.js          # Telegram Bot API сервер
│   ├── config.example.env # Пример конфигурации
│   └── package.json       # Зависимости
├── README.md              # Документация проекта
├── BOT_SETUP.md           # Настройка бота
├── TELEGRAM_INTEGRATION.md # Интеграция с Telegram
├── GITHUB_UPLOAD.md       # Эта инструкция
└── start.bat              # Скрипт запуска (Windows)
```

### 7. Безопасность

⚠️ **Важно:** 
- Токен бота НЕ загружен в репозиторий (исключён через .gitignore)
- Используйте `config.example.env` как шаблон
- В продакшене настройте переменные окружения

### 8. Команды для обновления

```bash
# Добавить изменения
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push
```

### 9. Полезные ссылки

- [GitHub](https://github.com)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub CLI](https://cli.github.com)

---

**Готово! Ваш проект загружен на GitHub!** 🚀 