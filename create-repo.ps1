# PowerShell скрипт для создания репозитория на GitHub
Write-Host "🚀 Создание репозитория на GitHub..." -ForegroundColor Green
Write-Host ""

# Запрос токена GitHub
$token = Read-Host "Введите ваш GitHub Personal Access Token (или нажмите Enter для пропуска)"

if ($token) {
    Write-Host "📋 Создание репозитория через API..." -ForegroundColor Yellow
    
    $headers = @{
        "Authorization" = "token $token"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    $body = @{
        name = "scooter-miniapp"
        description = "Telegram MiniApp для аренды электросамокатов"
        private = $false
        auto_init = $false
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
        
        Write-Host "✅ Репозиторий создан успешно!" -ForegroundColor Green
        Write-Host "🔗 URL: $($response.html_url)" -ForegroundColor Cyan
        
        # Подключение к репозиторию
        Write-Host "🔗 Подключение к репозиторию..." -ForegroundColor Yellow
        git remote add origin $response.clone_url
        
        Write-Host "📤 Отправка кода..." -ForegroundColor Yellow
        git branch -M main
        git push -u origin main
        
        Write-Host "✅ Готово! Код загружен на GitHub!" -ForegroundColor Green
        Write-Host "🌐 Откройте: $($response.html_url)" -ForegroundColor Cyan
        
    } catch {
        Write-Host "❌ Ошибка создания репозитория: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "💡 Попробуйте создать репозиторий вручную через браузер" -ForegroundColor Yellow
    }
} else {
    Write-Host "📋 Создание репозитория вручную:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Откройте https://github.com/new" -ForegroundColor White
    Write-Host "2. Заполните форму:" -ForegroundColor White
    Write-Host "   - Repository name: scooter-miniapp" -ForegroundColor White
    Write-Host "   - Description: Telegram MiniApp для аренды электросамокатов" -ForegroundColor White
    Write-Host "   - Visibility: Public" -ForegroundColor White
    Write-Host "   - НЕ ставьте галочки на README, .gitignore, license" -ForegroundColor White
    Write-Host "3. Нажмите 'Create repository'" -ForegroundColor White
    Write-Host ""
    
    $repoUrl = Read-Host "Введите URL репозитория после создания"
    
    if ($repoUrl) {
        Write-Host "🔗 Подключение к репозиторию..." -ForegroundColor Yellow
        git remote add origin $repoUrl
        
        Write-Host "📤 Отправка кода..." -ForegroundColor Yellow
        git branch -M main
        git push -u origin main
        
        Write-Host "✅ Готово! Код загружен на GitHub!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Нажмите любую клавишу для выхода..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 