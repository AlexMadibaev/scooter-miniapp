@echo off
echo 🚀 Создание репозитория на GitHub...
echo.

echo 📋 Шаги для создания репозитория:
echo.
echo 1. Откройте https://github.com/new
echo 2. Заполните форму:
echo    - Repository name: scooter-miniapp
echo    - Description: Telegram MiniApp для аренды электросамокатов
echo    - Visibility: Public
echo    - НЕ ставьте галочки на README, .gitignore, license
echo 3. Нажмите "Create repository"
echo.

echo ⏳ После создания репозитория, вставьте URL ниже:
set /p repo_url="Введите URL репозитория (например, https://github.com/username/scooter-miniapp.git): "

echo.
echo 🔗 Подключение к репозиторию...
git remote add origin %repo_url%

echo.
echo 📤 Отправка кода на GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Готово! Репозиторий создан и код загружен!
echo 🌐 Откройте %repo_url% в браузере
echo.
pause 