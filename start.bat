@echo off
echo 🚀 Запуск Scooter MiniApp...
echo.

echo 📦 Запуск backend сервера...
start "Backend Server" cmd /k "cd backend && npm start"

echo ⏳ Ожидание запуска backend...
timeout /t 3 /nobreak > nul

echo 🌐 Запуск frontend приложения...
start "Frontend App" cmd /k "npm start"

echo.
echo ✅ Приложение запущено!
echo 📱 Frontend: http://localhost:3000
echo 🤖 Backend: http://localhost:3001
echo.
echo 💡 Для тестирования бота отправьте /start в Telegram
echo.
pause 