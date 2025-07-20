@echo off
echo 🚀 Загрузка проекта на GitHub
echo.

echo 📋 Шаг 1: Создание репозитория
echo.
echo 1. Откройте браузер и перейдите на: https://github.com/new
echo 2. Заполните форму:
echo    - Repository name: scooter-miniapp
echo    - Description: Telegram MiniApp для аренды электросамокатов
echo    - Visibility: Public
echo    - НЕ ставьте галочки на README, .gitignore, license
echo 3. Нажмите "Create repository"
echo.

echo ⏳ После создания репозитория, вставьте URL ниже:
set /p repo_url="Введите URL репозитория: "

if "%repo_url%"=="" (
    echo ❌ URL не введен. Попробуйте снова.
    pause
    exit /b 1
)

echo.
echo 🔗 Подключение к репозиторию...
git remote add origin %repo_url%

echo.
echo 📤 Отправка кода на GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Готово! Проект загружен на GitHub!
echo 🌐 Откройте: %repo_url%
echo.
echo 📝 Следующие шаги:
echo 1. Настройте WebApp в BotFather
echo 2. Задеплойте на Vercel/Netlify
echo 3. Обновите URL в BotFather
echo.
pause 