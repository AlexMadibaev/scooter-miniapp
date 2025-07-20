import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/api';

interface PaymentState {
  cost: number;
  tripId: string;
}

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cost, tripId } = (location.state as PaymentState) || { cost: 0, tripId: '' };
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sbp' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Выберите способ оплаты');
      return;
    }

    try {
      setProcessing(true);
      const result = await api.createPayment(tripId, cost, paymentMethod);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/main');
        }, 3000);
      }
    } catch (error) {
      console.error('Ошибка оплаты:', error);
      alert('Произошла ошибка при оплате. Попробуйте еще раз.');
    } finally {
      setProcessing(false);
    }
  };

  if (!cost || !tripId) {
    return (
      <Box sx={{ p: 2, minHeight: '100vh' }}>
        <Alert severity="error">
          Ошибка: данные для оплаты не найдены.
        </Alert>
        <Button
          onClick={() => navigate('/main')}
          sx={{ mt: 2 }}
        >
          Вернуться в главное меню
        </Button>
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
          💸 Оплата аренды
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Детали поездки:
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="text.secondary">
              Стоимость:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {cost} ₽
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="text.secondary">
              ID поездки:
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {tripId}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Выберите способ оплаты:
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant={paymentMethod === 'card' ? 'contained' : 'outlined'}
            size="large"
            onClick={() => setPaymentMethod('card')}
            sx={{
              py: 2,
              px: 3,
              fontSize: '1.1rem',
              fontWeight: 500,
              borderRadius: 2,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            💳 Оплатить картой
          </Button>
          
          <Button
            variant={paymentMethod === 'sbp' ? 'contained' : 'outlined'}
            size="large"
            onClick={() => setPaymentMethod('sbp')}
            sx={{
              py: 2,
              px: 3,
              fontSize: '1.1rem',
              fontWeight: 500,
              borderRadius: 2,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            📱 Оплатить через СБП
          </Button>
        </Box>
      </Paper>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handlePayment}
        disabled={!paymentMethod || processing}
        sx={{
          py: 2,
          fontSize: '1.2rem',
          fontWeight: 600,
          borderRadius: 3,
          textTransform: 'none',
        }}
      >
        {processing ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Обработка оплаты...
          </>
        ) : success ? (
          '✓ Оплата прошла успешно!'
        ) : (
          `Оплатить ${cost} ₽`
        )}
      </Button>

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Оплата прошла успешно! Перенаправление в главное меню...
        </Alert>
      )}
    </Box>
  );
}; 