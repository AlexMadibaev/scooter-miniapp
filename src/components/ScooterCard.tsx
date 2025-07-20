import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { Scooter } from '../types';

interface ScooterCardProps {
  scooter: Scooter;
  onRent: (scooterId: string) => void;
  isLoading?: boolean;
}

export const ScooterCard: React.FC<ScooterCardProps> = ({ scooter, onRent, isLoading = false }) => {
  const getBatteryColor = (battery: number) => {
    if (battery > 70) return 'success';
    if (battery > 30) return 'warning';
    return 'error';
  };

  return (
    <Card sx={{ 
      mb: 2, 
      borderRadius: 3,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-2px)',
        transition: 'all 0.3s ease-in-out',
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={scooter.image || '/scooter-placeholder.jpg'}
        alt={scooter.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
          {scooter.name}
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Пробег:
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {scooter.mileage} км
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Заряд:
            </Typography>
            <Chip 
              label={`${scooter.battery}%`}
              color={getBatteryColor(scooter.battery) as any}
              size="small"
              sx={{ fontWeight: 500 }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Расстояние:
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {scooter.distance} м
            </Typography>
          </Box>
        </Box>
        
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => onRent(scooter.id)}
          disabled={isLoading}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          {isLoading ? 'Бронирование...' : 'Забронировать'}
        </Button>
      </CardContent>
    </Card>
  );
}; 