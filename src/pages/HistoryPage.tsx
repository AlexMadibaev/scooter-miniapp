import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { Trip } from '../types';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await api.getTrips();
      setTrips(data);
    } catch (error) {
      console.error('Ошибка загрузки поездок:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleDownloadReceipt = (trip: Trip) => {
    // В реальном приложении здесь был бы запрос к API для получения чека
    alert(`Скачивание чека для поездки ${trip.id}...`);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        p: 3
      }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Загрузка истории...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          onClick={() => navigate('/main')}
          sx={{ mr: 2, minWidth: 'auto' }}
        >
          ← Назад
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          🗂 Мои поездки
        </Typography>
      </Box>

      {trips.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          У вас пока нет завершенных поездок.
        </Alert>
      ) : (
        trips.map((trip) => (
          <Card key={trip.id} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                  {trip.scooterId}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {trip.cost} ₽
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Дата:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatDate(trip.startTime)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Время:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatTime(trip.startTime)} — {trip.endTime ? formatTime(trip.endTime) : '...'}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Длительность:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {trip.duration} мин
                  </Typography>
                </Box>
              </Box>
              
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleDownloadReceipt(trip)}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                📄 Скачать чек
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}; 