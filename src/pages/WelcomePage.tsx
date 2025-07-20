import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      p: 3,
      background: 'linear-gradient(135deg, #39e27f 0%, #2dd36f 100%)'
    }}>
      <Paper sx={{ 
        p: 4, 
        borderRadius: 4, 
        textAlign: 'center',
        maxWidth: 400,
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
          🛴
        </Typography>
        
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Добро пожаловать!
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.5 }}>
          Сервис аренды электросамокатов
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
          Экологично. Быстро. Удобно.
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
          Чтобы начать — отправьте фото водительского удостоверения (ВУ).
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate('/license')}
          sx={{
            py: 2,
            px: 4,
            fontSize: '1.2rem',
            fontWeight: 600,
            borderRadius: 3,
            textTransform: 'none',
            background: 'linear-gradient(135deg, #39e27f 0%, #2dd36f 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #2dd36f 0%, #28a745 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(57, 226, 127, 0.3)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          📤 Отправить ВУ и начать поездку
        </Button>
      </Paper>
    </Box>
  );
}; 