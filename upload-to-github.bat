@echo off
title Загрузка на GitHub
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    🚀 ЗАГРУЗКА НА GITHUB                     ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 📋 Инструкция:
echo.
echo 1. В браузере создайте репозиторий "scooter-miniapp"
echo 2. Скопируйте URL репозитория (например: https://github.com/username/scooter-miniapp.git)
echo 3. Вставьте URL ниже
echo.

:input_url
set /p repo_url="🔗 Введите URL репозитория: "

if "%repo_url%"=="" (
    echo.
    echo ❌ URL не введен! Попробуйте снова.
    echo.
    goto input_url
)

echo.
echo 🔄 Подключение к репозиторию...
git remote add origin %repo_url%

echo.
echo 📤 Отправка кода на GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ╔══════════════════════════════════════════════════════════════╗
    echo ║                        ✅ УСПЕХ!                             ║
    echo ╚══════════════════════════════════════════════════════════════╝
    echo.
    echo 🌐 Репозиторий: %repo_url%
    echo 📁 Проект загружен на GitHub!
    echo.
    echo 📝 Следующие шаги:
    echo 1. Настройте WebApp в BotFather
    echo 2. Задеплойте на Vercel/Netlify
    echo 3. Обновите URL в BotFather
    echo.
) else (
    echo.
    echo ❌ Ошибка при загрузке! Проверьте URL и попробуйте снова.
    echo.
)

echo Нажмите любую клавишу для выхода...
pause > nul 