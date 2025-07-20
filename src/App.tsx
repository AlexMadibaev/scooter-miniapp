import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';

// Страницы
import { WelcomePage } from './pages/WelcomePage';
import { MainPage } from './pages/MainPage';
import { RentPage } from './pages/RentPage';
import { LicensePage } from './pages/LicensePage';
import { HistoryPage } from './pages/HistoryPage';
import { PaymentPage } from './pages/PaymentPage';
import { FAQPage } from './pages/FAQPage';

function App() {
  // Определяем тему из Telegram WebApp или системных настроек
  const getTheme = () => {
    // Проверяем, запущено ли приложение в Telegram
    if (window.Telegram?.WebApp) {
      const colorScheme = window.Telegram.WebApp.colorScheme;
      return colorScheme === 'dark' ? darkTheme : lightTheme;
    }
    
    // Если не в Telegram, используем системную тему
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? darkTheme : lightTheme;
  };

  const theme = getTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/help" element={<FAQPage />} />
          <Route path="/prices" element={<FAQPage />} /> {/* Временно используем FAQ */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
