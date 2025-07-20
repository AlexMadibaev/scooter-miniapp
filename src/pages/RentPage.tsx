import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ScooterCard } from '../components/ScooterCard';
import { RentTimer } from '../components/RentTimer';
import { api } from '../utils/api';
import { Scooter } from '../types';

export const RentPage: React.FC = () => {
  const navigate = useNavigate();
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [loading, setLoading] = useState(true);
  const [renting, setRenting] = useState(false);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [endingRent, setEndingRent] = useState(false);

  useEffect(() => {
    loadScooters();
  }, []);

  const loadScooters = async () => {
    try {
      setLoading(true);
      const data = await api.getScooters();
      setScooters(data);
    } catch (error) {
      console.error('Ошибка загрузки самокатов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async (scooterId: string) => {
    try {
      setRenting(true);
      const result = await api.rentScooter(scooterId);
      if (result.success && result.tripId) {
        setActiveTripId(result.tripId);
        // Обновляем список самокатов
        await loadScooters();
      }
    } catch (error) {
      console.error('Ошибка бронирования:', error);
    } finally {
      setRenting(false);
    }
  };

  const handleEndRent = async (tripId: string) => {
    try {
      setEndingRent(true);
      const result = await api.endRent(tripId);
      if (result.success) {
        setActiveTripId(null);
        // Переходим на страницу оплаты
        navigate('/payment', { state: { cost: result.cost, tripId } });
      }
    } catch (error) {
      console.error('Ошибка завершения аренды:', error);
    } finally {
      setEndingRent(false);
    }
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
          Загрузка самокатов...
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
          🛴 Арендовать
        </Typography>
      </Box>

      {activeTripId ? (
        <RentTimer 
          tripId={activeTripId} 
          onEndRent={handleEndRent}
          isLoading={endingRent}
        />
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Доступные самокаты рядом:
          </Typography>
          
          {scooters.length === 0 ? (
            <Alert severity="info" sx={{ mb: 2 }}>
              К сожалению, сейчас нет доступных самокатов поблизости.
            </Alert>
          ) : (
            scooters.map((scooter) => (
              <ScooterCard
                key={scooter.id}
                scooter={scooter}
                onRent={handleRent}
                isLoading={renting}
              />
            ))
          )}
        </>
      )}
    </Box>
  );
}; 