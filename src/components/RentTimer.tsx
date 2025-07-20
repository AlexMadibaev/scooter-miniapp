import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

interface RentTimerProps {
  tripId: string;
  onEndRent: (tripId: string) => void;
  isLoading?: boolean;
}

export const RentTimer: React.FC<RentTimerProps> = ({ tripId, onEndRent, isLoading = false }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateCost = (seconds: number) => {
    const minutes = Math.ceil(seconds / 60);
    const ratePerMinute = 3; // 3 рубля за минуту
    return minutes * ratePerMinute;
  };

  return (
    <Paper sx={{ 
      p: 3, 
      mb: 2, 
      borderRadius: 3,
      background: 'linear-gradient(135deg, #39e27f 0%, #2dd36f 100%)',
      color: 'white',
      textAlign: 'center'
    }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
        ✅ Самокат забронирован!
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
          Время аренды:
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
          {formatTime(elapsedTime)}
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
          Текущая стоимость:
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {calculateCost(elapsedTime)} ₽
        </Typography>
      </Box>
      
      <Button
        variant="contained"
        size="large"
        onClick={() => onEndRent(tripId)}
        disabled={isLoading}
        sx={{
          py: 1.5,
          px: 4,
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          backgroundColor: 'white',
          color: '#39e27f',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        {isLoading ? 'Завершение...' : 'Завершить аренду'}
      </Button>
    </Paper>
  );
}; 