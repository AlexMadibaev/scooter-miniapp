import React from 'react';
import { Button, Box, Typography } from '@mui/material';

interface MainMenuProps {
  onNavigate: (path: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const menuItems = [
    { id: 'rent', label: 'Арендовать', icon: '🛴', color: 'primary' },
    { id: 'history', label: 'Мои поездки', icon: '🗂', color: 'secondary' },
    { id: 'prices', label: 'Цены', icon: '💸', color: 'secondary' },
    { id: 'help', label: 'Помощь', icon: '❓', color: 'secondary' },
    { id: 'license', label: 'Отправить ВУ', icon: '📤', color: 'secondary' },
  ];

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
        🏠 Главное меню
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
        Выберите действие:
      </Typography>

      {menuItems.map((item) => (
        <Button
          key={item.id}
          variant={item.color === 'primary' ? 'contained' : 'outlined'}
          size="large"
          onClick={() => onNavigate(item.id)}
          sx={{
            py: 2,
            px: 3,
            fontSize: '1.1rem',
            fontWeight: 500,
            borderRadius: 3,
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            '&:hover': {
              transform: 'translateY(-2px)',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
          {item.label}
        </Button>
      ))}
    </Box>
  );
}; 